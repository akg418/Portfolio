import { useEffect, useState } from "react";
import { pickEffect, type Fx } from "@/components/transitions";

export type View = "simple" | "chaos";

export type ModeSwitch = { to: View; x: number; y: number };

/** Back to calm is always the same quiet one. */
const CALM = { swap: 550, end: 1050 };

/**
 * The curtain between the two views. Into chaos it is one of fifteen effects,
 * picked at random and never one of the last five; back to calm it is a plain
 * circle of background colour and a soft fade.
 *
 * `onSwap` fires while the screen is fully covered; `onDone` when it is gone.
 */
export function ModeTransition({
  run,
  onSwap,
  onDone,
}: {
  run: ModeSwitch;
  onSwap: () => void;
  onDone: () => void;
}) {
  const [fx] = useState<Fx | null>(() => (run.to === "chaos" ? pickEffect() : null));
  const [out, setOut] = useState(false);

  useEffect(() => {
    const t = fx ?? CALM;
    const a = window.setTimeout(() => {
      onSwap();
      setOut(true);
    }, t.swap);
    const b = window.setTimeout(onDone, t.end);
    return () => {
      window.clearTimeout(a);
      window.clearTimeout(b);
    };
    // Runs once per switch; the callbacks are stable for its lifetime.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!fx) {
    return (
      <div
        aria-hidden
        style={{ "--ox": `${run.x}px`, "--oy": `${run.y}px` } as React.CSSProperties}
        className={`mode-calm fixed inset-0 z-[200] bg-background ${out ? "is-out" : ""}`}
      />
    );
  }

  return (
    <div aria-hidden data-fx={fx.id} className="pointer-events-auto fixed inset-0 z-[200]">
      <fx.Render x={run.x} y={run.y} out={out} />
    </div>
  );
}
