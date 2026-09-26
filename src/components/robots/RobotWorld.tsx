import { useEffect, useReducer, useRef } from "react";
import { Akm, ROBOT_H, ROBOT_W, RobotSprite, type Pose } from "@/components/robots/RobotSprite";
import { ROBOT_NAMES, useRobots, type RobotName, type RobotSwitches } from "@/hooks/useRobots";

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
 * Switching one of them off while both are out is not a quiet power-down: the
 * survivor stops, waits for the other to turn its back, draws an AKM and
 * settles it. The victim drops with its lights out and fades away, and the
 * survivor carries on alone.
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
const SPEED = { wander: 28, fetch: 58, push: 34, ball: 330, stalk: 150 };
const PAUSE_MS = [2200, 6000] as const;
/** The bottom bar is 44px tall, so its top edge is the walkway. */
const LINE_PX = 44;
const FLOOR_PX = 4;
const BALL_PX = 11;
const EDGE_PX = 18;
/** Tall enough for a robot on the walkway, its name tag, a bubble and a hopping ball. */
const STRIP_PX = LINE_PX + ROBOT_H + 56;
/** How far apart the shooter stands, and the burst it fires. */
const STANDOFF_PX = 150;
const BURST = 7;
const SHOT_GAP_MS = 95;
const ROUND_MS = 110;
/** Height of the gun above a robot's feet, for tracers. */
const MUZZLE_Y = 17;

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
  /** Lights out: crossed eyes, no glow. */
  dead: boolean;
  /** Seen from behind. */
  back: boolean;
  gun: "none" | "low" | "aim";
  flash: boolean;
  /** Speech bubble, if any. */
  say: string | null;
  /** Bumped per hit, so the spark animation restarts. */
  hits: number;
};
type Shot = { id: number; x: number; to: number; bottom: number; ms: number };
type World = {
  alice: Mover;
  bob: Mover;
  ball: { x: number; ms: number; hops: number; visible: boolean };
  /** A robot switched off but still on stage for its final scene. */
  dying: RobotName | null;
  shots: Shot[];
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
  dead: false,
  back: false,
  gun: "none",
  flash: false,
  say: null,
  hits: 0,
});

export function RobotWorld({ walkway }: { walkway: boolean }) {
  const robots = useRobots();
  const world = useRef<World>({
    alice: mover(0),
    bob: mover(0),
    ball: { x: 0, ms: 0, hops: 0, visible: false },
    dying: null,
    shots: [],
  });
  const [, paint] = useReducer((n: number) => n + 1, 0);
  const ready = useRef(false);
  /** The switches as of the last run, to tell a fresh power-down from a reload. */
  const before = useRef<RobotSwitches | null>(null);

  /** Recomputed in the effect too, so the routine never closes over a stale set. */
  const live = ROBOT_NAMES.filter((n) => robots[n] || world.current.dying === n);

  useEffect(() => {
    const running = ROBOT_NAMES.filter((n) => robots[n]);
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // One of a pair just went off, with the other still on: that is a hit.
    const prev = before.current;
    before.current = robots;
    const victim =
      ready.current && prev && prev.alice && prev.bob && running.length === 1
        ? other(running[0])
        : null;
    // Any scene cut short by a later change is over; tidy up after it.
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

    const face = (from: RobotName, to: RobotName): 1 | -1 =>
      world.current[to].x >= world.current[from].x ? 1 : -1;
    const say = (name: RobotName, text: string | null) =>
      set((w) => {
        w[name].say = text;
      });

    /**
     * The hit. The shooter squares up at a distance and waits; the victim,
     * none the wiser, turns its back and strolls off whistling; only then does
     * the AKM come out. A burst of tracers, sparks where they land, and the
     * victim goes down with its lights out.
     */
    const execute = async (victim: RobotName, shooter: RobotName) => {
      set((w) => {
        w.ball = { ...w.ball, visible: false, hops: 0 };
        for (const n of ROBOT_NAMES) w[n] = { ...w[n], ms: 0, pose: "stand", fallen: false };
      });
      await sleep(300);

      // Stand off at a distance, on whichever side of the victim has room.
      const { min, max } = span();
      const vx = world.current[victim].x;
      const left = world.current[shooter].x <= vx;
      let spot = left ? vx - STANDOFF_PX : vx + STANDOFF_PX;
      if (spot < min || spot > max) spot = left ? vx + STANDOFF_PX : vx - STANDOFF_PX;
      await walk(shooter, Math.max(min, Math.min(max, spot)), SPEED.stalk);
      set((w) => {
        w[shooter].facing = face(shooter, victim);
        w[victim].facing = face(victim, shooter);
      });
      await sleep(500);
      say(victim, "?");
      await sleep(900);
      say(victim, null);
      say(shooter, "…");
      await sleep(1100);
      say(shooter, null);

      // It turns its back.
      const away = -face(victim, shooter) as 1 | -1;
      set((w) => {
        w[victim].back = true;
      });
      say(victim, "♪");
      const stroll = Math.max(min, Math.min(max, world.current[victim].x + away * 50));
      await walk(victim, stroll, SPEED.wander);
      set((w) => {
        w[victim].facing = away;
      });
      await sleep(600);

      // Now.
      set((w) => {
        w[shooter].facing = face(shooter, victim);
        w[shooter].gun = "low";
      });
      await sleep(450);
      set((w) => {
        w[shooter].gun = "aim";
      });
      await sleep(380);
      say(victim, null);
      say(shooter, "RATATAT");

      for (let i = 0; i < BURST; i++) {
        const s = world.current[shooter];
        const v = world.current[victim];
        const id = ++shotId;
        const shot: Shot = {
          id,
          x: s.x + (s.facing === 1 ? ROBOT_W + 22 : -22),
          to: v.x + ROBOT_W / 2 + rand(-4, 4),
          bottom: (s.grounded ? FLOOR_PX : LINE_PX) + MUZZLE_Y,
          ms: 0,
        };
        set((w) => {
          w[shooter].flash = true;
          w.shots = [...w.shots, shot];
        });
        await sleep(30);
        set((w) => {
          w[shooter].flash = false;
          w.shots = w.shots.map((t) => (t.id === id ? { ...t, x: t.to, ms: ROUND_MS } : t));
        });
        timers.push(
          window.setTimeout(
            () =>
              set((w) => {
                w.shots = w.shots.filter((t) => t.id !== id);
                w[victim] = { ...w[victim], pose: "hit", hits: w[victim].hits + 1 };
              }),
            ROUND_MS,
          ),
        );
        await sleep(SHOT_GAP_MS - 30);
      }
      await sleep(ROUND_MS + 150);

      set((w) => {
        w[shooter].say = null;
        // Rolls over as it drops, so the crossed-out eyes show.
        w[victim] = { ...w[victim], pose: "stand", dead: true, fallen: true, back: false };
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
        w[victim].hidden = true;
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
        // Only topple if they were up on the walkway when it went.
        if (running.some((n) => !world.current[n].grounded)) await fallOver();
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
    // A strip pinned to the bottom edge, exactly like the bar it walks on. A
    // full-viewport layer (inset-0) drifts off the bar on mobile, where the
    // viewport height changes as the browser toolbar hides and shows on scroll.
    <div
      aria-hidden
      className="pointer-events-none fixed inset-x-0 bottom-0 z-20 overflow-hidden"
      style={{ height: STRIP_PX }}
    >
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
              <RobotSprite name={name} pose={r.pose} dead={r.dead} back={r.back} />
              {r.gun !== "none" && (
                // Held in the front hand; pointed at the ground until it aims.
                <div
                  className="absolute transition-transform duration-200"
                  style={{
                    left: 17.5,
                    top: 23,
                    transformOrigin: "8.5px 6px",
                    transform: `rotate(${r.gun === "aim" ? 0 : 58}deg)`,
                  }}
                >
                  <Akm flash={r.flash} />
                </div>
              )}
            </div>
            {r.hits > 0 && !r.dead && (
              <span
                key={r.hits}
                className="robot-spark absolute left-1/2 h-3 w-3 rounded-full"
                style={{
                  bottom: 20,
                  background: "radial-gradient(circle, #fff, #fde047 40%, transparent 70%)",
                }}
              />
            )}
            {r.say ? (
              <span
                key={r.say}
                className="robot-say absolute left-1/2 whitespace-nowrap rounded-md border border-border bg-card px-1.5 py-0.5 font-mono text-[9px] font-bold text-foreground"
                style={{ bottom: ROBOT_H + 4 }}
              >
                {r.say}
              </span>
            ) : (
              <span
                className="absolute -top-3 left-1/2 -translate-x-1/2 font-mono text-[8px] uppercase tracking-widest text-muted-foreground/50 transition-opacity duration-300"
                style={{ opacity: r.fallen || r.hidden ? 0 : 1 }}
              >
                {name}
              </span>
            )}
          </div>
        );
      })}

      {world.current.shots.map((s) => (
        <div
          key={s.id}
          className="absolute left-0 h-[2px] w-2.5 rounded-full"
          style={{
            bottom: s.bottom,
            transform: `translateX(${s.x}px)`,
            transition: `transform ${s.ms}ms linear`,
            background: "linear-gradient(90deg, transparent, #fde047, #fff)",
            boxShadow: "0 0 6px #f59e0b",
          }}
        />
      ))}

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
