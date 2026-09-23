import type { RobotName } from "@/hooks/useRobots";

/** What the robot is doing, which is all the drawing needs to know. */
export type Pose = "stand" | "walk" | "push" | "kick" | "flail";

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
};

/** The robot itself: a body, a visor and four limbs the CSS animates. */
export function RobotSprite({ name, pose }: { name: RobotName; pose: Pose }) {
  const eye = EYE[name];
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
        className="robot-antenna"
        style={{ filter: `drop-shadow(0 0 4px ${eye})` }}
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
      <circle cx="17" cy="29" r="1.3" fill={eye} opacity="0.9" />

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
      <rect x="9" y="14.5" width="16" height="6.5" rx="3.2" fill="#0a0e1c" />
      <circle cx="13.6" cy="17.7" r="1.6" fill={eye} className="robot-eye" />
      <circle cx="20.4" cy="17.7" r="1.6" fill={eye} className="robot-eye" />

      <ellipse cx="17" cy="41" rx="9" ry="1.4" fill={eye} opacity="0.12" />
    </svg>
  );
}
