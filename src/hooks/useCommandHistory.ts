import { useRef } from "react";

/**
 * Shell-style ↑/↓ history. Entries move between a back and a forward stack so
 * that walking up and then down returns to where the visitor started.
 */
export function useCommandHistory() {
  const back = useRef<string[]>([]);
  const forward = useRef<string[]>([]);

  return {
    /** Records a submitted command as the most recent entry. */
    push(entry: string) {
      while (forward.current.length) back.current.push(forward.current.pop()!);
      back.current.push(entry);
    },
    /** Previous entry, or undefined at the start of history. */
    previous(current: string): string | undefined {
      if (!back.current.length) return undefined;
      forward.current.push(current);
      return back.current.pop();
    },
    /** Next entry, or undefined at the end of history. */
    next(current: string): string | undefined {
      if (!forward.current.length) return undefined;
      back.current.push(current);
      return forward.current.pop();
    },
  };
}
