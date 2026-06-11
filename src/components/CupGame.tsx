import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Gamepad2, RotateCw } from "lucide-react";

type Phase = "idle" | "preview" | "shuffling" | "pick" | "won" | "lost";

const SPACING = 110; // px between cup centers
const CUP_IDS = [0, 1, 2];

export function CupGame() {
  // slotOf[cupId] = which slot (0..2) this cup is currently sitting in.
  const [slotOf, setSlotOf] = useState<number[]>([0, 1, 2]);
  // which two cups are currently mid-swap (lifted), if any.
  const [lifted, setLifted] = useState<[number, number] | null>(null);
  // the cup currently lifted by itself (preview / reveal)
  const [singleLift, setSingleLift] = useState<number | null>(null);
  const [ballCup, setBallCup] = useState(0);
  const [phase, setPhase] = useState<Phase>("idle");
  const [speed, setSpeed] = useState(5); // 1 slow .. 10 fast
  const [message, setMessage] = useState("Press start to shuffle the cups.");
  const [currentDur, setCurrentDur] = useState(500);
  const timer = useRef<number | null>(null);

  const baseDuration = () => Math.max(180, 750 - speed * 55); // ms per swap
  // randomize each swap a bit so the shuffle feels organic but still trackable
  const randomDuration = () => {
    const base = baseDuration();
    return Math.round(base * (0.65 + Math.random() * 0.7));
  };

  useEffect(() => () => {
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
    // show ball under cup for a moment, then lower cup and begin shuffling
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
          const dur = randomDuration();
          setCurrentDur(dur);
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
              // small random gap between swaps
              timer.current = window.setTimeout(doSwap, 40 + Math.random() * 180);
            }
          }, dur);
        };
        doSwap();
      }, 500);
    }, 1400);
  };

  const pick = (cupId: number) => {
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

  return (
    <section
      id="game"
      className="py-24 border-t border-border"
    >
      <div className="flex items-center gap-3 mb-4">
        <Gamepad2 className="w-5 h-5 text-primary" />
        <h2 className="text-3xl font-bold tracking-tight">Gaming mode — Cups & Ball</h2>
      </div>
      <p className="text-sm text-muted-foreground mb-10">
        Find the cup hiding the ball after the shuffle. Adjust the speed to your reflexes.
      </p>

      <div className="rounded-xl border border-border bg-card p-6 sm:p-10 overflow-hidden">
        {/* Stage */}
        <div
          className="relative mx-auto h-56 select-none"
          style={{ width: SPACING * 2 + 96 }}
        >
          {/* Ball — always rendered, follows ball cup. Only visible during preview/reveal/idle. */}
          <div
            className="absolute bottom-2 w-8 h-8 rounded-full bg-gradient-to-br from-accent to-primary shadow-[0_0_20px_var(--color-primary)]"
            style={{
              left: 48 - 16,
              transform: `translateX(${slotOf[ballCup] * SPACING}px)`,
              transition: `transform ${dur}ms cubic-bezier(.5,.05,.5,.95), opacity 200ms`,
              opacity: reveal || isPreview || phase === "idle" ? 1 : 0,
            }}
          />

          {CUP_IDS.map((cupId) => {
            const slot = slotOf[cupId];
            const isLifted = lifted?.includes(cupId);
            // alternate lift direction so the two swapping cups visibly cross,
            // with a touch of randomness in lift height
            const liftY = isLifted
              ? lifted![0] === cupId
                ? -(50 + Math.random() * 30)
                : (50 + Math.random() * 30)
              : 0;
            const isBall = cupId === ballCup;
            return (
              <button
                key={cupId}
                onClick={() => pick(cupId)}
                disabled={phase !== "pick"}
                aria-label={`Cup ${cupId + 1}`}
                className="absolute bottom-0 group disabled:cursor-default"
                style={{
                  left: 0,
                  width: 96,
                  transform: `translate(${slot * SPACING}px, ${liftY}px)`,
                  transition: `transform ${dur}ms cubic-bezier(.5,.05,.5,.95)`,
                  zIndex: isLifted ? (liftY < 0 ? 30 : 10) : 20,
                }}
              >
                <div
                  className={`mx-auto w-24 h-32 rounded-t-[60%] rounded-b-md bg-gradient-to-b from-primary to-accent shadow-xl transition-transform duration-300 ${
                    phase === "pick" ? "group-hover:-translate-y-2" : ""
                  } ${(reveal && isBall) || (isPreview && singleLift === cupId) ? "-translate-y-20" : ""}`}
                />
                <div className="mx-auto mt-1 h-1.5 w-16 rounded-full bg-foreground/20 blur-[2px]" />
              </button>
            );
          })}
        </div>

        <div className="mt-8 text-center text-sm font-mono text-foreground/90 min-h-5">
          {message}
        </div>

        <div className="mt-8 grid sm:grid-cols-[1fr_auto] gap-4 items-center">
          <label className="flex items-center gap-3 text-xs font-mono text-muted-foreground">
            <span className="w-16">Speed</span>
            <input
              type="range"
              min={1}
              max={10}
              value={speed}
              onChange={(e) => setSpeed(Number(e.target.value))}
              className="flex-1 accent-[var(--color-primary)]"
            />
            <span className="w-8 text-right text-foreground">{speed}</span>
          </label>
          <Button onClick={start} disabled={phase === "shuffling"}>
            <RotateCw />
            <span>{phase === "idle" ? "Start" : "Shuffle again"}</span>
          </Button>
        </div>
      </div>
    </section>
  );
}