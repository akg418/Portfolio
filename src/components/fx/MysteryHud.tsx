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

/** Typing the site owner's name, in order (any case), turns on arcade mode. */
const SECRET_WORD = ["g", "o", "m", "a", "a"];
/** fnv("balloon-ac"): the console key, decoded from the hex in `--x-key`. */
const KEY_HASH = "a48cea5f";
const PROBLEM_KEY = "ahmed.dev:problem";

/**
 * The mystery layer: nothing until the first one is found, then a small
 * `n/N` counter, a toast per discovery, and a certificate when all are done.
 * It also hosts the global listeners some mysteries need (the GOMAA code)
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

  // G-O-M-A-A typed anywhere outside a text field toggles arcade mode.
  const [arcade, setArcade] = useState(false);
  useEffect(() => {
    document.documentElement.classList.toggle("arcade", arcade);
  }, [arcade]);
  useEffect(() => {
    let i = 0;
    const on = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement | null;
      if (t?.closest("input, textarea")) return;
      const k = e.key.toLowerCase();
      i = k === SECRET_WORD[i] ? i + 1 : k === SECRET_WORD[0] ? 1 : 0;
      if (i < SECRET_WORD.length) return;
      i = 0;
      setArcade((a) => !a);
      solveMystery("konami");
    };
    window.addEventListener("keydown", on);
    return () => window.removeEventListener("keydown", on);
  }, []);

  // Developer puzzles: a console API, and a problem left in localStorage.
  useEffect(() => {
    console.log(
      "%c👀 ahmed.dev%c\n[debug] hook still attached at window.__ahmed — someone forgot to remove it before launch. Start with %c__ahmed.hint()",
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
        <div className="group fixed left-4 top-20 z-30 hidden sm:block">
          <button
            type="button"
            onClick={() => count === total && setCertificate(true)}
            aria-describedby="mystery-info"
            className="flex items-center gap-1.5 rounded-md border border-amber-400/50 bg-background/80 px-2.5 py-1 font-mono text-xs text-amber-300 backdrop-blur-md"
          >
            <Search className="h-3.5 w-3.5" />
            {count}/{total}
          </button>
          <MysteryInfo solved={solved} />
        </div>
      )}

      {arcade && (
        <div className="fixed bottom-16 left-1/2 z-[71] flex -translate-x-1/2 items-center gap-2 rounded-full border border-amber-400/60 bg-background/90 px-3 py-1.5 font-mono text-[11px] text-amber-300 shadow-lg">
          🕹 arcade mode · type GOMAA again to exit
          <button
            type="button"
            onClick={() => setArcade(false)}
            className="rounded-full border border-amber-400/50 px-2 py-0.5 hover:bg-amber-400/10"
          >
            exit
          </button>
        </div>
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

/**
 * What the counter means, on hover or focus: what mysteries are, the two
 * kinds, that the terminal keeps secret commands, and the riddles for the
 * ones still locked. Hints only, never answers.
 */
function MysteryInfo({ solved }: { solved: string[] }) {
  const forAll = MYSTERIES.filter((m) => !m.dev);
  const forDevs = MYSTERIES.filter((m) => m.dev);
  const row = (m: (typeof MYSTERIES)[number]) => {
    const done = solved.includes(m.id);
    return (
      <li key={m.id} className="flex gap-2">
        <span className={done ? "text-emerald-400" : "text-muted-foreground"}>
          {done ? "✔" : "?"}
        </span>
        <span className={done ? "text-foreground" : "text-muted-foreground"}>
          {done ? m.title : m.riddle}
        </span>
      </li>
    );
  };
  return (
    <div
      id="mystery-info"
      role="tooltip"
      className="invisible absolute left-0 top-full mt-2 max-h-[calc(100vh-8rem)] w-[340px] overflow-y-auto translate-y-1 rounded-xl border border-amber-400/40 bg-background/95 p-4 font-mono text-[11px] leading-relaxed opacity-0 shadow-2xl backdrop-blur-md transition-all duration-200 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100"
    >
      <div className="text-xs font-bold text-amber-300">
        Mysteries · {solved.length}/{MYSTERIES.length} found
      </div>
      <p className="mt-1.5 text-muted-foreground">
        Hidden challenges scattered around this site. Nothing announces them — you just found
        {solved.length > 1 ? " some" : " one"}. Each riddle below hints at one still locked.
      </p>

      <div className="mt-3 text-[10px] uppercase tracking-widest text-foreground">
        For everyone · {forAll.length}
      </div>
      <p className="text-muted-foreground">Things to click, drive, type, poke or wait for.</p>
      <ul className="mt-1.5 space-y-1">{forAll.map(row)}</ul>

      <div className="mt-3 text-[10px] uppercase tracking-widest text-foreground">
        For developers · {forDevs.length}
      </div>
      <p className="text-muted-foreground">
        Need the browser DevTools: the console, styles, storage.
      </p>
      <ul className="mt-1.5 space-y-1">{forDevs.map(row)}</ul>

      <div className="mt-3 border-t border-border pt-2.5 text-muted-foreground">
        <span className="text-foreground">Secret commands:</span> the terminal knows commands that{" "}
        <span className="text-primary">help</span> doesn't list. One of them is{" "}
        <span className="text-primary">mysteries</span>, which shows this list too.
      </div>
      <div className="mt-2 text-muted-foreground">
        Progress is saved in this browser. Find all {MYSTERIES.length} for a certificate.
      </div>
    </div>
  );
}
