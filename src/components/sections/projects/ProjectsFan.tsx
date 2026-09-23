import { useEffect, useState } from "react";
import { cardEdge } from "@/components/sections/projects/cardEdge";
import { projects, type Project } from "@/data/profile";

/**
 * The projects as a slow carousel of cards on an arc.
 *
 * Every card is rotated about a pivot far below the deck, so it rides the arc
 * and tilts with it. They all drift left to right on the same loop, fade out at
 * the right end and come back in on the left; a negative slice of the shared
 * delay is what keeps them evenly spaced.
 *
 * Both the slot a card takes on the loop and which card overlaps which are
 * shuffled per visit, so the deck is never laid out the same way twice. The
 * shuffle happens after hydration rather than during render: the server has no
 * way to agree with the client on a random order.
 *
 * Pointing at the deck pauses every animation, so the card under the cursor
 * holds still to be read or clicked.
 */

/** One full trip around the loop. Long enough that the deck reads as drifting. */
const ORBIT_SECONDS = 54;

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

export function ProjectsFan({ onSelect }: { onSelect: (project: Project) => void }) {
  const [active, setActive] = useState<string | null>(null);
  const [reduceMotion, setReduceMotion] = useState(false);
  /** slots[i] is the position card i takes on the loop; layer[i] is what it overlaps. */
  const [slots, setSlots] = useState(inOrder);
  const [layer, setLayer] = useState(inOrder);

  useEffect(() => {
    setReduceMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    setSlots(shuffled(projects.length));
    setLayer(shuffled(projects.length));
  }, []);

  return (
    <div
      className="group/deck relative left-1/2 flex w-screen max-w-none -translate-x-1/2 justify-center overflow-hidden"
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
            type="button"
            onMouseEnter={() => setActive(p.title)}
            onMouseLeave={() => setActive(null)}
            onFocus={() => setActive(p.title)}
            onBlur={() => setActive(null)}
            onClick={() => onSelect(p)}
            aria-label={`Open ${p.title}`}
            className="group absolute left-1/2 cursor-pointer overflow-hidden rounded-xl border bg-card text-left transition-[transform,box-shadow,border-color] duration-300 ease-out focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary group-hover/deck:[animation-play-state:paused] motion-reduce:transition-none"
            style={{
              width: "var(--fan-w)",
              aspectRatio: "4 / 6",
              bottom: "calc(var(--fan-r) * 0.17)",
              marginLeft: "calc(var(--fan-w) / -2)",
              transformOrigin: "50% calc(100% + var(--fan-r))",
              zIndex: lifted ? 30 : layer[i] + 1,
              transform: lifted ? "scale(1.06)" : undefined,
              // Every card runs the same trip; a negative slice of the delay
              // staggers them evenly around the loop. Longhands, not the
              // `animation` shorthand, which would set animation-play-state
              // inline and outrank the class that pauses on hover.
              ...(reduceMotion
                ? { rotate: `${-50 + (slot * 100) / projects.length}deg` }
                : {
                    animationName: "deck-orbit, deck-float",
                    animationDuration: `${ORBIT_SECONDS}s, ${6 + (slot % 3) * 0.9}s`,
                    animationDelay: `${(-slot * ORBIT_SECONDS) / projects.length}s, ${slot * 0.45}s`,
                    animationTimingFunction: "linear, ease-in-out",
                    animationIterationCount: "infinite, infinite",
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
