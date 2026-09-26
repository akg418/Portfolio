import { useEffect, useRef, useState } from "react";
import { cardEdge } from "@/components/sections/projects/cardEdge";
import { projects, type Project } from "@/data/profile";

/**
 * The projects as a slow carousel of cards on an arc.
 *
 * Every card is rotated about a pivot far below the deck, so it rides the arc
 * and tilts with it. They all drift left to right on the same loop, fade out at
 * the right end and come back in on the left; each card's slot is an even
 * offset along that loop.
 *
 * The loop position is one number driven from a frame loop rather than a CSS
 * animation, so it can be grabbed: drag the deck (mouse or finger) and it
 * follows, let go and it coasts on the flick before settling back into its
 * drift. A drag never counts as a click on the card it started on.
 *
 * Both the slot a card takes on the loop and which card overlaps which are
 * shuffled per visit, so the deck is never laid out the same way twice. The
 * shuffle happens after hydration rather than during render: the server has no
 * way to agree with the client on a random order.
 *
 * Pointing at the deck pauses the drift, so the card under the cursor holds
 * still to be read or clicked.
 */

/** One full trip around the loop. Long enough that the deck reads as drifting. */
const ORBIT_SECONDS = 54;
/** Degrees of arc from one end of the loop to the other. */
const SWEEP_DEG = 100;
/** Share of the loop spent fading in at the left and out at the right. */
const FADE = 0.06;
/** Pointer travel before a press becomes a drag instead of a click. */
const DRAG_PX = 6;
/** How fast a flick dies away, per second. */
const FRICTION = 3.2;

/** Fisher-Yates, for the slot order and the stacking order. */
function shuffled(count: number) {
  const a = Array.from({ length: count }, (_, i) => i);
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/** Server order until the client has shuffled, so hydration matches. */
const inOrder = projects.map((_, i) => i);

/** Where on the loop (0–1) a card sits, given the deck's phase and its slot. */
function loopPos(phase: number, slot: number) {
  const t = (phase + slot / projects.length) % 1;
  return t < 0 ? t + 1 : t;
}

/** Rotation, opacity and scale for a card at loop position t. */
function pose(t: number) {
  const fade = Math.min(1, t / FADE, (1 - t) / FADE);
  return {
    rotate: `${-SWEEP_DEG / 2 + SWEEP_DEG * t}deg`,
    opacity: String(fade),
    scale: String(0.88 + 0.12 * fade),
  };
}

export function ProjectsFan({ onSelect }: { onSelect: (project: Project) => void }) {
  const [active, setActive] = useState<string | null>(null);
  const [reduceMotion, setReduceMotion] = useState(false);
  /** slots[i] is the position card i takes on the loop; layer[i] is what it overlaps. */
  const [slots, setSlots] = useState(inOrder);
  const [layer, setLayer] = useState(inOrder);

  const [dragging, setDragging] = useState(false);
  const deckRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLButtonElement | null)[]>([]);
  /** Loop position of the deck, and its coasting speed in loops per second. */
  const phase = useRef(0);
  const velocity = useRef(0);
  const hovering = useRef(false);
  const drag = useRef<{
    id: number;
    startX: number;
    lastX: number;
    lastT: number;
    active: boolean;
  } | null>(null);
  const swallowClick = useRef(false);

  useEffect(() => {
    setReduceMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    setSlots(shuffled(projects.length));
    setLayer(shuffled(projects.length));
  }, []);

  // The frame loop: drift, coast after a flick, and paint every card.
  useEffect(() => {
    let raf = 0;
    let last = performance.now();
    const frame = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      if (!drag.current?.active) {
        if (Math.abs(velocity.current) > 0.002) {
          phase.current += velocity.current * dt;
          velocity.current *= Math.exp(-FRICTION * dt);
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

  /** Loops per pixel of pointer travel: a card's centre tracks the pointer. */
  const loopsPerPx = () => {
    const radius = Math.min(440, Math.max(230, window.innerWidth * 0.4));
    const cardH = cardRefs.current[0]?.offsetHeight ?? 200;
    const pxPerDeg = ((radius + cardH / 2) * Math.PI) / 180;
    return 1 / (pxPerDeg * SWEEP_DEG);
  };

  const onPointerDown = (e: React.PointerEvent) => {
    if (e.button !== 0) return;
    drag.current = {
      id: e.pointerId,
      startX: e.clientX,
      lastX: e.clientX,
      lastT: performance.now(),
      active: false,
    };
  };

  const onPointerMove = (e: React.PointerEvent) => {
    const d = drag.current;
    if (!d || d.id !== e.pointerId) return;
    if (!d.active) {
      if (Math.abs(e.clientX - d.startX) < DRAG_PX) return;
      d.active = true;
      velocity.current = 0;
      deckRef.current?.setPointerCapture(e.pointerId);
      setDragging(true);
    }
    const now = performance.now();
    const dPhase = (e.clientX - d.lastX) * loopsPerPx();
    phase.current += dPhase;
    const dt = Math.max(1, now - d.lastT) / 1000;
    // Smoothed, so the release speed is the flick and not the last jittery frame.
    velocity.current = velocity.current * 0.6 + (dPhase / dt) * 0.4;
    d.lastX = e.clientX;
    d.lastT = now;
  };

  const endDrag = (e: React.PointerEvent) => {
    const d = drag.current;
    if (!d || d.id !== e.pointerId) return;
    if (d.active) {
      swallowClick.current = true;
      // A pointer that stopped before letting go should not fling the deck.
      if (performance.now() - d.lastT > 90) velocity.current = 0;
      velocity.current = Math.max(-1.5, Math.min(1.5, velocity.current));
      setDragging(false);
    }
    drag.current = null;
  };

  return (
    <div
      ref={deckRef}
      data-cursor="Drag"
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
      onPointerEnter={(e) => {
        if (e.pointerType === "mouse") hovering.current = true;
      }}
      onPointerLeave={(e) => {
        if (e.pointerType === "mouse") hovering.current = false;
      }}
      onClickCapture={(e) => {
        if (!swallowClick.current) return;
        swallowClick.current = false;
        e.stopPropagation();
        e.preventDefault();
      }}
      onKeyDown={(e) => {
        if (e.key === "ArrowLeft") velocity.current = -0.25;
        if (e.key === "ArrowRight") velocity.current = 0.25;
      }}
      onDragStart={(e) => e.preventDefault()}
      className={`group/deck relative left-1/2 flex w-screen max-w-none -translate-x-1/2 touch-pan-y select-none justify-center overflow-hidden ${
        dragging ? "cursor-grabbing" : "cursor-grab"
      }`}
      style={
        {
          "--fan-w": "clamp(118px, 14.5vw, 176px)",
          "--fan-r": "clamp(230px, 40vw, 440px)",
          height: "clamp(300px, 33vw, 400px)",
        } as React.CSSProperties
      }
    >
      {projects.map((p, i) => {
        const lifted = active === p.title;
        const slot = slots[i];
        return (
          <button
            key={p.title}
            ref={(el) => {
              cardRefs.current[i] = el;
            }}
            type="button"
            data-cursor={dragging ? "Drag" : "Open"}
            onMouseEnter={() => setActive(p.title)}
            onMouseLeave={() => setActive(null)}
            onFocus={() => setActive(p.title)}
            onBlur={() => setActive(null)}
            onClick={() => onSelect(p)}
            aria-label={`Open ${p.title}`}
            className="group absolute left-1/2 overflow-hidden rounded-xl border bg-card text-left transition-[transform,box-shadow,border-color] duration-300 ease-out focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary group-hover/deck:[animation-play-state:paused] motion-reduce:transition-none"
            style={{
              width: "var(--fan-w)",
              aspectRatio: "4 / 6",
              bottom: "calc(var(--fan-r) * 0.17)",
              marginLeft: "calc(var(--fan-w) / -2)",
              transformOrigin: "50% calc(100% + var(--fan-r))",
              zIndex: lifted ? 30 : layer[i] + 1,
              transform: lifted ? "scale(1.06)" : undefined,
              // Where it sits on the loop before the frame loop takes over.
              ...pose(loopPos(0, slot)),
              // A gentle bob on top of the orbit. Longhands, not the
              // `animation` shorthand, which would set animation-play-state
              // inline and outrank the class that pauses on hover.
              ...(reduceMotion
                ? {}
                : {
                    animationName: "deck-float",
                    animationDuration: `${6 + (slot % 3) * 0.9}s`,
                    animationDelay: `${slot * 0.45}s`,
                    animationTimingFunction: "ease-in-out",
                    animationIterationCount: "infinite",
                  }),
              ...cardEdge(p, lifted ? "lifted" : "rest"),
            }}
          >
            <span
              aria-hidden
              className={`absolute inset-0 rounded-xl bg-gradient-to-br opacity-70 transition-opacity duration-500 group-hover:opacity-100 ${
                p.accent
                  ? "from-amber-400/30 via-transparent to-amber-200/10"
                  : "from-primary/25 via-transparent to-accent/20"
              }`}
            />
            <span className="relative flex h-full flex-col justify-between p-3">
              <span className="flex items-start justify-between gap-2">
                <span
                  className={`max-w-[70%] font-mono text-[8px] uppercase tracking-widest ${
                    p.accent ? "text-amber-300" : "text-muted-foreground"
                  }`}
                >
                  {p.accent ? "Live" : p.tag.split("—")[0].split("·")[0].trim()}
                </span>
                <span className="font-mono text-[9px] text-muted-foreground/60">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </span>
              <span className="w-[86%] text-[11px] font-semibold leading-tight break-words">
                {p.shortName}
              </span>
              <span className="w-[86%]">
                <span className="inline-block rounded border border-border/70 px-1 py-0.5 font-mono text-[8px] text-muted-foreground">
                  {p.stack[0]}
                </span>
              </span>
            </span>
          </button>
        );
      })}
    </div>
  );
}
