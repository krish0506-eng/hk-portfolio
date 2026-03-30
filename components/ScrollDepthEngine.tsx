"use client";

import { useEffect, useMemo, useState } from "react";

type DepthMode = "auto" | "high" | "lite";

function detectLiteDevice() {
  const nav = window.navigator as Navigator & { deviceMemory?: number };
  const lowCores = nav.hardwareConcurrency && nav.hardwareConcurrency <= 4;
  const lowMemory = typeof nav.deviceMemory === "number" && nav.deviceMemory <= 4;
  return Boolean(lowCores || lowMemory);
}

export default function ScrollDepthEngine() {
  const [mode, setMode] = useState<DepthMode>("auto");
  const [reducedMotion, setReducedMotion] = useState(false);
  const isLite = useMemo(() => {
    if (mode === "high") return false;
    if (mode === "lite") return true;
    return false;
  }, [mode]);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateMotion = () => setReducedMotion(media.matches);

    if (mode === "auto") {
      document.documentElement.dataset.depthMode = detectLiteDevice() ? "lite" : "high";
    } else {
      document.documentElement.dataset.depthMode = mode;
    }

    updateMotion();
    media.addEventListener("change", updateMotion);
    return () => media.removeEventListener("change", updateMotion);
  }, [mode]);

  useEffect(() => {
    const sections = Array.from(document.querySelectorAll<HTMLElement>("main section[id]"));
    sections.forEach((section, index) => {
      section.classList.add("depth-section");
      section.style.setProperty("--depth-index", String(index));
    });

    if (reducedMotion) {
      sections.forEach((section) => {
        section.style.transform = "none";
        section.style.filter = "none";
        section.style.opacity = "1";
      });
      return;
    }

    let raf = 0;
    const update = () => {
      const viewport = window.innerHeight;
      const modeFactor = isLite ? 0.55 : 1;

      for (let i = 0; i < sections.length; i += 1) {
        const section = sections[i];
        const rect = section.getBoundingClientRect();
        const center = rect.top + rect.height / 2;
        const distance = (center - viewport / 2) / viewport;
        const clamped = Math.max(-1.25, Math.min(1.25, distance));
        const near = 1 - Math.min(Math.abs(clamped), 1);

        const translateY = clamped * -36 * modeFactor;
        const translateZ = -Math.abs(clamped) * 220 * modeFactor + near * 40 * modeFactor;
        const rotateX = clamped * -9 * modeFactor;
        const rotateY = ((i % 2 === 0 ? 1 : -1) * clamped * 5) * modeFactor;
        const scale = 0.9 + near * 0.1;
        const blur = (1 - near) * (isLite ? 0.4 : 1.2);

        section.style.transform = `translate3d(0, ${translateY.toFixed(2)}px, ${translateZ.toFixed(2)}px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale(${scale.toFixed(3)})`;
        section.style.filter = `blur(${blur.toFixed(2)}px)`;
        section.style.opacity = String((0.7 + near * 0.3).toFixed(3));
      }
    };

    const schedule = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        update();
      });
    };

    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);

    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [isLite, reducedMotion]);

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <label className="depth-control glass rounded-full border border-border px-3 py-2 text-xs font-mono text-light">
        3D Scroll
        <select
          value={mode}
          onChange={(event) => setMode(event.target.value as DepthMode)}
          className="ml-2 rounded bg-surface/80 px-2 py-1 text-xs text-light outline-none"
          aria-label="3D quality mode"
        >
          <option value="auto">Auto</option>
          <option value="high">High</option>
          <option value="lite">Lite</option>
        </select>
      </label>
    </div>
  );
}