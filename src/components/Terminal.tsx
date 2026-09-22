import { useEffect, useRef, useState } from "react";
import { experiences, links, profile, projects, skills } from "@/data/profile";
import {
  STORAGE_KEYS,
  readFlag,
  readJson,
  readNumber,
  readString,
  removeKey,
  writeFlag,
  writeJson,
  writeString,
} from "@/lib/storage";
import { toggleTheme } from "@/lib/theme";
import { toggleGamingMode } from "@/hooks/useGamingMode";
import { getUsername, setStoredUsername } from "@/hooks/useUsername";

export type TerminalMode = "float" | "min";

type Line = { kind: "in" | "out" | "sys"; text: string; cmd?: string; desc?: string };

const COMMANDS = [
  "help",
  "whoami",
  "name",
  "setname",
  "experience",
  "skills",
  "projects",
  "visits",
  "social",
  "email",
  "cv",
  "theme",
  "sound",
  "gaming",
  "game",
  "clear",
  "exit",
  "minimize",
  "min",
  "open",
  "color",
  "alias",
  "unalias",
];

const HELP_HEADER = "Available commands:";

const HELP_LINES: { cmd: string; desc: string }[] = [
  { cmd: "help", desc: "Show this help" },
  { cmd: "whoami", desc: "Who is Ahmed?" },
  { cmd: "name", desc: "Show your current username" },
  { cmd: "setname <name>", desc: "Change your username (saved in this browser)" },
  { cmd: "experience", desc: "Years of experience & current role" },
  { cmd: "skills", desc: "Tech stack" },
  { cmd: "projects", desc: "Featured projects" },
  { cmd: "visits", desc: "Number of visits to this site" },
  { cmd: "social", desc: "Social links" },
  { cmd: "email", desc: "Open mail to Ahmed" },
  { cmd: "cv [-s|-c|-sc]", desc: "Open CV. -s show link · -c copy link · -sc both" },
  { cmd: "theme", desc: "Toggle light / dark mode" },
  { cmd: "sound", desc: "Toggle terminal typing sound" },
  { cmd: "gaming", desc: "Toggle gaming mode (unlocks the cups game)" },
  { cmd: "color", desc: "list | set <key> <#hex> | reset" },
  { cmd: "alias", desc: "list | <name>=<command>   (e.g. alias ll=skills)" },
  { cmd: "unalias <name>", desc: "Remove an alias" },
  { cmd: "clear", desc: "Clear the terminal" },
  { cmd: "minimize", desc: "Minimize the terminal to the bottom bar" },
  { cmd: "exit", desc: "Close the terminal window" },
];

const MAX_INPUT = 50;

function parsePoint(value: unknown): { x: number; y: number } | undefined {
  if (typeof value !== "object" || value === null) return undefined;
  const { x, y } = value as Record<string, unknown>;
  if (typeof x !== "number" || typeof y !== "number") return undefined;
  if (!Number.isFinite(x) || !Number.isFinite(y)) return undefined;
  return { x, y };
}

function parseSize(value: unknown): { w: number; h: number } | undefined {
  if (typeof value !== "object" || value === null) return undefined;
  const { w, h } = value as Record<string, unknown>;
  if (typeof w !== "number" || typeof h !== "number") return undefined;
  if (!Number.isFinite(w) || !Number.isFinite(h)) return undefined;
  return { w, h };
}

type ColorKey =
  | "prompt"
  | "path"
  | "sys"
  | "out"
  | "in"
  | "ghost"
  | "dotRed"
  | "dotYellow"
  | "dotGreen"
  | "cmd"; // new token color for help commands

const DEFAULT_COLORS: Record<ColorKey, string> = {
  prompt: "#22d3ee",
  path: "#94a3b8",
  sys: "#a78bfa",
  out: "#e5e7eb",
  in: "#f8fafc",
  ghost: "#64748b",
  dotRed: "#ef4444",
  dotYellow: "#eab308",
  dotGreen: "#22c55e",
  cmd: "#facc15", // yellow-400
};

/** Keeps only known keys holding valid hex strings, so corrupt storage cannot
 *  inject arbitrary values into the color record. */
function parseColors(value: unknown): Record<ColorKey, string> {
  const result = { ...DEFAULT_COLORS };
  if (typeof value !== "object" || value === null) return result;
  for (const key of Object.keys(DEFAULT_COLORS) as ColorKey[]) {
    const candidate = (value as Record<string, unknown>)[key];
    if (typeof candidate === "string" && isHex(candidate)) result[key] = candidate;
  }
  return result;
}

function loadColors(): Record<ColorKey, string> {
  return readJson(STORAGE_KEYS.termColors, parseColors) ?? { ...DEFAULT_COLORS };
}

function isHex(v: string) {
  return /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.test(v);
}

function parseAliases(value: unknown): Record<string, string> {
  if (typeof value !== "object" || value === null) return {};
  const result: Record<string, string> = {};
  for (const [name, target] of Object.entries(value as Record<string, unknown>)) {
    if (typeof target === "string") result[name] = target;
  }
  return result;
}

function loadAliases(): Record<string, string> {
  return readJson(STORAGE_KEYS.termAliases, parseAliases) ?? {};
}

function getVisits() {
  return readNumber(STORAGE_KEYS.visits, 0);
}

function highlightHex(text: string): React.ReactNode {
  const parts = text.split(/(#(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{6})(?![0-9a-fA-F]))/);
  return parts.map((part, i) => {
    if (isHex(part)) {
      return (
        <span
          key={i}
          style={{
            color: part,
            fontWeight: 700,
            textShadow: `0 0 6px ${part}`,
          }}
        >
          {part}
        </span>
      );
    }
    return (
      <span key={i} style={{ opacity: 0 }}>
        {part}
      </span>
    );
  });
}

// Visible inline hex highlight (for output lines).
function renderHexInline(text: string, baseColor: string): React.ReactNode {
  const parts = text.split(/(#(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{6})(?![0-9a-fA-F]))/);
  return parts.map((part, i) =>
    isHex(part) ? (
      <span key={i} style={{ color: part, fontWeight: 700, textShadow: `0 0 6px ${part}` }}>
        {part}
      </span>
    ) : (
      <span key={i} style={{ color: baseColor }}>
        {part}
      </span>
    ),
  );
}

// Overlay renderer for the live input: colors the first token if it's a
// known command/alias, colors hex codes inline, rest in base color.
function renderInputOverlay(
  text: string,
  baseColor: string,
  cmdColor: string,
  knownCommands: string[],
): React.ReactNode {
  if (!text) return null;
  const firstSpace = text.indexOf(" ");
  const head = firstSpace === -1 ? text : text.slice(0, firstSpace);
  const tail = firstSpace === -1 ? "" : text.slice(firstSpace);
  const isKnown = knownCommands.includes(head.toLowerCase());
  return (
    <>
      <span
        style={{
          color: isKnown ? cmdColor : baseColor,
          fontWeight: isKnown ? 700 : 400,
        }}
      >
        {head}
      </span>
      {tail ? renderHexInline(tail, baseColor) : null}
    </>
  );
}

let audioCtx: AudioContext | null = null;
function playKeystroke() {
  try {
    if (!audioCtx) audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
    if (audioCtx.state === "suspended") audioCtx.resume();
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = "square";
    osc.frequency.setValueAtTime(300, audioCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(50, audioCtx.currentTime + 0.02);
    gain.gain.setValueAtTime(0.05, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.02);
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start();
    osc.stop(audioCtx.currentTime + 0.02);
  } catch {}
}

export function Terminal({
  mode,
  onClose,
  onMinimize,
  onRestore,
}: {
  mode: TerminalMode;
  onClose: () => void;
  onMinimize: () => void;
  onRestore: () => void;
}) {
  const [lines, setLines] = useState<Line[]>([
    { kind: "sys", text: `ahmed-os v1.0.4 — © ${profile.name}` },
    {
      kind: "sys",
      text: "Type `help` to see what I can do. Drag the title bar to move · drag the corner to resize.",
    },
  ]);
  const [input, setInput] = useState("");
  const [visits, setVisits] = useState(0);
  const [username, setUsername] = useState("user");
  const [colors, setColors] = useState<Record<ColorKey, string>>(DEFAULT_COLORS);
  const [aliases, setAliases] = useState<Record<string, string>>({});
  const [soundEnabled, setSoundEnabled] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const backStack = useRef<string[]>([]);
  const forwardStack = useRef<string[]>([]);

  // Window position & size (used in float mode). Persisted in localStorage.
  const [winPos, setWinPos] = useState<{ x: number; y: number }>(() => {
    if (typeof window === "undefined") return { x: 80, y: 80 };
    const saved = readJson(STORAGE_KEYS.termWindowPos, parsePoint);
    if (saved) return saved;
    return {
      x: Math.max(24, Math.round(window.innerWidth / 2 - 360)),
      y: Math.max(24, Math.round(window.innerHeight / 2 - 260)),
    };
  });
  const [winSize, setWinSize] = useState<{ w: number; h: number }>(() => {
    if (typeof window === "undefined") return { w: 720, h: 480 };
    const saved = readJson(STORAGE_KEYS.termWindowSize, parseSize);
    if (saved) return saved;
    return {
      w: Math.min(720, window.innerWidth - 48),
      h: Math.min(480, window.innerHeight - 96),
    };
  });

  useEffect(() => {
    writeJson(STORAGE_KEYS.termWindowPos, winPos);
  }, [winPos]);
  useEffect(() => {
    writeJson(STORAGE_KEYS.termWindowSize, winSize);
  }, [winSize]);

  useEffect(() => {
    const v = getVisits() + 1;
    writeString(STORAGE_KEYS.visits, String(v));
    setSoundEnabled(readFlag(STORAGE_KEYS.termSound, false));
    setVisits(v);
    setUsername(getUsername());
    setColors(loadColors());
    setAliases(loadAliases());
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [lines]);

  useEffect(() => {
    if (mode !== "min") inputRef.current?.focus();
  }, [mode]);

  // Click outside the terminal window → minimize.
  useEffect(() => {
    if (mode === "min") return;
    const onDocMouseDown = (e: MouseEvent) => {
      const t = e.target as Node | null;
      if (!t) return;
      if (innerRef.current && !innerRef.current.contains(t)) {
        onMinimize();
      }
    };
    document.addEventListener("mousedown", onDocMouseDown);
    return () => document.removeEventListener("mousedown", onDocMouseDown);
  }, [mode, onMinimize]);

  // ---- drag (header) ----
  function onHeaderMouseDown(e: React.MouseEvent) {
    if (mode !== "float") return;
    // Ignore drags that start on the traffic-light buttons
    if ((e.target as HTMLElement).closest("[data-window-btn]")) return;
    e.preventDefault();
    const startX = e.clientX;
    const startY = e.clientY;
    const startPos = { ...winPos };
    const onMove = (ev: MouseEvent) => {
      const nx = Math.max(0, Math.min(window.innerWidth - 80, startPos.x + (ev.clientX - startX)));
      const ny = Math.max(0, Math.min(window.innerHeight - 40, startPos.y + (ev.clientY - startY)));
      setWinPos({ x: nx, y: ny });
    };
    const onUp = () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
  }

  // ---- resize (bottom-right corner) ----
  function onResizeMouseDown(e: React.MouseEvent) {
    if (mode !== "float") return;
    e.preventDefault();
    e.stopPropagation();
    const startX = e.clientX;
    const startY = e.clientY;
    const startSize = { ...winSize };
    const onMove = (ev: MouseEvent) => {
      const nw = Math.max(
        360,
        Math.min(window.innerWidth - winPos.x - 8, startSize.w + (ev.clientX - startX)),
      );
      const nh = Math.max(
        240,
        Math.min(window.innerHeight - winPos.y - 8, startSize.h + (ev.clientY - startY)),
      );
      setWinSize({ w: nw, h: nh });
    };
    const onUp = () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
  }

  function run(raw: string, depth = 0) {
    const trimmed = raw.trim();
    const lower = trimmed.toLowerCase();
    const [cmd, ...args] = lower.split(/\s+/);
    const out: Line[] = [{ kind: "in", text: raw }];
    const aliasMap = loadAliases();
    if (cmd && aliasMap[cmd] && depth < 5) {
      const expanded = aliasMap[cmd] + (args.length ? " " + args.join(" ") : "");
      setLines((l) => [...l, { kind: "in", text: raw }]);
      setInput("");
      if (trimmed) {
        while (forwardStack.current.length) backStack.current.push(forwardStack.current.pop()!);
        backStack.current.push(raw);
      }
      runExpanded(expanded, depth + 1);
      return;
    }
    switch (cmd || "") {
      case "":
        break;
      case "help":
        out.push({ kind: "out", text: HELP_HEADER });
        HELP_LINES.forEach((h) => out.push({ kind: "out", text: "", cmd: h.cmd, desc: h.desc }));
        break;
      case "whoami":
        out.push({
          kind: "out",
          text: `${profile.name} — ${profile.role} (backend & microservices).`,
        });
        out.push({
          kind: "out",
          text: "ACPC Finalist · 2000+ problems solved · FastAPI / NestJS / Kubernetes.",
        });
        break;
      case "name":
        out.push({ kind: "out", text: `You are currently: ${username}` });
        out.push({ kind: "out", text: "Use `setname <your-name>` to change it." });
        break;
      case "setname": {
        const raw2 = trimmed.split(/\s+/).slice(1).join(" ").trim();
        const clean = raw2.replace(/[^a-zA-Z0-9_\-.]/g, "").slice(0, 24);
        if (!clean) {
          out.push({ kind: "out", text: "Usage: setname <name>  (letters, numbers, _ - . only)" });
        } else {
          setStoredUsername(clean);
          setUsername(clean);
          out.push({ kind: "out", text: `Nice to meet you, ${clean}. Saved.` });
        }
        break;
      }
      case "theme": {
        const next = toggleTheme();
        out.push({ kind: "out", text: `Theme switched to ${next} mode.` });
        break;
      }
      case "sound": {
        const next = !soundEnabled;
        setSoundEnabled(next);
        writeFlag(STORAGE_KEYS.termSound, next);
        out.push({ kind: "out", text: `Typing sound ${next ? "ENABLED" : "DISABLED"}.` });
        break;
      }
      case "gaming":
      case "game": {
        const now = toggleGamingMode();
        out.push({
          kind: "out",
          text: now
            ? "🎮 Gaming mode ENABLED — enter the site to find a dedicated gaming section."
            : "Gaming mode disabled.",
        });
        break;
      }
      case "color": {
        const sub = (args[0] || "").toLowerCase();
        if (!sub || sub === "list") {
          out.push({ kind: "out", text: "Color tokens (use: color set <key> <#hex>)" });
          (Object.keys(colors) as ColorKey[]).forEach((k) =>
            out.push({ kind: "out", text: `  ${k.padEnd(14)} ${colors[k]}` }),
          );
        } else if (sub === "reset") {
          removeKey(STORAGE_KEYS.termColors);
          setColors({ ...DEFAULT_COLORS });
          out.push({ kind: "out", text: "Colors reset to defaults." });
        } else if (sub === "set") {
          const rawKey = args[1];
          const val = args[2];
          const keyMatch = rawKey
            ? (Object.keys(DEFAULT_COLORS) as ColorKey[]).find(
                (k) => k.toLowerCase() === rawKey.toLowerCase(),
              )
            : undefined;
          if (!keyMatch) {
            out.push({
              kind: "out",
              text: `Unknown key. Try: ${Object.keys(DEFAULT_COLORS).join(", ")}`,
            });
          } else if (!val || !isHex(val)) {
            out.push({ kind: "out", text: "Value must be hex like #ff00aa or #f0a." });
          } else {
            const next = { ...colors, [keyMatch]: val };
            setColors(next);
            writeJson(STORAGE_KEYS.termColors, next);
            out.push({ kind: "out", text: `${keyMatch} → ${val}` });
          }
        } else {
          out.push({ kind: "out", text: "Usage: color [list|reset] | color set <key> <#hex>" });
        }
        break;
      }
      case "alias": {
        const rest = trimmed.split(/\s+/).slice(1).join(" ");
        if (!rest || rest.toLowerCase() === "list") {
          const keys = Object.keys(aliases);
          if (!keys.length) out.push({ kind: "out", text: "No aliases. Try: alias ll=skills" });
          else keys.forEach((k) => out.push({ kind: "out", text: `  ${k} = ${aliases[k]}` }));
        } else {
          const m = rest.match(/^([a-zA-Z0-9_-]+)\s*=\s*(.+)$/);
          if (!m) {
            out.push({ kind: "out", text: "Usage: alias <name>=<command>" });
          } else {
            const name = m[1].toLowerCase();
            const target = m[2].trim().toLowerCase();
            const next = { ...aliases, [name]: target };
            setAliases(next);
            writeJson(STORAGE_KEYS.termAliases, next);
            out.push({ kind: "out", text: `alias ${name} → ${target}` });
          }
        }
        break;
      }
      case "unalias": {
        const name = (args[0] || "").toLowerCase();
        if (!name || !(name in aliases)) {
          out.push({ kind: "out", text: `No such alias: ${name || "(none)"}` });
        } else {
          const next = { ...aliases };
          delete next[name];
          setAliases(next);
          writeJson(STORAGE_KEYS.termAliases, next);
          out.push({ kind: "out", text: `Removed alias ${name}.` });
        }
        break;
      }
      case "experience":
        for (const e of experiences.filter((x) => x.current)) {
          out.push({ kind: "out", text: `Currently @ ${e.shortName} — ${e.role} (${e.period})` });
        }
        out.push({
          kind: "out",
          text: "Backend across NestJS, FastAPI, Flask, .NET, Spring Boot.",
        });
        out.push({
          kind: "out",
          text: `Past: ${experiences
            .filter((x) => !x.current)
            .map((x) => x.shortName)
            .join(", ")}. Type \`enter\` for full timeline.`,
        });
        break;
      case "skills":
        {
          const groups = Object.keys(skills);
          const pad = Math.max(...groups.map((g) => g.length)) + 2;
          for (const g of groups) {
            out.push({ kind: "out", text: `${(g + ":").padEnd(pad)}${skills[g].join(", ")}` });
          }
        }
        break;
      case "projects":
        for (const pr of projects) {
          out.push({ kind: "out", text: `• ${pr.shortName} — ${pr.short}` });
        }
        break;
      case "visits":
        out.push({
          kind: "out",
          text: `This site has been visited ${visits} time${visits === 1 ? "" : "s"} from this browser.`,
        });
        break;
      case "social":
        {
          const pad = Math.max(...links.map((l) => l.label.length)) + 2;
          for (const l of links) {
            out.push({ kind: "out", text: `${(l.label + ":").padEnd(pad)}${l.url}` });
          }
        }
        break;
      case "email":
        out.push({ kind: "out", text: `Opening mail client → ${profile.email}` });
        window.location.href = `mailto:${profile.email}`;
        break;
      case "cv": {
        const CV_URL = profile.cvUrl;
        // Collect flag letters from args like "-s", "-c", "-sc", "-c", "-s"
        let flags = "";
        let unknown = "";
        for (const a of args) {
          if (!a.startsWith("-")) continue;
          const body = a.slice(1);
          for (const ch of body) {
            if (ch === "s" || ch === "c") {
              if (!flags.includes(ch)) flags += ch;
            } else {
              unknown += ch;
            }
          }
        }
        if (unknown) {
          out.push({ kind: "out", text: `Unknown flag(s): -${unknown}. Use -s, -c, or -sc.` });
          break;
        }
        const show = flags.includes("s");
        const copy = flags.includes("c");
        if (!show && !copy) {
          out.push({ kind: "out", text: "Opening CV on Google Drive…" });
          window.open(CV_URL, "_blank");
          break;
        }
        if (show) {
          out.push({ kind: "out", text: `CV link: ${CV_URL}` });
        }
        if (copy) {
          try {
            navigator.clipboard?.writeText(CV_URL);
            out.push({ kind: "out", text: "✓ CV link copied to clipboard." });
          } catch {
            out.push({ kind: "out", text: "Could not copy to clipboard in this browser." });
          }
        }
        break;
      }
      case "clear":
        setLines([]);
        setInput("");
        return;
      case "exit":
      case "open":
        out.push({ kind: "out", text: "Closing terminal window…" });
        setLines((l) => [...l, ...out]);
        setInput("");
        setTimeout(onClose, 250);
        return;
      case "minimize":
      case "min":
        out.push({ kind: "out", text: "Minimizing…" });
        setLines((l) => [...l, ...out]);
        setInput("");
        setTimeout(onMinimize, 200);
        return;
      default:
        out.push({ kind: "out", text: `command not found: ${cmd}. Try \`help\`.` });
    }
    setLines((l) => [...l, ...out]);
    setInput("");
    if (trimmed) {
      while (forwardStack.current.length) {
        backStack.current.push(forwardStack.current.pop()!);
      }
      backStack.current.push(raw);
    }
  }

  function runExpanded(raw: string, depth: number) {
    setLines((l) => [...l, { kind: "sys", text: `→ ${raw}` }]);
    run(raw, depth);
  }

  function suggestion(): string {
    const v = input;
    if (!v) return "";
    const lower = v.toLowerCase();
    if (lower.includes(" ")) return "";
    const pool = [...COMMANDS, ...Object.keys(aliases)];
    const match = pool.find((c) => c.startsWith(lower) && c !== lower);
    return match ? match.slice(v.length) : "";
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (soundEnabled) playKeystroke();
    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (!backStack.current.length) return;
      forwardStack.current.push(input);
      const prev = backStack.current.pop()!;
      setInput(prev);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (!forwardStack.current.length) return;
      backStack.current.push(input);
      const next = forwardStack.current.pop()!;
      setInput(next);
    } else if (e.key === "Tab") {
      e.preventDefault();
      const s = suggestion();
      if (s) setInput(input + s);
    }
  }

  const cssVars = {
    ["--t-prompt" as any]: colors.prompt,
    ["--t-path" as any]: colors.path,
    ["--t-sys" as any]: colors.sys,
    ["--t-out" as any]: colors.out,
    ["--t-in" as any]: colors.in,
    ["--t-ghost" as any]: colors.ghost,
    ["--t-cmd" as any]: colors.cmd,
  } as React.CSSProperties;

  // ---- Minimized: render only a clickable bar pinned to the bottom ----
  if (mode === "min") {
    return (
      <button
        onClick={onRestore}
        className="dark fixed bottom-0 left-0 right-0 z-40 border-t border-border bg-background/80 backdrop-blur-md hover:bg-card/90 transition-colors group"
        aria-label="Restore terminal"
        style={cssVars}
      >
        <div className="max-w-5xl mx-auto px-6 h-11 flex items-center gap-2 font-mono text-xs text-muted-foreground">
          <span className="h-3 w-3 rounded-full" style={{ background: colors.dotRed }} />
          <span className="h-3 w-3 rounded-full" style={{ background: colors.dotGreen }} />
          <span className="ml-2" style={{ color: colors.prompt }}>
            {username}@{profile.domain}
          </span>
          <span>— zsh (minimized)</span>
          <span className="ml-auto opacity-60 group-hover:opacity-100">click to restore</span>
        </div>
      </button>
    );
  }

  const outerStyle: React.CSSProperties = {
    ...cssVars,
    left: winPos.x,
    top: winPos.y,
    width: winSize.w,
    height: winSize.h,
  };

  return (
    <div className="dark fixed z-50" onClick={() => inputRef.current?.focus()} style={outerStyle}>
      <div
        ref={innerRef}
        className="relative h-full w-full overflow-hidden rounded-xl border border-border bg-card/95 shadow-2xl backdrop-blur"
      >
        <div
          className="flex items-center gap-2 border-b border-border bg-background/40 px-4 py-2.5 select-none"
          onMouseDown={onHeaderMouseDown}
          style={{ cursor: mode === "float" ? "move" : "default" }}
        >
          <button
            type="button"
            data-window-btn
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
            className="group h-3 w-3 rounded-full flex items-center justify-center hover:brightness-110"
            style={{ background: colors.dotRed }}
            aria-label="Close terminal"
            title="Close"
          >
            <span className="opacity-0 group-hover:opacity-90 text-[8px] leading-none font-bold text-black">
              ×
            </span>
          </button>
          <button
            type="button"
            data-window-btn
            onClick={(e) => {
              e.stopPropagation();
              onMinimize();
            }}
            className="group h-3 w-3 rounded-full flex items-center justify-center hover:brightness-110"
            style={{ background: colors.dotGreen }}
            aria-label="Minimize terminal"
            title="Minimize to bottom bar"
          >
            <span className="opacity-0 group-hover:opacity-90 text-[10px] leading-none font-bold text-black">
              –
            </span>
          </button>
          <span className="ml-3 font-mono text-xs text-muted-foreground">
            {username}@{profile.domain} — zsh
          </span>
        </div>
        <div
          ref={scrollRef}
          className="overflow-y-auto px-5 py-4 font-mono text-sm leading-relaxed"
          style={{ height: "calc(100% - 41px)" }}
        >
          {lines.map((l, idx) => (
            <div
              key={idx}
              className={l.kind === "sys" ? "font-semibold" : ""}
              style={{
                color: l.kind === "in" ? colors.in : l.kind === "sys" ? colors.sys : colors.out,
              }}
            >
              {l.kind === "in" ? (
                <>
                  <span style={{ color: colors.prompt }}>
                    {username}@{profile.domain}
                  </span>
                  <span style={{ color: colors.path }}>:~$ </span>
                  {renderInputOverlay(l.text, colors.in, colors.cmd, [
                    ...COMMANDS,
                    ...Object.keys(aliases),
                  ])}
                </>
              ) : l.kind === "out" && l.cmd !== undefined ? (
                <>
                  <span style={{ color: colors.cmd }}>{l.cmd.padEnd(16)}</span>
                  <span>{l.desc}</span>
                </>
              ) : (
                <span>{renderHexInline(l.text, l.kind === "sys" ? colors.sys : colors.out)}</span>
              )}
            </div>
          ))}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              run(input);
            }}
            className="mt-1 flex items-center"
          >
            <span style={{ color: colors.prompt }}>
              {username}@{profile.domain}
            </span>
            <span style={{ color: colors.path }}>:~$&nbsp;</span>
            <div className="relative flex-1">
              {/* colored overlay (command token + hex highlight) */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 whitespace-pre font-mono"
                style={{ zIndex: 10 }}
              >
                {renderInputOverlay(input, colors.in, colors.cmd, [
                  ...COMMANDS,
                  ...Object.keys(aliases),
                ])}
              </div>
              {/* ghost suggestion underlay */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 whitespace-pre font-mono"
                style={{ color: colors.ghost }}
              >
                <span className="invisible">{input}</span>
                <span>{suggestion()}</span>
              </div>
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value.slice(0, MAX_INPUT))}
                onKeyDown={onKeyDown}
                maxLength={MAX_INPUT}
                spellCheck={false}
                autoComplete="off"
                className="relative w-full border-0 bg-transparent outline-none"
                style={{ color: "transparent", caretColor: colors.in }}
                aria-label="terminal input"
              />
            </div>
          </form>
        </div>
        {mode === "float" && (
          <div
            onMouseDown={onResizeMouseDown}
            className="absolute bottom-0 right-0 h-4 w-4 cursor-se-resize"
            title="Drag to resize"
            style={{
              background:
                "linear-gradient(135deg, transparent 50%, var(--t-path) 50%, var(--t-path) 60%, transparent 60%, transparent 70%, var(--t-path) 70%, var(--t-path) 80%, transparent 80%)",
            }}
          />
        )}
      </div>
    </div>
  );
}
