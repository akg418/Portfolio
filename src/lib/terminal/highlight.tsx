import { HEX_PATTERN, isHex } from "./colors";

/** Splits text so that hex literals land in their own capture group. */
const SPLIT_PATTERN = new RegExp(`(${HEX_PATTERN.source})`);

/** Renders text in `baseColor`, showing any hex literal in the color it names. */
export function renderHexInline(text: string, baseColor: string): React.ReactNode {
  return text.split(SPLIT_PATTERN).map((part, i) =>
    isHex(part) ? (
      <span key={i} style={{ color: part, fontWeight: 700, textShadow: `0 0 6px ${part}` }}>
        {part}
      </span>
    ) : (
      <span key={i} style={{ color: baseColor }}>
        {part}
      </span>
    ),
  );
}

/**
 * Overlay for the live input: highlights the first token when it names a known
 * command or alias, and colors hex literals in the rest.
 */
export function renderInputOverlay(
  text: string,
  baseColor: string,
  cmdColor: string,
  knownCommands: readonly string[],
): React.ReactNode {
  if (!text) return null;
  const firstSpace = text.indexOf(" ");
  const head = firstSpace === -1 ? text : text.slice(0, firstSpace);
  const tail = firstSpace === -1 ? "" : text.slice(firstSpace);
  const isKnown = knownCommands.includes(head.toLowerCase());
  return (
    <>
      <span style={{ color: isKnown ? cmdColor : baseColor, fontWeight: isKnown ? 700 : 400 }}>
        {head}
      </span>
      {tail ? renderHexInline(tail, baseColor) : null}
    </>
  );
}
