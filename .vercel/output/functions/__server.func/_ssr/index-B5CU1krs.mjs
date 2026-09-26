import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { o as readString, S as STORAGE_KEYS, u as readNumber, q as writeString, p as profile, r as readFlag, d as domainParts, j as roles, l as linkOf, n as stats, i as experiences, s as skills, e as competitions, f as problemSetting, h as education, m as links, b as readJson, c as writeJson, k as projects, g as getStoredTheme, a as applyTheme, T as THEME_EVENT, t as toggleTheme, w as writeFlag, v as removeKey } from "./router-D_Re7Kqf.mjs";
import { S as Slot } from "../_libs/radix-ui__react-slot.mjs";
import { c as cva } from "../_libs/class-variance-authority.mjs";
import { c as clsx } from "../_libs/clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
import { R as Root, P as Portal, C as Content, a as Close, T as Title, D as Description, O as Overlay } from "../_libs/radix-ui__react-dialog.mjs";
import { M as Mail, C as Clock, A as ArrowUp, a as ArrowUpRight, G as Github, L as Linkedin, b as CodeXml, T as Trophy, F as FileText, B as Briefcase, c as Gamepad2, R as RotateCw, d as GraduationCap, e as MapPin, f as Globe, P as Phone, S as SquareTerminal, g as Sun, h as Moon, X } from "../_libs/lucide-react.mjs";
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
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-3xl font-bold tracking-tight", children: "Gaming mode — Cups & Ball" })
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
const WORDS = Object.values(skills).flat();
const BASE_SPEED = 40;
const MAX_SKEW = 12;
function ScrollMarquee() {
  const trackRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let x = 0;
    let boost = 0;
    let direction = 1;
    let lastY = window.scrollY;
    let last = performance.now();
    let raf = 0;
    const frame = (now2) => {
      const dt = Math.min(0.05, (now2 - last) / 1e3);
      last = now2;
      const dy = window.scrollY - lastY;
      lastY = window.scrollY;
      if (dy !== 0) direction = dy > 0 ? 1 : -1;
      boost += (Math.abs(dy) * 6 - boost) * 0.12;
      x -= direction * (BASE_SPEED + boost * 8) * dt;
      const half = track.scrollWidth / 2;
      if (half > 0) x = (x % half - half) % half;
      const skew = Math.max(-MAX_SKEW, Math.min(MAX_SKEW, direction * boost * 0.15));
      track.style.transform = `translate3d(${x}px,0,0) skewX(${-skew}deg)`;
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(raf);
  }, []);
  const row = (key) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex shrink-0 items-center", children: WORDS.map((w, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: i % 3 === 1 ? "marquee-fill" : "marquee-outline", children: w }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mx-6 text-primary/60 sm:mx-10", children: "✦" })
  ] }, w + i)) }, key);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      "aria-hidden": true,
      className: "relative left-1/2 w-screen -translate-x-1/2 overflow-hidden border-y border-border py-6 select-none",
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          ref: trackRef,
          className: "flex w-max whitespace-nowrap text-5xl font-black uppercase tracking-tight will-change-transform sm:text-7xl",
          children: [
            row("a"),
            row("b")
          ]
        }
      )
    }
  );
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
  pose: pose2,
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
      className: POSE_CLASS[pose2],
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
const rand = (min, max) => min + Math.random() * (max - min);
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
    const walk = async (name, to, speed, pose2 = "walk") => {
      const from = world.current[name].x;
      const ms = Math.abs(to - from) / speed * 1e3;
      set((w) => {
        w[name] = { ...w[name], x: to, ms, pose: pose2, facing: to >= from ? 1 : -1 };
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
      const target = name === "alice" ? rand(mid, max - BALL_PX) : rand(min, mid);
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
        await walk(name, rand(min, max), SPEED.wander);
        await sleep(rand(...PAUSE_MS));
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
            x: rand(min, max),
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
          to: v.x + ROBOT_W / 2 + rand(-4, 4),
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
                className: "absolute left-0 will-change-transform",
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
function Achievements() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "py-24 border-t border-border", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-12", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Trophy, { className: "w-5 h-5 text-muted-foreground" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-3xl font-bold tracking-tight", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Scramble, { text: "Competitions & community" }) })
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
  const [time, setTime] = reactExports.useState(null);
  reactExports.useEffect(() => {
    setTime(now());
    const id = window.setInterval(() => setTime(now()), 1e3);
    return () => window.clearInterval(id);
  }, []);
  if (!time) return null;
  const hour = Number(time.slice(0, 2));
  const awake = hour >= 9 && hour < 24;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-2 font-mono text-xs text-muted-foreground", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `h-1.5 w-1.5 rounded-full ${awake ? "bg-emerald-400" : "bg-amber-400"}` }),
    "Cairo · ",
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "tabular-nums text-foreground", children: time }),
    " ·",
    " ",
    awake ? "probably awake" : "probably asleep"
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
function Contact() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { id: "contact", className: "py-24 border-t border-border", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-5xl sm:text-7xl font-black tracking-tighter leading-[0.95]", children: [
      "Let's build",
      /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent", children: "something." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LocalTime, {}) }),
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
const SIM_RES = 128;
const DYE_RES_DESKTOP = 512;
const DYE_RES_MOBILE = 256;
const DENSITY_DISSIPATION = 1.4;
const VELOCITY_DISSIPATION = 0.4;
const PRESSURE_DECAY = 0.8;
const PRESSURE_ITERATIONS = 20;
const CURL = 22;
const SPLAT_RADIUS = 0.22 / 100;
const SPLAT_FORCE = 5e3;
const DYE_INTENSITY = 0.12;
const MAX_DPR = 1.5;
const PALETTE = [
  [0, 0.78, 0.92],
  [0.68, 0.32, 1],
  [0.25, 0.55, 1]
];
const VERT = `#version 300 es
precision highp float;
in vec2 aPosition;
out vec2 vUv, vL, vR, vT, vB;
uniform vec2 texelSize;
void main() {
  vUv = aPosition * 0.5 + 0.5;
  vL = vUv - vec2(texelSize.x, 0.0);
  vR = vUv + vec2(texelSize.x, 0.0);
  vT = vUv + vec2(0.0, texelSize.y);
  vB = vUv - vec2(0.0, texelSize.y);
  gl_Position = vec4(aPosition, 0.0, 1.0);
}`;
const HEAD = `#version 300 es
precision highp float;
precision highp sampler2D;
in vec2 vUv, vL, vR, vT, vB;
out vec4 o;
`;
const FRAG = {
  clear: `${HEAD}
uniform sampler2D uTexture; uniform float value;
void main() { o = value * texture(uTexture, vUv); }`,
  splat: `${HEAD}
uniform sampler2D uTarget; uniform float aspectRatio; uniform vec3 color;
uniform vec2 point; uniform float radius;
void main() {
  vec2 p = vUv - point; p.x *= aspectRatio;
  vec3 s = exp(-dot(p, p) / radius) * color;
  o = vec4(texture(uTarget, vUv).xyz + s, 1.0);
}`,
  advection: `${HEAD}
uniform sampler2D uVelocity, uSource; uniform vec2 velTexel;
uniform float dt, dissipation;
void main() {
  vec2 coord = vUv - dt * texture(uVelocity, vUv).xy * velTexel;
  o = texture(uSource, coord) / (1.0 + dissipation * dt);
  o.a = 1.0;
}`,
  divergence: `${HEAD}
uniform sampler2D uVelocity;
void main() {
  float L = texture(uVelocity, vL).x, R = texture(uVelocity, vR).x;
  float T = texture(uVelocity, vT).y, B = texture(uVelocity, vB).y;
  vec2 C = texture(uVelocity, vUv).xy;
  // Solid walls: reflect velocity at the edges.
  if (vL.x < 0.0) L = -C.x; if (vR.x > 1.0) R = -C.x;
  if (vT.y > 1.0) T = -C.y; if (vB.y < 0.0) B = -C.y;
  o = vec4(0.5 * (R - L + T - B), 0.0, 0.0, 1.0);
}`,
  curl: `${HEAD}
uniform sampler2D uVelocity;
void main() {
  float L = texture(uVelocity, vL).y, R = texture(uVelocity, vR).y;
  float T = texture(uVelocity, vT).x, B = texture(uVelocity, vB).x;
  o = vec4(0.5 * (R - L - T + B), 0.0, 0.0, 1.0);
}`,
  vorticity: `${HEAD}
uniform sampler2D uVelocity, uCurl; uniform float curl, dt;
void main() {
  float L = texture(uCurl, vL).x, R = texture(uCurl, vR).x;
  float T = texture(uCurl, vT).x, B = texture(uCurl, vB).x;
  float C = texture(uCurl, vUv).x;
  vec2 force = 0.5 * vec2(abs(T) - abs(B), abs(R) - abs(L));
  force /= length(force) + 0.0001;
  force *= curl * C; force.y *= -1.0;
  vec2 v = texture(uVelocity, vUv).xy + force * dt;
  o = vec4(clamp(v, -1000.0, 1000.0), 0.0, 1.0);
}`,
  pressure: `${HEAD}
uniform sampler2D uPressure, uDivergence;
void main() {
  float L = texture(uPressure, vL).x, R = texture(uPressure, vR).x;
  float T = texture(uPressure, vT).x, B = texture(uPressure, vB).x;
  float div = texture(uDivergence, vUv).x;
  o = vec4((L + R + B + T - div) * 0.25, 0.0, 0.0, 1.0);
}`,
  gradientSubtract: `${HEAD}
uniform sampler2D uPressure, uVelocity;
void main() {
  float L = texture(uPressure, vL).x, R = texture(uPressure, vR).x;
  float T = texture(uPressure, vT).x, B = texture(uPressure, vB).x;
  vec2 v = texture(uVelocity, vUv).xy - vec2(R - L, T - B);
  o = vec4(v, 0.0, 1.0);
}`,
  // Transparent where there is no ink, so the page shows through.
  display: `${HEAD}
uniform sampler2D uTexture;
void main() {
  vec3 c = min(texture(uTexture, vUv).rgb, vec3(1.0));
  float a = max(c.r, max(c.g, c.b));
  o = vec4(c, a);
}`
};
function compile(gl, type, src) {
  const s = gl.createShader(type);
  gl.shaderSource(s, src);
  gl.compileShader(s);
  if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(s) ?? "");
  return s;
}
function link(gl, vs, fsSrc) {
  const program = gl.createProgram();
  gl.attachShader(program, vs);
  gl.attachShader(program, compile(gl, gl.FRAGMENT_SHADER, fsSrc));
  gl.bindAttribLocation(program, 0, "aPosition");
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS))
    throw new Error(gl.getProgramInfoLog(program) ?? "");
  const uniforms = {};
  const count = gl.getProgramParameter(program, gl.ACTIVE_UNIFORMS);
  for (let i = 0; i < count; i++) {
    const name = gl.getActiveUniform(program, i).name;
    uniforms[name] = gl.getUniformLocation(program, name);
  }
  return { program, uniforms };
}
function createFbo(gl, w, h) {
  const texture = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, texture);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA16F, w, h, 0, gl.RGBA, gl.HALF_FLOAT, null);
  const fbo = gl.createFramebuffer();
  gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
  gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture, 0);
  if (gl.checkFramebufferStatus(gl.FRAMEBUFFER) !== gl.FRAMEBUFFER_COMPLETE)
    throw new Error("half-float framebuffer not renderable");
  gl.viewport(0, 0, w, h);
  gl.clearColor(0, 0, 0, 1);
  gl.clear(gl.COLOR_BUFFER_BIT);
  return { texture, fbo, w, h };
}
function createDouble(gl, w, h) {
  const d = {
    read: createFbo(gl, w, h),
    write: createFbo(gl, w, h),
    w,
    h,
    swap() {
      [d.read, d.write] = [d.write, d.read];
    }
  };
  return d;
}
function gridFor(res, w, h) {
  const aspect = w > h ? w / h : h / w;
  const min = Math.round(res);
  const max = Math.round(res * aspect);
  return w > h ? { w: max, h: min } : { w: min, h: max };
}
function FluidCanvas({ className }) {
  const canvasRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const gl = canvas.getContext("webgl2", {
      alpha: true,
      premultipliedAlpha: true,
      antialias: false,
      depth: false,
      stencil: false
    });
    if (!gl || !gl.getExtension("EXT_color_buffer_float")) return;
    let programs;
    try {
      const vs = compile(gl, gl.VERTEX_SHADER, VERT);
      programs = Object.fromEntries(
        Object.keys(FRAG).map((k) => [k, link(gl, vs, FRAG[k])])
      );
    } catch {
      return;
    }
    gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, -1, 1, 1, 1, 1, -1]), gl.STATIC_DRAW);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, gl.createBuffer());
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array([0, 1, 2, 0, 2, 3]), gl.STATIC_DRAW);
    gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(0);
    const blit = (target) => {
      if (target) {
        gl.viewport(0, 0, target.w, target.h);
        gl.bindFramebuffer(gl.FRAMEBUFFER, target.fbo);
      } else {
        gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
        gl.bindFramebuffer(gl.FRAMEBUFFER, null);
      }
      gl.drawElements(gl.TRIANGLES, 6, gl.UNSIGNED_SHORT, 0);
    };
    let unit = 0;
    const run = (name, values) => {
      const p = programs[name];
      gl.useProgram(p.program);
      unit = 0;
      for (const [key, v] of Object.entries(values)) {
        const loc = p.uniforms[key];
        if (loc === void 0) continue;
        if (typeof v === "number") gl.uniform1f(loc, v);
        else if (Array.isArray(v)) {
          if (v.length === 2) gl.uniform2f(loc, v[0], v[1]);
          else gl.uniform3f(loc, v[0], v[1], v[2]);
        } else {
          gl.activeTexture(gl.TEXTURE0 + unit);
          gl.bindTexture(gl.TEXTURE_2D, v.texture);
          gl.uniform1i(loc, unit++);
        }
      }
    };
    let velocity, dye, pressure, divergence, curl;
    let ready = false;
    const dyeRes = window.matchMedia("(pointer: coarse)").matches ? DYE_RES_MOBILE : DYE_RES_DESKTOP;
    const resize = () => {
      const dpr = Math.min(MAX_DPR, window.devicePixelRatio || 1);
      const w = Math.max(1, Math.round(canvas.clientWidth * dpr));
      const h = Math.max(1, Math.round(canvas.clientHeight * dpr));
      if (ready && canvas.width === w && canvas.height === h) return;
      canvas.width = w;
      canvas.height = h;
      const sim = gridFor(SIM_RES, w, h);
      const d = gridFor(dyeRes, w, h);
      velocity = createDouble(gl, sim.w, sim.h);
      pressure = createDouble(gl, sim.w, sim.h);
      divergence = createFbo(gl, sim.w, sim.h);
      curl = createFbo(gl, sim.w, sim.h);
      dye = createDouble(gl, d.w, d.h);
      ready = true;
    };
    try {
      resize();
    } catch {
      return;
    }
    const splat = (x, y, dx, dy, color) => {
      const aspect = canvas.width / canvas.height;
      const radius = SPLAT_RADIUS * (aspect > 1 ? aspect : 1);
      run("splat", {
        uTarget: velocity.read,
        aspectRatio: aspect,
        point: [x, y],
        color: [dx, dy, 0],
        radius
      });
      blit(velocity.write);
      velocity.swap();
      run("splat", { uTarget: dye.read, aspectRatio: aspect, point: [x, y], color, radius });
      blit(dye.write);
      dye.swap();
    };
    let hue = 0;
    const nextColor = () => {
      hue = (hue + 1) % PALETTE.length;
      return PALETTE[hue].map((c) => c * DYE_INTENSITY);
    };
    const ambientSplat = () => {
      const x = 0.15 + Math.random() * 0.7;
      const y = 0.2 + Math.random() * 0.6;
      const angle = Math.random() * Math.PI * 2;
      const force = 600 + Math.random() * 900;
      splat(x, y, Math.cos(angle) * force, Math.sin(angle) * force, nextColor());
    };
    const step2 = (dt) => {
      const simTexel = [1 / velocity.w, 1 / velocity.h];
      gl.disable(gl.BLEND);
      run("curl", { texelSize: simTexel, uVelocity: velocity.read });
      blit(curl);
      run("vorticity", {
        texelSize: simTexel,
        uVelocity: velocity.read,
        uCurl: curl,
        curl: CURL,
        dt
      });
      blit(velocity.write);
      velocity.swap();
      run("divergence", { texelSize: simTexel, uVelocity: velocity.read });
      blit(divergence);
      run("clear", { texelSize: simTexel, uTexture: pressure.read, value: PRESSURE_DECAY });
      blit(pressure.write);
      pressure.swap();
      for (let i = 0; i < PRESSURE_ITERATIONS; i++) {
        run("pressure", {
          texelSize: simTexel,
          uPressure: pressure.read,
          uDivergence: divergence
        });
        blit(pressure.write);
        pressure.swap();
      }
      run("gradientSubtract", {
        texelSize: simTexel,
        uPressure: pressure.read,
        uVelocity: velocity.read
      });
      blit(velocity.write);
      velocity.swap();
      run("advection", {
        texelSize: simTexel,
        velTexel: simTexel,
        uVelocity: velocity.read,
        uSource: velocity.read,
        dt,
        dissipation: VELOCITY_DISSIPATION
      });
      blit(velocity.write);
      velocity.swap();
      run("advection", {
        texelSize: [1 / dye.w, 1 / dye.h],
        velTexel: simTexel,
        uVelocity: velocity.read,
        uSource: dye.read,
        dt,
        dissipation: DENSITY_DISSIPATION
      });
      blit(dye.write);
      dye.swap();
    };
    const render = () => {
      gl.enable(gl.BLEND);
      gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
      gl.clearColor(0, 0, 0, 0);
      gl.bindFramebuffer(gl.FRAMEBUFFER, null);
      gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
      gl.clear(gl.COLOR_BUFFER_BIT);
      run("display", { texelSize: [1 / canvas.width, 1 / canvas.height], uTexture: dye.read });
      blit(null);
    };
    let last = null;
    const stir = (clientX, clientY) => {
      const r = canvas.getBoundingClientRect();
      if (clientX < r.left || clientX > r.right || clientY < r.top || clientY > r.bottom) {
        last = null;
        return;
      }
      const x = (clientX - r.left) / r.width;
      const y = 1 - (clientY - r.top) / r.height;
      if (last) {
        const aspect = r.width / r.height;
        const dx = (x - last.x) * (aspect < 1 ? aspect : 1);
        const dy = (y - last.y) / (aspect > 1 ? aspect : 1);
        if (Math.abs(dx) + Math.abs(dy) > 5e-4)
          splat(x, y, dx * SPLAT_FORCE, dy * SPLAT_FORCE, nextColor());
      }
      last = { x, y };
    };
    const onPointerMove = (e) => {
      if (e.pointerType === "mouse" || e.pointerType === "pen") stir(e.clientX, e.clientY);
    };
    const onTouchMove = (e) => {
      const t = e.touches[0];
      if (t) stir(t.clientX, t.clientY);
    };
    const onTouchEnd = () => {
      last = null;
    };
    let visible = true;
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
    });
    io.observe(canvas);
    let lost = false;
    const onLost = (e) => {
      e.preventDefault();
      lost = true;
    };
    canvas.addEventListener("webglcontextlost", onLost);
    let raf = 0;
    let prev = performance.now();
    let nextAmbient = prev + 400;
    for (let i = 0; i < 4; i++) ambientSplat();
    const frame = (now2) => {
      raf = requestAnimationFrame(frame);
      const dt = Math.min(1 / 60, (now2 - prev) / 1e3);
      prev = now2;
      if (lost || !visible || document.hidden) return;
      try {
        resize();
      } catch {
        lost = true;
        return;
      }
      if (now2 > nextAmbient) {
        ambientSplat();
        nextAmbient = now2 + 1800 + Math.random() * 2200;
      }
      step2(dt);
      render();
    };
    raf = requestAnimationFrame(frame);
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("touchend", onTouchEnd, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      canvas.removeEventListener("webglcontextlost", onLost);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
      gl.getExtension("WEBGL_lose_context")?.loseContext();
    };
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("canvas", { ref: canvasRef, "aria-hidden": true, className });
}
const INTERVAL_MS = 4500;
const FADE_MS = 700;
const IMAGE_CLASS = "absolute inset-0 h-full w-full rounded-full object-cover";
function Slide({ slide, active }) {
  if (slide.art) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 overflow-hidden rounded-full", "aria-hidden": !active, children: slide.art });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "img",
    {
      src: slide.src,
      alt: active ? slide.alt : "",
      "aria-hidden": !active,
      width: 320,
      height: 320,
      className: IMAGE_CLASS
    }
  );
}
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
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Slide, { slide: photos2[0], active: true }) });
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
      children: photos2.map((slide, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "absolute inset-0",
          style: {
            opacity: i === index ? 1 : 0,
            transform: i === index ? "scale(1)" : "scale(1.06)",
            transition: `opacity ${FADE_MS}ms ease, transform ${FADE_MS}ms ease`,
            willChange: "opacity, transform"
          },
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(Slide, { slide, active: i === index })
        },
        slide.src ?? slide.alt
      ))
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
      el.style.filter = t ? `blur(${t * 4}px)` : "";
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
        /* @__PURE__ */ jsxRuntimeExports.jsx(FluidCanvas, { className: "pointer-events-none absolute inset-y-0 left-1/2 -z-10 h-full w-screen -translate-x-1/2" }),
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
const ORBIT_SECONDS = 54;
const SWEEP_DEG = 100;
const FADE = 0.06;
const DRAG_PX = 6;
function shuffled(count) {
  const a = Array.from({ length: count }, (_, i) => i);
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
const inOrder = projects.map((_, i) => i);
function loopPos(phase, slot) {
  const t = (phase + slot / projects.length) % 1;
  return t < 0 ? t + 1 : t;
}
function pose(t) {
  const fade = Math.min(1, t / FADE, (1 - t) / FADE);
  return {
    rotate: `${-SWEEP_DEG / 2 + SWEEP_DEG * t}deg`,
    opacity: String(fade),
    scale: String(0.88 + 0.12 * fade)
  };
}
function ProjectsFan({ onSelect }) {
  const [active, setActive] = reactExports.useState(null);
  const [reduceMotion, setReduceMotion] = reactExports.useState(false);
  const [slots, setSlots] = reactExports.useState(inOrder);
  const [layer, setLayer] = reactExports.useState(inOrder);
  const [dragging, setDragging] = reactExports.useState(false);
  const deckRef = reactExports.useRef(null);
  const cardRefs = reactExports.useRef([]);
  const phase = reactExports.useRef(0);
  const velocity = reactExports.useRef(0);
  const hovering = reactExports.useRef(false);
  const drag = reactExports.useRef(null);
  const swallowClick = reactExports.useRef(false);
  reactExports.useEffect(() => {
    setReduceMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    setSlots(shuffled(projects.length));
    setLayer(shuffled(projects.length));
  }, []);
  reactExports.useEffect(() => {
    let raf = 0;
    let last = performance.now();
    const frame = (now2) => {
      const dt = Math.min(0.05, (now2 - last) / 1e3);
      last = now2;
      if (!drag.current?.active) {
        if (Math.abs(velocity.current) > 2e-3) {
          phase.current += velocity.current * dt;
          velocity.current *= Math.exp(-3.2 * dt);
        } else {
          velocity.current = 0;
          if (!hovering.current && !reduceMotion) phase.current += dt / ORBIT_SECONDS;
        }
      }
      cardRefs.current.forEach((el, i) => {
        if (el) Object.assign(el.style, pose(loopPos(phase.current, slots[i])));
      });
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(raf);
  }, [slots, reduceMotion]);
  const loopsPerPx = () => {
    const radius = Math.min(440, Math.max(230, window.innerWidth * 0.4));
    const cardH = cardRefs.current[0]?.offsetHeight ?? 200;
    const pxPerDeg = (radius + cardH / 2) * Math.PI / 180;
    return 1 / (pxPerDeg * SWEEP_DEG);
  };
  const onPointerDown = (e) => {
    if (e.button !== 0) return;
    drag.current = {
      id: e.pointerId,
      startX: e.clientX,
      lastX: e.clientX,
      lastT: performance.now(),
      active: false
    };
  };
  const onPointerMove = (e) => {
    const d = drag.current;
    if (!d || d.id !== e.pointerId) return;
    if (!d.active) {
      if (Math.abs(e.clientX - d.startX) < DRAG_PX) return;
      d.active = true;
      velocity.current = 0;
      deckRef.current?.setPointerCapture(e.pointerId);
      setDragging(true);
    }
    const now2 = performance.now();
    const dPhase = (e.clientX - d.lastX) * loopsPerPx();
    phase.current += dPhase;
    const dt = Math.max(1, now2 - d.lastT) / 1e3;
    velocity.current = velocity.current * 0.6 + dPhase / dt * 0.4;
    d.lastX = e.clientX;
    d.lastT = now2;
  };
  const endDrag = (e) => {
    const d = drag.current;
    if (!d || d.id !== e.pointerId) return;
    if (d.active) {
      swallowClick.current = true;
      if (performance.now() - d.lastT > 90) velocity.current = 0;
      velocity.current = Math.max(-1.5, Math.min(1.5, velocity.current));
      setDragging(false);
    }
    drag.current = null;
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      ref: deckRef,
      "data-cursor": "Drag",
      onPointerDown,
      onPointerMove,
      onPointerUp: endDrag,
      onPointerCancel: endDrag,
      onPointerEnter: (e) => {
        if (e.pointerType === "mouse") hovering.current = true;
      },
      onPointerLeave: (e) => {
        if (e.pointerType === "mouse") hovering.current = false;
      },
      onClickCapture: (e) => {
        if (!swallowClick.current) return;
        swallowClick.current = false;
        e.stopPropagation();
        e.preventDefault();
      },
      onKeyDown: (e) => {
        if (e.key === "ArrowLeft") velocity.current = -0.25;
        if (e.key === "ArrowRight") velocity.current = 0.25;
      },
      onDragStart: (e) => e.preventDefault(),
      className: `group/deck relative left-1/2 flex w-screen max-w-none -translate-x-1/2 touch-pan-y select-none justify-center overflow-hidden ${dragging ? "cursor-grabbing" : "cursor-grab"}`,
      style: {
        "--fan-w": "clamp(118px, 14.5vw, 176px)",
        "--fan-r": "clamp(230px, 40vw, 440px)",
        height: "clamp(300px, 33vw, 400px)"
      },
      children: projects.map((p, i) => {
        const lifted = active === p.title;
        const slot = slots[i];
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            ref: (el) => {
              cardRefs.current[i] = el;
            },
            type: "button",
            "data-cursor": dragging ? "Drag" : "Open",
            onMouseEnter: () => setActive(p.title),
            onMouseLeave: () => setActive(null),
            onFocus: () => setActive(p.title),
            onBlur: () => setActive(null),
            onClick: () => onSelect(p),
            "aria-label": `Open ${p.title}`,
            className: "group absolute left-1/2 overflow-hidden rounded-xl border bg-card text-left transition-[transform,box-shadow,border-color] duration-300 ease-out focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary group-hover/deck:[animation-play-state:paused] motion-reduce:transition-none",
            style: {
              width: "var(--fan-w)",
              aspectRatio: "4 / 6",
              bottom: "calc(var(--fan-r) * 0.17)",
              marginLeft: "calc(var(--fan-w) / -2)",
              transformOrigin: "50% calc(100% + var(--fan-r))",
              zIndex: lifted ? 30 : layer[i] + 1,
              transform: lifted ? "scale(1.06)" : void 0,
              // Where it sits on the loop before the frame loop takes over.
              ...pose(loopPos(0, slot)),
              // A gentle bob on top of the orbit. Longhands, not the
              // `animation` shorthand, which would set animation-play-state
              // inline and outrank the class that pauses on hover.
              ...reduceMotion ? {} : {
                animationName: "deck-float",
                animationDuration: `${6 + slot % 3 * 0.9}s`,
                animationDelay: `${slot * 0.45}s`,
                animationTimingFunction: "ease-in-out",
                animationIterationCount: "infinite"
              },
              ...cardEdge(p, lifted ? "lifted" : "rest")
            },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  "aria-hidden": true,
                  className: `absolute inset-0 rounded-xl bg-gradient-to-br opacity-70 transition-opacity duration-500 group-hover:opacity-100 ${p.accent ? "from-amber-400/30 via-transparent to-amber-200/10" : "from-primary/25 via-transparent to-accent/20"}`
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "relative flex h-full flex-col justify-between p-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-start justify-between gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      className: `max-w-[70%] font-mono text-[8px] uppercase tracking-widest ${p.accent ? "text-amber-300" : "text-muted-foreground"}`,
                      children: p.accent ? "Live" : p.tag.split("—")[0].split("·")[0].trim()
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-[9px] text-muted-foreground/60", children: String(i + 1).padStart(2, "0") })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-[86%] text-[11px] font-semibold leading-tight break-words", children: p.shortName }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-[86%]", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-block rounded border border-border/70 px-1 py-0.5 font-mono text-[8px] text-muted-foreground", children: p.stack[0] }) })
              ] })
            ]
          },
          p.title
        );
      })
    }
  );
}
function Projects() {
  const [selected, setSelected] = reactExports.useState(null);
  const close = reactExports.useCallback(() => setSelected(null), []);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { id: "projects", className: "py-24 border-t border-border", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4 flex items-center gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CodeXml, { className: "w-5 h-5 text-muted-foreground" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-3xl font-bold tracking-tight", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Scramble, { text: "Selected projects" }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mb-10 text-sm text-muted-foreground", children: "Pick a card for the full story. Drag or swipe to spin the deck — give it a flick." }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(ProjectsFan, { onSelect: setSelected }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(ProjectDialog, { project: selected, onClose: close })
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
const GRAVITY = 2e3;
const SUBSTEPS = 4;
const ITERATIONS = 6;
const FRICTION = 0.45;
const BETA = 0.25;
const SLOP = 0.4;
const MAX_BIAS = 700;
const MAX_SPEED = 3200;
const DENSITY = 1e-3;
const GRAB_STIFFNESS = 700;
const GRAB_DAMPING = 45;
const GROUP_TONES = [
  "border-cyan-400/50 text-cyan-700 dark:text-cyan-200",
  "border-violet-400/50 text-violet-700 dark:text-violet-200",
  "border-emerald-400/50 text-emerald-700 dark:text-emerald-200",
  "border-amber-400/50 text-amber-700 dark:text-amber-200",
  "border-sky-400/50 text-sky-700 dark:text-sky-200",
  "border-pink-400/50 text-pink-700 dark:text-pink-200"
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
  const contacts = [];
  for (let i = 0; i < bodies.length; i++) {
    collideWalls(bodies, i, W, H, contacts);
    for (let j = i + 1; j < bodies.length; j++) collidePair(bodies, i, j, contacts);
  }
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
    b.vx *= 0.9995;
    b.vy *= 0.9995;
    b.w *= 0.998;
    b.x += b.vx * dt;
    b.y += b.vy * dt;
    b.a += b.w * dt;
  }
}
function SkillsPlayground({ groups }) {
  const chips = Object.entries(groups).flatMap(
    ([group, items], g) => items.map((label) => ({ label, group, tone: GROUP_TONES[g % GROUP_TONES.length] }))
  );
  const pitRef = reactExports.useRef(null);
  const chipRefs = reactExports.useRef([]);
  const bodies = reactExports.useRef([]);
  const grab = reactExports.useRef(null);
  const [dragging, setDragging] = reactExports.useState(null);
  reactExports.useEffect(() => {
    const pit = pitRef.current;
    if (!pit) return;
    let raf = 0;
    let started = false;
    let visible = false;
    let last = performance.now();
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
      if (!visible || document.hidden) return;
      if (!started) start();
      const W = pit.clientWidth;
      const H = pit.clientHeight;
      const dt = elapsed / SUBSTEPS;
      for (let s = 0; s < SUBSTEPS; s++) step(bodies.current, W, H, dt, grab.current);
      paint();
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
    setDragging(i);
  };
  const onMove = (e) => {
    if (!grab.current) return;
    const [px, py] = pitPoint(e);
    grab.current.tx = px;
    grab.current.ty = py;
  };
  const onUp = () => {
    grab.current = null;
    setDragging(null);
  };
  const shake = () => {
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
              className: `absolute left-0 top-0 origin-center touch-none whitespace-nowrap rounded-full border bg-background/85 px-3 py-1 text-xs font-medium shadow-[0_4px_14px_-6px_rgba(0,0,0,0.6)] backdrop-blur-sm sm:px-3.5 sm:py-1.5 sm:text-sm ${c.tone} ${dragging === i ? "cursor-grabbing ring-1 ring-primary" : "cursor-grab"}`,
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
    view === "play" ? /* @__PURE__ */ jsxRuntimeExports.jsx(SkillsPlayground, { groups: skills }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid sm:grid-cols-2 gap-4", children: Object.entries(skills).map(([group, items]) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "spotlight rounded-xl border border-border bg-card/40 p-5", children: [
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
        links.map((link2) => ({ label: link2.label, value: link2.url }))
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
    writeString(STORAGE_KEYS.termMode, mode);
    setTermMode(mode);
  };
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
    /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { id: "top", className: "relative z-10 max-w-5xl mx-auto px-6 pb-24", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Hero, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Stats, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Experience, {}),
      gamingMode && /* @__PURE__ */ jsxRuntimeExports.jsx(CupGame, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Projects, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ScrollMarquee, {}),
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
