import { useEffect, useRef } from "react";

/**
 * A photo redrawn as live ASCII art by a fragment shader.
 *
 * The frame is split into a grid of character cells. For every pixel the
 * shader finds its cell, samples the photo at the cell's centre, turns that
 * brightness into one of a ramp of characters, and reads the glyph out of a
 * font atlas texture, tinted with the photo's own colour. So it is one draw
 * call for thousands of characters.
 *
 * On top of that:
 * - it decodes in when it first scrolls into view, a sweep of flickering
 *   random glyphs settling row by row;
 * - the pointer sends ripples through the characters, and inside a soft lens
 *   around it the real photo shows through;
 * - now and then a glitch shoves a band of rows sideways.
 *
 * Decoration only: it needs WebGL, it pauses off screen, and with reduced
 * motion it renders one still frame.
 */

/** Dark to bright. The first is a space, so the darkest cells are empty. */
const RAMP = " .,:;-=+*oxO#%@";
const GLYPH_PX = 48;
const CELL_CSS_PX = 7;
const REVEAL_MS = 1600;
const MAX_DPR = 2;

const VERT = `
attribute vec2 aPos;
varying vec2 vUv;
void main() {
  vUv = aPos * 0.5 + 0.5;
  gl_Position = vec4(aPos, 0.0, 1.0);
}`;

const FRAG = `
precision highp float;
varying vec2 vUv;
uniform sampler2D uImage;
uniform sampler2D uAtlas;
uniform vec2 uCells;
uniform vec2 uCover;   // scale of the photo inside the frame, for object-fit: cover
uniform vec2 uMouse;   // 0-1, y up; far away when absent
uniform float uAspect; // frame width / height
uniform float uTime;
uniform float uReveal; // 0 → 1 as it decodes in
uniform float uGlitch; // 0 → 1 while a glitch band is active
uniform float uGlitchY;
uniform float uGlyphs;

float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

vec2 cover(vec2 uv) { return (uv - 0.5) * uCover + 0.5; }

void main() {
  vec2 uv = vUv;

  // A glitch shoves a band of rows sideways.
  float band = step(abs(uv.y - uGlitchY), 0.035) * uGlitch;
  uv.x += band * (hash(vec2(floor(uv.y * uCells.y), floor(uTime * 20.0))) - 0.5) * 0.12;

  vec2 cell = floor(uv * uCells);
  vec2 inCell = fract(uv * uCells);
  vec2 centre = (cell + 0.5) / uCells;

  vec2 photoUv = cover(vec2(centre.x, 1.0 - centre.y));
  vec3 photo = texture2D(uImage, photoUv).rgb;
  float lum = dot(photo, vec3(0.299, 0.587, 0.114));
  // Lift the contrast, so the ramp is used end to end.
  lum = clamp((lum - 0.08) * 1.35, 0.0, 1.0);

  // Ripples spreading out from the pointer.
  vec2 d = uv - uMouse;
  d.x *= uAspect;
  float dist = length(d);
  lum += sin(dist * 55.0 - uTime * 7.0) * 0.22 * exp(-dist * 7.0);

  // Decode in: rows below the sweep line are still random, flickering glyphs.
  // The sweep runs past the bottom row, so every cell has settled by the end.
  float settled = step(hash(cell) * 0.25, uReveal * 1.5 - (1.0 - centre.y) * 1.2);
  float noise = hash(cell + floor(uTime * 18.0));
  lum = mix(noise, lum, settled);

  float index = floor(clamp(lum, 0.0, 0.999) * uGlyphs);
  vec2 atlasUv = vec2((index + inCell.x) / uGlyphs, 1.0 - inCell.y);
  float ink = texture2D(uAtlas, atlasUv).a;

  // Glyphs take the photo's colour, brightened; unsettled ones glow cyan.
  vec3 tint = mix(vec3(0.3, 0.9, 1.0), min(photo * 1.6 + 0.12, 1.0), settled);
  vec3 ascii = tint * ink;
  float alpha = ink * (0.35 + 0.65 * settled);

  // The lens: inside it the real photo shows through.
  float lens = (1.0 - smoothstep(0.1, 0.17, dist)) * uReveal;
  vec3 real = texture2D(uImage, cover(vec2(uv.x, 1.0 - uv.y))).rgb;
  vec3 color = mix(ascii, real, lens);
  alpha = mix(alpha, 1.0, lens);

  // A ring at the lens edge.
  float ring = smoothstep(0.012, 0.0, abs(dist - 0.17)) * uReveal;
  color += vec3(0.3, 0.9, 1.0) * ring * 0.8;
  alpha = max(alpha, ring * 0.8);

  gl_FragColor = vec4(color * alpha, alpha);
}`;

function makeAtlas(): HTMLCanvasElement {
  const c = document.createElement("canvas");
  c.width = GLYPH_PX * RAMP.length;
  c.height = GLYPH_PX;
  const g = c.getContext("2d")!;
  g.fillStyle = "#fff";
  g.textAlign = "center";
  g.textBaseline = "middle";
  g.font = `bold ${Math.round(GLYPH_PX * 0.92)}px ui-monospace, SFMono-Regular, Menlo, monospace`;
  for (let i = 0; i < RAMP.length; i++) {
    g.fillText(RAMP[i], i * GLYPH_PX + GLYPH_PX / 2, GLYPH_PX * 0.54);
  }
  return c;
}

function texture(gl: WebGLRenderingContext, source: TexImageSource) {
  const t = gl.createTexture()!;
  gl.bindTexture(gl.TEXTURE_2D, t);
  gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, false);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, source);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  return t;
}

export function AsciiPortrait({ src, className }: { src: string; className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const gl = canvas.getContext("webgl", { premultipliedAlpha: true, antialias: false });
    if (!gl) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const compile = (type: number, source: string) => {
      const s = gl.createShader(type)!;
      gl.shaderSource(s, source);
      gl.compileShader(s);
      if (!gl.getShaderParameter(s, gl.COMPILE_STATUS))
        throw new Error(gl.getShaderInfoLog(s) ?? "");
      return s;
    };
    const program = gl.createProgram()!;
    try {
      gl.attachShader(program, compile(gl.VERTEX_SHADER, VERT));
      gl.attachShader(program, compile(gl.FRAGMENT_SHADER, FRAG));
      gl.bindAttribLocation(program, 0, "aPos");
      gl.linkProgram(program);
      if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return;
    } catch {
      return;
    }
    gl.useProgram(program);
    const u = (name: string) => gl.getUniformLocation(program, name);

    gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
    gl.enableVertexAttribArray(0);
    gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);

    let imageAspect = 1;
    let ready = false;
    let cancelled = false;
    let raf = 0;
    let visible = false;
    let revealStart = -1;
    let mouse = { x: -10, y: -10 };
    let target = { x: -10, y: -10 };
    let glitchUntil = 0;
    let glitchY = 0.5;
    let nextGlitch = performance.now() + 3000;

    gl.activeTexture(gl.TEXTURE1);
    texture(gl, makeAtlas());
    gl.uniform1i(u("uAtlas"), 1);
    gl.uniform1f(u("uGlyphs"), RAMP.length);

    const size = () => {
      const dpr = Math.min(MAX_DPR, window.devicePixelRatio || 1);
      const w = Math.max(1, Math.round(canvas.clientWidth * dpr));
      const h = Math.max(1, Math.round(canvas.clientHeight * dpr));
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
      }
      gl.viewport(0, 0, w, h);
      const aspect = canvas.clientWidth / Math.max(1, canvas.clientHeight);
      gl.uniform2f(
        u("uCells"),
        Math.round(canvas.clientWidth / CELL_CSS_PX),
        Math.round(canvas.clientHeight / (CELL_CSS_PX * 1.25)),
      );
      gl.uniform1f(u("uAspect"), aspect);
      // object-fit: cover — the photo overflows along its longer side.
      gl.uniform2f(
        u("uCover"),
        aspect > imageAspect ? 1 : aspect / imageAspect,
        aspect > imageAspect ? imageAspect / aspect : 1,
      );
    };

    const render = (now: number) => {
      if (!ready) return;
      size();
      mouse.x += (target.x - mouse.x) * 0.18;
      mouse.y += (target.y - mouse.y) * 0.18;
      const reveal = reduce
        ? 1
        : revealStart < 0
          ? 0
          : Math.min(1, (now - revealStart) / REVEAL_MS);
      if (!reduce && now > nextGlitch) {
        glitchUntil = now + 180;
        glitchY = 0.1 + Math.random() * 0.8;
        nextGlitch = now + 3500 + Math.random() * 5000;
      }
      gl.uniform2f(u("uMouse"), mouse.x, mouse.y);
      gl.uniform1f(u("uTime"), reduce ? 0 : now / 1000);
      gl.uniform1f(u("uReveal"), reveal);
      gl.uniform1f(u("uGlitch"), now < glitchUntil ? 1 : 0);
      gl.uniform1f(u("uGlitchY"), glitchY);
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    };

    const frame = (now: number) => {
      raf = requestAnimationFrame(frame);
      if (!visible || document.hidden) return;
      render(now);
    };

    const img = new Image();
    img.decoding = "async";
    img.onload = () => {
      if (cancelled) return;
      imageAspect = img.naturalWidth / img.naturalHeight;
      gl.activeTexture(gl.TEXTURE0);
      texture(gl, img);
      gl.uniform1i(u("uImage"), 0);
      ready = true;
      if (reduce) render(performance.now());
      else raf = requestAnimationFrame(frame);
    };
    img.src = src;

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible && revealStart < 0) revealStart = performance.now();
    });
    io.observe(canvas);

    const aim = (clientX: number, clientY: number) => {
      const r = canvas.getBoundingClientRect();
      const inside =
        clientX >= r.left && clientX <= r.right && clientY >= r.top && clientY <= r.bottom;
      target = inside
        ? { x: (clientX - r.left) / r.width, y: 1 - (clientY - r.top) / r.height }
        : { x: -10, y: -10 };
      // Jump rather than glide when entering, so the lens does not fly in from afar.
      if (inside && mouse.x < -1) mouse = { ...target };
    };
    const onPointerMove = (e: PointerEvent) => aim(e.clientX, e.clientY);
    const onTouchMove = (e: TouchEvent) => {
      const t = e.touches[0];
      if (t) aim(t.clientX, t.clientY);
    };
    const onTouchEnd = () => {
      target = { x: -10, y: -10 };
    };
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("touchend", onTouchEnd, { passive: true });

    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
      gl.getExtension("WEBGL_lose_context")?.loseContext();
    };
  }, [src]);

  return <canvas ref={canvasRef} aria-hidden className={className} />;
}
