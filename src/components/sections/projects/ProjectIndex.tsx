import { useEffect, useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { Cover } from "@/components/sections/projects/ProjectCovers";
import type { Project } from "@/data/profile";

/**
 * The rest of the work as an editorial index: one row per project, big type,
 * everything scannable at a glance. On a pointer device, hovering a row brings
 * up that project's cover in a card that trails the cursor, tilting with its
 * speed, while the other rows fall back. On touch, each row carries its cover
 * inline. Every row opens the project's full story.
 */

/** How quickly the preview catches up with the cursor, per frame. */
const FOLLOW = 0.16;
const MAX_TILT = 9;

export function ProjectIndex({
  projects,
  onSelect,
}: {
  projects: Project[];
  onSelect: (p: Project) => void;
}) {
  const [active, setActive] = useState<number | null>(null);
  const [finePointer, setFinePointer] = useState(false);
  const previewRef = useRef<HTMLDivElement>(null);
  const target = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    const set = () => setFinePointer(mq.matches);
    set();
    mq.addEventListener("change", set);
    return () => mq.removeEventListener("change", set);
  }, []);

  // The preview glides after the cursor and leans into the direction of travel.
  useEffect(() => {
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
      // Above the cursor, unless that would tuck it under the nav bar.
      lift += ((y < 300 ? 18 : -115) - lift) * 0.2;
      el.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, ${lift}%) rotate(${tilt}deg)`;
    };
    raf = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(raf);
  }, [finePointer]);

  const track = (e: React.PointerEvent) => {
    target.current = { x: e.clientX, y: e.clientY };
  };

  const shown = active === null ? null : projects[active];

  return (
    <div className="relative" onPointerMove={track} onPointerLeave={() => setActive(null)}>
      <ol className="group/index border-t border-border">
        {projects.map((p, i) => {
          const isActive = active === i;
          return (
            <li key={p.title} className="border-b border-border">
              <button
                type="button"
                onClick={() => onSelect(p)}
                onPointerEnter={(e) => {
                  if (e.pointerType === "mouse") {
                    target.current = { x: e.clientX, y: e.clientY };
                    setActive(i);
                  }
                }}
                onFocus={() => setActive(i)}
                onBlur={() => setActive(null)}
                data-cursor="Open"
                className={`group/row relative grid w-full grid-cols-[2.25rem_1fr_auto] items-center gap-x-3 overflow-hidden py-5 text-left transition-opacity duration-300 sm:grid-cols-[3rem_minmax(0,1fr)_minmax(0,14rem)_2.5rem] sm:gap-x-6 sm:py-6 ${
                  active !== null && !isActive ? "opacity-35" : "opacity-100"
                }`}
              >
                {/* A wash that sweeps in from the left on hover. */}
                <span
                  aria-hidden
                  className="absolute inset-0 origin-left bg-gradient-to-r from-primary/10 via-accent/5 to-transparent transition-transform duration-500 ease-out"
                  style={{ transform: isActive ? "scaleX(1)" : "scaleX(0)" }}
                />
                <span className="relative self-start pt-2 font-mono text-xs tabular-nums text-muted-foreground sm:self-center sm:pt-0">
                  {String(i + 2).padStart(2, "0")}
                </span>
                <span className="relative min-w-0">
                  <span
                    className={`block text-2xl font-bold leading-tight tracking-tight transition-transform duration-500 ease-out sm:text-4xl ${
                      isActive
                        ? "translate-x-2 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent"
                        : ""
                    }`}
                  >
                    {p.shortName}
                  </span>
                  <span className="mt-1 block text-sm text-muted-foreground">{p.short}</span>
                  {/* Covers sit inline where there is no cursor to follow. */}
                  {!finePointer && p.motif && (
                    <span className="mt-3 block aspect-[16/10] w-full max-w-sm overflow-hidden rounded-lg border border-border">
                      <Cover motif={p.motif} />
                    </span>
                  )}
                </span>
                <span className="relative hidden min-w-0 text-right sm:block">
                  <span className="block truncate font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                    {p.tag}
                  </span>
                  <span className="mt-1 block truncate font-mono text-[11px] text-foreground/70">
                    {p.stack.slice(0, 3).join(" · ")}
                  </span>
                </span>
                <span
                  className={`relative flex h-9 w-9 items-center justify-center self-start rounded-full border transition-all duration-300 sm:self-center ${
                    isActive
                      ? "rotate-45 border-primary bg-primary text-primary-foreground"
                      : "border-border text-muted-foreground"
                  }`}
                >
                  <ArrowUpRight className="h-4 w-4" />
                </span>
              </button>
            </li>
          );
        })}
      </ol>

      {finePointer && (
        <div
          ref={previewRef}
          aria-hidden
          className="pointer-events-none fixed left-0 top-0 z-40 w-[300px]"
          style={{ transform: "translate3d(-1000px,-1000px,0)" }}
        >
          <div
            className="overflow-hidden rounded-xl border border-white/10 bg-background shadow-[0_30px_60px_-20px_rgba(0,0,0,0.85)] transition-[opacity,transform] duration-300 ease-out"
            style={{
              opacity: shown ? 1 : 0,
              transform: shown ? "scale(1)" : "scale(0.85)",
            }}
          >
            {/* Every cover is mounted; only the active one shows, so switching rows crossfades. */}
            <div className="relative aspect-[16/10]">
              {projects.map((p, i) =>
                p.motif ? (
                  <div
                    key={p.title}
                    className="absolute inset-0 transition-opacity duration-300"
                    style={{ opacity: active === i ? 1 : 0 }}
                  >
                    <Cover motif={p.motif} active={active === i} />
                  </div>
                ) : null,
              )}
            </div>
            <div className="flex items-center justify-between gap-2 px-3 py-2 font-mono text-[10px] text-muted-foreground">
              <span className="truncate">{shown?.tag}</span>
              <span className="shrink-0 text-primary">open ↗</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
