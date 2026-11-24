import {
  DARK,
  FxCanvas,
  NEON,
  Word,
  clamp,
  clock,
  easeIn,
  easeInOut,
  easeOut,
  lerp,
  reach,
  starfield,
  type Fx,
} from "./shared";

/** Hyperspace: the stars stretch into streaks, a white flash, and you're through. */
const HS = { swap: 1500, end: 2300 };
export const hyperspace: Fx = {
  id: "hyperspace",
  ...HS,
  Render: ({ x, y, out }) => (
    <>
      <FxCanvas
        make={(ctx, w, h) => {
          const stars = starfield(w, h, 900);
          const dt = clock();
          return (t) => {
            const d = dt(t);
            const k = clamp(t / HS.swap);
            const cover = t < HS.swap ? easeOut(clamp(t / 550)) : 1 - clamp((t - HS.swap) / 650);
            ctx.clearRect(0, 0, w, h);
            ctx.fillStyle = DARK;
            ctx.globalAlpha = cover;
            ctx.fillRect(0, 0, w, h);
            // The vanishing point drifts from the button to the centre.
            const e = easeInOut(clamp(t / 700));
            stars(ctx, d, 0.3 + k * k * 16, lerp(x, w / 2, e), lerp(y, h / 2, e));
            ctx.globalAlpha = 1;
            const f =
              t < HS.swap - 260
                ? 0
                : t < HS.swap
                  ? (t - HS.swap + 260) / 260
                  : 1 - (t - HS.swap) / 450;
            if (f > 0) {
              const g = ctx.createRadialGradient(w / 2, h / 2, 0, w / 2, h / 2, reach(w, h));
              g.addColorStop(0, `rgba(255,255,255,${f})`);
              g.addColorStop(0.5, `rgba(200,160,255,${f * 0.6})`);
              g.addColorStop(1, "rgba(0,0,0,0)");
              ctx.fillStyle = g;
              ctx.fillRect(0, 0, w, h);
            }
          };
        }}
      />
      <Word delay={450} out={out} />
    </>
  ),
};

/** Pixels: neon blocks blink on in a wave from the button, then blink off from the centre. */
const PX = { swap: 1300, end: 2400 };
export const pixels: Fx = {
  id: "pixels",
  ...PX,
  Render: ({ x, y, out }) => (
    <>
      <FxCanvas
        make={(ctx, w, h) => {
          const size = 28;
          const cols = Math.ceil(w / size);
          const rows = Math.ceil(h / size);
          const far = Math.hypot(w, h);
          const blocks: {
            c: number;
            r: number;
            on: number;
            off: number;
            neon: string;
            shade: string;
          }[] = [];
          for (let r = 0; r < rows; r++)
            for (let c = 0; c < cols; c++) {
              const cx = c * size + size / 2;
              const cy = r * size + size / 2;
              blocks.push({
                c,
                r,
                on: (Math.hypot(cx - x, cy - y) / far) * (PX.swap - 500) + Math.random() * 250,
                off:
                  PX.swap +
                  (Math.hypot(cx - w / 2, cy - h / 2) / (far / 2)) * 550 +
                  Math.random() * 250,
                neon: NEON[(c * 7 + r * 13) % 3],
                shade: Math.random() < 0.15 ? "#120728" : DARK,
              });
            }
          const flash = 170;
          return (t) => {
            ctx.clearRect(0, 0, w, h);
            for (const b of blocks) {
              if (t < b.on || t > b.off) continue;
              const lit = t - b.on < flash || b.off - t < flash;
              ctx.fillStyle = lit ? b.neon : b.shade;
              ctx.fillRect(b.c * size, b.r * size, size + 0.5, size + 0.5);
            }
          };
        }}
      />
      <Word delay={700} out={out} />
    </>
  ),
};

/** Code rain: falling glyph columns paint the screen dark, a second wave washes it away. */
const MX = { swap: 1500, end: 2600 };
export const codeRain: Fx = {
  id: "code-rain",
  ...MX,
  Render: ({ out }) => (
    <>
      <FxCanvas
        make={(ctx, w, h) => {
          const fs = 16;
          const cols = Math.ceil(w / fs);
          const rows = Math.ceil(h / fs) + 1;
          const glyphs = "アイウエオカキクケコサシスセソ0123456789<>{}=+*#$";
          const pick = () => glyphs[Math.floor(Math.random() * glyphs.length)];
          const grid = Array.from({ length: cols * rows }, pick);
          const col = Array.from({ length: cols }, () => {
            const d1 = Math.random() * 450;
            const d2 = MX.swap + Math.random() * 300;
            return {
              d1,
              v1: (h + 300) / (MX.swap - 80 - d1),
              d2,
              v2: (h + 300) / (MX.end - 150 - d2),
            };
          });
          ctx.font = `${fs}px monospace`;
          ctx.textBaseline = "top";
          return (t) => {
            ctx.clearRect(0, 0, w, h);
            for (let i = 0; i < 40; i++) grid[Math.floor(Math.random() * grid.length)] = pick();
            for (let c = 0; c < cols; c++) {
              const k = col[c];
              const head = (t - k.d1) * k.v1;
              const tailHead = t > k.d2 ? (t - k.d2) * k.v2 : -1;
              if (head <= 0) continue;
              const top = Math.max(0, tailHead);
              const bottom = Math.min(h, head);
              if (bottom > top) {
                ctx.fillStyle = DARK;
                ctx.fillRect(c * fs, top, fs + 0.5, bottom - top);
              }
              const draw = (hy: number, n: number, hue: number) => {
                const hr = Math.floor(hy / fs);
                for (let j = 0; j < n; j++) {
                  const r = hr - j;
                  if (r < 0 || r >= rows) continue;
                  const py = r * fs;
                  if (py < top - fs || py > bottom) continue;
                  ctx.fillStyle = j === 0 ? "#fff" : `hsla(${hue}, 95%, 65%, ${1 - j / n})`;
                  ctx.fillText(grid[r * cols + c], c * fs, py);
                }
              };
              if (head < h + 300) draw(head, 22, 190);
              // The settled screen keeps a faint shimmer of glyphs.
              if (bottom - top > fs * 2 && Math.random() < 0.5) {
                const r = Math.floor((top + Math.random() * (bottom - top)) / fs);
                ctx.fillStyle = "rgba(34, 211, 238, 0.35)";
                ctx.fillText(grid[r * cols + c], c * fs, r * fs);
              }
              if (tailHead > 0 && tailHead < h) {
                ctx.fillStyle = "#e9d5ff";
                ctx.fillText(grid[(Math.floor(tailHead / fs) % rows) * cols + c], c * fs, tailHead);
              }
            }
          };
        }}
      />
      <Word delay={800} out={out} />
    </>
  ),
};

/** Black hole: an accretion disk spirals in, the horizon swallows the page, then it detonates. */
const BH = { swap: 1600, end: 2500 };
export const blackHole: Fx = {
  id: "black-hole",
  ...BH,
  Render: ({ x, y, out }) => (
    <>
      <FxCanvas
        make={(ctx, w, h) => {
          const R = reach(w, h) * 1.3;
          const dt = clock();
          const parts = Array.from({ length: 700 }, () => ({
            a: Math.random() * Math.PI * 2,
            r: 60 + Math.random() * Math.max(w, h) * 0.6,
          }));
          let sparks: { x: number; y: number; vx: number; vy: number; hue: number }[] = [];
          return (t) => {
            const d = dt(t);
            ctx.clearRect(0, 0, w, h);
            const m = easeInOut(clamp(t / 900));
            const cx = lerp(x, w / 2, m);
            const cy = lerp(y, h / 2, m);
            if (t < BH.swap) {
              const hr = 8 + R * easeIn(clamp(t / BH.swap));
              ctx.fillStyle = `rgba(5,1,13,${0.55 * clamp(t / BH.swap)})`;
              ctx.fillRect(0, 0, w, h);
              ctx.globalCompositeOperation = "lighter";
              for (const p of parts) {
                p.r -= d * (0.05 + 30 / p.r);
                p.a += d * (0.0015 + 1.8 / (p.r + 40));
                if (p.r < hr) {
                  p.r = hr + 40 + Math.random() * Math.max(w, h) * 0.5;
                  p.a = Math.random() * Math.PI * 2;
                }
                const near = clamp(1 - (p.r - hr) / 500);
                ctx.strokeStyle = `hsla(${lerp(280, 25, near)}, 100%, ${50 + near * 25}%, ${0.25 + near * 0.6})`;
                ctx.lineWidth = 1 + near * 2;
                ctx.beginPath();
                // Squash the orbit vertically: a disk seen at an angle.
                ctx.ellipse(cx, cy, p.r, p.r * 0.45, -0.3, p.a, p.a + 0.15 + near * 0.25);
                ctx.stroke();
              }
              ctx.globalCompositeOperation = "source-over";
              const g = ctx.createRadialGradient(cx, cy, hr * 0.9, cx, cy, hr * 1.5 + 30);
              g.addColorStop(0, "rgba(255,190,120,0.95)");
              g.addColorStop(0.25, "rgba(219,39,119,0.6)");
              g.addColorStop(1, "rgba(168,85,247,0)");
              ctx.fillStyle = g;
              ctx.beginPath();
              ctx.arc(cx, cy, hr * 1.5 + 30, 0, Math.PI * 2);
              ctx.fill();
              ctx.fillStyle = "#000";
              ctx.beginPath();
              ctx.arc(cx, cy, hr, 0, Math.PI * 2);
              ctx.fill();
              return;
            }
            if (sparks.length === 0)
              sparks = Array.from({ length: 400 }, () => {
                const a = Math.random() * Math.PI * 2;
                const v = 0.6 + Math.random() * 2.2;
                return {
                  x: cx,
                  y: cy,
                  vx: Math.cos(a) * v,
                  vy: Math.sin(a) * v,
                  hue: [25, 320, 270][Math.floor(Math.random() * 3)],
                };
              });
            const e = clamp((t - BH.swap) / (BH.end - BH.swap - 150));
            const hole = easeOut(e) * R;
            ctx.fillStyle = "#000";
            ctx.fillRect(0, 0, w, h);
            ctx.globalCompositeOperation = "destination-out";
            ctx.beginPath();
            ctx.arc(cx, cy, hole, 0, Math.PI * 2);
            ctx.fill();
            ctx.globalCompositeOperation = "lighter";
            ctx.strokeStyle = `rgba(255,220,180,${1 - e})`;
            ctx.lineWidth = 40 * (1 - e) + 2;
            ctx.beginPath();
            ctx.arc(cx, cy, hole, 0, Math.PI * 2);
            ctx.stroke();
            for (const s of sparks) {
              s.x += s.vx * d;
              s.y += s.vy * d;
              ctx.fillStyle = `hsla(${s.hue},100%,70%,${1 - e})`;
              ctx.fillRect(s.x, s.y, 3, 3);
            }
            ctx.globalCompositeOperation = "source-over";
          };
        }}
      />
      <Word delay={900} out={out} />
    </>
  ),
};

/** Particles: a burst from the button flocks into the words, then blows apart. */
const PT = { swap: 1800, end: 2800 };
export const particleText: Fx = {
  id: "particle-text",
  ...PT,
  Render: ({ x, y }) => (
    <FxCanvas
      make={(ctx, w, h) => {
        const off = document.createElement("canvas");
        off.width = w;
        off.height = h;
        const o = off.getContext("2d");
        const pts: { tx: number; ty: number }[] = [];
        if (o) {
          const size = Math.min(w * 0.11, 130);
          o.font = `900 ${size}px ui-monospace, monospace`;
          o.textAlign = "center";
          o.textBaseline = "middle";
          o.fillStyle = "#fff";
          o.fillText("CHAOS MODE", w / 2, h / 2);
          const step = Math.max(3, Math.round(size / 26));
          const data = o.getImageData(0, 0, w, h).data;
          for (let py = 0; py < h; py += step)
            for (let px = 0; px < w; px += step)
              if (data[(py * w + px) * 4 + 3] > 128) pts.push({ tx: px, ty: py });
        }
        const dt = clock();
        const ps = pts.map((p) => {
          const a = Math.random() * Math.PI * 2;
          const v = 0.5 + Math.random() * 1.6;
          return {
            ...p,
            x,
            y,
            vx: Math.cos(a) * v,
            vy: Math.sin(a) * v,
            hue: lerp(185, 325, p.tx / w),
          };
        });
        let blown = false;
        return (t) => {
          const d = dt(t);
          ctx.clearRect(0, 0, w, h);
          const cover =
            t < PT.swap ? easeOut(clamp(t / 650)) : 1 - easeIn(clamp((t - PT.swap) / 750));
          ctx.fillStyle = DARK;
          ctx.globalAlpha = cover;
          ctx.fillRect(0, 0, w, h);
          ctx.globalAlpha = t < PT.swap ? 1 : 1 - clamp((t - PT.swap) / 850);
          if (t >= PT.swap && !blown) {
            blown = true;
            for (const p of ps) {
              const a = Math.atan2(p.y - h / 2, p.x - w / 2) + (Math.random() - 0.5) * 0.8;
              const v = 0.8 + Math.random() * 2.5;
              p.vx = Math.cos(a) * v;
              p.vy = Math.sin(a) * v;
            }
          }
          ctx.globalCompositeOperation = "lighter";
          const pull = clamp((t - 450) / 700);
          for (const p of ps) {
            if (t < PT.swap) {
              p.vx *= 0.94;
              p.vy *= 0.94;
              p.x += p.vx * d;
              p.y += p.vy * d;
              const k = clamp(pull * pull * d * 0.012);
              p.x += (p.tx - p.x) * k;
              p.y += (p.ty - p.y) * k;
            } else {
              p.x += p.vx * d;
              p.y += p.vy * d;
            }
            const jitter = t > 1300 && t < PT.swap ? (Math.random() - 0.5) * 1.5 : 0;
            // A soft halo, then a bright core.
            ctx.fillStyle = `hsla(${p.hue}, 95%, 60%, 0.35)`;
            ctx.fillRect(p.x + jitter - 2.5, p.y - 2.5, 7, 7);
            ctx.fillStyle = `hsl(${p.hue}, 100%, 78%)`;
            ctx.fillRect(p.x + jitter, p.y, 3, 3);
          }
          ctx.globalCompositeOperation = "source-over";
          ctx.globalAlpha = 1;
        };
      }}
    />
  ),
};

/** Retro horizon: a neon sun rises over a racing grid, then the camera dives in. */
const SW = { swap: 1600, end: 2500 };
export const horizon: Fx = {
  id: "horizon",
  ...SW,
  Render: ({ x, y }) => (
    <FxCanvas
      make={(ctx, w, h) => {
        const R = Math.hypot(w, h) + 40;
        const hz = h * 0.58;
        const sunR = Math.min(w, h) * 0.24;
        const dt = clock();
        let travel = 0;
        const stars = Array.from({ length: 120 }, () => ({
          x: Math.random() * w,
          y: Math.random() * hz * 0.9,
          s: Math.random() * 1.6 + 0.3,
        }));
        return (t) => {
          const d = dt(t);
          ctx.clearRect(0, 0, w, h);
          const k = clamp(t / SW.swap);
          travel += d * (0.0015 + k * k * 0.02);
          const e = clamp((t - SW.swap) / (SW.end - SW.swap - 100));
          ctx.save();
          if (t < SW.swap) {
            ctx.beginPath();
            ctx.arc(x, y, easeInOut(clamp(t / 700)) * R, 0, Math.PI * 2);
            ctx.clip();
          } else {
            // Dive: zoom into the horizon and fade.
            const s = 1 + easeIn(e) * 5;
            ctx.translate(w / 2, hz);
            ctx.scale(s, s);
            ctx.translate(-w / 2, -hz);
            ctx.globalAlpha = 1 - easeIn(e);
          }
          const sky = ctx.createLinearGradient(0, 0, 0, hz);
          sky.addColorStop(0, DARK);
          sky.addColorStop(1, "#3b0a52");
          ctx.fillStyle = sky;
          ctx.fillRect(0, 0, w, hz);
          ctx.fillStyle = "#fff";
          for (const s of stars) ctx.fillRect(s.x, s.y, s.s, s.s);
          // The sun rises, striped like a blind.
          const sy = hz - sunR * 0.35 + (1 - easeOut(clamp(t / 1200))) * sunR * 1.2;
          const sg = ctx.createLinearGradient(0, sy - sunR, 0, sy + sunR);
          sg.addColorStop(0, "#fde047");
          sg.addColorStop(0.55, "#fb7185");
          sg.addColorStop(1, "#c026d3");
          ctx.save();
          ctx.beginPath();
          ctx.rect(0, 0, w, hz);
          ctx.clip();
          ctx.shadowColor = "#f472b6";
          ctx.shadowBlur = 60;
          ctx.fillStyle = sg;
          ctx.beginPath();
          ctx.arc(w / 2, sy, sunR, 0, Math.PI * 2);
          ctx.fill();
          ctx.shadowBlur = 0;
          ctx.fillStyle = "#2a0840";
          for (let i = 0; i < 7; i++) {
            const by = sy + sunR * (0.05 + i * 0.14);
            ctx.fillRect(w / 2 - sunR, by, sunR * 2, 2 + i * 1.6);
          }
          ctx.restore();
          // The floor: lines to the vanishing point, and rungs racing toward us.
          ctx.fillStyle = DARK;
          ctx.fillRect(0, hz, w, h - hz);
          ctx.strokeStyle = "#e879f9";
          ctx.lineWidth = 1.5;
          ctx.shadowColor = "#e879f9";
          ctx.shadowBlur = 8;
          ctx.beginPath();
          for (let i = -24; i <= 24; i++) {
            ctx.moveTo(w / 2 + i * 6, hz);
            ctx.lineTo(w / 2 + i * w * 0.09, h);
          }
          for (let j = 0; j < 22; j++) {
            const z = ((j - (travel % 1)) / 22) * 20 + 0.6;
            const ly = hz + (h - hz) * (0.6 / z);
            if (ly > h) continue;
            ctx.moveTo(0, ly);
            ctx.lineTo(w, ly);
          }
          ctx.stroke();
          ctx.shadowBlur = 0;
          ctx.fillStyle = "#f0abfc";
          ctx.fillRect(0, hz - 1, w, 2);
          ctx.restore();
        };
      }}
    />
  ),
};

type Pt = [number, number];

/** Jagged path from a to b by midpoint displacement, with the odd fork. */
function bolt(a: Pt, b: Pt, rough: number, depth: number, out: Pt[][]): Pt[] {
  let pts: Pt[] = [a, b];
  for (let d = 0; d < depth; d++) {
    const next: Pt[] = [pts[0]];
    for (let i = 1; i < pts.length; i++) {
      const [x1, y1] = pts[i - 1];
      const [x2, y2] = pts[i];
      const len = Math.hypot(x2 - x1, y2 - y1);
      const off = (Math.random() - 0.5) * len * rough;
      const nx = -(y2 - y1) / (len || 1);
      const ny = (x2 - x1) / (len || 1);
      const m: Pt = [(x1 + x2) / 2 + nx * off, (y1 + y2) / 2 + ny * off];
      next.push(m, pts[i]);
      if (d < 3 && Math.random() < 0.18) {
        const ang = Math.atan2(y2 - y1, x2 - x1) + (Math.random() - 0.5) * 1.6;
        out.push(
          bolt(
            m,
            [m[0] + Math.cos(ang) * len * 1.5, m[1] + Math.sin(ang) * len * 1.5],
            rough,
            depth - d - 1,
            out,
          ),
        );
      }
    }
    pts = next;
  }
  return pts;
}

/** Storm: lightning strikes out from the button, darker with every hit, then one huge bolt. */
const LT = { swap: 1500, end: 2300 };
export const lightning: Fx = {
  id: "lightning",
  ...LT,
  Render: ({ x, y, out }) => (
    <>
      <FxCanvas
        make={(ctx, w, h) => {
          const strikes: { paths: Pt[][]; born: number; big: boolean }[] = [];
          let next = 0;
          let finale = false;
          const edge = (): Pt => {
            const s = Math.floor(Math.random() * 4);
            const r = Math.random();
            return s === 0
              ? [r * w, -20]
              : s === 1
                ? [w + 20, r * h]
                : s === 2
                  ? [r * w, h + 20]
                  : [-20, r * h];
          };
          const strike = (a: Pt, b: Pt, t: number, big: boolean) => {
            const paths: Pt[][] = [];
            paths.unshift(bolt(a, b, 0.55, 8, paths));
            strikes.push({ paths, born: t, big });
          };
          return (t) => {
            if (t < LT.swap - 250 && t >= next) {
              strike([x, y], edge(), t, false);
              if (Math.random() < 0.5) strike([x, y], edge(), t, false);
              next = t + 90 + Math.random() * 90;
            }
            if (!finale && t >= LT.swap - 200) {
              finale = true;
              strike(
                [w * (0.3 + Math.random() * 0.4), -20],
                [w * (0.3 + Math.random() * 0.4), h + 20],
                t,
                true,
              );
            }
            ctx.clearRect(0, 0, w, h);
            const cover =
              t < LT.swap ? Math.pow(clamp(t / LT.swap), 1.4) : 1 - clamp((t - LT.swap) / 650);
            ctx.fillStyle = DARK;
            ctx.globalAlpha = cover;
            ctx.fillRect(0, 0, w, h);
            ctx.globalAlpha = 1;
            ctx.lineJoin = "round";
            for (const s of strikes) {
              const age = t - s.born;
              const life = s.big ? 700 : 320;
              if (age > life) continue;
              const a = 1 - age / life;
              if (age < 70) {
                ctx.fillStyle = `rgba(220,200,255,${(s.big ? 0.8 : 0.18) * (1 - age / 70)})`;
                ctx.fillRect(0, 0, w, h);
              }
              for (const [pi, p] of s.paths.entries()) {
                const main = pi === 0;
                for (const [lw, col] of [
                  [s.big ? 22 : 9, `rgba(168,85,247,${a * 0.35})`],
                  [s.big ? 8 : 3.5, `rgba(34,211,238,${a * 0.7})`],
                  [s.big ? 3 : 1.4, `rgba(255,255,255,${a})`],
                ] as const) {
                  ctx.lineWidth = main ? lw : lw * 0.5;
                  ctx.strokeStyle = col;
                  ctx.beginPath();
                  ctx.moveTo(p[0][0], p[0][1]);
                  for (const q of p) ctx.lineTo(q[0], q[1]);
                  ctx.stroke();
                }
              }
            }
          };
        }}
      />
      <Word delay={600} out={out} />
    </>
  ),
};

/** Vortex: a spinning spiral galaxy swallows the page from the button, then irises open. */
const VX = { swap: 1400, end: 2300 };
export const vortex: Fx = {
  id: "vortex",
  ...VX,
  Render: ({ x, y, out }) => (
    <>
      <FxCanvas
        make={(ctx, w, h) => {
          const R = Math.hypot(w, h) + 40;
          return (t) => {
            ctx.clearRect(0, 0, w, h);
            const m = easeInOut(clamp(t / 900));
            const cx = lerp(x, w / 2, m);
            const cy = lerp(y, h / 2, m);
            const disk = t < VX.swap ? easeIn(clamp(t / VX.swap)) * R + 6 : R;
            ctx.save();
            ctx.beginPath();
            ctx.arc(cx, cy, disk, 0, Math.PI * 2);
            ctx.clip();
            const bg = ctx.createRadialGradient(cx, cy, 0, cx, cy, Math.max(disk, 1));
            bg.addColorStop(0, "#2e0a4a");
            bg.addColorStop(0.6, DARK);
            bg.addColorStop(1, DARK);
            ctx.fillStyle = bg;
            ctx.fillRect(0, 0, w, h);
            ctx.globalCompositeOperation = "lighter";
            const spin = t * 0.0042;
            const arms = 6;
            for (let a = 0; a < arms; a++) {
              for (let s = 1; s < 90; s++) {
                const r = Math.pow(s / 90, 1.6) * R * 0.75;
                const ang = (a / arms) * Math.PI * 2 + Math.log(r + 1) * 1.9 - spin;
                const px = cx + Math.cos(ang) * r;
                const py = cy + Math.sin(ang) * r;
                ctx.fillStyle = `hsla(${(190 + s * 1.6 + a * 25) % 360}, 95%, 62%, ${0.15 + (s / 90) * 0.55})`;
                ctx.beginPath();
                ctx.arc(px, py, 1 + (s / 90) * 9, 0, Math.PI * 2);
                ctx.fill();
              }
            }
            ctx.globalCompositeOperation = "source-over";
            ctx.restore();
            if (t >= VX.swap) {
              const e = clamp((t - VX.swap) / (VX.end - VX.swap - 150));
              const hole = easeIn(e) * R;
              const g = ctx.createRadialGradient(cx, cy, hole * 0.7, cx, cy, hole + 1);
              g.addColorStop(0, "rgba(0,0,0,1)");
              g.addColorStop(1, "rgba(0,0,0,0)");
              ctx.globalCompositeOperation = "destination-out";
              ctx.fillStyle = g;
              ctx.fillRect(0, 0, w, h);
              ctx.globalCompositeOperation = "source-over";
            }
          };
        }}
      />
      <Word delay={650} out={out} />
    </>
  ),
};

/** Paint: wobbly waves of neon then dark flood out from the button, and drain away from the centre. */
const PS = { swap: 1300, end: 2300 };
export const paint: Fx = {
  id: "paint",
  ...PS,
  Render: ({ x, y, out }) => (
    <>
      <FxCanvas
        make={(ctx, w, h) => {
          const R = Math.hypot(w, h) * 1.15 + 40;
          const layers = [NEON[2], NEON[1], NEON[0], DARK];
          const blob = (cx: number, cy: number, r: number, k: number, t: number) => {
            ctx.moveTo(cx + r, cy);
            for (let i = 0; i <= 96; i++) {
              const a = (i / 96) * Math.PI * 2;
              const wob =
                1 +
                0.06 * Math.sin(3 * a + t * 0.003 + k) +
                0.035 * Math.sin(7 * a - t * 0.005 + k * 2) +
                0.02 * Math.sin(13 * a + k * 3);
              ctx.lineTo(cx + Math.cos(a) * r * wob, cy + Math.sin(a) * r * wob);
            }
          };
          return (t) => {
            ctx.clearRect(0, 0, w, h);
            if (t < PS.swap) {
              layers.forEach((col, i) => {
                const st = i * 130;
                const r = easeInOut(clamp((t - st) / (PS.swap - 100 - st))) * R;
                if (r <= 0) return;
                ctx.fillStyle = col;
                ctx.beginPath();
                blob(x, y, r, i, t);
                ctx.fill();
              });
              return;
            }
            // Drain: each layer is the screen minus a growing hole; dark leads, pink trails.
            const e = t - PS.swap;
            const span = PS.end - PS.swap - 150;
            [NEON[2], NEON[1], NEON[0], DARK].forEach((col, i) => {
              const st = (3 - i) * 110;
              const r = easeInOut(clamp((e - st) / (span - 330))) * R;
              ctx.fillStyle = col;
              ctx.beginPath();
              ctx.rect(0, 0, w, h);
              if (r > 0) blob(w / 2, h / 2, r, i + 5, t);
              ctx.fill("evenodd");
            });
          };
        }}
      />
      <Word delay={750} out={out} />
    </>
  ),
};
