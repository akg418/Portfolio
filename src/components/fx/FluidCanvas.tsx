import { useEffect, useRef } from "react";

/**
 * Glowing ink stirred by the pointer: a real-time fluid simulation on the GPU.
 *
 * It is the classic stable-fluids solver, run as a chain of WebGL2 fragment
 * shaders over floating-point textures, one full pass per step:
 *
 *   curl → vorticity confinement → divergence → pressure (Jacobi) →
 *   subtract pressure gradient → advect velocity → advect dye → draw
 *
 * Velocity and pressure live on a coarse grid; the dye that you actually see
 * lives on a finer one. Pointer movement "splats" velocity and dye into the
 * field, and a few ambient splats keep it alive when nobody is touching it.
 *
 * Decoration only. It does nothing without WebGL2 and renderable half-float
 * textures, with reduced motion, or while it is scrolled out of view.
 */

const SIM_RES = 128;
const DYE_RES_DESKTOP = 512;
const DYE_RES_MOBILE = 256;
const DENSITY_DISSIPATION = 1.4;
const VELOCITY_DISSIPATION = 0.4;
const PRESSURE_DECAY = 0.8;
const PRESSURE_ITERATIONS = 20;
const CURL = 22;
const SPLAT_RADIUS = 0.22 / 100;
const SPLAT_FORCE = 5000;
const DYE_INTENSITY = 0.12;
const MAX_DPR = 1.5;

/** Cyan and violet, the site's primary and accent. */
const PALETTE: [number, number, number][] = [
  [0.0, 0.78, 0.92],
  [0.68, 0.32, 1.0],
  [0.25, 0.55, 1.0],
];

const VERT = `#version 300 es
precision highp float;
in vec2 aPosition;
out vec2 vUv, vL, vR, vT, vB;
uniform vec2 texelSize;
void main() {
  vUv = aPosition * 0.5 + 0.5;
  vL = vUv - vec2(texelSize.x, 0.0);
  vR = vUv + vec2(texelSize.x, 0.0);
  vT = vUv + vec2(0.0, texelSize.y);
  vB = vUv - vec2(0.0, texelSize.y);
  gl_Position = vec4(aPosition, 0.0, 1.0);
}`;

const HEAD = `#version 300 es
precision highp float;
precision highp sampler2D;
in vec2 vUv, vL, vR, vT, vB;
out vec4 o;
`;

const FRAG = {
  clear: `${HEAD}
uniform sampler2D uTexture; uniform float value;
void main() { o = value * texture(uTexture, vUv); }`,

  splat: `${HEAD}
uniform sampler2D uTarget; uniform float aspectRatio; uniform vec3 color;
uniform vec2 point; uniform float radius;
void main() {
  vec2 p = vUv - point; p.x *= aspectRatio;
  vec3 s = exp(-dot(p, p) / radius) * color;
  o = vec4(texture(uTarget, vUv).xyz + s, 1.0);
}`,

  advection: `${HEAD}
uniform sampler2D uVelocity, uSource; uniform vec2 velTexel;
uniform float dt, dissipation;
void main() {
  vec2 coord = vUv - dt * texture(uVelocity, vUv).xy * velTexel;
  o = texture(uSource, coord) / (1.0 + dissipation * dt);
  o.a = 1.0;
}`,

  divergence: `${HEAD}
uniform sampler2D uVelocity;
void main() {
  float L = texture(uVelocity, vL).x, R = texture(uVelocity, vR).x;
  float T = texture(uVelocity, vT).y, B = texture(uVelocity, vB).y;
  vec2 C = texture(uVelocity, vUv).xy;
  // Solid walls: reflect velocity at the edges.
  if (vL.x < 0.0) L = -C.x; if (vR.x > 1.0) R = -C.x;
  if (vT.y > 1.0) T = -C.y; if (vB.y < 0.0) B = -C.y;
  o = vec4(0.5 * (R - L + T - B), 0.0, 0.0, 1.0);
}`,

  curl: `${HEAD}
uniform sampler2D uVelocity;
void main() {
  float L = texture(uVelocity, vL).y, R = texture(uVelocity, vR).y;
  float T = texture(uVelocity, vT).x, B = texture(uVelocity, vB).x;
  o = vec4(0.5 * (R - L - T + B), 0.0, 0.0, 1.0);
}`,

  vorticity: `${HEAD}
uniform sampler2D uVelocity, uCurl; uniform float curl, dt;
void main() {
  float L = texture(uCurl, vL).x, R = texture(uCurl, vR).x;
  float T = texture(uCurl, vT).x, B = texture(uCurl, vB).x;
  float C = texture(uCurl, vUv).x;
  vec2 force = 0.5 * vec2(abs(T) - abs(B), abs(R) - abs(L));
  force /= length(force) + 0.0001;
  force *= curl * C; force.y *= -1.0;
  vec2 v = texture(uVelocity, vUv).xy + force * dt;
  o = vec4(clamp(v, -1000.0, 1000.0), 0.0, 1.0);
}`,

  pressure: `${HEAD}
uniform sampler2D uPressure, uDivergence;
void main() {
  float L = texture(uPressure, vL).x, R = texture(uPressure, vR).x;
  float T = texture(uPressure, vT).x, B = texture(uPressure, vB).x;
  float div = texture(uDivergence, vUv).x;
  o = vec4((L + R + B + T - div) * 0.25, 0.0, 0.0, 1.0);
}`,

  gradientSubtract: `${HEAD}
uniform sampler2D uPressure, uVelocity;
void main() {
  float L = texture(uPressure, vL).x, R = texture(uPressure, vR).x;
  float T = texture(uPressure, vT).x, B = texture(uPressure, vB).x;
  vec2 v = texture(uVelocity, vUv).xy - vec2(R - L, T - B);
  o = vec4(v, 0.0, 1.0);
}`,

  // Transparent where there is no ink, so the page shows through.
  display: `${HEAD}
uniform sampler2D uTexture;
void main() {
  vec3 c = min(texture(uTexture, vUv).rgb, vec3(1.0));
  float a = max(c.r, max(c.g, c.b));
  o = vec4(c, a);
}`,
} as const;

type ProgramName = keyof typeof FRAG;
type Program = { program: WebGLProgram; uniforms: Record<string, WebGLUniformLocation> };
type Fbo = { texture: WebGLTexture; fbo: WebGLFramebuffer; w: number; h: number };
type DoubleFbo = { read: Fbo; write: Fbo; swap: () => void; w: number; h: number };

function compile(gl: WebGL2RenderingContext, type: number, src: string) {
  const s = gl.createShader(type)!;
  gl.shaderSource(s, src);
  gl.compileShader(s);
  if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(s) ?? "");
  return s;
}

function link(gl: WebGL2RenderingContext, vs: WebGLShader, fsSrc: string): Program {
  const program = gl.createProgram()!;
  gl.attachShader(program, vs);
  gl.attachShader(program, compile(gl, gl.FRAGMENT_SHADER, fsSrc));
  gl.bindAttribLocation(program, 0, "aPosition");
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS))
    throw new Error(gl.getProgramInfoLog(program) ?? "");
  const uniforms: Record<string, WebGLUniformLocation> = {};
  const count = gl.getProgramParameter(program, gl.ACTIVE_UNIFORMS) as number;
  for (let i = 0; i < count; i++) {
    const name = gl.getActiveUniform(program, i)!.name;
    uniforms[name] = gl.getUniformLocation(program, name)!;
  }
  return { program, uniforms };
}

function createFbo(gl: WebGL2RenderingContext, w: number, h: number): Fbo {
  const texture = gl.createTexture()!;
  gl.bindTexture(gl.TEXTURE_2D, texture);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA16F, w, h, 0, gl.RGBA, gl.HALF_FLOAT, null);
  const fbo = gl.createFramebuffer()!;
  gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
  gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture, 0);
  if (gl.checkFramebufferStatus(gl.FRAMEBUFFER) !== gl.FRAMEBUFFER_COMPLETE)
    throw new Error("half-float framebuffer not renderable");
  gl.viewport(0, 0, w, h);
  gl.clearColor(0, 0, 0, 1);
  gl.clear(gl.COLOR_BUFFER_BIT);
  return { texture, fbo, w, h };
}

function createDouble(gl: WebGL2RenderingContext, w: number, h: number): DoubleFbo {
  const d = {
    read: createFbo(gl, w, h),
    write: createFbo(gl, w, h),
    w,
    h,
    swap() {
      [d.read, d.write] = [d.write, d.read];
    },
  };
  return d;
}

/** Grid size for a target resolution, keeping the canvas aspect ratio. */
function gridFor(res: number, w: number, h: number) {
  const aspect = w > h ? w / h : h / w;
  const min = Math.round(res);
  const max = Math.round(res * aspect);
  return w > h ? { w: max, h: min } : { w: min, h: max };
}

export function FluidCanvas({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const gl = canvas.getContext("webgl2", {
      alpha: true,
      premultipliedAlpha: true,
      antialias: false,
      depth: false,
      stencil: false,
    });
    if (!gl || !gl.getExtension("EXT_color_buffer_float")) return;

    let programs: Record<ProgramName, Program>;
    try {
      const vs = compile(gl, gl.VERTEX_SHADER, VERT);
      programs = Object.fromEntries(
        (Object.keys(FRAG) as ProgramName[]).map((k) => [k, link(gl, vs, FRAG[k])]),
      ) as Record<ProgramName, Program>;
    } catch {
      return;
    }

    // One full-screen quad, drawn by every pass.
    gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, -1, 1, 1, 1, 1, -1]), gl.STATIC_DRAW);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, gl.createBuffer());
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array([0, 1, 2, 0, 2, 3]), gl.STATIC_DRAW);
    gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(0);

    const blit = (target: Fbo | null) => {
      if (target) {
        gl.viewport(0, 0, target.w, target.h);
        gl.bindFramebuffer(gl.FRAMEBUFFER, target.fbo);
      } else {
        gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
        gl.bindFramebuffer(gl.FRAMEBUFFER, null);
      }
      gl.drawElements(gl.TRIANGLES, 6, gl.UNSIGNED_SHORT, 0);
    };

    let unit = 0;
    /** Binds a program and sets its uniforms; textures get consecutive units. */
    const run = (name: ProgramName, values: Record<string, number | number[] | Fbo>) => {
      const p = programs[name];
      gl.useProgram(p.program);
      unit = 0;
      for (const [key, v] of Object.entries(values)) {
        const loc = p.uniforms[key];
        if (loc === undefined) continue;
        if (typeof v === "number") gl.uniform1f(loc, v);
        else if (Array.isArray(v)) {
          if (v.length === 2) gl.uniform2f(loc, v[0], v[1]);
          else gl.uniform3f(loc, v[0], v[1], v[2]);
        } else {
          gl.activeTexture(gl.TEXTURE0 + unit);
          gl.bindTexture(gl.TEXTURE_2D, v.texture);
          gl.uniform1i(loc, unit++);
        }
      }
    };

    let velocity!: DoubleFbo, dye!: DoubleFbo, pressure!: DoubleFbo, divergence!: Fbo, curl!: Fbo;
    let ready = false;
    const dyeRes = window.matchMedia("(pointer: coarse)").matches
      ? DYE_RES_MOBILE
      : DYE_RES_DESKTOP;

    const resize = () => {
      const dpr = Math.min(MAX_DPR, window.devicePixelRatio || 1);
      const w = Math.max(1, Math.round(canvas.clientWidth * dpr));
      const h = Math.max(1, Math.round(canvas.clientHeight * dpr));
      if (ready && canvas.width === w && canvas.height === h) return;
      canvas.width = w;
      canvas.height = h;
      const sim = gridFor(SIM_RES, w, h);
      const d = gridFor(dyeRes, w, h);
      velocity = createDouble(gl, sim.w, sim.h);
      pressure = createDouble(gl, sim.w, sim.h);
      divergence = createFbo(gl, sim.w, sim.h);
      curl = createFbo(gl, sim.w, sim.h);
      dye = createDouble(gl, d.w, d.h);
      ready = true;
    };
    try {
      resize();
    } catch {
      return;
    }

    const splat = (x: number, y: number, dx: number, dy: number, color: number[]) => {
      const aspect = canvas.width / canvas.height;
      const radius = SPLAT_RADIUS * (aspect > 1 ? aspect : 1);
      run("splat", {
        uTarget: velocity.read,
        aspectRatio: aspect,
        point: [x, y],
        color: [dx, dy, 0],
        radius,
      });
      blit(velocity.write);
      velocity.swap();
      run("splat", { uTarget: dye.read, aspectRatio: aspect, point: [x, y], color, radius });
      blit(dye.write);
      dye.swap();
    };

    let hue = 0;
    const nextColor = () => {
      hue = (hue + 1) % PALETTE.length;
      return PALETTE[hue].map((c) => c * DYE_INTENSITY);
    };

    const ambientSplat = () => {
      const x = 0.15 + Math.random() * 0.7;
      const y = 0.2 + Math.random() * 0.6;
      const angle = Math.random() * Math.PI * 2;
      const force = 600 + Math.random() * 900;
      splat(x, y, Math.cos(angle) * force, Math.sin(angle) * force, nextColor());
    };

    const step = (dt: number) => {
      const simTexel = [1 / velocity.w, 1 / velocity.h];
      gl.disable(gl.BLEND);

      run("curl", { texelSize: simTexel, uVelocity: velocity.read });
      blit(curl);

      run("vorticity", {
        texelSize: simTexel,
        uVelocity: velocity.read,
        uCurl: curl,
        curl: CURL,
        dt,
      });
      blit(velocity.write);
      velocity.swap();

      run("divergence", { texelSize: simTexel, uVelocity: velocity.read });
      blit(divergence);

      run("clear", { texelSize: simTexel, uTexture: pressure.read, value: PRESSURE_DECAY });
      blit(pressure.write);
      pressure.swap();

      for (let i = 0; i < PRESSURE_ITERATIONS; i++) {
        run("pressure", {
          texelSize: simTexel,
          uPressure: pressure.read,
          uDivergence: divergence,
        });
        blit(pressure.write);
        pressure.swap();
      }

      run("gradientSubtract", {
        texelSize: simTexel,
        uPressure: pressure.read,
        uVelocity: velocity.read,
      });
      blit(velocity.write);
      velocity.swap();

      run("advection", {
        texelSize: simTexel,
        velTexel: simTexel,
        uVelocity: velocity.read,
        uSource: velocity.read,
        dt,
        dissipation: VELOCITY_DISSIPATION,
      });
      blit(velocity.write);
      velocity.swap();

      run("advection", {
        texelSize: [1 / dye.w, 1 / dye.h],
        velTexel: simTexel,
        uVelocity: velocity.read,
        uSource: dye.read,
        dt,
        dissipation: DENSITY_DISSIPATION,
      });
      blit(dye.write);
      dye.swap();
    };

    const render = () => {
      gl.enable(gl.BLEND);
      gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
      gl.clearColor(0, 0, 0, 0);
      gl.bindFramebuffer(gl.FRAMEBUFFER, null);
      gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
      gl.clear(gl.COLOR_BUFFER_BIT);
      run("display", { texelSize: [1 / canvas.width, 1 / canvas.height], uTexture: dye.read });
      blit(null);
    };

    // Pointer input, in the simulation's 0–1 coordinates (y up).
    let last: { x: number; y: number } | null = null;
    const stir = (clientX: number, clientY: number) => {
      const r = canvas.getBoundingClientRect();
      if (clientX < r.left || clientX > r.right || clientY < r.top || clientY > r.bottom) {
        last = null;
        return;
      }
      const x = (clientX - r.left) / r.width;
      const y = 1 - (clientY - r.top) / r.height;
      if (last) {
        const aspect = r.width / r.height;
        const dx = (x - last.x) * (aspect < 1 ? aspect : 1);
        const dy = (y - last.y) / (aspect > 1 ? aspect : 1);
        if (Math.abs(dx) + Math.abs(dy) > 0.0005)
          splat(x, y, dx * SPLAT_FORCE, dy * SPLAT_FORCE, nextColor());
      }
      last = { x, y };
    };
    const onPointerMove = (e: PointerEvent) => {
      if (e.pointerType === "mouse" || e.pointerType === "pen") stir(e.clientX, e.clientY);
    };
    const onTouchMove = (e: TouchEvent) => {
      const t = e.touches[0];
      if (t) stir(t.clientX, t.clientY);
    };
    const onTouchEnd = () => {
      last = null;
    };

    // Only simulate while on screen and the tab is visible.
    let visible = true;
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
    });
    io.observe(canvas);

    let lost = false;
    const onLost = (e: Event) => {
      e.preventDefault();
      lost = true;
    };
    canvas.addEventListener("webglcontextlost", onLost);

    let raf = 0;
    let prev = performance.now();
    let nextAmbient = prev + 400;
    for (let i = 0; i < 4; i++) ambientSplat();

    const frame = (now: number) => {
      raf = requestAnimationFrame(frame);
      const dt = Math.min(1 / 60, (now - prev) / 1000);
      prev = now;
      if (lost || !visible || document.hidden) return;
      try {
        resize();
      } catch {
        lost = true;
        return;
      }
      if (now > nextAmbient) {
        ambientSplat();
        nextAmbient = now + 1800 + Math.random() * 2200;
      }
      step(dt);
      render();
    };
    raf = requestAnimationFrame(frame);

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("touchend", onTouchEnd, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      canvas.removeEventListener("webglcontextlost", onLost);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
      gl.getExtension("WEBGL_lose_context")?.loseContext();
    };
  }, []);

  return <canvas ref={canvasRef} aria-hidden className={className} />;
}
