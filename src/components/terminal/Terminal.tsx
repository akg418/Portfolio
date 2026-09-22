import { useEffect, useRef, useState } from "react";
import { profile } from "@/data/profile";
import { useCommandHistory } from "@/hooks/useCommandHistory";
import { useTerminalWindow } from "@/hooks/useTerminalWindow";
import { getUsername } from "@/hooks/useUsername";
import { useVisitCount } from "@/hooks/useVisitCount";
import { STORAGE_KEYS, readFlag } from "@/lib/storage";
import { MAX_ALIAS_DEPTH, type Aliases, loadAliases } from "@/lib/terminal/aliases";
import { playKeystroke } from "@/lib/terminal/audio";
import { DEFAULT_COLORS, colorCssVars, loadColors } from "@/lib/terminal/colors";
import { COMMAND_NAMES, findCommand } from "@/lib/terminal/commands";
import { renderInputOverlay } from "@/lib/terminal/highlight";
import type { CommandResult, Line, TerminalColors } from "@/lib/terminal/types";
import { TerminalScrollback } from "./TerminalScrollback";

export type TerminalMode = "float" | "min";

const MAX_INPUT = 50;
const CLOSE_DELAY_MS = 250;
const MINIMIZE_DELAY_MS = 200;
const HEADER_HEIGHT_PX = 41;

const GREETING: Line[] = [
  { kind: "sys", text: `ahmed-os v1.0.4 — © ${profile.name}` },
  {
    kind: "sys",
    text: "Type `help` to see what I can do. Drag the title bar to move · drag the corner to resize.",
  },
];

export function Terminal({
  mode,
  onClose,
  onMinimize,
  onRestore,
}: {
  mode: TerminalMode;
  onClose: () => void;
  onMinimize: () => void;
  onRestore: () => void;
}) {
  const [lines, setLines] = useState<Line[]>(GREETING);
  const [input, setInput] = useState("");
  const [username, setUsername] = useState("user");
  const [colors, setColors] = useState<TerminalColors>(DEFAULT_COLORS);
  const [aliases, setAliases] = useState<Aliases>({});
  const [soundEnabled, setSoundEnabled] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const history = useCommandHistory();
  const visits = useVisitCount();
  const win = useTerminalWindow(mode === "float");

  const knownCommands = [...COMMAND_NAMES, ...Object.keys(aliases)];

  useEffect(() => {
    setSoundEnabled(readFlag(STORAGE_KEYS.termSound, false));
    setUsername(getUsername());
    setColors(loadColors());
    setAliases(loadAliases());
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [lines]);

  useEffect(() => {
    if (mode !== "min") inputRef.current?.focus();
  }, [mode]);

  // Click outside the terminal window → minimize.
  useEffect(() => {
    if (mode === "min") return;
    const onDocMouseDown = (e: MouseEvent) => {
      const target = e.target as Node | null;
      if (target && innerRef.current && !innerRef.current.contains(target)) onMinimize();
    };
    document.addEventListener("mousedown", onDocMouseDown);
    return () => document.removeEventListener("mousedown", onDocMouseDown);
  }, [mode, onMinimize]);

  function run(raw: string, depth = 0, options: { record?: boolean } = {}) {
    const record = options.record ?? true;
    const trimmed = raw.trim();
    const [name = "", ...args] = trimmed.toLowerCase().split(/\s+/);
    const rawArgs = trimmed.split(/\s+/).slice(1).join(" ").trim();
    const out: Line[] = record ? [{ kind: "in", text: raw }] : [];

    // Aliases expand to another command line, which is then run as if typed.
    const alias = aliases[name];
    if (name && alias && depth < MAX_ALIAS_DEPTH) {
      const expanded = alias + (args.length ? ` ${args.join(" ")}` : "");
      setLines((l) => [...l, ...out, { kind: "sys", text: `→ ${expanded}` }]);
      setInput("");
      if (trimmed) history.push(raw);
      // The expansion is echoed above but not recorded: pressing ↑ should
      // return the alias the visitor actually typed.
      run(expanded, depth + 1, { record: false });
      return;
    }

    const command = name ? findCommand(name) : undefined;
    let result: CommandResult = undefined;

    if (name && !command) {
      out.push({ kind: "out", text: `command not found: ${name}. Try \`help\`.` });
    } else if (command) {
      result = command.run({
        args,
        rawArgs,
        print: (text) => out.push({ kind: "out", text }),
        printHelp: (cmd, desc) => out.push({ kind: "help", cmd, desc }),
        state: { username, visits, colors, aliases, soundEnabled },
        actions: {
          setUsername,
          setColors,
          setAliases,
          setSoundEnabled,
          close: () => setTimeout(onClose, CLOSE_DELAY_MS),
          minimize: () => setTimeout(onMinimize, MINIMIZE_DELAY_MS),
        },
      });
    }

    setLines((l) => (result?.clearScreen ? [] : [...l, ...out]));
    setInput("");
    if (record && trimmed && !result?.skipHistory) history.push(raw);
  }

  /** Remaining characters of the best completion for the current input. */
  function suggestion(): string {
    if (!input || input.includes(" ")) return "";
    const lower = input.toLowerCase();
    const match = knownCommands.find((c) => c.startsWith(lower) && c !== lower);
    return match ? match.slice(input.length) : "";
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (soundEnabled) playKeystroke();

    if (e.key === "ArrowUp") {
      e.preventDefault();
      const previous = history.previous(input);
      if (previous !== undefined) setInput(previous);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      const next = history.next(input);
      if (next !== undefined) setInput(next);
    } else if (e.key === "Tab") {
      e.preventDefault();
      const completion = suggestion();
      if (completion) setInput(input + completion);
    }
  }

  const cssVars = colorCssVars(colors);

  // Minimized: only a clickable bar pinned to the bottom.
  if (mode === "min") {
    return (
      <button
        onClick={onRestore}
        className="dark fixed bottom-0 left-0 right-0 z-40 border-t border-border bg-background/80 backdrop-blur-md hover:bg-card/90 transition-colors group"
        aria-label="Restore terminal"
        style={cssVars}
      >
        <div className="max-w-5xl mx-auto px-6 h-11 flex items-center gap-2 font-mono text-xs text-muted-foreground">
          <span className="h-3 w-3 rounded-full" style={{ background: colors.dotRed }} />
          <span className="h-3 w-3 rounded-full" style={{ background: colors.dotGreen }} />
          <span className="ml-2" style={{ color: colors.prompt }}>
            {username}@{profile.domain}
          </span>
          <span>— zsh (minimized)</span>
          <span className="ml-auto opacity-60 group-hover:opacity-100">click to restore</span>
        </div>
      </button>
    );
  }

  return (
    <div
      className="dark fixed z-50"
      onClick={() => inputRef.current?.focus()}
      style={{ ...cssVars, left: win.pos.x, top: win.pos.y, width: win.size.w, height: win.size.h }}
    >
      <div
        ref={innerRef}
        className="relative h-full w-full overflow-hidden rounded-xl border border-border bg-card/95 shadow-2xl backdrop-blur"
      >
        <div
          className="flex items-center gap-2 border-b border-border bg-background/40 px-4 py-2.5 select-none"
          onMouseDown={win.onHeaderMouseDown}
          style={{ cursor: "move" }}
        >
          <button
            type="button"
            data-window-btn
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
            className="group h-3 w-3 rounded-full flex items-center justify-center hover:brightness-110"
            style={{ background: colors.dotRed }}
            aria-label="Close terminal"
            title="Close"
          >
            <span className="opacity-0 group-hover:opacity-90 text-[8px] leading-none font-bold text-black">
              ×
            </span>
          </button>
          <button
            type="button"
            data-window-btn
            onClick={(e) => {
              e.stopPropagation();
              onMinimize();
            }}
            className="group h-3 w-3 rounded-full flex items-center justify-center hover:brightness-110"
            style={{ background: colors.dotGreen }}
            aria-label="Minimize terminal"
            title="Minimize to bottom bar"
          >
            <span className="opacity-0 group-hover:opacity-90 text-[10px] leading-none font-bold text-black">
              –
            </span>
          </button>
          <span className="ml-3 font-mono text-xs text-muted-foreground">
            {username}@{profile.domain} — zsh
          </span>
        </div>

        <div
          ref={scrollRef}
          className="overflow-y-auto px-5 py-4 font-mono text-sm leading-relaxed"
          style={{ height: `calc(100% - ${HEADER_HEIGHT_PX}px)` }}
        >
          <TerminalScrollback
            lines={lines}
            colors={colors}
            username={username}
            knownCommands={knownCommands}
          />

          <form
            onSubmit={(e) => {
              e.preventDefault();
              run(input);
            }}
            className="mt-1 flex items-center"
          >
            <span style={{ color: colors.prompt }}>
              {username}@{profile.domain}
            </span>
            <span style={{ color: colors.path }}>:~$&nbsp;</span>
            <div className="relative flex-1">
              {/* colored overlay (command token + hex highlight) */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 whitespace-pre font-mono"
                style={{ zIndex: 10 }}
              >
                {renderInputOverlay(input, colors.in, colors.cmd, knownCommands)}
              </div>
              {/* ghost suggestion underlay */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 whitespace-pre font-mono"
                style={{ color: colors.ghost }}
              >
                <span className="invisible">{input}</span>
                <span>{suggestion()}</span>
              </div>
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value.slice(0, MAX_INPUT))}
                onKeyDown={onKeyDown}
                maxLength={MAX_INPUT}
                spellCheck={false}
                autoComplete="off"
                className="relative w-full border-0 bg-transparent outline-none"
                style={{ color: "transparent", caretColor: colors.in }}
                aria-label="terminal input"
              />
            </div>
          </form>
        </div>

        <div
          onMouseDown={win.onResizeMouseDown}
          className="absolute bottom-0 right-0 h-4 w-4 cursor-se-resize"
          title="Drag to resize"
          style={{
            background:
              "linear-gradient(135deg, transparent 50%, var(--t-path) 50%, var(--t-path) 60%, transparent 60%, transparent 70%, var(--t-path) 70%, var(--t-path) 80%, transparent 80%)",
          }}
        />
      </div>
    </div>
  );
}
