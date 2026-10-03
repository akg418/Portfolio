import { useEffect, useState } from "react";
import { STORAGE_KEYS, readJson, writeJson } from "@/lib/storage";

/** Fired on `window` when the vehicle is changed, from the terminal or the driving panel. */
export const VEHICLE_EVENT = "vehicle";

export const VEHICLE_KINDS = ["car", "racer", "truck", "moto"] as const;
export type VehicleKind = (typeof VEHICLE_KINDS)[number];
export type VehicleState = { on: boolean; kind: VehicleKind };

export const VEHICLE_LABELS: Record<VehicleKind, string> = {
  car: "Hatchback",
  racer: "Racer",
  truck: "Monster truck",
  moto: "Motorcycle",
};

const DEFAULT: VehicleState = { on: true, kind: "car" };

function parse(value: unknown): VehicleState | undefined {
  if (typeof value !== "object" || value === null) return undefined;
  const raw = value as Partial<Record<keyof VehicleState, unknown>>;
  const kind = VEHICLE_KINDS.find((k) => k === raw.kind) ?? DEFAULT.kind;
  return { on: raw.on !== false, kind };
}

export function readVehicle(): VehicleState {
  return readJson(STORAGE_KEYS.vehicle, parse) ?? { ...DEFAULT };
}

/** Updates the vehicle, persists it, and notifies every subscriber. */
export function setVehicle(patch: Partial<VehicleState>): VehicleState {
  const next = { ...readVehicle(), ...patch };
  writeJson(STORAGE_KEYS.vehicle, next);
  window.dispatchEvent(new CustomEvent<VehicleState>(VEHICLE_EVENT, { detail: next }));
  return next;
}

/** The vehicle state, in sync with the terminal. Starts on the default so SSR agrees. */
export function useVehicle(): VehicleState {
  const [state, setState] = useState<VehicleState>(DEFAULT);
  useEffect(() => {
    setState(readVehicle());
    const onChange = (e: Event) => setState((e as CustomEvent<VehicleState>).detail);
    window.addEventListener(VEHICLE_EVENT, onChange);
    return () => window.removeEventListener(VEHICLE_EVENT, onChange);
  }, []);
  return state;
}
