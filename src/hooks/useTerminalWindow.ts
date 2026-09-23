import { useEffect, useState } from "react";
import { STORAGE_KEYS, readJson, writeJson } from "@/lib/storage";

export type WindowPos = { x: number; y: number };
export type WindowSize = { w: number; h: number };

const MIN_WIDTH = 360;
const MIN_HEIGHT = 240;
const DEFAULT_WIDTH = 720;
const DEFAULT_HEIGHT = 480;

function parsePos(value: unknown): WindowPos | undefined {
  if (typeof value !== "object" || value === null) return undefined;
  const { x, y } = value as Record<string, unknown>;
  if (typeof x !== "number" || typeof y !== "number") return undefined;
  if (!Number.isFinite(x) || !Number.isFinite(y)) return undefined;
  return { x, y };
}

function parseSize(value: unknown): WindowSize | undefined {
  if (typeof value !== "object" || value === null) return undefined;
  const { w, h } = value as Record<string, unknown>;
  if (typeof w !== "number" || typeof h !== "number") return undefined;
  if (!Number.isFinite(w) || !Number.isFinite(h)) return undefined;
  return { w, h };
}

/**
 * Attaches move/up listeners for a pointer drag and detaches them on release.
 * Both the header drag and the corner resize share this.
 */
function trackDrag(onMove: (event: MouseEvent) => void): void {
  const handleUp = () => {
    window.removeEventListener("mousemove", onMove);
    window.removeEventListener("mouseup", handleUp);
  };
  window.addEventListener("mousemove", onMove);
  window.addEventListener("mouseup", handleUp);
}

/**
 * Position and size of the floating terminal window, persisted per browser,
 * plus the drag handlers for its header and resize corner.
 */
export function useTerminalWindow(enabled: boolean) {
  const [pos, setPos] = useState<WindowPos>(() => {
    if (typeof window === "undefined") return { x: 80, y: 80 };
    const saved = readJson(STORAGE_KEYS.termWindowPos, parsePos);
    if (saved) return saved;
    return {
      x: Math.max(24, Math.round(window.innerWidth / 2 - 360)),
      y: Math.max(24, Math.round(window.innerHeight / 2 - 260)),
    };
  });

  const [size, setSize] = useState<WindowSize>(() => {
    if (typeof window === "undefined") return { w: DEFAULT_WIDTH, h: DEFAULT_HEIGHT };
    const saved = readJson(STORAGE_KEYS.termWindowSize, parseSize);
    if (saved) return saved;
    return {
      w: Math.min(DEFAULT_WIDTH, window.innerWidth - 48),
      h: Math.min(DEFAULT_HEIGHT, window.innerHeight - 96),
    };
  });

  useEffect(() => {
    writeJson(STORAGE_KEYS.termWindowPos, pos);
  }, [pos]);

  useEffect(() => {
    writeJson(STORAGE_KEYS.termWindowSize, size);
  }, [size]);

  const onHeaderMouseDown = (e: React.MouseEvent) => {
    if (!enabled) return;
    // Ignore drags that start on the traffic-light buttons.
    if ((e.target as HTMLElement).closest("[data-window-btn]")) return;
    e.preventDefault();
    const startX = e.clientX;
    const startY = e.clientY;
    const start = { ...pos };
    trackDrag((ev) => {
      setPos({
        x: Math.max(0, Math.min(window.innerWidth - 80, start.x + (ev.clientX - startX))),
        y: Math.max(0, Math.min(window.innerHeight - 40, start.y + (ev.clientY - startY))),
      });
    });
  };

  const onResizeMouseDown = (e: React.MouseEvent) => {
    if (!enabled) return;
    e.preventDefault();
    e.stopPropagation();
    const startX = e.clientX;
    const startY = e.clientY;
    const start = { ...size };
    trackDrag((ev) => {
      setSize({
        w: Math.max(
          MIN_WIDTH,
          Math.min(window.innerWidth - pos.x - 8, start.w + (ev.clientX - startX)),
        ),
        h: Math.max(
          MIN_HEIGHT,
          Math.min(window.innerHeight - pos.y - 8, start.h + (ev.clientY - startY)),
        ),
      });
    });
  };

  return { pos, size, onHeaderMouseDown, onResizeMouseDown };
}
