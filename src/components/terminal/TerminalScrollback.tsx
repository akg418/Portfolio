import { profile } from "@/data/profile";
import { renderHexInline, renderInputOverlay } from "@/lib/terminal/highlight";
import type { Line, TerminalColors } from "@/lib/terminal/types";

/** Width of the command column in `help` output. */
const HELP_COLUMN = 16;

export function TerminalScrollback({
  lines,
  colors,
  username,
  knownCommands,
}: {
  lines: Line[];
  colors: TerminalColors;
  username: string;
  knownCommands: readonly string[];
}) {
  return (
    <>
      {lines.map((line, idx) => {
        if (line.kind === "in") {
          return (
            <div key={idx} style={{ color: colors.in }}>
              <span style={{ color: colors.prompt }}>
                {username}@{profile.domain}
              </span>
              <span style={{ color: colors.path }}>:~$ </span>
              {renderInputOverlay(line.text, colors.in, colors.cmd, knownCommands)}
            </div>
          );
        }

        if (line.kind === "help") {
          return (
            <div key={idx} style={{ color: colors.out }}>
              <span style={{ color: colors.cmd }}>{line.cmd.padEnd(HELP_COLUMN)}</span>
              <span>{line.desc}</span>
            </div>
          );
        }

        const color = line.kind === "sys" ? colors.sys : colors.out;
        return (
          <div key={idx} className={line.kind === "sys" ? "font-semibold" : ""} style={{ color }}>
            <span>{renderHexInline(line.text, color)}</span>
          </div>
        );
      })}
    </>
  );
}
