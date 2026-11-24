import {
  blackHole,
  codeRain,
  horizon,
  hyperspace,
  lightning,
  paint,
  particleText,
  pixels,
  vortex,
} from "./canvasEffects";
import { blinds, crt, glitch, laser, tiles, tunnel } from "./cssEffects";
import type { Fx } from "./shared";
import { STORAGE_KEYS, readJson, writeJson } from "@/lib/storage";

export type { Fx } from "./shared";

/** Every way into chaos mode. */
export const EFFECTS: Fx[] = [
  tiles,
  hyperspace,
  glitch,
  vortex,
  pixels,
  codeRain,
  blackHole,
  blinds,
  particleText,
  horizon,
  paint,
  tunnel,
  lightning,
  laser,
  crt,
];

/** How many recent effects are kept out of the draw. */
const NO_REPEAT = 5;

/**
 * Picks an effect at random, never one of the last five shown (remembered
 * across visits). `?fx=<id>` in the URL forces one, for previewing.
 */
export function pickEffect(): Fx {
  const forced = new URLSearchParams(window.location.search).get("fx");
  const byId = EFFECTS.find((e) => e.id === forced);
  if (byId) return byId;
  const recent =
    readJson(STORAGE_KEYS.recentTransitions, (v) =>
      Array.isArray(v) ? v.filter((x): x is string => typeof x === "string") : undefined,
    ) ?? [];
  const pool = EFFECTS.filter((e) => !recent.includes(e.id));
  const fx = pool[Math.floor(Math.random() * pool.length)] ?? EFFECTS[0];
  writeJson(STORAGE_KEYS.recentTransitions, [fx.id, ...recent].slice(0, NO_REPEAT));
  return fx;
}
