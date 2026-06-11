import { useEffect, useState } from "react";

export function Typewriter({
  words,
  className,
  speed = 80,
  pause = 1400,
}: {
  words: string[];
  className?: string;
  speed?: number;
  pause?: number;
}) {
  const [mounted, setMounted] = useState(false);
  const [i, setI] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!mounted) return;
    const current = words[i % words.length];
    const done = !deleting && text === current;
    const cleared = deleting && text === "";
    const delay = done ? pause : cleared ? 300 : deleting ? speed / 2 : speed;
    const t = setTimeout(() => {
      if (done) setDeleting(true);
      else if (cleared) {
        setDeleting(false);
        setI((v) => v + 1);
      } else {
        setText(
          deleting ? current.slice(0, text.length - 1) : current.slice(0, text.length + 1),
        );
      }
    }, delay);
    return () => clearTimeout(t);
  }, [text, deleting, i, mounted, words, speed, pause]);

  return (
    <span className={className}>
      {mounted ? text : words[0]}
      <span className="caret-blink ml-1 inline-block h-[1em] w-[2px] -mb-1 bg-primary align-middle" />
    </span>
  );
}