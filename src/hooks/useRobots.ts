import { useEffect, useState } from "react";
import { STORAGE_KEYS, readJson, writeJson } from "@/lib/storage";

/** Fired on `window` when a robot is switched on or off from the terminal. */
export const ROBOTS_EVENT = "robots";

export const ROBOT_NAMES = ["alice", "bob"] as const;
export type RobotName = (typeof ROBOT_NAMES)[number];
export type RobotSwitches = Record<RobotName, boolean>;

const BOTH_ON: RobotSwitches = { alice: true, bob: true };

function parse(value: unknown): RobotSwitches | undefined {
  if (typeof value !== "object" || value === null) return undefined;
  const raw = value as Partial<Record<RobotName, unknown>>;
  return {
    alice: raw.alice !== false,
    bob: raw.bob !== false,
  };
}

/** Both robots are on unless the visitor turned one off. */
export function readRobots(): RobotSwitches {
  return readJson(STORAGE_KEYS.robots, parse) ?? { ...BOTH_ON };
}

/** Switches one robot or both, persists it, and notifies every subscriber. */
export function setRobots(which: RobotName | "both", on: boolean): RobotSwitches {
  const next = which === "both" ? { alice: on, bob: on } : { ...readRobots(), [which]: on };
  writeJson(STORAGE_KEYS.robots, next);
  window.dispatchEvent(new CustomEvent<RobotSwitches>(ROBOTS_EVENT, { detail: next }));
  return next;
}

/**
 * Which robots are switched on, kept in sync with the terminal.
 *
 * Starts with both on so the server and the first client render agree; the
 * stored value is read after mount.
 */
export function useRobots(): RobotSwitches {
  const [switches, setSwitches] = useState<RobotSwitches>(BOTH_ON);

  useEffect(() => {
    setSwitches(readRobots());
    const onChange = (e: Event) => setSwitches((e as CustomEvent<RobotSwitches>).detail);
    window.addEventListener(ROBOTS_EVENT, onChange);
    return () => window.removeEventListener(ROBOTS_EVENT, onChange);
  }, []);

  return switches;
}
