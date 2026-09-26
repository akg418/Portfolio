import { useEffect, useState } from "react";
import { profile } from "@/data/profile";

const SEEN_KEY = "preloader-seen";
const COUNT_MS = 1400;

function alreadySeen(): boolean {
  try {
    return window.sessionStorage.getItem(SEEN_KEY) === "1";
  } catch {
    return false;
  }
}

/**
 * Intro curtain: a counter runs to 100 under the name, then the two halves of
 * the curtain slide apart. Once per browser session, never with reduced motion.
 */
export function Preloader() {
  const [show] = useState(
    () => !alreadySeen() && !window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );
  const [count, setCount] = useState(0);
  const [phase, setPhase] = useState<"count" | "open" | "done">(show ? "count" : "done");

  useEffect(() => {
    if (!show) return;
    try {
      window.sessionStorage.setItem(SEEN_KEY, "1");
    } catch {
      /* private mode: the intro just plays again next load */
    }
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / COUNT_MS);
      // Ease out, so the last few percent linger like a real load.
      setCount(Math.round((1 - Math.pow(1 - t, 3)) * 100));
      if (t < 1) raf = requestAnimationFrame(tick);
      else {
        setPhase("open");
        window.setTimeout(() => setPhase("done"), 1000);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [show]);

  if (phase === "done") return null;
  const open = phase === "open";
  const half =
    "absolute inset-x-0 h-1/2 bg-background transition-transform duration-[900ms] ease-[cubic-bezier(.76,0,.24,1)]";

  return (
    <div aria-hidden className="dark fixed inset-0 z-[100] text-foreground">
      <div className={`${half} top-0`} style={{ transform: open ? "translateY(-100%)" : "none" }} />
      <div
        className={`${half} bottom-0`}
        style={{ transform: open ? "translateY(100%)" : "none" }}
      />
      <div
        className="absolute inset-0 flex flex-col items-center justify-center gap-4 px-6 transition-opacity duration-300"
        style={{ opacity: open ? 0 : 1 }}
      >
        <div className="overflow-hidden">
          <div className="preloader-rise text-3xl font-bold tracking-tight sm:text-5xl glow-text">
            {profile.name}
          </div>
        </div>
        <div className="h-px w-48 overflow-hidden bg-border">
          <div
            className="h-full bg-gradient-to-r from-primary to-accent"
            style={{ width: `${count}%` }}
          />
        </div>
        <div className="font-mono text-xs tabular-nums text-muted-foreground">
          {String(count).padStart(3, "0")}%
        </div>
      </div>
    </div>
  );
}
