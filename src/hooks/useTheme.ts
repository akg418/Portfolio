import { useEffect, useState } from "react";
import { THEME_EVENT, type Theme, applyTheme, getStoredTheme, toggleTheme } from "@/lib/theme";

/**
 * Current theme, kept in sync with every other control on the page — including
 * the terminal's `theme` command — via the THEME_EVENT broadcast.
 *
 * `mounted` stays false during SSR and the first render so callers can avoid
 * rendering a toggle whose icon would not match the document.
 */
export function useTheme() {
  const [theme, setTheme] = useState<Theme>("dark");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const stored = getStoredTheme();
    setTheme(stored);
    applyTheme(stored);

    const onChange = (e: Event) => setTheme((e as CustomEvent<Theme>).detail);
    window.addEventListener(THEME_EVENT, onChange);
    return () => window.removeEventListener(THEME_EVENT, onChange);
  }, []);

  return { theme, mounted, toggle: toggleTheme };
}
