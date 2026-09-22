import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { o as readString, S as STORAGE_KEYS, u as readNumber, q as writeString, p as profile, r as readFlag, d as domainParts, h as roles, l as linkOf, k as stats, f as experiences, i as projects, s as skills, c as competitions, b as problemSetting, e as education, j as links, m as readJson, n as writeJson, g as getStoredTheme, a as applyTheme, T as THEME_EVENT, t as toggleTheme, w as writeFlag, v as removeKey } from "./router-DJgJQeEK.mjs";
import { S as Slot } from "../_libs/radix-ui__react-slot.mjs";
import { c as cva } from "../_libs/class-variance-authority.mjs";
import { c as clsx } from "../_libs/clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
import { M as Mail, C as Clock, A as ArrowUpRight, G as Github, L as Linkedin, a as CodeXml, T as Trophy, F as FileText, B as Briefcase, b as Gamepad2, R as RotateCw, c as GraduationCap, d as MapPin, e as Globe, P as Phone, S as SquareTerminal, f as Sun, g as Moon } from "../_libs/lucide-react.mjs";
import "../_libs/tanstack__react-router.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/isbot.mjs";
import "../_libs/radix-ui__react-compose-refs.mjs";
function CommandBar({ username, onOpen }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "button",
    {
      onClick: onOpen,
      className: "dark fixed bottom-0 left-0 right-0 z-30 border-t border-border bg-background/80 backdrop-blur-md hover:bg-card/90 transition-colors group",
      "aria-label": "Open terminal",
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-5xl mx-auto px-6 h-11 flex items-center gap-3 font-mono text-xs text-muted-foreground", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(SquareTerminal, { className: "w-4 h-4 text-primary" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-primary", children: [
          username,
          "@",
          profile.domain
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: ":~$" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "opacity-60 group-hover:opacity-100", children: [
          "type ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-accent", children: "command" }),
          " to open terminal…"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "caret-blink ml-1 inline-block h-3 w-[7px] bg-primary" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-auto hidden sm:inline opacity-60", children: "click anywhere on this bar" })
      ] })
    }
  );
}
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
const SPACING = 110;
const CUP_IDS = [0, 1, 2];
const liftOffset = () => 50 + Math.random() * 30;
function makeSwap(cupA, cupB) {
  return { cups: [cupA, cupB], offsets: [-liftOffset(), liftOffset()] };
}
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
  reactExports.useEffect(
    () => () => {
      if (timer.current) window.clearTimeout(timer.current);
    },
    []
  );
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
        let currentSlots = [0, 1, 2];
        const doSwap = () => {
          const slotA = Math.floor(Math.random() * 3);
          let slotB = Math.floor(Math.random() * 3);
          while (slotB === slotA) slotB = Math.floor(Math.random() * 3);
          const dur2 = randomDuration();
          setCurrentDur(dur2);
          const next = [...currentSlots];
          const cupA = next.indexOf(slotA);
          const cupB = next.indexOf(slotB);
          next[cupA] = slotB;
          next[cupB] = slotA;
          currentSlots = next;
          setSlotOf(next);
          setLifted(makeSwap(cupA, cupB));
          count++;
          timer.current = window.setTimeout(() => {
            setLifted(null);
            if (count >= swaps) {
              timer.current = window.setTimeout(() => {
                setBallCup(currentSlots[newBall]);
                setSlotOf([0, 1, 2]);
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
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { id: "game", className: "py-24 border-t border-border", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Gamepad2, { className: "w-5 h-5 text-primary" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-3xl font-bold tracking-tight", children: "Gaming mode — Cups & Ball" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mb-10", children: "Find the cup hiding the ball after the shuffle. Adjust the speed to your reflexes." }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-border bg-card p-6 sm:p-10 overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative mx-auto h-56 select-none", style: { width: SPACING * 2 + 96 }, children: [
        CUP_IDS.map((cupId) => {
          const slot = slotOf[cupId];
          const isBall = cupId === ballCup;
          const showBall = isBall && (reveal || isPreview || phase === "idle");
          return /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "absolute bottom-2 w-8 h-8 rounded-full bg-gradient-to-br from-accent to-primary shadow-[0_0_20px_var(--color-primary)]",
              style: {
                left: 48 - 16,
                transform: `translateX(${slot * SPACING}px)`,
                transition: phase === "pick" || phase === "won" || phase === "lost" ? "opacity 200ms" : `transform ${dur}ms cubic-bezier(.5,.05,.5,.95), opacity 200ms`,
                opacity: showBall ? 1 : 0
              }
            },
            `ball-${cupId}`
          );
        }),
        CUP_IDS.map((cupId) => {
          const slot = slotOf[cupId];
          const liftIndex = lifted?.cups.indexOf(cupId) ?? -1;
          const isLifted = liftIndex !== -1;
          const liftY = isLifted ? lifted.offsets[liftIndex] : 0;
          const isBall = cupId === ballCup;
          return /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              onClick: () => pick(cupId),
              disabled: phase !== "pick",
              "aria-label": `Cup ${slot + 1}`,
              className: "absolute bottom-0 group disabled:cursor-default",
              style: {
                left: 0,
                width: 96,
                transform: `translate(${slot * SPACING}px, ${liftY}px)`,
                transition: phase === "pick" || phase === "won" || phase === "lost" ? "none" : `transform ${dur}ms cubic-bezier(.5,.05,.5,.95)`,
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
      ] }),
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
  ] });
}
const DOT_SIZE = 12;
const HOVER_SIZE = 44;
const INTERACTIVE = "a,button,input,textarea,[role=button]";
function CustomCursor() {
  const [mounted, setMounted] = reactExports.useState(false);
  const [hover, setHover] = reactExports.useState(false);
  const [down, setDown] = reactExports.useState(false);
  const ringRef = reactExports.useRef(null);
  const dotRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    setMounted(true);
    document.body.classList.add("custom-cursor");
    let frame = 0;
    let x = -100;
    let y = -100;
    const paint = () => {
      frame = 0;
      for (const el of [ringRef.current, dotRef.current]) {
        el?.style.setProperty("--cursor-x", `${x}px`);
        el?.style.setProperty("--cursor-y", `${y}px`);
      }
    };
    const onMove = (e) => {
      x = e.clientX;
      y = e.clientY;
      if (!frame) frame = requestAnimationFrame(paint);
      const target = e.target;
      setHover(!!target?.closest(INTERACTIVE));
    };
    const onDown = () => setDown(true);
    const onUp = () => setDown(false);
    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    return () => {
      document.body.classList.remove("custom-cursor");
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);
  if (!mounted) return null;
  const size = hover ? HOVER_SIZE : DOT_SIZE;
  const base = {
    ["--cursor-x"]: "-100px",
    ["--cursor-y"]: "-100px"
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        ref: ringRef,
        "aria-hidden": true,
        className: "pointer-events-none fixed left-0 top-0 z-[100] rounded-full transition-[width,height,background,border-color] duration-150",
        style: {
          ...base,
          width: size,
          height: size,
          border: "1.5px solid oklch(0.78 0.17 200)",
          background: hover ? "oklch(0.78 0.17 200 / 0.15)" : "transparent",
          transform: `translate(var(--cursor-x), var(--cursor-y)) translate(-50%, -50%) scale(${down ? 0.85 : 1})`
        }
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        ref: dotRef,
        "aria-hidden": true,
        className: "pointer-events-none fixed left-0 top-0 z-[100] h-1 w-1 rounded-full",
        style: {
          ...base,
          background: "oklch(0.97 0.01 250)",
          transform: "translate(var(--cursor-x), var(--cursor-y)) translate(-50%, -50%)"
        }
      }
    )
  ] });
}
function MouseGlow() {
  const ref = reactExports.useRef(null);
  reactExports.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let frame = 0;
    let x = -200;
    let y = -200;
    const paint = () => {
      frame = 0;
      el.style.setProperty("--glow-x", `${x}px`);
      el.style.setProperty("--glow-y", `${y}px`);
    };
    const onMove = (e) => {
      x = e.clientX;
      y = e.clientY;
      if (!frame) frame = requestAnimationFrame(paint);
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMove);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      ref,
      "aria-hidden": true,
      className: "pointer-events-none fixed inset-0 z-0 transition-[background] duration-100",
      style: {
        ["--glow-x"]: "-200px",
        ["--glow-y"]: "-200px",
        background: "radial-gradient(600px circle at var(--glow-x) var(--glow-y), oklch(0.68 0.22 305 / 0.18), transparent 45%), radial-gradient(900px circle at var(--glow-x) var(--glow-y), oklch(0.78 0.17 200 / 0.10), transparent 60%)"
      }
    }
  );
}
function useTheme() {
  const [theme, setTheme] = reactExports.useState("dark");
  const [mounted, setMounted] = reactExports.useState(false);
  reactExports.useEffect(() => {
    setMounted(true);
    const stored = getStoredTheme();
    setTheme(stored);
    applyTheme(stored);
    const onChange = (e) => setTheme(e.detail);
    window.addEventListener(THEME_EVENT, onChange);
    return () => window.removeEventListener(THEME_EVENT, onChange);
  }, []);
  return { theme, mounted, toggle: toggleTheme };
}
function ThemeToggle() {
  const { theme, mounted, toggle } = useTheme();
  if (!mounted) return null;
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
const GAMING_MODE_EVENT = "gamingmode";
function isGamingModeEnabled() {
  return readFlag(STORAGE_KEYS.gamingMode, true);
}
function toggleGamingMode() {
  const next = !isGamingModeEnabled();
  writeFlag(STORAGE_KEYS.gamingMode, next);
  window.dispatchEvent(new CustomEvent(GAMING_MODE_EVENT, { detail: next }));
  return next;
}
function useGamingMode() {
  const [enabled, setEnabled] = reactExports.useState(false);
  reactExports.useEffect(() => {
    setEnabled(isGamingModeEnabled());
    const onChange = (e) => setEnabled(e.detail);
    window.addEventListener(GAMING_MODE_EVENT, onChange);
    return () => window.removeEventListener(GAMING_MODE_EVENT, onChange);
  }, []);
  return enabled;
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
  const gamingMode = useGamingMode();
  const itemRefs = reactExports.useRef({});
  const containerRef = reactExports.useRef(null);
  const [indicator, setIndicator] = reactExports.useState({ left: 0, width: 0, opacity: 0 });
  const items = reactExports.useMemo(
    () => gamingMode ? [BASE_ITEMS[0], GAMING_ITEM, ...BASE_ITEMS.slice(1)] : BASE_ITEMS,
    [gamingMode]
  );
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
        domainParts[0],
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: domainParts[1] })
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
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, size: "sm", variant: "outline", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: `mailto:${profile.email}`, children: [
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
function Starfield() {
  const canvasRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let width = 0;
    let height = 0;
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
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    const render = () => {
      ctx.clearRect(0, 0, width, height);
      const dark = isDark();
      for (const p of planets) {
        if (!reduceMotion) {
          p.x += p.vx;
          p.y += p.vy;
        }
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
        if (!reduceMotion) {
          s.x += s.vx * s.z;
          s.y += s.vy * s.z;
          if (s.x < 0) s.x = width;
          if (s.x > width) s.x = 0;
          if (s.y < 0) s.y = height;
          if (s.y > height) s.y = 0;
          s.tw += 0.04;
        }
        const a = (0.4 + Math.sin(s.tw) * 0.3) * s.z;
        ctx.fillStyle = dark ? `rgba(180, 210, 255, ${a})` : `rgba(60, 80, 160, ${a * 0.9})`;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r * s.z, 0, Math.PI * 2);
        ctx.fill();
      }
      if (!reduceMotion) raf = requestAnimationFrame(render);
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
function Achievements() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "py-24 border-t border-border", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-12", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Trophy, { className: "w-5 h-5 text-muted-foreground" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-3xl font-bold tracking-tight", children: "Competitions & community" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid sm:grid-cols-2 gap-8 text-sm", children: [
      competitions.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold mb-2", children: c.title }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: c.detail })
      ] }, c.title)),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold mb-2", children: "Original Problem Setting" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground", children: [
          "I love crafting original competitive-programming problems. Together with my friend",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "a",
            {
              href: problemSetting.friendUrl,
              target: "_blank",
              rel: "noreferrer",
              className: "text-foreground underline underline-offset-2 hover:text-primary",
              children: problemSetting.friendName
            }
          ),
          ", I authored a full sheet of problems — all original — published as a",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "a",
            {
              href: problemSetting.groupUrl,
              target: "_blank",
              rel: "noreferrer",
              className: "text-foreground underline underline-offset-2 hover:text-primary",
              children: "Codeforces group"
            }
          ),
          "."
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(GraduationCap, { className: "w-5 h-5 text-muted-foreground mt-0.5 shrink-0" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold mb-2", children: education.school }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground", children: [
            education.degree,
            " — ",
            education.detail,
            "."
          ] })
        ] })
      ] })
    ] })
  ] }) });
}
function Contact() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { id: "contact", className: "py-24 border-t border-border", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-4xl sm:text-5xl font-bold tracking-tight", children: "Let's build something." }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 max-w-xl text-muted-foreground", children: "Open to full-time roles — onsite, hybrid, or remote — and to freelance projects. Comfortable across stacks; currently building FastAPI microservices on Kubernetes and backend services with NestJS/TypeScript. The fastest way to reach me is email." }),
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
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, size: "lg", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: `mailto:${profile.email}`, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Email me" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, size: "lg", variant: "outline", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: `tel:${profile.phone}`, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: profile.phoneDisplay })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, size: "lg", variant: "outline", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: linkOf("Codeforces"), target: "_blank", rel: "noreferrer", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CodeXml, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Codeforces" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, size: "lg", variant: "outline", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: linkOf("LeetCode"), target: "_blank", rel: "noreferrer", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Trophy, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "LeetCode" })
      ] }) })
    ] })
  ] }) });
}
const LINK_CLASS = "underline-offset-4 hover:underline hover:text-primary transition-colors";
function CompanyName({ role }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "text-xl font-semibold", children: [
    role.linkedin ? /* @__PURE__ */ jsxRuntimeExports.jsx(
      "a",
      {
        href: role.linkedin,
        target: "_blank",
        rel: "noreferrer",
        className: LINK_CLASS,
        title: `${role.company} on LinkedIn`,
        children: role.company
      }
    ) : role.company,
    role.website && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      " — ",
      /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: role.website.url, target: "_blank", rel: "noreferrer", className: LINK_CLASS, children: role.website.label })
    ] })
  ] });
}
function Experience() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { id: "experience", className: "py-24", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-12", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Briefcase, { className: "w-5 h-5 text-muted-foreground" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-3xl font-bold tracking-tight", children: "Experience" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-12", children: experiences.map((exp) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid sm:grid-cols-[200px_1fr] gap-4 sm:gap-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm text-muted-foreground font-mono pt-1", children: exp.period }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CompanyName, { role: exp }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground mt-1", children: [
          exp.role,
          " — ",
          exp.employment
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "mt-4 space-y-2 text-sm text-muted-foreground leading-relaxed", children: exp.points.map((p, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground/40 mt-2 w-1 h-1 rounded-full bg-current shrink-0" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: p })
        ] }, i)) })
      ] })
    ] }, exp.company)) })
  ] }) });
}
function Typewriter({
  words,
  className,
  speed = 80,
  pause = 1400
}) {
  const [mounted, setMounted] = reactExports.useState(false);
  const [reduceMotion, setReduceMotion] = reactExports.useState(false);
  const [i, setI] = reactExports.useState(0);
  const [text, setText] = reactExports.useState("");
  const [deleting, setDeleting] = reactExports.useState(false);
  reactExports.useEffect(() => {
    setMounted(true);
    setReduceMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);
  reactExports.useEffect(() => {
    if (!mounted || reduceMotion) return;
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
        setText(deleting ? current.slice(0, text.length - 1) : current.slice(0, text.length + 1));
      }
    }, delay);
    return () => clearTimeout(t);
  }, [text, deleting, i, mounted, reduceMotion, words, speed, pause]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className, children: [
    mounted && !reduceMotion ? text : words[0],
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "caret-blink ml-1 inline-block h-[1em] w-[2px] -mb-1 bg-primary align-middle" })
  ] });
}
const INTERVAL_MS = 4500;
const FADE_MS = 700;
const IMAGE_CLASS = "absolute inset-0 h-full w-full rounded-full object-cover";
function AvatarCarousel({
  photos: photos2,
  className
}) {
  const [index, setIndex] = reactExports.useState(0);
  const [paused, setPaused] = reactExports.useState(false);
  const [reduceMotion, setReduceMotion] = reactExports.useState(false);
  reactExports.useEffect(() => {
    setReduceMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);
  const cycles = photos2.length > 1 && !reduceMotion;
  reactExports.useEffect(() => {
    if (!cycles || paused) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % photos2.length), INTERVAL_MS);
    return () => clearInterval(id);
  }, [cycles, paused, photos2.length]);
  if (!cycles) {
    const [first] = photos2;
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className, children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: first.src, alt: first.alt, width: 320, height: 320, className: IMAGE_CLASS }) });
  }
  const next = () => setIndex((i) => (i + 1) % photos2.length);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: `${className} cursor-pointer`,
      onMouseEnter: () => setPaused(true),
      onMouseLeave: () => setPaused(false),
      onClick: next,
      role: "button",
      tabIndex: 0,
      onKeyDown: (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          next();
        }
      },
      "aria-label": "Show the next photo",
      title: "Click for the next photo",
      children: photos2.map((photo, i) => {
        const active = i === index;
        return /* @__PURE__ */ jsxRuntimeExports.jsx(
          "img",
          {
            src: photo.src,
            alt: active ? photo.alt : "",
            "aria-hidden": !active,
            width: 320,
            height: 320,
            className: IMAGE_CLASS,
            style: {
              opacity: active ? 1 : 0,
              transform: active ? "scale(1)" : "scale(1.06)",
              transition: `opacity ${FADE_MS}ms ease, transform ${FADE_MS}ms ease`,
              willChange: "opacity, transform"
            }
          },
          photo.src
        );
      })
    }
  );
}
const acpc = "/assets/me-acpc-Bzm_CyMY.jpeg";
const portrait = "/assets/me-DrlTZ2Ih.jpeg";
const photos = [
  { src: acpc, alt: "Ahmed Khaled holding balloons at the ACPC finals" },
  { src: portrait, alt: "Ahmed Khaled" }
];
function Hero() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "py-20 sm:py-28 grid md:grid-cols-[1fr_320px] gap-12 items-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-6 text-xs font-mono text-muted-foreground", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" }),
        "Open to onsite · hybrid · remote — full-time & freelance"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "text-5xl sm:text-6xl font-bold tracking-tight leading-[1.05] glow-text", children: [
        profile.name,
        "."
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 text-2xl sm:text-3xl font-semibold tracking-tight", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        Typewriter,
        {
          words: roles,
          className: "bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent"
        }
      ) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-8 max-w-xl text-lg text-muted-foreground leading-relaxed", children: [
        "I build production-grade systems and scalable backend services for AI-driven products — APIs, microservices, and event-driven architectures with",
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground font-medium", children: "FastAPI" }),
        ",",
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground font-medium", children: "NestJS" }),
        ", and",
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground font-medium", children: "Kubernetes" }),
        ". 2000+ problems solved on Codeforces."
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-10 flex flex-wrap items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: "#projects", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "View my work" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowUpRight, {})
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, variant: "ghost", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: linkOf("GitHub"), target: "_blank", rel: "noreferrer", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Github, {}),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "GitHub" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, variant: "ghost", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: linkOf("LinkedIn"), target: "_blank", rel: "noreferrer", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Linkedin, {}),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "LinkedIn" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, variant: "ghost", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: linkOf("Codeforces"), target: "_blank", rel: "noreferrer", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CodeXml, {}),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Codeforces" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, variant: "ghost", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: linkOf("LeetCode"), target: "_blank", rel: "noreferrer", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Trophy, {}),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "LeetCode" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, variant: "ghost", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: profile.cvUrl, target: "_blank", rel: "noreferrer", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, {}),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "CV" })
        ] }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative justify-self-center md:justify-self-end", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -inset-4 rounded-full bg-gradient-to-tr from-primary/30 to-accent/30 blur-2xl" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative rounded-full p-[3px] avatar-ring", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        AvatarCarousel,
        {
          photos,
          className: "relative z-10 w-56 h-56 sm:w-72 sm:h-72 rounded-full overflow-hidden bg-card"
        }
      ) })
    ] })
  ] }) });
}
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
function Projects() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { id: "projects", className: "py-24 border-t border-border", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-12", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CodeXml, { className: "w-5 h-5 text-muted-foreground" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-3xl font-bold tracking-tight", children: "Selected projects" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid sm:grid-cols-2 gap-4", children: projects.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "article",
      {
        className: "group p-6 rounded-lg border border-border bg-card hover:border-foreground/30 transition-colors",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs font-mono text-muted-foreground", children: p.tag }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "mt-2 text-lg font-semibold flex items-start justify-between gap-2", children: [
            p.title,
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowUpRight, { className: "w-4 h-4 text-muted-foreground group-hover:text-foreground group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-sm text-muted-foreground leading-relaxed", children: p.description }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 flex flex-wrap gap-1.5", children: p.stack.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "secondary", className: "font-mono text-[10px]", children: s }, s)) })
        ]
      },
      p.title
    )) })
  ] }) });
}
function SiteFooter() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("footer", { className: "py-10 border-t border-border text-xs text-muted-foreground flex flex-wrap justify-between gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
        "© ",
        (/* @__PURE__ */ new Date()).getFullYear(),
        " ",
        profile.name,
        ". Built with care."
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-4", children: links.map((l) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        "a",
        {
          href: l.url,
          target: "_blank",
          rel: "noreferrer",
          className: "hover:text-foreground",
          children: l.label
        },
        l.label
      )) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pb-10 text-center text-xs text-muted-foreground", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
        "Design, ideas, and implementation approach by",
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground font-medium", children: profile.name }),
        " — implementation made by AI."
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 font-mono text-primary/80", children: "Hi there i love u <3 :)" })
    ] })
  ] });
}
function Skills() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { id: "skills", className: "py-24 border-t border-border", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-3xl font-bold tracking-tight mb-12", children: "Tech stack" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid sm:grid-cols-2 gap-8", children: Object.entries(skills).map(([group, items]) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3", children: group }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: items.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        "span",
        {
          className: "px-3 py-1 rounded-md border border-border text-sm bg-card",
          children: s
        },
        s
      )) })
    ] }, group)) })
  ] }) });
}
function Stats() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "grid grid-cols-2 sm:grid-cols-4 gap-px bg-border border border-border rounded-lg overflow-hidden", children: stats.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card p-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-2xl font-bold tracking-tight", children: s.value }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground mt-1", children: s.label })
  ] }, s.label)) }) });
}
function useCommandHistory() {
  const back = reactExports.useRef([]);
  const forward = reactExports.useRef([]);
  return {
    /** Records a submitted command as the most recent entry. */
    push(entry) {
      while (forward.current.length) back.current.push(forward.current.pop());
      back.current.push(entry);
    },
    /** Previous entry, or undefined at the start of history. */
    previous(current) {
      if (!back.current.length) return void 0;
      forward.current.push(current);
      return back.current.pop();
    },
    /** Next entry, or undefined at the end of history. */
    next(current) {
      if (!forward.current.length) return void 0;
      back.current.push(current);
      return forward.current.pop();
    }
  };
}
const MIN_WIDTH = 360;
const MIN_HEIGHT = 240;
const DEFAULT_WIDTH = 720;
const DEFAULT_HEIGHT = 480;
function parsePos(value) {
  if (typeof value !== "object" || value === null) return void 0;
  const { x, y } = value;
  if (typeof x !== "number" || typeof y !== "number") return void 0;
  if (!Number.isFinite(x) || !Number.isFinite(y)) return void 0;
  return { x, y };
}
function parseSize(value) {
  if (typeof value !== "object" || value === null) return void 0;
  const { w, h } = value;
  if (typeof w !== "number" || typeof h !== "number") return void 0;
  if (!Number.isFinite(w) || !Number.isFinite(h)) return void 0;
  return { w, h };
}
function trackDrag(onMove) {
  const handleUp = () => {
    window.removeEventListener("mousemove", onMove);
    window.removeEventListener("mouseup", handleUp);
  };
  window.addEventListener("mousemove", onMove);
  window.addEventListener("mouseup", handleUp);
}
function useTerminalWindow(enabled) {
  const [pos, setPos] = reactExports.useState(() => {
    if (typeof window === "undefined") return { x: 80, y: 80 };
    const saved = readJson(STORAGE_KEYS.termWindowPos, parsePos);
    if (saved) return saved;
    return {
      x: Math.max(24, Math.round(window.innerWidth / 2 - 360)),
      y: Math.max(24, Math.round(window.innerHeight / 2 - 260))
    };
  });
  const [size, setSize] = reactExports.useState(() => {
    if (typeof window === "undefined") return { w: DEFAULT_WIDTH, h: DEFAULT_HEIGHT };
    const saved = readJson(STORAGE_KEYS.termWindowSize, parseSize);
    if (saved) return saved;
    return {
      w: Math.min(DEFAULT_WIDTH, window.innerWidth - 48),
      h: Math.min(DEFAULT_HEIGHT, window.innerHeight - 96)
    };
  });
  reactExports.useEffect(() => {
    writeJson(STORAGE_KEYS.termWindowPos, pos);
  }, [pos]);
  reactExports.useEffect(() => {
    writeJson(STORAGE_KEYS.termWindowSize, size);
  }, [size]);
  const onHeaderMouseDown = (e) => {
    if (!enabled) return;
    if (e.target.closest("[data-window-btn]")) return;
    e.preventDefault();
    const startX = e.clientX;
    const startY = e.clientY;
    const start = { ...pos };
    trackDrag((ev) => {
      setPos({
        x: Math.max(0, Math.min(window.innerWidth - 80, start.x + (ev.clientX - startX))),
        y: Math.max(0, Math.min(window.innerHeight - 40, start.y + (ev.clientY - startY)))
      });
    });
  };
  const onResizeMouseDown = (e) => {
    if (!enabled) return;
    e.preventDefault();
    e.stopPropagation();
    const startX = e.clientX;
    const startY = e.clientY;
    const start = { ...size };
    trackDrag((ev) => {
      setSize({
        w: Math.max(
          MIN_WIDTH,
          Math.min(window.innerWidth - pos.x - 8, start.w + (ev.clientX - startX))
        ),
        h: Math.max(
          MIN_HEIGHT,
          Math.min(window.innerHeight - pos.y - 8, start.h + (ev.clientY - startY))
        )
      });
    });
  };
  return { pos, size, onHeaderMouseDown, onResizeMouseDown };
}
const USERNAME_EVENT = "usernamechange";
const DEFAULT_USERNAME = "guest";
function getUsername() {
  return readString(STORAGE_KEYS.username) || DEFAULT_USERNAME;
}
function setStoredUsername(name) {
  writeString(STORAGE_KEYS.username, name);
  window.dispatchEvent(new CustomEvent(USERNAME_EVENT, { detail: name }));
}
function useUsername() {
  const [username, setUsername] = reactExports.useState(DEFAULT_USERNAME);
  reactExports.useEffect(() => {
    setUsername(getUsername());
    const onChange = (e) => setUsername(e.detail || DEFAULT_USERNAME);
    window.addEventListener(USERNAME_EVENT, onChange);
    return () => window.removeEventListener(USERNAME_EVENT, onChange);
  }, []);
  return username;
}
let countedThisLoad = null;
function useVisitCount() {
  const [visits, setVisits] = reactExports.useState(0);
  reactExports.useEffect(() => {
    if (countedThisLoad === null) {
      countedThisLoad = readNumber(STORAGE_KEYS.visits, 0) + 1;
      writeString(STORAGE_KEYS.visits, String(countedThisLoad));
    }
    setVisits(countedThisLoad);
  }, []);
  return visits;
}
const MAX_ALIAS_DEPTH = 5;
function parseAliases(value) {
  if (typeof value !== "object" || value === null) return {};
  const result = {};
  for (const [name, target] of Object.entries(value)) {
    if (typeof target === "string") result[name] = target;
  }
  return result;
}
function loadAliases() {
  return readJson(STORAGE_KEYS.termAliases, parseAliases) ?? {};
}
function saveAliases(aliases) {
  writeJson(STORAGE_KEYS.termAliases, aliases);
}
let audioCtx = null;
function playKeystroke() {
  try {
    if (!audioCtx) {
      const Ctor = window.AudioContext ?? window.webkitAudioContext;
      if (!Ctor) return;
      audioCtx = new Ctor();
    }
    if (audioCtx.state === "suspended") void audioCtx.resume();
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
};
const COLOR_KEYS = Object.keys(DEFAULT_COLORS);
const HEX_PATTERN = /#(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{6})(?![0-9a-fA-F])/;
function isHex(value) {
  return new RegExp(`^${HEX_PATTERN.source}$`).test(value);
}
function parseColors(value) {
  const result = { ...DEFAULT_COLORS };
  if (typeof value !== "object" || value === null) return result;
  for (const key of COLOR_KEYS) {
    const candidate = value[key];
    if (typeof candidate === "string" && isHex(candidate)) result[key] = candidate;
  }
  return result;
}
function loadColors() {
  return readJson(STORAGE_KEYS.termColors, parseColors) ?? { ...DEFAULT_COLORS };
}
function saveColors(colors) {
  writeJson(STORAGE_KEYS.termColors, colors);
}
function clearStoredColors() {
  removeKey(STORAGE_KEYS.termColors);
}
function colorCssVars(colors) {
  const vars = {
    "--t-prompt": colors.prompt,
    "--t-path": colors.path,
    "--t-sys": colors.sys,
    "--t-out": colors.out,
    "--t-in": colors.in,
    "--t-ghost": colors.ghost,
    "--t-cmd": colors.cmd
  };
  return vars;
}
const HELP_HEADER = "Available commands:";
function padded(label, width) {
  return label.padEnd(width);
}
function printAligned(print, rows) {
  const width = Math.max(...rows.map((r) => r.label.length)) + 2;
  for (const row of rows) print(`${padded(`${row.label}:`, width)}${row.value}`);
}
function runColor(ctx) {
  const { args, print, state, actions } = ctx;
  const sub = (args[0] || "").toLowerCase();
  if (!sub || sub === "list") {
    print("Color tokens (use: color set <key> <#hex>)");
    for (const key2 of COLOR_KEYS) print(`  ${key2.padEnd(14)} ${state.colors[key2]}`);
    return;
  }
  if (sub === "reset") {
    clearStoredColors();
    actions.setColors({ ...DEFAULT_COLORS });
    print("Colors reset to defaults.");
    return;
  }
  if (sub !== "set") {
    print("Usage: color [list|reset] | color set <key> <#hex>");
    return;
  }
  const rawKey = args[1];
  const value = args[2];
  const key = rawKey ? COLOR_KEYS.find((k) => k.toLowerCase() === rawKey.toLowerCase()) : void 0;
  if (!key) {
    print(`Unknown key. Try: ${COLOR_KEYS.join(", ")}`);
  } else if (!value || !isHex(value)) {
    print("Value must be hex like #ff00aa or #f0a.");
  } else {
    const next = { ...state.colors, [key]: value };
    actions.setColors(next);
    saveColors(next);
    print(`${key} → ${value}`);
  }
}
function runCv(ctx) {
  const { args, print } = ctx;
  let flags = "";
  let unknown = "";
  for (const arg of args) {
    if (!arg.startsWith("-")) continue;
    for (const ch of arg.slice(1)) {
      if (ch === "s" || ch === "c") {
        if (!flags.includes(ch)) flags += ch;
      } else {
        unknown += ch;
      }
    }
  }
  if (unknown) {
    print(`Unknown flag(s): -${unknown}. Use -s, -c, or -sc.`);
    return;
  }
  const show = flags.includes("s");
  const copy = flags.includes("c");
  if (!show && !copy) {
    print("Opening CV on Google Drive…");
    window.open(profile.cvUrl, "_blank");
    return;
  }
  if (show) print(`CV link: ${profile.cvUrl}`);
  if (copy) {
    void navigator.clipboard?.writeText(profile.cvUrl).then(() => print("✓ CV link copied to clipboard.")).catch(() => print("Could not copy to clipboard in this browser."));
  }
}
const commands = [
  {
    name: "help",
    description: "Show this help",
    run: ({ print, printHelp }) => {
      print(HELP_HEADER);
      for (const command of commands) {
        printHelp(command.usage ?? command.name, command.description);
      }
    }
  },
  {
    name: "whoami",
    description: "Who is Ahmed?",
    run: ({ print }) => {
      print(`${profile.name} — ${profile.role} (backend & microservices).`);
      print("ACPC Finalist · 2000+ problems solved · FastAPI / NestJS / Kubernetes.");
    }
  },
  {
    name: "name",
    description: "Show your current username",
    run: ({ print, state }) => {
      print(`You are currently: ${state.username}`);
      print("Use `setname <your-name>` to change it.");
    }
  },
  {
    name: "setname",
    usage: "setname <name>",
    description: "Change your username (saved in this browser)",
    run: ({ rawArgs, print, actions }) => {
      const clean = rawArgs.replace(/[^a-zA-Z0-9_\-.]/g, "").slice(0, 24);
      if (!clean) {
        print("Usage: setname <name>  (letters, numbers, _ - . only)");
        return;
      }
      setStoredUsername(clean);
      actions.setUsername(clean);
      print(`Nice to meet you, ${clean}. Saved.`);
    }
  },
  {
    name: "experience",
    description: "Years of experience & current role",
    run: ({ print }) => {
      for (const role of experiences.filter((e) => e.current)) {
        print(`Currently @ ${role.shortName} — ${role.role} (${role.period})`);
      }
      print("Backend across NestJS, FastAPI, Flask, .NET, Spring Boot.");
      const past = experiences.filter((e) => !e.current).map((e) => e.shortName).join(", ");
      print(`Past: ${past}. Type \`enter\` for full timeline.`);
    }
  },
  {
    name: "skills",
    description: "Tech stack",
    run: ({ print }) => {
      printAligned(
        print,
        Object.entries(skills).map(([group, items]) => ({
          label: group,
          value: items.join(", ")
        }))
      );
    }
  },
  {
    name: "projects",
    description: "Featured projects",
    run: ({ print }) => {
      for (const project of projects) print(`• ${project.shortName} — ${project.short}`);
    }
  },
  {
    name: "visits",
    description: "Number of visits to this site",
    run: ({ print, state }) => {
      const times = state.visits === 1 ? "time" : "times";
      print(`This site has been visited ${state.visits} ${times} from this browser.`);
    }
  },
  {
    name: "social",
    description: "Social links",
    run: ({ print }) => {
      printAligned(
        print,
        links.map((link) => ({ label: link.label, value: link.url }))
      );
    }
  },
  {
    name: "email",
    description: "Open mail to Ahmed",
    run: ({ print }) => {
      print(`Opening mail client → ${profile.email}`);
      window.location.href = `mailto:${profile.email}`;
    }
  },
  {
    name: "cv",
    usage: "cv [-s|-c|-sc]",
    description: "Open CV. -s show link · -c copy link · -sc both",
    run: runCv
  },
  {
    name: "theme",
    description: "Toggle light / dark mode",
    run: ({ print }) => print(`Theme switched to ${toggleTheme()} mode.`)
  },
  {
    name: "sound",
    description: "Toggle terminal typing sound",
    run: ({ print, state, actions }) => {
      const next = !state.soundEnabled;
      actions.setSoundEnabled(next);
      writeFlag(STORAGE_KEYS.termSound, next);
      print(`Typing sound ${next ? "ENABLED" : "DISABLED"}.`);
    }
  },
  {
    name: "gaming",
    aliases: ["game"],
    description: "Toggle gaming mode (unlocks the cups game)",
    run: ({ print }) => {
      print(
        toggleGamingMode() ? "🎮 Gaming mode ENABLED — enter the site to find a dedicated gaming section." : "Gaming mode disabled."
      );
    }
  },
  {
    name: "color",
    description: "list | set <key> <#hex> | reset",
    run: runColor
  },
  {
    name: "alias",
    description: "list | <name>=<command>   (e.g. alias ll=skills)",
    run: ({ rawArgs, print, state, actions }) => {
      if (!rawArgs || rawArgs.toLowerCase() === "list") {
        const names = Object.keys(state.aliases);
        if (!names.length) print("No aliases. Try: alias ll=skills");
        else for (const name2 of names) print(`  ${name2} = ${state.aliases[name2]}`);
        return;
      }
      const match = rawArgs.match(/^([a-zA-Z0-9_-]+)\s*=\s*(.+)$/);
      if (!match) {
        print("Usage: alias <name>=<command>");
        return;
      }
      const name = match[1].toLowerCase();
      const target = match[2].trim().toLowerCase();
      const next = { ...state.aliases, [name]: target };
      actions.setAliases(next);
      saveAliases(next);
      print(`alias ${name} → ${target}`);
    }
  },
  {
    name: "unalias",
    usage: "unalias <name>",
    description: "Remove an alias",
    run: ({ args, print, state, actions }) => {
      const name = (args[0] || "").toLowerCase();
      if (!name || !(name in state.aliases)) {
        print(`No such alias: ${name || "(none)"}`);
        return;
      }
      const next = { ...state.aliases };
      delete next[name];
      actions.setAliases(next);
      saveAliases(next);
      print(`Removed alias ${name}.`);
    }
  },
  {
    name: "clear",
    description: "Clear the terminal",
    run: () => ({ clearScreen: true, skipHistory: true })
  },
  {
    name: "minimize",
    aliases: ["min"],
    description: "Minimize the terminal to the bottom bar",
    run: ({ print, actions }) => {
      print("Minimizing…");
      actions.minimize();
      return { skipHistory: true };
    }
  },
  {
    name: "exit",
    aliases: ["open"],
    description: "Close the terminal window",
    run: ({ print, actions }) => {
      print("Closing terminal window…");
      actions.close();
      return { skipHistory: true };
    }
  }
];
const byName = /* @__PURE__ */ new Map();
for (const command of commands) {
  byName.set(command.name, command);
  for (const alias of command.aliases ?? []) byName.set(alias, command);
}
function findCommand(name) {
  return byName.get(name);
}
const COMMAND_NAMES = [...byName.keys()];
const SPLIT_PATTERN = new RegExp(`(${HEX_PATTERN.source})`);
function renderHexInline(text, baseColor) {
  return text.split(SPLIT_PATTERN).map(
    (part, i) => isHex(part) ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: part, fontWeight: 700, textShadow: `0 0 6px ${part}` }, children: part }, i) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: baseColor }, children: part }, i)
  );
}
function renderInputOverlay(text, baseColor, cmdColor, knownCommands) {
  if (!text) return null;
  const firstSpace = text.indexOf(" ");
  const head = firstSpace === -1 ? text : text.slice(0, firstSpace);
  const tail = firstSpace === -1 ? "" : text.slice(firstSpace);
  const isKnown = knownCommands.includes(head.toLowerCase());
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: isKnown ? cmdColor : baseColor, fontWeight: isKnown ? 700 : 400 }, children: head }),
    tail ? renderHexInline(tail, baseColor) : null
  ] });
}
const HELP_COLUMN = 16;
function TerminalScrollback({
  lines,
  colors,
  username,
  knownCommands
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: lines.map((line, idx) => {
    if (line.kind === "in") {
      return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { color: colors.in }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { style: { color: colors.prompt }, children: [
          username,
          "@",
          profile.domain
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: colors.path }, children: ":~$ " }),
        renderInputOverlay(line.text, colors.in, colors.cmd, knownCommands)
      ] }, idx);
    }
    if (line.kind === "help") {
      return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { color: colors.out }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: colors.cmd }, children: line.cmd.padEnd(HELP_COLUMN) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: line.desc })
      ] }, idx);
    }
    const color = line.kind === "sys" ? colors.sys : colors.out;
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: line.kind === "sys" ? "font-semibold" : "", style: { color }, children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: renderHexInline(line.text, color) }) }, idx);
  }) });
}
const MAX_INPUT = 50;
const CLOSE_DELAY_MS = 250;
const MINIMIZE_DELAY_MS = 200;
const HEADER_HEIGHT_PX = 41;
const GREETING = [
  { kind: "sys", text: `ahmed-os v1.0.4 — © ${profile.name}` },
  {
    kind: "sys",
    text: "Type `help` to see what I can do. Drag the title bar to move · drag the corner to resize."
  }
];
function Terminal({
  mode,
  onClose,
  onMinimize,
  onRestore
}) {
  const [lines, setLines] = reactExports.useState(GREETING);
  const [input, setInput] = reactExports.useState("");
  const [username, setUsername] = reactExports.useState("user");
  const [colors, setColors] = reactExports.useState(DEFAULT_COLORS);
  const [aliases, setAliases] = reactExports.useState({});
  const [soundEnabled, setSoundEnabled] = reactExports.useState(false);
  const inputRef = reactExports.useRef(null);
  const scrollRef = reactExports.useRef(null);
  const innerRef = reactExports.useRef(null);
  const history = useCommandHistory();
  const visits = useVisitCount();
  const win = useTerminalWindow(mode === "float");
  const knownCommands = [...COMMAND_NAMES, ...Object.keys(aliases)];
  reactExports.useEffect(() => {
    setSoundEnabled(readFlag(STORAGE_KEYS.termSound, false));
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
      const target = e.target;
      if (target && innerRef.current && !innerRef.current.contains(target)) onMinimize();
    };
    document.addEventListener("mousedown", onDocMouseDown);
    return () => document.removeEventListener("mousedown", onDocMouseDown);
  }, [mode, onMinimize]);
  function run(raw, depth = 0, options = {}) {
    const record = options.record ?? true;
    const trimmed = raw.trim();
    const [name = "", ...args] = trimmed.toLowerCase().split(/\s+/);
    const rawArgs = trimmed.split(/\s+/).slice(1).join(" ").trim();
    const out = record ? [{ kind: "in", text: raw }] : [];
    const alias = aliases[name];
    if (name && alias && depth < MAX_ALIAS_DEPTH) {
      const expanded = alias + (args.length ? ` ${args.join(" ")}` : "");
      setLines((l) => [...l, ...out, { kind: "sys", text: `→ ${expanded}` }]);
      setInput("");
      if (record && trimmed) history.push(raw);
      run(expanded, depth + 1, { record: false });
      return;
    }
    const command = name ? findCommand(name) : void 0;
    let result = void 0;
    if (name && !command) {
      out.push({ kind: "out", text: `command not found: ${name}. Try \`help\`.` });
    } else if (command) {
      result = command.run({
        args,
        rawArgs,
        print: (text) => out.push({ kind: "out", text }),
        printHelp: (cmd, desc) => out.push({ kind: "help", cmd, desc }),
        state: { username, visits, colors, aliases, soundEnabled },
        actions: {
          setUsername,
          setColors,
          setAliases,
          setSoundEnabled,
          close: () => setTimeout(onClose, CLOSE_DELAY_MS),
          minimize: () => setTimeout(onMinimize, MINIMIZE_DELAY_MS)
        }
      });
    }
    setLines((l) => result?.clearScreen ? [] : [...l, ...out]);
    setInput("");
    if (record && trimmed && !result?.skipHistory) history.push(raw);
  }
  function suggestion() {
    if (!input || input.includes(" ")) return "";
    const lower = input.toLowerCase();
    const match = knownCommands.find((c) => c.startsWith(lower) && c !== lower);
    return match ? match.slice(input.length) : "";
  }
  function onKeyDown(e) {
    if (soundEnabled) playKeystroke();
    if (e.key === "ArrowUp") {
      e.preventDefault();
      const previous = history.previous(input);
      if (previous !== void 0) setInput(previous);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      const next = history.next(input);
      if (next !== void 0) setInput(next);
    } else if (e.key === "Tab") {
      e.preventDefault();
      const completion = suggestion();
      if (completion) setInput(input + completion);
    }
  }
  const cssVars = colorCssVars(colors);
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
            "@",
            profile.domain
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "— zsh (minimized)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-auto opacity-60 group-hover:opacity-100", children: "click to restore" })
        ] })
      }
    );
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: "dark fixed z-50",
      onClick: () => inputRef.current?.focus(),
      style: { ...cssVars, left: win.pos.x, top: win.pos.y, width: win.size.w, height: win.size.h },
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          ref: innerRef,
          className: "relative h-full w-full overflow-hidden rounded-xl border border-border bg-card/95 shadow-2xl backdrop-blur",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "flex items-center gap-2 border-b border-border bg-background/40 px-4 py-2.5 select-none",
                onMouseDown: win.onHeaderMouseDown,
                style: { cursor: "move" },
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
                    "@",
                    profile.domain,
                    " — zsh"
                  ] })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                ref: scrollRef,
                className: "overflow-y-auto px-5 py-4 font-mono text-sm leading-relaxed",
                style: { height: `calc(100% - ${HEADER_HEIGHT_PX}px)` },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    TerminalScrollback,
                    {
                      lines,
                      colors,
                      username,
                      knownCommands
                    }
                  ),
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
                          "@",
                          profile.domain
                        ] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: colors.path }, children: ":~$ " }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex-1", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "div",
                            {
                              "aria-hidden": true,
                              className: "pointer-events-none absolute inset-0 whitespace-pre font-mono",
                              style: { zIndex: 10 },
                              children: renderInputOverlay(input, colors.in, colors.cmd, knownCommands)
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
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                onMouseDown: win.onResizeMouseDown,
                className: "absolute bottom-0 right-0 h-4 w-4 cursor-se-resize",
                title: "Drag to resize",
                style: {
                  background: "linear-gradient(135deg, transparent 50%, var(--t-path) 50%, var(--t-path) 60%, transparent 60%, transparent 70%, var(--t-path) 70%, var(--t-path) 80%, transparent 80%)"
                }
              }
            )
          ]
        }
      )
    }
  );
}
const WINDOW_MODES = ["float", "min", "closed"];
function isWindowMode(value) {
  return value !== null && WINDOW_MODES.includes(value);
}
function Index() {
  const [termMode, setTermMode] = reactExports.useState(() => {
    const saved = readString(STORAGE_KEYS.termMode);
    return isWindowMode(saved) ? saved : "closed";
  });
  const [mounted, setMounted] = reactExports.useState(false);
  const gamingMode = useGamingMode();
  const terminalUser = useUsername();
  useVisitCount();
  reactExports.useEffect(() => setMounted(true), []);
  const changeMode = (mode) => {
    writeString(STORAGE_KEYS.termMode, mode);
    setTermMode(mode);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative min-h-screen bg-background text-foreground", children: [
    mounted && /* @__PURE__ */ jsxRuntimeExports.jsx(Starfield, {}),
    mounted && /* @__PURE__ */ jsxRuntimeExports.jsx(MouseGlow, {}),
    mounted && /* @__PURE__ */ jsxRuntimeExports.jsx(CustomCursor, {}),
    mounted && termMode !== "closed" && /* @__PURE__ */ jsxRuntimeExports.jsx(Terminal, { mode: termMode, onClose: () => changeMode("closed"), onMinimize: () => changeMode("min"), onRestore: () => changeMode("float") }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(NavBar, {}),
    mounted && /* @__PURE__ */ jsxRuntimeExports.jsx(SessionTimer, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { id: "top", className: "relative z-10 max-w-5xl mx-auto px-6 pb-24", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Hero, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Stats, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Experience, {}),
      gamingMode && /* @__PURE__ */ jsxRuntimeExports.jsx(CupGame, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Projects, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skills, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Achievements, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Contact, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx(SiteFooter, {})
    ] }),
    mounted && termMode === "closed" && /* @__PURE__ */ jsxRuntimeExports.jsx(CommandBar, { username: terminalUser, onOpen: () => changeMode("float") })
  ] });
}
export {
  Index as component
};
