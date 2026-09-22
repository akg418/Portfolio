/**
 * Hand-drawn vector artwork for the hero portrait rotation.
 *
 * These are inline SVG rather than image files so they can read the site's
 * theme tokens: the same drawing works on the light and dark card background
 * and follows the accent colour if it ever changes. They are original
 * drawings, so there is no third-party artwork to license.
 *
 * Each one is composed inside the circle inscribed in the 320x320 box, since
 * the portrait frame crops the corners.
 */

const PRIMARY = "var(--color-primary)";
const ACCENT = "var(--color-accent)";
const MUTED = "var(--color-muted-foreground)";
const SURFACE = "var(--color-background)";

function Frame({ children }: { children: React.ReactNode }) {
  return (
    <svg
      viewBox="0 0 320 320"
      role="img"
      className="h-full w-full"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="av-sheen" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={PRIMARY} stopOpacity="0.22" />
          <stop offset="100%" stopColor={ACCENT} stopOpacity="0.22" />
        </linearGradient>
      </defs>
      <rect width="320" height="320" fill="url(#av-sheen)" />
      {children}
    </svg>
  );
}

/** A terminal window, echoing the one that runs on this site. */
export function TerminalArt() {
  const line = (y: number, w: number, fill: string, opacity = 1, x = 78) => (
    <rect x={x} y={y} width={w} height={7} rx={3.5} fill={fill} opacity={opacity} />
  );
  return (
    <Frame>
      <rect x={58} y={86} width={204} height={148} rx={14} fill={SURFACE} opacity="0.92" />
      <rect
        x={58}
        y={86}
        width={204}
        height={148}
        rx={14}
        fill="none"
        stroke={PRIMARY}
        strokeOpacity="0.45"
      />
      <path
        d="M58 106a14 14 0 0 1 14-14h176a14 14 0 0 1 14 14v6H58z"
        fill={PRIMARY}
        opacity="0.14"
      />
      <circle cx={74} cy={99} r={4} fill="#ef4444" />
      <circle cx={88} cy={99} r={4} fill="#eab308" />
      <circle cx={102} cy={99} r={4} fill="#22c55e" />

      {/* command line */}
      <text x={78} y={139} fill={PRIMARY} fontFamily="ui-monospace, monospace" fontSize={14}>
        $
      </text>
      {line(132, 84, MUTED, 0.85, 94)}

      {/* output */}
      {line(158, 126, MUTED, 0.45)}
      {line(178, 74, ACCENT, 0.8)}
      {line(198, 104, MUTED, 0.4)}

      {/* next prompt, waiting */}
      <text x={78} y={222} fill={PRIMARY} fontFamily="ui-monospace, monospace" fontSize={14}>
        $
      </text>
      <rect x={94} y={212} width={9} height={12} fill={PRIMARY} />
    </Frame>
  );
}

/** A traversal over a small graph — the shape of most contest problems. */
export function GraphArt() {
  const nodes = [
    { x: 160, y: 84, on: true },
    { x: 96, y: 142, on: true },
    { x: 224, y: 136, on: false },
    { x: 118, y: 224, on: true },
    { x: 206, y: 216, on: false },
    { x: 160, y: 160, on: false },
  ];
  const edges: [number, number][] = [
    [0, 1],
    [0, 2],
    [1, 5],
    [2, 5],
    [1, 3],
    [5, 4],
    [3, 4],
    [2, 4],
  ];
  const onPath = (a: number, b: number) => nodes[a].on && nodes[b].on;

  return (
    <Frame>
      {edges.map(([a, b], i) => (
        <line
          key={i}
          x1={nodes[a].x}
          y1={nodes[a].y}
          x2={nodes[b].x}
          y2={nodes[b].y}
          stroke={onPath(a, b) ? PRIMARY : MUTED}
          strokeOpacity={onPath(a, b) ? 0.95 : 0.3}
          strokeWidth={onPath(a, b) ? 3 : 1.5}
          strokeLinecap="round"
        />
      ))}
      {nodes.map((n, i) => (
        <g key={i}>
          <circle cx={n.x} cy={n.y} r={n.on ? 19 : 15} fill={SURFACE} />
          <circle
            cx={n.x}
            cy={n.y}
            r={n.on ? 19 : 15}
            fill={n.on ? PRIMARY : "none"}
            fillOpacity={n.on ? 0.2 : 0}
            stroke={n.on ? PRIMARY : MUTED}
            strokeOpacity={n.on ? 1 : 0.45}
            strokeWidth={n.on ? 3 : 2}
          />
        </g>
      ))}
    </Frame>
  );
}

/** Contest balloons — one per solved problem, as in the ACPC photo. */
export function BalloonsArt() {
  const balloons = [
    { x: 116, y: 118, r: 25, fill: "#ef4444" },
    { x: 168, y: 96, r: 29, fill: "#eab308" },
    { x: 214, y: 128, r: 24, fill: "#22c55e" },
    { x: 137, y: 168, r: 22, fill: ACCENT },
    { x: 192, y: 174, r: 21, fill: PRIMARY },
  ];
  const knot = { x: 163, y: 262 };

  return (
    <Frame>
      {balloons.map((b, i) => (
        <path
          key={`s${i}`}
          d={`M${b.x} ${b.y + b.r} Q ${b.x + (i % 2 ? 16 : -16)} ${(b.y + knot.y) / 2} ${knot.x} ${knot.y}`}
          fill="none"
          stroke={MUTED}
          strokeOpacity="0.5"
          strokeWidth="1.5"
        />
      ))}
      {balloons.map((b, i) => (
        <g key={i}>
          <ellipse cx={b.x} cy={b.y} rx={b.r} ry={b.r * 1.16} fill={b.fill} opacity="0.92" />
          <ellipse
            cx={b.x - b.r * 0.32}
            cy={b.y - b.r * 0.42}
            rx={b.r * 0.2}
            ry={b.r * 0.3}
            fill="#fff"
            opacity="0.45"
            transform={`rotate(-20 ${b.x - b.r * 0.32} ${b.y - b.r * 0.42})`}
          />
        </g>
      ))}
      <circle cx={knot.x} cy={knot.y} r={5} fill={MUTED} opacity="0.7" />
    </Frame>
  );
}
