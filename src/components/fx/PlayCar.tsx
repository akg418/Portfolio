import { useEffect, useRef, useState } from "react";
import { RotateCcw, Square } from "lucide-react";
import { VehicleSprite } from "@/components/fx/VehicleSprites";
import {
  VEHICLE_DRIVE_EVENT,
  VEHICLE_KINDS,
  VEHICLE_LABELS,
  VEHICLE_REFUSE_EVENT,
  canDriveHere,
  setVehicle,
  setVehicleDriving,
  useVehicle,
  type VehicleKind,
} from "@/hooks/useVehicle";

/**
 * A little vehicle that lives on the page.
 *
 * At rest it drives up and down a short stretch at the bottom-left of the
 * window, just above the terminal bar, small and faded. Every so often it stops and asks, in a
 * speech bubble, "want play!" and then "click on me" (once per session; the
 * terminal greeting and `car` explain the rest). On a desktop, clicking
 * it hands over the wheel: arrow keys or WASD drive it anywhere on the page,
 * Shift is turbo, space brakes, and the window scrolls to follow. There are
 * four to choose from (hatchback, racer, monster truck, motorcycle), each
 * with its own handling and weight, switchable from the driving panel or the
 * terminal (`car`).
 *
 * Whatever it hits is shoved along the contact normal, harder for a faster,
 * heavier vehicle and a lighter element, and spins. Knocked elements carry
 * their momentum into whatever they slide into, so a hard hit sets off a
 * chain. Big impacts throw a shockwave ring and shake the page. "Reset
 * website" puts everything back.
 *
 * Moved elements use the individual `translate` and `rotate` properties,
 * which compose with existing transforms, so resetting is just clearing them.
 * Keys typed into the terminal or forms are ignored, and nothing renders for
 * anyone who asked for reduced motion.
 */

type Spec = {
  accel: number;
  max: number;
  steer: number;
  radius: number;
  /** How hard it hits things. */
  power: number;
  /** How much it bounces back off what it hits (0 ploughs through). */
  rebound: number;
};

const SPECS: Record<VehicleKind, Spec> = {
  car: { accel: 950, max: 580, steer: 3.4, radius: 17, power: 1, rebound: 0.35 },
  racer: { accel: 1450, max: 860, steer: 3.0, radius: 17, power: 1.35, rebound: 0.3 },
  truck: { accel: 650, max: 420, steer: 2.3, radius: 25, power: 3.2, rebound: 0.05 },
  moto: { accel: 1300, max: 760, steer: 4.8, radius: 12, power: 0.85, rebound: 0.45 },
};

const BRAKE = 1600;
const MAX_REV = 240;
const DRAG = 1.6;
const TURBO = 1.55;
const IDLE_SPEED = 38;
const IDLE_SCALE = 0.62;
/** The idle stretch sits bottom-left, above the terminal bar and the robots' heads. */
const IDLE_LIFT = 118;
const IDLE_LEFT = 28;
const IDLE_SPAN = 200;
const PUSH = 0.14;
const SPIN = 0.09;
const SLIDE_FRICTION = 0.93;
/** The "want play!" bubble shows once per browser session. */
const ASKED_KEY = "car-asked";

function alreadyAsked() {
  try {
    return sessionStorage.getItem(ASKED_KEY) === "1";
  } catch {
    return false;
  }
}
const CANDIDATES =
  "main h1, main h2, main h3, main h4, main p, main a, main button, main img, main li, main [class*='rounded-md'], main [class*='rounded-full']";

type Pushed = {
  el: HTMLElement;
  /** Page-space box with no push applied. */
  x: number;
  y: number;
  w: number;
  h: number;
  m: number;
  dx: number;
  dy: number;
  vx: number;
  vy: number;
  rot: number;
  vr: number;
};

type Puff = { x: number; y: number; t: number; s: number; c?: string };
type Ring = { x: number; y: number; t: number; r: number };

export function PlayCar() {
  const vehicle = useVehicle();
  const carRef = useRef<HTMLDivElement>(null);
  const bubbleRef = useRef<HTMLDivElement>(null);
  const fxRef = useRef<HTMLDivElement>(null);
  const [driving, setDriving] = useState(false);
  const [canDrive, setCanDrive] = useState(false);
  const [allowed, setAllowed] = useState(false);
  const [moved, setMoved] = useState(0);
  const drivingRef = useRef(false);
  const specRef = useRef<Spec>(SPECS.car);
  const resetRef = useRef<() => void>(() => {});
  /** Switch the vehicle between screen space (idle) and page space (driving). */
  const toPageRef = useRef<() => void>(() => {});
  const toViewportRef = useRef<() => void>(() => {});
  /** A message the bubble shows over the vehicle while driving, until a time. */
  const nudgeRef = useRef({ text: "", until: 0 });
  const [nudge, setNudge] = useState(false);

  specRef.current = SPECS[vehicle.kind];
  const enabled = allowed && vehicle.on;

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setAllowed(true);
    setCanDrive(canDriveHere());
  }, []);

  // Turned off from the terminal mid-drive: hand the page back.
  useEffect(() => {
    if (!vehicle.on && drivingRef.current) {
      drivingRef.current = false;
      setDriving(false);
      setVehicleDriving(false);
    }
  }, [vehicle.on]);

  useEffect(() => {
    if (!enabled) return;
    const car = carRef.current!;
    const bubble = bubbleRef.current!;
    const fxLayer = fxRef.current!;
    const main = document.querySelector("main");

    const zone = () => {
      const x0 = IDLE_LEFT;
      return {
        x0,
        x1: Math.min(window.innerWidth - 40, x0 + IDLE_SPAN),
        y: window.innerHeight - IDLE_LIFT,
      };
    };

    // Idle: viewport coordinates. Driving: page coordinates.
    const z0 = zone();
    const s = {
      x: z0.x0 + 20,
      y: z0.y,
      a: 0,
      v: 0,
      steer: 0,
      bounce: 0,
      scale: IDLE_SCALE,
      dir: 1 as 1 | -1,
    };
    let phase: "drive" | "ask1" | "ask2" = "drive";
    let phaseUntil = 0;
    let nextAsk = performance.now() + 4000;
    const keys = new Set<string>();
    let pushed: Pushed[] = [];
    let lastScan = 0;
    let puffs: Puff[] = [];
    let rings: Ring[] = [];
    let shake = 0;
    let raf = 0;
    let last = performance.now();
    let movedCount = 0;

    const say = (text: string | null) => {
      bubble.textContent = text ?? "";
      bubble.style.opacity = text ? "1" : "0";
    };

    /** Collects the elements a vehicle could plausibly hit, outermost first, skipping fixed chrome. */
    const scan = () => {
      const keep = new Map(pushed.map((p) => [p.el, p]));
      const out: Pushed[] = [];
      const chosen = new Set<Element>();
      for (const el of document.querySelectorAll<HTMLElement>(CANDIDATES)) {
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
          prev
            ? { ...prev, x: r.left + window.scrollX - dx, y: r.top + window.scrollY - dy, w, h }
            : {
                el,
                x: r.left + window.scrollX,
                y: r.top + window.scrollY,
                w,
                h,
                m: Math.min(5, Math.max(0.5, (w * h) / 6000)),
                dx: 0,
                dy: 0,
                vx: 0,
                vy: 0,
                rot: 0,
                vr: 0,
              },
        );
      }
      pushed = out;
    };

    const puff = (x: number, y: number, c?: string) => {
      puffs.push({ x, y, t: 0, s: 4 + Math.random() * 5, c });
      if (puffs.length > 90) puffs.shift();
    };

    const markMoved = (p: Pushed) => {
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
        // Normal from the element to the vehicle; inside the box, along the heading.
        const nx = d2 > 0.01 ? ddx / d : -Math.cos(s.a);
        const ny = d2 > 0.01 ? ddy / d : -Math.sin(s.a);
        const speed = Math.abs(s.v);
        if (speed < 15) continue;
        // Away from the vehicle: harder for faster, heavier vehicles and lighter elements.
        const k = (speed * PUSH * spec.power) / p.m;
        p.vx -= nx * k;
        p.vy -= ny * k;
        p.vr += ((Math.random() - 0.5) * speed * SPIN * spec.power) / p.m;
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

    /** Knocked elements carry their momentum into whatever they slide into. */
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
          // Hand over part of the momentum, by mass.
          const share = (a.m / (a.m + b.m)) * 0.8;
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
      for (const el of document.querySelectorAll<HTMLElement>("[data-car-moved]")) {
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
      // Whatever the bubble was saying mid-drive ends with the drive.
      nudgeRef.current = { text: "", until: 0 };
      say(null);
      const z = zone();
      s.x = Math.max(z.x0, Math.min(z.x1, s.x - window.scrollX));
      s.y = z.y;
      s.v = 0;
      s.dir = 1;
      nextAsk = performance.now() + 5000;
    };

    const onKey = (e: KeyboardEvent) => {
      if (!drivingRef.current) return;
      // Typing somewhere (the terminal, a form) is not driving.
      const t = e.target as HTMLElement | null;
      if (t?.closest("input, textarea, [contenteditable=true]")) return;
      const map: Record<string, string> = {
        arrowup: "up",
        w: "up",
        arrowdown: "down",
        s: "down",
        arrowleft: "left",
        a: "left",
        arrowright: "right",
        d: "right",
        " ": "brake",
        shift: "turbo",
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

    const frame = (now: number) => {
      raf = requestAnimationFrame(frame);
      const dt = Math.min(0.033, (now - last) / 1000);
      last = now;
      const isDriving = drivingRef.current;
      const spec = specRef.current;

      if (isDriving) {
        if (now - lastScan > 1500) {
          lastScan = now;
          scan();
        }
        const turbo = keys.has("turbo");
        const max = spec.max * (turbo ? TURBO : 1);
        const throttle = (keys.has("up") ? 1 : 0) - (keys.has("down") ? 1 : 0);
        if (throttle > 0) s.v += (s.v < 0 ? BRAKE : spec.accel * (turbo ? 1.5 : 1)) * dt;
        else if (throttle < 0) s.v -= (s.v > 0 ? BRAKE : spec.accel * 0.6) * dt;
        s.v -= s.v * DRAG * dt;
        if (keys.has("brake")) s.v -= s.v * 6 * dt;
        s.v = Math.max(-MAX_REV, Math.min(max, s.v));
        const turn = (keys.has("right") ? 1 : 0) - (keys.has("left") ? 1 : 0);
        s.steer += (turn - s.steer) * Math.min(1, dt * 10);
        const grip = Math.min(1, Math.abs(s.v) / 140);
        s.a += s.steer * spec.steer * grip * Math.sign(s.v || 1) * dt;
        s.x += Math.cos(s.a) * s.v * dt;
        s.y += Math.sin(s.a) * s.v * dt;

        // The page is the arena.
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

        // Keep the vehicle in the middle band of the window.
        const sy = s.y - window.scrollY;
        const vh = window.innerHeight;
        const lo = vh * 0.3;
        const hi = vh * 0.65;
        if (sy < lo || sy > hi) {
          window.scrollTo({
            top: window.scrollY + (sy < lo ? sy - lo : sy - hi) * 0.18,
            behavior: "instant",
          });
        }

        const back = { x: s.x - Math.cos(s.a) * R * 1.1, y: s.y - Math.sin(s.a) * R * 1.1 };
        if (turbo && throttle > 0) {
          for (let i = 0; i < 2; i++) puff(back.x, back.y, i ? "#f59e0b" : "#22d3ee");
        } else if (
          (throttle !== 0 && Math.abs(s.v) < 260) ||
          (Math.abs(s.steer) > 0.6 && Math.abs(s.v) > 220)
        ) {
          if (Math.random() < 0.5) puff(back.x, back.y);
        }
        s.scale += (1 - s.scale) * Math.min(1, dt * 8);
      } else {
        // Idle: back and forth along a short stretch at the bottom-left.
        const z = zone();
        s.y = z.y;
        s.scale += (IDLE_SCALE - s.scale) * Math.min(1, dt * 8);
        if (canDrive && phase === "drive" && now > nextAsk && !alreadyAsked()) {
          try {
            sessionStorage.setItem(ASKED_KEY, "1");
          } catch {
            /* private mode: it may ask again next load */
          }
          phase = "ask1";
          phaseUntil = now + 1700;
          say("want play!");
        } else if (phase === "ask1" && now > phaseUntil) {
          phase = "ask2";
          phaseUntil = now + 2400;
          say("click on me");
        } else if (phase === "ask2" && now > phaseUntil) {
          phase = "drive";
          say(null);
        }

        const want = phase === "drive" ? IDLE_SPEED : 0;
        s.v += (want - s.v) * Math.min(1, dt * 3);
        // Turn round at the ends of the stretch.
        if (s.x > z.x1) s.dir = -1;
        if (s.x < z.x0) s.dir = 1;
        const heading = s.dir === 1 ? 0 : Math.PI;
        let diff = heading - s.a;
        diff = Math.atan2(Math.sin(diff), Math.cos(diff));
        s.a += diff * Math.min(1, dt * 5);
        s.x += Math.cos(s.a) * s.v * dt;
        if (phase === "drive" && Math.random() < 0.02) puff(s.x - Math.cos(s.a) * 12, s.y + 2);
        // A little hop while it asks.
        if (phase !== "drive") s.bounce = Math.max(s.bounce, Math.abs(Math.sin(now / 160)) * 0.4);
      }

      // Draw. Driving positions are page-space; idle ones are already on screen.
      s.bounce *= Math.exp(-dt * 6);
      const ox = isDriving ? window.scrollX : 0;
      const oy = isDriving ? window.scrollY : 0;
      const wobble =
        Math.sin(now / 90) * (0.6 + Math.min(1, Math.abs(s.v) / 300)) +
        s.bounce * Math.sin(now / 30) * 4;
      car.style.transform = `translate(${s.x - ox}px, ${s.y - oy}px) rotate(${s.a}rad)`;
      const body = car.firstElementChild as HTMLElement | null;
      if (body)
        body.style.transform = `translate(-50%, -50%) scale(${s.scale * (1 + s.bounce * 0.12)}, ${s.scale * (1 - s.bounce * 0.08)}) rotate(${wobble * 0.6}deg)`;
      // Kept on screen, however close to the edge the vehicle is.
      const half = bubble.offsetWidth / 2 + 8;
      const bx = Math.max(half, Math.min(window.innerWidth - half, s.x - ox));
      bubble.style.transform = `translate(${bx}px, ${s.y - oy - 18}px) translate(-50%, -100%)`;
      if (isDriving) say(now < nudgeRef.current.until ? nudgeRef.current.text : null);

      // The page shakes after a big hit.
      shake *= Math.exp(-dt * 7);
      if (main) {
        main.style.translate =
          shake > 0.02
            ? `${((Math.random() - 0.5) * shake * 14).toFixed(1)}px ${((Math.random() - 0.5) * shake * 10).toFixed(1)}px`
            : "";
      }

      puffs = puffs.filter((p) => (p.t += dt) < 0.7);
      rings = rings.filter((r) => (r.t += dt) < 0.5);
      fxLayer.innerHTML =
        puffs
          .map((p) => {
            const k = p.t / 0.7;
            return `<span style="position:absolute;left:0;top:0;width:${p.s}px;height:${p.s}px;border-radius:999px;background:${p.c ?? "currentColor"};opacity:${(1 - k) * (p.c ? 0.7 : 0.35)};transform:translate(${p.x - ox - p.s / 2}px,${p.y - oy - p.s / 2 - k * 10}px) scale(${1 + k * 1.5})"></span>`;
          })
          .join("") +
        rings
          .map((r) => {
            const k = r.t / 0.5;
            const size = r.r * 2 * (0.2 + k);
            return `<span style="position:absolute;left:0;top:0;width:${size}px;height:${size}px;border-radius:999px;border:2px solid #22d3ee;opacity:${1 - k};transform:translate(${r.x - ox - size / 2}px,${r.y - oy - size / 2}px)"></span>`;
          })
          .join("");
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
    // Stopping puts the website back the way it was.
    resetRef.current();
    toViewportRef.current();
    setDriving(false);
    setVehicleDriving(false);
  };
  const startRef = useRef(start);
  startRef.current = start;

  // `car drive` from the terminal, and a refused attempt to open the terminal.
  useEffect(() => {
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

  return (
    <>
      <div
        ref={fxRef}
        aria-hidden
        className="pointer-events-none fixed inset-0 z-40 text-muted-foreground"
      />
      <div
        ref={bubbleRef}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-50 whitespace-nowrap rounded-full border border-primary/50 bg-background/90 px-2.5 py-1 font-mono text-[11px] font-semibold text-primary shadow-lg transition-opacity duration-300"
        style={{ opacity: 0, transform: "translate(-200px, -200px)" }}
      />
      <div
        ref={carRef}
        className="fixed left-0 top-0 z-40"
        style={{ transform: "translate(-200px, -200px)" }}
      >
        <button
          type="button"
          onClick={start}
          data-cursor={driving ? undefined : canDrive ? "Drive" : undefined}
          aria-label={
            canDrive ? `Drive the ${VEHICLE_LABELS[vehicle.kind].toLowerCase()}` : "A little car"
          }
          className={`block transition-opacity duration-300 ${
            driving
              ? "cursor-default opacity-100"
              : canDrive
                ? "cursor-pointer opacity-50 hover:opacity-100"
                : "pointer-events-none opacity-40"
          }`}
          style={{ transform: "translate(-50%, -50%)" }}
        >
          <VehicleSprite kind={vehicle.kind} lights={driving} />
        </button>
      </div>

      {driving && (
        <div className="fixed left-1/2 top-20 z-50 flex max-w-[calc(100vw-2rem)] -translate-x-1/2 flex-wrap items-center justify-center gap-2 rounded-2xl border border-border bg-background/85 px-3 py-2 font-mono text-[11px] shadow-lg backdrop-blur-md">
          <div className="flex overflow-hidden rounded-full border border-border">
            {VEHICLE_KINDS.map((k) => (
              <button
                key={k}
                type="button"
                onClick={() => setVehicle({ kind: k })}
                className={`px-2.5 py-1 ${vehicle.kind === k ? "bg-primary text-primary-foreground" : "hover:text-primary"}`}
              >
                {VEHICLE_LABELS[k]}
              </button>
            ))}
          </div>
          <span className="text-muted-foreground">
            ↑↓←→ / WASD · shift turbo · space brake
            {moved > 0 ? ` · ${moved} knocked over` : ""}
          </span>
          <button
            type="button"
            onClick={stop}
            className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 hover:border-primary/60 hover:text-primary ${
              nudge ? "animate-pulse border-amber-400 text-amber-300" : "border-border"
            }`}
          >
            <Square className="h-3 w-3" /> Stop driving
          </button>
          <button
            type="button"
            onClick={() => resetRef.current()}
            className="inline-flex items-center gap-1.5 rounded-full bg-primary px-2.5 py-1 font-semibold text-primary-foreground hover:opacity-90"
          >
            <RotateCcw className="h-3 w-3" /> Reset website
          </button>
        </div>
      )}
    </>
  );
}
