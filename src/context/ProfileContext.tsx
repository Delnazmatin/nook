"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useSyncExternalStore,
  type ReactElement,
  type ReactNode,
} from "react";
import { sha256Hex } from "@/lib/sha256";

/**
 * Demo-only authentication for a static catalog. Accounts live in this
 * browser's localStorage and the password is kept as a SHA-256 hash. This is
 * not real security: anything stored client-side can be read or replaced by the
 * visitor, so no order or payment data should ever depend on it.
 */

const ACCOUNTS_KEY = "cataloge:accounts";
const LEGACY_ACCOUNT_KEY = "cataloge:account";
const SESSION_KEY = "cataloge:session";

export type ProfileUser = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
};

type ProfileAccount = ProfileUser & {
  passwordHash: string;
  createdAt: string;
};

type ProfileSession = {
  email: string;
};

/** Accounts keyed by their lowercase email address. */
type AccountMap = Record<string, ProfileAccount>;

export type RegisterInput = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
};

export type SignInInput = {
  email: string;
  password: string;
};

export type RegisterResult = { ok: true } | { ok: false; reason: "exists" };

export type SignInResult =
  | { ok: true }
  | { ok: false; reason: "missing-account" | "invalid-credentials" };

export type ProfileContextValue = {
  user: ProfileUser | null;
  isRegistered: boolean;
  isAuthenticated: boolean;
  isReady: boolean;
  register: (input: RegisterInput) => Promise<RegisterResult>;
  signIn: (input: SignInInput) => Promise<SignInResult>;
  signOut: () => void;
};

type ProfileSnapshot = {
  user: ProfileUser | null;
  isRegistered: boolean;
};

const EMPTY_SNAPSHOT: ProfileSnapshot = { user: null, isRegistered: false };

const ProfileContext = createContext<ProfileContextValue | null>(null);

/**
 * Same shape as the favorites store: module-level state read through
 * useSyncExternalStore, an empty server snapshot so the first client render
 * matches the server HTML, and a separate flag that flips after hydration.
 */
let currentSnapshot: ProfileSnapshot = EMPTY_SNAPSHOT;
let lastAccountsRaw: string | null = null;
let lastLegacyRaw: string | null = null;
let lastSessionRaw: string | null = null;
let hasLoaded = false;
const listeners = new Set<() => void>();

function notifyListeners(): void {
  for (const listener of listeners) {
    listener();
  }
}

function readRawValue(key: string): string | null {
  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
}

function writeRawValue(key: string, rawValue: string | null): void {
  try {
    if (rawValue === null) {
      window.localStorage.removeItem(key);
    } else {
      window.localStorage.setItem(key, rawValue);
    }
  } catch {
    // Storage can be unavailable (private mode, quota); keep state in memory.
  }
}

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.length > 0;
}

function parseAccount(rawValue: string | null): ProfileAccount | null {
  if (!rawValue) {
    return null;
  }

  let parsed: unknown;

  try {
    parsed = JSON.parse(rawValue);
  } catch {
    return null;
  }

  return toAccount(parsed);
}

function toAccount(value: unknown): ProfileAccount | null {
  if (typeof value !== "object" || value === null) {
    return null;
  }

  const candidate = value as Record<string, unknown>;

  if (
    !isNonEmptyString(candidate.firstName) ||
    !isNonEmptyString(candidate.lastName) ||
    !isNonEmptyString(candidate.email) ||
    !isNonEmptyString(candidate.phone) ||
    !isNonEmptyString(candidate.passwordHash) ||
    !isNonEmptyString(candidate.createdAt)
  ) {
    return null;
  }

  return {
    firstName: candidate.firstName,
    lastName: candidate.lastName,
    email: candidate.email,
    phone: candidate.phone,
    passwordHash: candidate.passwordHash,
    createdAt: candidate.createdAt,
  };
}

function parseAccounts(
  accountsRaw: string | null,
  legacyRaw: string | null,
): AccountMap {
  const accounts: AccountMap = {};

  if (accountsRaw) {
    let parsed: unknown = null;

    try {
      parsed = JSON.parse(accountsRaw);
    } catch {
      parsed = null;
    }

    if (typeof parsed === "object" && parsed !== null) {
      for (const value of Object.values(parsed)) {
        const account = toAccount(value);

        if (account) {
          accounts[account.email] = account;
        }
      }
    }
  }

  // Accounts saved when the browser could only hold one.
  const legacyAccount = parseAccount(legacyRaw);

  if (legacyAccount && !accounts[legacyAccount.email]) {
    accounts[legacyAccount.email] = legacyAccount;
  }

  return accounts;
}

function serializeAccounts(accounts: AccountMap): string | null {
  return Object.keys(accounts).length === 0 ? null : JSON.stringify(accounts);
}

function parseSession(rawValue: string | null): ProfileSession | null {
  if (!rawValue) {
    return null;
  }

  let parsed: unknown;

  try {
    parsed = JSON.parse(rawValue);
  } catch {
    return null;
  }

  if (typeof parsed !== "object" || parsed === null) {
    return null;
  }

  const candidate = parsed as Record<string, unknown>;

  return isNonEmptyString(candidate.email) ? { email: candidate.email } : null;
}

function toUser(account: ProfileAccount): ProfileUser {
  return {
    firstName: account.firstName,
    lastName: account.lastName,
    email: account.email,
    phone: account.phone,
  };
}

function buildSnapshot(
  accountsRaw: string | null,
  legacyRaw: string | null,
  sessionRaw: string | null,
): ProfileSnapshot {
  const accounts = parseAccounts(accountsRaw, legacyRaw);

  if (Object.keys(accounts).length === 0) {
    return EMPTY_SNAPSHOT;
  }

  const session = parseSession(sessionRaw);
  const account = session ? accounts[session.email] : undefined;

  return {
    user: account ? toUser(account) : null,
    isRegistered: true,
  };
}

function loadOnce(): void {
  if (hasLoaded) {
    return;
  }

  hasLoaded = true;
  lastAccountsRaw = readRawValue(ACCOUNTS_KEY);
  lastLegacyRaw = readRawValue(LEGACY_ACCOUNT_KEY);
  lastSessionRaw = readRawValue(SESSION_KEY);
  currentSnapshot = buildSnapshot(
    lastAccountsRaw,
    lastLegacyRaw,
    lastSessionRaw,
  );
}

function readAccounts(): AccountMap {
  loadOnce();

  // Fall back to the in-memory copy when storage is unreadable (private mode).
  return parseAccounts(
    readRawValue(ACCOUNTS_KEY) ?? lastAccountsRaw,
    readRawValue(LEGACY_ACCOUNT_KEY) ?? lastLegacyRaw,
  );
}

function getProfileSnapshot(): ProfileSnapshot {
  loadOnce();

  return currentSnapshot;
}

function getServerProfileSnapshot(): ProfileSnapshot {
  return EMPTY_SNAPSHOT;
}

function syncFromStorage(): void {
  const accountsRaw = readRawValue(ACCOUNTS_KEY);
  const legacyRaw = readRawValue(LEGACY_ACCOUNT_KEY);
  const sessionRaw = readRawValue(SESSION_KEY);

  if (
    hasLoaded &&
    accountsRaw === lastAccountsRaw &&
    legacyRaw === lastLegacyRaw &&
    sessionRaw === lastSessionRaw
  ) {
    return;
  }

  hasLoaded = true;
  lastAccountsRaw = accountsRaw;
  lastLegacyRaw = legacyRaw;
  lastSessionRaw = sessionRaw;
  currentSnapshot = buildSnapshot(accountsRaw, legacyRaw, sessionRaw);
  notifyListeners();
}

function commit(accountsRaw: string | null, sessionRaw: string | null): void {
  writeRawValue(ACCOUNTS_KEY, accountsRaw);
  writeRawValue(LEGACY_ACCOUNT_KEY, null);
  writeRawValue(SESSION_KEY, sessionRaw);

  hasLoaded = true;
  lastAccountsRaw = accountsRaw;
  lastLegacyRaw = null;
  lastSessionRaw = sessionRaw;
  currentSnapshot = buildSnapshot(accountsRaw, null, sessionRaw);
  notifyListeners();
}

function subscribeToProfile(onStoreChange: () => void): () => void {
  listeners.add(onStoreChange);

  function handleStorage(event: StorageEvent): void {
    if (
      event.key !== null &&
      event.key !== ACCOUNTS_KEY &&
      event.key !== LEGACY_ACCOUNT_KEY &&
      event.key !== SESSION_KEY
    ) {
      return;
    }

    syncFromStorage();
  }

  window.addEventListener("storage", handleStorage);

  return () => {
    listeners.delete(onStoreChange);
    window.removeEventListener("storage", handleStorage);
  };
}

function subscribeToNothing(): () => void {
  return () => {};
}

function getHydratedSnapshot(): boolean {
  return true;
}

function getServerHydratedSnapshot(): boolean {
  return false;
}

async function hashPassword(password: string): Promise<string> {
  if (typeof crypto !== "undefined" && crypto.subtle) {
    try {
      const digest = await crypto.subtle.digest(
        "SHA-256",
        new TextEncoder().encode(password),
      );

      return Array.from(new Uint8Array(digest), (byte) =>
        byte.toString(16).padStart(2, "0"),
      ).join("");
    } catch {
      // Fall through to the portable implementation below.
    }
  }

  // `crypto.subtle` is undefined outside secure contexts, which includes a
  // plain-HTTP LAN address such as http://192.168.x.x:3000 opened on a phone.
  return sha256Hex(password);
}

async function registerAccount(input: RegisterInput): Promise<RegisterResult> {
  const accounts = readAccounts();
  const email = input.email.trim().toLowerCase();

  if (accounts[email]) {
    return { ok: false, reason: "exists" };
  }

  const passwordHash = await hashPassword(input.password);

  accounts[email] = {
    firstName: input.firstName.trim(),
    lastName: input.lastName.trim(),
    email,
    phone: input.phone.trim(),
    passwordHash,
    createdAt: new Date().toISOString(),
  };

  commit(
    serializeAccounts(accounts),
    JSON.stringify({ email } satisfies ProfileSession),
  );

  return { ok: true };
}

async function signInAccount(input: SignInInput): Promise<SignInResult> {
  const accounts = readAccounts();
  const email = input.email.trim().toLowerCase();
  const account = accounts[email];

  if (!account) {
    return { ok: false, reason: "missing-account" };
  }

  const passwordHash = await hashPassword(input.password);

  if (account.passwordHash !== passwordHash) {
    return { ok: false, reason: "invalid-credentials" };
  }

  commit(
    serializeAccounts(accounts),
    JSON.stringify({ email: account.email } satisfies ProfileSession),
  );

  return { ok: true };
}

function signOutAccount(): void {
  commit(serializeAccounts(readAccounts()), null);
}

type ProfileProviderProps = {
  children: ReactNode;
};

export function ProfileProvider({
  children,
}: ProfileProviderProps): ReactElement {
  const snapshot = useSyncExternalStore(
    subscribeToProfile,
    getProfileSnapshot,
    getServerProfileSnapshot,
  );
  const isReady = useSyncExternalStore(
    subscribeToNothing,
    getHydratedSnapshot,
    getServerHydratedSnapshot,
  );

  const register = useCallback(
    (input: RegisterInput): Promise<RegisterResult> => registerAccount(input),
    [],
  );

  const signIn = useCallback(
    (input: SignInInput): Promise<SignInResult> => signInAccount(input),
    [],
  );

  const signOut = useCallback((): void => signOutAccount(), []);

  const value = useMemo<ProfileContextValue>(
    () => ({
      user: snapshot.user,
      isRegistered: snapshot.isRegistered,
      isAuthenticated: snapshot.user !== null,
      isReady,
      register,
      signIn,
      signOut,
    }),
    [snapshot, isReady, register, signIn, signOut],
  );

  return (
    <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>
  );
}

export function useProfile(): ProfileContextValue {
  const context = useContext(ProfileContext);

  if (!context) {
    throw new Error("useProfile must be used within a ProfileProvider.");
  }

  return context;
}
