import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/hooks/useTheme";

export function ThemeToggle() {
  const { theme, mounted, toggle } = useTheme();

  if (!mounted) return null;

  return (
    <button
      onClick={toggle}
      aria-label="Toggle theme"
      className="h-9 w-9 inline-flex items-center justify-center rounded-md border border-border bg-card hover:bg-secondary transition-colors"
    >
      {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
    </button>
  );
}
