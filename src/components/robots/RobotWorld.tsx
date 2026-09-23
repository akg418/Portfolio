import { useEffect, useReducer, useRef } from "react";
import { ROBOT_W, RobotSprite, type Pose } from "@/components/robots/RobotSprite";
import { ROBOT_NAMES, useRobots, type RobotName } from "@/hooks/useRobots";

/**
 * Alice and Bob, who live along the bottom of the page.
 *
 * While the walkway is there — that is, while some bar is pinned to the bottom
 * of the window — they play: one kicks the ball to a random spot, the other
 * walks over, pushes it back to its own end and kicks it away again. Opening
 * the terminal takes the walkway away: the line wipes out, the two of them
 * wobble, fall to the floor, pick themselves up somewhere else and just pace
 * about until the walkway returns.
 *
 * The routine is one async function per situation rather than a per-frame
 * simulation: every move is a CSS transition whose duration is distance over
 * speed, so the loop only has to await the arrival. The world lives in a ref
 * because the routine needs to read current positions without going stale, and
 * a counter is bumped to paint.
 *
 * Decoration only: aria-hidden, no pointer events, and nothing renders for
 * anyone who asked for reduced motion.
 */

/** Pixels per second. */
const SPEED = { wander: 28, fetch: 58, push: 34, ball: 330 };
const PAUSE_MS = [2200, 6000] as const;
/** The bottom bar is 44px tall, so its top edge is the walkway. */
const LINE_PX = 44;
const FLOOR_PX = 4;
const BALL_PX = 11;
const EDGE_PX = 18;

type Mover = {
  x: number;
  facing: 1 | -1;
  pose: Pose;
  ms: number;
  /** Standing on the floor rather than up on the walkway. */
  grounded: boolean;
  /** Lying over on their side. */
  fallen: boolean;
  hidden: boolean;
};
type World = {
  alice: Mover;
  bob: Mover;
  ball: { x: number; ms: number; hops: number; visible: boolean };
};

const rand = (min: number, max: number) => min + Math.random() * (max - min);
const other = (name: RobotName): RobotName => (name === "alice" ? "bob" : "alice");
const mover = (x: number): Mover => ({
  x,
  facing: 1,
  pose: "stand",
  ms: 0,
  grounded: false,
  fallen: false,
  hidden: false,
});

export function RobotWorld({ walkway }: { walkway: boolean }) {
  const robots = useRobots();
  const world = useRef<World>({
    alice: mover(0),
    bob: mover(0),
    ball: { x: 0, ms: 0, hops: 0, visible: false },
  });
  const [, paint] = useReducer((n: number) => n + 1, 0);
  const ready = useRef(false);

  /** Recomputed in the effect too, so the routine never closes over a stale set. */
  const live = ROBOT_NAMES.filter((n) => robots[n]);

  useEffect(() => {
    const running = ROBOT_NAMES.filter((n) => robots[n]);
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
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
    const timers: number[] = [];
    const sleep = (ms: number) =>
      new Promise<void>((resolve) => {
        timers.push(window.setTimeout(resolve, Math.max(0, ms)));
      });

    /** Writes to the world and schedules a paint. */
    const set = (edit: (w: World) => void) => {
      if (cancelled) return;
      edit(world.current);
      paint();
    };

    const span = () => ({
      min: EDGE_PX,
      max: Math.max(EDGE_PX + 40, window.innerWidth - ROBOT_W - EDGE_PX),
    });
    const home = (name: RobotName) => {
      const { min, max } = span();
      return name === "alice" ? min + (max - min) * 0.22 : min + (max - min) * 0.78;
    };

    /** Walks a robot to x and resolves when it gets there. */
    const walk = async (name: RobotName, to: number, speed: number, pose: Pose = "walk") => {
      const from = world.current[name].x;
      const ms = (Math.abs(to - from) / speed) * 1000;
      set((w) => {
        w[name] = { ...w[name], x: to, ms, pose, facing: to >= from ? 1 : -1 };
      });
      await sleep(ms + 40);
      set((w) => {
        w[name] = { ...w[name], pose: "stand" };
      });
    };

    /** Walks a robot home with the ball rolling along in front of it. */
    const pushBall = async (name: RobotName, to: number) => {
      const w0 = world.current;
      const from = w0[name].x;
      const gap = w0.ball.x - from;
      const ms = (Math.abs(to - from) / SPEED.push) * 1000;
      set((w) => {
        w[name] = { ...w[name], x: to, ms, pose: "push", facing: to >= from ? 1 : -1 };
        w.ball = { ...w.ball, x: to + gap, ms, hops: 0 };
      });
      await sleep(ms + 40);
      set((w) => {
        w[name] = { ...w[name], pose: "stand" };
      });
    };

    /** A kick: the ball bounces off to a random spot on the far side. */
    const kick = async (name: RobotName) => {
      const { min, max } = span();
      const from = world.current.ball.x;
      const mid = (min + max) / 2;
      const target = name === "alice" ? rand(mid, max - BALL_PX) : rand(min, mid);
      const distance = Math.abs(target - from);
      const ms = (distance / SPEED.ball) * 1000;
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

    /** Pace about: pick a spot, stroll there, stand a while, repeat. */
    const wander = async (name: RobotName) => {
      while (!cancelled) {
        const { min, max } = span();
        await walk(name, rand(min, max), SPEED.wander);
        await sleep(rand(...PAUSE_MS));
      }
    };

    /** The walkway went: wobble, topple, then get up somewhere else. */
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
            grounded: true,
          };
        }
      });
      await sleep(400);
    };

    async function routine() {
      if (!walkway) {
        await fallOver();
        await Promise.all(running.map(wander));
        return;
      }

      // Back on the walkway: step up onto it, take up position, then play.
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

      let striker: RobotName = "alice";
      while (!cancelled) {
        const landed = await kick(striker);
        const fetcher = other(striker);
        const goingLeft = home(fetcher) < landed;
        // Stand on the far side of the ball, so home is straight ahead.
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
    <div aria-hidden className="pointer-events-none fixed inset-0 z-20 overflow-hidden">
      {/* The walkway. It wipes out from the middle when the terminal takes it. */}
      <div
        className="absolute left-0 right-0 origin-center transition-all duration-700 ease-out"
        style={{
          bottom: LINE_PX,
          height: 1,
          background:
            "linear-gradient(to right, transparent, color-mix(in oklab, var(--color-primary) 45%, transparent), transparent)",
          boxShadow: walkway ? "0 0 12px -2px var(--color-primary)" : "none",
          transform: walkway ? "scaleX(1)" : "scaleX(0)",
          opacity: walkway ? 1 : 0,
        }}
      />

      {live.map((name) => {
        const r = world.current[name];
        return (
          <div
            key={name}
            className="absolute left-0 will-change-transform"
            style={{
              bottom: r.grounded ? FLOOR_PX : LINE_PX,
              transform: `translateX(${r.x}px)`,
              transitionProperty: "transform, bottom, opacity",
              transitionDuration: `${r.ms}ms, 520ms, 400ms`,
              transitionTimingFunction: "linear, cubic-bezier(.4,1.4,.6,1), ease",
              opacity: r.hidden ? 0 : 1,
            }}
          >
            <div
              className="transition-transform duration-500"
              style={{
                transform: `scaleX(${r.facing}) rotate(${r.fallen ? 78 : 0}deg)`,
                transformOrigin: "50% 100%",
              }}
            >
              <RobotSprite name={name} pose={r.pose} />
            </div>
            <span
              className="absolute -top-3 left-1/2 -translate-x-1/2 font-mono text-[8px] uppercase tracking-widest text-muted-foreground/50 transition-opacity duration-300"
              style={{ opacity: r.fallen || r.hidden ? 0 : 1 }}
            >
              {name}
            </span>
          </div>
        );
      })}

      {ball.visible && live.length === 2 && (
        <div
          className="absolute left-0"
          style={{
            bottom: LINE_PX,
            transform: `translateX(${ball.x}px)`,
            transitionProperty: "transform",
            transitionDuration: `${ball.ms}ms`,
            transitionTimingFunction: "linear",
          }}
        >
          <div
            style={
              ball.hops
                ? {
                    animationName: "ball-hop",
                    animationDuration: `${ball.ms / ball.hops}ms`,
                    animationIterationCount: ball.hops,
                    animationTimingFunction: "cubic-bezier(.3,0,.7,1)",
                  }
                : undefined
            }
          >
            <div
              className="rounded-full"
              style={{
                width: BALL_PX,
                height: BALL_PX,
                background:
                  "radial-gradient(circle at 32% 30%, #fff, var(--color-accent) 60%, color-mix(in oklab, var(--color-accent) 60%, black) 100%)",
                boxShadow: "0 0 10px -1px var(--color-accent)",
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
