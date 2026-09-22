import { STORAGE_KEYS, readJson, removeKey, writeJson } from "@/lib/storage";
import type { ColorKey, TerminalColors } from "./types";

export const DEFAULT_COLORS: TerminalColors = {
  prompt: "#22d3ee",
  path: "#94a3b8",
  sys: "#a78bfa",
  out: "#e5e7eb",
  in: "#f8fafc",
  ghost: "#64748b",
  dotRed: "#ef4444",
  dotYellow: "#eab308",
  dotGreen: "#22c55e",
  cmd: "#facc15",
};

export const COLOR_KEYS = Object.keys(DEFAULT_COLORS) as ColorKey[];

/** Matches #rgb and #rrggbb. */
export const HEX_PATTERN = /#(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{6})(?![0-9a-fA-F])/;

export function isHex(value: string): boolean {
  return new RegExp(`^${HEX_PATTERN.source}$`).test(value);
}

/** Keeps only known keys holding valid hex strings, so corrupt storage cannot
 *  inject arbitrary values. */
function parseColors(value: unknown): TerminalColors {
  const result = { ...DEFAULT_COLORS };
  if (typeof value !== "object" || value === null) return result;
  for (const key of COLOR_KEYS) {
    const candidate = (value as Record<string, unknown>)[key];
    if (typeof candidate === "string" && isHex(candidate)) result[key] = candidate;
  }
  return result;
}

export function loadColors(): TerminalColors {
  return readJson(STORAGE_KEYS.termColors, parseColors) ?? { ...DEFAULT_COLORS };
}

export function saveColors(colors: TerminalColors): void {
  writeJson(STORAGE_KEYS.termColors, colors);
}

export function clearStoredColors(): void {
  removeKey(STORAGE_KEYS.termColors);
}

/** CSS custom properties consumed by the terminal's markup. */
export function colorCssVars(colors: TerminalColors): React.CSSProperties {
  const vars: Record<string, string> = {
    "--t-prompt": colors.prompt,
    "--t-path": colors.path,
    "--t-sys": colors.sys,
    "--t-out": colors.out,
    "--t-in": colors.in,
    "--t-ghost": colors.ghost,
    "--t-cmd": colors.cmd,
  };
  return vars as React.CSSProperties;
}
