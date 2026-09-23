import type { Project } from "@/data/profile";

/**
 * The lit edge a project carries: white for most, gold for the one that is
 * live in production. The deck and the project's dialog share it, so opening a
 * card keeps its colour.
 */
export function cardEdge(project: Project, strength: "rest" | "lifted" | "dialog") {
  const rgb = project.accent ? "251, 191, 36" : "255, 255, 255";
  const glow = { rest: 26, lifted: 46, dialog: 60 }[strength];
  const alpha = { rest: 0.34, lifted: 0.6, dialog: 0.5 }[strength];
  const border = { rest: 0.42, lifted: 0.75, dialog: 0.65 }[strength];
  const inner = { rest: 0.3, lifted: 0.5, dialog: 0.45 }[strength];
  return {
    borderColor: `rgba(${rgb}, ${border})`,
    boxShadow: `0 0 ${glow}px -6px rgba(${rgb}, ${alpha}), inset 0 1px 0 rgba(${rgb}, ${inner}), 0 20px 45px -22px rgba(0, 0, 0, 0.95)`,
  };
}
