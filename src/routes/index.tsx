import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { CommandBar } from "@/components/CommandBar";
import { CupGame } from "@/components/CupGame";
import { CustomCursor } from "@/components/CustomCursor";
import { MouseGlow } from "@/components/MouseGlow";
import { NavBar } from "@/components/NavBar";
import { RobotWorld } from "@/components/robots/RobotWorld";
import { SessionTimer } from "@/components/SessionTimer";
import { Starfield } from "@/components/Starfield";
import { Achievements } from "@/components/sections/Achievements";
import { Contact } from "@/components/sections/Contact";
import { Experience } from "@/components/sections/Experience";
import { Hero } from "@/components/sections/Hero";
import { Projects } from "@/components/sections/Projects";
import { SiteFooter } from "@/components/sections/SiteFooter";
import { Skills } from "@/components/sections/Skills";
import { Stats } from "@/components/sections/Stats";
import { Terminal, type TerminalMode } from "@/components/terminal/Terminal";
import { useGamingMode } from "@/hooks/useGamingMode";
import { useUsername } from "@/hooks/useUsername";
import { useVisitCount } from "@/hooks/useVisitCount";
import { STORAGE_KEYS, readString, writeString } from "@/lib/storage";

export const Route = createFileRoute("/")({
  component: Index,
});

/** Terminal window mode as persisted by the page, including the closed state. */
type WindowMode = TerminalMode | "closed";

const WINDOW_MODES: readonly WindowMode[] = ["float", "min", "closed"];

function isWindowMode(value: string | null): value is WindowMode {
  return value !== null && (WINDOW_MODES as readonly string[]).includes(value);
}

function Index() {
  const [termMode, setTermMode] = useState<WindowMode>(() => {
    const saved = readString(STORAGE_KEYS.termMode);
    // Anything unrecognised (including the removed "full" mode) falls back to closed.
    return isWindowMode(saved) ? saved : "closed";
  });
  const [mounted, setMounted] = useState(false);
  const gamingMode = useGamingMode();
  const terminalUser = useUsername();
  // Counts the page load itself, so a visit registers even if the terminal
  // is never opened. The hook is latched, so the terminal reads the same value.
  useVisitCount();

  useEffect(() => setMounted(true), []);

  const changeMode = (mode: WindowMode) => {
    writeString(STORAGE_KEYS.termMode, mode);
    setTermMode(mode);
  };

  return (
    <div className="relative min-h-screen bg-background text-foreground">
      {mounted && <Starfield />}
      {mounted && <MouseGlow />}
      {mounted && <CustomCursor />}
      {/* The walkway is the top edge of whatever bar is pinned to the bottom,
          so it is gone exactly while the terminal window is floating. */}
      {mounted && <RobotWorld walkway={termMode !== "float"} />}
      {mounted && termMode !== "closed" && (
        <Terminal
          mode={termMode}
          onClose={() => changeMode("closed")}
          onMinimize={() => changeMode("min")}
          onRestore={() => changeMode("float")}
        />
      )}

      <NavBar />
      {mounted && <SessionTimer />}

      <main id="top" className="relative z-10 max-w-5xl mx-auto px-6 pb-24">
        <Hero />
        <Stats />
        <Experience />
        {gamingMode && <CupGame />}
        <Projects />
        <Skills />
        <Achievements />
        <Contact />
        <SiteFooter />
      </main>

      {mounted && termMode === "closed" && (
        <CommandBar username={terminalUser} onOpen={() => changeMode("float")} />
      )}
    </div>
  );
}
