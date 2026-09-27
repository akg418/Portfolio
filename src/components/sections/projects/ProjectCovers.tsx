import type { Motif } from "@/data/profile";

/**
 * A small illustrated cover per project, standing in for screenshots: each is
 * a quiet SVG scene of what the project is, animated only while it is shown.
 * They share one palette and one frame, so the set reads as a series.
 */

const C = {
  cyan: "#22d3ee",
  violet: "#a78bfa",
  amber: "#fbbf24",
  green: "#34d399",
  pink: "#f472b6",
  ink: "#e2e8f0",
  dim: "#334155",
};

export function Cover({ motif, active = true }: { motif: Motif; active?: boolean }) {
  const Scene = SCENES[motif];
  return (
    <svg
      viewBox="0 0 320 200"
      className={`h-full w-full ${active ? "cover-live" : ""}`}
      aria-hidden
    >
      <defs>
        <linearGradient id={`cover-bg-${motif}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#0b1224" />
          <stop offset="1" stopColor="#171433" />
        </linearGradient>
        <pattern id={`cover-dots-${motif}`} width="14" height="14" patternUnits="userSpaceOnUse">
          <circle cx="1" cy="1" r="0.8" fill="#fff" opacity="0.07" />
        </pattern>
      </defs>
      <rect width="320" height="200" fill={`url(#cover-bg-${motif})`} />
      <rect width="320" height="200" fill={`url(#cover-dots-${motif})`} />
      <Scene />
    </svg>
  );
}

/** Character Simulation System: a small network with a thought passing through. */
function Neural() {
  const layers = [
    [50, 70, 100, 130, 150],
    [70, 100, 130],
    [55, 85, 115, 145],
  ];
  const xs = [70, 150, 230];
  const pts = layers.map((ys, i) => ys.map((y) => ({ x: xs[i], y })));
  return (
    <g>
      {pts
        .slice(0, -1)
        .flatMap((col, i) =>
          col.flatMap((a, j) =>
            pts[i + 1].map((b, k) => (
              <line
                key={`${i}${j}${k}`}
                x1={a.x}
                y1={a.y}
                x2={b.x}
                y2={b.y}
                stroke={C.violet}
                strokeOpacity={0.18}
              />
            )),
          ),
        )}
      <path
        d="M70 100 L150 70 L230 115"
        fill="none"
        stroke={C.cyan}
        strokeWidth={2}
        strokeDasharray="6 200"
        className="cover-flow"
      />
      {pts.flat().map((p, i) => (
        <circle
          key={i}
          cx={p.x}
          cy={p.y}
          r={5}
          fill="#0b1224"
          stroke={i % 4 === 0 ? C.cyan : C.violet}
          strokeWidth={1.5}
        />
      ))}
      <g transform="translate(250 30)">
        <rect width="54" height="26" rx="13" fill={C.violet} opacity={0.9} />
        <path d="M12 26 l-4 8 l10 -8z" fill={C.violet} opacity={0.9} />
        {[16, 27, 38].map((x, i) => (
          <circle
            key={x}
            cx={x}
            cy={13}
            r={2.6}
            fill="#0b1224"
            className="cover-typing"
            style={{ animationDelay: `${i * 0.18}s` }}
          />
        ))}
      </g>
      <text
        x="22"
        y="186"
        fontSize="9"
        fontFamily="ui-monospace, monospace"
        fill={C.ink}
        opacity={0.4}
      >
        mistral 7b · rag · faiss · lora
      </text>
    </g>
  );
}

/** Social Media Platform: a honeycomb of Spring Boot microservices. */
function Services() {
  const hex = (cx: number, cy: number, r: number) =>
    Array.from({ length: 6 }, (_, i) => {
      const a = (Math.PI / 3) * i + Math.PI / 6;
      return `${cx + r * Math.cos(a)},${cy + r * Math.sin(a)}`;
    }).join(" ");
  const r = 30;
  const w = r * Math.sqrt(3);
  const cells = [
    { x: 160, y: 100, label: "spring", c: C.cyan },
    { x: 160 - w, y: 100, label: "jwt", c: C.violet },
    { x: 160 + w, y: 100, label: "jpa", c: C.violet },
    { x: 160 - w / 2, y: 100 - r * 1.5, label: "", c: C.violet },
    { x: 160 + w / 2, y: 100 - r * 1.5, label: "", c: C.violet },
    { x: 160 - w / 2, y: 100 + r * 1.5, label: "", c: C.violet },
    { x: 160 + w / 2, y: 100 + r * 1.5, label: "", c: C.violet },
  ];
  return (
    <g>
      <circle cx="160" cy="100" r="30" fill="none" stroke={C.cyan} className="cover-ping" />
      {cells.map((h, i) => (
        <g key={i}>
          <polygon
            points={hex(h.x, h.y, r - 2)}
            fill={i === 0 ? "rgba(34,211,238,.14)" : "rgba(167,139,250,.08)"}
            stroke={h.c}
            strokeOpacity={i === 0 ? 0.9 : 0.45}
          />
          <text
            x={h.x}
            y={h.y + 3}
            textAnchor="middle"
            fontSize="8.5"
            fontFamily="ui-monospace, monospace"
            fill={C.ink}
            opacity={0.75}
          >
            {h.label}
          </text>
        </g>
      ))}
      <text
        x="22"
        y="186"
        fontSize="9"
        fontFamily="ui-monospace, monospace"
        fill={C.ink}
        opacity={0.4}
      >
        spring boot · jwt · jpa
      </text>
    </g>
  );
}

/** Copy for Claude: an editor with a merged diff and a copy action. */
function Editor() {
  const lines: [number, number, string?][] = [
    [0, 120],
    [14, 90],
    [14, 150, "add"],
    [14, 130, "add"],
    [28, 80],
    [14, 110, "del"],
    [0, 60],
  ];
  return (
    <g>
      <rect
        x="30"
        y="24"
        width="260"
        height="152"
        rx="10"
        fill="#0e1528"
        stroke="#fff"
        strokeOpacity={0.08}
      />
      {[C.pink, C.amber, C.green].map((c, i) => (
        <circle key={c} cx={46 + i * 12} cy={38} r={3.5} fill={c} opacity={0.8} />
      ))}
      <text
        x="96"
        y="41"
        fontSize="8.5"
        fontFamily="ui-monospace, monospace"
        fill={C.ink}
        opacity={0.45}
      >
        extension.ts
      </text>
      {lines.map(([indent, w, kind], i) => {
        const y = 58 + i * 15;
        return (
          <g key={i}>
            {kind && (
              <rect
                x="34"
                y={y - 6}
                width="252"
                height="13"
                fill={kind === "add" ? "rgba(52,211,153,.12)" : "rgba(244,114,182,.1)"}
              />
            )}
            <text
              x="40"
              y={y + 3}
              fontSize="8"
              fontFamily="ui-monospace, monospace"
              fill={kind === "add" ? C.green : kind === "del" ? C.pink : C.dim}
            >
              {kind === "add" ? "+" : kind === "del" ? "−" : i + 1}
            </text>
            <rect
              x={56 + indent}
              y={y - 2.5}
              width={w}
              height={5}
              rx={2.5}
              fill={kind === "add" ? C.green : kind === "del" ? C.pink : i % 2 ? C.violet : C.cyan}
              opacity={kind ? 0.7 : 0.45}
            />
          </g>
        );
      })}
      <rect x="192" y="146" width="84" height="20" rx="10" fill={C.amber} />
      <text
        x="234"
        y="159"
        textAnchor="middle"
        fontSize="8.5"
        fontWeight="700"
        fontFamily="ui-monospace, monospace"
        fill="#111827"
      >
        Copy for Claude
      </text>
      <rect x="160" y="102" width="1.5" height="10" fill={C.ink} className="cover-caret" />
      <text
        x="22"
        y="192"
        fontSize="9"
        fontFamily="ui-monospace, monospace"
        fill={C.ink}
        opacity={0.4}
      >
        merged · open source
      </text>
    </g>
  );
}

/** 3l sari3: a chat whose older messages burn away, with the channel's countdown. */
function Chat() {
  const bubbles = [
    { x: 34, y: 44, w: 110, me: false, o: 0.18 },
    { x: 150, y: 70, w: 120, me: true, o: 0.35 },
    { x: 34, y: 98, w: 140, me: false, o: 0.6 },
    { x: 130, y: 126, w: 140, me: true, o: 1 },
  ];
  return (
    <g>
      {bubbles.map((b, i) => (
        <g key={i} opacity={b.o}>
          <rect
            x={b.x}
            y={b.y}
            width={b.w}
            height={20}
            rx={10}
            fill={b.me ? C.cyan : "#1e293b"}
            opacity={b.me ? 0.85 : 1}
          />
          <rect
            x={b.x + 12}
            y={b.y + 8}
            width={b.w - 40}
            height={4}
            rx={2}
            fill={b.me ? "#0b1224" : C.ink}
            opacity={0.5}
          />
        </g>
      ))}
      <g transform="translate(262 40)">
        <circle r="22" fill="none" stroke={C.dim} strokeWidth={3} />
        <circle
          r="22"
          fill="none"
          stroke={C.pink}
          strokeWidth={3}
          strokeLinecap="round"
          strokeDasharray="138"
          className="cover-countdown"
          transform="rotate(-90)"
        />
        <text
          y="3"
          textAnchor="middle"
          fontSize="9"
          fontWeight="700"
          fontFamily="ui-monospace, monospace"
          fill={C.ink}
        >
          0:59
        </text>
      </g>
      <text
        x="34"
        y="168"
        fontSize="9"
        fontFamily="ui-monospace, monospace"
        fill={C.pink}
        opacity={0.8}
      >
        channel self-destructs in 59s
      </text>
      <text
        x="22"
        y="190"
        fontSize="9"
        fontFamily="ui-monospace, monospace"
        fill={C.ink}
        opacity={0.4}
      >
        websockets · presence · expiry events
      </text>
    </g>
  );
}

/** Database Backup CLI: a terminal mid-backup, beside the databases it serves. */
function Cli() {
  return (
    <g>
      <rect
        x="24"
        y="30"
        width="196"
        height="140"
        rx="10"
        fill="#0a0f1d"
        stroke="#fff"
        strokeOpacity={0.08}
      />
      <g fontSize="8.5" fontFamily="ui-monospace, monospace">
        <text x="36" y="54" fill={C.green}>
          $ <tspan fill={C.ink}>backup \</tspan>
        </text>
        <text x="48" y="68" fill={C.ink} opacity={0.7}>
          --db postgres --gzip
        </text>
        <text x="36" y="88" fill={C.ink} opacity={0.5}>
          ▸ dumping schema…
        </text>
        <text x="36" y="102" fill={C.ink} opacity={0.5}>
          ▸ compressing (gzip)
        </text>
        <text x="36" y="136" fill={C.ink} opacity={0.5}>
          ▸ notify: email sent
        </text>
      </g>
      <rect x="36" y="112" width="170" height="7" rx="3.5" fill={C.dim} />
      <rect
        x="36"
        y="112"
        width="170"
        height="7"
        rx="3.5"
        fill={C.cyan}
        className="cover-progress"
      />
      {[
        { y: 46, c: C.cyan, l: "PostgreSQL" },
        { y: 104, c: C.amber, l: "MySQL" },
      ].map((d) => (
        <g key={d.l} transform={`translate(262 ${d.y})`}>
          <ellipse cx="0" cy="0" rx="24" ry="7" fill={d.c} opacity={0.85} />
          <path d={`M-24 0 v26 a24 7 0 0 0 48 0 v-26`} fill={d.c} opacity={0.35} />
          <ellipse cx="0" cy="13" rx="24" ry="7" fill="none" stroke={d.c} strokeOpacity={0.6} />
          <text
            y="48"
            textAnchor="middle"
            fontSize="8"
            fontFamily="ui-monospace, monospace"
            fill={C.ink}
            opacity={0.6}
          >
            {d.l}
          </text>
        </g>
      ))}
      <text
        x="22"
        y="190"
        fontSize="9"
        fontFamily="ui-monospace, monospace"
        fill={C.ink}
        opacity={0.4}
      >
        factory · adapter · strategy · command
      </text>
    </g>
  );
}

/** Snake Game in C: the snake itself, crawling a console grid toward its food. */
function Snake() {
  const cell = 14;
  const path = "M42 142 H140 V86 H210 V58 H280";
  return (
    <g>
      {Array.from({ length: 21 }, (_, x) =>
        Array.from({ length: 12 }, (_, y) => (
          <rect
            key={`${x}-${y}`}
            x={16 + x * cell}
            y={16 + y * cell}
            width={2}
            height={2}
            fill="#fff"
            opacity={0.08}
          />
        )),
      )}
      <path
        d={path}
        fill="none"
        stroke={C.green}
        strokeOpacity={0.12}
        strokeWidth={10}
        strokeLinecap="square"
      />
      <path
        d={path}
        fill="none"
        stroke={C.green}
        strokeWidth={10}
        strokeLinecap="square"
        strokeDasharray="120 400"
        className="cover-snake"
      />
      <rect x="276" y="52" width="12" height="12" rx="3" fill={C.pink} className="cover-food" />
      <text
        x="22"
        y="190"
        fontSize="9"
        fontFamily="ui-monospace, monospace"
        fill={C.ink}
        opacity={0.4}
      >
        score: 012 · itch.io
      </text>
    </g>
  );
}

const SCENES: Record<Motif, () => React.ReactElement> = {
  neural: Neural,
  services: Services,
  editor: Editor,
  chat: Chat,
  cli: Cli,
  snake: Snake,
};
