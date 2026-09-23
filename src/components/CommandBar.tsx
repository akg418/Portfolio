import { TerminalSquare } from "lucide-react";
import { profile } from "@/data/profile";

/** Bottom bar shown when the terminal is closed; clicking it reopens the window. */
export function CommandBar({ username, onOpen }: { username: string; onOpen: () => void }) {
  return (
    <button
      onClick={onOpen}
      className="dark fixed bottom-0 left-0 right-0 z-30 border-t border-border bg-background/80 backdrop-blur-md hover:bg-card/90 transition-colors group"
      aria-label="Open terminal"
    >
      <div className="max-w-5xl mx-auto px-6 h-11 flex items-center gap-3 font-mono text-xs text-muted-foreground">
        <TerminalSquare className="w-4 h-4 text-primary" />
        <span className="text-primary">
          {username}@{profile.domain}
        </span>
        <span>:~$</span>
        <span className="opacity-60 group-hover:opacity-100">
          type <span className="text-accent">command</span> to open terminal…
        </span>
        <span className="caret-blink ml-1 inline-block h-3 w-[7px] bg-primary" />
        <span className="ml-auto hidden sm:inline opacity-60">click anywhere on this bar</span>
      </div>
    </button>
  );
}
