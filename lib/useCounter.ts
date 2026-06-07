"use client";
import { useState, useEffect, useRef } from "react";

export function useCounter(end: number | string, duration = 1500, enabled = true) {
  const [value, setValue] = useState(0);
  const startTime = useRef<number>(0);

  useEffect(() => {
    if (!enabled) { setValue(Number(end)); return; }
    const raw = typeof end === "string" ? parseFloat(end) : end;
    const target = isNaN(raw) ? 0 : raw;
    if (target <= 0) { setValue(target); return; }

    const isFloat = target !== Math.floor(target);

    startTime.current = performance.now();

    const animate = (now: number) => {
      const elapsed = now - startTime.current;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = eased * target;
      setValue(isFloat ? Math.round(current * 10) / 10 : Math.round(current));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [end, duration, enabled]);

  return value;
}
