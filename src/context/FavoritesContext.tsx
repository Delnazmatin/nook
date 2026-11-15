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
import { productIds } from "@/data/products";

const STORAGE_KEY = "cataloge:favorites";

const EMPTY: string[] = [];
const knownIds = new Set(productIds);

export type FavoritesContextValue = {
  favorites: string[];
  isFavorite: (id: string) => boolean;
  toggleFavorite: (id: string) => void;
  removeFavorite: (id: string) => void;
  clearFavorites: () => void;
  isReady: boolean;
};

const FavoritesContext = createContext<FavoritesContextValue | null>(null);

/**
 * The favorites list lives in a tiny external store so the first client render
 * can use an empty snapshot (matching the server HTML) and React re-reads the
 * real value right after hydration — no setState-in-effect and no mismatch.
 */
let currentFavorites: string[] = EMPTY;
let lastRawValue: string | null = null;
let hasLoaded = false;
const listeners = new Set<() => void>();

function notifyListeners(): void {
  for (const listener of listeners) {
    listener();
  }
}

function readRawValue(): string | null {
  try {
    return window.localStorage.getItem(STORAGE_KEY);
  } catch {
    return null;
  }
}

function parseStoredFavorites(rawValue: string | null): string[] {
  if (!rawValue) {
    return EMPTY;
  }

  let parsed: unknown;

  try {
    parsed = JSON.parse(rawValue);
  } catch {
    return EMPTY;
  }

  if (!Array.isArray(parsed)) {
    return EMPTY;
  }

  const favorites: string[] = [];

  for (const value of parsed) {
    if (typeof value !== "string" || !knownIds.has(value)) {
      continue;
    }

    if (!favorites.includes(value)) {
      favorites.push(value);
    }
  }

  return favorites.length === 0 ? EMPTY : favorites;
}

function loadOnce(): void {
  if (hasLoaded) {
    return;
  }

  hasLoaded = true;
  lastRawValue = readRawValue();
  currentFavorites = parseStoredFavorites(lastRawValue);
}

function getFavoritesSnapshot(): string[] {
  loadOnce();

  return currentFavorites;
}

function getServerFavoritesSnapshot(): string[] {
  return EMPTY;
}

function syncFromStorage(): void {
  const rawValue = readRawValue();

  if (hasLoaded && rawValue === lastRawValue) {
    return;
  }

  hasLoaded = true;
  lastRawValue = rawValue;
  currentFavorites = parseStoredFavorites(rawValue);
  notifyListeners();
}

function writeFavorites(nextFavorites: string[]): void {
  currentFavorites = nextFavorites.length === 0 ? EMPTY : nextFavorites;
  const rawValue =
    currentFavorites === EMPTY ? null : JSON.stringify(currentFavorites);

  try {
    if (rawValue === null) {
      window.localStorage.removeItem(STORAGE_KEY);
    } else {
      window.localStorage.setItem(STORAGE_KEY, rawValue);
    }
  } catch {
    // Storage can be unavailable (private mode, quota); keep state in memory.
  }

  hasLoaded = true;
  lastRawValue = rawValue;
  notifyListeners();
}

function subscribeToFavorites(onStoreChange: () => void): () => void {
  listeners.add(onStoreChange);

  function handleStorage(event: StorageEvent): void {
    if (event.key !== null && event.key !== STORAGE_KEY) {
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

type FavoritesProviderProps = {
  children: ReactNode;
};

export function FavoritesProvider({
  children,
}: FavoritesProviderProps): ReactElement {
  const favorites = useSyncExternalStore(
    subscribeToFavorites,
    getFavoritesSnapshot,
    getServerFavoritesSnapshot,
  );
  const isReady = useSyncExternalStore(
    subscribeToNothing,
    getHydratedSnapshot,
    getServerHydratedSnapshot,
  );

  const isFavorite = useCallback(
    (id: string): boolean => favorites.includes(id),
    [favorites],
  );

  const toggleFavorite = useCallback((id: string): void => {
    const snapshot = getFavoritesSnapshot();

    writeFavorites(
      snapshot.includes(id)
        ? snapshot.filter((value) => value !== id)
        : [...snapshot, id],
    );
  }, []);

  const removeFavorite = useCallback((id: string): void => {
    writeFavorites(getFavoritesSnapshot().filter((value) => value !== id));
  }, []);

  const clearFavorites = useCallback((): void => {
    writeFavorites(EMPTY);
  }, []);

  const value = useMemo<FavoritesContextValue>(
    () => ({
      favorites,
      isFavorite,
      toggleFavorite,
      removeFavorite,
      clearFavorites,
      isReady,
    }),
    [
      favorites,
      isFavorite,
      toggleFavorite,
      removeFavorite,
      clearFavorites,
      isReady,
    ],
  );

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites(): FavoritesContextValue {
  const context = useContext(FavoritesContext);

  if (!context) {
    throw new Error("useFavorites must be used within a FavoritesProvider.");
  }

  return context;
}
