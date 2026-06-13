import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { S as Slot } from "../_libs/radix-ui__react-slot.mjs";
import { c as cva } from "../_libs/class-variance-authority.mjs";
import { c as clsx } from "../_libs/clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
import { A as ArrowUpRight, G as Github, L as Linkedin, C as CodeXml, T as Trophy, F as FileText, B as Briefcase, a as GraduationCap, M as MapPin, b as Globe, c as Mail, P as Phone, S as SquareTerminal, d as Clock, e as Gamepad2, R as RotateCw, f as Sun, g as Moon } from "../_libs/lucide-react.mjs";
import "../_libs/radix-ui__react-compose-refs.mjs";
function cn(...inputs) {
  return twMerge(clsx(inputs));
}
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline: "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline"
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);
const Button = reactExports.forwardRef(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Comp, { className: cn(buttonVariants({ variant, size, className })), ref, ...props });
  }
);
Button.displayName = "Button";
const badgeVariants = cva(
  "inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80",
        secondary: "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive: "border-transparent bg-destructive text-destructive-foreground shadow hover:bg-destructive/80",
        outline: "text-foreground"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);
function Badge({ className, variant, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: cn(badgeVariants({ variant }), className), ...props });
}
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
  "unalias"
];
const HELP_HEADER = "Available commands:";
const HELP_LINES = [
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
  { cmd: "exit", desc: "Close the terminal window" }
];
const MAX_INPUT = 50;
const DEFAULT_COLORS = {
  prompt: "#22d3ee",
  path: "#94a3b8",
  sys: "#a78bfa",
  out: "#e5e7eb",
  in: "#f8fafc",
  ghost: "#64748b",
  dotRed: "#ef4444",
  dotYellow: "#eab308",
  dotGreen: "#22c55e",
  cmd: "#facc15"
  // yellow-400
};
function loadColors() {
  try {
    const raw = localStorage.getItem("term-colors");
    if (!raw) return { ...DEFAULT_COLORS };
    const parsed = JSON.parse(raw);
    return { ...DEFAULT_COLORS, ...parsed };
  } catch {
    return { ...DEFAULT_COLORS };
  }
}
function isHex(v) {
  return /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.test(v);
}
function loadAliases() {
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
function renderHexInline(text, baseColor) {
  const parts = text.split(/(#(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{6})(?![0-9a-fA-F]))/);
  return parts.map(
    (part, i) => isHex(part) ? /* @__PURE__ */ jsxRuntimeExports.jsx(
      "span",
      {
        style: { color: part, fontWeight: 700, textShadow: `0 0 6px ${part}` },
        children: part
      },
      i
    ) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: baseColor }, children: part }, i)
  );
}
function renderInputOverlay(text, baseColor, cmdColor, knownCommands) {
  if (!text) return null;
  const firstSpace = text.indexOf(" ");
  const head = firstSpace === -1 ? text : text.slice(0, firstSpace);
  const tail = firstSpace === -1 ? "" : text.slice(firstSpace);
  const isKnown = knownCommands.includes(head.toLowerCase());
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "span",
      {
        style: {
          color: isKnown ? cmdColor : baseColor,
          fontWeight: isKnown ? 700 : 400
        },
        children: head
      }
    ),
    tail ? renderHexInline(tail, baseColor) : null
  ] });
}
let audioCtx = null;
function playKeystroke() {
  try {
    if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    if (audioCtx.state === "suspended") audioCtx.resume();
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = "square";
    osc.frequency.setValueAtTime(300, audioCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(50, audioCtx.currentTime + 0.02);
    gain.gain.setValueAtTime(0.05, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(1e-3, audioCtx.currentTime + 0.02);
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start();
    osc.stop(audioCtx.currentTime + 0.02);
  } catch {
  }
}
function Terminal({
  mode,
  onClose,
  onMinimize,
  onToggleFull,
  onRestore
}) {
  const [lines, setLines] = reactExports.useState([
    { kind: "sys", text: "ahmed-os v1.0.4 — © Ahmed Khaled" },
    { kind: "sys", text: "Type `help` to see what I can do. Drag the title bar to move · drag the corner to resize." }
  ]);
  const [input, setInput] = reactExports.useState("");
  const [visits, setVisits] = reactExports.useState(0);
  const [username, setUsername] = reactExports.useState("user");
  const [colors, setColors] = reactExports.useState(DEFAULT_COLORS);
  const [aliases, setAliases] = reactExports.useState({});
  const [soundEnabled, setSoundEnabled] = reactExports.useState(false);
  const inputRef = reactExports.useRef(null);
  const scrollRef = reactExports.useRef(null);
  const innerRef = reactExports.useRef(null);
  const backStack = reactExports.useRef([]);
  const forwardStack = reactExports.useRef([]);
  const [winPos, setWinPos] = reactExports.useState(() => {
    if (typeof window === "undefined") return { x: 80, y: 80 };
    try {
      const raw = localStorage.getItem("term-winpos");
      if (raw) return JSON.parse(raw);
    } catch {
    }
    return {
      x: Math.max(24, Math.round(window.innerWidth / 2 - 360)),
      y: Math.max(24, Math.round(window.innerHeight / 2 - 260))
    };
  });
  const [winSize, setWinSize] = reactExports.useState(() => {
    if (typeof window === "undefined") return { w: 720, h: 480 };
    try {
      const raw = localStorage.getItem("term-winsize");
      if (raw) return JSON.parse(raw);
    } catch {
    }
    return {
      w: Math.min(720, window.innerWidth - 48),
      h: Math.min(480, window.innerHeight - 96)
    };
  });
  reactExports.useEffect(() => {
    try {
      localStorage.setItem("term-winpos", JSON.stringify(winPos));
    } catch {
    }
  }, [winPos]);
  reactExports.useEffect(() => {
    try {
      localStorage.setItem("term-winsize", JSON.stringify(winSize));
    } catch {
    }
  }, [winSize]);
  reactExports.useEffect(() => {
    const v = getVisits() + 1;
    try {
      localStorage.setItem("visits", String(v));
      setSoundEnabled(localStorage.getItem("term-sound") === "1");
    } catch {
    }
    setVisits(v);
    setUsername(getUsername());
    setColors(loadColors());
    setAliases(loadAliases());
    inputRef.current?.focus();
  }, []);
  reactExports.useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [lines]);
  reactExports.useEffect(() => {
    if (mode !== "min") inputRef.current?.focus();
  }, [mode]);
  reactExports.useEffect(() => {
    if (mode === "min") return;
    const onDocMouseDown = (e) => {
      const t = e.target;
      if (!t) return;
      if (innerRef.current && !innerRef.current.contains(t)) {
        onMinimize();
      }
    };
    document.addEventListener("mousedown", onDocMouseDown);
    return () => document.removeEventListener("mousedown", onDocMouseDown);
  }, [mode, onMinimize]);
  function onHeaderMouseDown(e) {
    if (mode !== "float") return;
    if (e.target.closest("[data-window-btn]")) return;
    e.preventDefault();
    const startX = e.clientX;
    const startY = e.clientY;
    const startPos = { ...winPos };
    const onMove = (ev) => {
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
  function onResizeMouseDown(e) {
    if (mode !== "float") return;
    e.preventDefault();
    e.stopPropagation();
    const startX = e.clientX;
    const startY = e.clientY;
    const startSize = { ...winSize };
    const onMove = (ev) => {
      const nw = Math.max(360, Math.min(window.innerWidth - winPos.x - 8, startSize.w + (ev.clientX - startX)));
      const nh = Math.max(240, Math.min(window.innerHeight - winPos.y - 8, startSize.h + (ev.clientY - startY)));
      setWinSize({ w: nw, h: nh });
    };
    const onUp = () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
  }
  function run(raw, depth = 0) {
    const trimmed = raw.trim();
    const lower = trimmed.toLowerCase();
    const [cmd, ...args] = lower.split(/\s+/);
    const out = [{ kind: "in", text: raw }];
    const aliasMap = loadAliases();
    if (cmd && aliasMap[cmd] && depth < 5) {
      const expanded = aliasMap[cmd] + (args.length ? " " + args.join(" ") : "");
      setLines((l) => [...l, { kind: "in", text: raw }]);
      setInput("");
      if (trimmed) {
        while (forwardStack.current.length) backStack.current.push(forwardStack.current.pop());
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
          } catch {
          }
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
        try {
          localStorage.setItem("theme", next);
        } catch {
        }
        out.push({ kind: "out", text: `Theme switched to ${next} mode.` });
        break;
      }
      case "sound": {
        const next = !soundEnabled;
        setSoundEnabled(next);
        try {
          localStorage.setItem("term-sound", next ? "1" : "0");
        } catch {
        }
        out.push({ kind: "out", text: `Typing sound ${next ? "ENABLED" : "DISABLED"}.` });
        break;
      }
      case "gaming":
      case "game": {
        let enabled = false;
        try {
          const v = localStorage.getItem("gamingMode");
          enabled = v !== "0";
          localStorage.setItem("gamingMode", enabled ? "0" : "1");
        } catch {
        }
        const now = !enabled;
        window.dispatchEvent(new CustomEvent("gamingmode", { detail: now }));
        out.push({ kind: "out", text: now ? "🎮 Gaming mode ENABLED — enter the site to find a dedicated gaming section." : "Gaming mode disabled." });
        break;
      }
      case "color": {
        const sub = (args[0] || "").toLowerCase();
        if (!sub || sub === "list") {
          out.push({ kind: "out", text: "Color tokens (use: color set <key> <#hex>)" });
          Object.keys(colors).forEach(
            (k) => out.push({ kind: "out", text: `  ${k.padEnd(14)} ${colors[k]}` })
          );
        } else if (sub === "reset") {
          try {
            localStorage.removeItem("term-colors");
          } catch {
          }
          setColors({ ...DEFAULT_COLORS });
          out.push({ kind: "out", text: "Colors reset to defaults." });
        } else if (sub === "set") {
          const rawKey = args[1];
          const val = args[2];
          const keyMatch = rawKey ? Object.keys(DEFAULT_COLORS).find(
            (k) => k.toLowerCase() === rawKey.toLowerCase()
          ) : void 0;
          if (!keyMatch) {
            out.push({ kind: "out", text: `Unknown key. Try: ${Object.keys(DEFAULT_COLORS).join(", ")}` });
          } else if (!val || !isHex(val)) {
            out.push({ kind: "out", text: "Value must be hex like #ff00aa or #f0a." });
          } else {
            const next = { ...colors, [keyMatch]: val };
            setColors(next);
            try {
              localStorage.setItem("term-colors", JSON.stringify(next));
            } catch {
            }
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
            try {
              localStorage.setItem("term-aliases", JSON.stringify(next));
            } catch {
            }
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
          try {
            localStorage.setItem("term-aliases", JSON.stringify(next));
          } catch {
          }
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
        const CV_URL = "https://drive.google.com/drive/folders/1f1RdcHVjX5iOhlRSjPa2McB0ZXaRS4l3?usp=sharing";
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
        backStack.current.push(forwardStack.current.pop());
      }
      backStack.current.push(raw);
    }
  }
  function runExpanded(raw, depth) {
    setLines((l) => [...l, { kind: "sys", text: `→ ${raw}` }]);
    run(raw, depth);
  }
  function suggestion() {
    const v = input;
    if (!v) return "";
    const lower = v.toLowerCase();
    if (lower.includes(" ")) return "";
    const pool = [...COMMANDS, ...Object.keys(aliases)];
    const match = pool.find((c) => c.startsWith(lower) && c !== lower);
    return match ? match.slice(v.length) : "";
  }
  function onKeyDown(e) {
    if (soundEnabled) playKeystroke();
    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (!backStack.current.length) return;
      forwardStack.current.push(input);
      const prev = backStack.current.pop();
      setInput(prev);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (!forwardStack.current.length) return;
      backStack.current.push(input);
      const next = forwardStack.current.pop();
      setInput(next);
    } else if (e.key === "Tab") {
      e.preventDefault();
      const s = suggestion();
      if (s) setInput(input + s);
    }
  }
  const cssVars = {
    ["--t-prompt"]: colors.prompt,
    ["--t-path"]: colors.path,
    ["--t-sys"]: colors.sys,
    ["--t-out"]: colors.out,
    ["--t-in"]: colors.in,
    ["--t-ghost"]: colors.ghost,
    ["--t-cmd"]: colors.cmd
  };
  if (mode === "min") {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        onClick: onRestore,
        className: "dark fixed bottom-0 left-0 right-0 z-40 border-t border-border bg-background/80 backdrop-blur-md hover:bg-card/90 transition-colors group",
        "aria-label": "Restore terminal",
        style: cssVars,
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-5xl mx-auto px-6 h-11 flex items-center gap-2 font-mono text-xs text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-3 w-3 rounded-full", style: { background: colors.dotRed } }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-3 w-3 rounded-full", style: { background: colors.dotGreen } }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "ml-2", style: { color: colors.prompt }, children: [
            username,
            "@ahmed.dev"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "— zsh (minimized)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-auto opacity-60 group-hover:opacity-100", children: "click to restore" })
        ] })
      }
    );
  }
  const isFull = mode === "full";
  const outerClass = isFull ? "dark fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm p-4" : "dark fixed z-50";
  const outerStyle = isFull ? cssVars : { ...cssVars, left: winPos.x, top: winPos.y, width: winSize.w, height: winSize.h };
  const innerClass = isFull ? "w-full max-w-3xl overflow-hidden rounded-xl border border-border bg-card/90 shadow-2xl backdrop-blur" : "relative h-full w-full overflow-hidden rounded-xl border border-border bg-card/95 shadow-2xl backdrop-blur";
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: outerClass,
      onClick: () => inputRef.current?.focus(),
      style: outerStyle,
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { ref: innerRef, className: innerClass, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex items-center gap-2 border-b border-border bg-background/40 px-4 py-2.5 select-none",
            onMouseDown: onHeaderMouseDown,
            style: { cursor: mode === "float" ? "move" : "default" },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  "data-window-btn": true,
                  onClick: (e) => {
                    e.stopPropagation();
                    onClose();
                  },
                  className: "group h-3 w-3 rounded-full flex items-center justify-center hover:brightness-110",
                  style: { background: colors.dotRed },
                  "aria-label": "Close terminal",
                  title: "Close",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "opacity-0 group-hover:opacity-90 text-[8px] leading-none font-bold text-black", children: "×" })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  "data-window-btn": true,
                  onClick: (e) => {
                    e.stopPropagation();
                    onMinimize();
                  },
                  className: "group h-3 w-3 rounded-full flex items-center justify-center hover:brightness-110",
                  style: { background: colors.dotGreen },
                  "aria-label": "Minimize terminal",
                  title: "Minimize to bottom bar",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "opacity-0 group-hover:opacity-90 text-[10px] leading-none font-bold text-black", children: "–" })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "ml-3 font-mono text-xs text-muted-foreground", children: [
                username,
                "@ahmed.dev — zsh"
              ] })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            ref: scrollRef,
            className: "overflow-y-auto px-5 py-4 font-mono text-sm leading-relaxed",
            style: { height: isFull ? "60vh" : "calc(100% - 41px)" },
            children: [
              lines.map((l, idx) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: l.kind === "sys" ? "font-semibold" : "",
                  style: {
                    color: l.kind === "in" ? colors.in : l.kind === "sys" ? colors.sys : colors.out
                  },
                  children: l.kind === "in" ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { style: { color: colors.prompt }, children: [
                      username,
                      "@ahmed.dev"
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: colors.path }, children: ":~$ " }),
                    renderInputOverlay(l.text, colors.in, colors.cmd, [
                      ...COMMANDS,
                      ...Object.keys(aliases)
                    ])
                  ] }) : l.kind === "out" && l.cmd !== void 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: colors.cmd }, children: l.cmd.padEnd(16) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: l.desc })
                  ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: renderHexInline(
                    l.text,
                    l.kind === "sys" ? colors.sys : colors.out
                  ) })
                },
                idx
              )),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "form",
                {
                  onSubmit: (e) => {
                    e.preventDefault();
                    run(input);
                  },
                  className: "mt-1 flex items-center",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { style: { color: colors.prompt }, children: [
                      username,
                      "@ahmed.dev"
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: colors.path }, children: ":~$ " }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex-1", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "div",
                        {
                          "aria-hidden": true,
                          className: "pointer-events-none absolute inset-0 whitespace-pre font-mono",
                          style: { zIndex: 10 },
                          children: renderInputOverlay(input, colors.in, colors.cmd, [
                            ...COMMANDS,
                            ...Object.keys(aliases)
                          ])
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        "div",
                        {
                          "aria-hidden": true,
                          className: "pointer-events-none absolute inset-0 whitespace-pre font-mono",
                          style: { color: colors.ghost },
                          children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "invisible", children: input }),
                            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: suggestion() })
                          ]
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "input",
                        {
                          ref: inputRef,
                          value: input,
                          onChange: (e) => setInput(e.target.value.slice(0, MAX_INPUT)),
                          onKeyDown,
                          maxLength: MAX_INPUT,
                          spellCheck: false,
                          autoComplete: "off",
                          className: "relative w-full border-0 bg-transparent outline-none",
                          style: { color: "transparent", caretColor: colors.in },
                          "aria-label": "terminal input"
                        }
                      )
                    ] })
                  ]
                }
              )
            ]
          }
        ),
        mode === "float" && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            onMouseDown: onResizeMouseDown,
            className: "absolute bottom-0 right-0 h-4 w-4 cursor-se-resize",
            title: "Drag to resize",
            style: {
              background: "linear-gradient(135deg, transparent 50%, var(--t-path) 50%, var(--t-path) 60%, transparent 60%, transparent 70%, var(--t-path) 70%, var(--t-path) 80%, transparent 80%)"
            }
          }
        )
      ] })
    }
  );
}
function MouseGlow() {
  const [mounted, setMounted] = reactExports.useState(false);
  const [pos, setPos] = reactExports.useState({ x: -200, y: -200 });
  reactExports.useEffect(() => {
    setMounted(true);
    const onMove = (e) => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);
  if (!mounted) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      "aria-hidden": true,
      className: "pointer-events-none fixed inset-0 z-0 transition-[background] duration-100",
      style: {
        background: `radial-gradient(600px circle at ${pos.x}px ${pos.y}px, oklch(0.68 0.22 305 / 0.18), transparent 45%), radial-gradient(900px circle at ${pos.x}px ${pos.y}px, oklch(0.78 0.17 200 / 0.10), transparent 60%)`
      }
    }
  );
}
function CustomCursor() {
  const [mounted, setMounted] = reactExports.useState(false);
  const [pos, setPos] = reactExports.useState({ x: -100, y: -100 });
  const [hover, setHover] = reactExports.useState(false);
  const [down, setDown] = reactExports.useState(false);
  reactExports.useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    setMounted(true);
    document.body.classList.add("custom-cursor");
    const onMove = (e) => {
      setPos({ x: e.clientX, y: e.clientY });
      const t = e.target;
      setHover(!!t?.closest("a,button,input,textarea,[role=button]"));
    };
    const onDown = () => setDown(true);
    const onUp = () => setDown(false);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    return () => {
      document.body.classList.remove("custom-cursor");
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
    };
  }, []);
  if (!mounted) return null;
  const size = hover ? 44 : 12;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        "aria-hidden": true,
        className: "pointer-events-none fixed z-[100] rounded-full transition-[width,height,background,border-color] duration-150",
        style: {
          width: size,
          height: size,
          left: pos.x - size / 2,
          top: pos.y - size / 2,
          border: "1.5px solid oklch(0.78 0.17 200)",
          background: hover ? "oklch(0.78 0.17 200 / 0.15)" : "transparent",
          transform: down ? "scale(0.85)" : "scale(1)"
        }
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        "aria-hidden": true,
        className: "pointer-events-none fixed z-[100] h-1 w-1 rounded-full",
        style: {
          left: pos.x - 2,
          top: pos.y - 2,
          background: "oklch(0.97 0.01 250)"
        }
      }
    )
  ] });
}
function Typewriter({
  words,
  className,
  speed = 80,
  pause = 1400
}) {
  const [mounted, setMounted] = reactExports.useState(false);
  const [i, setI] = reactExports.useState(0);
  const [text, setText] = reactExports.useState("");
  const [deleting, setDeleting] = reactExports.useState(false);
  reactExports.useEffect(() => setMounted(true), []);
  reactExports.useEffect(() => {
    if (!mounted) return;
    const current = words[i % words.length];
    const done = !deleting && text === current;
    const cleared = deleting && text === "";
    const delay = done ? pause : cleared ? 300 : deleting ? speed / 2 : speed;
    const t = setTimeout(() => {
      if (done) setDeleting(true);
      else if (cleared) {
        setDeleting(false);
        setI((v) => v + 1);
      } else {
        setText(
          deleting ? current.slice(0, text.length - 1) : current.slice(0, text.length + 1)
        );
      }
    }, delay);
    return () => clearTimeout(t);
  }, [text, deleting, i, mounted, words, speed, pause]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className, children: [
    mounted ? text : words[0],
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "caret-blink ml-1 inline-block h-[1em] w-[2px] -mb-1 bg-primary align-middle" })
  ] });
}
function Starfield() {
  const canvasRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;
    const dpr = window.devicePixelRatio || 1;
    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = width + "px";
      canvas.style.height = height + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);
    const isDark = () => document.documentElement.classList.contains("dark");
    const STAR_COUNT = Math.min(220, Math.floor(width * height / 7e3));
    const stars = Array.from({ length: STAR_COUNT }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      z: Math.random() * 0.8 + 0.2,
      r: Math.random() * 1.6 + 0.3,
      tw: Math.random() * Math.PI * 2,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35
    }));
    const PLANET_COUNT = 3;
    const planets = Array.from({ length: PLANET_COUNT }, (_, i) => ({
      x: Math.random() * width,
      y: Math.random() * height,
      r: 60 + i * 30 + Math.random() * 40,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      hue: [200, 280, 320][i]
    }));
    let raf = 0;
    const render = (t) => {
      ctx.clearRect(0, 0, width, height);
      const dark = isDark();
      for (const p of planets) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < -p.r) p.x = width + p.r;
        if (p.x > width + p.r) p.x = -p.r;
        if (p.y < -p.r) p.y = height + p.r;
        if (p.y > height + p.r) p.y = -p.r;
        const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r);
        const alpha = dark ? 0.12 : 0.22;
        const light = dark ? 65 : 55;
        g.addColorStop(0, `hsla(${p.hue}, 90%, ${light}%, ${alpha})`);
        g.addColorStop(1, `hsla(${p.hue}, 90%, 50%, 0)`);
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
      for (const s of stars) {
        s.x += s.vx * s.z;
        s.y += s.vy * s.z;
        if (s.x < 0) s.x = width;
        if (s.x > width) s.x = 0;
        if (s.y < 0) s.y = height;
        if (s.y > height) s.y = 0;
        s.tw += 0.04;
        const a = (0.4 + Math.sin(s.tw) * 0.3) * s.z;
        ctx.fillStyle = dark ? `rgba(180, 210, 255, ${a})` : `rgba(60, 80, 160, ${a * 0.9})`;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r * s.z, 0, Math.PI * 2);
        ctx.fill();
      }
      raf = requestAnimationFrame(render);
    };
    raf = requestAnimationFrame(render);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "canvas",
    {
      ref: canvasRef,
      "aria-hidden": true,
      className: "pointer-events-none fixed inset-0 z-0 opacity-90"
    }
  );
}
const SPACING = 110;
const CUP_IDS = [0, 1, 2];
function CupGame() {
  const [slotOf, setSlotOf] = reactExports.useState([0, 1, 2]);
  const [lifted, setLifted] = reactExports.useState(null);
  const [singleLift, setSingleLift] = reactExports.useState(null);
  const [ballCup, setBallCup] = reactExports.useState(0);
  const [phase, setPhase] = reactExports.useState("idle");
  const [speed, setSpeed] = reactExports.useState(5);
  const [message, setMessage] = reactExports.useState("Press start to shuffle the cups.");
  const [currentDur, setCurrentDur] = reactExports.useState(500);
  const timer = reactExports.useRef(null);
  const baseDuration = () => Math.max(180, 750 - speed * 55);
  const randomDuration = () => {
    const base = baseDuration();
    return Math.round(base * (0.65 + Math.random() * 0.7));
  };
  reactExports.useEffect(() => () => {
    if (timer.current) window.clearTimeout(timer.current);
  }, []);
  const start = () => {
    const newBall = Math.floor(Math.random() * 3);
    setBallCup(newBall);
    setSlotOf([0, 1, 2]);
    setLifted(null);
    setPhase("preview");
    setSingleLift(newBall);
    setMessage("👀 The ball is here — remember its cup!");
    timer.current = window.setTimeout(() => {
      setSingleLift(null);
      timer.current = window.setTimeout(() => {
        setPhase("shuffling");
        setMessage("Watch carefully…");
        const swaps = 8 + Math.floor(speed * 1.2);
        let count = 0;
        const doSwap = () => {
          const slotA = Math.floor(Math.random() * 3);
          let slotB = Math.floor(Math.random() * 3);
          while (slotB === slotA) slotB = Math.floor(Math.random() * 3);
          const dur2 = randomDuration();
          setCurrentDur(dur2);
          setSlotOf((prev) => {
            const cupA = prev.indexOf(slotA);
            const cupB = prev.indexOf(slotB);
            const next = [...prev];
            next[cupA] = slotB;
            next[cupB] = slotA;
            setLifted([cupA, cupB]);
            return next;
          });
          count++;
          timer.current = window.setTimeout(() => {
            setLifted(null);
            if (count >= swaps) {
              timer.current = window.setTimeout(() => {
                setPhase("pick");
                setMessage("Where is the ball? Click a cup.");
              }, 250);
            } else {
              timer.current = window.setTimeout(doSwap, 40 + Math.random() * 180);
            }
          }, dur2);
        };
        doSwap();
      }, 500);
    }, 1400);
  };
  const pick = (cupId) => {
    if (phase !== "pick") return;
    if (cupId === ballCup) {
      setPhase("won");
      setMessage("You got it! Nice eye.");
    } else {
      setPhase("lost");
      setMessage("Not this one. Try again!");
    }
  };
  const reveal = phase === "won" || phase === "lost";
  const isPreview = phase === "preview";
  const dur = currentDur;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "section",
    {
      id: "game",
      className: "py-24 border-t border-border",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Gamepad2, { className: "w-5 h-5 text-primary" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-3xl font-bold tracking-tight", children: "Gaming mode — Cups & Ball" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mb-10", children: "Find the cup hiding the ball after the shuffle. Adjust the speed to your reflexes." }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-border bg-card p-6 sm:p-10 overflow-hidden", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "relative mx-auto h-56 select-none",
              style: { width: SPACING * 2 + 96 },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "absolute bottom-2 w-8 h-8 rounded-full bg-gradient-to-br from-accent to-primary shadow-[0_0_20px_var(--color-primary)]",
                    style: {
                      left: 48 - 16,
                      transform: `translateX(${slotOf[ballCup] * SPACING}px)`,
                      transition: `transform ${dur}ms cubic-bezier(.5,.05,.5,.95), opacity 200ms`,
                      opacity: reveal || isPreview || phase === "idle" ? 1 : 0
                    }
                  }
                ),
                CUP_IDS.map((cupId) => {
                  const slot = slotOf[cupId];
                  const isLifted = lifted?.includes(cupId);
                  const liftY = isLifted ? lifted[0] === cupId ? -(50 + Math.random() * 30) : 50 + Math.random() * 30 : 0;
                  const isBall = cupId === ballCup;
                  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "button",
                    {
                      onClick: () => pick(cupId),
                      disabled: phase !== "pick",
                      "aria-label": `Cup ${cupId + 1}`,
                      className: "absolute bottom-0 group disabled:cursor-default",
                      style: {
                        left: 0,
                        width: 96,
                        transform: `translate(${slot * SPACING}px, ${liftY}px)`,
                        transition: `transform ${dur}ms cubic-bezier(.5,.05,.5,.95)`,
                        zIndex: isLifted ? liftY < 0 ? 30 : 10 : 20
                      },
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "div",
                          {
                            className: `mx-auto w-24 h-32 rounded-t-[60%] rounded-b-md bg-gradient-to-b from-primary to-accent shadow-xl transition-transform duration-300 ${phase === "pick" ? "group-hover:-translate-y-2" : ""} ${reveal && isBall || isPreview && singleLift === cupId ? "-translate-y-20" : ""}`
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto mt-1 h-1.5 w-16 rounded-full bg-foreground/20 blur-[2px]" })
                      ]
                    },
                    cupId
                  );
                })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-8 text-center text-sm font-mono text-foreground/90 min-h-5", children: message }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8 grid sm:grid-cols-[1fr_auto] gap-4 items-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "flex items-center gap-3 text-xs font-mono text-muted-foreground", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-16", children: "Speed" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  type: "range",
                  min: 1,
                  max: 10,
                  value: speed,
                  onChange: (e) => setSpeed(Number(e.target.value)),
                  className: "flex-1 accent-[var(--color-primary)]"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-8 text-right text-foreground", children: speed })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { onClick: start, disabled: phase === "shuffling", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(RotateCw, {}),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: phase === "idle" ? "Start" : "Shuffle again" })
            ] })
          ] })
        ] })
      ]
    }
  );
}
function applyTheme(theme) {
  const root = document.documentElement;
  root.classList.toggle("dark", theme === "dark");
  try {
    localStorage.setItem("theme", theme);
  } catch {
  }
}
function ThemeToggle() {
  const [theme, setTheme] = reactExports.useState("dark");
  const [mounted, setMounted] = reactExports.useState(false);
  reactExports.useEffect(() => {
    setMounted(true);
    let t = "dark";
    try {
      const stored = localStorage.getItem("theme");
      if (stored === "light" || stored === "dark") t = stored;
    } catch {
    }
    setTheme(t);
    applyTheme(t);
  }, []);
  if (!mounted) return null;
  const toggle = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    applyTheme(next);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "button",
    {
      onClick: toggle,
      "aria-label": "Toggle theme",
      className: "h-9 w-9 inline-flex items-center justify-center rounded-md border border-border bg-card hover:bg-secondary transition-colors",
      children: theme === "dark" ? /* @__PURE__ */ jsxRuntimeExports.jsx(Sun, { className: "w-4 h-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Moon, { className: "w-4 h-4" })
    }
  );
}
const BASE_ITEMS = [
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "contact", label: "Contact" }
];
const GAMING_ITEM = { id: "game", label: "Gaming" };
function NavBar() {
  const [active, setActive] = reactExports.useState("experience");
  const [hover, setHover] = reactExports.useState(null);
  const [progress, setProgress] = reactExports.useState(0);
  const [gamingMode, setGamingMode] = reactExports.useState(false);
  const itemRefs = reactExports.useRef({});
  const containerRef = reactExports.useRef(null);
  const [indicator, setIndicator] = reactExports.useState({ left: 0, width: 0, opacity: 0 });
  const items = reactExports.useMemo(
    () => gamingMode ? [BASE_ITEMS[0], GAMING_ITEM, ...BASE_ITEMS.slice(1)] : BASE_ITEMS,
    [gamingMode]
  );
  reactExports.useEffect(() => {
    try {
      setGamingMode(localStorage.getItem("gamingMode") !== "0");
    } catch {
    }
    const onGaming = (e) => setGamingMode(!!e.detail);
    window.addEventListener("gamingmode", onGaming);
    return () => window.removeEventListener("gamingmode", onGaming);
  }, []);
  reactExports.useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const total = h.scrollHeight - h.clientHeight;
      setProgress(total > 0 ? Math.min(1, Math.max(0, h.scrollTop / total)) : 0);
      const offset = 120;
      let current = items[0].id;
      let bestTop = -Infinity;
      for (const it of items) {
        const el = document.getElementById(it.id);
        if (!el) continue;
        const top = el.getBoundingClientRect().top - offset;
        if (top <= 0 && top > bestTop) {
          bestTop = top;
          current = it.id;
        }
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [items]);
  reactExports.useLayoutEffect(() => {
    const target = hover ?? active;
    const el = itemRefs.current[target];
    const wrap = containerRef.current;
    if (!el || !wrap) return;
    const a = el.getBoundingClientRect();
    const b = wrap.getBoundingClientRect();
    setIndicator({ left: a.left - b.left, width: a.width, opacity: 1 });
  }, [hover, active, items]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "sticky top-0 z-40 border-b border-border bg-background/70 backdrop-blur-md", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("nav", { className: "mx-auto flex h-16 max-w-5xl items-center justify-between px-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: "#top", className: "font-mono text-sm font-semibold tracking-tight", children: [
        "ahmed",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: ".dev" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          ref: containerRef,
          className: "relative hidden items-center gap-1 sm:flex",
          onMouseLeave: () => setHover(null),
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                "aria-hidden": true,
                className: "pointer-events-none absolute top-1/2 -translate-y-1/2 rounded-md border border-primary/50 bg-primary/10",
                style: {
                  left: indicator.left,
                  width: indicator.width,
                  height: 32,
                  opacity: indicator.opacity,
                  transition: "left 750ms cubic-bezier(0.22, 1, 0.36, 1), width 750ms cubic-bezier(0.22, 1, 0.36, 1), opacity 250ms",
                  boxShadow: "0 0 18px color-mix(in oklab, var(--color-primary) 40%, transparent)"
                }
              }
            ),
            items.map((it) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              "a",
              {
                href: `#${it.id}`,
                ref: (el) => {
                  itemRefs.current[it.id] = el;
                },
                onMouseEnter: () => setHover(it.id),
                className: `relative z-10 rounded-md px-3 py-1.5 text-sm transition-colors ${active === it.id ? "text-foreground" : "text-muted-foreground hover:text-foreground"}`,
                children: it.label
              },
              it.id
            ))
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ThemeToggle, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, size: "sm", variant: "outline", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: "mailto:ahmedkhaledgomaa404@gmail.com", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, {}),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hidden sm:inline", children: "Get in touch" })
        ] }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-[2px] w-full bg-transparent", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "h-full origin-left bg-gradient-to-r from-primary via-accent to-primary",
        style: {
          transform: `scaleX(${progress})`,
          transformOrigin: "left",
          transition: "transform 80ms linear",
          boxShadow: "0 0 10px color-mix(in oklab, var(--color-primary) 50%, transparent)"
        }
      }
    ) })
  ] });
}
function fmt(sec) {
  const h = Math.floor(sec / 3600);
  const m = Math.floor(sec % 3600 / 60);
  const s = Math.floor(sec % 60);
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}
function SessionTimer() {
  const startRef = reactExports.useRef(/* @__PURE__ */ new Date());
  const [now, setNow] = reactExports.useState(/* @__PURE__ */ new Date());
  const [hover, setHover] = reactExports.useState(false);
  reactExports.useEffect(() => {
    const id = setInterval(() => setNow(/* @__PURE__ */ new Date()), 1e3);
    return () => clearInterval(id);
  }, []);
  const elapsed = Math.max(0, Math.floor((now.getTime() - startRef.current.getTime()) / 1e3));
  const h = Math.floor(elapsed / 3600);
  const m = Math.floor(elapsed % 3600 / 60);
  const s = elapsed % 60;
  const arrivedAt = startRef.current.toLocaleString(void 0, {
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    day: "2-digit",
    month: "short"
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "fixed right-4 top-20 z-30 hidden sm:block",
      onMouseEnter: () => setHover(true),
      onMouseLeave: () => setHover(false),
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 rounded-md border border-border bg-background/70 px-2.5 py-1 font-mono text-xs text-muted-foreground backdrop-blur-md", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "h-3.5 w-3.5 text-primary" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "tabular-nums", children: fmt(elapsed) })
        ] }),
        hover && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute right-0 mt-2 w-72 rounded-md border border-border bg-popover/95 p-3 text-xs text-popover-foreground shadow-lg backdrop-blur-md", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-1 font-semibold text-foreground", children: "Session" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-muted-foreground", children: [
            "You arrived at ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground", children: arrivedAt })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-1 text-muted-foreground", children: [
            "Time here:",
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-foreground", children: [
              h,
              " ",
              h === 1 ? "hour" : "hours",
              ", ",
              m,
              " ",
              m === 1 ? "minute" : "minutes",
              ", ",
              s,
              " ",
              s === 1 ? "second" : "seconds"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2 border-t border-border pt-2 text-muted-foreground leading-relaxed", children: "I'm glad you're here — I'd love it even more if you reached out. What would you like to build together?" })
        ] })
      ]
    }
  );
}
const avatar = "/assets/me-DrlTZ2Ih.jpeg";
const experiences = [{
  company: "Rehabitaire",
  role: "Software Engineer — Full-time",
  period: "Nov 2025 – Present",
  points: ["Backend for an AI-powered physical therapy platform (NestJS, PostgreSQL, Prisma, Redis, Docker) in a 5-engineer team.", "Built real-time notifications with Server-Sent Events after evaluating SSE vs WebSockets trade-offs.", "Implemented JWT access/refresh auth with OTP email verification and applied the Strategy Pattern for local/S3 storage.", "Wrote unit, integration, and E2E tests (Playwright) with CI/CD pipelines; ~95% first-pass task delivery accuracy."]
}, {
  company: "ECS (Enterprise Consultancy Services)",
  role: "Backend Developer — Full-time",
  period: "Aug 2025 – Oct 2025",
  points: ["Built a procurement platform with AI-powered chatbot (Python Flask, PostgreSQL) for supplier recommendation and email generation.", "Optimized a critical backend process from 7 minutes to under 9 seconds.", "Refactored core modules and added role-based access control (RBAC)."]
}, {
  company: "Quick R",
  role: "Freelance Backend Developer",
  period: "Nov 2024 – Jan 2025",
  points: ["Designed and shipped a multi-restaurant digital menu platform end-to-end with .NET, MySQL, and AWS.", "Built subscription management, dynamic menus, QR generation, and admin dashboard workflows."]
}, {
  company: "Shipd",
  role: "Problem Author — Freelance",
  period: "May 2024 – Jan 2025",
  points: ["Contributed 60+ hard algorithmic problems and 90+ optimized solutions used to train AI models."]
}];
const projects = [{
  title: "Character Simulation System",
  tag: "Graduation Project — A+ (98/100)",
  description: "FastAPI chatbot simulating real and fictional personas using fine-tuned Mistral 7B (LoRA) with a RAG architecture (FAISS + LangChain) for coherent multi-character conversations.",
  stack: ["FastAPI", "LangChain", "FAISS", "RAG", "Mistral 7B", "LoRA"]
}, {
  title: "Social Media Platform",
  tag: "May 2024",
  description: "Microservices-based social platform with posts, comments, likes, friends, and JWT/Spring Security auth. Built with Spring Boot and Spring Data JPA.",
  stack: ["Java", "Spring Boot", "Microservices", "JWT", "JPA"]
}, {
  title: "Copy for Claude — VS Code Extension",
  tag: "Open Source Contribution",
  description: "Contributed a pull request that was reviewed and merged into the Copy for Claude VS Code extension.",
  stack: ["TypeScript", "VS Code API", "Open Source"]
}];
const skills = {
  Languages: ["TypeScript", "JavaScript", "C++", "C", "Java", "Python"],
  Backend: ["Node.js", "NestJS", "REST APIs", "WebSockets", "SSE", "JWT", "RBAC", "BullMQ", "Microservices"],
  "Databases & ORM": ["PostgreSQL", "Redis", "MySQL", "Oracle PL/SQL", "Prisma", "Hibernate"],
  "Tools & Testing": ["Playwright", "Jest", "Supertest", "Swagger", "Git", "Docker", "WSO2"]
};
function Index() {
  const [termMode, setTermMode] = reactExports.useState(() => {
    if (typeof window === "undefined") return "closed";
    try {
      const saved = localStorage.getItem("termMode_v2");
      if (!saved) return "closed";
      return saved;
    } catch {
      return "closed";
    }
  });
  const [mounted, setMounted] = reactExports.useState(false);
  const [gamingMode, setGamingMode] = reactExports.useState(false);
  const [terminalUser, setTerminalUser] = reactExports.useState("guest");
  reactExports.useEffect(() => {
    setMounted(true);
    try {
      setGamingMode(localStorage.getItem("gamingMode") !== "0");
    } catch {
    }
    const onGaming = (e) => setGamingMode(!!e.detail);
    window.addEventListener("gamingmode", onGaming);
    return () => window.removeEventListener("gamingmode", onGaming);
  }, []);
  reactExports.useEffect(() => {
    const read = () => {
      try {
        const u = localStorage.getItem("username") || "guest";
        setTerminalUser(u);
      } catch {
      }
    };
    read();
    const onChange = (e) => setTerminalUser(e.detail || "guest");
    window.addEventListener("usernamechange", onChange);
    return () => window.removeEventListener("usernamechange", onChange);
  }, []);
  const persistMode = (m) => {
    try {
      localStorage.setItem("termMode_v2", m);
    } catch {
    }
  };
  const closeTerminal = () => {
    persistMode("closed");
    setTermMode("closed");
  };
  const handleMinimize = () => {
    persistMode("min");
    setTermMode("min");
  };
  const handleRestore = () => {
    persistMode("float");
    setTermMode("float");
  };
  const handleToggleFull = () => {
    setTermMode((m) => {
      const next = m === "full" ? "float" : "full";
      persistMode(next);
      return next;
    });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative min-h-screen bg-background text-foreground", children: [
    mounted && /* @__PURE__ */ jsxRuntimeExports.jsx(Starfield, {}),
    mounted && /* @__PURE__ */ jsxRuntimeExports.jsx(MouseGlow, {}),
    mounted && /* @__PURE__ */ jsxRuntimeExports.jsx(CustomCursor, {}),
    mounted && termMode !== "closed" && /* @__PURE__ */ jsxRuntimeExports.jsx(Terminal, { mode: termMode, onClose: closeTerminal, onMinimize: handleMinimize, onToggleFull: handleToggleFull, onRestore: handleRestore }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(NavBar, {}),
    mounted && /* @__PURE__ */ jsxRuntimeExports.jsx(SessionTimer, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { id: "top", className: "relative z-10 max-w-5xl mx-auto px-6 pb-24", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "py-20 sm:py-28 grid md:grid-cols-[1fr_320px] gap-12 items-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-6 text-xs font-mono text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" }),
            "Open to onsite · hybrid · remote — full-time & freelance"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-5xl sm:text-6xl font-bold tracking-tight leading-[1.05] glow-text", children: "Ahmed Khaled." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 text-2xl sm:text-3xl font-semibold tracking-tight", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Typewriter, { words: ["Backend Engineer.", "NestJS Specialist.", "ACPC Finalist.", "API Architect."], className: "bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-8 max-w-xl text-lg text-muted-foreground leading-relaxed", children: [
            "I build production-grade backend systems and scalable APIs — currently with",
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground font-medium", children: "NestJS" }),
            " and",
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground font-medium", children: "TypeScript" }),
            ". 2000+ problems solved on Codeforces."
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-10 flex flex-wrap items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: "#projects", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "View my work" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowUpRight, {})
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, variant: "ghost", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: "https://github.com/akg418", target: "_blank", rel: "noreferrer", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Github, {}),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "GitHub" })
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, variant: "ghost", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: "https://linkedin.com/in/ahmed-khaled-gom3a", target: "_blank", rel: "noreferrer", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Linkedin, {}),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "LinkedIn" })
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, variant: "ghost", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: "https://codeforces.com/profile/gom3a_", target: "_blank", rel: "noreferrer", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CodeXml, {}),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Codeforces" })
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, variant: "ghost", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: "https://leetcode.com/u/falta_404/", target: "_blank", rel: "noreferrer", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Trophy, {}),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "LeetCode" })
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, variant: "ghost", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: "https://drive.google.com/drive/folders/1f1RdcHVjX5iOhlRSjPa2McB0ZXaRS4l3?usp=sharing", target: "_blank", rel: "noreferrer", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, {}),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "CV" })
            ] }) })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative justify-self-center md:justify-self-end", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -inset-4 rounded-full bg-gradient-to-tr from-primary/30 to-accent/30 blur-2xl" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative rounded-full p-[3px] avatar-ring", children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: avatar, alt: "Ahmed Khaled", width: 320, height: 320, className: "rounded-full w-56 h-56 sm:w-72 sm:h-72 object-cover bg-card relative z-10" }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "grid grid-cols-2 sm:grid-cols-4 gap-px bg-border border border-border rounded-lg overflow-hidden", children: [{
        label: "Problems solved",
        value: "2000+"
      }, {
        label: "ACPC",
        value: "Finalist"
      }, {
        label: "Task accuracy",
        value: "~95%"
      }, {
        label: "Process speedup",
        value: "7m → 9s"
      }].map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card p-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-2xl font-bold tracking-tight", children: s.value }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground mt-1", children: s.label })
      ] }, s.label)) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { id: "experience", className: "py-24", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-12", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Briefcase, { className: "w-5 h-5 text-muted-foreground" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-3xl font-bold tracking-tight", children: "Experience" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-12", children: experiences.map((exp) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid sm:grid-cols-[200px_1fr] gap-4 sm:gap-8", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm text-muted-foreground font-mono pt-1", children: exp.period }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-xl font-semibold", children: exp.company }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1", children: exp.role }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "mt-4 space-y-2 text-sm text-muted-foreground leading-relaxed", children: exp.points.map((p, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground/40 mt-2 w-1 h-1 rounded-full bg-current shrink-0" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: p })
            ] }, i)) })
          ] })
        ] }, exp.company)) })
      ] }),
      gamingMode && /* @__PURE__ */ jsxRuntimeExports.jsx(CupGame, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { id: "projects", className: "py-24 border-t border-border", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-12", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CodeXml, { className: "w-5 h-5 text-muted-foreground" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-3xl font-bold tracking-tight", children: "Selected projects" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid sm:grid-cols-2 gap-4", children: projects.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsxs("article", { className: "group p-6 rounded-lg border border-border bg-card hover:border-foreground/30 transition-colors", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs font-mono text-muted-foreground", children: p.tag }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "mt-2 text-lg font-semibold flex items-start justify-between gap-2", children: [
            p.title,
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowUpRight, { className: "w-4 h-4 text-muted-foreground group-hover:text-foreground group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-sm text-muted-foreground leading-relaxed", children: p.description }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 flex flex-wrap gap-1.5", children: p.stack.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "secondary", className: "font-mono text-[10px]", children: s }, s)) })
        ] }, p.title)) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { id: "skills", className: "py-24 border-t border-border", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-3xl font-bold tracking-tight mb-12", children: "Tech stack" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid sm:grid-cols-2 gap-8", children: Object.entries(skills).map(([group, items]) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3", children: group }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: items.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "px-3 py-1 rounded-md border border-border text-sm bg-card", children: s }, s)) })
        ] }, group)) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "py-24 border-t border-border", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-12", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Trophy, { className: "w-5 h-5 text-muted-foreground" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-3xl font-bold tracking-tight", children: "Competitions & community" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid sm:grid-cols-2 gap-8 text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold mb-2", children: "ECPC 2025" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "5th at Helwan Qualifiers → ECPC Finals → Qualified to ACPC Finals." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold mb-2", children: "ECPC 2024" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "4th at Helwan Qualifiers → ECPC Finals." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold mb-2", children: "ICPC Helwan Community" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "Vice President & Problem Setting Head — designed problems accepted at ACPC level." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold mb-2", children: "Original Problem Setting" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground", children: [
              "I love crafting original competitive-programming problems. Together with my friend",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "https://codeforces.com/profile/MUZAN", target: "_blank", rel: "noreferrer", className: "text-foreground underline underline-offset-2 hover:text-primary", children: "MUZAN" }),
              ", I authored a full sheet of problems — all original — published as a",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "https://codeforces.com/group/5EfwxVFSaS/contests", target: "_blank", rel: "noreferrer", className: "text-foreground underline underline-offset-2 hover:text-primary", children: "Codeforces group" }),
              "."
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(GraduationCap, { className: "w-5 h-5 text-muted-foreground mt-0.5 shrink-0" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold mb-2", children: "Helwan University" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "B.Sc. Computer Science — GPA 3.3/4.0 (Sep 2021 – Jan 2025)." })
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { id: "contact", className: "py-24 border-t border-border", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-4xl sm:text-5xl font-bold tracking-tight", children: "Let's build something." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 max-w-xl text-muted-foreground", children: "Open to full-time roles — onsite, hybrid, or remote — and to freelance projects. Comfortable working with any framework; currently deep-diving into Node.js and NestJS. The fastest way to reach me is email." }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 flex flex-wrap gap-2 text-xs font-mono", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1.5 rounded-md border border-border bg-card px-3 py-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "w-3.5 h-3.5 text-primary" }),
            " Onsite"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1.5 rounded-md border border-border bg-card px-3 py-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Globe, { className: "w-3.5 h-3.5 text-primary" }),
            " Hybrid"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1.5 rounded-md border border-border bg-card px-3 py-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Globe, { className: "w-3.5 h-3.5 text-primary" }),
            " Remote"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1.5 rounded-md border border-border bg-card px-3 py-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Briefcase, { className: "w-3.5 h-3.5 text-accent" }),
            " Freelance"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8 flex flex-wrap gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, size: "lg", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: "mailto:ahmedkhaledgomaa404@gmail.com", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, {}),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Email me" })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, size: "lg", variant: "outline", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: "tel:+201014908696", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, {}),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "+20 101 490 8696" })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, size: "lg", variant: "outline", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: "https://codeforces.com/profile/gom3a_", target: "_blank", rel: "noreferrer", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CodeXml, {}),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Codeforces" })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, size: "lg", variant: "outline", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: "https://leetcode.com/u/falta_404/", target: "_blank", rel: "noreferrer", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Trophy, {}),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "LeetCode" })
          ] }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("footer", { className: "py-10 border-t border-border text-xs text-muted-foreground flex flex-wrap justify-between gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
          "© ",
          (/* @__PURE__ */ new Date()).getFullYear(),
          " Ahmed Khaled. Built with care."
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "https://github.com/akg418", target: "_blank", rel: "noreferrer", className: "hover:text-foreground", children: "GitHub" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "https://linkedin.com/in/ahmed-khaled-gom3a", target: "_blank", rel: "noreferrer", className: "hover:text-foreground", children: "LinkedIn" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "https://codeforces.com/profile/gom3a_", target: "_blank", rel: "noreferrer", className: "hover:text-foreground", children: "Codeforces" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "https://leetcode.com/u/falta_404/", target: "_blank", rel: "noreferrer", className: "hover:text-foreground", children: "LeetCode" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pb-10 text-center text-xs text-muted-foreground", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
          "Design, ideas, and implementation approach by",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground font-medium", children: "Ahmed Khaled" }),
          " — implementation made by AI."
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 font-mono text-primary/80", children: "Hi there i love u <3 :)" })
      ] })
    ] }),
    mounted && termMode === "closed" && /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setTermMode("float"), className: "dark fixed bottom-0 left-0 right-0 z-30 border-t border-border bg-background/80 backdrop-blur-md hover:bg-card/90 transition-colors group", "aria-label": "Open terminal", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-5xl mx-auto px-6 h-11 flex items-center gap-3 font-mono text-xs text-muted-foreground", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(SquareTerminal, { className: "w-4 h-4 text-primary" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-primary", children: [
        terminalUser,
        "@ahmed.dev"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: ":~$" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "opacity-60 group-hover:opacity-100", children: [
        "type ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-accent", children: "command" }),
        " to open terminal…"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "caret-blink ml-1 inline-block h-3 w-[7px] bg-primary" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-auto hidden sm:inline opacity-60", children: "click anywhere on this bar" })
    ] }) })
  ] });
}
export {
  Index as component
};
