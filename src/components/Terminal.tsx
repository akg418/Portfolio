import { useEffect, useRef, useState, useMemo } from "react";

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
  "gaming",
  "game",
  "clear",
  "enter",
  "exit",
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
  { cmd: "gaming", desc: "Toggle gaming mode (unlocks the cups game)" },
  { cmd: "color", desc: "list | set <key> <#hex> | reset" },
  { cmd: "alias", desc: "list | <name>=<command>   (e.g. alias ll=skills)" },
  { cmd: "unalias <name>", desc: "Remove an alias" },
  { cmd: "clear", desc: "Clear the terminal" },
  { cmd: "enter", desc: "Enter the portfolio" },
];

const MAX_INPUT = 50;

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

function loadColors(): Record<ColorKey, string> {
  try {
    const raw = localStorage.getItem("term-colors");
    if (!raw) return { ...DEFAULT_COLORS };
    const parsed = JSON.parse(raw);
    return { ...DEFAULT_COLORS, ...parsed };
  } catch {
    return { ...DEFAULT_COLORS };
  }
}

function isHex(v: string) {
  return /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.test(v);
}

function loadAliases(): Record<string, string> {
  try {
    const raw = localStorage.getItem("term-aliases");
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function getVisits() {
  try {
    const n = Number(localStorage.getItem("visits") || "0");
    return Number.isFinite(n) ? n : 0;
  } catch {
    return 0;
  }
}

function getUsername() {
  try {
    return localStorage.getItem("username") || "guest";
  } catch {
    return "guest";
  }
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
      <span
        key={i}
        style={{ color: part, fontWeight: 700, textShadow: `0 0 6px ${part}` }}
      >
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

export function Terminal({ onEnter }: { onEnter: () => void }) {
  const [lines, setLines] = useState<Line[]>([
    { kind: "sys", text: "ahmed-os v1.0.4 — © Ahmed Khaled" },
    { kind: "sys", text: "Type `help` to see what I can do, or `enter` to open the portfolio." },
  ]);
  const [input, setInput] = useState("");
  const [visits, setVisits] = useState(0);
  const [username, setUsername] = useState("user");
  const [colors, setColors] = useState<Record<ColorKey, string>>(DEFAULT_COLORS);
  const [aliases, setAliases] = useState<Record<string, string>>({});
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const backStack = useRef<string[]>([]);
  const forwardStack = useRef<string[]>([]);

  useEffect(() => {
    const v = getVisits() + 1;
    try {
      localStorage.setItem("visits", String(v));
    } catch {}
    setVisits(v);
    setUsername(getUsername());
    setColors(loadColors());
    setAliases(loadAliases());
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [lines]);

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
        out.push({ kind: "out", text: "Ahmed Khaled — Backend Software Engineer." });
        out.push({ kind: "out", text: "ACPC Finalist · 2000+ problems solved · NestJS / TypeScript." });
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
          try {
            localStorage.setItem("username", clean);
          } catch {}
          setUsername(clean);
          window.dispatchEvent(new CustomEvent("usernamechange", { detail: clean }));
          out.push({ kind: "out", text: `Nice to meet you, ${clean}. Saved.` });
        }
        break;
      }
      case "theme": {
        const root = document.documentElement;
        const next = root.classList.contains("dark") ? "light" : "dark";
        root.classList.toggle("dark", next === "dark");
        try { localStorage.setItem("theme", next); } catch {}
        out.push({ kind: "out", text: `Theme switched to ${next} mode.` });
        break;
      }
      case "gaming":
      case "game": {
        let enabled = false;
        try {
          const v = localStorage.getItem("gamingMode");
          enabled = v !== "0";
          localStorage.setItem("gamingMode", enabled ? "0" : "1");
        } catch {}
        const now = !enabled;
        window.dispatchEvent(new CustomEvent("gamingmode", { detail: now }));
        out.push({ kind: "out", text: now
          ? "🎮 Gaming mode ENABLED — enter the site to find a dedicated gaming section."
          : "Gaming mode disabled." });
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
          try { localStorage.removeItem("term-colors"); } catch {}
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
            out.push({ kind: "out", text: `Unknown key. Try: ${Object.keys(DEFAULT_COLORS).join(", ")}` });
          } else if (!val || !isHex(val)) {
            out.push({ kind: "out", text: "Value must be hex like #ff00aa or #f0a." });
          } else {
            const next = { ...colors, [keyMatch]: val };
            setColors(next);
            try { localStorage.setItem("term-colors", JSON.stringify(next)); } catch {}
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
            try { localStorage.setItem("term-aliases", JSON.stringify(next)); } catch {}
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
          try { localStorage.setItem("term-aliases", JSON.stringify(next)); } catch {}
          out.push({ kind: "out", text: `Removed alias ${name}.` });
        }
        break;
      }
      case "experience":
        out.push({ kind: "out", text: "Currently @ Rehabitaire (Nov 2025 → now)." });
        out.push({ kind: "out", text: "~2 years of backend across NestJS, .NET, Spring Boot, Python." });
        out.push({ kind: "out", text: "Past: ECS, Quick R, Shipd. Type `enter` for full timeline." });
        break;
      case "skills":
        out.push({ kind: "out", text: "Languages: TypeScript, C++, Java, Python, C" });
        out.push({ kind: "out", text: "Backend:   NestJS, Node.js, REST, WebSockets, SSE, JWT, RBAC" });
        out.push({ kind: "out", text: "Data:      PostgreSQL, Redis, MySQL, Prisma, Hibernate" });
        out.push({ kind: "out", text: "Tools:     Docker, Playwright, Jest, Git, BullMQ" });
        break;
      case "projects":
        out.push({ kind: "out", text: "• Character Simulation System — Mistral 7B + RAG (A+ grad project)" });
        out.push({ kind: "out", text: "• Social Media Platform — Spring Boot microservices" });
        out.push({ kind: "out", text: "• Copy for Claude — merged PR to the VS Code extension" });
        break;
      case "visits":
        out.push({ kind: "out", text: `This site has been visited ${visits} time${visits === 1 ? "" : "s"} from this browser.` });
        break;
      case "social":
        out.push({ kind: "out", text: "GitHub:   https://github.com/akg418" });
        out.push({ kind: "out", text: "LinkedIn: https://linkedin.com/in/ahmed-khaled-gom3a" });
        out.push({ kind: "out", text: "Codeforces: https://codeforces.com/profile/gom3a_" });
        out.push({ kind: "out", text: "LeetCode:   https://leetcode.com/u/falta_404/" });
        break;
      case "email":
        out.push({ kind: "out", text: "Opening mail client → ahmedkhaledgomaa404@gmail.com" });
        window.location.href = "mailto:ahmedkhaledgomaa404@gmail.com";
        break;
      case "cv": {
        const CV_URL =
          "https://drive.google.com/drive/folders/1f1RdcHVjX5iOhlRSjPa2McB0ZXaRS4l3?usp=sharing";
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
      case "enter":
      case "exit":
      case "open":
        out.push({ kind: "out", text: "Booting portfolio…" });
        setLines((l) => [...l, ...out]);
        setInput("");
        setTimeout(onEnter, 350);
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

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-background p-4"
      onClick={() => inputRef.current?.focus()}
      style={{
        ["--t-prompt" as any]: colors.prompt,
        ["--t-path" as any]: colors.path,
        ["--t-sys" as any]: colors.sys,
        ["--t-out" as any]: colors.out,
        ["--t-in" as any]: colors.in,
        ["--t-ghost" as any]: colors.ghost,
        ["--t-cmd" as any]: colors.cmd,
      }}
    >
      <div className="w-full max-w-3xl overflow-hidden rounded-xl border border-border bg-card/80 shadow-2xl backdrop-blur">
        <div className="flex items-center gap-2 border-b border-border bg-background/40 px-4 py-2.5">
          <span className="h-3 w-3 rounded-full" style={{ background: colors.dotRed }} />
          <span className="h-3 w-3 rounded-full" style={{ background: colors.dotYellow }} />
          <span className="h-3 w-3 rounded-full" style={{ background: colors.dotGreen }} />
          <span className="ml-3 font-mono text-xs text-muted-foreground">
            {username}@ahmed.dev — zsh
          </span>
        </div>
        <div
          ref={scrollRef}
          className="h-[60vh] overflow-y-auto px-5 py-4 font-mono text-sm leading-relaxed"
        >
          {lines.map((l, idx) => (
            <div
              key={idx}
              className={l.kind === "sys" ? "font-semibold" : ""}
              style={{
                color:
                  l.kind === "in"
                    ? colors.in
                    : l.kind === "sys"
                      ? colors.sys
                      : colors.out,
              }}
            >
              {l.kind === "in" ? (
                <>
                  <span style={{ color: colors.prompt }}>{username}@ahmed.dev</span>
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
                <span>
                  {renderHexInline(
                    l.text,
                    l.kind === "sys" ? colors.sys : colors.out,
                  )}
                </span>
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
            <span style={{ color: colors.prompt }}>{username}@ahmed.dev</span>
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
      </div>
    </div>
  );
}
