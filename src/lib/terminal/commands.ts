import { experiences, links, profile, projects, skills } from "@/data/profile";
import { STORAGE_KEYS, writeFlag } from "@/lib/storage";
import { toggleTheme } from "@/lib/theme";
import { toggleGamingMode } from "@/hooks/useGamingMode";
import { ROBOT_NAMES, readRobots, setRobots, type RobotName } from "@/hooks/useRobots";
import { setStoredUsername } from "@/hooks/useUsername";
import { MYSTERIES, confetti, fnv, solveMystery, solvedMysteries } from "@/lib/mysteries";
import {
  VEHICLE_KINDS,
  VEHICLE_LABELS,
  canDriveHere,
  readVehicle,
  requestDrive,
  setVehicle,
} from "@/hooks/useVehicle";
import { COLOR_KEYS, DEFAULT_COLORS, clearStoredColors, isHex, saveColors } from "./colors";
import { saveAliases } from "./aliases";
import type { ColorKey, Command, CommandContext } from "./types";

export const HELP_HEADER = "Available commands:";

/** Pads a label column so `key   value` output lines up. */
function padded(label: string, width: number): string {
  return label.padEnd(width);
}

/** Renders `Label: value` rows with the colon column aligned. */
function printAligned(
  print: (text: string) => void,
  rows: readonly { label: string; value: string }[],
): void {
  const width = Math.max(...rows.map((r) => r.label.length)) + 2;
  for (const row of rows) print(`${padded(`${row.label}:`, width)}${row.value}`);
}

function runColor(ctx: CommandContext): void {
  const { args, print, state, actions } = ctx;
  const sub = (args[0] || "").toLowerCase();

  if (!sub || sub === "list") {
    print("Color tokens (use: color set <key> <#hex>)");
    for (const key of COLOR_KEYS) print(`  ${key.padEnd(14)} ${state.colors[key]}`);
    return;
  }

  if (sub === "reset") {
    clearStoredColors();
    actions.setColors({ ...DEFAULT_COLORS });
    print("Colors reset to defaults.");
    return;
  }

  if (sub !== "set") {
    print("Usage: color [list|reset] | color set <key> <#hex>");
    return;
  }

  const rawKey = args[1];
  const value = args[2];
  const key: ColorKey | undefined = rawKey
    ? COLOR_KEYS.find((k) => k.toLowerCase() === rawKey.toLowerCase())
    : undefined;

  if (!key) {
    print(`Unknown key. Try: ${COLOR_KEYS.join(", ")}`);
  } else if (!value || !isHex(value)) {
    print("Value must be hex like #ff00aa or #f0a.");
  } else {
    const next = { ...state.colors, [key]: value };
    actions.setColors(next);
    saveColors(next);
    print(`${key} → ${value}`);
  }
}

function runCv(ctx: CommandContext): void {
  const { args, print } = ctx;

  // Accepts combined flags such as "-sc" as well as repeated "-s -c".
  let flags = "";
  let unknown = "";
  for (const arg of args) {
    if (!arg.startsWith("-")) continue;
    for (const ch of arg.slice(1)) {
      if (ch === "s" || ch === "c") {
        if (!flags.includes(ch)) flags += ch;
      } else {
        unknown += ch;
      }
    }
  }

  if (unknown) {
    print(`Unknown flag(s): -${unknown}. Use -s, -c, or -sc.`);
    return;
  }

  const show = flags.includes("s");
  const copy = flags.includes("c");

  if (!show && !copy) {
    print("Opening CV on Google Drive…");
    window.open(profile.cvUrl, "_blank");
    return;
  }
  if (show) print(`CV link: ${profile.cvUrl}`);
  if (copy) {
    void navigator.clipboard
      ?.writeText(profile.cvUrl)
      .then(() => print("✓ CV link copied to clipboard."))
      .catch(() => print("Could not copy to clipboard in this browser."));
  }
}

/**
 * Every terminal command, in the order `help` lists them. Adding a command
 * here is the only edit needed — help text and tab-completion are derived.
 */
export const commands: Command[] = [
  {
    name: "help",
    description: "Show this help",
    run: ({ print, printHelp }) => {
      print(HELP_HEADER);
      for (const command of commands) {
        if (command.hidden) continue;
        printHelp(command.usage ?? command.name, command.description);
      }
    },
  },
  {
    name: "whoami",
    description: "Who is Ahmed?",
    run: ({ print }) => {
      print(`${profile.name} — ${profile.role} (backend & microservices).`);
      print("ACPC Finalist · 2000+ problems solved · FastAPI / NestJS / Kubernetes.");
    },
  },
  {
    name: "name",
    description: "Show your current username",
    run: ({ print, state }) => {
      print(`You are currently: ${state.username}`);
      print("Use `setname <your-name>` to change it.");
    },
  },
  {
    name: "setname",
    usage: "setname <name>",
    description: "Change your username (saved in this browser)",
    run: ({ rawArgs, print, actions }) => {
      const clean = rawArgs.replace(/[^a-zA-Z0-9_\-.]/g, "").slice(0, 24);
      if (!clean) {
        print("Usage: setname <name>  (letters, numbers, _ - . only)");
        return;
      }
      setStoredUsername(clean);
      actions.setUsername(clean);
      print(`Nice to meet you, ${clean}. Saved.`);
    },
  },
  {
    name: "experience",
    description: "Years of experience & current role",
    run: ({ print }) => {
      for (const role of experiences.filter((e) => e.current)) {
        print(`Currently @ ${role.shortName} — ${role.role} (${role.period})`);
      }
      print("Backend across NestJS, FastAPI, Flask, .NET, Spring Boot.");
      const past = experiences
        .filter((e) => !e.current)
        .map((e) => e.shortName)
        .join(", ");
      print(`Past: ${past}. Type \`enter\` for full timeline.`);
    },
  },
  {
    name: "skills",
    description: "Tech stack",
    run: ({ print }) => {
      printAligned(
        print,
        Object.entries(skills).map(([group, items]) => ({
          label: group,
          value: items.join(", "),
        })),
      );
    },
  },
  {
    name: "projects",
    description: "Featured projects",
    run: ({ print }) => {
      for (const project of projects) print(`• ${project.shortName} — ${project.short}`);
    },
  },
  {
    name: "visits",
    description: "Number of visits to this site",
    run: ({ print, state }) => {
      const times = state.visits === 1 ? "time" : "times";
      print(`This site has been visited ${state.visits} ${times} from this browser.`);
    },
  },
  {
    name: "social",
    description: "Social links",
    run: ({ print }) => {
      printAligned(
        print,
        links.map((link) => ({ label: link.label, value: link.url })),
      );
    },
  },
  {
    name: "email",
    description: "Open mail to Ahmed",
    run: ({ print }) => {
      print(`Opening mail client → ${profile.email}`);
      window.location.href = `mailto:${profile.email}`;
    },
  },
  {
    name: "cv",
    usage: "cv [-s|-c|-sc]",
    description: "Open CV. -s show link · -c copy link · -sc both",
    run: runCv,
  },
  {
    name: "theme",
    description: "Toggle light / dark mode",
    run: ({ print }) => print(`Theme switched to ${toggleTheme()} mode.`),
  },
  {
    name: "sound",
    description: "Toggle terminal typing sound",
    run: ({ print, state, actions }) => {
      const next = !state.soundEnabled;
      actions.setSoundEnabled(next);
      writeFlag(STORAGE_KEYS.termSound, next);
      print(`Typing sound ${next ? "ENABLED" : "DISABLED"}.`);
    },
  },
  {
    name: "gaming",
    aliases: ["game"],
    description: "Toggle gaming mode (unlocks the cups game)",
    run: ({ print }) => {
      print(
        toggleGamingMode()
          ? "🎮 Gaming mode ENABLED — enter the site to find a dedicated gaming section."
          : "Gaming mode disabled.",
      );
    },
  },
  {
    name: "robots",
    aliases: ["robot"],
    usage: "robots [alice|bob] [on|off]",
    description: "Alice and Bob, who play ball at the bottom of the page",
    run: ({ args, print }) => {
      const name = ROBOT_NAMES.find((n) => n === args[0]);
      const wanted = name ? args[1] : args[0];

      if (!wanted) {
        const state = readRobots();
        for (const n of ROBOT_NAMES) {
          print(`${n.padEnd(6)} ${state[n] ? "online" : "powered down"}`);
        }
        print("Use `robots off`, `robots alice off`, `robots bob on`.");
        return;
      }

      if (wanted !== "on" && wanted !== "off") {
        print("Usage: robots [alice|bob] [on|off]");
        return;
      }

      const on = wanted === "on";
      const was = readRobots();
      setRobots((name as RobotName | undefined) ?? "both", on);
      const survivor = ROBOT_NAMES.find((n) => n !== name);
      if (name && !on && was.alice && was.bob && survivor)
        print(`${survivor} has been waiting for this. Watch the bottom of the page…`);
      else if (name) print(`${name} ${on ? "is back on their feet." : "powered down."}`);
      else print(on ? "Alice and Bob are back." : "Both robots powered down.");
    },
  },
  {
    name: "car",
    aliases: ["cars", "vehicle", "garage"],
    usage: "car [drive|on|off|car|racer|truck|moto]",
    description: "the little vehicle above the terminal bar: switch it on, off, or swap it",
    run: ({ args, print, actions }) => {
      const arg = args[0]?.toLowerCase();
      const kind = VEHICLE_KINDS.find((k) => k === arg);
      if (!arg) {
        const v = readVehicle();
        print(`vehicle  ${v.on ? "on" : "off"} · ${VEHICLE_LABELS[v.kind]}`);
        print(`garage   ${VEHICLE_KINDS.map((k) => `${k} (${VEHICLE_LABELS[k]})`).join(", ")}`);
        print("drive    `car drive`, or click the car bottom-left (desktop)");
        print("keys     ↑ ↓ ← → or WASD · shift turbo · space brake");
        print("crash    knock headings, buttons and images across the page;");
        print("         hits chain into whatever they slide into");
        print("panel    swap vehicle · Stop driving · Reset website (puts it all back)");
        print("note     the terminal closes while you drive, and won't reopen until you stop");
        print("fun fact it can't resist the ACPC track. it drives right into the party.");
        print("Use `car drive`, `car racer`, `car truck`, `car moto`, `car off`, `car on`.");
        return;
      }
      if (arg === "on" || arg === "off") {
        const on = arg === "on";
        if (readVehicle().on === on) {
          print(
            on
              ? "It's already on — bottom-left. `car drive` to take the wheel."
              : "It's already parked. `car on` brings it back.",
          );
          return;
        }
        setVehicle({ on });
        print(on ? "Engine on. It's back, bottom-left." : "Parked. `car on` brings it back.");
        return;
      }
      if (arg === "drive" || arg === "play" || arg === "go") {
        if (!canDriveHere()) {
          print("Driving needs a keyboard — try it on a desktop.");
          return;
        }
        if (!readVehicle().on) setVehicle({ on: true });
        print("Closing the terminal… you're driving! Press Stop driving to come back.");
        actions.close();
        window.setTimeout(requestDrive, 450);
        return;
      }
      if (kind) {
        setVehicle({ on: true, kind });
        print(`Swapped to the ${VEHICLE_LABELS[kind].toLowerCase()}. Click it to drive.`);
        return;
      }
      print("Usage: car [on|off|car|racer|truck|moto]");
    },
  },
  {
    name: "mysteries",
    aliases: ["mystery", "secrets"],
    hidden: true,
    description: "the hidden mysteries you have found",
    run: ({ print }) => {
      const solved = solvedMysteries();
      if (!solved.length) {
        print("command not found: mysteries. Try `help`.");
        return;
      }
      print(`Mysteries found: ${solved.length}/${MYSTERIES.length}`);
      for (const m of MYSTERIES) {
        const done = solved.includes(m.id);
        const tag = m.dev ? " [dev]" : "";
        print(done ? `  ✔ ${m.title}${tag}` : `  ? ???${tag} — ${m.riddle}`);
      }
      if (solved.length === MYSTERIES.length)
        print("All of them. Click the counter for your certificate.");
    },
  },
  {
    name: "hire",
    hidden: true,
    description: "",
    run: ({ print }) => {
      print("hire: permission denied");
      print("(only root can make offers. you know how to become root.)");
    },
  },
  {
    name: "sudo",
    hidden: true,
    description: "",
    run: ({ rawArgs, print }) => {
      const what = rawArgs.trim().toLowerCase().replace(/\s+/g, " ");
      if (what === "hire ahmed" || what === "hire ahmed khaled") {
        print("[sudo] password for recruiter: ••••••••");
        print(
          "Permission granted. 🎉 Offer letter queued — the fastest way to send it is `email`.",
        );
        confetti();
        solveMystery("sudo");
        return;
      }
      print(`${what || "you"} is not in the sudoers file. This incident will be reported.`);
    },
  },
  {
    name: "submit",
    hidden: true,
    description: "",
    run: ({ args, print }) => {
      const answer = (args[0] ?? "").replace(/[^0-9]/g, "");
      if (!answer) {
        print("Usage: submit <answer>");
        return;
      }
      print(`Judging… test 1 … test 7 …`);
      if (fnv(answer) === "3f141389") {
        print("✅ ACCEPTED · 0.01s · 1 MB. Clean work.");
        solveMystery("problem");
      } else {
        print("❌ WRONG ANSWER on test 1. Read the statement again.");
      }
    },
  },
  {
    name: "color",
    description: "list | set <key> <#hex> | reset",
    run: runColor,
  },
  {
    name: "alias",
    description: "list | <name>=<command>   (e.g. alias ll=skills)",
    run: ({ rawArgs, print, state, actions }) => {
      if (!rawArgs || rawArgs.toLowerCase() === "list") {
        const names = Object.keys(state.aliases);
        if (!names.length) print("No aliases. Try: alias ll=skills");
        else for (const name of names) print(`  ${name} = ${state.aliases[name]}`);
        return;
      }
      const match = rawArgs.match(/^([a-zA-Z0-9_-]+)\s*=\s*(.+)$/);
      if (!match) {
        print("Usage: alias <name>=<command>");
        return;
      }
      const name = match[1].toLowerCase();
      const target = match[2].trim().toLowerCase();
      const next = { ...state.aliases, [name]: target };
      actions.setAliases(next);
      saveAliases(next);
      print(`alias ${name} → ${target}`);
    },
  },
  {
    name: "unalias",
    usage: "unalias <name>",
    description: "Remove an alias",
    run: ({ args, print, state, actions }) => {
      const name = (args[0] || "").toLowerCase();
      if (!name || !(name in state.aliases)) {
        print(`No such alias: ${name || "(none)"}`);
        return;
      }
      const next = { ...state.aliases };
      delete next[name];
      actions.setAliases(next);
      saveAliases(next);
      print(`Removed alias ${name}.`);
    },
  },
  {
    name: "clear",
    description: "Clear the terminal",
    run: () => ({ clearScreen: true, skipHistory: true }),
  },
  {
    name: "minimize",
    aliases: ["min"],
    description: "Minimize the terminal to the bottom bar",
    run: ({ print, actions }) => {
      print("Minimizing…");
      actions.minimize();
      return { skipHistory: true };
    },
  },
  {
    name: "exit",
    aliases: ["open"],
    description: "Close the terminal window",
    run: ({ print, actions }) => {
      print("Closing terminal window…");
      actions.close();
      return { skipHistory: true };
    },
  },
];

const byName = new Map<string, Command>();
for (const command of commands) {
  byName.set(command.name, command);
  for (const alias of command.aliases ?? []) byName.set(alias, command);
}

export function findCommand(name: string): Command | undefined {
  return byName.get(name);
}

/** Every name and alias, used for tab-completion. */
export const COMMAND_NAMES: readonly string[] = [...byName.entries()]
  .filter(([, c]) => !c.hidden)
  .map(([n]) => n);
