/**
 * Typed, SSR-safe wrapper around localStorage.
 *
 * Every read and write is guarded: localStorage throws in private browsing and
 * when cookies are blocked, and it does not exist during server rendering. The
 * keys live here so a rename is a single edit rather than a grep.
 */

export const STORAGE_KEYS = {
  theme: "theme",
  username: "username",
  visits: "visits",
  gamingMode: "gamingMode",
  robots: "robots",
  termMode: "termMode_v2",
  termColors: "term-colors",
  termAliases: "term-aliases",
  termSound: "term-sound",
  termWindowPos: "term-winpos",
  termWindowSize: "term-winsize",
} as const;

export type StorageKey = (typeof STORAGE_KEYS)[keyof typeof STORAGE_KEYS];

/** Reads a raw string, or null when unavailable or unset. */
export function readString(key: StorageKey): string | null {
  if (typeof window === "undefined") return null;
  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
}

/** Writes a raw string. Silently does nothing when storage is unavailable. */
export function writeString(key: StorageKey, value: string): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(key, value);
  } catch {
    // Storage is full or blocked — the value is a convenience, not critical state.
  }
}

export function removeKey(key: StorageKey): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.removeItem(key);
  } catch {
    // See writeString.
  }
}

/**
 * Reads JSON and hands it to `parse`, which must narrow the unknown value or
 * return undefined. Corrupt or foreign data therefore falls back rather than
 * being trusted as the expected shape.
 */
export function readJson<T>(
  key: StorageKey,
  parse: (value: unknown) => T | undefined,
): T | undefined {
  const raw = readString(key);
  if (raw === null) return undefined;
  try {
    return parse(JSON.parse(raw));
  } catch {
    return undefined;
  }
}

export function writeJson(key: StorageKey, value: unknown): void {
  try {
    writeString(key, JSON.stringify(value));
  } catch {
    // Value could not be serialised — nothing useful to persist.
  }
}

/** Reads a number, falling back when the stored text is not finite. */
export function readNumber(key: StorageKey, fallback: number): number {
  const raw = readString(key);
  if (raw === null) return fallback;
  const n = Number(raw);
  return Number.isFinite(n) ? n : fallback;
}

/** Reads a boolean stored as "1" / "0". */
export function readFlag(key: StorageKey, fallback: boolean): boolean {
  const raw = readString(key);
  if (raw === null) return fallback;
  return raw !== "0";
}

export function writeFlag(key: StorageKey, value: boolean): void {
  writeString(key, value ? "1" : "0");
}
