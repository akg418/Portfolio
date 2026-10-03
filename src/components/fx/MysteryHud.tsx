import { useEffect, useRef, useState } from "react";
import { Download, Search, X } from "lucide-react";
import { useUsername } from "@/hooks/useUsername";
import {
  MYSTERIES,
  MYSTERY_EVENT,
  confetti,
  fnv,
  solveMystery,
  useMysteries,
  type MysteryEvent,
} from "@/lib/mysteries";

const KONAMI = [
  "arrowup",
  "arrowup",
  "arrowdown",
  "arrowdown",
  "arrowleft",
  "arrowright",
  "arrowleft",
  "arrowright",
  "b",
  "a",
];
const ARCADE_MS = 20000;
/** fnv("balloon-ac"): the console key, decoded from the hex in `--x-key`. */
const KEY_HASH = "a48cea5f";
const PROBLEM_KEY = "ahmed.dev:problem";

/**
 * The mystery layer: nothing until the first one is found, then a small
 * `n/N` counter, a toast per discovery, and a certificate when all are done.
 * It also hosts the global listeners some mysteries need (the Konami code)
 * and plants the two developer puzzles (a console API and a problem in
 * localStorage).
 */
export function MysteryHud() {
  const solved = useMysteries();
  const username = useUsername();
  const [toast, setToast] = useState<string | null>(null);
  const [certificate, setCertificate] = useState(false);
  const toastTimer = useRef(0);

  // Celebrate each discovery.
  useEffect(() => {
    const on = (e: Event) => {
      const { id, solved: all } = (e as CustomEvent<MysteryEvent>).detail;
      const m = MYSTERIES.find((x) => x.id === id);
      confetti();
      setToast(`Mystery solved — ${m?.title ?? id} · ${all.length}/${MYSTERIES.length}`);
      window.clearTimeout(toastTimer.current);
      toastTimer.current = window.setTimeout(() => setToast(null), 3600);
      if (all.length === MYSTERIES.length) window.setTimeout(() => setCertificate(true), 1500);
    };
    window.addEventListener(MYSTERY_EVENT, on);
    return () => window.removeEventListener(MYSTERY_EVENT, on);
  }, []);

  // ↑↑↓↓←→←→BA: arcade mode for a while.
  useEffect(() => {
    let i = 0;
    let timer = 0;
    const on = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement | null;
      if (t?.closest("input, textarea")) return;
      const k = e.key.toLowerCase();
      i = k === KONAMI[i] ? i + 1 : k === KONAMI[0] ? 1 : 0;
      if (i < KONAMI.length) return;
      i = 0;
      document.documentElement.classList.add("arcade");
      window.clearTimeout(timer);
      timer = window.setTimeout(
        () => document.documentElement.classList.remove("arcade"),
        ARCADE_MS,
      );
      solveMystery("konami");
    };
    window.addEventListener("keydown", on);
    return () => {
      window.removeEventListener("keydown", on);
      window.clearTimeout(timer);
    };
  }, []);

  // Developer puzzles: a console API, and a problem left in localStorage.
  useEffect(() => {
    console.log(
      "%c👀 ahmed.dev%c\nHey, developer. Something is hiding on `window`. Start with %c__ahmed.hint()",
      "font:700 16px ui-monospace,monospace;color:#22d3ee",
      "font:12px ui-monospace,monospace;color:#94a3b8",
      "font:700 12px ui-monospace,monospace;color:#a855f7",
    );
    (window as unknown as { __ahmed: object }).__ahmed = {
      hint() {
        return "The key lives in the cascade. Inspect the :root element's custom properties — it's hex. Then call __ahmed.unlock(key).";
      },
      unlock(key: unknown) {
        if (typeof key !== "string" || fnv(key.trim().toLowerCase()) !== KEY_HASH)
          return "Nope. Decode it, don't guess it.";
        solveMystery("console");
        return "🔓 Unlocked. Nice digging. (There's one more for you — some things are stored, not shown.)";
      },
    };
    try {
      localStorage.setItem(
        PROBLEM_KEY,
        JSON.stringify({
          problem: "Popcount Sum",
          statement:
            "Let f(i) be the number of 1-bits in the binary form of i. Compute S = f(1) + f(2) + … + f(2^20).",
          limits: "1 second, and no brute force needed",
          submit: "Open the terminal and type: submit <S>",
        }),
      );
    } catch {
      /* storage blocked: this one stays hidden */
    }
  }, []);

  const count = solved.length;
  const total = MYSTERIES.length;

  return (
    <>
      {count > 0 && (
        <button
          type="button"
          onClick={() => count === total && setCertificate(true)}
          title={
            count === total
              ? "All found — open your certificate"
              : "Mysteries found · type `mysteries` in the terminal"
          }
          className="fixed left-4 top-20 z-30 hidden items-center gap-1.5 rounded-md border border-amber-400/50 bg-background/80 px-2.5 py-1 font-mono text-xs text-amber-300 backdrop-blur-md sm:flex"
        >
          <Search className="h-3.5 w-3.5" />
          {count}/{total}
        </button>
      )}

      {toast && (
        <div className="fixed left-1/2 top-20 z-[110] -translate-x-1/2 rounded-full border border-amber-400/60 bg-background/90 px-4 py-2 font-mono text-xs text-amber-300 shadow-lg backdrop-blur-md">
          🔍 {toast}
          {count === 1 && (
            <span className="ml-2 text-muted-foreground">· type `mysteries` in the terminal</span>
          )}
        </div>
      )}

      {certificate && <Certificate username={username} onClose={() => setCertificate(false)} />}
    </>
  );
}

function Certificate({ username, onClose }: { username: string; onClose: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const date = new Date().toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  useEffect(() => {
    const c = canvasRef.current;
    const g = c?.getContext("2d");
    if (!c || !g) return;
    const W = 1200;
    const H = 800;
    c.width = W;
    c.height = H;
    const bg = g.createLinearGradient(0, 0, W, H);
    bg.addColorStop(0, "#0b1224");
    bg.addColorStop(1, "#1e1440");
    g.fillStyle = bg;
    g.fillRect(0, 0, W, H);
    const edge = g.createLinearGradient(0, 0, W, 0);
    edge.addColorStop(0, "#22d3ee");
    edge.addColorStop(1, "#a855f7");
    g.strokeStyle = edge;
    g.lineWidth = 6;
    g.strokeRect(36, 36, W - 72, H - 72);
    g.textAlign = "center";
    g.fillStyle = "#94a3b8";
    g.font = "600 22px ui-monospace, monospace";
    g.fillText("AHMED.DEV · CERTIFICATE OF CURIOSITY", W / 2, 140);
    g.fillStyle = "#fff";
    g.font = "800 64px system-ui, sans-serif";
    g.fillText("You found everything.", W / 2, 260);
    g.fillStyle = edge;
    g.font = "800 72px system-ui, sans-serif";
    g.fillText(username, W / 2, 380);
    g.fillStyle = "#cbd5e1";
    g.font = "400 26px system-ui, sans-serif";
    g.fillText(`solved all ${MYSTERIES.length} hidden mysteries on ahmed.dev`, W / 2, 450);
    g.font = "600 22px ui-monospace, monospace";
    g.fillStyle = "#fbbf24";
    const titles = MYSTERIES.map((m) => m.title);
    const half = Math.ceil(titles.length / 2);
    g.fillText(titles.slice(0, half).join(" · "), W / 2, 520);
    g.fillText(titles.slice(half).join(" · "), W / 2, 556);
    g.fillStyle = "#94a3b8";
    g.font = "400 22px ui-monospace, monospace";
    g.fillText(date, W / 2, 640);
    g.fillText("Verdict: ACCEPTED", W / 2, 680);
  }, [username, date]);

  const download = () => {
    const a = document.createElement("a");
    a.href = canvasRef.current!.toDataURL("image/png");
    a.download = "ahmed-dev-certificate.png";
    a.click();
  };

  return (
    <div
      className="fixed inset-0 z-[115] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl rounded-2xl border border-border bg-background p-4"
        onClick={(e) => e.stopPropagation()}
      >
        <canvas ref={canvasRef} className="w-full rounded-lg" />
        <div className="mt-3 flex flex-wrap items-center justify-between gap-2 font-mono text-xs">
          <span className="text-muted-foreground">
            You clearly pay attention — let's talk: there's a line for you in Contact.
          </span>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={download}
              className="inline-flex items-center gap-1.5 rounded-md bg-primary px-3 py-1.5 font-semibold text-primary-foreground"
            >
              <Download className="h-3.5 w-3.5" /> Download
            </button>
            <button
              type="button"
              onClick={onClose}
              className="inline-flex items-center gap-1.5 rounded-md border border-border px-3 py-1.5"
            >
              <X className="h-3.5 w-3.5" /> Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
