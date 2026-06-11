import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";

type Item = { id: string; label: string };

const BASE_ITEMS: Item[] = [
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "contact", label: "Contact" },
];
const GAMING_ITEM: Item = { id: "game", label: "Gaming" };

export function NavBar() {
  const [active, setActive] = useState<string>("experience");
  const [hover, setHover] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const [gamingMode, setGamingMode] = useState(false);
  const itemRefs = useRef<Record<string, HTMLAnchorElement | null>>({});
  const containerRef = useRef<HTMLDivElement>(null);
  const [indicator, setIndicator] = useState({ left: 0, width: 0, opacity: 0 });

  // Insert "Gaming" right after Experience so it sits where the section appears.
  const items = useMemo<Item[]>(
    () => (gamingMode ? [BASE_ITEMS[0], GAMING_ITEM, ...BASE_ITEMS.slice(1)] : BASE_ITEMS),
    [gamingMode],
  );

  // Track gaming mode (initial + live updates from the terminal).
  useEffect(() => {
    try {
      setGamingMode(localStorage.getItem("gamingMode") !== "0");
    } catch {}
    const onGaming = (e: Event) => setGamingMode(!!(e as CustomEvent).detail);
    window.addEventListener("gamingmode", onGaming as EventListener);
    return () => window.removeEventListener("gamingmode", onGaming as EventListener);
  }, []);

  // Scroll progress + active section detection
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const total = h.scrollHeight - h.clientHeight;
      setProgress(total > 0 ? Math.min(1, Math.max(0, h.scrollTop / total)) : 0);

      // Find active section: the one whose top is closest to (but past) the header.
      const offset = 120;
      // Pick the section whose top is closest to (but not past) the offset,
      // independent of array order — so DOM position wins.
      let current = items[0].id;
      let bestTop = -Infinity;
      for (const it of items) {
        const el = document.getElementById(it.id);
        if (!el) continue;
        const top = el.getBoundingClientRect().top - offset;
        if (top <= 0 && top > bestTop) {
          bestTop = top;
          current = it.id;
        }
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [items]);

  // Move indicator to hover target, else active.
  useLayoutEffect(() => {
    const target = hover ?? active;
    const el = itemRefs.current[target];
    const wrap = containerRef.current;
    if (!el || !wrap) return;
    const a = el.getBoundingClientRect();
    const b = wrap.getBoundingClientRect();
    setIndicator({ left: a.left - b.left, width: a.width, opacity: 1 });
  }, [hover, active, items]);

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/70 backdrop-blur-md">
      <nav className="mx-auto flex h-16 max-w-5xl items-center justify-between px-6">
        <a href="#top" className="font-mono text-sm font-semibold tracking-tight">
          ahmed<span className="text-muted-foreground">.dev</span>
        </a>
        <div
          ref={containerRef}
          className="relative hidden items-center gap-1 sm:flex"
          onMouseLeave={() => setHover(null)}
        >
          {/* Animated indicator */}
          <span
            aria-hidden
            className="pointer-events-none absolute top-1/2 -translate-y-1/2 rounded-md border border-primary/50 bg-primary/10"
            style={{
              left: indicator.left,
              width: indicator.width,
              height: 32,
              opacity: indicator.opacity,
              transition:
                "left 750ms cubic-bezier(0.22, 1, 0.36, 1), width 750ms cubic-bezier(0.22, 1, 0.36, 1), opacity 250ms",
              boxShadow: "0 0 18px color-mix(in oklab, var(--color-primary) 40%, transparent)",
            }}
          />
          {items.map((it) => (
            <a
              key={it.id}
              href={`#${it.id}`}
              ref={(el) => {
                itemRefs.current[it.id] = el;
              }}
              onMouseEnter={() => setHover(it.id)}
              className={`relative z-10 rounded-md px-3 py-1.5 text-sm transition-colors ${
                active === it.id ? "text-foreground" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {it.label}
            </a>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Button asChild size="sm" variant="outline">
            <a href="mailto:ahmedkhaledgomaa404@gmail.com">
              <Mail />
              <span className="hidden sm:inline">Get in touch</span>
            </a>
          </Button>
        </div>
      </nav>
      {/* Scroll progress bar */}
      <div className="h-[2px] w-full bg-transparent">
        <div
          className="h-full origin-left bg-gradient-to-r from-primary via-accent to-primary"
          style={{
            transform: `scaleX(${progress})`,
            transformOrigin: "left",
            transition: "transform 80ms linear",
            boxShadow: "0 0 10px color-mix(in oklab, var(--color-primary) 50%, transparent)",
          }}
        />
      </div>
    </header>
  );
}