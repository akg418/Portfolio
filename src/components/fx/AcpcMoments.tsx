import { useEffect, useRef, useState } from "react";
import { Download, Pause, Play } from "lucide-react";
import { ContestBalloons, PARTY_EVENT } from "@/components/fx/ContestBalloons";
import music from "@/assets/acpc/acpc-music.mp3";
import group from "@/assets/acpc/group.jpg";
import firstToSolve from "@/assets/acpc/ecpc-first-to-solve.jpg";
import atDesk from "@/assets/acpc/team-at-desk.jpg";
import withCoach from "@/assets/acpc/team-with-coach.jpg";
import hearts from "@/assets/acpc/team-hearts.jpg";
import thumbsUp from "@/assets/acpc/thumbs-up.jpg";
import selfieDay from "@/assets/acpc/selfie-day.jpg";
import selfieNight from "@/assets/acpc/selfie-night.jpg";

const MOMENTS = [
  { src: group, alt: "The team at the ACPC Africa & Arab Championship" },
  { src: firstToSolve, alt: "First to solve at ECPC" },
  { src: withCoach, alt: "At our desk at the ACPC finals, with our coach" },
  { src: atDesk, alt: "The team at our ECPC desk" },
  { src: hearts, alt: "Between problems at the finals" },
  { src: thumbsUp, alt: "Thumbs up at ACPC" },
  { src: selfieDay, alt: "ACPC, before the contest" },
  { src: selfieNight, alt: "The night after, with the whole crew" },
];

const IDLE_SLIDE_MS = 6000;
/** The track auto-starts the first time the section is seen, once per session. */
const AUTOPLAYED_KEY = "acpc-autoplayed";
const PLAY_SLIDE_MS = 5000;
const BARS = 14;

function time(s: number) {
  if (!Number.isFinite(s)) return "0:00";
  const m = Math.floor(s / 60);
  return `${m}:${String(Math.floor(s % 60)).padStart(2, "0")}`;
}

/**
 * The balloons, with the contest behind them. The photos drift past behind
 * the bunch, blurred and dim, and the balloons always stay in front to play
 * with. Press play and the music starts: the blur eases off, the photos cycle
 * faster with a slow zoom that swells with the bass, and an equaliser dances
 * by the controls. Pause it, or let it finish, and the blur settles back. The
 * track can be downloaded.
 *
 * The beat is read live from the audio through a Web Audio analyser, set up on
 * the first play (browsers only allow audio to start from a click).
 */
export function AcpcMoments() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const barsRef = useRef<HTMLCanvasElement>(null);
  const photosRef = useRef<HTMLDivElement>(null);
  const analyser = useRef<AnalyserNode | null>(null);
  const [playing, setPlaying] = useState(false);
  const [slide, setSlide] = useState(0);
  const [now, setNow] = useState(0);
  const [duration, setDuration] = useState(0);

  // The metadata can load before hydration attaches the listeners, so the
  // duration is also read once the element is mounted.
  useEffect(() => {
    const a = audioRef.current;
    if (a && a.readyState >= 1) setDuration(a.duration);
  }, []);

  // Advance the slides: slowly at rest, faster while the music plays.
  useEffect(() => {
    const id = window.setInterval(
      () => setSlide((i) => (i + 1) % MOMENTS.length),
      playing ? PLAY_SLIDE_MS : IDLE_SLIDE_MS,
    );
    return () => window.clearInterval(id);
  }, [playing]);

  // While playing: the equaliser, and the bass swelling the photo.
  useEffect(() => {
    if (!playing) {
      photosRef.current?.style.setProperty("--beat", "0");
      return;
    }
    const canvas = barsRef.current;
    const ctx = canvas?.getContext("2d");
    const data = new Uint8Array(analyser.current?.frequencyBinCount ?? 32);
    let raf = 0;
    const draw = () => {
      raf = requestAnimationFrame(draw);
      const a = analyser.current;
      if (!a || !canvas || !ctx) return;
      a.getByteFrequencyData(data);
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      if (canvas.width !== Math.round(w * dpr)) {
        canvas.width = Math.round(w * dpr);
        canvas.height = Math.round(h * dpr);
      }
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);
      const bw = w / BARS;
      const grad = ctx.createLinearGradient(0, h, 0, 0);
      grad.addColorStop(0, "#22d3ee");
      grad.addColorStop(1, "#a855f7");
      ctx.fillStyle = grad;
      for (let i = 0; i < BARS; i++) {
        // Lower bins carry most of the energy; spread the bars over the useful range.
        const v = data[Math.floor((i / BARS) * data.length * 0.7)] / 255;
        const bh = Math.max(2, v * h);
        ctx.fillRect(i * bw + 1.5, h - bh, bw - 3, bh);
      }
      const bass = (data[0] + data[1] + data[2]) / (3 * 255);
      photosRef.current?.style.setProperty("--beat", bass.toFixed(3));
    };
    raf = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(raf);
  }, [playing]);

  const toggle = async () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (!audio.paused) {
      audio.pause();
      return;
    }
    // The analyser can only be wired once per element, and only after a click.
    if (!analyser.current) {
      try {
        const Ctx =
          window.AudioContext ??
          (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        const ac = new Ctx();
        const source = ac.createMediaElementSource(audio);
        const an = ac.createAnalyser();
        an.fftSize = 64;
        an.smoothingTimeConstant = 0.8;
        source.connect(an);
        an.connect(ac.destination);
        analyser.current = an;
        await ac.resume();
      } catch {
        /* no Web Audio: it still plays, just without the equaliser */
      }
    }
    try {
      await audio.play();
    } catch {
      setPlaying(false);
    }
  };

  // A vehicle crashed the party: the track runs fast for a few seconds.
  useEffect(() => {
    let timer = 0;
    const on = () => {
      const audio = audioRef.current;
      if (!audio) return;
      audio.playbackRate = 1.6;
      window.clearTimeout(timer);
      timer = window.setTimeout(() => {
        audio.playbackRate = 1;
      }, 4000);
    };
    window.addEventListener(PARTY_EVENT, on);
    return () => {
      window.removeEventListener(PARTY_EVENT, on);
      window.clearTimeout(timer);
    };
  }, []);

  const toggleRef = useRef(toggle);
  toggleRef.current = toggle;
  const anchorRef = useRef<HTMLSpanElement>(null);

  /**
   * The first time the section comes into view (once per session), the track
   * starts on its own. Browsers only allow sound after the visitor has
   * interacted with the page, so if they have not yet, it starts on their
   * first click or key press while the section is still on screen.
   */
  useEffect(() => {
    const anchor = anchorRef.current;
    const audio = audioRef.current;
    if (!anchor || !audio) return;
    try {
      if (sessionStorage.getItem(AUTOPLAYED_KEY) === "1") return;
    } catch {
      /* no session storage: just try */
    }
    let inView = false;
    let pending = false;
    let done = false;
    const finish = () => {
      done = true;
      pending = false;
      try {
        sessionStorage.setItem(AUTOPLAYED_KEY, "1");
      } catch {
        /* fine */
      }
      window.removeEventListener("pointerdown", onGesture, true);
      window.removeEventListener("keydown", onGesture, true);
      io.disconnect();
    };
    const tryPlay = () => {
      if (done) return;
      // Someone already pressed play or pause themselves: leave it alone.
      if (!audio.paused || audio.currentTime > 0) return finish();
      const activated = navigator.userActivation?.hasBeenActive ?? true;
      if (!activated) {
        pending = true;
        return;
      }
      finish();
      void toggleRef.current();
    };
    const onGesture = () => {
      if (pending && inView) setTimeout(tryPlay, 0);
    };
    const io = new IntersectionObserver(
      ([e]) => {
        inView = e.isIntersecting;
        if (inView) tryPlay();
      },
      { threshold: 0.6 },
    );
    io.observe(anchor);
    window.addEventListener("pointerdown", onGesture, true);
    window.addEventListener("keydown", onGesture, true);
    return () => {
      io.disconnect();
      window.removeEventListener("pointerdown", onGesture, true);
      window.removeEventListener("keydown", onGesture, true);
    };
  }, []);

  const seek = (e: React.MouseEvent<HTMLDivElement>) => {
    const audio = audioRef.current;
    if (!audio || !duration) return;
    const r = e.currentTarget.getBoundingClientRect();
    audio.currentTime = ((e.clientX - r.left) / r.width) * duration;
  };

  const backdrop = (
    <>
      <div
        ref={photosRef}
        aria-hidden={!playing}
        className="absolute inset-0 transition-[filter] duration-1000"
        style={{
          // Always behind the balloons; the music only clears the blur a little.
          filter: playing
            ? "blur(2.5px) brightness(0.68) saturate(1.2)"
            : "blur(7px) brightness(0.42) saturate(1.15)",
        }}
      >
        {MOMENTS.map((m, i) => (
          <img
            key={m.src}
            src={m.src}
            alt={playing && i === slide ? m.alt : ""}
            draggable={false}
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover transition-[opacity,transform] ease-out"
            style={{
              opacity: i === slide ? 1 : 0,
              // A slow zoom while it is on, swelling with the bass.
              transform: `scale(calc(${i === slide ? 1.12 : 1.04} + var(--beat, 0) * 0.04))`,
              transitionDuration: `1200ms, ${playing ? PLAY_SLIDE_MS : IDLE_SLIDE_MS}ms`,
            }}
          />
        ))}
      </div>
      {/* Outside the filtered layer, so the caption stays sharp. */}
      <div
        className="absolute inset-x-0 bottom-0 flex items-end justify-between bg-gradient-to-t from-black/70 to-transparent p-3 font-mono text-[11px] text-white transition-opacity duration-700"
        style={{ opacity: playing ? 1 : 0 }}
      >
        <span>{MOMENTS[slide].alt}</span>
        <span className="opacity-70">
          {slide + 1}/{MOMENTS.length}
        </span>
      </div>
    </>
  );

  const controls = (
    <div className="mt-3 flex items-center gap-3 rounded-xl border border-border bg-card/60 p-2 backdrop-blur-sm">
      <button
        type="button"
        onClick={toggle}
        aria-label={playing ? "Pause the ACPC track" : "Play the ACPC track"}
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground transition-transform hover:scale-105 active:scale-95"
      >
        {playing ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4 translate-x-[1px]" />}
      </button>
      <div className="min-w-0 flex-1">
        <div className="mb-1 flex justify-between font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
          <span className="truncate">{playing ? "Now playing · ACPC" : "Play the ACPC track"}</span>
          <span className="tabular-nums">
            {time(now)} / {time(duration)}
          </span>
        </div>
        <div
          onClick={seek}
          role="presentation"
          className="group relative h-1.5 cursor-pointer overflow-hidden rounded-full bg-border"
        >
          <div
            className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-primary to-accent"
            style={{ width: duration ? `${(now / duration) * 100}%` : "0%" }}
          />
        </div>
      </div>
      <canvas
        ref={barsRef}
        aria-hidden
        className="hidden h-8 w-24 shrink-0 transition-opacity duration-500 sm:block"
        style={{ opacity: playing ? 1 : 0.15 }}
      />
      <a
        href={music}
        download="acpc-music.mp3"
        aria-label="Download the ACPC track"
        title="Download the track"
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-primary/60 hover:text-primary"
      >
        <Download className="h-4 w-4" />
      </a>
      <audio
        ref={audioRef}
        src={music}
        preload="metadata"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onEnded={(e) => {
          e.currentTarget.currentTime = 0;
          setPlaying(false);
          setNow(0);
        }}
        onTimeUpdate={(e) => setNow(e.currentTarget.currentTime)}
        onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
        onDurationChange={(e) => setDuration(e.currentTarget.duration)}
      />
    </div>
  );

  return (
    <div className="relative">
      {/* What "in view" is measured against: the balloon box. */}
      <span
        ref={anchorRef}
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[280px]"
      />
      <ContestBalloons backdrop={backdrop} controls={controls} />
    </div>
  );
}
