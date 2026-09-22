import { STORAGE_KEYS, readString, writeString } from "@/lib/storage";

export type Theme = "light" | "dark";

/** Fired on `window` whenever the theme changes, so every control stays in sync. */
export const THEME_EVENT = "themechange";

export function getStoredTheme(): Theme {
  const stored = readString(STORAGE_KEYS.theme);
  return stored === "light" || stored === "dark" ? stored : "dark";
}

/**
 * Applies the theme to the document, persists it, and notifies listeners.
 * This is the only place allowed to touch the `dark` class, so the nav-bar
 * toggle and the terminal's `theme` command can never disagree.
 */
export function applyTheme(theme: Theme): void {
  document.documentElement.classList.toggle("dark", theme === "dark");
  writeString(STORAGE_KEYS.theme, theme);
  window.dispatchEvent(new CustomEvent<Theme>(THEME_EVENT, { detail: theme }));
}

/** Flips the theme based on what is actually on the document, and returns it. */
export function toggleTheme(): Theme {
  const next: Theme = document.documentElement.classList.contains("dark") ? "light" : "dark";
  applyTheme(next);
  return next;
}

/**
 * Inline script that runs before hydration to avoid a flash of the wrong theme.
 * It is a plain string because it cannot import anything, but it reads the same
 * storage key as the rest of this module.
 */
export const themeInitScript = `(function(){try{var t=localStorage.getItem('${STORAGE_KEYS.theme}');document.documentElement.classList.toggle('dark',t!=='light');}catch(e){}})();`;
