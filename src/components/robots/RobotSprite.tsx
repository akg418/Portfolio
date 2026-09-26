import type { RobotName } from "@/hooks/useRobots";

/** What the robot is doing, which is all the drawing needs to know. */
export type Pose = "stand" | "walk" | "push" | "kick" | "flail" | "hit";

export const ROBOT_W = 34;
export const ROBOT_H = 42;

/** Alice looks out of primary-coloured eyes, Bob out of accent ones. */
const EYE: Record<RobotName, string> = {
  alice: "var(--color-primary)",
  bob: "var(--color-accent)",
};

const POSE_CLASS: Record<Pose, string> = {
  stand: "",
  walk: "robot-walking",
  push: "robot-walking robot-pushing",
  kick: "robot-kicking",
  flail: "robot-flailing",
  hit: "robot-hit",
};

/**
 * The robot itself: a body, a visor and four limbs the CSS animates. A dead
 * robot's lights go out and its eyes become crosses. Seen from behind there
 * is no visor, just the back of the head and a battery pack.
 */
export function RobotSprite({
  name,
  pose,
  dead = false,
  back = false,
}: {
  name: RobotName;
  pose: Pose;
  dead?: boolean;
  back?: boolean;
}) {
  const eye = dead ? "var(--color-muted-foreground)" : EYE[name];
  return (
    <svg
      width={ROBOT_W}
      height={ROBOT_H}
      viewBox="0 0 34 42"
      fill="none"
      className={POSE_CLASS[pose]}
    >
      <line x1="17" y1="11" x2="17" y2="6" stroke="var(--color-border)" strokeWidth="1.2" />
      <circle
        cx="17"
        cy="4.4"
        r="2.1"
        fill={eye}
        className={dead ? undefined : "robot-antenna"}
        style={dead ? { opacity: 0.4 } : { filter: `drop-shadow(0 0 4px ${eye})` }}
      />

      {/* legs, behind the body */}
      <rect
        x="12"
        y="33"
        width="3"
        height="7"
        rx="1.5"
        fill="var(--color-muted-foreground)"
        className="robot-limb robot-limb-a robot-leg-front"
      />
      <rect
        x="19"
        y="33"
        width="3"
        height="7"
        rx="1.5"
        fill="var(--color-muted-foreground)"
        className="robot-limb robot-limb-b"
      />

      {/* arms */}
      <rect
        x="6.5"
        y="25"
        width="2.6"
        height="7"
        rx="1.3"
        fill="var(--color-muted-foreground)"
        className="robot-limb robot-limb-b robot-arm"
      />
      <rect
        x="24.9"
        y="25"
        width="2.6"
        height="7"
        rx="1.3"
        fill="var(--color-muted-foreground)"
        className="robot-limb robot-limb-a robot-arm"
      />

      {/* body */}
      <rect
        x="9.5"
        y="24"
        width="15"
        height="10"
        rx="3.4"
        fill="var(--color-card)"
        stroke="var(--color-border)"
      />
      {back ? (
        <rect x="13" y="26" width="8" height="6" rx="1.2" fill="var(--color-border)" />
      ) : (
        <circle cx="17" cy="29" r="1.3" fill={eye} opacity="0.9" />
      )}

      {/* head */}
      <rect
        x="6"
        y="10.5"
        width="22"
        height="14"
        rx="5"
        fill="var(--color-card)"
        stroke="var(--color-border)"
      />
      {back ? (
        <path
          d="M11 15h12M11 17.7h12M11 20.4h12"
          stroke="var(--color-border)"
          strokeWidth="1"
          strokeLinecap="round"
        />
      ) : (
        <rect x="9" y="14.5" width="16" height="6.5" rx="3.2" fill="#0a0e1c" />
      )}
      {back ? null : dead ? (
        <path
          d="M12.2 16.3l2.8 2.8m0-2.8l-2.8 2.8M19 16.3l2.8 2.8m0-2.8L19 19.1"
          stroke="#ef4444"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
      ) : (
        <>
          <circle cx="13.6" cy="17.7" r="1.6" fill={eye} className="robot-eye" />
          <circle cx="20.4" cy="17.7" r="1.6" fill={eye} className="robot-eye" />
        </>
      )}

      <ellipse cx="17" cy="41" rx="9" ry="1.4" fill={eye} opacity="0.12" />
    </svg>
  );
}

/**
 * A cartoon AKM, drawn pointing right from the grip, sized to the robot's
 * hands: wooden stock and handguard, the curved magazine, the gas tube.
 */
export function Akm({ flash }: { flash: boolean }) {
  return (
    <svg width="30" height="12" viewBox="0 0 30 12" fill="none" className="overflow-visible">
      {/* stock */}
      <path d="M0 3.2l6.5-.6v3.4L1 7.6z" fill="#8b5a2b" />
      {/* receiver */}
      <rect x="6" y="2.4" width="9" height="3.6" rx=".6" fill="#3b4150" />
      {/* grip and curved magazine */}
      <path d="M8 5.8h1.8l-.6 3.4H7.6z" fill="#2b303b" />
      <path d="M11.4 5.8h2.4c.2 2 .9 3.6 2 5l-2 .9c-1.2-1.6-2-3.6-2.4-5.9z" fill="#2b303b" />
      {/* handguard, gas tube, barrel, front sight */}
      <rect x="15" y="2.9" width="6" height="2.6" rx=".8" fill="#9a6530" />
      <rect x="15" y="1.7" width="7" height="1" rx=".5" fill="#3b4150" />
      <rect x="21" y="3.4" width="7" height="1.2" rx=".4" fill="#3b4150" />
      <rect x="25.6" y="1.4" width=".9" height="2.2" fill="#3b4150" />
      {flash && (
        <path
          d="M28 4l4-3-1.2 3 3.4-.2-3.4 1.4 2.4 2.6-3.6-1.8z"
          fill="#fde047"
          style={{ filter: "drop-shadow(0 0 4px #f59e0b)" }}
        />
      )}
    </svg>
  );
}
