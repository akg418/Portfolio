import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { p as profile, d as domainParts, r as roles, l as linkOf, h as stats, b as experiences, s as skills, c as competitions, a as problemSetting, e as education, f as links, g as projects } from "./router-CWnr3xW-.mjs";
import { S as Slot } from "../_libs/radix-ui__react-slot.mjs";
import { c as cva } from "../_libs/class-variance-authority.mjs";
import { c as clsx } from "../_libs/clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
import { R as Root, P as Portal, C as Content, a as Close, T as Title, D as Description, O as Overlay } from "../_libs/radix-ui__react-dialog.mjs";
import { M as Mail, C as Clock, A as ArrowUp, S as Square, R as RotateCcw, a as Search, b as ArrowUpRight, G as Github, L as Linkedin, c as CodeXml, T as Trophy, F as FileText, B as Briefcase, d as Gamepad2, e as RotateCw, f as GraduationCap, g as MapPin, h as Globe, P as Phone, i as SquareTerminal, D as Download, X, j as Play, k as Pause, l as Activity, Z as Zap, m as Radar, n as Skull, o as Scissors } from "../_libs/lucide-react.mjs";
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
import "../_libs/radix-ui__primitive.mjs";
import "../_libs/radix-ui__react-context.mjs";
import "../_libs/radix-ui__react-id.mjs";
import "../_libs/@radix-ui/react-use-layout-effect+[...].mjs";
import "../_libs/@radix-ui/react-use-controllable-state+[...].mjs";
import "../_libs/@radix-ui/react-dismissable-layer+[...].mjs";
import "../_libs/radix-ui__react-primitive.mjs";
import "../_libs/@radix-ui/react-use-callback-ref+[...].mjs";
import "../_libs/@radix-ui/react-use-escape-keydown+[...].mjs";
import "../_libs/radix-ui__react-focus-scope.mjs";
import "../_libs/radix-ui__react-portal.mjs";
import "../_libs/radix-ui__react-presence.mjs";
import "../_libs/radix-ui__react-focus-guards.mjs";
import "../_libs/react-remove-scroll.mjs";
import "tslib";
import "../_libs/react-remove-scroll-bar.mjs";
import "../_libs/react-style-singleton.mjs";
import "../_libs/get-nonce.mjs";
import "../_libs/use-sidecar.mjs";
import "../_libs/use-callback-ref.mjs";
import "../_libs/aria-hidden.mjs";
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
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-3xl font-bold tracking-tight", children: "Gaming mode — Cups & Ball" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "group/cab relative ml-auto", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "span",
          {
            "aria-hidden": true,
            className: "block h-7 w-5 rounded-t-md border border-amber-400/40 bg-amber-400/10 opacity-60 transition-opacity group-hover/cab:opacity-100",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mx-auto mt-1 block h-2.5 w-3 rounded-sm bg-amber-300/40" })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "pointer-events-none absolute right-0 top-9 z-20 w-56 rounded-md border border-amber-400/40 bg-background/95 p-2.5 font-mono text-[10px] leading-relaxed text-amber-300 opacity-0 shadow-lg transition-opacity group-hover/cab:opacity-100", children: [
          "INSERT COIN · PLAYER 1",
          /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
          "HI-SCORE: AHMED KHALED _ _ _ _ _",
          /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "no keyboard on this cabinet… just type the missing name." })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mb-4", children: "Find the cup hiding the ball after the shuffle. Adjust the speed to your reflexes." }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "a",
      {
        href: "https://gom3a.itch.io/snake-game",
        target: "_blank",
        rel: "noreferrer noopener",
        className: "mb-10 inline-flex items-center gap-1 text-sm font-mono text-muted-foreground underline decoration-border underline-offset-4 transition-colors hover:text-foreground",
        children: [
          "Or play my Snake game in C on itch.io",
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowUpRight, { className: "w-3.5 h-3.5" })
        ]
      }
    ),
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
const LABEL_SIZE = 72;
const INTERACTIVE = "a,button,input,textarea,[role=button]";
function CustomCursor() {
  const [mounted, setMounted] = reactExports.useState(false);
  const [hover, setHover] = reactExports.useState(false);
  const [down, setDown] = reactExports.useState(false);
  const [label, setLabel] = reactExports.useState(null);
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
      setLabel(target?.closest("[data-cursor]")?.dataset.cursor ?? null);
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
  const size = label ? LABEL_SIZE : hover ? HOVER_SIZE : DOT_SIZE;
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
        className: "pointer-events-none fixed left-0 top-0 z-[100] flex items-center justify-center rounded-full font-mono text-[10px] uppercase tracking-widest text-foreground transition-[width,height,background,border-color] duration-150",
        style: {
          ...base,
          width: size,
          height: size,
          border: "1.5px solid oklch(0.78 0.17 200)",
          background: label ? "oklch(0.78 0.17 200 / 0.25)" : hover ? "oklch(0.78 0.17 200 / 0.15)" : "transparent",
          backdropFilter: label ? "blur(4px)" : void 0,
          transform: `translate(var(--cursor-x), var(--cursor-y)) translate(-50%, -50%) scale(${down ? 0.85 : 1})`
        },
        children: label
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
const LABEL = "BACK TO TOP • BACK TO TOP • ";
const RING_R = 34;
const RING = 2 * Math.PI * RING_R;
function BackToTop() {
  const [visible, setVisible] = reactExports.useState(false);
  const ringRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const h = document.documentElement;
      const total = h.scrollHeight - h.clientHeight;
      const t = total > 0 ? h.scrollTop / total : 0;
      setVisible(h.scrollTop > window.innerHeight);
      ringRef.current?.style.setProperty("stroke-dashoffset", String(RING * (1 - t)));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "button",
    {
      type: "button",
      onClick: () => window.scrollTo({ top: 0, behavior: "smooth" }),
      "aria-label": "Back to top",
      tabIndex: visible ? 0 : -1,
      className: "group fixed bottom-32 right-3 z-30 h-14 w-14 rounded-full sm:right-6 sm:h-[76px] sm:w-[76px] bg-background/70 backdrop-blur-md transition-[opacity,transform] duration-500",
      style: {
        opacity: visible ? 1 : 0,
        transform: visible ? "none" : "translateY(20px) scale(0.8)",
        pointerEvents: visible ? "auto" : "none"
      },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { viewBox: "0 0 76 76", className: "absolute inset-0 h-full w-full", "aria-hidden": true, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "circle",
            {
              cx: "38",
              cy: "38",
              r: RING_R,
              fill: "none",
              className: "stroke-border",
              strokeWidth: "1.5"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "circle",
            {
              ref: ringRef,
              cx: "38",
              cy: "38",
              r: RING_R,
              fill: "none",
              stroke: "var(--color-primary)",
              strokeWidth: "1.5",
              strokeLinecap: "round",
              strokeDasharray: RING,
              strokeDashoffset: RING,
              transform: "rotate(-90 38 38)"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("defs", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { id: "btt-circle", d: "M38,38 m-25,0 a25,25 0 1,1 50,0 a25,25 0 1,1 -50,0" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("g", { className: "btt-spin", children: /* @__PURE__ */ jsxRuntimeExports.jsx("text", { className: "fill-muted-foreground font-mono", fontSize: "7.2", letterSpacing: "1.3", children: /* @__PURE__ */ jsxRuntimeExports.jsx("textPath", { href: "#btt-circle", children: LABEL }) }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowUp, { className: "absolute left-1/2 top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 text-primary transition-transform group-hover:-translate-y-[70%]" })
      ]
    }
  );
}
const STORAGE_KEYS = {
  username: "username",
  visits: "visits",
  gamingMode: "gamingMode",
  robots: "robots",
  vehicle: "vehicle",
  mysteries: "mysteries",
  termMode: "termMode_v2",
  termColors: "term-colors",
  termAliases: "term-aliases",
  termSound: "term-sound",
  termWindowPos: "term-winpos",
  termWindowSize: "term-winsize"
};
function readString(key) {
  if (typeof window === "undefined") return null;
  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
}
function writeString(key, value) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(key, value);
  } catch {
  }
}
function removeKey(key) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.removeItem(key);
  } catch {
  }
}
function readJson(key, parse2) {
  const raw = readString(key);
  if (raw === null) return void 0;
  try {
    return parse2(JSON.parse(raw));
  } catch {
    return void 0;
  }
}
function writeJson(key, value) {
  try {
    writeString(key, JSON.stringify(value));
  } catch {
  }
}
function readNumber(key, fallback) {
  const raw = readString(key);
  if (raw === null) return fallback;
  const n = Number(raw);
  return Number.isFinite(n) ? n : fallback;
}
function readFlag(key, fallback) {
  const raw = readString(key);
  if (raw === null) return fallback;
  return raw !== "0";
}
function writeFlag(key, value) {
  writeString(key, value ? "1" : "0");
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
const MYSTERIES = [
  {
    id: "konami",
    title: "Old school",
    riddle: "The arcade cabinet in the Gaming section is missing a third name. My email has it."
  },
  {
    id: "sudo",
    title: "Root access",
    riddle: "The badge says “If found, hire”. The terminal agrees — but only for root."
  },
  { id: "badge", title: "Persistence", riddle: "The badge has seven punch holes. Fill every one." },
  {
    id: "balloons",
    title: "All accepted",
    riddle: "A contest is won with every problem accepted. Watch the scoreboard in the balloon box."
  },
  {
    id: "robots",
    title: "Holy war",
    riddle: "Alice and Bob disagree about something. Poke each until they say what."
  },
  {
    id: "carParty",
    title: "Drive-in",
    riddle: "The car can't resist the ACPC track. Take it there — and don't brake."
  },
  {
    id: "outage",
    title: "INC-404",
    riddle: "The core API's SLO says it never reaches 0 ready. Prove it wrong."
  },
  {
    id: "midnight",
    title: "Night owl",
    riddle: "A sleeping owl sits by the Cairo clock. It wakes at midnight, Cairo time."
  },
  {
    id: "console",
    title: "Inspector",
    riddle: "Developers: read the footer's TODO. The debug hook is still listening.",
    dev: true
  },
  {
    id: "problem",
    title: "Accepted",
    riddle: "I set problems for a living. One never left this browser — look where sites keep things.",
    dev: true
  },
  {
    id: "crawler",
    title: "Staff only",
    riddle: "Alice and Bob keep a classic file for the bots. It names one room they must never enter.",
    dev: true
  },
  {
    id: "status",
    title: "Friday deploy",
    riddle: "The footer swears all systems are ok. Ask the network where it heard that.",
    dev: true
  }
];
const MYSTERY_EVENT = "mystery-solved";
function parse$2(v) {
  if (!Array.isArray(v)) return void 0;
  const ids = new Set(MYSTERIES.map((m) => m.id));
  return v.filter((x) => typeof x === "string" && ids.has(x));
}
function solvedMysteries() {
  return readJson(STORAGE_KEYS.mysteries, parse$2) ?? [];
}
function solveMystery(id) {
  const solved = solvedMysteries();
  if (solved.includes(id)) return false;
  const next = [...solved, id];
  writeJson(STORAGE_KEYS.mysteries, next);
  window.dispatchEvent(
    new CustomEvent(MYSTERY_EVENT, { detail: { id, solved: next, fresh: true } })
  );
  return true;
}
function useMysteries() {
  const [solved, setSolved] = reactExports.useState([]);
  reactExports.useEffect(() => {
    setSolved(solvedMysteries());
    const on = (e) => setSolved(e.detail.solved);
    window.addEventListener(MYSTERY_EVENT, on);
    return () => window.removeEventListener(MYSTERY_EVENT, on);
  }, []);
  return solved;
}
function fnv(text) {
  let h = 2166136261;
  for (let i = 0; i < text.length; i++) h = Math.imul(h ^ text.charCodeAt(i), 16777619);
  return (h >>> 0).toString(16);
}
function confetti(x = window.innerWidth / 2, y = window.innerHeight / 3) {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const c = document.createElement("canvas");
  const dpr = Math.min(2, window.devicePixelRatio || 1);
  c.width = window.innerWidth * dpr;
  c.height = window.innerHeight * dpr;
  c.style.cssText = "position:fixed;inset:0;width:100%;height:100%;pointer-events:none;z-index:120";
  document.body.appendChild(c);
  const g = c.getContext("2d");
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
      w: 5 + Math.random() * 5
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
const SECRET_WORD = ["g", "o", "m", "a", "a"];
const KEY_HASH = "a48cea5f";
const PROBLEM_KEY = "ahmed.dev:problem";
function MysteryHud() {
  const solved = useMysteries();
  const username = useUsername();
  const [toast, setToast] = reactExports.useState(null);
  const [certificate, setCertificate] = reactExports.useState(false);
  const toastTimer = reactExports.useRef(0);
  reactExports.useEffect(() => {
    const on = (e) => {
      const { id, solved: all } = e.detail;
      const m = MYSTERIES.find((x) => x.id === id);
      confetti();
      setToast(`Mystery solved — ${m?.title ?? id} · ${all.length}/${MYSTERIES.length}`);
      window.clearTimeout(toastTimer.current);
      toastTimer.current = window.setTimeout(() => setToast(null), 3600);
      if (all.length === MYSTERIES.length) window.setTimeout(() => setCertificate(true), 1500);
    };
    window.addEventListener(MYSTERY_EVENT, on);
    return () => window.removeEventListener(MYSTERY_EVENT, on);
  }, []);
  const [arcade, setArcade] = reactExports.useState(false);
  reactExports.useEffect(() => {
    document.documentElement.classList.toggle("arcade", arcade);
  }, [arcade]);
  reactExports.useEffect(() => {
    let i = 0;
    const on = (e) => {
      const t = e.target;
      if (t?.closest("input, textarea")) return;
      const k = e.key.toLowerCase();
      i = k === SECRET_WORD[i] ? i + 1 : k === SECRET_WORD[0] ? 1 : 0;
      if (i < SECRET_WORD.length) return;
      i = 0;
      setArcade((a) => !a);
      solveMystery("konami");
    };
    window.addEventListener("keydown", on);
    return () => window.removeEventListener("keydown", on);
  }, []);
  reactExports.useEffect(() => {
    console.log(
      "%c👀 ahmed.dev%c\n[debug] hook still attached at window.__ahmed — someone forgot to remove it before launch. Start with %c__ahmed.hint()",
      "font:700 16px ui-monospace,monospace;color:#22d3ee",
      "font:12px ui-monospace,monospace;color:#94a3b8",
      "font:700 12px ui-monospace,monospace;color:#a855f7"
    );
    window.__ahmed = {
      hint() {
        return "The key lives in the cascade. Inspect the :root element's custom properties — it's hex. Then call __ahmed.unlock(key).";
      },
      unlock(key) {
        if (typeof key !== "string" || fnv(key.trim().toLowerCase()) !== KEY_HASH)
          return "Nope. Decode it, don't guess it.";
        solveMystery("console");
        return "🔓 Unlocked. Nice digging. (There's one more for you — some things are stored, not shown.)";
      }
    };
    try {
      localStorage.setItem(
        PROBLEM_KEY,
        JSON.stringify({
          problem: "Popcount Sum",
          statement: "Let f(i) be the number of 1-bits in the binary form of i. Compute S = f(1) + f(2) + … + f(2^20).",
          limits: "1 second, and no brute force needed",
          submit: "Open the terminal and type: submit <S>"
        })
      );
    } catch {
    }
  }, []);
  const count = solved.length;
  const total = MYSTERIES.length;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "group fixed left-4 top-20 z-30 hidden sm:block", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          type: "button",
          onClick: () => count === total && setCertificate(true),
          "aria-describedby": "mystery-info",
          className: "flex items-center gap-1.5 rounded-md border border-amber-400/50 bg-background/80 px-2.5 py-1 font-mono text-xs text-amber-300 backdrop-blur-md",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "h-3.5 w-3.5" }),
            count,
            "/",
            total
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(MysteryInfo, { solved })
    ] }),
    arcade && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "fixed bottom-16 left-1/2 z-[71] flex -translate-x-1/2 items-center gap-2 rounded-full border border-amber-400/60 bg-background/90 px-3 py-1.5 font-mono text-[11px] text-amber-300 shadow-lg", children: [
      "🕹 arcade mode · type GOMAA again to exit",
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          onClick: () => setArcade(false),
          className: "rounded-full border border-amber-400/50 px-2 py-0.5 hover:bg-amber-400/10",
          children: "exit"
        }
      )
    ] }),
    toast && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "fixed left-1/2 top-20 z-[110] -translate-x-1/2 rounded-full border border-amber-400/60 bg-background/90 px-4 py-2 font-mono text-xs text-amber-300 shadow-lg backdrop-blur-md", children: [
      "🔍 ",
      toast,
      count === 1 && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-2 text-muted-foreground", children: "· type `mysteries` in the terminal" })
    ] }),
    certificate && /* @__PURE__ */ jsxRuntimeExports.jsx(Certificate, { username, onClose: () => setCertificate(false) })
  ] });
}
function Certificate({ username, onClose }) {
  const canvasRef = reactExports.useRef(null);
  const date = (/* @__PURE__ */ new Date()).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric"
  });
  reactExports.useEffect(() => {
    const c = canvasRef.current;
    const g = c?.getContext("2d");
    if (!c || !g) return;
    const W = 1200;
    const H = 800;
    c.width = W;
    c.height = H;
    const bg = g.createLinearGradient(0, 0, W, H);
    bg.addColorStop(0, "#0b1224");
    bg.addColorStop(1, "#1e1440");
    g.fillStyle = bg;
    g.fillRect(0, 0, W, H);
    const edge = g.createLinearGradient(0, 0, W, 0);
    edge.addColorStop(0, "#22d3ee");
    edge.addColorStop(1, "#a855f7");
    g.strokeStyle = edge;
    g.lineWidth = 6;
    g.strokeRect(36, 36, W - 72, H - 72);
    g.textAlign = "center";
    g.fillStyle = "#94a3b8";
    g.font = "600 22px ui-monospace, monospace";
    g.fillText("AHMED.DEV · CERTIFICATE OF CURIOSITY", W / 2, 140);
    g.fillStyle = "#fff";
    g.font = "800 64px system-ui, sans-serif";
    g.fillText("You found everything.", W / 2, 260);
    g.fillStyle = edge;
    g.font = "800 72px system-ui, sans-serif";
    g.fillText(username, W / 2, 380);
    g.fillStyle = "#cbd5e1";
    g.font = "400 26px system-ui, sans-serif";
    g.fillText(`solved all ${MYSTERIES.length} hidden mysteries on ahmed.dev`, W / 2, 450);
    g.font = "600 22px ui-monospace, monospace";
    g.fillStyle = "#fbbf24";
    const titles = MYSTERIES.map((m) => m.title);
    const half = Math.ceil(titles.length / 2);
    g.fillText(titles.slice(0, half).join(" · "), W / 2, 520);
    g.fillText(titles.slice(half).join(" · "), W / 2, 556);
    g.fillStyle = "#94a3b8";
    g.font = "400 22px ui-monospace, monospace";
    g.fillText(date, W / 2, 640);
    g.fillText("Verdict: ACCEPTED", W / 2, 680);
  }, [username, date]);
  const download = () => {
    const a = document.createElement("a");
    a.href = canvasRef.current.toDataURL("image/png");
    a.download = "ahmed-dev-certificate.png";
    a.click();
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: "fixed inset-0 z-[115] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm",
      onClick: onClose,
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "w-full max-w-2xl rounded-2xl border border-border bg-background p-4",
          onClick: (e) => e.stopPropagation(),
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("canvas", { ref: canvasRef, className: "w-full rounded-lg" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 flex flex-wrap items-center justify-between gap-2 font-mono text-xs", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "You clearly pay attention — let's talk: there's a line for you in Contact." }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "button",
                  {
                    type: "button",
                    onClick: download,
                    className: "inline-flex items-center gap-1.5 rounded-md bg-primary px-3 py-1.5 font-semibold text-primary-foreground",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "h-3.5 w-3.5" }),
                      " Download"
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "button",
                  {
                    type: "button",
                    onClick: onClose,
                    className: "inline-flex items-center gap-1.5 rounded-md border border-border px-3 py-1.5",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-3.5 w-3.5" }),
                      " Close"
                    ]
                  }
                )
              ] })
            ] })
          ]
        }
      )
    }
  );
}
function MysteryInfo({ solved }) {
  const forAll = MYSTERIES.filter((m) => !m.dev);
  const forDevs = MYSTERIES.filter((m) => m.dev);
  const row = (m) => {
    const done = solved.includes(m.id);
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: done ? "text-emerald-400" : "text-muted-foreground", children: done ? "✔" : "?" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: done ? "text-foreground" : "text-muted-foreground", children: done ? m.title : m.riddle })
    ] }, m.id);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      id: "mystery-info",
      role: "tooltip",
      className: "invisible absolute left-0 top-full mt-2 max-h-[min(55vh,calc(100vh-13rem))] w-[340px] overflow-y-auto overscroll-contain [scrollbar-width:thin] translate-y-1 rounded-xl border border-amber-400/40 bg-background/95 p-4 font-mono text-[11px] leading-relaxed opacity-0 shadow-2xl backdrop-blur-md transition-all duration-200 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs font-bold text-amber-300", children: [
          "Mysteries · ",
          solved.length,
          "/",
          MYSTERIES.length,
          " found"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1.5 text-muted-foreground", children: solved.length === 0 ? "Hidden challenges scattered around this site. Nothing announces them, but every one leaves a clue somewhere on the page. Each riddle below points at one." : `Hidden challenges scattered around this site. You've found ${solved.length === 1 ? "one" : "some"}. Each riddle below points at one still locked.` }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 text-[10px] uppercase tracking-widest text-foreground", children: [
          "For everyone · ",
          forAll.length
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "Things to click, drive, type, poke or wait for." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "mt-1.5 space-y-1", children: forAll.map(row) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 text-[10px] uppercase tracking-widest text-foreground", children: [
          "For developers · ",
          forDevs.length
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "Need the browser DevTools: the console, styles, storage." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "mt-1.5 space-y-1", children: forDevs.map(row) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 border-t border-border pt-2.5 text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground", children: "Secret commands:" }),
          " the terminal knows commands that",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary", children: "help" }),
          " doesn't list. One of them is",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary", children: "mysteries" }),
          ", which shows this list too."
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2 text-muted-foreground", children: [
          "Progress is saved in this browser. Find all ",
          MYSTERIES.length,
          " for a certificate."
        ] })
      ]
    }
  );
}
const LETTERS = ["A", "B", "C", "D", "E", "F", "G", "H"];
const COLORS$1 = [
  "#ef4444",
  "#f59e0b",
  "#22c55e",
  "#3b82f6",
  "#a855f7",
  "#ec4899",
  "#06b6d4",
  "#f97316"
];
const LINKS = 9;
const GRAVITY$2 = 900;
const LIFT = 2200;
const DAMPING$2 = 0.985;
const ITERATIONS$2 = 6;
const RADIUS = 26;
const BLOW_RADIUS = 90;
const BLOW_FORCE = 1400;
const DRAG_PX$1 = 5;
const REINFLATE_MS = 3500;
const INFLATE_MS = 650;
const HEIGHT = 280;
const PARTY_EVENT = "acpc-party";
function ContestBalloons({
  backdrop,
  controls
}) {
  const boxRef = reactExports.useRef(null);
  const svgRef = reactExports.useRef(null);
  const [pops, setPops] = reactExports.useState(0);
  const cutSet = reactExports.useRef(/* @__PURE__ */ new Set());
  const [freed, setFreed] = reactExports.useState([]);
  const state = reactExports.useRef({ balloons: [], shreds: [], pointer: null, grab: null, booms: [] });
  reactExports.useEffect(() => {
    const box = boxRef.current;
    const svg = svgRef.current;
    if (!box || !svg) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const s = state.current;
    const W = () => box.clientWidth;
    const anchorX = (b) => b.anchor * W();
    s.balloons = LETTERS.map((_, i) => {
      const anchor = (i + 0.5) / LETTERS.length;
      const len = 120 + i * 37 % 5 * 18;
      const pts = [];
      for (let k = 0; k <= LINKS; k++) {
        const x = anchor * W();
        const y = HEIGHT - k / LINKS * len;
        pts.push({ x, y, px: x, py: y });
      }
      return {
        anchor,
        len,
        pts,
        sway: Math.random() * 10,
        popped: false,
        poppedAt: 0,
        scale: 1,
        cut: false
      };
    });
    const NS = "http://www.w3.org/2000/svg";
    const strings = [];
    const bodies = [];
    const shredLayer = document.createElementNS(NS, "g");
    const boomLayer = document.createElementNS(NS, "g");
    svg.replaceChildren();
    s.balloons.forEach((_, i) => {
      const path = document.createElementNS(NS, "path");
      path.setAttribute("fill", "none");
      path.setAttribute("stroke", "currentColor");
      path.setAttribute("stroke-opacity", "0.45");
      path.setAttribute("stroke-width", "1.2");
      svg.appendChild(path);
      strings.push(path);
    });
    s.balloons.forEach((_, i) => {
      const g = document.createElementNS(NS, "g");
      g.setAttribute("data-balloon", String(i));
      g.style.cursor = "grab";
      const c = COLORS$1[i % COLORS$1.length];
      g.innerHTML = `
        <path d="M0,-1 l-3.5,6 h7 z" fill="${c}"/>
        <ellipse cx="0" cy="-${RADIUS}" rx="${RADIUS * 0.86}" ry="${RADIUS}" fill="${c}"/>
        <ellipse cx="-${RADIUS * 0.3}" cy="-${RADIUS * 1.35}" rx="${RADIUS * 0.2}" ry="${RADIUS * 0.32}" fill="#fff" opacity="0.45" transform="rotate(-20 -${RADIUS * 0.3} -${RADIUS * 1.35})"/>
        <text x="0" y="-${RADIUS * 0.72}" text-anchor="middle" font-size="18" font-weight="800" font-family="ui-monospace, SFMono-Regular, Menlo, monospace" fill="#fff" fill-opacity="0.92">${LETTERS[i]}</text>`;
      svg.appendChild(g);
      bodies.push(g);
    });
    svg.appendChild(shredLayer);
    svg.appendChild(boomLayer);
    const centre = (b) => {
      const k = b.pts[LINKS];
      const j = b.pts[LINKS - 1];
      const dx = k.x - j.x;
      const dy = k.y - j.y;
      const d = Math.hypot(dx, dy) || 1;
      return {
        x: k.x + dx / d * RADIUS * b.scale,
        y: k.y + dy / d * RADIUS * b.scale,
        ux: dx / d,
        uy: dy / d
      };
    };
    const paint = (now2) => {
      s.balloons.forEach((b, i) => {
        let d = `M${b.pts[0].x},${b.pts[0].y}`;
        for (let k2 = 1; k2 < LINKS; k2++) {
          const p = b.pts[k2];
          const q = b.pts[k2 + 1];
          d += ` Q${p.x},${p.y} ${(p.x + q.x) / 2},${(p.y + q.y) / 2}`;
        }
        d += ` L${b.pts[LINKS].x},${b.pts[LINKS].y}`;
        strings[i].setAttribute("d", d);
        strings[i].style.display = b.cut ? "none" : "";
        const k = b.pts[LINKS];
        const c = centre(b);
        const angle = Math.atan2(c.uy, c.ux) * 180 / Math.PI + 90;
        const g = bodies[i];
        g.style.display = b.scale < 0.02 ? "none" : "";
        g.setAttribute("transform", `translate(${k.x},${k.y}) rotate(${angle}) scale(${b.scale})`);
      });
      shredLayer.innerHTML = s.shreds.map(
        (p) => `<rect x="-3" y="-2" width="6" height="4" rx="1" fill="${p.c}" opacity="${Math.min(1, p.life * 2)}" transform="translate(${p.x},${p.y}) rotate(${p.a})"/>`
      ).join("");
      boomLayer.innerHTML = s.booms.map((bm) => {
        const t = (now2 - bm.t) / 600;
        return `<text x="${bm.x}" y="${bm.y - t * 24}" text-anchor="middle" font-size="16" font-weight="900" font-family="ui-monospace, monospace" fill="currentColor" opacity="${1 - t}">POP!</text>`;
      }).join("");
    };
    const step2 = (dt, now2) => {
      const w = W();
      for (const b of s.balloons) {
        if (b.popped && now2 - b.poppedAt > REINFLATE_MS) {
          b.popped = false;
          b.cut = false;
          b.poppedAt = now2;
          b.scale = 0;
        }
        if (!b.popped && b.scale < 1) b.scale = Math.min(1, (now2 - b.poppedAt) / INFLATE_MS);
        const lift = b.popped ? 0 : LIFT * b.scale;
        b.sway += dt;
        const breeze = Math.sin(b.sway * 0.9) * 60 + Math.sin(b.sway * 2.3 + b.anchor * 9) * 25;
        b.pts.forEach((p, k) => {
          if (k === 0) return;
          const vx = (p.x - p.px) * DAMPING$2;
          const vy = (p.y - p.py) * DAMPING$2;
          p.px = p.x;
          p.py = p.y;
          let ax = 0;
          let ay = GRAVITY$2 * 0.15;
          if (k === LINKS) {
            ay = GRAVITY$2 - lift;
            ax = breeze;
            if (s.pointer && !b.popped) {
              const c = centre(b);
              const dx = c.x - s.pointer.x;
              const dy = c.y - s.pointer.y;
              const d = Math.hypot(dx, dy);
              if (d < BLOW_RADIUS && d > 1) {
                const f = (1 - d / BLOW_RADIUS) * BLOW_FORCE;
                ax += dx / d * f * 4;
                ay += dy / d * f * 4;
              }
            }
          }
          p.x += vx + ax * dt * dt;
          p.y += vy + ay * dt * dt;
        });
        const base = b.pts[0];
        base.x = base.px = b.anchor * w;
        base.y = base.py = HEIGHT;
      }
      for (let it = 0; it < ITERATIONS$2; it++) {
        for (const b of s.balloons) {
          const seg = b.len / LINKS;
          for (let k = 0; k < LINKS; k++) {
            const a = b.pts[k];
            const c = b.pts[k + 1];
            const dx = c.x - a.x;
            const dy = c.y - a.y;
            const d = Math.hypot(dx, dy) || 1e-6;
            const diff = (d - seg) / d;
            if (k === 0) {
              c.x -= dx * diff;
              c.y -= dy * diff;
            } else {
              a.x += dx * diff * 0.5;
              a.y += dy * diff * 0.5;
              c.x -= dx * diff * 0.5;
              c.y -= dy * diff * 0.5;
            }
          }
        }
        for (let i = 0; i < s.balloons.length; i++) {
          const A = s.balloons[i];
          if (A.popped) continue;
          for (let j = i + 1; j < s.balloons.length; j++) {
            const B = s.balloons[j];
            if (B.popped) continue;
            const ca = centre(A);
            const cb = centre(B);
            const dx = cb.x - ca.x;
            const dy = cb.y - ca.y;
            const d = Math.hypot(dx, dy) || 1e-6;
            const min = RADIUS * 1.75 * ((A.scale + B.scale) / 2);
            if (d < min) {
              const push = (min - d) / d * 0.5;
              A.pts[LINKS].x -= dx * push;
              A.pts[LINKS].y -= dy * push;
              B.pts[LINKS].x += dx * push;
              B.pts[LINKS].y += dy * push;
            }
          }
        }
        if (s.grab) {
          const b = s.balloons[s.grab.i];
          const k = b.pts[LINKS];
          const ax = anchorX(b);
          let tx = s.grab.x;
          let ty = s.grab.y + RADIUS;
          const dx = tx - ax;
          const dy = ty - HEIGHT;
          const d = Math.hypot(dx, dy);
          const max = b.len * 1.05;
          if (d > max) {
            tx = ax + dx / d * max;
            ty = HEIGHT + dy / d * max;
          }
          k.x = tx;
          k.y = ty;
        }
        for (const b of s.balloons) {
          const k = b.pts[LINKS];
          k.x = Math.max(RADIUS, Math.min(w - RADIUS, k.x));
          k.y = Math.max(RADIUS * 2.1, Math.min(HEIGHT, k.y));
        }
      }
      for (const p of s.shreds) {
        p.vy += GRAVITY$2 * dt;
        p.vx *= 0.98;
        p.x += p.vx * dt;
        p.y += p.vy * dt;
        p.a += p.va * dt;
        p.life -= dt;
      }
      s.shreds = s.shreds.filter((p) => p.life > 0 && p.y < HEIGHT + 40);
      s.booms = s.booms.filter((bm) => now2 - bm.t < 600);
    };
    let raf = 0;
    let last = performance.now();
    let visible = false;
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
    });
    io.observe(box);
    for (let i = 0; i < 90; i++) step2(1 / 60, 0);
    paint(0);
    if (reduce) return () => io.disconnect();
    const frame = (now2) => {
      raf = requestAnimationFrame(frame);
      const dt = Math.min(1 / 30, (now2 - last) / 1e3);
      last = now2;
      if (!visible || document.hidden) return;
      step2(dt, now2);
      paint(now2);
    };
    raf = requestAnimationFrame(frame);
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
    };
  }, []);
  reactExports.useEffect(() => {
    const on = () => {
      const start = performance.now();
      const kick = () => {
        for (const b of state.current.balloons) {
          const k = b.pts[LINKS];
          k.px = k.x - (Math.random() - 0.5) * 30;
          k.py = k.y - (Math.random() - 0.5) * 24;
        }
        if (performance.now() - start < 4e3) window.setTimeout(kick, 160);
      };
      kick();
    };
    window.addEventListener(PARTY_EVENT, on);
    return () => window.removeEventListener(PARTY_EVENT, on);
  }, []);
  const local = (e) => {
    const r = boxRef.current.getBoundingClientRect();
    return { x: e.clientX - r.left, y: e.clientY - r.top };
  };
  const pop = (i) => {
    const s = state.current;
    const b = s.balloons[i];
    const k = b.pts[LINKS];
    const cy = k.y - RADIUS;
    for (let n = 0; n < 16; n++) {
      const a = Math.random() * Math.PI * 2;
      const v = 150 + Math.random() * 260;
      s.shreds.push({
        x: k.x,
        y: cy,
        vx: Math.cos(a) * v,
        vy: Math.sin(a) * v - 120,
        a: Math.random() * 360,
        va: (Math.random() - 0.5) * 900,
        life: 0.9 + Math.random() * 0.5,
        c: COLORS$1[i % COLORS$1.length]
      });
    }
    s.booms.push({ x: k.x, y: cy - RADIUS, t: performance.now() });
    b.popped = true;
    b.poppedAt = performance.now();
    b.scale = 0;
    setPops((n) => n + 1);
  };
  const cut = (i) => {
    const s = state.current;
    const b = s.balloons[i];
    const box = boxRef.current;
    if (!b || b.popped || !box) return;
    const k = b.pts[LINKS];
    const r = box.getBoundingClientRect();
    b.popped = true;
    b.cut = true;
    cutSet.current.add(i);
    setFreed([...cutSet.current]);
    if (cutSet.current.size === LETTERS.length) {
      solveMystery("balloons");
    }
    b.poppedAt = performance.now();
    b.scale = 0;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    launch(r.left + window.scrollX + k.x, r.top + window.scrollY + k.y, i);
  };
  const onDown = (e) => {
    const target = e.target.closest("[data-balloon]");
    if (!target || e.button !== 0) return;
    const i = Number(target.getAttribute("data-balloon"));
    if (state.current.balloons[i]?.popped) return;
    e.currentTarget.setPointerCapture(e.pointerId);
    const p = local(e);
    state.current.grab = { i, x: p.x, y: p.y, sx: p.x, sy: p.y, moved: false };
  };
  const onMove = (e) => {
    const s = state.current;
    const p = local(e);
    s.pointer = e.pointerType === "mouse" ? p : null;
    const g = s.grab;
    if (!g) return;
    if (e.pointerType === "mouse" && e.buttons === 0) return onUp();
    g.x = p.x;
    g.y = p.y;
    if (Math.hypot(p.x - g.sx, p.y - g.sy) > DRAG_PX$1) g.moved = true;
  };
  const onUp = () => {
    const s = state.current;
    const g = s.grab;
    if (!g) return;
    s.grab = null;
    if (!g.moved) pop(g.i);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-10", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        ref: boxRef,
        onPointerDown: onDown,
        onPointerMove: onMove,
        onPointerUp: onUp,
        onPointerCancel: onUp,
        onLostPointerCapture: onUp,
        onPointerLeave: () => {
          state.current.pointer = null;
        },
        "data-cursor": "Pop",
        "data-party-zone": true,
        className: "relative w-full touch-pan-y select-none overflow-hidden rounded-xl border border-border bg-card/30 text-foreground",
        style: { height: HEIGHT },
        children: [
          backdrop,
          /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { ref: svgRef, "aria-hidden": true, className: "absolute inset-0 h-full w-full overflow-visible" }),
          freed.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pointer-events-none absolute right-2 top-2 rounded-md border border-border bg-background/80 px-2 py-1.5 font-mono text-[9px] backdrop-blur-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-1 uppercase tracking-widest text-muted-foreground", children: [
              "set free · ",
              freed.length,
              "/",
              LETTERS.length
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-0.5", children: LETTERS.map((l, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: `flex h-4 w-4 items-center justify-center rounded-sm font-bold ${freed.includes(i) ? "bg-emerald-500/80 text-black" : "bg-foreground/10 text-muted-foreground"}`,
                children: l
              },
              l
            )) })
          ] }),
          LETTERS.map((letter, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              "aria-label": `Cut balloon ${letter} loose`,
              "data-cursor": "Cut",
              onPointerEnter: (e) => e.pointerType === "mouse" && cut(i),
              onPointerDown: (e) => {
                e.stopPropagation();
                cut(i);
              },
              onClick: () => cut(i),
              className: "absolute bottom-0 flex h-6 w-6 -translate-x-1/2 items-center justify-center rounded-full border border-border bg-background/80 text-muted-foreground transition-colors hover:border-primary hover:text-primary",
              style: { left: `${(i + 0.5) / LETTERS.length * 100}%` },
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Scissors, { className: "h-3 w-3" })
            },
            letter
          ))
        ]
      }
    ),
    controls,
    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-2 flex flex-wrap justify-between gap-2 font-mono text-[10px] uppercase tracking-widest text-muted-foreground", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "At ICPC every solved problem earns a balloon · grab one, click to pop, or cut its string" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { "aria-live": "polite", children: pops > 0 ? `popped: ${pops}` : "" })
    ] })
  ] });
}
const FLY = { v0: 90, max: 560, accel: 170 };
function launch(x, y, i) {
  const color = COLORS$1[i % COLORS$1.length];
  const el = document.createElement("div");
  el.setAttribute("aria-hidden", "true");
  el.style.cssText = "position:absolute;left:0;top:0;z-index:30;pointer-events:none;will-change:transform,opacity";
  el.innerHTML = `
    <svg width="60" height="120" viewBox="-30 -60 60 120" style="overflow:visible">
      <path d="M0,4 C6,24 -6,40 2,58" fill="none" stroke="currentColor" stroke-opacity=".45" stroke-width="1.2"/>
      <path d="M0,-1 l-3.5,6 h7 z" fill="${color}"/>
      <ellipse cx="0" cy="-${RADIUS}" rx="${RADIUS * 0.86}" ry="${RADIUS}" fill="${color}"/>
      <ellipse cx="-${RADIUS * 0.3}" cy="-${RADIUS * 1.35}" rx="${RADIUS * 0.2}" ry="${RADIUS * 0.32}" fill="#fff" opacity=".45"/>
      <text x="0" y="-${RADIUS * 0.72}" text-anchor="middle" font-size="18" font-weight="800" font-family="ui-monospace, monospace" fill="#fff" fill-opacity=".92">${LETTERS[i]}</text>
    </svg>`;
  el.style.color = getComputedStyle(document.body).color;
  document.body.appendChild(el);
  const first = document.querySelector("main > section");
  const lost = first ? first.getBoundingClientRect().bottom + window.scrollY - 120 : 400;
  let v = FLY.v0;
  let t = 0;
  let fade = 1;
  let last = performance.now();
  const frame = (now2) => {
    const dt = Math.min(0.05, (now2 - last) / 1e3);
    last = now2;
    t += dt;
    v = Math.min(FLY.max, v + FLY.accel * dt);
    y -= v * dt;
    const sway = Math.sin(t * 1.6 + i) * 26;
    if (y < lost) fade -= dt * 0.9;
    el.style.opacity = String(Math.max(0, fade));
    el.style.transform = `translate(${x + sway - 30}px, ${y - 60}px) rotate(${Math.sin(t * 1.6 + i + 0.8) * 9}deg) scale(${0.6 + 0.4 * Math.max(0, fade)})`;
    if (fade > 0 && y > -200) requestAnimationFrame(frame);
    else el.remove();
  };
  requestAnimationFrame(frame);
}
function Beams({ y1, y2, reach }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("g", { opacity: "0.5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "path",
      {
        d: `M${reach} ${y1} L${reach + 50} ${y1 - 13} L${reach + 50} ${y1 + 5} Z`,
        fill: "#fde68a",
        opacity: "0.35"
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "path",
      {
        d: `M${reach} ${y2} L${reach + 50} ${y2 - 5} L${reach + 50} ${y2 + 13} Z`,
        fill: "#fde68a",
        opacity: "0.35"
      }
    )
  ] });
}
function Car({ lights }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { width: "52", height: "34", viewBox: "0 0 52 34", className: "overflow-visible", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("defs", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("linearGradient", { id: "v-car", x1: "0", y1: "0", x2: "1", y2: "1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "0", stopColor: "#22d3ee" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "1", stopColor: "#a855f7" })
    ] }) }),
    lights && /* @__PURE__ */ jsxRuntimeExports.jsx(Beams, { y1: 9, y2: 25, reach: 46 }),
    [
      [9, 1],
      [33, 1],
      [9, 27],
      [33, 27]
    ].map(([x, y]) => /* @__PURE__ */ jsxRuntimeExports.jsx("rect", { x, y, width: "10", height: "6", rx: "2", fill: "#0f172a" }, `${x}-${y}`)),
    /* @__PURE__ */ jsxRuntimeExports.jsx("rect", { x: "3", y: "4", width: "44", height: "26", rx: "11", fill: "url(#v-car)" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("rect", { x: "6", y: "7", width: "38", height: "5", rx: "2.5", fill: "#fff", opacity: "0.25" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("rect", { x: "15", y: "8", width: "20", height: "18", rx: "6", fill: "#0b1224", opacity: "0.85" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("rect", { x: "29", y: "10", width: "5", height: "14", rx: "2.5", fill: "#7dd3fc", opacity: "0.75" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("rect", { x: "16", y: "10", width: "4", height: "14", rx: "2", fill: "#7dd3fc", opacity: "0.4" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: "45", cy: "10", r: "2.4", fill: "#fef08a" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: "45", cy: "24", r: "2.4", fill: "#fef08a" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("rect", { x: "2.5", y: "8", width: "2", height: "5", rx: "1", fill: "#f43f5e" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("rect", { x: "2.5", y: "21", width: "2", height: "5", rx: "1", fill: "#f43f5e" })
  ] });
}
function Racer({ lights }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { width: "60", height: "30", viewBox: "0 0 60 30", className: "overflow-visible", children: [
    lights && /* @__PURE__ */ jsxRuntimeExports.jsx(Beams, { y1: 9, y2: 21, reach: 56 }),
    [
      [8, 0],
      [40, 0],
      [8, 24],
      [40, 24]
    ].map(([x, y]) => /* @__PURE__ */ jsxRuntimeExports.jsx("rect", { x, y, width: "12", height: "6", rx: "2", fill: "#0f172a" }, `${x}-${y}`)),
    /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M4 7 Q4 4 8 4 L44 5 Q58 9 58 15 Q58 21 44 25 L8 26 Q4 26 4 23 Z", fill: "#f43f5e" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("rect", { x: "10", y: "13.5", width: "44", height: "3", fill: "#fff", opacity: "0.85" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M22 8 L36 9 Q40 15 36 21 L22 22 Q19 15 22 8 Z", fill: "#0b1224", opacity: "0.9" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M33 10 Q36 15 33 20", stroke: "#7dd3fc", strokeWidth: "2", fill: "none", opacity: "0.8" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("rect", { x: "1", y: "3", width: "4", height: "24", rx: "1.5", fill: "#111827" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: "56", cy: "10", r: "1.8", fill: "#fef08a" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: "56", cy: "20", r: "1.8", fill: "#fef08a" })
  ] });
}
function Truck({ lights }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { width: "68", height: "48", viewBox: "0 0 68 48", className: "overflow-visible", children: [
    lights && /* @__PURE__ */ jsxRuntimeExports.jsx(Beams, { y1: 14, y2: 34, reach: 64 }),
    [
      [8, 0],
      [44, 0],
      [8, 38],
      [44, 38]
    ].map(([x, y]) => /* @__PURE__ */ jsxRuntimeExports.jsxs("g", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("rect", { x, y, width: "16", height: "10", rx: "3", fill: "#0f172a" }),
      [2, 6, 10].map((o) => /* @__PURE__ */ jsxRuntimeExports.jsx("rect", { x: x + o, y, width: "2", height: "10", fill: "#334155" }, o))
    ] }, `${x}-${y}`)),
    /* @__PURE__ */ jsxRuntimeExports.jsx("rect", { x: "2", y: "7", width: "64", height: "34", rx: "7", fill: "#fbbf24" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("rect", { x: "4", y: "10", width: "34", height: "28", rx: "3", fill: "#b45309", opacity: "0.55" }),
    [14, 22, 30].map((x) => /* @__PURE__ */ jsxRuntimeExports.jsx("rect", { x, y: "12", width: "2", height: "24", fill: "#78350f", opacity: "0.5" }, x)),
    /* @__PURE__ */ jsxRuntimeExports.jsx("rect", { x: "42", y: "11", width: "20", height: "26", rx: "4", fill: "#0b1224", opacity: "0.9" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("rect", { x: "56", y: "13", width: "4", height: "22", rx: "2", fill: "#7dd3fc", opacity: "0.75" }),
    [16, 22, 28, 34].map((y) => /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: "48", cy: y, r: "1.5", fill: "#fef08a" }, y)),
    /* @__PURE__ */ jsxRuntimeExports.jsx("rect", { x: "64", y: "12", width: "3", height: "24", rx: "1.5", fill: "#111827" })
  ] });
}
function Moto({ lights }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { width: "46", height: "20", viewBox: "0 0 46 20", className: "overflow-visible", children: [
    lights && /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M42 10 L92 -4 L92 24 Z", fill: "#fde68a", opacity: "0.18" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("rect", { x: "1", y: "7", width: "12", height: "6", rx: "3", fill: "#0f172a" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("rect", { x: "33", y: "7", width: "12", height: "6", rx: "3", fill: "#0f172a" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("rect", { x: "9", y: "6", width: "27", height: "8", rx: "4", fill: "#a855f7" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("rect", { x: "22", y: "1", width: "3", height: "18", rx: "1.5", fill: "#cbd5e1" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("ellipse", { cx: "17", cy: "10", rx: "7", ry: "6", fill: "#0b1224" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: "20", cy: "10", r: "4.2", fill: "#22d3ee" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("rect", { x: "21.5", y: "8", width: "2", height: "4", rx: "1", fill: "#0b1224", opacity: "0.7" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: "43", cy: "10", r: "1.8", fill: "#fef08a" })
  ] });
}
const SPRITES = {
  car: Car,
  racer: Racer,
  truck: Truck,
  moto: Moto
};
function VehicleSprite({ kind, lights }) {
  const S = SPRITES[kind];
  return /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "block drop-shadow-[0_6px_6px_rgba(0,0,0,0.45)]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(S, { lights }) });
}
const VEHICLE_EVENT = "vehicle";
const VEHICLE_KINDS = ["car", "racer", "truck", "moto"];
const VEHICLE_LABELS = {
  car: "Hatchback",
  racer: "Racer",
  truck: "Monster truck",
  moto: "Motorcycle"
};
const DEFAULT = { on: true, kind: "car" };
function parse$1(value) {
  if (typeof value !== "object" || value === null) return void 0;
  const raw = value;
  const kind = VEHICLE_KINDS.find((k) => k === raw.kind) ?? DEFAULT.kind;
  return { on: raw.on !== false, kind };
}
function readVehicle() {
  return readJson(STORAGE_KEYS.vehicle, parse$1) ?? { ...DEFAULT };
}
function setVehicle(patch) {
  const next = { ...readVehicle(), ...patch };
  writeJson(STORAGE_KEYS.vehicle, next);
  window.dispatchEvent(new CustomEvent(VEHICLE_EVENT, { detail: next }));
  return next;
}
function useVehicle() {
  const [state, setState] = reactExports.useState(DEFAULT);
  reactExports.useEffect(() => {
    setState(readVehicle());
    const onChange = (e) => setState(e.detail);
    window.addEventListener(VEHICLE_EVENT, onChange);
    return () => window.removeEventListener(VEHICLE_EVENT, onChange);
  }, []);
  return state;
}
const VEHICLE_DRIVING_EVENT = "vehicle-driving";
const VEHICLE_DRIVE_EVENT = "vehicle-drive";
const VEHICLE_REFUSE_EVENT = "vehicle-refuse";
let driving = false;
function isVehicleDriving() {
  return driving;
}
function setVehicleDriving(next) {
  if (driving === next) return;
  driving = next;
  window.dispatchEvent(new CustomEvent(VEHICLE_DRIVING_EVENT, { detail: next }));
}
function requestDrive() {
  window.dispatchEvent(new Event(VEHICLE_DRIVE_EVENT));
}
function refuseTerminal() {
  window.dispatchEvent(new Event(VEHICLE_REFUSE_EVENT));
}
function canDriveHere() {
  return window.matchMedia("(hover: hover) and (pointer: fine)").matches;
}
const SPECS = {
  car: { accel: 950, max: 580, steer: 3.4, radius: 17, power: 1, rebound: 0.35 },
  racer: { accel: 1450, max: 860, steer: 3, radius: 17, power: 1.35, rebound: 0.3 },
  truck: { accel: 650, max: 420, steer: 2.3, radius: 25, power: 3.2, rebound: 0.05 },
  moto: { accel: 1300, max: 760, steer: 4.8, radius: 12, power: 0.85, rebound: 0.45 }
};
const BRAKE = 1600;
const DRAG = 1.6;
const TURBO = 1.55;
const IDLE_SPEED = 38;
const IDLE_SCALE = 0.62;
const IDLE_LIFT = 118;
const IDLE_LEFT = 28;
const IDLE_SPAN = 200;
const PUSH = 0.14;
const SPIN = 0.09;
const SLIDE_FRICTION = 0.93;
const ASKED_KEY = "car-asked";
function alreadyAsked() {
  try {
    return sessionStorage.getItem(ASKED_KEY) === "1";
  } catch {
    return false;
  }
}
const CANDIDATES = "main h1, main h2, main h3, main h4, main p, main a, main button, main img, main li, main [class*='rounded-md'], main [class*='rounded-full']";
function PlayCar() {
  const vehicle = useVehicle();
  const carRef = reactExports.useRef(null);
  const bubbleRef = reactExports.useRef(null);
  const fxRef = reactExports.useRef(null);
  const [driving2, setDriving] = reactExports.useState(false);
  const [canDrive, setCanDrive] = reactExports.useState(false);
  const [allowed, setAllowed] = reactExports.useState(false);
  const [moved, setMoved] = reactExports.useState(0);
  const drivingRef = reactExports.useRef(false);
  const specRef = reactExports.useRef(SPECS.car);
  const resetRef = reactExports.useRef(() => {
  });
  const toPageRef = reactExports.useRef(() => {
  });
  const toViewportRef = reactExports.useRef(() => {
  });
  const nudgeRef = reactExports.useRef({ text: "", until: 0 });
  const [nudge, setNudge] = reactExports.useState(false);
  specRef.current = SPECS[vehicle.kind];
  const enabled = allowed && vehicle.on;
  reactExports.useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setAllowed(true);
    setCanDrive(canDriveHere());
  }, []);
  reactExports.useEffect(() => {
    if (!vehicle.on && drivingRef.current) {
      drivingRef.current = false;
      setDriving(false);
      setVehicleDriving(false);
    }
  }, [vehicle.on]);
  reactExports.useEffect(() => {
    if (!enabled) return;
    const car = carRef.current;
    const bubble = bubbleRef.current;
    const fxLayer = fxRef.current;
    const main = document.querySelector("main");
    const zone = () => {
      const x0 = IDLE_LEFT;
      return {
        x0,
        x1: Math.min(window.innerWidth - 40, x0 + IDLE_SPAN),
        y: window.innerHeight - IDLE_LIFT
      };
    };
    const z0 = zone();
    const s = {
      x: z0.x0 + 20,
      y: z0.y,
      a: 0,
      v: 0,
      steer: 0,
      bounce: 0,
      scale: IDLE_SCALE,
      dir: 1
    };
    let phase = "drive";
    let phaseUntil = 0;
    let nextAsk = performance.now() + 4e3;
    const keys = /* @__PURE__ */ new Set();
    let pushed = [];
    let lastScan = 0;
    let puffs = [];
    let rings = [];
    let shake = 0;
    let raf = 0;
    let last = performance.now();
    let movedCount = 0;
    let partyUntil = 0;
    let heardMusic = false;
    const say = (text) => {
      bubble.textContent = text ?? "";
      bubble.style.opacity = text ? "1" : "0";
    };
    const scan = () => {
      const keep = new Map(pushed.map((p) => [p.el, p]));
      const out = [];
      const chosen = /* @__PURE__ */ new Set();
      for (const el of document.querySelectorAll(CANDIDATES)) {
        if (el.closest("header, [role=dialog], .fixed, canvas, svg")) continue;
        let ancestor = el.parentElement;
        let nested = false;
        while (ancestor && !nested) {
          if (chosen.has(ancestor)) nested = true;
          ancestor = ancestor.parentElement;
        }
        if (nested) continue;
        const prev = keep.get(el);
        const r = el.getBoundingClientRect();
        const dx = prev?.dx ?? 0;
        const dy = prev?.dy ?? 0;
        const w = r.width;
        const h = r.height;
        if (w < 8 || h < 8 || w > window.innerWidth * 0.7 || h > 360) continue;
        chosen.add(el);
        out.push(
          prev ? { ...prev, x: r.left + window.scrollX - dx, y: r.top + window.scrollY - dy, w, h } : {
            el,
            x: r.left + window.scrollX,
            y: r.top + window.scrollY,
            w,
            h,
            m: Math.min(5, Math.max(0.5, w * h / 6e3)),
            dx: 0,
            dy: 0,
            vx: 0,
            vy: 0,
            rot: 0,
            vr: 0
          }
        );
      }
      pushed = out;
    };
    const puff = (x, y, c) => {
      puffs.push({ x, y, t: 0, s: 4 + Math.random() * 5, c });
      if (puffs.length > 90) puffs.shift();
    };
    const markMoved = (p) => {
      if (p.el.dataset.carMoved) return false;
      p.el.dataset.carMoved = "1";
      movedCount++;
      return true;
    };
    const collide = () => {
      const spec = specRef.current;
      const R = spec.radius;
      let any = false;
      for (const p of pushed) {
        const left = p.x + p.dx;
        const top = p.y + p.dy;
        if (Math.abs(top + p.h / 2 - s.y) > p.h / 2 + R + 40) continue;
        const cx = Math.max(left, Math.min(s.x, left + p.w));
        const cy = Math.max(top, Math.min(s.y, top + p.h));
        const ddx = s.x - cx;
        const ddy = s.y - cy;
        const d2 = ddx * ddx + ddy * ddy;
        if (d2 > R * R) continue;
        const d = Math.sqrt(d2) || 1;
        const nx = d2 > 0.01 ? ddx / d : -Math.cos(s.a);
        const ny = d2 > 0.01 ? ddy / d : -Math.sin(s.a);
        const speed = Math.abs(s.v);
        if (speed < 15) continue;
        const k = speed * PUSH * spec.power / p.m;
        p.vx -= nx * k;
        p.vy -= ny * k;
        p.vr += (Math.random() - 0.5) * speed * SPIN * spec.power / p.m;
        s.x += nx * (R - d + 1);
        s.y += ny * (R - d + 1);
        s.v *= spec.rebound ? -spec.rebound : 0.85;
        s.bounce = 1;
        any = markMoved(p) || any;
        for (let i = 0; i < 5; i++) puff(cx, cy);
        const force = speed * spec.power;
        if (force > 380) {
          rings.push({ x: cx, y: cy, t: 0, r: Math.min(140, force / 4) });
          shake = Math.min(1, shake + force / 900);
        }
      }
      if (any) setMoved(movedCount);
    };
    const cascade = () => {
      let any = false;
      for (const a of pushed) {
        const va = Math.hypot(a.vx, a.vy);
        if (va < 1.2) continue;
        const ax = a.x + a.dx;
        const ay = a.y + a.dy;
        for (const b of pushed) {
          if (b === a) continue;
          const bx = b.x + b.dx;
          const by = b.y + b.dy;
          if (ax > bx + b.w || ax + a.w < bx || ay > by + b.h || ay + a.h < by) continue;
          const share = a.m / (a.m + b.m) * 0.8;
          b.vx += a.vx * share;
          b.vy += a.vy * share;
          b.vr += (Math.random() - 0.5) * va * 0.3;
          a.vx *= 0.55;
          a.vy *= 0.55;
          any = markMoved(b) || any;
        }
      }
      if (any) setMoved(movedCount);
    };
    const slide = () => {
      for (const p of pushed) {
        if (!p.vx && !p.vy && !p.vr) continue;
        p.dx += p.vx;
        p.dy += p.vy;
        p.rot += p.vr;
        p.vx *= SLIDE_FRICTION;
        p.vy *= SLIDE_FRICTION;
        p.vr *= SLIDE_FRICTION;
        if (Math.abs(p.vx) < 0.02) p.vx = 0;
        if (Math.abs(p.vy) < 0.02) p.vy = 0;
        if (Math.abs(p.vr) < 0.01) p.vr = 0;
        p.el.style.translate = `${p.dx.toFixed(1)}px ${p.dy.toFixed(1)}px`;
        p.el.style.rotate = `${p.rot.toFixed(2)}deg`;
      }
    };
    resetRef.current = () => {
      for (const el of document.querySelectorAll("[data-car-moved]")) {
        el.style.translate = "";
        el.style.rotate = "";
        delete el.dataset.carMoved;
      }
      for (const p of pushed) Object.assign(p, { dx: 0, dy: 0, vx: 0, vy: 0, rot: 0, vr: 0 });
      movedCount = 0;
      setMoved(0);
    };
    toPageRef.current = () => {
      say(null);
      phase = "drive";
      s.x += window.scrollX;
      s.y += window.scrollY - 60;
      s.a = -Math.PI / 2;
      scan();
    };
    toViewportRef.current = () => {
      nudgeRef.current = { text: "", until: 0 };
      say(null);
      const z = zone();
      s.x = Math.max(z.x0, Math.min(z.x1, s.x - window.scrollX));
      s.y = z.y;
      s.v = 0;
      s.dir = 1;
      nextAsk = performance.now() + 5e3;
    };
    const onKey = (e) => {
      if (!drivingRef.current) return;
      const t = e.target;
      if (t?.closest("input, textarea, [contenteditable=true]")) return;
      const map = {
        arrowup: "up",
        w: "up",
        arrowdown: "down",
        s: "down",
        arrowleft: "left",
        a: "left",
        arrowright: "right",
        d: "right",
        " ": "brake",
        shift: "turbo"
      };
      const m = map[e.key.toLowerCase()];
      if (!m) return;
      e.preventDefault();
      if (e.type === "keydown") keys.add(m);
      else keys.delete(m);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("keyup", onKey);
    const clearKeys = () => keys.clear();
    window.addEventListener("blur", clearKeys);
    const frame = (now2) => {
      raf = requestAnimationFrame(frame);
      const dt = Math.min(0.033, (now2 - last) / 1e3);
      last = now2;
      const isDriving = drivingRef.current;
      const spec = specRef.current;
      if (isDriving) {
        if (now2 - lastScan > 1500) {
          lastScan = now2;
          scan();
        }
        const turbo = keys.has("turbo");
        const max = spec.max * (turbo ? TURBO : 1);
        const throttle = (keys.has("up") ? 1 : 0) - (keys.has("down") ? 1 : 0);
        if (throttle > 0) s.v += (s.v < 0 ? BRAKE : spec.accel * (turbo ? 1.5 : 1)) * dt;
        else if (throttle < 0) s.v -= (s.v > 0 ? BRAKE : spec.accel * 0.6) * dt;
        s.v -= s.v * DRAG * dt;
        if (keys.has("brake")) s.v -= s.v * 6 * dt;
        s.v = Math.max(-240, Math.min(max, s.v));
        const turn = (keys.has("right") ? 1 : 0) - (keys.has("left") ? 1 : 0);
        s.steer += (turn - s.steer) * Math.min(1, dt * 10);
        const grip = Math.min(1, Math.abs(s.v) / 140);
        s.a += s.steer * spec.steer * grip * Math.sign(s.v || 1) * dt;
        s.x += Math.cos(s.a) * s.v * dt;
        s.y += Math.sin(s.a) * s.v * dt;
        const R = spec.radius;
        const maxX = document.documentElement.scrollWidth - R;
        const maxY = document.documentElement.scrollHeight - R;
        if (s.x < R || s.x > maxX || s.y < R || s.y > maxY) {
          s.x = Math.max(R, Math.min(maxX, s.x));
          s.y = Math.max(R, Math.min(maxY, s.y));
          s.v *= -0.3;
          s.bounce = 1;
        }
        collide();
        cascade();
        slide();
        const zone2 = document.querySelector("[data-party-zone]");
        const zr = zone2?.getBoundingClientRect();
        if (!heardMusic && zr && zr.top < window.innerHeight && zr.bottom > 0) {
          heardMusic = true;
          if (!solvedMysteries().includes("carParty"))
            nudgeRef.current = { text: "♪ hear that? let's go!", until: now2 + 2500 };
        }
        if (now2 > partyUntil && Math.abs(s.v) > 150) {
          const r = zr;
          const vx = s.x - window.scrollX;
          const vy = s.y - window.scrollY;
          if (r && vx > r.left && vx < r.right && vy > r.top && vy < r.bottom) {
            partyUntil = now2 + 6e3;
            window.dispatchEvent(new Event(PARTY_EVENT));
            solveMystery("carParty");
          }
        }
        const sy = s.y - window.scrollY;
        const vh = window.innerHeight;
        const lo = vh * 0.3;
        const hi = vh * 0.65;
        if (sy < lo || sy > hi) {
          window.scrollTo({
            top: window.scrollY + (sy < lo ? sy - lo : sy - hi) * 0.18,
            behavior: "instant"
          });
        }
        const back = { x: s.x - Math.cos(s.a) * R * 1.1, y: s.y - Math.sin(s.a) * R * 1.1 };
        if (turbo && throttle > 0) {
          for (let i = 0; i < 2; i++) puff(back.x, back.y, i ? "#f59e0b" : "#22d3ee");
        } else if (throttle !== 0 && Math.abs(s.v) < 260 || Math.abs(s.steer) > 0.6 && Math.abs(s.v) > 220) {
          if (Math.random() < 0.5) puff(back.x, back.y);
        }
        s.scale += (1 - s.scale) * Math.min(1, dt * 8);
      } else {
        const z = zone();
        s.y = z.y;
        s.scale += (IDLE_SCALE - s.scale) * Math.min(1, dt * 8);
        if (canDrive && phase === "drive" && now2 > nextAsk && !alreadyAsked()) {
          try {
            sessionStorage.setItem(ASKED_KEY, "1");
          } catch {
          }
          phase = "ask1";
          phaseUntil = now2 + 1700;
          say("want play!");
        } else if (phase === "ask1" && now2 > phaseUntil) {
          phase = "ask2";
          phaseUntil = now2 + 2400;
          say("click on me");
        } else if (phase === "ask2" && now2 > phaseUntil) {
          phase = "drive";
          say(null);
        }
        const want = phase === "drive" ? IDLE_SPEED : 0;
        s.v += (want - s.v) * Math.min(1, dt * 3);
        if (s.x > z.x1) s.dir = -1;
        if (s.x < z.x0) s.dir = 1;
        const heading = s.dir === 1 ? 0 : Math.PI;
        let diff = heading - s.a;
        diff = Math.atan2(Math.sin(diff), Math.cos(diff));
        s.a += diff * Math.min(1, dt * 5);
        s.x += Math.cos(s.a) * s.v * dt;
        if (phase === "drive" && Math.random() < 0.02) puff(s.x - Math.cos(s.a) * 12, s.y + 2);
        if (phase !== "drive") s.bounce = Math.max(s.bounce, Math.abs(Math.sin(now2 / 160)) * 0.4);
      }
      s.bounce *= Math.exp(-dt * 6);
      const ox = isDriving ? window.scrollX : 0;
      const oy = isDriving ? window.scrollY : 0;
      const wobble = Math.sin(now2 / 90) * (0.6 + Math.min(1, Math.abs(s.v) / 300)) + s.bounce * Math.sin(now2 / 30) * 4;
      car.style.transform = `translate(${s.x - ox}px, ${s.y - oy}px) rotate(${s.a}rad)`;
      const body = car.firstElementChild;
      if (body)
        body.style.transform = `translate(-50%, -50%) scale(${s.scale * (1 + s.bounce * 0.12)}, ${s.scale * (1 - s.bounce * 0.08)}) rotate(${wobble * 0.6}deg)`;
      const half = bubble.offsetWidth / 2 + 8;
      const bx = Math.max(half, Math.min(window.innerWidth - half, s.x - ox));
      bubble.style.transform = `translate(${bx}px, ${s.y - oy - 18}px) translate(-50%, -100%)`;
      if (isDriving) say(now2 < nudgeRef.current.until ? nudgeRef.current.text : null);
      shake *= Math.exp(-dt * 7);
      if (main) {
        main.style.translate = shake > 0.02 ? `${((Math.random() - 0.5) * shake * 14).toFixed(1)}px ${((Math.random() - 0.5) * shake * 10).toFixed(1)}px` : "";
      }
      puffs = puffs.filter((p) => (p.t += dt) < 0.7);
      rings = rings.filter((r) => (r.t += dt) < 0.5);
      fxLayer.innerHTML = puffs.map((p) => {
        const k = p.t / 0.7;
        return `<span style="position:absolute;left:0;top:0;width:${p.s}px;height:${p.s}px;border-radius:999px;background:${p.c ?? "currentColor"};opacity:${(1 - k) * (p.c ? 0.7 : 0.35)};transform:translate(${p.x - ox - p.s / 2}px,${p.y - oy - p.s / 2 - k * 10}px) scale(${1 + k * 1.5})"></span>`;
      }).join("") + rings.map((r) => {
        const k = r.t / 0.5;
        const size = r.r * 2 * (0.2 + k);
        return `<span style="position:absolute;left:0;top:0;width:${size}px;height:${size}px;border-radius:999px;border:2px solid #22d3ee;opacity:${1 - k};transform:translate(${r.x - ox - size / 2}px,${r.y - oy - size / 2}px)"></span>`;
      }).join("");
    };
    raf = requestAnimationFrame(frame);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("keyup", onKey);
      window.removeEventListener("blur", clearKeys);
      if (main) main.style.translate = "";
    };
  }, [enabled, canDrive]);
  const start = () => {
    if (!canDrive || drivingRef.current) return;
    toPageRef.current();
    drivingRef.current = true;
    setDriving(true);
    setVehicleDriving(true);
  };
  const stop = () => {
    drivingRef.current = false;
    resetRef.current();
    toViewportRef.current();
    setDriving(false);
    setVehicleDriving(false);
  };
  const startRef = reactExports.useRef(start);
  startRef.current = start;
  reactExports.useEffect(() => {
    if (!enabled) return;
    const onDrive = () => startRef.current();
    let timer = 0;
    const onRefuse = () => {
      nudgeRef.current = { text: "stop driving first!", until: performance.now() + 2200 };
      setNudge(true);
      window.clearTimeout(timer);
      timer = window.setTimeout(() => setNudge(false), 2200);
    };
    window.addEventListener(VEHICLE_DRIVE_EVENT, onDrive);
    window.addEventListener(VEHICLE_REFUSE_EVENT, onRefuse);
    return () => {
      window.removeEventListener(VEHICLE_DRIVE_EVENT, onDrive);
      window.removeEventListener(VEHICLE_REFUSE_EVENT, onRefuse);
      window.clearTimeout(timer);
    };
  }, [enabled]);
  if (!enabled) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        ref: fxRef,
        "aria-hidden": true,
        className: "pointer-events-none fixed inset-0 z-40 text-muted-foreground"
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        ref: bubbleRef,
        "aria-hidden": true,
        className: "pointer-events-none fixed left-0 top-0 z-50 whitespace-nowrap rounded-full border border-primary/50 bg-background/90 px-2.5 py-1 font-mono text-[11px] font-semibold text-primary shadow-lg transition-opacity duration-300",
        style: { opacity: 0, transform: "translate(-200px, -200px)" }
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        ref: carRef,
        className: "fixed left-0 top-0 z-40",
        style: { transform: "translate(-200px, -200px)" },
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: start,
            "data-cursor": driving2 ? void 0 : canDrive ? "Drive" : void 0,
            "aria-label": canDrive ? `Drive the ${VEHICLE_LABELS[vehicle.kind].toLowerCase()}` : "A little car",
            className: `block transition-opacity duration-300 ${driving2 ? "cursor-default opacity-100" : canDrive ? "cursor-pointer opacity-50 hover:opacity-100" : "pointer-events-none opacity-40"}`,
            style: { transform: "translate(-50%, -50%)" },
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(VehicleSprite, { kind: vehicle.kind, lights: driving2 })
          }
        )
      }
    ),
    driving2 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "fixed left-1/2 top-20 z-50 flex max-w-[calc(100vw-2rem)] -translate-x-1/2 flex-wrap items-center justify-center gap-2 rounded-2xl border border-border bg-background/85 px-3 py-2 font-mono text-[11px] shadow-lg backdrop-blur-md", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex overflow-hidden rounded-full border border-border", children: VEHICLE_KINDS.map((k) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          onClick: () => setVehicle({ kind: k }),
          className: `px-2.5 py-1 ${vehicle.kind === k ? "bg-primary text-primary-foreground" : "hover:text-primary"}`,
          children: VEHICLE_LABELS[k]
        },
        k
      )) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground", children: [
        "↑↓←→ / WASD · shift turbo · space brake",
        moved > 0 ? ` · ${moved} knocked over` : ""
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          type: "button",
          onClick: stop,
          className: `inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 hover:border-primary/60 hover:text-primary ${nudge ? "animate-pulse border-amber-400 text-amber-300" : "border-border"}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Square, { className: "h-3 w-3" }),
            " Stop driving"
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          type: "button",
          onClick: () => resetRef.current(),
          className: "inline-flex items-center gap-1.5 rounded-full bg-primary px-2.5 py-1 font-semibold text-primary-foreground hover:opacity-90",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(RotateCcw, { className: "h-3 w-3" }),
            " Reset website"
          ]
        }
      )
    ] })
  ] });
}
const SEEN_KEY = "preloader-seen";
const COUNT_MS = 1400;
function alreadySeen() {
  try {
    return window.sessionStorage.getItem(SEEN_KEY) === "1";
  } catch {
    return false;
  }
}
function Preloader() {
  const [show] = reactExports.useState(
    () => !alreadySeen() && !window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
  const [count, setCount] = reactExports.useState(0);
  const [phase, setPhase] = reactExports.useState(show ? "count" : "done");
  reactExports.useEffect(() => {
    if (!show) return;
    try {
      window.sessionStorage.setItem(SEEN_KEY, "1");
    } catch {
    }
    const start = performance.now();
    let raf = 0;
    const tick = (now2) => {
      const t = Math.min(1, (now2 - start) / COUNT_MS);
      setCount(Math.round((1 - Math.pow(1 - t, 3)) * 100));
      if (t < 1) raf = requestAnimationFrame(tick);
      else {
        setPhase("open");
        window.setTimeout(() => setPhase("done"), 1e3);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [show]);
  if (phase === "done") return null;
  const open = phase === "open";
  const half = "absolute inset-x-0 h-1/2 bg-background transition-transform duration-[900ms] ease-[cubic-bezier(.76,0,.24,1)]";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { "aria-hidden": true, className: "dark fixed inset-0 z-[100] text-foreground", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `${half} top-0`, style: { transform: open ? "translateY(-100%)" : "none" } }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: `${half} bottom-0`,
        style: { transform: open ? "translateY(100%)" : "none" }
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "absolute inset-0 flex flex-col items-center justify-center gap-4 px-6 transition-opacity duration-300",
        style: { opacity: open ? 0 : 1 },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "preloader-rise text-3xl font-bold tracking-tight sm:text-5xl glow-text", children: profile.name }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-px w-48 overflow-hidden bg-border", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "h-full bg-gradient-to-r from-primary to-accent",
              style: { width: `${count}%` }
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "font-mono text-xs tabular-nums text-muted-foreground", children: [
            String(count).padStart(3, "0"),
            "%"
          ] })
        ]
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
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, size: "sm", variant: "outline", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: `mailto:${profile.email}`, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hidden sm:inline", children: "Get in touch" })
      ] }) }) })
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
const ROBOT_W = 34;
const ROBOT_H = 42;
const EYE = {
  alice: "var(--color-primary)",
  bob: "var(--color-accent)"
};
const POSE_CLASS = {
  stand: "",
  walk: "robot-walking",
  push: "robot-walking robot-pushing",
  kick: "robot-kicking",
  flail: "robot-flailing",
  hit: "robot-hit"
};
function RobotSprite({
  name,
  pose,
  dead = false,
  back = false
}) {
  const eye = dead ? "var(--color-muted-foreground)" : EYE[name];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "svg",
    {
      width: ROBOT_W,
      height: ROBOT_H,
      viewBox: "0 0 34 42",
      fill: "none",
      className: POSE_CLASS[pose],
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("line", { x1: "17", y1: "11", x2: "17", y2: "6", stroke: "var(--color-border)", strokeWidth: "1.2" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "circle",
          {
            cx: "17",
            cy: "4.4",
            r: "2.1",
            fill: eye,
            className: dead ? void 0 : "robot-antenna",
            style: dead ? { opacity: 0.4 } : { filter: `drop-shadow(0 0 4px ${eye})` }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "rect",
          {
            x: "12",
            y: "33",
            width: "3",
            height: "7",
            rx: "1.5",
            fill: "var(--color-muted-foreground)",
            className: "robot-limb robot-limb-a robot-leg-front"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "rect",
          {
            x: "19",
            y: "33",
            width: "3",
            height: "7",
            rx: "1.5",
            fill: "var(--color-muted-foreground)",
            className: "robot-limb robot-limb-b"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "rect",
          {
            x: "6.5",
            y: "25",
            width: "2.6",
            height: "7",
            rx: "1.3",
            fill: "var(--color-muted-foreground)",
            className: "robot-limb robot-limb-b robot-arm"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "rect",
          {
            x: "24.9",
            y: "25",
            width: "2.6",
            height: "7",
            rx: "1.3",
            fill: "var(--color-muted-foreground)",
            className: "robot-limb robot-limb-a robot-arm"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "rect",
          {
            x: "9.5",
            y: "24",
            width: "15",
            height: "10",
            rx: "3.4",
            fill: "var(--color-card)",
            stroke: "var(--color-border)"
          }
        ),
        back ? /* @__PURE__ */ jsxRuntimeExports.jsx("rect", { x: "13", y: "26", width: "8", height: "6", rx: "1.2", fill: "var(--color-border)" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: "17", cy: "29", r: "1.3", fill: eye, opacity: "0.9" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "rect",
          {
            x: "6",
            y: "10.5",
            width: "22",
            height: "14",
            rx: "5",
            fill: "var(--color-card)",
            stroke: "var(--color-border)"
          }
        ),
        back ? /* @__PURE__ */ jsxRuntimeExports.jsx(
          "path",
          {
            d: "M11 15h12M11 17.7h12M11 20.4h12",
            stroke: "var(--color-border)",
            strokeWidth: "1",
            strokeLinecap: "round"
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsx("rect", { x: "9", y: "14.5", width: "16", height: "6.5", rx: "3.2", fill: "#0a0e1c" }),
        back ? null : dead ? /* @__PURE__ */ jsxRuntimeExports.jsx(
          "path",
          {
            d: "M12.2 16.3l2.8 2.8m0-2.8l-2.8 2.8M19 16.3l2.8 2.8m0-2.8L19 19.1",
            stroke: "#ef4444",
            strokeWidth: "1.2",
            strokeLinecap: "round"
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: "13.6", cy: "17.7", r: "1.6", fill: eye, className: "robot-eye" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: "20.4", cy: "17.7", r: "1.6", fill: eye, className: "robot-eye" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("ellipse", { cx: "17", cy: "41", rx: "9", ry: "1.4", fill: eye, opacity: "0.12" })
      ]
    }
  );
}
function Akm({ flash }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { width: "30", height: "12", viewBox: "0 0 30 12", fill: "none", className: "overflow-visible", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M0 3.2l6.5-.6v3.4L1 7.6z", fill: "#8b5a2b" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("rect", { x: "6", y: "2.4", width: "9", height: "3.6", rx: ".6", fill: "#3b4150" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M8 5.8h1.8l-.6 3.4H7.6z", fill: "#2b303b" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M11.4 5.8h2.4c.2 2 .9 3.6 2 5l-2 .9c-1.2-1.6-2-3.6-2.4-5.9z", fill: "#2b303b" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("rect", { x: "15", y: "2.9", width: "6", height: "2.6", rx: ".8", fill: "#9a6530" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("rect", { x: "15", y: "1.7", width: "7", height: "1", rx: ".5", fill: "#3b4150" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("rect", { x: "21", y: "3.4", width: "7", height: "1.2", rx: ".4", fill: "#3b4150" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("rect", { x: "25.6", y: "1.4", width: ".9", height: "2.2", fill: "#3b4150" }),
    flash && /* @__PURE__ */ jsxRuntimeExports.jsx(
      "path",
      {
        d: "M28 4l4-3-1.2 3 3.4-.2-3.4 1.4 2.4 2.6-3.6-1.8z",
        fill: "#fde047",
        style: { filter: "drop-shadow(0 0 4px #f59e0b)" }
      }
    )
  ] });
}
const ROBOTS_EVENT = "robots";
const ROBOT_NAMES = ["alice", "bob"];
const BOTH_ON = { alice: true, bob: true };
function parse(value) {
  if (typeof value !== "object" || value === null) return void 0;
  const raw = value;
  return {
    alice: raw.alice !== false,
    bob: raw.bob !== false
  };
}
function readRobots() {
  return readJson(STORAGE_KEYS.robots, parse) ?? { ...BOTH_ON };
}
function setRobots(which, on) {
  const next = which === "both" ? { alice: on, bob: on } : { ...readRobots(), [which]: on };
  writeJson(STORAGE_KEYS.robots, next);
  window.dispatchEvent(new CustomEvent(ROBOTS_EVENT, { detail: next }));
  return next;
}
function useRobots() {
  const [switches, setSwitches] = reactExports.useState(BOTH_ON);
  reactExports.useEffect(() => {
    setSwitches(readRobots());
    const onChange = (e) => setSwitches(e.detail);
    window.addEventListener(ROBOTS_EVENT, onChange);
    return () => window.removeEventListener(ROBOTS_EVENT, onChange);
  }, []);
  return switches;
}
const SPEED = { wander: 28, fetch: 58, push: 34, ball: 330, stalk: 150 };
const PAUSE_MS = [2200, 6e3];
const LINE_PX = 44;
const FLOOR_PX = 4;
const BALL_PX = 11;
const EDGE_PX = 18;
const STRIP_PX = LINE_PX + ROBOT_H + 56;
const STANDOFF_PX = 150;
const BURST = 7;
const SHOT_GAP_MS = 95;
const ROUND_MS = 110;
const MUZZLE_Y = 17;
const rand$1 = (min, max) => min + Math.random() * (max - min);
const other = (name) => name === "alice" ? "bob" : "alice";
const mover = (x) => ({
  x,
  facing: 1,
  pose: "stand",
  ms: 0,
  grounded: false,
  fallen: false,
  hidden: false,
  dead: false,
  back: false,
  gun: "none",
  flash: false,
  say: null,
  hits: 0
});
function RobotWorld({ walkway }) {
  const robots = useRobots();
  const world = reactExports.useRef({
    alice: mover(0),
    bob: mover(0),
    ball: { x: 0, ms: 0, hops: 0, visible: false },
    dying: null,
    shots: []
  });
  const [, paint] = reactExports.useReducer((n) => n + 1, 0);
  const ready = reactExports.useRef(false);
  const before = reactExports.useRef(null);
  const live = ROBOT_NAMES.filter((n) => robots[n] || world.current.dying === n);
  reactExports.useEffect(() => {
    const running = ROBOT_NAMES.filter((n) => robots[n]);
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const prev = before.current;
    before.current = robots;
    const victim = ready.current && prev && prev.alice && prev.bob && running.length === 1 ? other(running[0]) : null;
    world.current.dying = victim;
    world.current.shots = [];
    for (const n of ROBOT_NAMES) {
      const r = world.current[n];
      world.current[n] = { ...r, gun: "none", flash: false, say: null, back: false };
      if (robots[n] && r.dead)
        world.current[n] = { ...world.current[n], dead: false, fallen: false, hidden: false };
    }
    if (!ready.current) {
      const w = window.innerWidth;
      world.current.alice.x = w * 0.28;
      world.current.bob.x = w * 0.68;
      world.current.ball.x = w * 0.28 + ROBOT_W + 6;
      if (!walkway) for (const n of ROBOT_NAMES) world.current[n].grounded = true;
      ready.current = true;
      paint();
    }
    let cancelled = false;
    let shotId = 0;
    const timers = [];
    const sleep = (ms) => new Promise((resolve) => {
      timers.push(window.setTimeout(resolve, Math.max(0, ms)));
    });
    const set = (edit) => {
      if (cancelled) return;
      edit(world.current);
      paint();
    };
    const span = () => ({
      min: EDGE_PX,
      max: Math.max(EDGE_PX + 40, window.innerWidth - ROBOT_W - EDGE_PX)
    });
    const home = (name) => {
      const { min, max } = span();
      return name === "alice" ? min + (max - min) * 0.22 : min + (max - min) * 0.78;
    };
    const walk = async (name, to, speed, pose = "walk") => {
      const from = world.current[name].x;
      const ms = Math.abs(to - from) / speed * 1e3;
      set((w) => {
        w[name] = { ...w[name], x: to, ms, pose, facing: to >= from ? 1 : -1 };
      });
      await sleep(ms + 40);
      set((w) => {
        w[name] = { ...w[name], pose: "stand" };
      });
    };
    const pushBall = async (name, to) => {
      const w0 = world.current;
      const from = w0[name].x;
      const gap = w0.ball.x - from;
      const ms = Math.abs(to - from) / SPEED.push * 1e3;
      set((w) => {
        w[name] = { ...w[name], x: to, ms, pose: "push", facing: to >= from ? 1 : -1 };
        w.ball = { ...w.ball, x: to + gap, ms, hops: 0 };
      });
      await sleep(ms + 40);
      set((w) => {
        w[name] = { ...w[name], pose: "stand" };
      });
    };
    const kick = async (name) => {
      const { min, max } = span();
      const from = world.current.ball.x;
      const mid = (min + max) / 2;
      const target = name === "alice" ? rand$1(mid, max - BALL_PX) : rand$1(min, mid);
      const distance = Math.abs(target - from);
      const ms = distance / SPEED.ball * 1e3;
      set((w) => {
        w[name] = { ...w[name], pose: "kick", facing: target >= from ? 1 : -1 };
      });
      await sleep(180);
      set((w) => {
        w.ball = { ...w.ball, x: target, ms, hops: Math.max(1, Math.round(distance / 150)) };
      });
      await sleep(ms + 60);
      set((w) => {
        w[name] = { ...w[name], pose: "stand" };
        w.ball = { ...w.ball, hops: 0 };
      });
      return target;
    };
    const wander = async (name) => {
      while (!cancelled) {
        const { min, max } = span();
        await walk(name, rand$1(min, max), SPEED.wander);
        await sleep(rand$1(...PAUSE_MS));
      }
    };
    const fallOver = async () => {
      set((w) => {
        w.ball = { ...w.ball, visible: false, hops: 0 };
        for (const n of ROBOT_NAMES) w[n] = { ...w[n], pose: "flail", ms: 0 };
      });
      await sleep(700);
      set((w) => {
        for (const n of ROBOT_NAMES)
          w[n] = { ...w[n], pose: "stand", fallen: true, grounded: true };
      });
      await sleep(950);
      set((w) => {
        for (const n of ROBOT_NAMES) w[n] = { ...w[n], hidden: true };
      });
      await sleep(500);
      const { min, max } = span();
      set((w) => {
        for (const n of ROBOT_NAMES) {
          w[n] = {
            ...w[n],
            x: rand$1(min, max),
            ms: 0,
            fallen: false,
            hidden: false,
            grounded: true
          };
        }
      });
      await sleep(400);
    };
    const face = (from, to) => world.current[to].x >= world.current[from].x ? 1 : -1;
    const say = (name, text) => set((w) => {
      w[name].say = text;
    });
    const execute = async (victim2, shooter) => {
      set((w) => {
        w.ball = { ...w.ball, visible: false, hops: 0 };
        for (const n of ROBOT_NAMES) w[n] = { ...w[n], ms: 0, pose: "stand", fallen: false };
      });
      await sleep(300);
      const { min, max } = span();
      const vx = world.current[victim2].x;
      const left = world.current[shooter].x <= vx;
      let spot = left ? vx - STANDOFF_PX : vx + STANDOFF_PX;
      if (spot < min || spot > max) spot = left ? vx + STANDOFF_PX : vx - STANDOFF_PX;
      await walk(shooter, Math.max(min, Math.min(max, spot)), SPEED.stalk);
      set((w) => {
        w[shooter].facing = face(shooter, victim2);
        w[victim2].facing = face(victim2, shooter);
      });
      await sleep(500);
      say(victim2, "?");
      await sleep(900);
      say(victim2, null);
      say(shooter, "…");
      await sleep(1100);
      say(shooter, null);
      const away = -face(victim2, shooter);
      set((w) => {
        w[victim2].back = true;
      });
      say(victim2, "♪");
      const stroll = Math.max(min, Math.min(max, world.current[victim2].x + away * 50));
      await walk(victim2, stroll, SPEED.wander);
      set((w) => {
        w[victim2].facing = away;
      });
      await sleep(600);
      set((w) => {
        w[shooter].facing = face(shooter, victim2);
        w[shooter].gun = "low";
      });
      await sleep(450);
      set((w) => {
        w[shooter].gun = "aim";
      });
      await sleep(380);
      say(victim2, null);
      say(shooter, "RATATAT");
      for (let i = 0; i < BURST; i++) {
        const s = world.current[shooter];
        const v = world.current[victim2];
        const id = ++shotId;
        const shot = {
          id,
          x: s.x + (s.facing === 1 ? ROBOT_W + 22 : -22),
          to: v.x + ROBOT_W / 2 + rand$1(-4, 4),
          bottom: (s.grounded ? FLOOR_PX : LINE_PX) + MUZZLE_Y,
          ms: 0
        };
        set((w) => {
          w[shooter].flash = true;
          w.shots = [...w.shots, shot];
        });
        await sleep(30);
        set((w) => {
          w[shooter].flash = false;
          w.shots = w.shots.map((t) => t.id === id ? { ...t, x: t.to, ms: ROUND_MS } : t);
        });
        timers.push(
          window.setTimeout(
            () => set((w) => {
              w.shots = w.shots.filter((t) => t.id !== id);
              w[victim2] = { ...w[victim2], pose: "hit", hits: w[victim2].hits + 1 };
            }),
            ROUND_MS
          )
        );
        await sleep(SHOT_GAP_MS - 30);
      }
      await sleep(ROUND_MS + 150);
      set((w) => {
        w[shooter].say = null;
        w[victim2] = { ...w[victim2], pose: "stand", dead: true, fallen: true, back: false };
      });
      await sleep(700);
      set((w) => {
        w[shooter].gun = "low";
      });
      say(shooter, "gg");
      await sleep(1400);
      say(shooter, null);
      set((w) => {
        w[shooter].gun = "none";
      });
      await sleep(400);
      set((w) => {
        w[victim2].hidden = true;
      });
      await sleep(600);
      set((w) => {
        w.dying = null;
      });
    };
    async function routine() {
      if (victim) {
        await execute(victim, other(victim));
        if (cancelled) return;
      }
      if (!walkway) {
        if (running.some((n) => !world.current[n].grounded)) await fallOver();
        await Promise.all(running.map(wander));
        return;
      }
      set((w) => {
        for (const n of ROBOT_NAMES) w[n] = { ...w[n], grounded: false, fallen: false };
      });
      await sleep(540);
      await Promise.all(running.map((n) => walk(n, home(n), SPEED.wander)));
      if (running.length < 2) {
        await Promise.all(running.map(wander));
        return;
      }
      set((w) => {
        w.ball = { ...w.ball, x: w.alice.x + ROBOT_W + 4, ms: 0, visible: true };
      });
      await sleep(600);
      let striker = "alice";
      while (!cancelled) {
        const landed = await kick(striker);
        const fetcher = other(striker);
        const goingLeft = home(fetcher) < landed;
        await walk(fetcher, goingLeft ? landed + 10 : landed - ROBOT_W + 2, SPEED.fetch);
        await sleep(300);
        await pushBall(fetcher, home(fetcher));
        await sleep(700);
        striker = fetcher;
      }
    }
    routine();
    return () => {
      cancelled = true;
      for (const t of timers) window.clearTimeout(t);
    };
  }, [walkway, robots]);
  const pokes = reactExports.useRef({ alice: 0, bob: 0, argued: false });
  const poke = (name) => {
    const p = pokes.current;
    p[name]++;
    const say = (who, text) => {
      world.current[who] = { ...world.current[who], say: text };
      paint();
    };
    if (!p.argued && p.alice >= 3 && p.bob >= 3) {
      p.argued = true;
      const lines2 = [
        ["alice", "tabs."],
        ["bob", "spaces."],
        ["alice", "TABS."],
        ["bob", "4 spaces!"],
        ["alice", "…we're done."]
      ];
      lines2.forEach(([who, text], i) => {
        window.setTimeout(() => {
          say(other(who), null);
          say(who, text);
        }, i * 1300);
      });
      window.setTimeout(() => {
        say("alice", null);
        say("bob", null);
        solveMystery("robots");
      }, lines2.length * 1300);
      return;
    }
    const replies = {
      alice: ["hi!", "hey", "ask Bob about tabs. go on.", "…", ":|"],
      bob: ["beep?", "hello", "Alice is wrong about tabs.", "…", ":|"]
    };
    const lines = replies[name];
    say(name, lines[Math.min(p[name] - 1, lines.length - 1)]);
    window.setTimeout(() => say(name, null), 1300);
  };
  if (!ready.current) return null;
  const { ball } = world.current;
  return (
    // A strip pinned to the bottom edge, exactly like the bar it walks on. A
    // full-viewport layer (inset-0) drifts off the bar on mobile, where the
    // viewport height changes as the browser toolbar hides and shows on scroll.
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        "aria-hidden": true,
        className: "pointer-events-none fixed inset-x-0 bottom-0 z-20 overflow-hidden",
        style: { height: STRIP_PX },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "absolute left-0 right-0 origin-center transition-all duration-700 ease-out",
              style: {
                bottom: LINE_PX,
                height: 1,
                background: "linear-gradient(to right, transparent, color-mix(in oklab, var(--color-primary) 45%, transparent), transparent)",
                boxShadow: walkway ? "0 0 12px -2px var(--color-primary)" : "none",
                transform: walkway ? "scaleX(1)" : "scaleX(0)",
                opacity: walkway ? 1 : 0
              }
            }
          ),
          live.map((name) => {
            const r = world.current[name];
            return /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                onClick: () => poke(name),
                "data-cursor": "Poke",
                title: name === "alice" ? "Alice · keeps the site's robots.txt tidy" : "Bob · also reads robots.txt, every morning",
                className: "pointer-events-auto absolute left-0 cursor-pointer will-change-transform",
                style: {
                  bottom: r.grounded ? FLOOR_PX : LINE_PX,
                  transform: `translateX(${r.x}px)`,
                  transitionProperty: "transform, bottom, opacity",
                  transitionDuration: `${r.ms}ms, 520ms, 400ms`,
                  transitionTimingFunction: "linear, cubic-bezier(.4,1.4,.6,1), ease",
                  opacity: r.hidden ? 0 : 1
                },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "div",
                    {
                      className: "transition-transform duration-500",
                      style: {
                        transform: `scaleX(${r.facing}) rotate(${r.fallen ? 78 : 0}deg)`,
                        transformOrigin: "50% 100%"
                      },
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(RobotSprite, { name, pose: r.pose, dead: r.dead, back: r.back }),
                        r.gun !== "none" && // Held in the front hand; pointed at the ground until it aims.
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "div",
                          {
                            className: "absolute transition-transform duration-200",
                            style: {
                              left: 17.5,
                              top: 23,
                              transformOrigin: "8.5px 6px",
                              transform: `rotate(${r.gun === "aim" ? 0 : 58}deg)`
                            },
                            children: /* @__PURE__ */ jsxRuntimeExports.jsx(Akm, { flash: r.flash })
                          }
                        )
                      ]
                    }
                  ),
                  r.hits > 0 && !r.dead && /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      className: "robot-spark absolute left-1/2 h-3 w-3 rounded-full",
                      style: {
                        bottom: 20,
                        background: "radial-gradient(circle, #fff, #fde047 40%, transparent 70%)"
                      }
                    },
                    r.hits
                  ),
                  r.say ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      className: "robot-say absolute left-1/2 whitespace-nowrap rounded-md border border-border bg-card px-1.5 py-0.5 font-mono text-[9px] font-bold text-foreground",
                      style: { bottom: ROBOT_H + 4 },
                      children: r.say
                    },
                    r.say
                  ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      className: "absolute -top-3 left-1/2 -translate-x-1/2 font-mono text-[8px] uppercase tracking-widest text-muted-foreground/50 transition-opacity duration-300",
                      style: { opacity: r.fallen || r.hidden ? 0 : 1 },
                      children: name
                    }
                  )
                ]
              },
              name
            );
          }),
          world.current.shots.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "absolute left-0 h-[2px] w-2.5 rounded-full",
              style: {
                bottom: s.bottom,
                transform: `translateX(${s.x}px)`,
                transition: `transform ${s.ms}ms linear`,
                background: "linear-gradient(90deg, transparent, #fde047, #fff)",
                boxShadow: "0 0 6px #f59e0b"
              }
            },
            s.id
          )),
          ball.visible && live.length === 2 && /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "absolute left-0",
              style: {
                bottom: LINE_PX,
                transform: `translateX(${ball.x}px)`,
                transitionProperty: "transform",
                transitionDuration: `${ball.ms}ms`,
                transitionTimingFunction: "linear"
              },
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  style: ball.hops ? {
                    animationName: "ball-hop",
                    animationDuration: `${ball.ms / ball.hops}ms`,
                    animationIterationCount: ball.hops,
                    animationTimingFunction: "cubic-bezier(.3,0,.7,1)"
                  } : void 0,
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      className: "rounded-full",
                      style: {
                        width: BALL_PX,
                        height: BALL_PX,
                        background: "radial-gradient(circle at 32% 30%, #fff, var(--color-accent) 60%, color-mix(in oklab, var(--color-accent) 60%, black) 100%)",
                        boxShadow: "0 0 10px -1px var(--color-accent)"
                      }
                    }
                  )
                }
              )
            }
          )
        ]
      }
    )
  );
}
function fmt(sec) {
  const h = Math.floor(sec / 3600);
  const m = Math.floor(sec % 3600 / 60);
  const s = Math.floor(sec % 60);
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}
function SessionTimer() {
  const startRef = reactExports.useRef(/* @__PURE__ */ new Date());
  const [now2, setNow] = reactExports.useState(/* @__PURE__ */ new Date());
  const [hover, setHover] = reactExports.useState(false);
  reactExports.useEffect(() => {
    const id = setInterval(() => setNow(/* @__PURE__ */ new Date()), 1e3);
    return () => clearInterval(id);
  }, []);
  const elapsed = Math.max(0, Math.floor((now2.getTime() - startRef.current.getTime()) / 1e3));
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
        g.addColorStop(0, `hsla(${p.hue}, 90%, 65%, 0.12)`);
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
        ctx.fillStyle = `rgba(180, 210, 255, ${a})`;
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
function useInView(rootMargin = "0px 0px -10% 0px") {
  const ref = reactExports.useRef(null);
  const [inView, setInView] = reactExports.useState(false);
  reactExports.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setInView(true);
        io.disconnect();
      },
      { rootMargin }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [rootMargin]);
  return [ref, inView];
}
const GLYPHS = "!<>-_\\/[]{}=+*^?#01ABCDEFXYZ$%&";
const MS_PER_CHAR = 45;
const FRAME_MS = 32;
function Scramble({ text }) {
  const [ref, inView] = useInView();
  const [shown, setShown] = reactExports.useState(text);
  reactExports.useEffect(() => {
    if (!inView || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const start = performance.now();
    const id = window.setInterval(() => {
      const settled = Math.floor((performance.now() - start) / MS_PER_CHAR);
      if (settled >= text.length) {
        setShown(text);
        window.clearInterval(id);
        return;
      }
      setShown(
        text.split("").map(
          (c, i) => i < settled || c === " " ? c : GLYPHS[Math.floor(Math.random() * GLYPHS.length)]
        ).join("")
      );
    }, FRAME_MS);
    return () => window.clearInterval(id);
  }, [inView, text]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("span", { ref, "aria-label": text, children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { "aria-hidden": true, children: shown }) });
}
const music = "/assets/acpc-music-Sbaw3JnV.mp3";
const group = "/assets/group-DVKU7Npx.jpg";
const firstToSolve = "/assets/ecpc-first-to-solve-BR9AQIT0.jpg";
const atDesk = "/assets/team-at-desk-CDpQf1R3.jpg";
const withCoach = "/assets/team-with-coach-mb8minXj.jpg";
const hearts = "/assets/team-hearts-DqBWM-34.jpg";
const thumbsUp = "/assets/thumbs-up-dNmpP-K9.jpg";
const selfieDay = "/assets/selfie-day-Z6xIplMz.jpg";
const selfieNight = "/assets/selfie-night-C5dw_zPW.jpg";
const MOMENTS = [
  { src: group, alt: "The team at the ACPC Africa & Arab Championship" },
  { src: firstToSolve, alt: "First to solve at ECPC" },
  { src: withCoach, alt: "At our desk at the ACPC finals, with our coach" },
  { src: atDesk, alt: "The team at our ECPC desk" },
  { src: hearts, alt: "Between problems at the finals" },
  { src: thumbsUp, alt: "Thumbs up at ACPC" },
  { src: selfieDay, alt: "ACPC, before the contest" },
  { src: selfieNight, alt: "The night after, with the whole crew" }
];
const IDLE_SLIDE_MS = 6e3;
const AUTOPLAYED_KEY = "acpc-autoplayed";
const PLAY_SLIDE_MS = 5e3;
const BARS = 14;
function time(s) {
  if (!Number.isFinite(s)) return "0:00";
  const m = Math.floor(s / 60);
  return `${m}:${String(Math.floor(s % 60)).padStart(2, "0")}`;
}
function AcpcMoments() {
  const audioRef = reactExports.useRef(null);
  const barsRef = reactExports.useRef(null);
  const photosRef = reactExports.useRef(null);
  const analyser = reactExports.useRef(null);
  const [playing, setPlaying] = reactExports.useState(false);
  const [slide, setSlide] = reactExports.useState(0);
  const [now2, setNow] = reactExports.useState(0);
  const [duration, setDuration] = reactExports.useState(0);
  reactExports.useEffect(() => {
    const a = audioRef.current;
    if (a && a.readyState >= 1) setDuration(a.duration);
  }, []);
  reactExports.useEffect(() => {
    const id = window.setInterval(
      () => setSlide((i) => (i + 1) % MOMENTS.length),
      playing ? PLAY_SLIDE_MS : IDLE_SLIDE_MS
    );
    return () => window.clearInterval(id);
  }, [playing]);
  reactExports.useEffect(() => {
    if (!playing) {
      photosRef.current?.style.setProperty("--beat", "0");
      return;
    }
    const canvas = barsRef.current;
    const ctx = canvas?.getContext("2d");
    const data = new Uint8Array(analyser.current?.frequencyBinCount ?? 32);
    let raf = 0;
    const draw = () => {
      raf = requestAnimationFrame(draw);
      const a = analyser.current;
      if (!a || !canvas || !ctx) return;
      a.getByteFrequencyData(data);
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      if (canvas.width !== Math.round(w * dpr)) {
        canvas.width = Math.round(w * dpr);
        canvas.height = Math.round(h * dpr);
      }
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);
      const bw = w / BARS;
      const grad = ctx.createLinearGradient(0, h, 0, 0);
      grad.addColorStop(0, "#22d3ee");
      grad.addColorStop(1, "#a855f7");
      ctx.fillStyle = grad;
      for (let i = 0; i < BARS; i++) {
        const v = data[Math.floor(i / BARS * data.length * 0.7)] / 255;
        const bh = Math.max(2, v * h);
        ctx.fillRect(i * bw + 1.5, h - bh, bw - 3, bh);
      }
      const bass = (data[0] + data[1] + data[2]) / (3 * 255);
      photosRef.current?.style.setProperty("--beat", bass.toFixed(3));
    };
    raf = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(raf);
  }, [playing]);
  const toggle = async () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (!audio.paused) {
      audio.pause();
      return;
    }
    if (!analyser.current) {
      try {
        const Ctx = window.AudioContext ?? window.webkitAudioContext;
        const ac = new Ctx();
        const source = ac.createMediaElementSource(audio);
        const an = ac.createAnalyser();
        an.fftSize = 64;
        an.smoothingTimeConstant = 0.8;
        source.connect(an);
        an.connect(ac.destination);
        analyser.current = an;
        await ac.resume();
      } catch {
      }
    }
    try {
      await audio.play();
    } catch {
      setPlaying(false);
    }
  };
  reactExports.useEffect(() => {
    let timer = 0;
    const on = () => {
      const audio = audioRef.current;
      if (!audio) return;
      audio.playbackRate = 1.6;
      window.clearTimeout(timer);
      timer = window.setTimeout(() => {
        audio.playbackRate = 1;
      }, 4e3);
    };
    window.addEventListener(PARTY_EVENT, on);
    return () => {
      window.removeEventListener(PARTY_EVENT, on);
      window.clearTimeout(timer);
    };
  }, []);
  const toggleRef = reactExports.useRef(toggle);
  toggleRef.current = toggle;
  const anchorRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
    const anchor = anchorRef.current;
    const audio = audioRef.current;
    if (!anchor || !audio) return;
    try {
      if (sessionStorage.getItem(AUTOPLAYED_KEY) === "1") return;
    } catch {
    }
    let inView = false;
    let pending = false;
    let done = false;
    const finish = () => {
      done = true;
      pending = false;
      try {
        sessionStorage.setItem(AUTOPLAYED_KEY, "1");
      } catch {
      }
      window.removeEventListener("pointerdown", onGesture, true);
      window.removeEventListener("keydown", onGesture, true);
      io.disconnect();
    };
    const tryPlay = () => {
      if (done) return;
      if (!audio.paused || audio.currentTime > 0) return finish();
      const activated = navigator.userActivation?.hasBeenActive ?? true;
      if (!activated) {
        pending = true;
        return;
      }
      finish();
      void toggleRef.current();
    };
    const onGesture = () => {
      if (pending && inView) setTimeout(tryPlay, 0);
    };
    const io = new IntersectionObserver(
      ([e]) => {
        inView = e.isIntersecting;
        if (inView) tryPlay();
      },
      { threshold: 0.6 }
    );
    io.observe(anchor);
    window.addEventListener("pointerdown", onGesture, true);
    window.addEventListener("keydown", onGesture, true);
    return () => {
      io.disconnect();
      window.removeEventListener("pointerdown", onGesture, true);
      window.removeEventListener("keydown", onGesture, true);
    };
  }, []);
  const seek = (e) => {
    const audio = audioRef.current;
    if (!audio || !duration) return;
    const r = e.currentTarget.getBoundingClientRect();
    audio.currentTime = (e.clientX - r.left) / r.width * duration;
  };
  const backdrop = /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        ref: photosRef,
        "aria-hidden": !playing,
        className: "absolute inset-0 transition-[filter] duration-1000",
        style: {
          // Always behind the balloons; the music only clears the blur a little.
          filter: playing ? "blur(2.5px) brightness(0.68) saturate(1.2)" : "blur(7px) brightness(0.42) saturate(1.15)"
        },
        children: MOMENTS.map((m, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "img",
          {
            src: m.src,
            alt: playing && i === slide ? m.alt : "",
            draggable: false,
            loading: "lazy",
            className: "absolute inset-0 h-full w-full object-cover transition-[opacity,transform] ease-out",
            style: {
              opacity: i === slide ? 1 : 0,
              // A slow zoom while it is on, swelling with the bass.
              transform: `scale(calc(${i === slide ? 1.12 : 1.04} + var(--beat, 0) * 0.04))`,
              transitionDuration: `1200ms, ${playing ? PLAY_SLIDE_MS : IDLE_SLIDE_MS}ms`
            }
          },
          m.src
        ))
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "absolute inset-x-0 bottom-0 flex items-end justify-between bg-gradient-to-t from-black/70 to-transparent p-3 font-mono text-[11px] text-white transition-opacity duration-700",
        style: { opacity: playing ? 1 : 0 },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: MOMENTS[slide].alt }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "opacity-70", children: [
            slide + 1,
            "/",
            MOMENTS.length
          ] })
        ]
      }
    )
  ] });
  const controls = /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 flex items-center gap-3 rounded-xl border border-border bg-card/60 p-2 backdrop-blur-sm", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        type: "button",
        onClick: toggle,
        "aria-label": playing ? "Pause the ACPC track" : "Play the ACPC track",
        className: "flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground transition-transform hover:scale-105 active:scale-95",
        children: playing ? /* @__PURE__ */ jsxRuntimeExports.jsx(Pause, { className: "h-4 w-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Play, { className: "h-4 w-4 translate-x-[1px]" })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-1 flex justify-between font-mono text-[10px] uppercase tracking-widest text-muted-foreground", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate", children: playing ? "Now playing · ACPC" : "Play the ACPC track" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "tabular-nums", children: [
          time(now2),
          " / ",
          time(duration)
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          onClick: seek,
          role: "presentation",
          className: "group relative h-1.5 cursor-pointer overflow-hidden rounded-full bg-border",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-primary to-accent",
              style: { width: duration ? `${now2 / duration * 100}%` : "0%" }
            }
          )
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "canvas",
      {
        ref: barsRef,
        "aria-hidden": true,
        className: "hidden h-8 w-24 shrink-0 transition-opacity duration-500 sm:block",
        style: { opacity: playing ? 1 : 0.15 }
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "a",
      {
        href: music,
        download: "acpc-music.mp3",
        "aria-label": "Download the ACPC track",
        title: "Download the track",
        className: "flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-primary/60 hover:text-primary",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "h-4 w-4" })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "audio",
      {
        ref: audioRef,
        src: music,
        preload: "metadata",
        onPlay: () => setPlaying(true),
        onPause: () => setPlaying(false),
        onEnded: (e) => {
          e.currentTarget.currentTime = 0;
          setPlaying(false);
          setNow(0);
        },
        onTimeUpdate: (e) => setNow(e.currentTarget.currentTime),
        onLoadedMetadata: (e) => setDuration(e.currentTarget.duration),
        onDurationChange: (e) => setDuration(e.currentTarget.duration)
      }
    )
  ] });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "span",
      {
        ref: anchorRef,
        "aria-hidden": true,
        className: "pointer-events-none absolute inset-x-0 top-0 h-[280px]"
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(ContestBalloons, { backdrop, controls })
  ] });
}
function Achievements() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "py-24 border-t border-border", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-12", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Trophy, { className: "w-5 h-5 text-muted-foreground" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-3xl font-bold tracking-tight", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Scramble, { text: "Competitions & community" }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(AcpcMoments, {}),
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
          ". ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground/60", children: "One problem never made it there: it is stored somewhere in this very browser." })
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
const PACKED = "P/3o/Sz9/v26/f79HP0U/j39FP4t/Sr+Tf0q/if9QP5G/UD+Zf1A/psGQP4//Vb+Xf1W/nv9Vv6vBVb+vQZW/jD9bP5N/Wz+av1s/ob9bP7dBmz+Kv2C/kb9gv5i/YL+fv2C/pr9gv62/YL+jwWC/qsFgv7eBoL+Lf2Y/kn9mP5k/Zj+f/2Y/pr9mP62/Zj+fQWY/pgFmP6zBZj+zgWY/kP9rv5d/a7+d/2u/pL9rv6s/a7+x/2u/uH9rv7HAK7+4QCu/vsArv5/BK7+mgSu/rQErv7PBK7+UwWu/m4Frv6IBa7+owWu/r0Frv7YBa7+Rf3E/l/9xP55/cT+kv3E/qz9xP7G/cT+4P3E/vr9xP7PAMT+6QDE/gMBxP4dAcT+jQTE/qcExP7BBMT+2wTE/vUExP4PBcT+KQXE/kMFxP5dBcT+dwXE/pAFxP6qBcT+xAXE/t4FxP74BcT+P/3a/lj92v5x/dr+i/3a/qT92v69/dr+1v3a/u/92v4J/tr+sADa/skA2v7jANr+/ADa/hUB2v4uAdr+hgTa/p8E2v64BNr+0gTa/usE2v4EBdr+HQXa/jYF2v5PBdr+aQXa/oIF2v6bBdr+tAXa/s0F2v7mBdr+Qf3w/lr98P5z/fD+i/3w/qT98P69/fD+1f3w/u798P4H/vD+oADw/rkA8P7SAPD+6gDw/gMB8P4cAfD+NAHw/nsE8P6TBPD+rATw/sUE8P7dBPD+9gTw/g8F8P4nBfD+QAXw/lgF8P5xBfD+igXw/qIF8P67BfD+1AXw/uwF8P5L/Qb/Y/0G/3v9Bv+U/Qb/rP0G/8T9Bv/d/Qb/9f0G/w3+Bv+eAAb/tgAG/88ABv/nAAb//wAG/xgBBv8wAQb/SAEG/8IBBv+DBAb/nAQG/7QEBv/MBAb/5QQG//0EBv8VBQb/LgUG/0YFBv9eBQb/dwUG/48FBv+nBQb/wAUG/9gFBv/wBQb/Tf0c/2T9HP98/Rz/lP0c/6z9HP/E/Rz/3P0c//P9HP8L/hz/I/4c/zv+HP9T/hz/pwAc/78AHP/XABz/7gAc/wYBHP8eARz/NgEc/04BHP/FARz/3QEc/3gEHP+QBBz/qAQc/8AEHP/YBBz/8AQc/wcFHP8fBRz/NwUc/08FHP9nBRz/fwUc/5YFHP+uBRz/xgUc/94FHP9W/TL/bf0y/4X9Mv+c/TL/tP0y/8v9Mv/j/TL/+v0y/xL+Mv8p/jL/Qf4y/1j+Mv+NADL/pQAy/7wAMv/UADL/6wAy/wMBMv8aATL/MgEy/0kBMv+/ATL/1wEy/7AEMv/IBDL/3wQy//cEMv8OBTL/JgUy/z0FMv9VBTL/bAUy/4QFMv+bBTL/swUy/8oFMv9vBjL/R/1I/179SP92/Uj/jf1I/6T9SP+7/Uj/0/1I/+r9SP8B/kj/GP5I/y/+SP9H/kj/Xv5I/4sASP+jAEj/ugBI/9EASP/oAEj//wBI/xcBSP8uAUj/RQFI/1wBSP+5AUj/0QFI/+gBSP/PBEj/5gRI//0ESP8VBUj/LAVI/0MFSP9aBUj/cgVI/4kFSP+gBUj/A/le/xr5Xv8x+V7/SPle/1/5Xv92+V7/jfle/6T5Xv+7+V7/0vle/+n5Xv8A+l7/F/pe/y76Xv9E+l7/W/pe/3L6Xv+J+l7/oPpe/7f6Xv/O+l7/5fpe//z6Xv8T+17/Kvte/0H7Xv9Y+17/b/te/4b7Xv+c+17/s/te/8r7Xv/h+17/+Pte/w/8Xv8m/F7/Pfxe/1T8Xv9r/F7/gvxe/5n8Xv+w/F7/x/xe/938Xv/0/F7/C/1e/yL9Xv85/V7/UP1e/2f9Xv9+/V7/lf1e/6z9Xv/D/V7/2v1e//H9Xv8I/l7/Hv5e/zX+Xv9M/l7/Y/5e/3r+Xv+R/l7/qP5e/7/+Xv/W/l7/7f5e/4oAXv+hAF7/twBe/84AXv/lAF7//ABe/xMBXv8qAV7/QQFe/1gBXv9vAV7/hgFe/8sBXv/iAV7/1gRe/+0EXv8EBV7/GwVe/zIFXv9JBV7/jgVe/6UFXv+KBl7/Ff10/yv9dP9C/XT/Wf10/2/9dP+G/XT/nf10/7P9dP/K/XT/4f10//f9dP8O/nT/Jf50/zv+dP9S/nT/aP50/4gAdP+eAHT/tQB0/8wAdP/iAHT/+QB0/xABdP8mAXT/PQF0/1QBdP9qAXT/gQF0//IBdP/0BHT/IQV0/zgFdP9OBXT/kgV0/w79iv8l/Yr/O/2K/1L9iv9o/Yr/f/2K/5X9iv+s/Yr/wv2K/9n9iv/v/Yr/Bv6K/xz+iv8z/or/Sf6K/2D+iv92/or/kgCK/6kAiv+/AIr/1gCK/+wAiv8DAYr/GQGK/zABiv9GAYr/XQGK/3MBiv+KAYr/lQWK//H8oP8I/aD/Hv2g/zT9oP9L/aD/Yf2g/3j9oP+O/aD/pP2g/7v9oP/R/aD/5/2g//79oP8U/qD/Kv6g/0H+oP9X/qD/bv6g/4T+oP+a/qD/hgCg/50AoP+zAKD/yQCg/+AAoP/2AKD/DAGg/yMBoP85AaD/TwGg/2YBoP98AaD/xAWg/+v8tv8B/bb/GP22/y79tv9E/bb/Wv22/3D9tv+H/bb/nf22/7P9tv/J/bb/4P22//b9tv8M/rb/Iv62/zj+tv9P/rb/Zf62/3v+tv+R/rb/kAC2/6cAtv+9ALb/0wC2/+kAtv8AAbb/FgG2/ywBtv9CAbb/WAG2/28Btv+FAbb/NgS2/0wEtv9iBLb/bQW2/4MFtv+ZBbb/sAW2/+X8zP/7/Mz/Ef3M/yf9zP89/cz/U/3M/2n9zP+A/cz/lv3M/6z9zP/C/cz/2P3M/+79zP8E/sz/Gv7M/zD+zP9G/sz/XP7M/3L+zP+J/sz/hQDM/5sAzP+xAMz/xwDM/90AzP/zAMz/CQHM/x8BzP81Acz/SwHM/2EBzP93Acz/bwXM/4UFzP+cBcz/sgXM/woGzP/l/OL/+/zi/xH94v8n/eL/Pf3i/1P94v9p/eL/gP3i/5b94v+s/eL/wv3i/9j94v/u/eL/BP7i/xr+4v8w/uL/Rv7i/1z+4v9y/uL/bgDi/4UA4v+bAOL/sQDi/8cA4v/dAOL/8wDi/wkB4v8fAeL/NQHi/0sB4v9hAeL/dwHi/44B4v/4A+L/DgTi/yQE4v9mBOL/fATi/6kE4v+/BOL/AQXi/y0F4v9DBeL/WQXi/28F4v+FBeL/3/z4//X8+P8L/fj/If34/zf9+P9N/fj/Yv34/3j9+P+O/fj/pP34/7r9+P/Q/fj/5v34//z9+P8S/vj/KP74/2MA+P95APj/jwD4/6UA+P+7APj/0QD4/+YA+P/8APj/EgH4/ygB+P8+Afj/VAH4/2oB+P+AAfj/lgH4//0D+P9VBPj/agT4/4AE+P+WBPj/rAT4/zAF+P/1/A4AC/0OACH9DgA3/Q4ATf0OAGL9DgB4/Q4Ajv0OAKT9DgC6/Q4A0P0OAOb9DgD8/Q4AYwAOAHkADgCPAA4ApQAOALsADgDRAA4A5gAOAPwADgASAQ4AKAEOAD4BDgBUAQ4AagEOAIABDgCWAQ4ArAEOAOcDDgD9Aw4AVQQOAGoEDgCABA4AlgQOAAQFDgD7/CQAEf0kACf9JAA9/SQAU/0kAGn9JACA/SQAlv0kAKz9JADC/SQA2P0kAO79JABuACQAhQAkAJsAJACxACQAxwAkAN0AJADzACQACQEkAB8BJAA1ASQASwEkAGEBJAB3ASQAjgEkAKQBJAC6ASQA0AEkAMwDJAD4AyQAfAQkAJMEJAD7/DoAEf06ACf9OgA9/ToAU/06AGn9OgCA/ToAlv06AKz9OgDC/ToA2P06AKj/OgC+/zoA1P86AOr/OgAAADoAQgA6AFgAOgBuADoAhQA6AJsAOgCxADoAxwA6AN0AOgDzADoACQE6AB8BOgA1AToASwE6AGEBOgB3AToAjgE6AKQBOgC6AToA0AE6AOYBOgD4AzoAkwQ6ANX8UAAB/VAAGP1QAC79UABE/VAAWv1QAHD9UACH/VAAnf1QAIb/UACc/1AAsv9QAMj/UADf/1AA9f9QAAsAUAAhAFAAOABQAE4AUABkAFAAegBQAJAAUACnAFAAvQBQANMAUADpAFAAAAFQABYBUAAsAVAAQgFQAFgBUABvAVAAhQFQAJsBUACxAVAAyAFQAN4BUAD0AVAAKwNQANEEUADoBFAArvxmAB79ZgBL/WYAYf1mAI79ZgB6/2YAkP9mAKf/ZgC9/2YA0/9mAOr/ZgAAAGYAFgBmAC0AZgBDAGYAWQBmAHAAZgCGAGYAnQBmALMAZgDJAGYA4ABmAPYAZgAMAWYAIwFmADkBZgBPAWYAZgFmAHwBZgCSAWYAqQFmAL8BZgDWAWYA7AFmAA8DZgAbBGYAzgRmAJ78fAC0/HwAbv98AIT/fACb/3wAsf98AMj/fADe/3wA9f98AAsAfAAiAHwAOAB8AE8AfABlAHwAfAB8AJIAfACpAHwAvwB8ANYAfADsAHwAAwF8ABkBfAAwAXwARgF8AF0BfABzAXwAigF8AKABfADyAnwACAN8AB8DfAAABHwAFgR8AC0EfABDBHwA4QR8AGX8kgB8/JIAk/ySAKr8kgBV/5IAbP+SAIP/kgCZ/5IAsP+SAMf/kgDe/5IA9f+SAAsAkgAiAJIAOQCSAFAAkgBnAJIAfQCSAJQAkgCrAJIAwgCSANgAkgDvAJIABgGSAB0BkgA0AZIASgGSAGEBkgB4AZIAjwGSALwBkgDTAZIA6gGSAPsCkgASA5IA3wOSAPYDkgANBJIAIwSSADoEkgAm/KgAPfyoAFT8qABr/KgAgvyoAF//qAB2/6gAjf+oAKT/qAC7/6gA0v+oAOn/qAAAAKgAFwCoAC4AqABFAKgAXACoAHMAqACKAKgAoQCoALcAqADOAKgA5QCoAPwAqAATAagAKgGoAEEBqABYAagAbwGoAIYBqAC0AagAywGoAOIBqAD4AagADwKoAN4CqAD1AqgADAOoACMDqADDA6gA2gOoAPEDqAAIBKgAHwSoAL8EqAAC/L4AGfy+ADH8vgB2/L4Ajfy+ADD9vgBH/b4Adf++AIz/vgCj/74Auv++ANL/vgDp/74AAAC+ABcAvgAuAL4ARgC+AF0AvgB0AL4AiwC+AKMAvgC6AL4A0QC+AOgAvgD/AL4AFwG+AC4BvgBFAb4AXAG+AHQBvgCiAb4AuQG+ANEBvgDoAb4A/wG+ABYCvgAtAr4A5wK+AP4CvgAWA74ALQO+AEQDvgC4A74AzwO+AOcDvgD+A74AFQS+AEQEvgD1+9QADPzUACT81ACC/NQAmfzUAPj81ABb/9QAc//UAIr/1ACi/9QAuf/UANH/1ADo/9QAAADUABgA1AAvANQARwDUAF4A1AB2ANQAjQDUAKUA1AC8ANQA1ADUAOsA1AADAdQAGgHUADIB1ABJAdQAYQHUAJAB1ACoAdQAvwHUANcB1ADuAdQABgLUAB0C1AA1AtQATALUAMIC1ADZAtQA8QLUAAgD1AAgA9QAOAPUAE8D1ACtA9QAxQPUANwD1AD0A9QACwTUACME1ABSBNQA7PvqAAT86gAc/OoAZP/qAHz/6gCU/+oArP/qAMT/6gDc/+oA9P/qAAwA6gAkAOoAPADqAFQA6gBsAOoAhADqAJwA6gC0AOoAzADqAOQA6gD8AOoAFAHqACwB6gBEAeoAXAHqAIwB6gCkAeoAvAHqANQB6gDsAeoABALqABwC6gA0AuoATALqAMQC6gDcAuoA9ALqAAwD6gAkA+oAPAPqAFQD6gBsA+oAhAPqAJwD6gC0A+oAzAPqAOQD6gD8A+oAFATqACwE6gBEBOoAXATqAHQE6gCMBOoAvATqAMb7AAHe+wAB9vsAAQ/8AAEn/AABev8AAZP/AAGr/wABw/8AAdz/AAH0/wABDAAAASQAAAE9AAABVQAAAW0AAAGGAAABngAAAbYAAAHPAAAB5wAAAf8AAAEYAQABMAEAAUgBAAF5AQABkQEAAaoBAAHCAQAB2gEAAfMBAAFUAgABbAIAAYUCAAGdAgABtQIAAc4CAAHmAgAB/gIAARcDAAEvAwABRwMAAWADAAF4AwABkAMAAagDAAHBAwAB2QMAAfEDAAEKBAABIgQAAToEAAFTBAABawQAAYMEAAGcBAABivsWAbz7FgHU+xYB7fsWAQb8FgEf/BYBzfwWAYT/FgGd/xYBtv8WAc7/FgHn/xYBAAAWARkAFgEyABYBSgAWAWMAFgF8ABYBlQAWAa4AFgHHABYB3wAWAfgAFgERARYBKgEWAUMBFgF0ARYBjQEWAaYBFgG/ARYB2AEWAQkCFgEiAhYBOwIWAVQCFgFtAhYBhgIWAZ4CFgG3AhYB0AIWAekCFgECAxYBGgMWATMDFgFMAxYBZQMWAX4DFgGXAxYBrwMWAcgDFgHhAxYB+gMWARMEFgEsBBYBRAQWAV0EFgF2BBYBjwQWAagEFgF++ywBsfssAcv7LAHk+ywB/fssARf8LAEw/CwBSfwsAWP8LAF8/CwBr/wsAcj8LAGn/ywBwf8sAdr/LAHz/ywBDQAsASYALAE/ACwBWQAsAXIALAGLACwBpQAsAb4ALAHXACwB8QAsAQoBLAEkASwBPQEsAVYBLAFwASwBiQEsAaIBLAG8ASwB1QEsAQgCLAEhAiwBOgIsAVQCLAFtAiwBhgIsAaACLAG5AiwB0wIsAewCLAEFAywBHwMsATgDLAFRAywBawMsAYQDLAGdAywBtwMsAdADLAHpAywBAwQsARwELAE1BCwBTwQsAWgELAGCBCwBmwQsAbQELAF3+0IBkftCAav7QgHF+0IB3/tCAfr7QgEU/EIBLvxCAUj8QgFi/EIBfPxCAZb8QgGw/EIByvxCAaX/QgG//0IB2f9CAfP/QgENAEIBJwBCAUEAQgFbAEIBdQBCAY8AQgHeAEIBYAFCAXoBQgGUAUIBrgFCAckBQgHjAUIB/QFCARcCQgExAkIBSwJCAWUCQgF/AkIBmQJCAbMCQgHNAkIB5wJCAQIDQgEcA0IBNgNCAVADQgFqA0IBhANCAZ4DQgG4A0IB0gNCAewDQgEGBEIBIQRCATsEQgFVBEIBbwRCAYkEQgGjBEIBvQRCAWv7WAGF+1gBoPtYAbv7WAHV+1gB8PtYAQv8WAEl/FgBQPxYAVv8WAF1/FgBkPxYAav8WAHF/FgB4PxYAcv/WAHl/1gBAABYARsAWAE1AFgBUABYAXUBWAGQAVgBqwFYAcUBWAHgAVgB+wFYARUCWAEwAlgBSwJYAWUCWAGAAlgBmwJYAbUCWAHQAlgB6wJYAQUDWAEgA1gBOwNYAVUDWAFwA1gBiwNYAaUDWAHAA1gB2wNYAfUDWAEQBFgBKwRYAUUEWAFgBFgBewRYAZUEWAGwBFgBNQVYAVAFWAFH+24BYvtuAX77bgGZ+24BtftuAdD7bgHs+24BB/xuASP8bgE+/G4BWvxuAXX8bgGR/G4BrPxuAcj8bgHj/G4B//xuAcn/bgEbAG4BNwBuAVIAbgEuAW4BSgFuAWUBbgGBAW4BnAFuAbgBbgHTAW4B7wFuAQoCbgEmAm4BQQJuAV0CbgF4Am4BlAJuAa8CbgHLAm4B5gJuAQEDbgEdA24BOANuAVQDbgFvA24BiwNuAaYDbgHCA24B3QNuAfkDbgEUBG4BMARuAUsEbgFnBG4BggRuAZ4EbgG5BG4B8ARuAQwFbgFeBW4BegVuATn7hAFV+4QBcfuEAY37hAGp+4QBxfuEAeH7hAH9+4QBGvyEATb8hAFS/IQBbvyEAYr8hAGm/IQBwvyEAd78hAH7/IQBuv+EAdb/hAHy/4QB0wCEAQsBhAEnAYQBQwGEAWABhAF8AYQBmAGEAbQBhAHQAYQBJAKEAUEChAFdAoQBeQKEAZUChAGxAoQBzQKEAekChAEFA4QBIgOEAT4DhAFaA4QBdgOEAZIDhAGuA4QBygOEAeYDhAEDBIQBHwSEATsEhAFXBIQBcwSEAY8EhAHkBIQBAAWEATP7mgFQ+5oBbfuaAYv7mgGo+5oBxfuaAeL7mgEA/JoBHfyaATr8mgFX/JoBdfyaAZL8mgGv/JoBzPyaAer8mgEH/ZoBJP2aAcX/mgHj/5oBAACaAZIAmgHNAJoB6gCaAQcBmgElAZoBQgGaAV8BmgF8AZoBmgGaAbcBmgHUAZoBLAKaAUkCmgFnApoBhAKaAaECmgG+ApoB3AKaAfkCmgEWA5oBNAOaAVEDmgFuA5oBiwOaAakDmgHGA5oB4wOaAQAEmgEeBJoBOwSaAVgEmgF1BJoBkwSaAbAEmgHNBJoB6wSaAQgFmgF9BZoBKPuwAUb7sAFk+7ABgvuwAaH7sAG/+7AB3fuwAfv7sAEa/LABOPywAVb8sAF0/LABk/ywAbH8sAHP/LAB7fywAQz9sAEq/bABw/+wAeL/sAEAALABHgCwAT0AsAF5ALABtgCwAdQAsAHyALABEAGwAagBsAHGAbABAgKwASECsAE/ArABXQKwAXsCsAGaArABuAKwAdYCsAH0ArABEwOwATEDsAFPA7ABbQOwAYwDsAGqA7AByAOwAeYDsAEFBLABIwSwAUEEsAFfBLABfgSwAZwEsAG6BLAB2ASwAfcEsAEVBbABMwWwAY4FsAE7+8YBWvvGAXr7xgGZ+8YBuPvGAdj7xgH3+8YBFvzGATb8xgFV/MYBdPzGAZP8xgGz/MYB0vzGAfH8xgER/cYBMP3GAU/9xgFv/cYBjv3GAQAAxgEfAMYBPwDGAV4AxgGdAMYBvADGAdsAxgH6AMYBGgHGAVgBxgF4AcYBlwHGAbYBxgHWAcYBFALGATMCxgFTAsYBcgLGAZECxgGxAsYB0ALGAe8CxgEPA8YBLgPGAU0DxgFtA8YBjAPGAasDxgHKA8YB6gPGAQkExgEoBMYBSATGAWcExgGGBMYBpgTGAcUExgHkBMYBAwXGASMFxgFCBcYBVfvcAXb73AGX+9wBuPvcAdj73AH5+9wBGvzcATv83AFb/NwBfPzcAZ383AG9/NwB3vzcAf/83AEg/dwBQP3cAWH93AHD/dwB8P/cARAA3AExANwBUgDcAXMA3AGTANwBtADcAdUA3AH1ANwBFgHcATcB3AFYAdwBeAHcAZkB3AG6AdwB2wHcAfsB3AEcAtwBPQLcAV0C3AF+AtwBnwLcAcAC3AHgAtwBAQPcASID3AFDA9wBYwPcAYQD3AGlA9wBxQPcAeYD3AEHBNwBKATcAUgE3AFpBNwBigTcAasE3AHLBNwB7ATcAQ0F3AEtBdwBTgXcAW8F3AGQBdwBKPvyAUr78gFs+/IBjvvyAbD78gHS+/IB9PvyARb88gE4/PIBWvzyAXz88gGe/PIBwPzyAeL88gEE/fIBJv3yAUj98gHQ/fIBEQDyATMA8gFVAPIBdwDyAZkA8gG7APIB3QDyAf8A8gEhAfIBQwHyAWUB8gGHAfIBqQHyAcoB8gHsAfIBDgLyATAC8gFSAvIBdALyAZYC8gG4AvIB2gLyAfwC8gEeA/IBQAPyAWID8gGEA/IBpgPyAcgD8gHqA/IBDATyAS4E8gFQBPIBcgTyAZQE8gG2BPIB2ATyAfoE8gEcBfIBPgXyAV8F8gEg+wgCRPsIAmj7CAKL+wgCr/sIAtP7CAL2+wgCGvwIAj78CAJh/AgChfwIAqn8CALM/AgC8PwIAhP9CAI3/QgCW/0IAn79CAKi/QgCxv0IAtz/CAIAAAgCRwAIAmsACAKPAAgCsgAIAtYACAL6AAgCHQEIAkEBCAJkAQgCiAEIAqwBCALPAQgC8wEIAhcCCAI6AggCXgIIAoICCAKlAggCyQIIAu0CCAIQAwgCNAMIAlcDCAJ7AwgCnwMIAsIDCALmAwgCCgQIAi0ECAJRBAgCdQQIApgECAK8BAgC4AQIAgMFCAInBQgCSgUIAm4FCAKSBQgCIAYIAvL6HgIY+x4CPfseAmP7HgKI+x4CrvseAtP7HgL5+x4CHvweAkT8HgJp/B4Cj/weArT8HgL//B4CJf0eAkr9HgJw/R4Clf0eArv9HgLt/x4CXgAeAoMAHgKpAB4CzgAeAvQAHgIZAR4CPwEeAmQBHgKKAR4CrwEeAtUBHgL6AR4CIAIeAkUCHgJrAh4CkAIeArYCHgLbAh4CAQMeAiYDHgJMAx4CcQMeApcDHgK8Ax4C4gMeAgcEHgItBB4CUgQeAngEHgKdBB4CwwQeAugEHgIOBR4CMwUeAlkFHgI6Bh4C0vk0Auf6NAIO+zQCNvs0Al37NAKF+zQCrPs0AtT7NAL7+zQCI/w0Akv8NAJy/DQCEP00Ajj9NAJf/TQCh/00Atj/NAKeADQC7QA0AhUBNAI8ATQCZAE0AowBNAKzATQC2wE0AgICNAIqAjQCUQI0AnkCNAKhAjQCyAI0AvACNAIXAzQCPwM0AmYDNAKOAzQCtQM0At0DNAIFBDQCLAQ0AlQENAJ7BDQCowQ0AsoENALyBDQCGQU0AkEFNAIuBjQCVgY0AuH5SgK1+koC3/pKAgn7SgI0+0oCXvtKAoj7SgKz+0oC3ftKAgj8SgIy/EoCXPxKAgb9SgIw/UoChf1KAlUASgJ/AEoC/gBKAigBSgJTAUoCfQFKAqgBSgLSAUoC/AFKAicCSgJRAkoCewJKAqYCSgLQAkoC+gJKAiUDSgJPA0oCeQNKAqQDSgLOA0oC+ANKAiMESgJNBEoCeARKAqIESgLMBEoC9wRKAiEFSgJLBUoCdgVKAkkGSgKW+WACw/lgAvD5YAId+mACSvpgAnf6YAKk+mAC0fpgAv76YAIr+2ACWPtgAoX7YAKy+2AC3/tgAgz8YAI5/GACGv1gAkf9YAJEAGACcQBgAp4AYAL4AGACJQFgAlIBYAJ/AWACrAFgAtkBYAIGAmACMwJgAmACYAKNAmACugJgAucCYAIUA2ACQQNgAm4DYAKbA2ACyANgAvUDYAIiBGACTwRgAnwEYAKpBGAC1gRgAgMFYAIwBWACXQVgAooFYAK3BWAC5AVgAhEGYAJrBmACmAZgAqL5dgLT+XYCBPp2AjT6dgJl+nYClvp2Asb6dgL3+nYCJ/t2Alj7dgKJ+3YCuft2Aur7dgIb/HYCS/x2Aj/9dgJv/XYCMv52AkkAdgJ6AHYCqgB2AtsAdgIMAXYCPAF2Am0BdgKeAXYCzgF2Av8BdgIvAnYCYAJ2ApECdgLBAnYC8gJ2AiMDdgJTA3YChAN2ArUDdgLlA3YCFgR2AkcEdgJ3BHYCqAR2AtkEdgIJBXYCOgV2AmoFdgKbBXYCzAV2AvwFdgItBnYCXgZ2Ao4GdgK/BnYC8AZ2AhL5jAJG+YwCevmMAq/5jALj+YwCF/qMAkv6jAJ/+owCs/qMAuj6jAIc+4wCUPuMAoT7jAK4+4wC7fuMAiH8jAJV/IwCifyMAr38jALx/IwCJv2MAlr9jAKO/YwCwv2MAvb9jAIq/owCX/6MApP+jALH/owC+/6MAi//jAJj/4wCmP+MAsz/jAIAAIwCNACMAmgAjAJtAYwCTvmiAof5ogLA+aIC+fmiAjL6ogJr+qICpfqiAt76ogIX+6ICUPuiAon7ogLC+6IC+/uiAjX8ogJu/KICp/yiAuD8ogIZ/aICUv2iAov9ogLF/aIC/v2iAjf+ogJw/qICqf6iAuL+ogIb/6ICVf+iAo7/ogLH/6ICAACiAjkAogJyAKICyQGiAucCogLV+bgCFPq4AlP6uAIR+7gCj/u4As77uAJN/LgCCv24Akn9uAIH/rgCRv64AoX+uALE/rgCA/+4Ar0AuAL9ALgCPAG4ArcCuAL2ArgCNQO4AnQDuAKzA7gC8wO4AjIEuAJxBLgCsAS4Au8EuAIuBbgCbQW4Aq0FuALsBbgCKwa4AmoGuAKpBrgC6Aa4Apf7zgLd+84CJPzOArH8zgL4/M4CEv7OAlj+zgKf/s4C5v7OAsICzgIIA84CTwPOApYDzgLcA84CIwTOAmkEzgKwBM4C9wTOAoQFzgLKBc4CUPvkAtD95AIg/uQCcP7kAsD+5AIQ/+QCMALkAnAD5ALAA+QCEATkAlD7+gIJ/PoCZfz6Anr9+gLW/foCMv76Ao/++gLr/voChgL6AvcD+gJUBPoCKvwQA5f8EAME/RADcf0QA9/9EANM/hADuf4QAyb/EANb/CYD4PwmA2X9JgPr/SYDcP4mA/X+JgOlAyYD";
function landDots() {
  const bin = atob(PACKED);
  const bytes = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
  const tenths = new Int16Array(bytes.buffer);
  const out = new Float32Array(tenths.length);
  for (let i = 0; i < tenths.length; i++) out[i] = tenths[i] / 10;
  return out;
}
const DEG = Math.PI / 180;
const CAIRO = { name: "Cairo", lat: 30.04, lon: 31.24 };
const CITIES = [
  { name: "London", lat: 51.5, lon: -0.13 },
  { name: "Berlin", lat: 52.52, lon: 13.4 },
  { name: "Dubai", lat: 25.2, lon: 55.27 },
  { name: "Riyadh", lat: 24.71, lon: 46.68 },
  { name: "New York", lat: 40.71, lon: -74 },
  { name: "San Francisco", lat: 37.77, lon: -122.42 },
  { name: "Toronto", lat: 43.65, lon: -79.38 },
  { name: "Singapore", lat: 1.35, lon: 103.82 }
];
const IDLE_SPIN = 0.12;
const DEFAULT_PITCH = 0.38;
const ARC_MS = 2600;
const ARC_GAP_MS = 700;
const ARC_SEGMENTS = 64;
const BUCKETS = 8;
const MAX_DPR$1 = 2;
function toVec(lat, lon) {
  const la = lat * DEG;
  const lo = lon * DEG;
  return [Math.cos(la) * Math.sin(lo), Math.sin(la), Math.cos(la) * Math.cos(lo)];
}
function slerp(a, b, t) {
  const dot = Math.min(1, Math.max(-1, a[0] * b[0] + a[1] * b[1] + a[2] * b[2]));
  const omega = Math.acos(dot);
  if (omega < 1e-5) return a;
  const s = Math.sin(omega);
  const wa = Math.sin((1 - t) * omega) / s;
  const wb = Math.sin(t * omega) / s;
  return [a[0] * wa + b[0] * wb, a[1] * wa + b[1] * wb, a[2] * wa + b[2] * wb];
}
function toRgb(color) {
  const c = document.createElement("canvas");
  c.width = c.height = 1;
  const g = c.getContext("2d");
  g.fillStyle = "#888";
  g.fillStyle = color;
  g.fillRect(0, 0, 1, 1);
  const [r, gr, b] = g.getImageData(0, 0, 1, 1).data;
  return [r, gr, b];
}
const rgba = ([r, g, b], a) => `rgba(${r},${g},${b},${a})`;
function DotGlobe({ className }) {
  const canvasRef = reactExports.useRef(null);
  const [dragging, setDragging] = reactExports.useState(false);
  const view = reactExports.useRef({
    yaw: -31.24 * DEG + 0.35,
    pitch: DEFAULT_PITCH,
    vYaw: 0,
    vPitch: 0,
    drag: null
  });
  reactExports.useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const raw = landDots();
    const n = raw.length / 2;
    const land = new Float32Array(n * 3);
    for (let i = 0; i < n; i++) {
      const [x, y, z] = toVec(raw[i * 2 + 1], raw[i * 2]);
      land[i * 3] = x;
      land[i * 3 + 1] = y;
      land[i * 3 + 2] = z;
    }
    const home = toVec(CAIRO.lat, CAIRO.lon);
    const arcs = CITIES.map((c, i) => {
      const to = toVec(c.lat, c.lon);
      const angle = Math.acos(home[0] * to[0] + home[1] * to[1] + home[2] * to[2]);
      const lift = 0.05 + angle * 0.1;
      const pts = [];
      for (let k = 0; k <= ARC_SEGMENTS; k++) {
        const t = k / ARC_SEGMENTS;
        const p = slerp(home, to, t);
        const h = 1 + lift * Math.sin(Math.PI * t);
        pts.push([p[0] * h, p[1] * h, p[2] * h]);
      }
      return { ...c, to, pts, offset: i * (ARC_MS + ARC_GAP_MS) * 0.45 };
    });
    const root = getComputedStyle(document.documentElement);
    let P = [34, 211, 238];
    let A = [168, 85, 247];
    let primary = "";
    let accent = "";
    let ink = "";
    const readColors = () => {
      P = toRgb(root.getPropertyValue("--color-primary").trim() || "#22d3ee");
      A = toRgb(root.getPropertyValue("--color-accent").trim() || "#a855f7");
      primary = rgba(P, 1);
      accent = rgba(A, 1);
      ink = rgba(toRgb(getComputedStyle(canvas).color), 1);
    };
    readColors();
    const mo = new MutationObserver(readColors);
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    let W = 0;
    let H = 0;
    let dpr = 1;
    const resize = () => {
      dpr = Math.min(MAX_DPR$1, window.devicePixelRatio || 1);
      W = canvas.clientWidth;
      H = canvas.clientHeight;
      canvas.width = Math.round(W * dpr);
      canvas.height = Math.round(H * dpr);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    const buckets = Array.from({ length: BUCKETS }, () => []);
    const draw = (now2) => {
      const v = view.current;
      const R = Math.min(W, H) * 0.37;
      const cx = W / 2;
      const cy = H / 2;
      const cyaw = Math.cos(v.yaw);
      const syaw = Math.sin(v.yaw);
      const cp = Math.cos(v.pitch);
      const sp = Math.sin(v.pitch);
      const rot = (x, y, z) => {
        const x1 = x * cyaw + z * syaw;
        const z1 = -x * syaw + z * cyaw;
        const y2 = y * cp - z1 * sp;
        const z2 = y * sp + z1 * cp;
        return [x1, y2, z2];
      };
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, W, H);
      const glow = ctx.createRadialGradient(cx, cy, R * 0.9, cx, cy, R * 1.25);
      glow.addColorStop(0, rgba(P, 0));
      glow.addColorStop(0.35, rgba(P, 0.22));
      glow.addColorStop(1, rgba(P, 0));
      ctx.fillStyle = glow;
      ctx.fillRect(0, 0, W, H);
      const body = ctx.createRadialGradient(cx - R * 0.35, cy - R * 0.4, R * 0.1, cx, cy, R);
      body.addColorStop(0, rgba(P, 0.1));
      body.addColorStop(1, rgba(A, 0.06));
      ctx.fillStyle = body;
      ctx.beginPath();
      ctx.arc(cx, cy, R, 0, Math.PI * 2);
      ctx.fill();
      for (const b of buckets) b.length = 0;
      for (let i = 0; i < n; i++) {
        const [x, y, z] = rot(land[i * 3], land[i * 3 + 1], land[i * 3 + 2]);
        const k = Math.min(BUCKETS - 1, Math.floor((z + 1) / 2 * BUCKETS));
        buckets[k].push(cx + x * R, cy - y * R);
      }
      for (let k = 0; k < BUCKETS; k++) {
        const depth = (k + 0.5) / BUCKETS;
        const front = depth > 0.5;
        ctx.globalAlpha = front ? 0.25 + (depth - 0.5) * 1.5 : 0.06 + depth * 0.1;
        ctx.fillStyle = front ? ink : primary;
        const size = front ? 1.1 + (depth - 0.5) * 2.4 : 0.9;
        const list = buckets[k];
        for (let i = 0; i < list.length; i += 2) {
          ctx.fillRect(list[i] - size / 2, list[i + 1] - size / 2, size, size);
        }
      }
      ctx.globalAlpha = 1;
      const shown = (p) => p[2] > 0 || Math.hypot(p[0], p[1]) > 1;
      const cycle = arcs.length * (ARC_MS + ARC_GAP_MS) * 0.45 + ARC_MS;
      for (const a of arcs) {
        const t = (now2 + cycle - a.offset) % cycle / ARC_MS;
        if (t > 1.35) continue;
        const head = Math.min(1, t);
        const tail = Math.max(0, t - 0.55);
        const from = Math.floor(tail * ARC_SEGMENTS);
        const to = Math.floor(head * ARC_SEGMENTS);
        const grad = ctx.createLinearGradient(0, 0, W, 0);
        grad.addColorStop(0, primary);
        grad.addColorStop(1, accent);
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.4;
        ctx.lineCap = "round";
        ctx.beginPath();
        let pen = false;
        for (let k = from; k <= to; k++) {
          const p = rot(...a.pts[k]);
          if (!shown(p)) {
            pen = false;
            continue;
          }
          const x = cx + p[0] * R;
          const y = cy - p[1] * R;
          if (pen) ctx.lineTo(x, y);
          else ctx.moveTo(x, y);
          pen = true;
        }
        ctx.globalAlpha = t > 1 ? Math.max(0, 1 - (t - 1) / 0.35) : 0.9;
        ctx.stroke();
        if (t < 1) {
          const p = rot(...a.pts[to]);
          if (shown(p)) {
            ctx.globalAlpha = 1;
            ctx.fillStyle = "#fff";
            ctx.shadowColor = primary;
            ctx.shadowBlur = 10;
            ctx.beginPath();
            ctx.arc(cx + p[0] * R, cy - p[1] * R, 2.2, 0, Math.PI * 2);
            ctx.fill();
            ctx.shadowBlur = 0;
          }
        }
        if (t >= 1) {
          const p = rot(...a.to);
          if (p[2] > 0) {
            const s = (t - 1) / 0.35;
            const x = cx + p[0] * R;
            const y = cy - p[1] * R;
            ctx.globalAlpha = 1 - s;
            ctx.strokeStyle = accent;
            ctx.lineWidth = 1.2;
            ctx.beginPath();
            ctx.arc(x, y, 3 + s * 12, 0, Math.PI * 2);
            ctx.stroke();
            ctx.fillStyle = ink;
            ctx.font = "600 10px ui-monospace, SFMono-Regular, Menlo, monospace";
            ctx.fillText(a.name, x + 7, y - 6);
          }
        }
      }
      ctx.globalAlpha = 1;
      const c = rot(...home);
      if (c[2] > 0) {
        const x = cx + c[0] * R;
        const y = cy - c[1] * R;
        const pulse = now2 / 1400 % 1;
        ctx.strokeStyle = primary;
        ctx.lineWidth = 1.5;
        ctx.globalAlpha = 1 - pulse;
        ctx.beginPath();
        ctx.arc(x, y, 4 + pulse * 16, 0, Math.PI * 2);
        ctx.stroke();
        ctx.globalAlpha = 1;
        ctx.fillStyle = primary;
        ctx.shadowColor = primary;
        ctx.shadowBlur = 12;
        ctx.beginPath();
        ctx.arc(x, y, 3.6, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
        ctx.fillStyle = ink;
        ctx.font = "700 11px ui-monospace, SFMono-Regular, Menlo, monospace";
        ctx.fillText(CAIRO.name, x + 8, y + 4);
      }
    };
    let raf = 0;
    let last = performance.now();
    let visible = false;
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
    });
    io.observe(canvas);
    const frame = (now2) => {
      raf = requestAnimationFrame(frame);
      const dt = Math.min(0.05, (now2 - last) / 1e3);
      last = now2;
      if (!visible || document.hidden) return;
      const v = view.current;
      if (!v.drag) {
        v.yaw += (v.vYaw + (reduce ? 0 : IDLE_SPIN)) * dt;
        v.pitch += v.vPitch * dt;
        const decay = Math.exp(-2.2 * dt);
        v.vYaw *= decay;
        v.vPitch *= decay;
        v.pitch += (DEFAULT_PITCH - v.pitch) * (1 - Math.exp(-1.5 * dt));
      }
      draw(reduce ? 0 : now2);
    };
    raf = requestAnimationFrame(frame);
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      mo.disconnect();
    };
  }, []);
  const perPx = () => 1 / ((canvasRef.current?.clientWidth ?? 300) * 0.37);
  const onDown = (e) => {
    if (e.button !== 0) return;
    e.currentTarget.setPointerCapture(e.pointerId);
    const v = view.current;
    v.drag = { x: e.clientX, y: e.clientY, t: performance.now(), id: e.pointerId };
    v.vYaw = v.vPitch = 0;
    setDragging(true);
  };
  const onMove = (e) => {
    const v = view.current;
    const d = v.drag;
    if (!d || d.id !== e.pointerId) return;
    if (e.pointerType === "mouse" && e.buttons === 0) return onUp();
    const now2 = performance.now();
    const dt = Math.max(1, now2 - d.t) / 1e3;
    const dyaw = (e.clientX - d.x) * perPx();
    const dpitch = (e.clientY - d.y) * perPx();
    v.yaw += dyaw;
    v.pitch = Math.max(-1.1, Math.min(1.1, v.pitch + dpitch));
    v.vYaw = v.vYaw * 0.5 + dyaw / dt * 0.5;
    v.vPitch = v.vPitch * 0.5 + dpitch / dt * 0.5;
    d.x = e.clientX;
    d.y = e.clientY;
    d.t = now2;
  };
  const onUp = () => {
    const v = view.current;
    if (!v.drag) return;
    if (performance.now() - v.drag.t > 80) v.vYaw = v.vPitch = 0;
    v.vYaw = Math.max(-8, Math.min(8, v.vYaw));
    v.vPitch = Math.max(-4, Math.min(4, v.vPitch));
    v.drag = null;
    setDragging(false);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "canvas",
    {
      ref: canvasRef,
      "aria-hidden": true,
      "data-cursor": dragging ? "Spin" : "Drag",
      onPointerDown: onDown,
      onPointerMove: onMove,
      onPointerUp: onUp,
      onPointerCancel: onUp,
      onLostPointerCapture: onUp,
      className: `touch-pan-y text-foreground ${dragging ? "cursor-grabbing" : "cursor-grab"} ${className ?? ""}`
    }
  );
}
const ZONE = "Africa/Cairo";
function now() {
  return new Intl.DateTimeFormat("en-GB", {
    timeZone: ZONE,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit"
  }).format(/* @__PURE__ */ new Date());
}
function LocalTime() {
  const [time2, setTime] = reactExports.useState(null);
  reactExports.useEffect(() => {
    setTime(now());
    const id = window.setInterval(() => setTime(now()), 1e3);
    return () => window.clearInterval(id);
  }, []);
  const hour = time2 ? Number(time2.slice(0, 2)) : -1;
  const owl = hour === 0;
  reactExports.useEffect(() => {
    if (owl) solveMystery("midnight");
  }, [owl]);
  if (!time2) return null;
  const awake = hour >= 9 && hour < 24;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-2 font-mono text-xs text-muted-foreground", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `h-1.5 w-1.5 rounded-full ${awake ? "bg-emerald-400" : "bg-amber-400"}` }),
    "Cairo · ",
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "tabular-nums text-foreground", children: time2 }),
    " ·",
    " ",
    owl ? "probably asleep… definitely solving Codeforces 🦉" : awake ? "probably awake" : "probably asleep",
    !owl && // A sleeping owl: the night-owl mystery's clue.
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "span",
      {
        title: "the owl only wakes at midnight, Cairo time",
        "aria-label": "a sleeping owl",
        className: "cursor-help select-none opacity-40 grayscale transition-opacity hover:opacity-90",
        children: [
          "🦉",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-0.5 text-[9px]", children: "z" })
        ]
      }
    )
  ] });
}
function Magnetic({
  children,
  strength = 0.35
}) {
  const ref = reactExports.useRef(null);
  const move = (e) => {
    const el = ref.current;
    if (!el || e.pointerType !== "mouse") return;
    const r = el.getBoundingClientRect();
    const dx = (e.clientX - (r.left + r.width / 2)) * strength;
    const dy = (e.clientY - (r.top + r.height / 2)) * strength;
    el.style.transition = "transform 120ms ease-out";
    el.style.transform = `translate(${dx}px, ${dy}px)`;
  };
  const leave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transition = "transform 600ms cubic-bezier(.2,1.6,.4,1)";
    el.style.transform = "";
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx("span", { ref, className: "inline-block", onPointerMove: move, onPointerLeave: leave, children });
}
const STEP_DESKTOP = 3;
const STEP_MOBILE = 2.5;
const BLEED = 60;
const SPRING = 0.055;
const DAMPING$1 = 0.84;
const PUSH_RADIUS = 70;
const PUSH_FORCE = 5.5;
const SHOCK_RADIUS = 260;
const SHOCK_FORCE = 38;
const MAX_DPR = 2;
function ParticleHeading({ lines, className }) {
  const headingRef = reactExports.useRef(null);
  const canvasRef = reactExports.useRef(null);
  const lineRefs = reactExports.useRef([]);
  const [live, setLive] = reactExports.useState(false);
  reactExports.useEffect(() => {
    const heading = headingRef.current;
    const canvas = canvasRef.current;
    if (!heading || !canvas) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = canvas.getContext("2d", { willReadFrequently: false });
    if (!ctx) return;
    let n = 0;
    let x = new Float32Array(0);
    let y = x;
    let vx = x;
    let vy = x;
    let hx = x;
    let hy = x;
    let color = new Uint32Array(0);
    let W = 0;
    let H = 0;
    let dpr = 1;
    let dot = 2;
    let image = null;
    let pixels = new Uint32Array(0);
    let pointer = null;
    let awake = true;
    let assembled = false;
    let visible = false;
    let cancelled = false;
    const sample = () => {
      const box = heading.getBoundingClientRect();
      dpr = Math.min(MAX_DPR, window.devicePixelRatio || 1);
      W = Math.ceil((box.width + BLEED * 2) * dpr);
      H = Math.ceil((box.height + BLEED * 2) * dpr);
      canvas.width = W;
      canvas.height = H;
      canvas.style.width = `${W / dpr}px`;
      canvas.style.height = `${H / dpr}px`;
      const off = document.createElement("canvas");
      off.width = W;
      off.height = H;
      const o = off.getContext("2d");
      if (!o) return;
      const cs = getComputedStyle(heading);
      o.scale(dpr, dpr);
      o.font = `${cs.fontStyle} ${cs.fontWeight} ${cs.fontSize} ${cs.fontFamily}`;
      o.letterSpacing = cs.letterSpacing === "normal" ? "0px" : cs.letterSpacing;
      o.textBaseline = "alphabetic";
      const root = getComputedStyle(document.documentElement);
      const primary = root.getPropertyValue("--color-primary").trim() || "#22d3ee";
      const accent = root.getPropertyValue("--color-accent").trim() || "#a855f7";
      const ink = getComputedStyle(document.body).color;
      lines.forEach((line, i) => {
        const el = lineRefs.current[i];
        if (!el) return;
        const range = document.createRange();
        range.selectNodeContents(el);
        const r = range.getBoundingClientRect();
        const m = o.measureText(line.text);
        const left = r.left - box.left + BLEED;
        const top = r.top - box.top + BLEED;
        const baseline = top + (r.height + m.fontBoundingBoxAscent - m.fontBoundingBoxDescent) / 2;
        if (line.gradient) {
          const g = o.createLinearGradient(left, 0, left + r.width, 0);
          g.addColorStop(0, primary);
          g.addColorStop(1, accent);
          o.fillStyle = g;
        } else {
          o.fillStyle = ink;
        }
        o.fillText(line.text, left, baseline);
      });
      const data = o.getImageData(0, 0, W, H).data;
      const step22 = Math.round(
        (window.matchMedia("(pointer: coarse)").matches ? STEP_MOBILE : STEP_DESKTOP) * dpr
      );
      dot = Math.max(1, Math.round(step22 * 0.62));
      const homes = [];
      const colors = [];
      for (let py = 0; py < H; py += step22) {
        for (let px = 0; px < W; px += step22) {
          const k = (py * W + px) * 4;
          const a = data[k + 3];
          if (a < 128) continue;
          homes.push(px, py);
          colors.push(255 << 24 | data[k + 2] << 16 | data[k + 1] << 8 | data[k]);
        }
      }
      const prevN = n;
      n = homes.length / 2;
      const nx = new Float32Array(n);
      const ny = new Float32Array(n);
      const nvx = new Float32Array(n);
      const nvy = new Float32Array(n);
      hx = new Float32Array(n);
      hy = new Float32Array(n);
      color = Uint32Array.from(colors);
      for (let i = 0; i < n; i++) {
        hx[i] = homes[i * 2];
        hy[i] = homes[i * 2 + 1];
        if (assembled && i < prevN) {
          nx[i] = x[i];
          ny[i] = y[i];
        } else if (assembled) {
          nx[i] = hx[i];
          ny[i] = hy[i];
        } else {
          nx[i] = Math.random() * W;
          ny[i] = Math.random() * H;
          nvx[i] = (Math.random() - 0.5) * 30 * dpr;
          nvy[i] = (Math.random() - 0.5) * 30 * dpr;
        }
      }
      x = nx;
      y = ny;
      vx = nvx;
      vy = nvy;
      image = ctx.createImageData(W, H);
      pixels = new Uint32Array(image.data.buffer);
      awake = true;
    };
    const draw = () => {
      if (!image) return;
      pixels.fill(0);
      for (let i = 0; i < n; i++) {
        const px = x[i] | 0;
        const py = y[i] | 0;
        if (px < 0 || py < 0 || px + dot > W || py + dot > H) continue;
        const c = color[i];
        for (let dy = 0; dy < dot; dy++) {
          const row = (py + dy) * W + px;
          for (let dx = 0; dx < dot; dx++) pixels[row + dx] = c;
        }
      }
      ctx.putImageData(image, 0, 0);
    };
    const step2 = () => {
      const r = PUSH_RADIUS * dpr;
      const r2 = r * r;
      let moving = false;
      for (let i = 0; i < n; i++) {
        if (pointer) {
          const dx = x[i] - pointer.x;
          const dy = y[i] - pointer.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < r2 && d2 > 0.01) {
            const d = Math.sqrt(d2);
            const f = (1 - d / r) * PUSH_FORCE * dpr;
            vx[i] += dx / d * f;
            vy[i] += dy / d * f;
          }
        }
        vx[i] = (vx[i] + (hx[i] - x[i]) * SPRING) * DAMPING$1;
        vy[i] = (vy[i] + (hy[i] - y[i]) * SPRING) * DAMPING$1;
        x[i] += vx[i];
        y[i] += vy[i];
        if (!moving && (Math.abs(vx[i]) > 0.02 || Math.abs(vy[i]) > 0.02)) moving = true;
      }
      return moving;
    };
    let raf = 0;
    const frame = () => {
      raf = requestAnimationFrame(frame);
      if (!visible || document.hidden || !assembled || !awake) return;
      const moving = step2();
      draw();
      if (!moving && !pointer) {
        x.set(hx);
        y.set(hy);
        draw();
        awake = false;
      }
    };
    const toCanvas = (clientX, clientY) => {
      const r = canvas.getBoundingClientRect();
      if (clientX < r.left || clientX > r.right || clientY < r.top || clientY > r.bottom)
        return null;
      return { x: (clientX - r.left) * dpr, y: (clientY - r.top) * dpr };
    };
    const onPointerMove = (e) => {
      if (e.pointerType !== "mouse" && e.pointerType !== "pen") return;
      pointer = toCanvas(e.clientX, e.clientY);
      if (pointer) awake = true;
    };
    const onTouchMove = (e) => {
      const t = e.touches[0];
      pointer = t ? toCanvas(t.clientX, t.clientY) : null;
      if (pointer) awake = true;
    };
    const onTouchEnd = () => {
      pointer = null;
    };
    const onPointerDown = (e) => {
      const p = toCanvas(e.clientX, e.clientY);
      if (!p) return;
      const rr = SHOCK_RADIUS * dpr;
      for (let i = 0; i < n; i++) {
        const dx = x[i] - p.x;
        const dy = y[i] - p.y;
        const d = Math.hypot(dx, dy);
        if (d > rr || d < 0.01) continue;
        const f = (1 - d / rr) * SHOCK_FORCE * dpr;
        vx[i] += dx / d * f + (Math.random() - 0.5) * 4;
        vy[i] += dy / d * f + (Math.random() - 0.5) * 4;
      }
      awake = true;
    };
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible && !assembled && n) {
        assembled = true;
        awake = true;
      }
    });
    let resizeTimer = 0;
    const resample = () => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(() => {
        if (cancelled) return;
        sample();
        if (!assembled) return;
        draw();
      }, 120);
    };
    const ro = new ResizeObserver(resample);
    const mo = new MutationObserver(resample);
    const start = () => {
      if (cancelled) return;
      sample();
      if (!n) return;
      setLive(true);
      io.observe(canvas);
      ro.observe(heading);
      mo.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
      window.addEventListener("pointermove", onPointerMove, { passive: true });
      window.addEventListener("pointerdown", onPointerDown, { passive: true });
      window.addEventListener("touchmove", onTouchMove, { passive: true });
      window.addEventListener("touchend", onTouchEnd, { passive: true });
      raf = requestAnimationFrame(frame);
    };
    if (document.fonts) void document.fonts.ready.then(start);
    else start();
    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
      window.clearTimeout(resizeTimer);
      io.disconnect();
      ro.disconnect();
      mo.disconnect();
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
    };
  }, [lines]);
  return (
    // Not selectable: the visible words are particles, and a selection box over
    // the hidden text underneath only looks broken. Screen readers still read it.
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative select-none", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "h2",
        {
          ref: headingRef,
          className,
          style: live ? { color: "transparent", WebkitTextFillColor: "transparent" } : void 0,
          children: lines.map((line, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
            i > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                ref: (el) => {
                  lineRefs.current[i] = el;
                },
                className: line.gradient ? "bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent" : void 0,
                style: live && line.gradient ? { backgroundImage: "none" } : void 0,
                children: line.text
              }
            )
          ] }, i))
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "canvas",
        {
          ref: canvasRef,
          "aria-hidden": true,
          className: "pointer-events-none absolute",
          style: { left: -BLEED, top: -BLEED }
        }
      )
    ] })
  );
}
function ScrollLit({ text, className }) {
  const ref = reactExports.useRef(null);
  const words = text.split(" ");
  reactExports.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const spans = Array.from(el.querySelectorAll("[data-word]"));
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const t = Math.min(1, Math.max(0, (vh - r.top) / (vh / 2 + r.height)));
      const lit = t * spans.length;
      spans.forEach((s, i) => {
        s.style.opacity = String(0.18 + 0.82 * Math.min(1, Math.max(0, lit - i)));
      });
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [text]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("p", { ref, className, children: words.map((w, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { "data-word": true, className: "transition-opacity duration-150", children: [
    w,
    i < words.length - 1 ? " " : ""
  ] }, i)) });
}
const HEADING = [{ text: "Let's build" }, { text: "something.", gradient: true }];
function Contact() {
  const found = useMysteries();
  return /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "section",
    {
      id: "contact",
      className: "py-24 border-t border-border grid gap-10 lg:grid-cols-[1fr_340px] lg:items-center",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            ParticleHeading,
            {
              lines: HEADING,
              className: "text-5xl sm:text-7xl font-black tracking-tighter leading-[0.95]"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LocalTime, {}) }),
          found.length === MYSTERIES.length && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-3 font-mono text-xs text-amber-300", children: [
            "★ You found all ",
            MYSTERIES.length,
            " mysteries. You clearly pay attention — let's talk."
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            ScrollLit,
            {
              className: "mt-6 max-w-3xl text-xl font-medium leading-snug tracking-tight sm:text-2xl",
              text: "Open to full-time roles — onsite, hybrid, or remote — and to freelance projects. Comfortable across stacks; currently building FastAPI microservices on Kubernetes and backend services with NestJS/TypeScript. The fastest way to reach me is email."
            }
          ),
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
            /* @__PURE__ */ jsxRuntimeExports.jsx(Magnetic, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, size: "lg", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: `mailto:${profile.email}`, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, {}),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Email me" })
            ] }) }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Magnetic, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, size: "lg", variant: "outline", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: `tel:${profile.phone}`, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, {}),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: profile.phoneDisplay })
            ] }) }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Magnetic, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, size: "lg", variant: "outline", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: linkOf("Codeforces"), target: "_blank", rel: "noreferrer", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CodeXml, {}),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Codeforces" })
            ] }) }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Magnetic, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, size: "lg", variant: "outline", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: linkOf("LeetCode"), target: "_blank", rel: "noreferrer", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Trophy, {}),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "LeetCode" })
            ] }) }) })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("figure", { className: "mx-auto w-full max-w-[340px] select-none", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(DotGlobe, { className: "block aspect-square w-full" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("figcaption", { className: "mt-1 text-center font-mono text-[10px] uppercase tracking-widest text-muted-foreground", children: "Cairo → anywhere · drag to spin" })
        ] })
      ]
    }
  ) });
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
function useTimelineProgress() {
  const listRef = reactExports.useRef(null);
  const fillRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const list = listRef.current;
      const fill = fillRef.current;
      if (!list || !fill) return;
      const r = list.getBoundingClientRect();
      const t = Math.min(1, Math.max(0, (window.innerHeight * 0.6 - r.top) / r.height));
      fill.style.transform = `scaleY(${t})`;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);
  return { listRef, fillRef };
}
function Experience() {
  const { listRef, fillRef } = useTimelineProgress();
  return /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { id: "experience", className: "py-24", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-12", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Briefcase, { className: "w-5 h-5 text-muted-foreground" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-3xl font-bold tracking-tight", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Scramble, { text: "Experience" }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { ref: listRef, className: "relative space-y-12 pl-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { "aria-hidden": true, className: "absolute left-0 top-1 bottom-1 w-px bg-border", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          ref: fillRef,
          className: "timeline-fill absolute inset-0 origin-top bg-gradient-to-b from-primary to-accent",
          style: { transform: "scaleY(0)" }
        }
      ) }),
      experiences.map((exp) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "relative grid sm:grid-cols-[200px_1fr] gap-4 sm:gap-8",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                "aria-hidden": true,
                className: "absolute -left-6 top-2 h-2 w-2 -translate-x-[3.5px] rounded-full border border-primary/60 bg-background"
              }
            ),
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
          ]
        },
        exp.company
      ))
    ] })
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
const STRAP_POINTS = 14;
const GRAVITY$1 = 1700;
const DAMPING = 0.994;
const ITERATIONS$1 = 14;
const SUBSTEPS$1 = 3;
const MAX_STRETCH = 1.7;
const STRAP_MASS = 1;
const HOLE_MASS = 4;
const CARD_MASS = 7;
const HOLE_PX = 16;
const MAX_TILT$1 = 38;
const DRAG_PX = 5;
const REST_SPEED$1 = 4;
const DESKTOP = { cardW: 210, cardH: 300, strap: 270, anchorY: -130, height: 520 };
const MOBILE = { cardW: 176, cardH: 252, strap: 170, anchorY: -16, height: 440 };
function constrain(a, b, len) {
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const d = Math.hypot(dx, dy) || 1e-6;
  const w = a.invM + b.invM;
  if (!w) return;
  const k = (d - len) / d / w;
  a.x += dx * k * a.invM;
  a.y += dy * k * a.invM;
  b.x -= dx * k * b.invM;
  b.y -= dy * k * b.invM;
}
function LanyardBadge({ photo, photoAlt }) {
  const boxRef = reactExports.useRef(null);
  const cardRef = reactExports.useRef(null);
  const tiltRef = reactExports.useRef(null);
  const strapRef = reactExports.useRef(null);
  const [size, setSize] = reactExports.useState(DESKTOP);
  const [flipped, setFlipped] = reactExports.useState(false);
  const [flips, setFlips] = reactExports.useState(0);
  const flip = () => {
    setFlipped((f) => !f);
    setFlips((n) => {
      if (n + 1 === 7) solveMystery("badge");
      return n + 1;
    });
  };
  const [held, setHeld] = reactExports.useState(false);
  const strapId = reactExports.useId();
  const sim = reactExports.useRef(null);
  reactExports.useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const pick = () => setSize(mq.matches ? MOBILE : DESKTOP);
    pick();
    mq.addEventListener("change", pick);
    return () => mq.removeEventListener("change", pick);
  }, []);
  reactExports.useEffect(() => {
    const box = boxRef.current;
    if (!box) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ax = () => box.clientWidth / 2;
    const seg = size.strap / (STRAP_POINTS - 1);
    const rod = size.cardH - HOLE_PX;
    const pts = [];
    for (let i = 0; i < STRAP_POINTS; i++) {
      const t = i / (STRAP_POINTS - 1);
      const x = ax() + (reduce ? 0 : t * t * size.strap * 0.8);
      const y = size.anchorY + (reduce ? t * size.strap : t * size.strap * 0.55);
      const invM = i === 0 ? 0 : i === STRAP_POINTS - 1 ? 1 / HOLE_MASS : 1 / STRAP_MASS;
      pts.push({ x, y, px: x, py: y, invM });
    }
    const hole = pts[STRAP_POINTS - 1];
    const bx = hole.x + (reduce ? 0 : rod * 0.5);
    const by = hole.y + (reduce ? rod : rod * 0.85);
    pts.push({ x: bx, y: by, px: bx, py: by, invM: 1 / CARD_MASS });
    sim.current = { pts, seg, grab: null, asleep: false, tilt: 0 };
    const paint = () => {
      const s = sim.current;
      const h = s.pts[STRAP_POINTS - 1];
      const b = s.pts[STRAP_POINTS];
      const angle = Math.atan2(-(b.x - h.x), b.y - h.y);
      const card = cardRef.current;
      if (card) {
        card.style.transform = `translate(${h.x - size.cardW / 2}px, ${h.y - HOLE_PX}px) rotate(${angle}rad)`;
      }
      if (tiltRef.current) tiltRef.current.style.setProperty("--tilt", `${s.tilt}deg`);
      let d = `M${s.pts[0].x},${s.pts[0].y}`;
      for (let i = 1; i < STRAP_POINTS - 1; i++) {
        const p = s.pts[i];
        const n = s.pts[i + 1];
        d += ` Q${p.x},${p.y} ${(p.x + n.x) / 2},${(p.y + n.y) / 2}`;
      }
      d += ` L${h.x},${h.y}`;
      strapRef.current?.setAttribute("d", d);
    };
    if (reduce) {
      paint();
      return;
    }
    let raf = 0;
    let last = performance.now();
    let nextBreeze = last + 5e3;
    let visible = true;
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
    });
    io.observe(box);
    const frame = (now2) => {
      raf = requestAnimationFrame(frame);
      const s = sim.current;
      const elapsed = Math.min(1 / 30, (now2 - last) / 1e3);
      last = now2;
      if (!visible || document.hidden) return;
      if (now2 > nextBreeze && !s.grab) {
        const b2 = s.pts[STRAP_POINTS];
        b2.px -= (Math.random() - 0.5) * 3;
        s.asleep = false;
        nextBreeze = now2 + 5e3 + Math.random() * 5e3;
      }
      if (s.asleep && !s.grab) return;
      const dt = elapsed / SUBSTEPS$1;
      const anchorX = ax();
      for (let step2 = 0; step2 < SUBSTEPS$1; step2++) {
        for (const p of s.pts) {
          if (!p.invM) continue;
          const vx2 = (p.x - p.px) * DAMPING;
          const vy2 = (p.y - p.py) * DAMPING;
          p.px = p.x;
          p.py = p.y;
          p.x += vx2;
          p.y += vy2 + GRAVITY$1 * dt * dt;
        }
        const top = s.pts[0];
        top.x = top.px = anchorX;
        top.y = top.py = size.anchorY;
        for (let k = 0; k < ITERATIONS$1; k++) {
          for (let i = 0; i < STRAP_POINTS - 1; i++) constrain(s.pts[i], s.pts[i + 1], s.seg);
          constrain(s.pts[STRAP_POINTS - 1], s.pts[STRAP_POINTS], rod);
          if (s.grab) {
            const h2 = s.pts[STRAP_POINTS - 1];
            const b2 = s.pts[STRAP_POINTS];
            const w0 = 1 - s.grab.s;
            const w1 = s.grab.s;
            const gx = h2.x + (b2.x - h2.x) * w1;
            const gy = h2.y + (b2.y - h2.y) * w1;
            const norm = w0 * w0 + w1 * w1;
            const ex = s.grab.tx - gx;
            const ey = s.grab.ty - gy;
            h2.x += ex * w0 / norm;
            h2.y += ey * w0 / norm;
            b2.x += ex * w1 / norm;
            b2.y += ey * w1 / norm;
          }
        }
        const h = s.pts[STRAP_POINTS - 1];
        const dx = h.x - anchorX;
        const dy = h.y - size.anchorY;
        const d = Math.hypot(dx, dy);
        const max = size.strap * MAX_STRETCH;
        if (d > max) {
          h.x = anchorX + dx / d * max;
          h.y = size.anchorY + dy / d * max;
        }
      }
      const b = s.pts[STRAP_POINTS];
      const vx = (b.x - b.px) / dt;
      const vy = (b.y - b.py) / dt;
      const target = Math.max(-MAX_TILT$1, Math.min(MAX_TILT$1, vx * 0.035));
      s.tilt += (target - s.tilt) * 0.12;
      paint();
      const still = s.pts.every((p) => Math.hypot(p.x - p.px, p.y - p.py) / dt < REST_SPEED$1);
      if (still && !s.grab && Math.abs(s.tilt) < 0.2 && Math.hypot(vx, vy) < REST_SPEED$1) {
        s.asleep = true;
      }
    };
    paint();
    raf = requestAnimationFrame(frame);
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
    };
  }, [size]);
  const local = (e) => {
    const r = boxRef.current.getBoundingClientRect();
    return [e.clientX - r.left, e.clientY - r.top];
  };
  const release = () => {
    const s = sim.current;
    if (!s?.grab) return;
    const clicked = !s.grab.moved;
    s.grab = null;
    s.asleep = false;
    setHeld(false);
    if (clicked) flip();
  };
  const onDown = (e) => {
    const s = sim.current;
    if (!s || e.button !== 0) return;
    if (e.target.closest("a")) return;
    e.currentTarget.setPointerCapture(e.pointerId);
    const [x, y] = local(e);
    const h = s.pts[STRAP_POINTS - 1];
    const b = s.pts[STRAP_POINTS];
    const ax = b.x - h.x;
    const ay = b.y - h.y;
    const len2 = ax * ax + ay * ay || 1;
    const along = ((x - h.x) * ax + (y - h.y) * ay) / len2;
    s.grab = {
      s: Math.max(0.05, Math.min(1, along)),
      tx: x,
      ty: y,
      startX: x,
      startY: y,
      moved: false
    };
    s.asleep = false;
    setHeld(true);
  };
  const onMove = (e) => {
    const g = sim.current?.grab;
    if (!g) return;
    if (e.pointerType === "mouse" && e.buttons === 0) return release();
    const [x, y] = local(e);
    g.tx = x;
    g.ty = y;
    if (Math.hypot(x - g.startX, y - g.startY) > DRAG_PX) g.moved = true;
  };
  reactExports.useEffect(() => {
    const drop = () => {
      const s = sim.current;
      if (s?.grab) s.grab.moved = true;
      release();
    };
    window.addEventListener("blur", drop);
    return () => window.removeEventListener("blur", drop);
  }, []);
  const [first, , second] = profile.name.toUpperCase().split(/( )/);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      ref: boxRef,
      className: "relative z-20 w-full select-none md:w-[320px]",
      style: { height: size.height },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "svg",
          {
            className: "pointer-events-none absolute inset-0 h-full w-full overflow-visible",
            "aria-hidden": true,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "path",
                {
                  ref: strapRef,
                  fill: "none",
                  stroke: "var(--color-primary)",
                  strokeWidth: "11",
                  strokeLinecap: "round",
                  strokeLinejoin: "round",
                  opacity: "0.9",
                  id: strapId
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "text",
                {
                  fontSize: "6.5",
                  fontWeight: "700",
                  letterSpacing: "1.6",
                  fill: "var(--color-background)",
                  dominantBaseline: "middle",
                  className: "font-mono",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx("textPath", { href: `#${strapId}`, startOffset: "6", children: `${profile.domain.toUpperCase()} • `.repeat(8) })
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            ref: cardRef,
            onPointerDown: onDown,
            onPointerMove: onMove,
            onPointerUp: release,
            onPointerCancel: release,
            onLostPointerCapture: release,
            "data-cursor": held ? "Throw" : "Grab",
            className: `absolute left-0 top-0 touch-none ${held ? "cursor-grabbing" : "cursor-grab"}`,
            style: {
              width: size.cardW,
              height: size.cardH,
              transformOrigin: `50% ${HOLE_PX}px`,
              perspective: 900
            },
            role: "button",
            tabIndex: 0,
            "aria-label": `${profile.name}'s badge. Press to flip it over.`,
            onKeyDown: (e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                flip();
              }
            },
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                ref: tiltRef,
                className: "relative h-full w-full [transform-style:preserve-3d]",
                style: { transform: "rotateY(var(--tilt, 0deg))" },
                children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    className: "relative h-full w-full transition-transform duration-700 [transform-style:preserve-3d]",
                    style: { transform: `rotateY(${flipped ? 180 : 0}deg)` },
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "badge-face absolute inset-0 flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#0d1224] text-white shadow-[0_24px_60px_-20px_rgba(0,0,0,0.8)]", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative h-[46%] overflow-hidden", children: [
                          photo && /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "img",
                            {
                              src: photo,
                              alt: photoAlt,
                              draggable: false,
                              className: "h-full w-full object-cover object-[50%_30%]"
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-[#0d1224] via-transparent to-transparent" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute left-1/2 top-2.5 h-2 w-9 -translate-x-1/2 rounded-full bg-[#0d1224] ring-1 ring-white/20" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "div",
                            {
                              className: "absolute left-1/2 top-6 flex -translate-x-1/2 gap-1",
                              title: flips >= 7 ? "VIP" : "punch card · 7 holes",
                              "aria-hidden": true,
                              children: Array.from({ length: 7 }, (_, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "span",
                                {
                                  className: `h-1.5 w-1.5 rounded-full border ${i < Math.min(flips, 7) ? "border-amber-300 bg-amber-300" : "border-white/50 bg-[#0d1224]/70"}`
                                },
                                i
                              ))
                            }
                          )
                        ] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-1 flex-col px-4 pb-3 pt-1", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-mono text-[9px] uppercase tracking-[0.25em] text-cyan-300", children: profile.domain }),
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-1 text-xl font-black leading-[0.95] tracking-tight", children: [
                            first,
                            /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
                            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "bg-gradient-to-r from-cyan-300 to-violet-400 bg-clip-text text-transparent", children: second })
                          ] }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1.5 text-[11px] text-white/60", children: profile.role }),
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-auto flex items-end justify-between", children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-mono text-[8px] uppercase tracking-widest text-white/40", children: "Access" }),
                              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-mono text-[10px] font-bold uppercase tracking-wider text-emerald-300", children: "All areas" })
                            ] }),
                            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-7 items-end gap-[1.5px]", "aria-hidden": true, children: "3121413211231412".split("").map((w, i) => /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-full bg-white/70", style: { width: Number(w) } }, i)) })
                          ] })
                        ] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-1.5 bg-gradient-to-r from-cyan-400 to-violet-500" })
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "badge-face badge-back absolute inset-0 flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#0d1224] p-4 text-white shadow-[0_24px_60px_-20px_rgba(0,0,0,0.8)]", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto mt-0.5 h-2 w-9 rounded-full bg-black/60 ring-1 ring-white/20" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 font-mono text-[9px] uppercase tracking-[0.25em] text-cyan-300", children: "If found, hire" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1 text-sm font-bold", children: profile.name }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-0.5 text-[11px] text-white/60", children: profile.location }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 space-y-1.5 font-mono text-[10px]", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "a",
                            {
                              href: `mailto:${profile.email}`,
                              className: "block truncate text-white/80 underline-offset-2 hover:text-cyan-300 hover:underline",
                              children: profile.email
                            }
                          ),
                          links.map((l) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                            "a",
                            {
                              href: l.url,
                              target: "_blank",
                              rel: "noreferrer",
                              className: "block text-white/80 underline-offset-2 hover:text-cyan-300 hover:underline",
                              children: [
                                l.label,
                                " ↗"
                              ]
                            },
                            l.label
                          ))
                        ] }),
                        flips >= 7 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-3 rounded border border-amber-300/60 px-2 py-1 text-center font-mono text-[9px] font-bold uppercase tracking-widest text-amber-300", children: "★ VIP pass · persistence noted" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-auto font-mono text-[8px] uppercase tracking-widest text-white/35", children: "Click to flip back" })
                      ] })
                    ]
                  }
                )
              }
            )
          }
        )
      ]
    }
  );
}
const acpc = "/assets/me-acpc-Bzm_CyMY.jpeg";
const photos = [
  { src: acpc, alt: "Ahmed Khaled holding balloons at the ACPC finals" }
];
function useSinkOnScroll() {
  const ref = reactExports.useRef(null);
  reactExports.useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const t = Math.min(1, Math.max(0, window.scrollY / (el.offsetHeight || 1)));
      el.style.transform = t ? `translateY(${t * 80}px) scale(${1 - t * 0.08})` : "";
      el.style.opacity = String(1 - t * 0.7);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);
  return ref;
}
function Hero() {
  const ref = useSinkOnScroll();
  return /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "section",
    {
      ref,
      className: "py-20 sm:py-28 grid md:grid-cols-[1fr_320px] gap-12 items-center origin-top will-change-transform",
      children: [
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
            /* @__PURE__ */ jsxRuntimeExports.jsx(Magnetic, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: "#projects", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "View my work" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowUpRight, {})
            ] }) }) }),
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
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative w-full justify-self-center md:w-auto md:justify-self-end", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LanyardBadge, { photo: photos[0]?.src, photoAlt: photos[0]?.alt }) })
      ]
    }
  ) });
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
const Dialog = Root;
const DialogPortal = Portal;
const DialogOverlay = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Overlay,
  {
    ref,
    className: cn(
      "fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    ),
    ...props
  }
));
DialogOverlay.displayName = Overlay.displayName;
const DialogContent = reactExports.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogPortal, { children: [
  /* @__PURE__ */ jsxRuntimeExports.jsx(DialogOverlay, {}),
  /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Content,
    {
      ref,
      className: cn(
        "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 sm:rounded-lg",
        className
      ),
      ...props,
      children: [
        children,
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Close, { className: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background cursor-pointer transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-4 w-4" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "sr-only", children: "Close" })
        ] })
      ]
    }
  )
] }));
DialogContent.displayName = Content.displayName;
const DialogHeader = ({ className, ...props }) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: cn("flex flex-col space-y-1.5 text-center sm:text-left", className), ...props });
DialogHeader.displayName = "DialogHeader";
const DialogTitle = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Title,
  {
    ref,
    className: cn("text-lg font-semibold leading-none tracking-tight", className),
    ...props
  }
));
DialogTitle.displayName = Title.displayName;
const DialogDescription = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Description,
  {
    ref,
    className: cn("text-sm text-muted-foreground", className),
    ...props
  }
));
DialogDescription.displayName = Description.displayName;
function cardEdge(project, strength) {
  const rgb = project.accent ? "251, 191, 36" : "255, 255, 255";
  const glow = { rest: 26, lifted: 46, dialog: 60 }[strength];
  const alpha = { rest: 0.34, lifted: 0.6, dialog: 0.5 }[strength];
  const border = { rest: 0.42, lifted: 0.75, dialog: 0.65 }[strength];
  const inner = { rest: 0.3, lifted: 0.5, dialog: 0.45 }[strength];
  return {
    borderColor: `rgba(${rgb}, ${border})`,
    boxShadow: `0 0 ${glow}px -6px rgba(${rgb}, ${alpha}), inset 0 1px 0 rgba(${rgb}, ${inner}), 0 20px 45px -22px rgba(0, 0, 0, 0.95)`
  };
}
function ProjectDialog({
  project,
  onClose
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: project !== null, onOpenChange: (open) => !open && onClose(), children: /* @__PURE__ */ jsxRuntimeExports.jsx(
    DialogContent,
    {
      className: "max-h-[85vh] overflow-y-auto sm:max-w-2xl",
      style: project ? cardEdge(project, "dialog") : void 0,
      children: project && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogHeader, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-xs text-muted-foreground", children: project.tag }),
            project.role && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "rounded border border-primary/40 px-2 py-0.5 font-mono text-[10px] uppercase tracking-widest text-primary", children: project.role })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { className: "text-2xl font-bold tracking-tight", children: project.title }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(DialogDescription, { className: "text-sm leading-relaxed", children: project.description })
        ] }),
        project.highlights && /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-3 text-sm text-muted-foreground leading-relaxed", children: project.highlights.map((h) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { "aria-hidden": true, className: "text-primary", children: "–" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: h })
        ] }, h)) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3 border-t border-border pt-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-2 font-mono text-[10px] uppercase tracking-widest text-muted-foreground", children: "Technologies" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-1.5", children: project.stack.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "secondary", className: "font-mono text-[10px]", children: s }, s)) })
          ] }),
          project.patterns && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-2 font-mono text-[10px] uppercase tracking-widest text-muted-foreground", children: "Architecture & patterns" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs font-mono text-muted-foreground", children: project.patterns.join(" · ") })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-border pt-4 text-xs font-mono", children: [
          project.repo && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "a",
            {
              href: project.repo,
              target: "_blank",
              rel: "noreferrer noopener",
              className: "inline-flex items-center gap-1 text-muted-foreground underline decoration-border underline-offset-4 transition-colors hover:text-foreground",
              children: [
                project.repoLabel ?? "GitHub",
                /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowUpRight, { className: "w-3 h-3" })
              ]
            }
          ),
          project.links?.map((l) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "a",
            {
              href: l.url,
              target: "_blank",
              rel: "noreferrer noopener",
              className: "inline-flex items-center gap-1 text-muted-foreground underline decoration-border underline-offset-4 transition-colors hover:text-foreground",
              children: [
                l.label,
                /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowUpRight, { className: "w-3 h-3" })
              ]
            },
            l.url
          )),
          project.privateRepo && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground/70", children: project.privateNote ?? "Private repo · available on request" }),
          !project.repo && !project.privateRepo && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground/70", children: "Repo link coming soon" })
        ] })
      ] })
    }
  ) });
}
const C = {
  cyan: "#22d3ee",
  violet: "#a78bfa",
  amber: "#fbbf24",
  green: "#34d399",
  pink: "#f472b6",
  ink: "#e2e8f0",
  dim: "#334155"
};
function Cover({ motif, active = true }) {
  const Scene = SCENES[motif];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "svg",
    {
      viewBox: "0 0 320 200",
      className: `h-full w-full ${active ? "cover-live" : ""}`,
      "aria-hidden": true,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("defs", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("linearGradient", { id: `cover-bg-${motif}`, x1: "0", y1: "0", x2: "1", y2: "1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "0", stopColor: "#0b1224" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "1", stopColor: "#171433" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("pattern", { id: `cover-dots-${motif}`, width: "14", height: "14", patternUnits: "userSpaceOnUse", children: /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: "1", cy: "1", r: "0.8", fill: "#fff", opacity: "0.07" }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("rect", { width: "320", height: "200", fill: `url(#cover-bg-${motif})` }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("rect", { width: "320", height: "200", fill: `url(#cover-dots-${motif})` }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Scene, {})
      ]
    }
  );
}
function Neural() {
  const layers = [
    [50, 70, 100, 130, 150],
    [70, 100, 130],
    [55, 85, 115, 145]
  ];
  const xs = [70, 150, 230];
  const pts = layers.map((ys, i) => ys.map((y) => ({ x: xs[i], y })));
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("g", { children: [
    pts.slice(0, -1).flatMap(
      (col, i) => col.flatMap(
        (a, j) => pts[i + 1].map((b, k) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "line",
          {
            x1: a.x,
            y1: a.y,
            x2: b.x,
            y2: b.y,
            stroke: C.violet,
            strokeOpacity: 0.18
          },
          `${i}${j}${k}`
        ))
      )
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "path",
      {
        d: "M70 100 L150 70 L230 115",
        fill: "none",
        stroke: C.cyan,
        strokeWidth: 2,
        strokeDasharray: "6 200",
        className: "cover-flow"
      }
    ),
    pts.flat().map((p, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      "circle",
      {
        cx: p.x,
        cy: p.y,
        r: 5,
        fill: "#0b1224",
        stroke: i % 4 === 0 ? C.cyan : C.violet,
        strokeWidth: 1.5
      },
      i
    )),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("g", { transform: "translate(250 30)", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("rect", { width: "54", height: "26", rx: "13", fill: C.violet, opacity: 0.9 }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M12 26 l-4 8 l10 -8z", fill: C.violet, opacity: 0.9 }),
      [16, 27, 38].map((x, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        "circle",
        {
          cx: x,
          cy: 13,
          r: 2.6,
          fill: "#0b1224",
          className: "cover-typing",
          style: { animationDelay: `${i * 0.18}s` }
        },
        x
      ))
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "text",
      {
        x: "22",
        y: "186",
        fontSize: "9",
        fontFamily: "ui-monospace, monospace",
        fill: C.ink,
        opacity: 0.4,
        children: "mistral 7b · rag · faiss · lora"
      }
    )
  ] });
}
function Services() {
  const hex = (cx, cy, r2) => Array.from({ length: 6 }, (_, i) => {
    const a = Math.PI / 3 * i + Math.PI / 6;
    return `${cx + r2 * Math.cos(a)},${cy + r2 * Math.sin(a)}`;
  }).join(" ");
  const r = 30;
  const w = r * Math.sqrt(3);
  const cells = [
    { x: 160, y: 100, label: "spring", c: C.cyan },
    { x: 160 - w, y: 100, label: "jwt", c: C.violet },
    { x: 160 + w, y: 100, label: "jpa", c: C.violet },
    { x: 160 - w / 2, y: 100 - r * 1.5, label: "", c: C.violet },
    { x: 160 + w / 2, y: 100 - r * 1.5, label: "", c: C.violet },
    { x: 160 - w / 2, y: 100 + r * 1.5, label: "", c: C.violet },
    { x: 160 + w / 2, y: 100 + r * 1.5, label: "", c: C.violet }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("g", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: "160", cy: "100", r: "30", fill: "none", stroke: C.cyan, className: "cover-ping" }),
    cells.map((h, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("g", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "polygon",
        {
          points: hex(h.x, h.y, r - 2),
          fill: i === 0 ? "rgba(34,211,238,.14)" : "rgba(167,139,250,.08)",
          stroke: h.c,
          strokeOpacity: i === 0 ? 0.9 : 0.45
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "text",
        {
          x: h.x,
          y: h.y + 3,
          textAnchor: "middle",
          fontSize: "8.5",
          fontFamily: "ui-monospace, monospace",
          fill: C.ink,
          opacity: 0.75,
          children: h.label
        }
      )
    ] }, i)),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "text",
      {
        x: "22",
        y: "186",
        fontSize: "9",
        fontFamily: "ui-monospace, monospace",
        fill: C.ink,
        opacity: 0.4,
        children: "spring boot · jwt · jpa"
      }
    )
  ] });
}
function Editor() {
  const lines = [
    [0, 120],
    [14, 90],
    [14, 150, "add"],
    [14, 130, "add"],
    [28, 80],
    [14, 110, "del"],
    [0, 60]
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("g", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "rect",
      {
        x: "30",
        y: "24",
        width: "260",
        height: "152",
        rx: "10",
        fill: "#0e1528",
        stroke: "#fff",
        strokeOpacity: 0.08
      }
    ),
    [C.pink, C.amber, C.green].map((c, i) => /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: 46 + i * 12, cy: 38, r: 3.5, fill: c, opacity: 0.8 }, c)),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "text",
      {
        x: "96",
        y: "41",
        fontSize: "8.5",
        fontFamily: "ui-monospace, monospace",
        fill: C.ink,
        opacity: 0.45,
        children: "extension.ts"
      }
    ),
    lines.map(([indent, w, kind], i) => {
      const y = 58 + i * 15;
      return /* @__PURE__ */ jsxRuntimeExports.jsxs("g", { children: [
        kind && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "rect",
          {
            x: "34",
            y: y - 6,
            width: "252",
            height: "13",
            fill: kind === "add" ? "rgba(52,211,153,.12)" : "rgba(244,114,182,.1)"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "text",
          {
            x: "40",
            y: y + 3,
            fontSize: "8",
            fontFamily: "ui-monospace, monospace",
            fill: kind === "add" ? C.green : kind === "del" ? C.pink : C.dim,
            children: kind === "add" ? "+" : kind === "del" ? "−" : i + 1
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "rect",
          {
            x: 56 + indent,
            y: y - 2.5,
            width: w,
            height: 5,
            rx: 2.5,
            fill: kind === "add" ? C.green : kind === "del" ? C.pink : i % 2 ? C.violet : C.cyan,
            opacity: kind ? 0.7 : 0.45
          }
        )
      ] }, i);
    }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("rect", { x: "192", y: "146", width: "84", height: "20", rx: "10", fill: C.amber }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "text",
      {
        x: "234",
        y: "159",
        textAnchor: "middle",
        fontSize: "8.5",
        fontWeight: "700",
        fontFamily: "ui-monospace, monospace",
        fill: "#111827",
        children: "Copy for Claude"
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("rect", { x: "160", y: "102", width: "1.5", height: "10", fill: C.ink, className: "cover-caret" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "text",
      {
        x: "22",
        y: "192",
        fontSize: "9",
        fontFamily: "ui-monospace, monospace",
        fill: C.ink,
        opacity: 0.4,
        children: "merged · open source"
      }
    )
  ] });
}
function Chat() {
  const bubbles = [
    { x: 34, y: 44, w: 110, me: false, o: 0.18 },
    { x: 150, y: 70, w: 120, me: true, o: 0.35 },
    { x: 34, y: 98, w: 140, me: false, o: 0.6 },
    { x: 130, y: 126, w: 140, me: true, o: 1 }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("g", { children: [
    bubbles.map((b, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("g", { opacity: b.o, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "rect",
        {
          x: b.x,
          y: b.y,
          width: b.w,
          height: 20,
          rx: 10,
          fill: b.me ? C.cyan : "#1e293b",
          opacity: b.me ? 0.85 : 1
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "rect",
        {
          x: b.x + 12,
          y: b.y + 8,
          width: b.w - 40,
          height: 4,
          rx: 2,
          fill: b.me ? "#0b1224" : C.ink,
          opacity: 0.5
        }
      )
    ] }, i)),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("g", { transform: "translate(262 40)", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { r: "22", fill: "none", stroke: C.dim, strokeWidth: 3 }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "circle",
        {
          r: "22",
          fill: "none",
          stroke: C.pink,
          strokeWidth: 3,
          strokeLinecap: "round",
          strokeDasharray: "138",
          className: "cover-countdown",
          transform: "rotate(-90)"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "text",
        {
          y: "3",
          textAnchor: "middle",
          fontSize: "9",
          fontWeight: "700",
          fontFamily: "ui-monospace, monospace",
          fill: C.ink,
          children: "0:59"
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "text",
      {
        x: "34",
        y: "168",
        fontSize: "9",
        fontFamily: "ui-monospace, monospace",
        fill: C.pink,
        opacity: 0.8,
        children: "channel self-destructs in 59s"
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "text",
      {
        x: "22",
        y: "190",
        fontSize: "9",
        fontFamily: "ui-monospace, monospace",
        fill: C.ink,
        opacity: 0.4,
        children: "websockets · presence · expiry events"
      }
    )
  ] });
}
function Cli() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("g", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "rect",
      {
        x: "24",
        y: "30",
        width: "196",
        height: "140",
        rx: "10",
        fill: "#0a0f1d",
        stroke: "#fff",
        strokeOpacity: 0.08
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("g", { fontSize: "8.5", fontFamily: "ui-monospace, monospace", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("text", { x: "36", y: "54", fill: C.green, children: [
        "$ ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("tspan", { fill: C.ink, children: "backup \\" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("text", { x: "48", y: "68", fill: C.ink, opacity: 0.7, children: "--db postgres --gzip" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("text", { x: "36", y: "88", fill: C.ink, opacity: 0.5, children: "▸ dumping schema…" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("text", { x: "36", y: "102", fill: C.ink, opacity: 0.5, children: "▸ compressing (gzip)" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("text", { x: "36", y: "136", fill: C.ink, opacity: 0.5, children: "▸ notify: email sent" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("rect", { x: "36", y: "112", width: "170", height: "7", rx: "3.5", fill: C.dim }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "rect",
      {
        x: "36",
        y: "112",
        width: "170",
        height: "7",
        rx: "3.5",
        fill: C.cyan,
        className: "cover-progress"
      }
    ),
    [
      { y: 46, c: C.cyan, l: "PostgreSQL" },
      { y: 104, c: C.amber, l: "MySQL" }
    ].map((d) => /* @__PURE__ */ jsxRuntimeExports.jsxs("g", { transform: `translate(262 ${d.y})`, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("ellipse", { cx: "0", cy: "0", rx: "24", ry: "7", fill: d.c, opacity: 0.85 }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: `M-24 0 v26 a24 7 0 0 0 48 0 v-26`, fill: d.c, opacity: 0.35 }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("ellipse", { cx: "0", cy: "13", rx: "24", ry: "7", fill: "none", stroke: d.c, strokeOpacity: 0.6 }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "text",
        {
          y: "48",
          textAnchor: "middle",
          fontSize: "8",
          fontFamily: "ui-monospace, monospace",
          fill: C.ink,
          opacity: 0.6,
          children: d.l
        }
      )
    ] }, d.l)),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "text",
      {
        x: "22",
        y: "190",
        fontSize: "9",
        fontFamily: "ui-monospace, monospace",
        fill: C.ink,
        opacity: 0.4,
        children: "factory · adapter · strategy · command"
      }
    )
  ] });
}
function Snake() {
  const cell = 14;
  const path = "M42 142 H140 V86 H210 V58 H280";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("g", { children: [
    Array.from(
      { length: 21 },
      (_, x) => Array.from({ length: 12 }, (_2, y) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        "rect",
        {
          x: 16 + x * cell,
          y: 16 + y * cell,
          width: 2,
          height: 2,
          fill: "#fff",
          opacity: 0.08
        },
        `${x}-${y}`
      ))
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "path",
      {
        d: path,
        fill: "none",
        stroke: C.green,
        strokeOpacity: 0.12,
        strokeWidth: 10,
        strokeLinecap: "square"
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "path",
      {
        d: path,
        fill: "none",
        stroke: C.green,
        strokeWidth: 10,
        strokeLinecap: "square",
        strokeDasharray: "120 400",
        className: "cover-snake"
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("rect", { x: "276", y: "52", width: "12", height: "12", rx: "3", fill: C.pink, className: "cover-food" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "text",
      {
        x: "22",
        y: "190",
        fontSize: "9",
        fontFamily: "ui-monospace, monospace",
        fill: C.ink,
        opacity: 0.4,
        children: "score: 012 · itch.io"
      }
    )
  ] });
}
const SCENES = {
  neural: Neural,
  services: Services,
  editor: Editor,
  chat: Chat,
  cli: Cli,
  snake: Snake
};
const FOLLOW = 0.16;
const MAX_TILT = 9;
function ProjectIndex({
  projects: projects2,
  onSelect
}) {
  const [active, setActive] = reactExports.useState(null);
  const [finePointer, setFinePointer] = reactExports.useState(false);
  const previewRef = reactExports.useRef(null);
  const target = reactExports.useRef({ x: 0, y: 0 });
  reactExports.useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    const set = () => setFinePointer(mq.matches);
    set();
    mq.addEventListener("change", set);
    return () => mq.removeEventListener("change", set);
  }, []);
  reactExports.useEffect(() => {
    if (!finePointer) return;
    let raf = 0;
    let x = target.current.x;
    let y = target.current.y;
    let tilt = 0;
    let lift = -115;
    const frame = () => {
      raf = requestAnimationFrame(frame);
      const el = previewRef.current;
      if (!el) return;
      const dx = target.current.x - x;
      x += dx * FOLLOW;
      y += (target.current.y - y) * FOLLOW;
      tilt += (Math.max(-MAX_TILT, Math.min(MAX_TILT, dx * 0.08)) - tilt) * 0.2;
      lift += ((y < 300 ? 18 : -115) - lift) * 0.2;
      el.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, ${lift}%) rotate(${tilt}deg)`;
    };
    raf = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(raf);
  }, [finePointer]);
  const track = (e) => {
    target.current = { x: e.clientX, y: e.clientY };
  };
  const shown = active === null ? null : projects2[active];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", onPointerMove: track, onPointerLeave: () => setActive(null), children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("ol", { className: "group/index border-t border-border", children: projects2.map((p, i) => {
      const isActive = active === i;
      return /* @__PURE__ */ jsxRuntimeExports.jsx("li", { className: "border-b border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          type: "button",
          onClick: () => onSelect(p),
          onPointerEnter: (e) => {
            if (e.pointerType === "mouse") {
              target.current = { x: e.clientX, y: e.clientY };
              setActive(i);
            }
          },
          onFocus: () => setActive(i),
          onBlur: () => setActive(null),
          "data-cursor": "Open",
          className: `group/row relative grid w-full grid-cols-[2.25rem_1fr_auto] items-center gap-x-3 overflow-hidden py-5 text-left transition-opacity duration-300 sm:grid-cols-[3rem_minmax(0,1fr)_minmax(0,14rem)_2.5rem] sm:gap-x-6 sm:py-6 ${active !== null && !isActive ? "opacity-35" : "opacity-100"}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                "aria-hidden": true,
                className: "absolute inset-0 origin-left bg-gradient-to-r from-primary/10 via-accent/5 to-transparent transition-transform duration-500 ease-out",
                style: { transform: isActive ? "scaleX(1)" : "scaleX(0)" }
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "relative self-start pt-2 font-mono text-xs tabular-nums text-muted-foreground sm:self-center sm:pt-0", children: String(i + 2).padStart(2, "0") }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "relative min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: `block text-2xl font-bold leading-tight tracking-tight transition-transform duration-500 ease-out sm:text-4xl ${isActive ? "translate-x-2 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent" : ""}`,
                  children: p.shortName
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mt-1 block text-sm text-muted-foreground", children: p.short }),
              !finePointer && p.motif && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mt-3 block aspect-[16/10] w-full max-w-sm overflow-hidden rounded-lg border border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Cover, { motif: p.motif }) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "relative hidden min-w-0 text-right sm:block", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "block truncate font-mono text-[10px] uppercase tracking-widest text-muted-foreground", children: p.tag }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mt-1 block truncate font-mono text-[11px] text-foreground/70", children: p.stack.slice(0, 3).join(" · ") })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: `relative flex h-9 w-9 items-center justify-center self-start rounded-full border transition-all duration-300 sm:self-center ${isActive ? "rotate-45 border-primary bg-primary text-primary-foreground" : "border-border text-muted-foreground"}`,
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowUpRight, { className: "h-4 w-4" })
              }
            )
          ]
        }
      ) }, p.title);
    }) }),
    finePointer && /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        ref: previewRef,
        "aria-hidden": true,
        className: "pointer-events-none fixed left-0 top-0 z-40 w-[300px]",
        style: { transform: "translate3d(-1000px,-1000px,0)" },
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "overflow-hidden rounded-xl border border-white/10 bg-background shadow-[0_30px_60px_-20px_rgba(0,0,0,0.85)] transition-[opacity,transform] duration-300 ease-out",
            style: {
              opacity: shown ? 1 : 0,
              transform: shown ? "scale(1)" : "scale(0.85)"
            },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative aspect-[16/10]", children: projects2.map(
                (p, i) => p.motif ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "absolute inset-0 transition-opacity duration-300",
                    style: { opacity: active === i ? 1 : 0 },
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(Cover, { motif: p.motif, active: active === i })
                  },
                  p.title
                ) : null
              ) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-2 px-3 py-2 font-mono text-[10px] text-muted-foreground", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate", children: shown?.tag }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "shrink-0 text-primary", children: "open ↗" })
              ] })
            ]
          }
        )
      }
    )
  ] });
}
const NODES = [
  {
    id: "mobile",
    label: "Mobile app",
    sub: "client",
    x: 90,
    y: 150,
    kind: "client",
    info: "Where users start requests and async jobs."
  },
  {
    id: "web",
    label: "Web dashboard",
    sub: "client",
    x: 90,
    y: 300,
    kind: "client",
    info: "A second client of the same API."
  },
  {
    id: "payments",
    label: "Payments",
    sub: "webhooks",
    x: 90,
    y: 470,
    kind: "external",
    info: "Third-party events arriving as webhooks."
  },
  {
    id: "edge",
    label: "Edge",
    sub: "TLS · routing",
    x: 255,
    y: 300,
    kind: "edge",
    replicas: 2,
    perPod: 64,
    info: "Terminates TLS and routes only to instances that are ready."
  },
  {
    id: "api",
    label: "Core API",
    redacted: true,
    sub: "",
    x: 430,
    y: 300,
    kind: "service",
    replicas: 3,
    perPod: 12,
    info: "Serves the user-facing API and hands heavy work to the pipeline as queued jobs instead of doing it inline."
  },
  {
    id: "db",
    label: "Database",
    redacted: true,
    sub: "",
    x: 430,
    y: 525,
    kind: "store",
    info: "The system of record."
  },
  {
    id: "queue",
    label: "Job queue",
    redacted: true,
    sub: "",
    x: 610,
    y: 300,
    kind: "store",
    info: "Buffers work between pipeline stages, so each stage takes a job when it has a free slot."
  },
  {
    id: "stage1",
    label: "Stage 1",
    redacted: true,
    sub: "",
    x: 800,
    y: 80,
    kind: "worker",
    replicas: 2,
    min: 1,
    max: 5,
    perPod: 4,
    info: "First stage. It can finish a job early when the result already exists."
  },
  {
    id: "stage2",
    label: "Stage 2",
    redacted: true,
    sub: "",
    x: 800,
    y: 195,
    kind: "worker",
    replicas: 2,
    min: 1,
    max: 5,
    perPod: 4,
    info: "Prepares the job for the expensive stage."
  },
  {
    id: "stage3",
    label: "Stage 3",
    redacted: true,
    sub: "",
    x: 800,
    y: 310,
    kind: "worker",
    replicas: 3,
    min: 1,
    max: 8,
    perPod: 2,
    info: "The long one: a chain of model calls, then the result goes to storage."
  },
  {
    id: "stage4",
    label: "Stage 4",
    redacted: true,
    sub: "",
    x: 800,
    y: 425,
    kind: "worker",
    replicas: 2,
    min: 1,
    max: 5,
    perPod: 3,
    info: "Runs in parallel with stage 5 once stage 3 is done."
  },
  {
    id: "stage5",
    label: "Stage 5",
    redacted: true,
    sub: "",
    x: 800,
    y: 540,
    kind: "worker",
    replicas: 2,
    min: 1,
    max: 5,
    perPod: 3,
    info: "Runs in parallel with stage 4 once stage 3 is done."
  },
  {
    id: "ai",
    label: "AI provider",
    redacted: true,
    sub: "",
    x: 1005,
    y: 250,
    kind: "external",
    info: "An external model API that the pipeline depends on, which makes its outages the ones worth rehearsing."
  },
  {
    id: "store",
    label: "Object storage",
    redacted: true,
    sub: "",
    x: 1005,
    y: 480,
    kind: "store",
    info: "Where the pipeline's outputs land."
  }
];
const EDGES = [
  { a: "mobile", b: "edge" },
  { a: "web", b: "edge" },
  { a: "payments", b: "edge" },
  { a: "edge", b: "api" },
  { a: "api", b: "queue" },
  { a: "api", b: "db" },
  { a: "queue", b: "stage1" },
  { a: "queue", b: "stage2" },
  { a: "queue", b: "stage3" },
  { a: "queue", b: "stage4" },
  { a: "queue", b: "stage5" },
  { a: "stage1", b: "ai" },
  { a: "stage2", b: "ai" },
  { a: "stage3", b: "ai" },
  { a: "stage4", b: "ai" },
  { a: "stage5", b: "ai" },
  { a: "stage1", b: "db", arc: 0 },
  { a: "stage3", b: "store" },
  { a: "stage4", b: "store" },
  { a: "stage5", b: "store" },
  // Stages report status back to the API.
  { a: "stage1", b: "api", callback: true, arc: -70 },
  { a: "stage4", b: "api", callback: true, arc: 60 },
  { a: "stage5", b: "api", callback: true, arc: 90 }
];
const NODE_W = 150;
const NODE_H = 54;
const nodeById = Object.fromEntries(NODES.map((n) => [n.id, n]));
function curve(e) {
  const A = nodeById[e.a];
  const B = nodeById[e.b];
  const dx = B.x - A.x;
  const dy = B.y - A.y;
  const bend = e.arc ?? 0;
  if (Math.abs(dx) < 40) {
    return [A, { x: A.x + 40, y: A.y + dy / 3 }, { x: B.x + 40, y: B.y - dy / 3 }, B];
  }
  return [A, { x: A.x + dx * 0.5, y: A.y + bend }, { x: B.x - dx * 0.5, y: B.y + bend }, B];
}
function bezier([p0, p1, p2, p3], t) {
  const u = 1 - t;
  const a = u * u * u;
  const b = 3 * u * u * t;
  const c = 3 * u * t * t;
  const d = t * t * t;
  return {
    x: a * p0.x + b * p1.x + c * p2.x + d * p3.x,
    y: a * p0.y + b * p1.y + c * p2.y + d * p3.y
  };
}
function curveLength(c) {
  let len = 0;
  let prev = c[0];
  for (let i = 1; i <= 24; i++) {
    const p = bezier(c, i / 24);
    len += Math.hypot(p.x - prev.x, p.y - prev.y);
    prev = p;
  }
  return len;
}
function edgeKey(a, b) {
  return a < b ? `${a}|${b}` : `${b}|${a}`;
}
const edgeByKey = Object.fromEntries(EDGES.map((e) => [edgeKey(e.a, e.b), e]));
class Aborted extends Error {
}
class Timeout extends Error {
}
class ModelError extends Error {
}
const TRAVEL_PX_PER_MS = 0.9;
const RESTART_BACKOFF_MS = 1400;
const READINESS_MS = 1900;
const HTTP_TIMEOUT_MS = 3500;
const MAX_ATTEMPTS = 4;
const RETRY_BASE_MS = 500;
const STEPS = [6, 12];
const REUSE_RATE = 0.3;
const WINDOW_MS = 2e4;
const rand = (a, b) => a + Math.random() * (b - a);
const RATES = { read: 5, job: 0.9, webhook: 0.25 };
class Simulation {
  now = 0;
  speed = 1;
  paused = false;
  traffic = 1;
  autoscale = true;
  modelDown = false;
  spikeUntil = -1;
  packets = [];
  services = {};
  trace = null;
  built = 0;
  reused = 0;
  retries = 0;
  deadLettered = 0;
  failed = 0;
  done = [];
  modelCalls = [];
  heap = [];
  seq = 0;
  ids = 0;
  nextArrival = { read: 0, job: 0, webhook: 0 };
  lengths = {};
  nextScale = 0;
  constructor() {
    for (const def of NODES) {
      if (!def.replicas) continue;
      this.services[def.id] = {
        def,
        pods: Array.from({ length: def.replicas }, () => this.pod("ready")),
        waiters: [],
        idleFor: 0,
        lastError: -1e9,
        step: 0
      };
    }
    for (const [k, e] of Object.entries(edgeByKey)) this.lengths[k] = curveLength(curve(e));
  }
  // ---- clock -------------------------------------------------------------
  at(t, fn) {
    const h = this.heap;
    h.push({ t, seq: this.seq++, fn });
    let i = h.length - 1;
    while (i > 0) {
      const p = i - 1 >> 1;
      if (h[p].t < h[i].t || h[p].t === h[i].t && h[p].seq < h[i].seq) break;
      [h[p], h[i]] = [h[i], h[p]];
      i = p;
    }
  }
  pop() {
    const h = this.heap;
    const top = h[0];
    const last = h.pop();
    if (h.length) {
      h[0] = last;
      let i = 0;
      for (; ; ) {
        const l = i * 2 + 1;
        const r = l + 1;
        let m = i;
        const less = (a, b) => h[a].t < h[b].t || h[a].t === h[b].t && h[a].seq < h[b].seq;
        if (l < h.length && less(l, m)) m = l;
        if (r < h.length && less(r, m)) m = r;
        if (m === i) break;
        [h[m], h[i]] = [h[i], h[m]];
        i = m;
      }
    }
    return top;
  }
  sleep(ms) {
    return new Promise((resolve) => this.at(this.now + Math.max(0, ms), resolve));
  }
  /** Advances simulated time by a frame's worth of real time. */
  step(realMs) {
    if (this.paused) return;
    const dt = Math.min(100, realMs) * this.speed;
    const end = this.now + dt;
    this.arrivals(end);
    while (this.heap.length && this.heap[0].t <= end) {
      const e = this.pop();
      this.now = e.t;
      e.fn();
    }
    this.now = end;
    if (this.now >= this.nextScale) {
      this.nextScale = this.now + 1e3;
      this.scale(1e3);
    }
    this.packets = this.packets.filter((p) => p.t0 + p.dur > this.now);
    const cutoff = this.now - WINDOW_MS;
    if (this.done.length && this.done[0].t < cutoff)
      this.done = this.done.filter((d) => d.t >= cutoff);
    if (this.modelCalls.length && this.modelCalls[0] < this.now - 5e3)
      this.modelCalls = this.modelCalls.filter((t) => t >= this.now - 5e3);
  }
  // ---- traffic -------------------------------------------------------------
  arrivals(until) {
    const boost = this.now < this.spikeUntil ? 5 : 1;
    for (const flow of ["read", "job", "webhook"]) {
      const rate = RATES[flow] * this.traffic * boost / 1e3;
      if (rate <= 0) continue;
      if (this.nextArrival[flow] < this.now) this.nextArrival[flow] = this.now;
      while (this.nextArrival[flow] <= until) {
        const t = this.nextArrival[flow];
        this.at(t, () => this.start(flow, false));
        this.nextArrival[flow] += -Math.log(1 - Math.random()) / rate;
      }
    }
  }
  start(flow, traced) {
    const run = flow === "read" ? this.read : flow === "job" ? this.pipelineJob : this.webhook;
    const t0 = this.now;
    const net = { visual: 0, modelled: 0 };
    const ms = () => flow === "job" ? this.now - t0 : this.now - t0 - net.visual + net.modelled;
    if (traced) this.trace = { id: ++this.ids, spans: [], start: t0 };
    run.call(this, traced, net).then(
      (outcome) => {
        this.done.push({
          flow,
          t: this.now,
          ms: ms(),
          ok: true,
          built: outcome === "job done"
        });
        if (traced && this.trace) {
          this.trace.end = this.now;
          this.trace.outcome = outcome;
        }
      },
      (e) => {
        this.done.push({ flow, t: this.now, ms: ms(), ok: false });
        this.failed++;
        if (traced && this.trace) {
          this.trace.end = this.now;
          this.trace.outcome = e.message || "failed";
        }
      }
    );
  }
  // ---- primitives ------------------------------------------------------------
  span(traced, name, node) {
    if (!traced || !this.trace) return null;
    const s = { name, node, start: this.now, status: "ok" };
    this.trace.spans.push(s);
    return s;
  }
  close(s, status = "ok") {
    if (!s) return;
    s.end = this.now;
    s.status = status;
  }
  /** A hop along the map, as a packet; resolves on arrival. */
  async travel(from, to, flow, traced, failed = false, net) {
    const len = this.lengths[edgeKey(from, to)] ?? 200;
    const dur = len / TRAVEL_PX_PER_MS;
    if (net) {
      net.visual += dur;
      net.modelled += rand(0.3, 1.2);
    }
    this.packets.push({ id: ++this.ids, from, to, t0: this.now, dur, flow, traced, failed });
    await this.sleep(dur);
  }
  pod(state) {
    return { id: ++this.ids, state, busy: 0, tokens: /* @__PURE__ */ new Set() };
  }
  freePod(svc) {
    let best = null;
    for (const p of svc.pods) {
      if (p.state !== "ready" || p.busy >= (svc.def.perPod ?? 1)) continue;
      if (!best || p.busy < best.busy) best = p;
    }
    return best;
  }
  take(svc, pod) {
    const t = { pod, aborted: false, svc };
    pod.busy++;
    pod.tokens.add(t);
    return t;
  }
  /** A slot on one of the service's Ready pods, queueing if there is none. */
  acquire(id, timeoutMs) {
    const svc = this.services[id];
    const pod = this.freePod(svc);
    if (pod && !svc.waiters.length) return Promise.resolve(this.take(svc, pod));
    return new Promise((resolve, reject) => {
      const w = { resolve, reject };
      svc.waiters.push(w);
      if (timeoutMs) {
        this.seq;
        this.at(this.now + timeoutMs, () => {
          const i = svc.waiters.indexOf(w);
          if (i < 0) return;
          svc.waiters.splice(i, 1);
          svc.lastError = this.now;
          reject(new Timeout("504 · no ready pod"));
        });
      }
    });
  }
  release(t) {
    t.pod.busy--;
    t.pod.tokens.delete(t);
    if (t.pod.state === "terminating" && t.pod.busy === 0) {
      t.svc.pods = t.svc.pods.filter((p) => p !== t.pod);
    }
    this.pump(t.svc);
  }
  pump(svc) {
    while (svc.waiters.length) {
      const pod = this.freePod(svc);
      if (!pod) return;
      const w = svc.waiters.shift();
      w.resolve(this.take(svc, pod));
    }
  }
  /** Time spent on a slot that has already been acquired; throws if its pod died. */
  async busy(t, ms) {
    await this.sleep(ms);
    if (t.aborted) throw new Aborted("pod killed");
  }
  async model(from, flow, traced, what, ms) {
    const s = this.span(traced, what, "ai");
    await this.travel(from, "ai", flow, traced);
    this.modelCalls.push(this.now);
    if (this.modelDown && Math.random() < 0.85) {
      await this.sleep(rand(150, 300));
      this.services[from].lastError = this.now;
      await this.travel("ai", from, flow, traced, true);
      this.close(s, "error");
      throw new ModelError("AI provider 503");
    }
    await this.sleep(ms);
    await this.travel("ai", from, flow, traced);
    this.close(s);
  }
  /**
   * One pipeline stage of a job: wait for a slot, run, and on failure
   * give the slot back and come back later with exponential backoff.
   */
  async job(stage, traced, run) {
    for (let attempt = 1; ; attempt++) {
      const q = this.span(traced, `queued · ${stage}`, "queue");
      const token = await this.acquire(stage);
      this.close(q);
      const s = this.span(traced, attempt > 1 ? `${stage} (attempt ${attempt})` : stage, stage);
      try {
        await run(token);
        this.release(token);
        this.close(s);
        return;
      } catch (e) {
        this.release(token);
        this.services[stage].lastError = this.now;
        if (attempt >= MAX_ATTEMPTS) {
          this.close(s, "error");
          this.deadLettered++;
          throw new Error(`dead-lettered at ${stage}`);
        }
        this.close(s, "retry");
        this.retries++;
        if (e instanceof Aborted) continue;
        const backoff = RETRY_BASE_MS * 2 ** (attempt - 1) * rand(0.8, 1.2);
        const d = this.span(traced, `backoff ${Math.round(backoff)}ms`, "queue");
        await this.sleep(backoff);
        this.close(d, "retry");
      }
    }
  }
  // ---- flows ---------------------------------------------------------------
  /** A read: through the edge to the API, a database read, and back. */
  async read(traced, net) {
    const client = Math.random() < 0.8 ? "mobile" : "web";
    await this.travel(client, "edge", "read", traced, false, net);
    await this.http(client, "read", traced, "GET request", net, async (t) => {
      await this.busy(t, rand(4, 12));
      const s = this.span(traced, "DB read", "db");
      await this.travel("api", "db", "read", traced, false, net);
      await this.sleep(rand(4, 18));
      await this.travel("db", "api", "read", traced, false, net);
      this.close(s);
      if (t.aborted) throw new Aborted("pod killed");
    });
    await this.travel("edge", client, "read", traced, false, net);
    return "200 OK";
  }
  /** A third-party webhook updating a record. */
  async webhook(traced, net) {
    await this.travel("payments", "edge", "webhook", traced, false, net);
    await this.http("payments", "webhook", traced, "POST webhook", net, async (t) => {
      await this.busy(t, rand(3, 8));
      const s = this.span(traced, "DB write", "db");
      await this.travel("api", "db", "webhook", traced, false, net);
      await this.sleep(rand(6, 20));
      await this.travel("db", "api", "webhook", traced, false, net);
      this.close(s);
    });
    await this.travel("edge", "payments", "webhook", traced, false, net);
    return "200 OK";
  }
  /**
   * The API leg of an HTTP request: the edge waits for a ready instance (504
   * after a while), and a pod dying mid-request turns into a 502.
   */
  async http(client, flow, traced, name, net, handler) {
    const s = this.span(traced, name, "api");
    let token;
    try {
      token = await this.acquire("api", HTTP_TIMEOUT_MS);
    } catch (e) {
      this.close(s, "error");
      await this.travel("edge", client, flow, traced, true, net);
      throw e;
    }
    await this.travel("edge", "api", flow, traced, false, net);
    try {
      await handler(token);
    } catch (e) {
      this.release(token);
      this.close(s, "error");
      this.services.api.lastError = this.now;
      await this.travel("api", "edge", flow, traced, true, net);
      await this.travel("edge", client, flow, traced, true, net);
      throw e instanceof Aborted ? new Error("502 · pod killed mid-request") : e;
    }
    this.release(token);
    await this.travel("api", "edge", flow, traced, false, net);
    this.close(s);
  }
  /**
   * An async job. The API answers 202 at once and enqueues it; stage 1 may
   * finish it early, otherwise it runs through stages 2 and 3 and fans out to
   * stages 4 and 5 in parallel.
   */
  async pipelineJob(traced, _net) {
    await this.travel("mobile", "edge", "job", traced);
    await this.http("mobile", "job", traced, "POST request → 202", void 0, async (t) => {
      await this.busy(t, rand(6, 14));
      await this.travel("api", "queue", "job", traced);
      await this.travel("queue", "api", "job", traced);
    });
    void this.travel("edge", "mobile", "job", traced);
    await this.travel("queue", "stage1", "job", traced);
    let duplicate = false;
    await this.job("stage1", traced, async (t) => {
      await this.model("stage1", "job", traced, "model call", rand(200, 380));
      const s2 = this.span(traced, "DB lookup", "db");
      await this.travel("stage1", "db", "job", traced);
      await this.sleep(rand(15, 45));
      await this.travel("db", "stage1", "job", traced);
      this.close(s2);
      if (t.aborted) throw new Aborted("pod killed");
      duplicate = !traced && Math.random() < REUSE_RATE;
    });
    if (duplicate) {
      await this.travel("stage1", "api", "job", traced);
      this.reused++;
      return "finished early (result existed)";
    }
    await this.travel("stage1", "queue", "job", traced);
    await this.travel("queue", "stage2", "job", traced);
    await this.job("stage2", traced, async (t) => {
      await this.model("stage2", "job", traced, "model call", rand(350, 650));
      if (t.aborted) throw new Aborted("pod killed");
    });
    await this.travel("stage2", "queue", "job", traced);
    await this.travel("queue", "stage3", "job", traced);
    await this.job("stage3", traced, async (t) => {
      const svc = this.services.stage3;
      const steps = Math.round(rand(...STEPS));
      for (let i = 1; i <= steps; i++) {
        svc.step = i;
        await this.model("stage3", "job", traced, `model call ${i}`, rand(160, 380));
        if (t.aborted) throw new Aborted("pod killed");
      }
      const s2 = this.span(traced, "write object", "store");
      await this.travel("stage3", "store", "job", traced);
      await this.travel("store", "stage3", "job", traced);
      this.close(s2);
    });
    await this.travel("stage3", "queue", "job", traced);
    const media = (stage, what, ms) => (async () => {
      await this.travel("queue", stage, "job", traced);
      await this.job(stage, traced, async (t) => {
        await this.model(stage, "job", traced, what, rand(...ms));
        const s2 = this.span(traced, `PUT ${stage}`, "store");
        await this.travel(stage, "store", "job", traced);
        await this.travel("store", stage, "job", traced);
        this.close(s2);
        if (t.aborted) throw new Aborted("pod killed");
      });
      const p = this.span(traced, `PATCH status (${stage})`, "api");
      await this.travel(stage, "api", "job", traced);
      this.close(p);
    })();
    await Promise.all([
      media("stage4", "model call", [1100, 1900]),
      media("stage5", "model call", [800, 1500])
    ]);
    const s = this.span(traced, "DB write", "db");
    await this.travel("api", "db", "job", traced);
    await this.travel("db", "api", "job", traced);
    this.close(s);
    this.built++;
    return "job done";
  }
  // ---- chaos and scaling -------------------------------------------------
  /** Kills one running instance; it is restarted after a back-off. */
  killPod(id) {
    const svc = this.services[id];
    const victims = svc?.pods.filter((p) => p.state === "ready");
    if (!victims?.length) return false;
    const pod = victims[Math.floor(Math.random() * victims.length)];
    pod.state = "down";
    svc.lastError = this.now;
    for (const t of pod.tokens) t.aborted = true;
    this.at(this.now + RESTART_BACKOFF_MS, () => {
      if (pod.state !== "down") return;
      pod.state = "starting";
      this.at(this.now + READINESS_MS, () => {
        if (pod.state !== "starting") return;
        pod.state = "ready";
        this.pump(svc);
      });
    });
    return true;
  }
  scale(everyMs) {
    if (!this.autoscale) return;
    for (const svc of Object.values(this.services)) {
      const def = svc.def;
      if (def.kind !== "worker" || !def.max) continue;
      const live = svc.pods.filter((p) => p.state !== "terminating");
      const ready = live.filter((p) => p.state === "ready");
      const cap = ready.length * (def.perPod ?? 1);
      const busy = ready.reduce((n, p) => n + p.busy, 0);
      if (svc.waiters.length > cap * 0.5 && live.length < def.max) {
        const pod = this.pod("starting");
        svc.pods.push(pod);
        this.at(this.now + READINESS_MS, () => {
          if (pod.state !== "starting") return;
          pod.state = "ready";
          this.pump(svc);
        });
        svc.idleFor = 0;
      } else if (!svc.waiters.length && busy < cap * 0.3) {
        svc.idleFor += everyMs;
        if (svc.idleFor >= 6e3 && live.length > (def.min ?? 1)) {
          const idle = ready.find((p) => p.busy === 0);
          if (idle) {
            idle.state = "terminating";
            svc.pods = svc.pods.filter((p) => p !== idle);
          }
          svc.idleFor = 0;
        }
      } else {
        svc.idleFor = 0;
      }
    }
  }
  // ---- read-outs -------------------------------------------------------------
  stats() {
    const window2 = this.done;
    const pct = (flow, p, builtOnly = false) => {
      const ms = window2.filter((d) => d.flow === flow && d.ok && (!builtOnly || d.built)).map((d) => d.ms);
      if (!ms.length) return 0;
      ms.sort((a, b) => a - b);
      return ms[Math.min(ms.length - 1, Math.floor(ms.length * p))];
    };
    const last5 = window2.filter((d) => d.t >= this.now - 5e3);
    const errors = last5.filter((d) => !d.ok).length;
    return {
      rps: last5.length / 5,
      errorRate: last5.length ? errors / last5.length : 0,
      readP50: pct("read", 0.5),
      readP95: pct("read", 0.95),
      jobP50: pct("job", 0.5, true),
      modelPerSec: this.modelCalls.length / 5,
      built: this.built,
      reused: this.reused,
      retries: this.retries,
      deadLettered: this.deadLettered,
      failed: this.failed,
      inFlight: this.packets.length
    };
  }
  nodeState(id) {
    const svc = this.services[id];
    if (!svc) return null;
    const per = svc.def.perPod ?? 1;
    const ready = svc.pods.filter((p) => p.state === "ready");
    const cap = ready.length * per;
    const busy = ready.reduce((n, p) => n + p.busy, 0);
    return {
      pods: svc.pods.map((p) => p.state),
      util: cap ? busy / cap : svc.waiters.length ? 1 : 0,
      queued: svc.waiters.length,
      erroredRecently: this.now - svc.lastError < 900,
      step: id === "stage3" && busy > 0 ? svc.step : 0
    };
  }
}
const COLORS = {
  read: "#22d3ee",
  job: "#a78bfa",
  webhook: "#fbbf24",
  failed: "#f43f5e",
  traced: "#ffffff"
};
const POD_COLORS = {
  ready: "#34d399",
  starting: "#fbbf24",
  down: "#f43f5e",
  terminating: "#64748b"
};
const SPEEDS = [0.5, 1, 2, 4];
const SNAPSHOT_MS = 120;
const POOL = 420;
const curves = Object.fromEntries(EDGES.map((e) => [edgeKey(e.a, e.b), curve(e)]));
function pathD(e) {
  const [p0, p1, p2, p3] = curve(e);
  return `M${p0.x},${p0.y} C${p1.x},${p1.y} ${p2.x},${p2.y} ${p3.x},${p3.y}`;
}
function redactedTag(id) {
  let h = 2166136261;
  for (const c of id) h = Math.imul(h ^ c.charCodeAt(0), 16777619);
  const abc = "abcdefghijklmnopqrstuvwxyz";
  const word = (n) => Array.from({ length: n }, () => {
    h = Math.imul(h ^ h >>> 13, 1540483477);
    return abc[Math.abs(h) % 26];
  }).join("");
  return `${word(5 + Math.abs(h) % 4)} · ${word(4 + Math.abs(h >> 3) % 5)}`;
}
function fmtMs(ms) {
  if (!ms) return "—";
  return ms >= 1e3 ? `${(ms / 1e3).toFixed(1)}s` : `${Math.round(ms)}ms`;
}
function SystemMap() {
  const simRef = reactExports.useRef(null);
  const packetLayer = reactExports.useRef(null);
  const edgeRefs = reactExports.useRef({});
  const boxRef = reactExports.useRef(null);
  const [snap, setSnap] = reactExports.useState(null);
  const [incident, setIncident] = reactExports.useState(false);
  const incidentSeen = reactExports.useRef(false);
  const [selected, setSelected] = reactExports.useState("api");
  const [ui, setUi] = reactExports.useState({
    paused: false,
    speed: 1,
    traffic: 1,
    autoscale: true,
    modelDown: false
  });
  reactExports.useEffect(() => {
    const sim2 = new Simulation();
    simRef.current = sim2;
    const layer = packetLayer.current;
    const NS = "http://www.w3.org/2000/svg";
    const pool = [];
    for (let i = 0; i < POOL; i++) {
      const c = document.createElementNS(NS, "circle");
      c.setAttribute("r", "3");
      c.style.display = "none";
      layer.appendChild(c);
      pool.push(c);
    }
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) sim2.speed = 0.5;
    let raf = 0;
    let last = performance.now();
    let lastSnap = 0;
    let visible = false;
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
    });
    if (boxRef.current) io.observe(boxRef.current);
    const frame = (t) => {
      raf = requestAnimationFrame(frame);
      const dt = t - last;
      last = t;
      if (!visible || document.hidden) return;
      sim2.step(dt);
      const load = {};
      for (const p of sim2.packets) {
        const k = edgeKey(p.from, p.to);
        load[k] = (load[k] ?? 0) + (p.failed ? 3 : 1);
      }
      for (const [k, el] of Object.entries(edgeRefs.current)) {
        if (!el) continue;
        const n = load[k] ?? 0;
        el.style.strokeOpacity = String(n ? Math.min(0.75, 0.28 + n * 0.07) : 0.16);
        el.style.stroke = n ? "var(--color-primary)" : "currentColor";
      }
      let i = 0;
      for (const p of sim2.packets) {
        if (i >= POOL) break;
        const e = edgeByKey[edgeKey(p.from, p.to)];
        const c = curves[edgeKey(p.from, p.to)];
        if (!e || !c) continue;
        let k = Math.min(1, Math.max(0, (sim2.now - p.t0) / p.dur));
        if (p.from !== e.a) k = 1 - k;
        const pt = bezier(c, k);
        const el = pool[i++];
        el.style.display = "";
        el.setAttribute("cx", pt.x.toFixed(1));
        el.setAttribute("cy", pt.y.toFixed(1));
        el.setAttribute("r", p.traced ? "5.5" : "3");
        el.setAttribute(
          "fill",
          p.failed ? COLORS.failed : p.traced ? COLORS.traced : COLORS[p.flow]
        );
        el.setAttribute("filter", p.traced ? "url(#sysmap-glow-strong)" : "url(#sysmap-glow)");
      }
      for (; i < POOL; i++) {
        if (pool[i].style.display === "none") break;
        pool[i].style.display = "none";
      }
      if (t - lastSnap > SNAPSHOT_MS) {
        lastSnap = t;
        const nodes = {};
        for (const n of NODES) nodes[n.id] = sim2.nodeState(n.id);
        const api = nodes.api;
        if (!incidentSeen.current && api && api.pods.length && !api.pods.includes("ready")) {
          incidentSeen.current = true;
          setIncident(true);
          solveMystery("outage");
        }
        setSnap({
          nodes,
          stats: sim2.stats(),
          trace: sim2.trace ? { ...sim2.trace, spans: [...sim2.trace.spans] } : null,
          now: sim2.now
        });
      }
    };
    raf = requestAnimationFrame(frame);
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      layer.replaceChildren();
    };
  }, []);
  const set = (key, value) => {
    const sim2 = simRef.current;
    if (sim2) sim2[key] = value;
    setUi((u) => ({ ...u, [key]: value }));
  };
  const sim = simRef.current;
  const sel = nodeById[selected];
  const selState = snap?.nodes[selected];
  const s = snap?.stats;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { ref: boxRef, className: "rounded-2xl border border-border bg-card/40 p-3 sm:p-5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4 flex flex-wrap items-end justify-between gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-mono text-[10px] uppercase tracking-[0.25em] text-amber-300", children: "Live · flagship system · redacted" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mt-1 text-xl font-bold tracking-tight sm:text-2xl", children: "Break production. It's a simulation." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 max-w-xl text-xs text-muted-foreground", children: "A redacted model of a production system I work on, running as a discrete-event simulation in your browser. Names and internals are withheld. Click any node to inspect it, kill its instances, or take the AI provider down, and watch retries, restarts and autoscaling handle it." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-2 font-mono text-[11px]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            onClick: () => set("paused", !ui.paused),
            className: "inline-flex items-center gap-1.5 rounded-md border border-border bg-background px-2.5 py-1.5 hover:border-primary/60",
            children: [
              ui.paused ? /* @__PURE__ */ jsxRuntimeExports.jsx(Play, { className: "h-3.5 w-3.5" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Pause, { className: "h-3.5 w-3.5" }),
              ui.paused ? "Play" : "Pause"
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex overflow-hidden rounded-md border border-border", children: SPEEDS.map((v) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            onClick: () => set("speed", v),
            className: `px-2 py-1.5 ${ui.speed === v ? "bg-primary text-primary-foreground" : "bg-background hover:text-primary"}`,
            children: [
              v,
              "×"
            ]
          },
          v
        )) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "flex items-center gap-2 rounded-md border border-border bg-background px-2.5 py-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Activity, { className: "h-3.5 w-3.5 text-primary" }),
          "traffic",
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "range",
              min: 0,
              max: 4,
              step: 0.25,
              value: ui.traffic,
              onChange: (e) => set("traffic", Number(e.target.value)),
              className: "w-20 accent-[var(--color-primary)]",
              "aria-label": "Traffic"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "w-8 tabular-nums", children: [
            ui.traffic,
            "×"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            onClick: () => sim && (sim.spikeUntil = sim.now + 6e3),
            className: "inline-flex items-center gap-1.5 rounded-md border border-border bg-background px-2.5 py-1.5 hover:border-amber-400/60 hover:text-amber-300",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "h-3.5 w-3.5" }),
              " Spike 5×"
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            onClick: () => set("autoscale", !ui.autoscale),
            "aria-pressed": ui.autoscale,
            className: `rounded-md border px-2.5 py-1.5 ${ui.autoscale ? "border-emerald-400/50 text-emerald-300" : "border-border bg-background text-muted-foreground"}`,
            children: [
              "autoscale ",
              ui.autoscale ? "on" : "off"
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            onClick: () => sim?.start("job", true),
            className: "inline-flex items-center gap-1.5 rounded-md bg-primary px-2.5 py-1.5 font-semibold text-primary-foreground hover:opacity-90",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Radar, { className: "h-3.5 w-3.5" }),
              " Trace a job"
            ]
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-1 font-mono text-[10px] text-muted-foreground sm:hidden", children: "← swipe the map · tap a node →" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative -mx-3 overflow-x-auto px-3 sm:mx-0 sm:px-0", children: [
      incident && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute left-1/2 top-4 z-10 w-[min(92%,420px)] -translate-x-1/2 rounded-xl border border-rose-500/60 bg-background/95 p-4 font-mono text-xs shadow-2xl backdrop-blur", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-bold text-rose-400", children: "INC-404 · SEV-1" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: () => setIncident(false),
              className: "text-muted-foreground hover:text-foreground",
              children: "dismiss"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-foreground", children: "Core API has no ready instances. Every request is a 504." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-muted-foreground", children: "Root cause: someone broke prod. It was you. Recovery: automatic, give it a few seconds." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "svg",
        {
          viewBox: "0 0 1100 620",
          className: "min-w-[760px] w-full select-none",
          role: "img",
          "aria-label": "Redacted architecture map with live simulated traffic",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("defs", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("filter", { id: "sysmap-glow", x: "-200%", y: "-200%", width: "500%", height: "500%", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("feGaussianBlur", { stdDeviation: "2", result: "b" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("feMerge", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("feMergeNode", { in: "b" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("feMergeNode", { in: "SourceGraphic" })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("filter", { id: "sysmap-glow-strong", x: "-300%", y: "-300%", width: "700%", height: "700%", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("feGaussianBlur", { stdDeviation: "4", result: "b" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("feMerge", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("feMergeNode", { in: "b" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("feMergeNode", { in: "b" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("feMergeNode", { in: "SourceGraphic" })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("filter", { id: "sysmap-redact", x: "-10%", y: "-60%", width: "120%", height: "220%", children: /* @__PURE__ */ jsxRuntimeExports.jsx("feGaussianBlur", { stdDeviation: "2.4" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("pattern", { id: "sysmap-grid", width: "22", height: "22", patternUnits: "userSpaceOnUse", children: /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: "1", cy: "1", r: "1", fill: "currentColor", opacity: "0.08" }) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("rect", { width: "1100", height: "620", fill: "url(#sysmap-grid)", className: "text-foreground" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Zone, { x: 12, y: 100, w: 156, h: 430, label: "clients" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Zone, { x: 178, y: 200, w: 530, h: 400, label: "core", dashed: true }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Zone, { x: 716, y: 24, w: 168, h: 576, label: "async pipeline", dashed: true }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Zone, { x: 920, y: 185, w: 170, h: 360, label: "external" }),
            EDGES.map((e) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              "path",
              {
                ref: (el) => {
                  edgeRefs.current[edgeKey(e.a, e.b)] = el;
                },
                d: pathD(e),
                fill: "none",
                stroke: "currentColor",
                strokeWidth: e.callback ? 1 : 1.4,
                strokeDasharray: e.callback ? "4 5" : void 0,
                className: "text-foreground transition-[stroke-opacity] duration-300"
              },
              edgeKey(e.a, e.b)
            )),
            /* @__PURE__ */ jsxRuntimeExports.jsx("g", { ref: packetLayer }),
            NODES.map((n) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              NodeBox,
              {
                def: n,
                state: snap?.nodes[n.id] ?? null,
                selected: selected === n.id,
                modelDown: n.id === "ai" && ui.modelDown,
                onSelect: () => setSelected(n.id)
              },
              n.id
            ))
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2 flex flex-wrap gap-x-4 gap-y-1 font-mono text-[10px] text-muted-foreground", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Dot, { c: COLORS.read, label: "read request" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Dot, { c: COLORS.job, label: "async job" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Dot, { c: COLORS.webhook, label: "webhook" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Dot, { c: COLORS.failed, label: "failure" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Dot, { c: COLORS.traced, label: "traced request" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-auto", children: "pods:" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Dot, { c: POD_COLORS.ready, label: "ready" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Dot, { c: POD_COLORS.starting, label: "starting" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Dot, { c: POD_COLORS.down, label: "crashed" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-4 lg:grid-cols-7", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Metric, { label: "throughput", value: s ? `${s.rps.toFixed(1)}/s` : "—" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Metric,
        {
          label: "GET p50 / p95",
          value: s ? `${fmtMs(s.readP50)} / ${fmtMs(s.readP95)}` : "—"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Metric, { label: "job p50", value: s ? fmtMs(s.jobP50) : "—" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Metric,
        {
          label: "error rate (5s)",
          value: s ? `${(s.errorRate * 100).toFixed(1)}%` : "—",
          warn: !!s && s.errorRate > 0.02
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Metric, { label: "model calls", value: s ? `${s.modelPerSec.toFixed(1)}/s` : "—" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Metric, { label: "jobs done · early", value: s ? `${s.built} · ${s.reused}` : "—" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Metric,
        {
          label: "retries · dead-lettered",
          value: s ? `${s.retries} · ${s.deadLettered}` : "—",
          warn: !!s && s.deadLettered > 0
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-border bg-background/50 p-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-mono text-[10px] uppercase tracking-widest text-muted-foreground", children: "Inspector" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1 text-lg font-bold", children: sel.label }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "font-mono text-[11px] text-primary",
            style: sel.redacted ? { filter: "blur(3px)", userSelect: "none" } : void 0,
            "aria-label": sel.redacted ? "redacted" : void 0,
            children: sel.redacted ? redactedTag(sel.id) : sel.sub
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-xs leading-relaxed text-muted-foreground", children: sel.info }),
        selState && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 space-y-2 font-mono text-[11px]", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-1.5", children: [
            "pods",
            selState.pods.map((p, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                title: p,
                className: "inline-block h-2.5 w-2.5 rounded-full",
                style: { background: POD_COLORS[p] }
              },
              i
            )),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground", children: [
              selState.pods.filter((p) => p === "ready").length,
              "/",
              selState.pods.length,
              " ready"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            "load ",
            Math.round(selState.util * 100),
            "% · queued ",
            selState.queued,
            sel.max ? ` · autoscale ${sel.min}–${sel.max}` : ""
          ] }),
          selected === "api" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-amber-300/80", children: [
            "SLO: never 0/",
            selState.pods.length,
            " ready. (Instances restart in ~3s.)"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              onClick: () => sim?.killPod(selected),
              className: "mt-1 inline-flex items-center gap-1.5 rounded-md border border-rose-500/50 px-2.5 py-1.5 text-rose-300 hover:bg-rose-500/10",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Skull, { className: "h-3.5 w-3.5" }),
                " Kill a pod"
              ]
            }
          )
        ] }),
        selected === "ai" && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: () => set("modelDown", !ui.modelDown),
            className: `mt-3 inline-flex items-center gap-1.5 rounded-md border px-2.5 py-1.5 font-mono text-[11px] ${ui.modelDown ? "border-emerald-400/50 text-emerald-300" : "border-rose-500/50 text-rose-300 hover:bg-rose-500/10"}`,
            children: ui.modelDown ? "Restore the AI provider" : "Simulate an AI provider outage"
          }
        ),
        !selState && selected !== "ai" && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 font-mono text-[10px] text-muted-foreground", children: "Managed or external: not something you can kill from here. Try the core API or a worker." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TracePanel, { trace: snap?.trace ?? null, now: snap?.now ?? 0 })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 font-mono text-[10px] leading-relaxed text-muted-foreground", children: "Redacted on purpose: service names, internals and exact topology are withheld or generalised, and blurred tags are placeholders. Traffic, timings (compressed), replica counts and failures are simulated." })
  ] });
}
function Zone({
  x,
  y,
  w,
  h,
  label,
  dashed
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("g", { className: "text-foreground", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "rect",
      {
        x,
        y,
        width: w,
        height: h,
        rx: 16,
        fill: "currentColor",
        fillOpacity: 0.02,
        stroke: "currentColor",
        strokeOpacity: 0.1,
        strokeDasharray: dashed ? "6 6" : void 0
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "text",
      {
        x: x + 12,
        y: y + h - 10,
        fontSize: "9",
        fontFamily: "ui-monospace, monospace",
        fill: "currentColor",
        opacity: 0.35,
        letterSpacing: "1.5",
        children: label.toUpperCase()
      }
    )
  ] });
}
function NodeBox({
  def,
  state,
  selected,
  modelDown,
  onSelect
}) {
  const x = def.x - NODE_W / 2;
  const y = def.y - NODE_H / 2;
  const hot = !!state?.erroredRecently || modelDown;
  const accent = def.kind === "worker" ? "#a78bfa" : def.kind === "service" || def.kind === "edge" ? "#22d3ee" : def.kind === "external" ? "#fbbf24" : "#94a3b8";
  const util = state?.util ?? 0;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "g",
    {
      onClick: onSelect,
      "data-cursor": "Inspect",
      className: "cursor-pointer text-foreground",
      role: "button",
      "aria-label": `Inspect ${def.label}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "rect",
          {
            x,
            y,
            width: NODE_W,
            height: NODE_H,
            rx: 12,
            fill: "var(--color-background)",
            stroke: hot ? "#f43f5e" : selected ? accent : "currentColor",
            strokeOpacity: hot || selected ? 1 : 0.18,
            strokeWidth: selected ? 1.8 : 1.2,
            style: {
              filter: hot ? "drop-shadow(0 0 8px rgba(244,63,94,.55))" : selected ? `drop-shadow(0 0 10px ${accent}66)` : void 0,
              transition: "stroke .2s"
            }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("rect", { x, y: y + 10, width: 3, height: NODE_H - 20, rx: 1.5, fill: accent }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("text", { x: x + 12, y: y + 21, fontSize: "12.5", fontWeight: "700", fill: "currentColor", children: def.label }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "text",
          {
            x: x + 12,
            y: y + 36,
            fontSize: "9.5",
            fontFamily: "ui-monospace, monospace",
            fill: "currentColor",
            opacity: 0.55,
            filter: !state?.step && def.redacted ? "url(#sysmap-redact)" : void 0,
            children: state?.step ? `model call ${state.step}` : def.redacted ? redactedTag(def.id) : def.sub
          }
        ),
        state?.pods.slice(0, 9).map((p, i) => /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: x + 14 + i * 9, cy: y + 46, r: 3, fill: POD_COLORS[p], children: p === "starting" && /* @__PURE__ */ jsxRuntimeExports.jsx("animate", { attributeName: "opacity", values: "1;.3;1", dur: "0.8s", repeatCount: "indefinite" }) }, i)),
        state && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "rect",
          {
            x: x + NODE_W - 58,
            y: y + 43,
            width: 46 * Math.min(1, util),
            height: 5,
            rx: 2.5,
            fill: util > 0.85 ? "#f43f5e" : util > 0.6 ? "#fbbf24" : "#34d399"
          }
        ),
        state && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "rect",
          {
            x: x + NODE_W - 58,
            y: y + 43,
            width: 46,
            height: 5,
            rx: 2.5,
            fill: "currentColor",
            opacity: 0.1
          }
        ),
        !!state?.queued && /* @__PURE__ */ jsxRuntimeExports.jsxs("g", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("rect", { x: x + NODE_W - 30, y: y - 9, width: 38, height: 18, rx: 9, fill: "#f59e0b" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "text",
            {
              x: x + NODE_W - 11,
              y: y + 4,
              fontSize: "10",
              fontWeight: "700",
              textAnchor: "middle",
              fill: "#111827",
              children: state.queued > 99 ? "99+" : state.queued
            }
          )
        ] }),
        modelDown && /* @__PURE__ */ jsxRuntimeExports.jsxs("g", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("rect", { x: x + NODE_W - 36, y: y - 9, width: 44, height: 18, rx: 9, fill: "#f43f5e" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "text",
            {
              x: x + NODE_W - 14,
              y: y + 4,
              fontSize: "10",
              fontWeight: "700",
              textAnchor: "middle",
              fill: "#fff",
              children: "503"
            }
          )
        ] })
      ]
    }
  );
}
function Metric({ label, value, warn }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-background/80 px-3 py-2.5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `font-mono text-sm font-bold tabular-nums ${warn ? "text-rose-400" : ""}`, children: value }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-0.5 text-[10px] uppercase tracking-wider text-muted-foreground", children: label })
  ] });
}
function Dot({ c, label }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1.5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-2 w-2 rounded-full", style: { background: c, boxShadow: `0 0 6px ${c}` } }),
    label
  ] });
}
const SPAN_COLORS = { ok: "#22d3ee", error: "#f43f5e", retry: "#f59e0b" };
function TracePanel({ trace, now: now2 }) {
  if (!trace) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-40 items-center justify-center rounded-xl border border-dashed border-border p-4 text-center font-mono text-[11px] text-muted-foreground", children: "Press “Trace a job” to follow one request through every stage, as a distributed trace." });
  }
  const end = trace.end ?? now2;
  const total = Math.max(1, end - trace.start);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-border bg-background/50 p-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-baseline justify-between gap-2 font-mono text-[10px] uppercase tracking-widest text-muted-foreground", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
        "Trace #",
        trace.id
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "span",
        {
          className: trace.end ? trace.outcome?.includes("dead") || trace.outcome?.includes("50") ? "text-rose-400" : "text-emerald-400" : "text-amber-300",
          children: trace.end ? `${trace.outcome} · ${fmtMs(total)}` : `running · ${fmtMs(total)}`
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2 max-h-64 space-y-[3px] overflow-y-auto pr-1", children: trace.spans.map((sp, i) => {
      const left = (sp.start - trace.start) / total * 100;
      const width = Math.max(0.6, ((sp.end ?? now2) - sp.start) / total * 100);
      return /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "grid grid-cols-[minmax(0,44%)_1fr] items-center gap-2 font-mono text-[10px]",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate text-muted-foreground", title: `${sp.name} · ${sp.node}`, children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground/80", children: sp.name }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative h-2.5 rounded-sm bg-foreground/5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "absolute inset-y-0 rounded-sm",
                style: {
                  left: `${left}%`,
                  width: `${Math.min(width, 100 - left)}%`,
                  background: SPAN_COLORS[sp.status],
                  opacity: sp.end ? 0.9 : 0.5
                }
              }
            ) })
          ]
        },
        i
      );
    }) })
  ] });
}
const flagship = projects.find((p) => p.accent);
const rest = projects.filter((p) => !p.accent);
function Projects() {
  const [selected, setSelected] = reactExports.useState(null);
  const close = reactExports.useCallback(() => setSelected(null), []);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { id: "projects", className: "py-24 border-t border-border", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-10 flex items-center gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CodeXml, { className: "w-5 h-5 text-muted-foreground" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-3xl font-bold tracking-tight", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Scramble, { text: "Selected projects" }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(TierLabel, { n: "01", label: "Flagship", note: "in production · 15,000+ users" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(SystemMap, {}),
    flagship && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        type: "button",
        onClick: () => setSelected(flagship),
        className: "group mt-3 inline-flex items-center gap-1.5 font-mono text-xs text-muted-foreground transition-colors hover:text-primary",
        children: [
          "Read the full story of ",
          flagship.shortName,
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowUpRight, { className: "h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-20", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        TierLabel,
        {
          n: "02",
          label: "More work",
          note: `${rest.length} projects · open any for the full story`
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ProjectIndex, { projects: rest, onSelect: setSelected })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(ProjectDialog, { project: selected, onClose: close })
  ] });
}
function TierLabel({ n, label, note }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4 flex items-baseline gap-3 font-mono text-[11px] uppercase tracking-[0.2em]", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary", children: n }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-px flex-1 translate-y-[-3px] bg-border" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "normal-case tracking-normal text-muted-foreground", children: note })
  ] });
}
function StatusLight() {
  const [status, setStatus] = reactExports.useState(null);
  reactExports.useEffect(() => {
    fetch("/status.json", { cache: "no-store" }).then((r) => r.ok ? r.json() : null).then((j) => setStatus(j?.status ?? null)).catch(() => setStatus(null));
  }, []);
  if (!status) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1.5 font-mono", title: "live from /status.json", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-1.5 w-1.5 rounded-full bg-emerald-400" }),
    "all systems ",
    status
  ] });
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
      /* @__PURE__ */ jsxRuntimeExports.jsx(StatusLight, {}),
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
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 font-mono text-primary/80", children: "Hi there i love u <3 :)" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 select-text font-mono text-[10px] text-muted-foreground/40", children: "// TODO(dev): remove the debug hook before launch. it's still listening in the console." })
    ] })
  ] });
}
const GRAVITY = 2e3;
const SUBSTEPS = 4;
const ITERATIONS = 8;
const FRICTION = 0.45;
const BETA = 0.12;
const SLOP = 0.4;
const MAX_BIAS = 700;
const MAX_SPEED = 3200;
const DENSITY = 1e-3;
const GRAB_STIFFNESS = 700;
const GRAB_DAMPING = 45;
const POSITION_PASSES = 2;
const POSITION_SHARE = 0.8;
const REST_SPEED = 20;
const REST_SPIN = 0.3;
const REST_SECONDS = 0.7;
const CREEP_SPEED = 30;
const CREEP_SPIN = 0.6;
const CREEP_BRAKE = 0.8;
const GROUP_TONES = [
  "border-cyan-400/50 text-cyan-200",
  "border-violet-400/50 text-violet-200",
  "border-emerald-400/50 text-emerald-200",
  "border-amber-400/50 text-amber-200",
  "border-sky-400/50 text-sky-200",
  "border-pink-400/50 text-pink-200"
];
const clamp01 = (t) => t < 0 ? 0 : t > 1 ? 1 : t;
function ends(b) {
  const cx = Math.cos(b.a) * b.half;
  const cy = Math.sin(b.a) * b.half;
  return [b.x - cx, b.y - cy, b.x + cx, b.y + cy];
}
function closestOnSegment(px, py, ax, ay, bx, by) {
  const dx = bx - ax;
  const dy = by - ay;
  const len2 = dx * dx + dy * dy;
  const t = len2 > 1e-9 ? clamp01(((px - ax) * dx + (py - ay) * dy) / len2) : 0;
  return [ax + dx * t, ay + dy * t];
}
function closestSegSeg(p1x, p1y, q1x, q1y, p2x, p2y, q2x, q2y) {
  const d1x = q1x - p1x, d1y = q1y - p1y, d2x = q2x - p2x, d2y = q2y - p2y;
  const rx = p1x - p2x, ry = p1y - p2y;
  const a = d1x * d1x + d1y * d1y;
  const e = d2x * d2x + d2y * d2y;
  const f = d2x * rx + d2y * ry;
  let s = 0;
  let t = 0;
  if (a <= 1e-9 && e <= 1e-9) {
    s = t = 0;
  } else if (a <= 1e-9) {
    t = clamp01(f / e);
  } else {
    const c = d1x * rx + d1y * ry;
    if (e <= 1e-9) {
      s = clamp01(-c / a);
    } else {
      const b = d1x * d2x + d1y * d2y;
      const denom = a * e - b * b;
      s = denom > 1e-9 ? clamp01((b * f - c * e) / denom) : 0;
      t = (b * s + f) / e;
      if (t < 0) {
        t = 0;
        s = clamp01(-c / a);
      } else if (t > 1) {
        t = 1;
        s = clamp01((b - c) / a);
      }
    }
  }
  return [p1x + d1x * s, p1y + d1y * s, p2x + d2x * t, p2y + d2y * t];
}
function makeContact(ai, bi, cax, cay, cbx, cby, ra, rb) {
  const dx = cbx - cax;
  const dy = cby - cay;
  const d2 = dx * dx + dy * dy;
  const rs = ra + rb;
  if (d2 >= rs * rs) return null;
  const d = Math.sqrt(d2);
  const nx = d > 1e-6 ? dx / d : 0;
  const ny = d > 1e-6 ? dy / d : 1;
  return {
    a: ai,
    b: bi,
    nx,
    ny,
    px: cax + nx * ra,
    py: cay + ny * ra,
    pen: rs - d,
    jn: 0,
    jt: 0,
    bounce: 0
  };
}
function collidePair(bodies, i, j, out) {
  const A = bodies[i];
  const B = bodies[j];
  const reach = A.half + A.r + B.half + B.r;
  const ddx = B.x - A.x;
  const ddy = B.y - A.y;
  if (ddx * ddx + ddy * ddy > reach * reach) return;
  const [a0x, a0y, a1x, a1y] = ends(A);
  const [b0x, b0y, b1x, b1y] = ends(B);
  const found = [];
  const push = (c) => {
    if (!c) return;
    for (let k = 0; k < found.length; k++) {
      const o = found[k];
      if ((o.px - c.px) ** 2 + (o.py - c.py) ** 2 < 16) {
        if (c.pen > o.pen) found[k] = c;
        return;
      }
    }
    found.push(c);
  };
  const [sx, sy, tx, ty] = closestSegSeg(a0x, a0y, a1x, a1y, b0x, b0y, b1x, b1y);
  push(makeContact(i, j, sx, sy, tx, ty, A.r, B.r));
  for (const [px, py] of [
    [a0x, a0y],
    [a1x, a1y]
  ]) {
    const [qx, qy] = closestOnSegment(px, py, b0x, b0y, b1x, b1y);
    push(makeContact(i, j, px, py, qx, qy, A.r, B.r));
  }
  for (const [px, py] of [
    [b0x, b0y],
    [b1x, b1y]
  ]) {
    const [qx, qy] = closestOnSegment(px, py, a0x, a0y, a1x, a1y);
    push(makeContact(i, j, qx, qy, px, py, A.r, B.r));
  }
  found.sort((p, q) => q.pen - p.pen);
  out.push(...found.slice(0, 2));
}
function collideWalls(bodies, i, W, H, out) {
  const b = bodies[i];
  const [x0, y0, x1, y1] = ends(b);
  for (const [ex, ey] of [
    [x0, y0],
    [x1, y1]
  ]) {
    const floor = ey + b.r - H;
    if (floor > 0) out.push(wall(i, 0, 1, ex, H, floor));
    const left = b.r - ex;
    if (left > 0) out.push(wall(i, -1, 0, 0, ey, left));
    const right = ex + b.r - W;
    if (right > 0) out.push(wall(i, 1, 0, W, ey, right));
  }
}
function wall(a, nx, ny, px, py, pen) {
  return { a, b: -1, nx, ny, px, py, pen, jn: 0, jt: 0, bounce: 0 };
}
function pointVel(b, px, py) {
  const rx = px - b.x;
  const ry = py - b.y;
  return [b.vx - b.w * ry, b.vy + b.w * rx];
}
function applyImpulse(b, px, py, jx, jy) {
  b.vx += jx * b.invM;
  b.vy += jy * b.invM;
  b.w += ((px - b.x) * jy - (py - b.y) * jx) * b.invI;
}
function relVel(bodies, c) {
  const A = bodies[c.a];
  const [vax, vay] = pointVel(A, c.px, c.py);
  if (c.b < 0) return [-vax, -vay];
  const [vbx, vby] = pointVel(bodies[c.b], c.px, c.py);
  return [vbx - vax, vby - vay];
}
function effMass(bodies, c, dx, dy) {
  const A = bodies[c.a];
  const raxd = (c.px - A.x) * dy - (c.py - A.y) * dx;
  let k = A.invM + raxd * raxd * A.invI;
  if (c.b >= 0) {
    const B = bodies[c.b];
    const rbxd = (c.px - B.x) * dy - (c.py - B.y) * dx;
    k += B.invM + rbxd * rbxd * B.invI;
  }
  return k;
}
function solveContact(bodies, c, dt) {
  const A = bodies[c.a];
  const B = c.b >= 0 ? bodies[c.b] : null;
  let [rvx, rvy] = relVel(bodies, c);
  const vn = rvx * c.nx + rvy * c.ny;
  const bias = Math.min(MAX_BIAS, BETA / dt * Math.max(0, c.pen - SLOP));
  const target = Math.max(bias, c.bounce);
  const kn = effMass(bodies, c, c.nx, c.ny);
  let dj = (target - vn) / kn;
  const jn = Math.max(0, c.jn + dj);
  dj = jn - c.jn;
  c.jn = jn;
  applyImpulse(A, c.px, c.py, -dj * c.nx, -dj * c.ny);
  if (B) applyImpulse(B, c.px, c.py, dj * c.nx, dj * c.ny);
  [rvx, rvy] = relVel(bodies, c);
  const tx = -c.ny;
  const ty = c.nx;
  const vt = rvx * tx + rvy * ty;
  const kt = effMass(bodies, c, tx, ty);
  let djt = -vt / kt;
  const max = FRICTION * c.jn;
  const jt = Math.max(-max, Math.min(max, c.jt + djt));
  djt = jt - c.jt;
  c.jt = jt;
  applyImpulse(A, c.px, c.py, -djt * tx, -djt * ty);
  if (B) applyImpulse(B, c.px, c.py, djt * tx, djt * ty);
}
function detect(bodies, W, H) {
  const contacts = [];
  const order = bodies.map((_, i) => i);
  const reach = bodies.map((b) => b.half + b.r);
  order.sort((p, q) => bodies[p].x - reach[p] - (bodies[q].x - reach[q]));
  for (let k = 0; k < order.length; k++) {
    const i = order[k];
    collideWalls(bodies, i, W, H, contacts);
    const right = bodies[i].x + reach[i];
    for (let m = k + 1; m < order.length; m++) {
      const j = order[m];
      if (bodies[j].x - reach[j] > right) break;
      if (Math.abs(bodies[j].y - bodies[i].y) > reach[i] + reach[j]) continue;
      collidePair(bodies, i, j, contacts);
    }
  }
  return contacts;
}
function separate(bodies, W, H) {
  for (let pass = 0; pass < POSITION_PASSES; pass++) {
    for (const c of detect(bodies, W, H)) {
      const A = bodies[c.a];
      const B = c.b >= 0 ? bodies[c.b] : null;
      const total = A.invM + (B ? B.invM : 0);
      const push = Math.max(0, c.pen - SLOP) * POSITION_SHARE / total;
      A.x -= c.nx * push * A.invM;
      A.y -= c.ny * push * A.invM;
      if (B) {
        B.x += c.nx * push * B.invM;
        B.y += c.ny * push * B.invM;
      }
    }
  }
}
function step(bodies, W, H, dt, grab) {
  for (const b of bodies) b.vy += GRAVITY * dt;
  if (grab) {
    const b = bodies[grab.i];
    const c = Math.cos(b.a);
    const s = Math.sin(b.a);
    const ax = b.x + grab.lx * c - grab.ly * s;
    const ay = b.y + grab.lx * s + grab.ly * c;
    const [vx, vy] = pointVel(b, ax, ay);
    const m = 1 / b.invM;
    const fx = m * (GRAB_STIFFNESS * (grab.tx - ax) - GRAB_DAMPING * vx);
    const fy = m * (GRAB_STIFFNESS * (grab.ty - ay) - GRAB_DAMPING * vy - GRAVITY);
    applyImpulse(b, ax, ay, fx * dt, fy * dt);
    b.w *= 0.985;
  }
  const contacts = detect(bodies, W, H);
  for (const c of contacts) {
    const [rvx, rvy] = relVel(bodies, c);
    const vn = rvx * c.nx + rvy * c.ny;
    c.bounce = vn < -120 ? -0.18 * vn : 0;
  }
  for (let k = 0; k < ITERATIONS; k++) for (const c of contacts) solveContact(bodies, c, dt);
  for (const b of bodies) {
    const speed = Math.hypot(b.vx, b.vy);
    if (speed > MAX_SPEED) {
      b.vx *= MAX_SPEED / speed;
      b.vy *= MAX_SPEED / speed;
    }
    if (Math.hypot(b.vx, b.vy) < CREEP_SPEED && Math.abs(b.w) < CREEP_SPIN) {
      b.vx *= CREEP_BRAKE;
      b.vy *= CREEP_BRAKE;
      b.w *= CREEP_BRAKE;
    } else {
      b.vx *= 0.9995;
      b.vy *= 0.9995;
      b.w *= 0.998;
    }
    b.x += b.vx * dt;
    b.y += b.vy * dt;
    b.a += b.w * dt;
  }
}
function SkillsPlayground({ groups }) {
  const chips = Object.entries(groups).flatMap(
    ([group2, items], g) => items.map((label) => ({ label, group: group2, tone: GROUP_TONES[g % GROUP_TONES.length] }))
  );
  const pitRef = reactExports.useRef(null);
  const chipRefs = reactExports.useRef([]);
  const bodies = reactExports.useRef([]);
  const grab = reactExports.useRef(null);
  const rest2 = reactExports.useRef({ calm: 0, asleep: false });
  const [dragging, setDragging] = reactExports.useState(null);
  const wake = () => {
    rest2.current = { calm: 0, asleep: false };
  };
  reactExports.useEffect(() => {
    const pit = pitRef.current;
    if (!pit) return;
    let raf = 0;
    let started = false;
    let visible = false;
    let fontsReady = false;
    if (document.fonts)
      void document.fonts.ready.then(() => {
        fontsReady = true;
      });
    else fontsReady = true;
    let last = performance.now();
    let size = { W: 0, H: 0 };
    const start = () => {
      started = true;
      const W = pit.clientWidth;
      bodies.current = chipRefs.current.map((el, i) => {
        const width = el?.offsetWidth ?? 80;
        const height = el?.offsetHeight ?? 28;
        const r = height / 2;
        const m = width * height * DENSITY;
        return {
          x: r + width / 2 + Math.random() * Math.max(1, W - width - 2 * r),
          // Staggered above the box, so they rain in rather than appear.
          y: -height - i * 34 - Math.random() * 40,
          a: (Math.random() - 0.5) * 0.8,
          vx: (Math.random() - 0.5) * 120,
          vy: 0,
          w: (Math.random() - 0.5) * 4,
          half: Math.max(0, (width - height) / 2),
          r,
          width,
          height,
          invM: 1 / m,
          invI: 12 / (m * (width * width + height * height))
        };
      });
    };
    const paint = () => {
      bodies.current.forEach((b, i) => {
        const el = chipRefs.current[i];
        if (el)
          el.style.transform = `translate(${b.x - b.width / 2}px, ${b.y - b.height / 2}px) rotate(${b.a}rad)`;
      });
    };
    const frame = (now2) => {
      raf = requestAnimationFrame(frame);
      const elapsed = Math.min(1 / 30, (now2 - last) / 1e3);
      last = now2;
      if (!visible || document.hidden || !fontsReady) return;
      if (!started) start();
      const W = pit.clientWidth;
      const H = pit.clientHeight;
      if (W !== size.W || H !== size.H) {
        size = { W, H };
        wake();
      }
      if (rest2.current.asleep && !grab.current) return;
      const dt = elapsed / SUBSTEPS;
      for (let s = 0; s < SUBSTEPS; s++) step(bodies.current, W, H, dt, grab.current);
      separate(bodies.current, W, H);
      paint();
      const moving = bodies.current.some(
        (b) => Math.hypot(b.vx, b.vy) > REST_SPEED || Math.abs(b.w) > REST_SPIN
      );
      rest2.current.calm = moving || grab.current ? 0 : rest2.current.calm + elapsed;
      if (rest2.current.calm > REST_SECONDS) rest2.current.asleep = true;
    };
    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
      },
      { rootMargin: "0px 0px -15% 0px" }
    );
    io.observe(pit);
    raf = requestAnimationFrame(frame);
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
    };
  }, []);
  const pitPoint = (e) => {
    const r = pitRef.current.getBoundingClientRect();
    return [
      Math.max(0, Math.min(r.width, e.clientX - r.left)),
      Math.max(-120, Math.min(r.height, e.clientY - r.top))
    ];
  };
  const onDown = (i) => (e) => {
    const b = bodies.current[i];
    if (!b || e.button !== 0) return;
    e.currentTarget.setPointerCapture(e.pointerId);
    const [px, py] = pitPoint(e);
    const c = Math.cos(-b.a);
    const s = Math.sin(-b.a);
    const dx = px - b.x;
    const dy = py - b.y;
    grab.current = { i, lx: dx * c - dy * s, ly: dx * s + dy * c, tx: px, ty: py };
    wake();
    setDragging(i);
  };
  const onMove = (e) => {
    if (!grab.current) return;
    if (e.pointerType === "mouse" && e.buttons === 0) return onUp();
    const [px, py] = pitPoint(e);
    grab.current.tx = px;
    grab.current.ty = py;
  };
  const onUp = () => {
    if (!grab.current) return;
    grab.current = null;
    wake();
    setDragging(null);
  };
  reactExports.useEffect(() => {
    const release = () => {
      if (!grab.current) return;
      grab.current = null;
      rest2.current = { calm: 0, asleep: false };
      setDragging(null);
    };
    const onVisibility = () => document.hidden && release();
    window.addEventListener("pointerup", release);
    window.addEventListener("pointercancel", release);
    window.addEventListener("blur", release);
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      window.removeEventListener("pointerup", release);
      window.removeEventListener("pointercancel", release);
      window.removeEventListener("blur", release);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);
  const shake = () => {
    wake();
    for (const b of bodies.current) {
      b.vy -= 700 + Math.random() * 700;
      b.vx += (Math.random() - 0.5) * 700;
      b.w += (Math.random() - 0.5) * 12;
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-3 flex items-center justify-between gap-3 font-mono text-xs text-muted-foreground", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Grab a chip and throw it." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          onClick: shake,
          className: "rounded-md border border-border bg-card px-3 py-1.5 text-foreground transition-colors hover:border-primary/60 hover:text-primary",
          children: "Shake the box"
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        ref: pitRef,
        className: "relative h-[440px] select-none overflow-hidden rounded-xl border border-border bg-card/30",
        style: {
          backgroundImage: "radial-gradient(circle at 1px 1px, color-mix(in oklab, var(--color-foreground) 10%, transparent) 1px, transparent 0)",
          backgroundSize: "22px 22px"
        },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "sr-only", children: chips.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
            c.group,
            ": ",
            c.label
          ] }, c.label)) }),
          chips.map((c, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              ref: (el) => {
                chipRefs.current[i] = el;
              },
              "aria-hidden": true,
              "data-cursor": dragging === i ? "Throw" : "Grab",
              onPointerDown: onDown(i),
              onPointerMove: onMove,
              onPointerUp: onUp,
              onPointerCancel: onUp,
              onLostPointerCapture: onUp,
              className: `absolute left-0 top-0 origin-center touch-none whitespace-nowrap rounded-full border bg-background px-2.5 py-0.5 text-[11px] font-medium will-change-transform sm:px-3.5 sm:py-1.5 sm:text-sm ${c.tone} ${dragging === i ? "cursor-grabbing ring-1 ring-primary" : "cursor-grab"}`,
              style: { transform: "translate(-9999px, 0)" },
              children: c.label
            },
            c.label
          ))
        ]
      }
    )
  ] });
}
function Skills() {
  const [view, setView] = reactExports.useState("list");
  reactExports.useEffect(() => {
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) setView("play");
  }, []);
  const tab = (v, label) => /* @__PURE__ */ jsxRuntimeExports.jsx(
    "button",
    {
      type: "button",
      onClick: () => setView(v),
      "aria-pressed": view === v,
      className: `rounded-md px-3 py-1.5 font-mono text-xs transition-colors ${view === v ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`,
      children: label
    }
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { id: "skills", className: "py-24 border-t border-border", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-12 flex flex-wrap items-center justify-between gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-3xl font-bold tracking-tight", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Scramble, { text: "Tech stack" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-1 rounded-lg border border-border bg-card p-1", children: [
        tab("play", "Playground"),
        tab("list", "List")
      ] })
    ] }),
    view === "play" ? /* @__PURE__ */ jsxRuntimeExports.jsx(SkillsPlayground, { groups: skills }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid sm:grid-cols-2 gap-4", children: Object.entries(skills).map(([group2, items]) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "spotlight rounded-xl border border-border bg-card/40 p-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3", children: group2 }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: items.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        "span",
        {
          className: "px-3 py-1 rounded-md border border-border text-sm bg-card",
          children: s
        },
        s
      )) })
    ] }, group2)) })
  ] }) });
}
const DURATION_MS = 1600;
function CountUp({ value }) {
  const [ref, inView] = useInView();
  const match = /^(\D*)([\d,]+)(.*)$/.exec(value);
  const target = match ? Number(match[2].replace(/,/g, "")) : 0;
  const [n, setN] = reactExports.useState(target);
  reactExports.useEffect(() => {
    if (!match || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!inView) {
      setN(0);
      return;
    }
    const start = performance.now();
    let raf = 0;
    const tick = (now2) => {
      const t = Math.min(1, (now2 - start) / DURATION_MS);
      setN(Math.round(target * (1 - Math.pow(1 - t, 4))));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, target]);
  if (!match) return /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: value });
  const grouped = match[2].includes(",") ? n.toLocaleString("en-US") : String(n);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("span", { ref, "aria-label": value, className: "tabular-nums", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { "aria-hidden": true, children: [
    match[1],
    grouped,
    match[3]
  ] }) });
}
function Stats() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "grid grid-cols-2 sm:grid-cols-4 gap-px bg-border border border-border rounded-lg overflow-hidden", children: stats.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "spotlight bg-card p-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-2xl font-bold tracking-tight", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CountUp, { value: s.value }) }),
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
        if (command.hidden) continue;
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
        Object.entries(skills).map(([group2, items]) => ({
          label: group2,
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
    name: "robots",
    aliases: ["robot"],
    usage: "robots [alice|bob] [on|off]",
    description: "Alice and Bob, who play ball at the bottom of the page",
    run: ({ args, print }) => {
      const name = ROBOT_NAMES.find((n) => n === args[0]);
      const wanted = name ? args[1] : args[0];
      if (!wanted) {
        const state = readRobots();
        for (const n of ROBOT_NAMES) {
          print(`${n.padEnd(6)} ${state[n] ? "online" : "powered down"}`);
        }
        print("Use `robots off`, `robots alice off`, `robots bob on`.");
        return;
      }
      if (wanted !== "on" && wanted !== "off") {
        print("Usage: robots [alice|bob] [on|off]");
        return;
      }
      const on = wanted === "on";
      const was = readRobots();
      setRobots(name ?? "both", on);
      const survivor = ROBOT_NAMES.find((n) => n !== name);
      if (name && !on && was.alice && was.bob && survivor)
        print(`${survivor} has been waiting for this. Watch the bottom of the page…`);
      else if (name) print(`${name} ${on ? "is back on their feet." : "powered down."}`);
      else print(on ? "Alice and Bob are back." : "Both robots powered down.");
    }
  },
  {
    name: "car",
    aliases: ["cars", "vehicle", "garage"],
    usage: "car [drive|on|off|car|racer|truck|moto]",
    description: "the little vehicle above the terminal bar: switch it on, off, or swap it",
    run: ({ args, print, actions }) => {
      const arg = args[0]?.toLowerCase();
      const kind = VEHICLE_KINDS.find((k) => k === arg);
      if (!arg) {
        const v = readVehicle();
        print(`vehicle  ${v.on ? "on" : "off"} · ${VEHICLE_LABELS[v.kind]}`);
        print(`garage   ${VEHICLE_KINDS.map((k) => `${k} (${VEHICLE_LABELS[k]})`).join(", ")}`);
        print("drive    `car drive`, or click the car bottom-left (desktop)");
        print("keys     ↑ ↓ ← → or WASD · shift turbo · space brake");
        print("crash    knock headings, buttons and images across the page;");
        print("         hits chain into whatever they slide into");
        print("panel    swap vehicle · Stop driving · Reset website (puts it all back)");
        print("note     the terminal closes while you drive, and won't reopen until you stop");
        print("fun fact it can't resist the ACPC track. it drives right into the party.");
        print("Use `car drive`, `car racer`, `car truck`, `car moto`, `car off`, `car on`.");
        return;
      }
      if (arg === "on" || arg === "off") {
        const on = arg === "on";
        if (readVehicle().on === on) {
          print(
            on ? "It's already on — bottom-left. `car drive` to take the wheel." : "It's already parked. `car on` brings it back."
          );
          return;
        }
        setVehicle({ on });
        print(on ? "Engine on. It's back, bottom-left." : "Parked. `car on` brings it back.");
        return;
      }
      if (arg === "drive" || arg === "play" || arg === "go") {
        if (!canDriveHere()) {
          print("Driving needs a keyboard — try it on a desktop.");
          return;
        }
        if (!readVehicle().on) setVehicle({ on: true });
        print("Closing the terminal… you're driving! Press Stop driving to come back.");
        actions.close();
        window.setTimeout(requestDrive, 450);
        return;
      }
      if (kind) {
        setVehicle({ on: true, kind });
        print(`Swapped to the ${VEHICLE_LABELS[kind].toLowerCase()}. Click it to drive.`);
        return;
      }
      print("Usage: car [on|off|car|racer|truck|moto]");
    }
  },
  {
    name: "mysteries",
    aliases: ["mystery", "secrets"],
    hidden: true,
    description: "the hidden mysteries you have found",
    run: ({ print }) => {
      const solved = solvedMysteries();
      print(`Mysteries found: ${solved.length}/${MYSTERIES.length}`);
      if (!solved.length) print("Hidden around the site. Every one leaves a clue — look closely.");
      for (const m of MYSTERIES) {
        const done = solved.includes(m.id);
        const tag = m.dev ? " [dev]" : "";
        print(done ? `  ✔ ${m.title}${tag}` : `  ? ???${tag} — ${m.riddle}`);
      }
      if (solved.length === MYSTERIES.length)
        print("All of them. Click the counter for your certificate.");
    }
  },
  {
    name: "ssh",
    hidden: true,
    description: "",
    run: ({ rawArgs, print }) => {
      const target = rawArgs.trim().toLowerCase();
      if (target === "alice@ahmed.dev") {
        print("Connecting to ahmed.dev…");
        print("Welcome back, Alice. Last login: the ACPC finals, from a balloon.");
        print('alice@ahmed.dev:~$ cat notes.txt → "tabs."');
        confetti();
        solveMystery("crawler");
        return;
      }
      if (target.endsWith("@ahmed.dev")) {
        print(`${target}: Permission denied (publickey). Only Alice left her login lying around.`);
        return;
      }
      print("ssh: Could not resolve hostname. Try a user @ahmed.dev.");
    }
  },
  {
    name: "deploy",
    hidden: true,
    description: "",
    run: ({ rawArgs, print }) => {
      const flags = rawArgs.trim().toLowerCase().replace(/\s+/g, " ");
      if (flags === "--force friday") {
        print("Deploying to production… on a Friday… with --force.");
        print("🔥 Every check skipped. Nothing caught fire this time. Bold.");
        confetti();
        solveMystery("status");
        return;
      }
      print("deploy: refusing to deploy without the release checklist's last item.");
    }
  },
  {
    name: "hire",
    hidden: true,
    description: "",
    run: ({ print }) => {
      print("hire: permission denied");
      print("(only root can make offers. you know how to become root.)");
    }
  },
  {
    name: "sudo",
    hidden: true,
    description: "",
    run: ({ rawArgs, print }) => {
      const what = rawArgs.trim().toLowerCase().replace(/\s+/g, " ");
      if (what === "hire ahmed" || what === "hire ahmed khaled") {
        print("[sudo] password for recruiter: ••••••••");
        print(
          "Permission granted. 🎉 Offer letter queued — the fastest way to send it is `email`."
        );
        confetti();
        solveMystery("sudo");
        return;
      }
      print(`${what || "you"} is not in the sudoers file. This incident will be reported.`);
    }
  },
  {
    name: "submit",
    hidden: true,
    description: "",
    run: ({ args, print }) => {
      const answer = (args[0] ?? "").replace(/[^0-9]/g, "");
      if (!answer) {
        print("Usage: submit <answer>");
        return;
      }
      print(`Judging… test 1 … test 7 …`);
      if (fnv(answer) === "3f141389") {
        print("✅ ACCEPTED · 0.01s · 1 MB. Clean work.");
        solveMystery("problem");
      } else {
        print("❌ WRONG ANSWER on test 1. Read the statement again.");
      }
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
const COMMAND_NAMES = [...byName.entries()].filter(([, c]) => !c.hidden).map(([n]) => n);
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
  },
  {
    kind: "sys",
    text: "🚗 See the car bottom-left? Click it to drive (desktop): arrows/WASD, shift turbo, space brake — and crash into anything. `car` for the garage."
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
function useScrollReveal(selector = "main > section") {
  reactExports.useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const els = Array.from(document.querySelectorAll(selector)).filter(
      (el) => el.getBoundingClientRect().top > window.innerHeight
    );
    for (const el of els) el.classList.add("reveal");
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          e.target.classList.add("reveal-in");
          io.unobserve(e.target);
        }
      },
      { rootMargin: "0px 0px -12% 0px" }
    );
    for (const el of els) io.observe(el);
    return () => io.disconnect();
  }, [selector]);
}
function useSpotlight() {
  reactExports.useEffect(() => {
    const onMove = (e) => {
      const el = e.target?.closest(".spotlight");
      if (!el) return;
      const r = el.getBoundingClientRect();
      el.style.setProperty("--mx", `${e.clientX - r.left}px`);
      el.style.setProperty("--my", `${e.clientY - r.top}px`);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);
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
  useScrollReveal();
  useSpotlight();
  reactExports.useEffect(() => setMounted(true), []);
  const changeMode = (mode) => {
    if (mode !== "closed" && isVehicleDriving()) {
      refuseTerminal();
      return;
    }
    writeString(STORAGE_KEYS.termMode, mode);
    setTermMode(mode);
  };
  reactExports.useEffect(() => {
    const onDriving = (e) => {
      if (!e.detail) return;
      writeString(STORAGE_KEYS.termMode, "closed");
      setTermMode("closed");
    };
    window.addEventListener(VEHICLE_DRIVING_EVENT, onDriving);
    return () => window.removeEventListener(VEHICLE_DRIVING_EVENT, onDriving);
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative min-h-screen overflow-x-clip bg-background text-foreground", children: [
    mounted && /* @__PURE__ */ jsxRuntimeExports.jsx(Preloader, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { "aria-hidden": true, className: "grain" }),
    mounted && /* @__PURE__ */ jsxRuntimeExports.jsx(Starfield, {}),
    mounted && /* @__PURE__ */ jsxRuntimeExports.jsx(MouseGlow, {}),
    mounted && /* @__PURE__ */ jsxRuntimeExports.jsx(CustomCursor, {}),
    mounted && /* @__PURE__ */ jsxRuntimeExports.jsx(RobotWorld, { walkway: termMode !== "float" }),
    mounted && termMode !== "closed" && /* @__PURE__ */ jsxRuntimeExports.jsx(Terminal, { mode: termMode, onClose: () => changeMode("closed"), onMinimize: () => changeMode("min"), onRestore: () => changeMode("float") }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(NavBar, {}),
    mounted && /* @__PURE__ */ jsxRuntimeExports.jsx(SessionTimer, {}),
    mounted && /* @__PURE__ */ jsxRuntimeExports.jsx(BackToTop, {}),
    mounted && /* @__PURE__ */ jsxRuntimeExports.jsx(PlayCar, {}),
    mounted && /* @__PURE__ */ jsxRuntimeExports.jsx(MysteryHud, {}),
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
