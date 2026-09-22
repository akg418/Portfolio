/** A rendered scrollback line. `help` rows carry a command/description pair
 *  instead of free text so the renderer does not have to guess from optional
 *  fields. */
export type Line =
  | { kind: "in"; text: string }
  | { kind: "out"; text: string }
  | { kind: "sys"; text: string }
  | { kind: "help"; cmd: string; desc: string };

export type ColorKey =
  | "prompt"
  | "path"
  | "sys"
  | "out"
  | "in"
  | "ghost"
  | "dotRed"
  | "dotYellow"
  | "dotGreen"
  | "cmd";

export type TerminalColors = Record<ColorKey, string>;

export type TerminalState = {
  username: string;
  visits: number;
  colors: TerminalColors;
  aliases: Record<string, string>;
  soundEnabled: boolean;
};

export type TerminalActions = {
  setUsername(name: string): void;
  setColors(colors: TerminalColors): void;
  setAliases(aliases: Record<string, string>): void;
  setSoundEnabled(enabled: boolean): void;
  /** Prints nothing; schedules the window close the way the old handler did. */
  close(): void;
  minimize(): void;
};

export type CommandContext = {
  /** Lower-cased arguments following the command name. */
  args: string[];
  /** Everything after the command name, original casing preserved. */
  rawArgs: string;
  /** Appends an output line. */
  print(text: string): void;
  /** Appends an aligned `command  description` row, used by `help`. */
  printHelp(cmd: string, desc: string): void;
  state: TerminalState;
  actions: TerminalActions;
};

export type CommandResult = void | {
  /** Wipe the scrollback instead of appending this command's output. */
  clearScreen?: boolean;
  /** Keep the command out of the ↑/↓ history. */
  skipHistory?: boolean;
};

export type Command = {
  name: string;
  aliases?: readonly string[];
  /** Shown by `help`; defaults to `name` when the command takes no arguments. */
  usage?: string;
  description: string;
  run(ctx: CommandContext): CommandResult;
};
