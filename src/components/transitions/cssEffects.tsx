import { useState } from "react";
import { FxCanvas, Word, clamp, clock, starfield, type Fx } from "./shared";

type Vars = React.CSSProperties & Record<`--${string}`, string>;

/** Tiles: the page splits into tiles that flip in 3D, hyperspace behind, then they burst at the camera. */
const TL = { swap: 1700, end: 3100 };
const TILE = 90;
export const tiles: Fx = {
  id: "tiles",
  ...TL,
  Render: function Tiles({ x, y, out }) {
    const [grid] = useState(() => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      const cols = Math.ceil(w / TILE);
      const rows = Math.ceil(h / TILE);
      const far = Math.hypot(w, h);
      const list = [];
      for (let row = 0; row < rows; row++)
        for (let col = 0; col < cols; col++) {
          const cx = (col + 0.5) * (w / cols);
          const cy = (row + 0.5) * (h / rows);
          const dx = cx - w / 2;
          const dy = cy - h / 2;
          list.push({
            key: row * cols + col,
            col,
            row,
            vars: {
              "--flip": `${Math.round((Math.hypot(cx - x, cy - y) / far) * 650 + Math.random() * 60)}ms`,
              "--burst": `${Math.round((Math.hypot(dx, dy) / (far / 2)) * 280 + Math.random() * 80)}ms`,
              "--rx": `${Math.round((Math.random() - 0.5) * 540)}deg`,
              "--ry": `${Math.round((Math.random() - 0.5) * 540)}deg`,
              "--rz": `${Math.round((Math.random() - 0.5) * 180)}deg`,
              "--z": `${Math.round(600 + Math.random() * 900)}px`,
              "--tx": `${Math.round(dx * (1.2 + Math.random()))}px`,
              "--ty": `${Math.round(dy * (1.2 + Math.random()))}px`,
            } as Vars,
          });
        }
      return { list, cols, rows };
    });
    return (
      <div className={`fx-tiles absolute inset-0 ${out ? "is-out" : ""}`}>
        <div
          className="fx-tiles-stage absolute inset-0 grid"
          style={{
            gridTemplateColumns: `repeat(${grid.cols}, 1fr)`,
            gridTemplateRows: `repeat(${grid.rows}, 1fr)`,
          }}
        >
          {grid.list.map((t) => (
            <div key={t.key} className="fx-tile" style={t.vars}>
              <div className="fx-face fx-front" />
              <div
                className="fx-face fx-back"
                style={{
                  backgroundSize: `${grid.cols * 100}% ${grid.rows * 100}%`,
                  backgroundPosition: `${(t.col / Math.max(1, grid.cols - 1)) * 100}% ${
                    (t.row / Math.max(1, grid.rows - 1)) * 100
                  }%`,
                }}
              />
            </div>
          ))}
        </div>
        <FxCanvas
          className="fx-tiles-warp"
          make={(ctx, w, h) => {
            const stars = starfield(w, h, 700);
            const dt = clock();
            return (t) => {
              const d = dt(t);
              ctx.clearRect(0, 0, w, h);
              const k = clamp((t - 350) / (TL.swap - 350));
              stars(ctx, d, 0.4 + k * k * 14, w / 2, h / 2);
            };
          }}
        />
        <div className="fx-flash absolute inset-0" />
        <Word delay={750} out={out} />
      </div>
    );
  },
};

/** Glitch: the screen tears in from both sides in jagged bands and jitters, then rips away. */
const GL = { swap: 1200, end: 2000 };
export const glitch: Fx = {
  id: "glitch",
  ...GL,
  Render: function Glitch({ out }) {
    const [bars] = useState(() =>
      Array.from({ length: 18 }, (_, i) => {
        const side = i % 2 ? 1 : -1;
        return {
          i,
          tint: i % 5 === 0 ? "fx-bar-neon" : "",
          vars: {
            "--from": `${side * 110}%`,
            "--to": `${-side * 110}%`,
            "--d": `${Math.round(Math.random() * 550)}ms`,
            "--d2": `${Math.round(Math.random() * 350)}ms`,
            "--j": `${Math.round((Math.random() - 0.5) * 40)}px`,
            top: `${(i * 100) / 18}%`,
            height: `calc(${100 / 18}% + 1px)`,
          } as Vars,
        };
      }),
    );
    return (
      <div className={`fx-glitch absolute inset-0 overflow-hidden ${out ? "is-out" : ""}`}>
        {bars.map((b) => (
          <div key={b.i} className={`fx-bar absolute inset-x-0 ${b.tint}`} style={b.vars} />
        ))}
        <div className="fx-glitch-noise absolute inset-0" />
        <div className="fx-glitch-scan absolute inset-x-0 h-2" />
        <Word delay={500} out={out} />
      </div>
    );
  },
};

/** Blinds: tall slats swing shut in 3D in a wave from the button, then swing open. */
const BL = { swap: 1150, end: 2000 };
export const blinds: Fx = {
  id: "blinds",
  ...BL,
  Render: function Blinds({ x, out }) {
    const [slats] = useState(() => {
      const w = window.innerWidth;
      const n = Math.max(8, Math.round(w / 110));
      const at = Math.floor((x / w) * n);
      const step = Math.min(55, 480 / n);
      return Array.from({ length: n }, (_, i) => ({
        i,
        n,
        vars: {
          "--d": `${Math.round(Math.abs(i - at) * step)}ms`,
          "--d2": `${Math.round(i * (300 / n))}ms`,
          left: `${(i * 100) / n}%`,
          width: `calc(${100 / n}% + 1px)`,
          backgroundSize: `${n * 100}% 100%`,
          backgroundPosition: `${(i / Math.max(1, n - 1)) * 100}% 0`,
        } as Vars,
      }));
    });
    return (
      <div className={`fx-blinds absolute inset-0 ${out ? "is-out" : ""}`}>
        {slats.map((s) => (
          <div key={s.i} className="fx-slat absolute inset-y-0" style={s.vars} />
        ))}
        <Word delay={600} out={out} />
      </div>
    );
  },
};

/** Laser: a beam cuts the screen, two dark halves slam shut along it, then split apart. */
const SL = { swap: 1200, end: 2100 };
export const laser: Fx = {
  id: "laser",
  ...SL,
  Render: function Laser({ out }) {
    const [angle] = useState(
      () => (Math.atan2(-0.1 * window.innerHeight, window.innerWidth) * 180) / Math.PI,
    );
    return (
      <div className={`fx-laser absolute inset-0 overflow-hidden ${out ? "is-out" : ""}`}>
        <div className="fx-half fx-half-a absolute inset-0" />
        <div className="fx-half fx-half-b absolute inset-0" />
        <div
          className="fx-beam absolute left-[-10%] top-1/2 h-[3px] w-[120%]"
          style={{ transform: `rotate(${angle}deg)` }}
        />
        <div className="fx-impact absolute inset-0" />
        <Word delay={750} out={out} />
      </div>
    );
  },
};

/** CRT: an old tube flicks on from a line, hums with scanlines, then switches off to a dot. */
const CR = { swap: 1250, end: 2100 };
export const crt: Fx = {
  id: "crt",
  ...CR,
  Render: ({ out }) => (
    <div className={`fx-crt absolute inset-0 ${out ? "is-out" : ""}`}>
      <div className="fx-crt-screen absolute inset-0 overflow-hidden">
        <div className="fx-crt-glow absolute inset-0" />
        <div className="fx-crt-lines absolute inset-0" />
        <div className="fx-crt-roll absolute inset-x-0 h-1/4" />
        <Word delay={550} out={false} />
        <div className="fx-crt-white absolute inset-0" />
      </div>
    </div>
  ),
};

/** Tunnel: neon frames rush past in 3D, twisting, then you fly out the far end. */
const TN = { swap: 1400, end: 2100 };
export const tunnel: Fx = {
  id: "tunnel",
  ...TN,
  Render: function Tunnel({ x, y, out }) {
    const [rings] = useState(() =>
      Array.from({ length: 16 }, (_, i) => ({
        i,
        vars: {
          "--rot": `${i * 11}deg`,
          animationDelay: `${-i * 90}ms`,
          borderColor: ["#22d3ee", "#a855f7", "#db2777"][i % 3],
        } as Vars,
      })),
    );
    return (
      <div
        className={`fx-tunnel absolute inset-0 overflow-hidden ${out ? "is-out" : ""}`}
        style={{ "--ox": `${x}px`, "--oy": `${y}px` } as Vars}
      >
        <div className="fx-tunnel-space absolute inset-0">
          {rings.map((r) => (
            <span key={r.i} className="fx-ring" style={r.vars} />
          ))}
        </div>
        <Word delay={600} out={out} />
      </div>
    );
  },
};
