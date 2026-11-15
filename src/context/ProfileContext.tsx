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

/**
 * Demo-only authentication for a static catalog. A single account lives in this
 * browser's localStorage and the password is kept as a SHA-256 hash. This is not
 * real security: anything stored client-side can be read or replaced by the
 * visitor, so no order or payment data should ever depend on it.
 */

const ACCOUNT_KEY = "cataloge:account";
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

export type RegisterResult =
  { ok: true } | { ok: false; reason: "exists" | "unavailable" };

export type SignInResult =
  | { ok: true }
  | {
      ok: false;
      reason: "missing-account" | "invalid-credentials" | "unavailable";
    };

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
let lastAccountRaw: string | null = null;
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

  if (typeof parsed !== "object" || parsed === null) {
    return null;
  }

  const candidate = parsed as Record<string, unknown>;

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
  accountRaw: string | null,
  sessionRaw: string | null,
): ProfileSnapshot {
  const account = parseAccount(accountRaw);

  if (!account) {
    return EMPTY_SNAPSHOT;
  }

  const session = parseSession(sessionRaw);

  return {
    user: session?.email === account.email ? toUser(account) : null,
    isRegistered: true,
  };
}

function loadOnce(): void {
  if (hasLoaded) {
    return;
  }

  hasLoaded = true;
  lastAccountRaw = readRawValue(ACCOUNT_KEY);
  lastSessionRaw = readRawValue(SESSION_KEY);
  currentSnapshot = buildSnapshot(lastAccountRaw, lastSessionRaw);
}

function readAccountRaw(): string | null {
  loadOnce();

  // Fall back to the in-memory copy when storage is unreadable (private mode).
  return readRawValue(ACCOUNT_KEY) ?? lastAccountRaw;
}

function getProfileSnapshot(): ProfileSnapshot {
  loadOnce();

  return currentSnapshot;
}

function getServerProfileSnapshot(): ProfileSnapshot {
  return EMPTY_SNAPSHOT;
}

function syncFromStorage(): void {
  const accountRaw = readRawValue(ACCOUNT_KEY);
  const sessionRaw = readRawValue(SESSION_KEY);

  if (
    hasLoaded &&
    accountRaw === lastAccountRaw &&
    sessionRaw === lastSessionRaw
  ) {
    return;
  }

  hasLoaded = true;
  lastAccountRaw = accountRaw;
  lastSessionRaw = sessionRaw;
  currentSnapshot = buildSnapshot(accountRaw, sessionRaw);
  notifyListeners();
}

function commit(accountRaw: string | null, sessionRaw: string | null): void {
  writeRawValue(ACCOUNT_KEY, accountRaw);
  writeRawValue(SESSION_KEY, sessionRaw);

  hasLoaded = true;
  lastAccountRaw = accountRaw;
  lastSessionRaw = sessionRaw;
  currentSnapshot = buildSnapshot(accountRaw, sessionRaw);
  notifyListeners();
}

function subscribeToProfile(onStoreChange: () => void): () => void {
  listeners.add(onStoreChange);

  function handleStorage(event: StorageEvent): void {
    if (
      event.key !== null &&
      event.key !== ACCOUNT_KEY &&
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

async function hashPassword(password: string): Promise<string | null> {
  if (typeof crypto === "undefined" || !crypto.subtle) {
    return null;
  }

  try {
    const digest = await crypto.subtle.digest(
      "SHA-256",
      new TextEncoder().encode(password),
    );

    return Array.from(new Uint8Array(digest), (byte) =>
      byte.toString(16).padStart(2, "0"),
    ).join("");
  } catch {
    return null;
  }
}

async function registerAccount(input: RegisterInput): Promise<RegisterResult> {
  const accountRaw = readAccountRaw();

  if (parseAccount(accountRaw)) {
    return { ok: false, reason: "exists" };
  }

  const passwordHash = await hashPassword(input.password);

  if (!passwordHash) {
    return { ok: false, reason: "unavailable" };
  }

  const account: ProfileAccount = {
    firstName: input.firstName.trim(),
    lastName: input.lastName.trim(),
    email: input.email.trim().toLowerCase(),
    phone: input.phone.trim(),
    passwordHash,
    createdAt: new Date().toISOString(),
  };

  commit(
    JSON.stringify(account),
    JSON.stringify({ email: account.email } satisfies ProfileSession),
  );

  return { ok: true };
}

async function signInAccount(input: SignInInput): Promise<SignInResult> {
  const accountRaw = readAccountRaw();
  const account = parseAccount(accountRaw);

  if (!account) {
    return { ok: false, reason: "missing-account" };
  }

  const passwordHash = await hashPassword(input.password);

  if (!passwordHash) {
    return { ok: false, reason: "unavailable" };
  }

  const email = input.email.trim().toLowerCase();

  if (account.email !== email || account.passwordHash !== passwordHash) {
    return { ok: false, reason: "invalid-credentials" };
  }

  commit(
    JSON.stringify(account),
    JSON.stringify({ email: account.email } satisfies ProfileSession),
  );

  return { ok: true };
}

function signOutAccount(): void {
  commit(readAccountRaw(), null);
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
