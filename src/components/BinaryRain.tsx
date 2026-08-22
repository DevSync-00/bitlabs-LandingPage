import { useEffect, useRef } from "react";
import { useTheme } from "./ThemeProvider";

/**
 * Ambient interactive binary atmosphere.
 *
 * - Sparse floating binary digits across 3 depth layers (back/mid/front)
 * - Slow drift, soft fade, occasional dissolve
 * - Mouse / touch creates a soft magnetic ripple: nearby digits drift away
 *   with eased inertia and briefly glow
 * - Adapts to dark / light theme via CSS vars
 * - Canvas + rAF, DPR-aware, particle pooled, throttles when tab hidden
 */
export function BinaryRain() {
  const ref = useRef<HTMLCanvasElement>(null);
  const { theme, reduceEffects, prefersReducedMotion } = useTheme();
  const disabled = reduceEffects || prefersReducedMotion;

  useEffect(() => {
    if (disabled) return;
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const isDark = theme === "dark";
    const isMobile = window.innerWidth < 768;
    const densityScale = isMobile ? 0.45 : 1;
    const colorRgb =
      getComputedStyle(document.documentElement)
        .getPropertyValue("--rain-color")
        .trim() || (isDark ? "92, 145, 255" : "31, 83, 219");

    let width = 0;
    let height = 0;
    let dpr = 1;

    type P = {
      x: number; y: number;       // current
      bx: number; by: number;     // base drift target
      vx: number; vy: number;     // velocity (for cursor inertia)
      ch: string;
      size: number;
      layer: 0 | 1 | 2;           // 0 back, 1 mid, 2 front
      alpha: number;              // base alpha
      life: number;               // 0..1 fade in/out
      lifeDir: 1 | -1;
      lifeSpeed: number;
      glow: number;               // 0..1 cursor-induced glow
      driftSpeed: number;         // vertical drift px/s
      swayAmp: number;
      swayFreq: number;
      swayPhase: number;
    };

    const particles: P[] = [];
    const layerConfig = [
      { count: 0.00006, sizeMin: 10, sizeMax: 13, alpha: 0.18, blur: 1.4, speed: 6 },   // back
      { count: 0.00004, sizeMin: 13, sizeMax: 16, alpha: 0.28, blur: 0.6, speed: 10 },  // mid
      { count: 0.00002, sizeMin: 15, sizeMax: 19, alpha: 0.42, blur: 0,   speed: 14 },  // front
    ] as const;

    const rand = (a: number, b: number) => a + Math.random() * (b - a);
    const newDigit = () => (Math.random() > 0.5 ? "1" : "0");

    const spawn = (layer: 0 | 1 | 2, fromTop = false): P => {
      const cfg = layerConfig[layer];
      const x = Math.random() * width;
      const y = fromTop ? -20 : Math.random() * height;
      return {
        x, y, bx: x, by: y,
        vx: 0, vy: 0,
        ch: newDigit(),
        size: rand(cfg.sizeMin, cfg.sizeMax),
        layer,
        alpha: cfg.alpha * rand(0.7, 1.1),
        life: rand(0, 1),
        lifeDir: Math.random() > 0.5 ? 1 : -1,
        lifeSpeed: rand(0.05, 0.18),
        glow: 0,
        driftSpeed: cfg.speed * rand(0.7, 1.3),
        swayAmp: rand(4, 14) * (layer + 1) * 0.4,
        swayFreq: rand(0.15, 0.45),
        swayPhase: Math.random() * Math.PI * 2,
      };
    };

    const populate = () => {
      particles.length = 0;
      const area = width * height;
      for (let l = 0 as 0 | 1 | 2; l <= 2; l = (l + 1) as 0 | 1 | 2) {
        const n = Math.max(4, Math.floor(area * layerConfig[l].count * densityScale));
        for (let i = 0; i < n; i++) particles.push(spawn(l));
      }
    };

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = width + "px";
      canvas.style.height = height + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      populate();
    };
    resize();
    window.addEventListener("resize", resize);

    // pointer
    const pointer = { x: -9999, y: -9999, active: false, pulse: 0 };
    const onMove = (e: PointerEvent) => {
      pointer.x = e.clientX;
      pointer.y = e.clientY;
      pointer.active = true;
    };
    const onLeave = () => { pointer.active = false; pointer.x = -9999; pointer.y = -9999; };
    const onDown = () => { pointer.pulse = 1; };
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerleave", onLeave);
    window.addEventListener("pointerdown", onDown);

    let raf = 0;
    let last = performance.now();
    let visible = true;
    const onVis = () => { visible = !document.hidden; last = performance.now(); };
    document.addEventListener("visibilitychange", onVis);

    const RADIUS = 140;
    const RADIUS2 = RADIUS * RADIUS;

    const step = (now: number) => {
      raf = requestAnimationFrame(step);
      if (!visible) return;
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;

      // soft clear (full clear keeps it crisp; layered alpha gives depth)
      ctx.clearRect(0, 0, width, height);

      // pointer pulse decay
      pointer.pulse *= Math.pow(0.001, dt);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // life cycle (fade in/out, dissolve to new digit occasionally)
        p.life += p.lifeDir * p.lifeSpeed * dt;
        if (p.life > 1) { p.life = 1; p.lifeDir = -1; }
        else if (p.life < 0) {
          p.life = 0; p.lifeDir = 1;
          if (Math.random() < 0.6) p.ch = newDigit();
        }

        // base drift (downward + sway)
        p.by += p.driftSpeed * dt;
        p.swayPhase += p.swayFreq * dt;
        const sway = Math.sin(p.swayPhase) * p.swayAmp;

        // recycle off-screen
        if (p.by > height + 30) {
          const fresh = spawn(p.layer, true);
          Object.assign(p, fresh);
          continue;
        }

        // pointer interaction — soft magnetic push with inertia
        const targetX = p.bx + sway;
        const targetY = p.by;
        let fx = 0, fy = 0;
        if (pointer.active) {
          const dx = p.x - pointer.x;
          const dy = p.y - pointer.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < RADIUS2 && d2 > 0.5) {
            const d = Math.sqrt(d2);
            const force = (1 - d / RADIUS); // 0..1
            const strength = 90 * force * (0.5 + p.layer * 0.35);
            fx += (dx / d) * strength;
            fy += (dy / d) * strength;
            p.glow = Math.max(p.glow, force);
          }
        }

        // velocity integrates force; eases back to base position
        const ease = 3.2; // spring back
        p.vx += (fx + (targetX - p.x) * ease) * dt;
        p.vy += (fy + (targetY - p.y) * ease) * dt;
        p.vx *= Math.pow(0.02, dt); // damping
        p.vy *= Math.pow(0.02, dt);
        p.x += p.vx * dt;
        p.y += p.vy * dt;

        // glow decay
        p.glow *= Math.pow(0.05, dt);

        // draw
        const a = p.alpha * (0.35 + 0.65 * p.life);
        ctx.font = `${p.size}px JetBrains Mono, ui-monospace, monospace`;
        if (p.glow > 0.05) {
          ctx.shadowColor = `rgba(${colorRgb}, ${0.55 * p.glow})`;
          ctx.shadowBlur = 14 * p.glow;
        } else {
          ctx.shadowBlur = 0;
        }
        ctx.fillStyle = `rgba(${colorRgb}, ${Math.min(1, a + p.glow * 0.5)})`;
        ctx.fillText(p.ch, p.x, p.y);
      }
      ctx.shadowBlur = 0;
    };
    raf = requestAnimationFrame((t) => { last = t; step(t); });

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("pointerdown", onDown);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, [theme, disabled]);

  if (disabled) return null;

  return (
    <canvas
      ref={ref}
      aria-hidden
      className="fixed inset-0 pointer-events-none"
      style={{
        zIndex: 0,
        opacity: 0.85,
        maskImage:
          "radial-gradient(ellipse at center, rgba(0,0,0,0.95) 35%, rgba(0,0,0,0.55) 75%, rgba(0,0,0,0.25) 100%)",
        WebkitMaskImage:
          "radial-gradient(ellipse at center, rgba(0,0,0,0.95) 35%, rgba(0,0,0,0.55) 75%, rgba(0,0,0,0.25) 100%)",
      }}
    />
  );
}
