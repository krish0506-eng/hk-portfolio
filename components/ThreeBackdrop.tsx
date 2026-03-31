"use client";

import { useEffect, useRef } from "react";

// ─── Particle type ───────────────────────────────────────────────────────────
interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  color: string;
  alpha: number;
}

const PALETTE = ["#8b5cf6", "#06b6d4", "#d946ef", "#f59e0b", "#4f8eff", "#10b981"];
const CONNECTION_DIST = 160;
const PARTICLE_COUNT = 100;

function randomBetween(a: number, b: number) {
  return a + Math.random() * (b - a);
}

// ─── 2D Animated Particle Network Background ─────────────────────────────────
export default function ThreeBackdrop() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: ReturnType<typeof requestAnimationFrame> | null = null;
    let W = window.innerWidth;
    let H = window.innerHeight;
    let mouseX = W / 2;
    let mouseY = H / 2;
    let reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    canvas.width  = W;
    canvas.height = H;

    // Build particles
    const particles: Particle[] = Array.from({ length: PARTICLE_COUNT }, () => ({
      x: randomBetween(0, W),
      y: randomBetween(0, H),
      vx: randomBetween(-0.28, 0.28),
      vy: randomBetween(-0.22, 0.22),
      r: randomBetween(1.4, 3.2),
      color: PALETTE[Math.floor(Math.random() * PALETTE.length)],
      alpha: randomBetween(0.45, 0.85),
    }));

    const draw = () => {
      ctx.clearRect(0, 0, W, H);

      if (!reducedMotion) {
        // Subtle parallax offset driven by mouse position
        const offsetX = (mouseX / W - 0.5) * 18;
        const offsetY = (mouseY / H - 0.5) * 12;

        // Move & wrap particles
        for (const p of particles) {
          p.x += p.vx + offsetX * 0.003;
          p.y += p.vy + offsetY * 0.003;
          if (p.x < -10) p.x = W + 10;
          else if (p.x > W + 10) p.x = -10;
          if (p.y < -10) p.y = H + 10;
          else if (p.y > H + 10) p.y = -10;
        }
      }

      // Draw connection lines
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < CONNECTION_DIST) {
            const lineAlpha = (1 - dist / CONNECTION_DIST) * 0.22;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = particles[i].color;
            ctx.globalAlpha = lineAlpha;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      // Draw particles
      for (const p of particles) {
        ctx.globalAlpha = p.alpha;
        // Glow
        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 3.5);
        grad.addColorStop(0, p.color);
        grad.addColorStop(1, "transparent");
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * 3.5, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.globalAlpha = p.alpha * 0.35;
        ctx.fill();
        // Core dot
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.fill();
      }

      ctx.globalAlpha = 1;
      animId = requestAnimationFrame(draw);
    }

    const onResize = () => {
      W = window.innerWidth;
      H = window.innerHeight;
      canvas.width  = W;
      canvas.height = H;
    };

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const onMotionChange = (e: MediaQueryListEvent) => {
      reducedMotion = e.matches;
    };

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    motionQuery.addEventListener("change", onMotionChange);
    window.addEventListener("resize", onResize);
    window.addEventListener("mousemove", onMouseMove, { passive: true });

    draw();

    return () => {
      if (animId !== null) cancelAnimationFrame(animId);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMouseMove);
      motionQuery.removeEventListener("change", onMotionChange);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 -z-10">
      <canvas ref={canvasRef} className="particle-canvas absolute inset-0 w-full h-full" />
      {/* Gradient overlay — adapts to theme via CSS */}
      <div className="backdrop-overlay absolute inset-0" />
    </div>
  );
}