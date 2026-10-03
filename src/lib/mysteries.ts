import { useEffect, useState } from "react";
import { STORAGE_KEYS, readJson, writeJson } from "@/lib/storage";

/**
 * Hidden mysteries scattered around the site. Nothing announces them: the
 * first one a visitor stumbles on reveals the counter (1/N), and the
 * `mysteries` terminal command then hints at the rest. Progress lives in the
 * visitor's browser.
 */

export type MysteryId =
  | "konami"
  | "sudo"
  | "badge"
  | "balloons"
  | "robots"
  | "carParty"
  | "outage"
  | "midnight"
  | "console"
  | "problem";

export type Mystery = { id: MysteryId; title: string; riddle: string; dev?: boolean };

export const MYSTERIES: Mystery[] = [
  { id: "konami", title: "Old school", riddle: "Type the name hiding in my email address." },
  { id: "sudo", title: "Root access", riddle: "Ask the terminal for the job — with root." },
  { id: "badge", title: "Persistence", riddle: "Flip your perspective. Then again. And again." },
  {
    id: "balloons",
    title: "All accepted",
    riddle: "AC on every problem: set every balloon free in one visit.",
  },
  {
    id: "robots",
    title: "Holy war",
    riddle: "Alice and Bob have strong opinions. Poke them both.",
  },
  { id: "carParty", title: "Drive-in", riddle: "Drive to where the music lives." },
  { id: "outage", title: "INC-404", riddle: "Take every core instance down at the same time." },
  { id: "midnight", title: "Night owl", riddle: "Come back when Cairo should be asleep." },
  { id: "console", title: "Inspector", riddle: "Developers: the console is listening.", dev: true },
  { id: "problem", title: "Accepted", riddle: "Some things are stored, not shown.", dev: true },
];

export const MYSTERY_EVENT = "mystery-solved";
export type MysteryEvent = { id: MysteryId; solved: MysteryId[]; fresh: boolean };

function parse(v: unknown): MysteryId[] | undefined {
  if (!Array.isArray(v)) return undefined;
  const ids = new Set(MYSTERIES.map((m) => m.id));
  return v.filter((x): x is MysteryId => typeof x === "string" && ids.has(x as MysteryId));
}

export function solvedMysteries(): MysteryId[] {
  return readJson(STORAGE_KEYS.mysteries, parse) ?? [];
}

/** Marks a mystery solved (once) and tells the page, which celebrates it. */
export function solveMystery(id: MysteryId) {
  const solved = solvedMysteries();
  if (solved.includes(id)) return false;
  const next = [...solved, id];
  writeJson(STORAGE_KEYS.mysteries, next);
  window.dispatchEvent(
    new CustomEvent<MysteryEvent>(MYSTERY_EVENT, { detail: { id, solved: next, fresh: true } }),
  );
  return true;
}

export function useMysteries(): MysteryId[] {
  const [solved, setSolved] = useState<MysteryId[]>([]);
  useEffect(() => {
    setSolved(solvedMysteries());
    const on = (e: Event) => setSolved((e as CustomEvent<MysteryEvent>).detail.solved);
    window.addEventListener(MYSTERY_EVENT, on);
    return () => window.removeEventListener(MYSTERY_EVENT, on);
  }, []);
  return solved;
}

/** FNV-1a, so answers can be checked without shipping them in plain text. */
export function fnv(text: string) {
  let h = 2166136261;
  for (let i = 0; i < text.length; i++) h = Math.imul(h ^ text.charCodeAt(i), 16777619);
  return (h >>> 0).toString(16);
}

/** A burst of confetti from a point on screen (or the top centre). */
export function confetti(x = window.innerWidth / 2, y = window.innerHeight / 3) {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const c = document.createElement("canvas");
  const dpr = Math.min(2, window.devicePixelRatio || 1);
  c.width = window.innerWidth * dpr;
  c.height = window.innerHeight * dpr;
  c.style.cssText = "position:fixed;inset:0;width:100%;height:100%;pointer-events:none;z-index:120";
  document.body.appendChild(c);
  const g = c.getContext("2d")!;
  g.scale(dpr, dpr);
  const colors = ["#22d3ee", "#a855f7", "#fbbf24", "#34d399", "#f472b6", "#f43f5e"];
  const bits = Array.from({ length: 140 }, () => {
    const a = Math.random() * Math.PI * 2;
    const v = 4 + Math.random() * 9;
    return {
      x,
      y,
      vx: Math.cos(a) * v,
      vy: Math.sin(a) * v - 6,
      r: Math.random() * 6,
      vr: (Math.random() - 0.5) * 0.4,
      c: colors[Math.floor(Math.random() * colors.length)],
      w: 5 + Math.random() * 5,
    };
  });
  let t = 0;
  const frame = () => {
    t++;
    g.clearRect(0, 0, c.width, c.height);
    for (const b of bits) {
      b.vy += 0.25;
      b.vx *= 0.99;
      b.x += b.vx;
      b.y += b.vy;
      b.r += b.vr;
      g.save();
      g.translate(b.x, b.y);
      g.rotate(b.r);
      g.globalAlpha = Math.max(0, 1 - t / 160);
      g.fillStyle = b.c;
      g.fillRect(-b.w / 2, -b.w / 4, b.w, b.w / 2);
      g.restore();
    }
    if (t < 160) requestAnimationFrame(frame);
    else c.remove();
  };
  requestAnimationFrame(frame);
}
