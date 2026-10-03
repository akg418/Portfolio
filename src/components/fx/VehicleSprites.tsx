import type { VehicleKind } from "@/hooks/useVehicle";

/**
 * Top-down vehicles, all facing right, sized to their collision radius. They
 * share the site's palette so the garage reads as one set.
 */

function Beams({ y1, y2, reach }: { y1: number; y2: number; reach: number }) {
  return (
    <g opacity="0.5">
      <path
        d={`M${reach} ${y1} L${reach + 50} ${y1 - 13} L${reach + 50} ${y1 + 5} Z`}
        fill="#fde68a"
        opacity="0.35"
      />
      <path
        d={`M${reach} ${y2} L${reach + 50} ${y2 - 5} L${reach + 50} ${y2 + 13} Z`}
        fill="#fde68a"
        opacity="0.35"
      />
    </g>
  );
}

function Car({ lights }: { lights: boolean }) {
  return (
    <svg width="52" height="34" viewBox="0 0 52 34" className="overflow-visible">
      <defs>
        <linearGradient id="v-car" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#22d3ee" />
          <stop offset="1" stopColor="#a855f7" />
        </linearGradient>
      </defs>
      {lights && <Beams y1={9} y2={25} reach={46} />}
      {[
        [9, 1],
        [33, 1],
        [9, 27],
        [33, 27],
      ].map(([x, y]) => (
        <rect key={`${x}-${y}`} x={x} y={y} width="10" height="6" rx="2" fill="#0f172a" />
      ))}
      <rect x="3" y="4" width="44" height="26" rx="11" fill="url(#v-car)" />
      <rect x="6" y="7" width="38" height="5" rx="2.5" fill="#fff" opacity="0.25" />
      <rect x="15" y="8" width="20" height="18" rx="6" fill="#0b1224" opacity="0.85" />
      <rect x="29" y="10" width="5" height="14" rx="2.5" fill="#7dd3fc" opacity="0.75" />
      <rect x="16" y="10" width="4" height="14" rx="2" fill="#7dd3fc" opacity="0.4" />
      <circle cx="45" cy="10" r="2.4" fill="#fef08a" />
      <circle cx="45" cy="24" r="2.4" fill="#fef08a" />
      <rect x="2.5" y="8" width="2" height="5" rx="1" fill="#f43f5e" />
      <rect x="2.5" y="21" width="2" height="5" rx="1" fill="#f43f5e" />
    </svg>
  );
}

function Racer({ lights }: { lights: boolean }) {
  return (
    <svg width="60" height="30" viewBox="0 0 60 30" className="overflow-visible">
      {lights && <Beams y1={9} y2={21} reach={56} />}
      {[
        [8, 0],
        [40, 0],
        [8, 24],
        [40, 24],
      ].map(([x, y]) => (
        <rect key={`${x}-${y}`} x={x} y={y} width="12" height="6" rx="2" fill="#0f172a" />
      ))}
      {/* wedge body */}
      <path d="M4 7 Q4 4 8 4 L44 5 Q58 9 58 15 Q58 21 44 25 L8 26 Q4 26 4 23 Z" fill="#f43f5e" />
      <rect x="10" y="13.5" width="44" height="3" fill="#fff" opacity="0.85" />
      <path d="M22 8 L36 9 Q40 15 36 21 L22 22 Q19 15 22 8 Z" fill="#0b1224" opacity="0.9" />
      <path d="M33 10 Q36 15 33 20" stroke="#7dd3fc" strokeWidth="2" fill="none" opacity="0.8" />
      {/* spoiler */}
      <rect x="1" y="3" width="4" height="24" rx="1.5" fill="#111827" />
      <circle cx="56" cy="10" r="1.8" fill="#fef08a" />
      <circle cx="56" cy="20" r="1.8" fill="#fef08a" />
    </svg>
  );
}

function Truck({ lights }: { lights: boolean }) {
  return (
    <svg width="68" height="48" viewBox="0 0 68 48" className="overflow-visible">
      {lights && <Beams y1={14} y2={34} reach={64} />}
      {/* oversized wheels */}
      {[
        [8, 0],
        [44, 0],
        [8, 38],
        [44, 38],
      ].map(([x, y]) => (
        <g key={`${x}-${y}`}>
          <rect x={x} y={y} width="16" height="10" rx="3" fill="#0f172a" />
          {[2, 6, 10].map((o) => (
            <rect key={o} x={x + o} y={y} width="2" height="10" fill="#334155" />
          ))}
        </g>
      ))}
      <rect x="2" y="7" width="64" height="34" rx="7" fill="#fbbf24" />
      <rect x="4" y="10" width="34" height="28" rx="3" fill="#b45309" opacity="0.55" />
      {[14, 22, 30].map((x) => (
        <rect key={x} x={x} y="12" width="2" height="24" fill="#78350f" opacity="0.5" />
      ))}
      <rect x="42" y="11" width="20" height="26" rx="4" fill="#0b1224" opacity="0.9" />
      <rect x="56" y="13" width="4" height="22" rx="2" fill="#7dd3fc" opacity="0.75" />
      {/* roof lights */}
      {[16, 22, 28, 34].map((y) => (
        <circle key={y} cx="48" cy={y} r="1.5" fill="#fef08a" />
      ))}
      <rect x="64" y="12" width="3" height="24" rx="1.5" fill="#111827" />
    </svg>
  );
}

function Moto({ lights }: { lights: boolean }) {
  return (
    <svg width="46" height="20" viewBox="0 0 46 20" className="overflow-visible">
      {lights && <path d="M42 10 L92 -4 L92 24 Z" fill="#fde68a" opacity="0.18" />}
      <rect x="1" y="7" width="12" height="6" rx="3" fill="#0f172a" />
      <rect x="33" y="7" width="12" height="6" rx="3" fill="#0f172a" />
      <rect x="9" y="6" width="27" height="8" rx="4" fill="#a855f7" />
      <rect x="22" y="1" width="3" height="18" rx="1.5" fill="#cbd5e1" />
      {/* rider */}
      <ellipse cx="17" cy="10" rx="7" ry="6" fill="#0b1224" />
      <circle cx="20" cy="10" r="4.2" fill="#22d3ee" />
      <rect x="21.5" y="8" width="2" height="4" rx="1" fill="#0b1224" opacity="0.7" />
      <circle cx="43" cy="10" r="1.8" fill="#fef08a" />
    </svg>
  );
}

const SPRITES: Record<VehicleKind, (p: { lights: boolean }) => React.ReactElement> = {
  car: Car,
  racer: Racer,
  truck: Truck,
  moto: Moto,
};

export function VehicleSprite({ kind, lights }: { kind: VehicleKind; lights: boolean }) {
  const S = SPRITES[kind];
  return (
    <span className="block drop-shadow-[0_6px_6px_rgba(0,0,0,0.45)]">
      <S lights={lights} />
    </span>
  );
}
