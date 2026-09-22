import { STORAGE_KEYS, readJson, writeJson } from "@/lib/storage";

export type Aliases = Record<string, string>;

/** Expansion depth cap, so `alias a=b` / `alias b=a` cannot loop forever. */
export const MAX_ALIAS_DEPTH = 5;

function parseAliases(value: unknown): Aliases {
  if (typeof value !== "object" || value === null) return {};
  const result: Aliases = {};
  for (const [name, target] of Object.entries(value as Record<string, unknown>)) {
    if (typeof target === "string") result[name] = target;
  }
  return result;
}

export function loadAliases(): Aliases {
  return readJson(STORAGE_KEYS.termAliases, parseAliases) ?? {};
}

export function saveAliases(aliases: Aliases): void {
  writeJson(STORAGE_KEYS.termAliases, aliases);
}
