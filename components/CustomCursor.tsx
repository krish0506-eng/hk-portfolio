"use client";
import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const followerX = useSpring(cursorX, { stiffness: 120, damping: 18, mass: 0.6 });
  const followerY = useSpring(cursorY, { stiffness: 120, damping: 18, mass: 0.6 });

  const [hovering, setHovering] = useState(false);
  const [clicking, setClicking] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Only show on desktop (pointer: fine devices)
    if (!window.matchMedia("(pointer: fine)").matches) return;

    const move = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!visible) setVisible(true);
    };

    const handleOver = (e: MouseEvent) => {
      const el = e.target as HTMLElement;
      setHovering(
        el.closest("button, a, [role='button'], input, textarea, select, label, [tabindex='0']") !== null
      );
    };

    const down = () => setClicking(true);
    const up = () => setClicking(false);
    const leave = () => setVisible(false);
    const enter = () => setVisible(true);

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", handleOver);
    window.addEventListener("mousedown", down);
    window.addEventListener("mouseup", up);
    document.documentElement.addEventListener("mouseleave", leave);
    document.documentElement.addEventListener("mouseenter", enter);

    // Hide default cursor globally
    document.documentElement.style.cursor = "none";

    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", handleOver);
      window.removeEventListener("mousedown", down);
      window.removeEventListener("mouseup", up);
      document.documentElement.removeEventListener("mouseleave", leave);
      document.documentElement.removeEventListener("mouseenter", enter);
      document.documentElement.style.cursor = "";
    };
  }, [cursorX, cursorY, visible]);

  if (typeof window !== "undefined" && !window.matchMedia("(pointer: fine)").matches) {
    return null;
  }

  return (
    <>
      {/* Dot cursor */}
      <motion.div
        className="pointer-events-none fixed z-[99999] rounded-full"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
          width: clicking ? 8 : 10,
          height: clicking ? 8 : 10,
          background: hovering
            ? "rgba(6, 182, 212, 0.9)"
            : "rgba(139, 92, 246, 0.9)",
          boxShadow: hovering
            ? "0 0 12px rgba(6,182,212,0.8)"
            : "0 0 8px rgba(139,92,246,0.7)",
          opacity: visible ? 1 : 0,
          transition: "width 0.15s, height 0.15s, background 0.2s, box-shadow 0.2s",
        }}
      />

      {/* Follower ring */}
      <motion.div
        className="pointer-events-none fixed z-[99998] rounded-full"
        style={{
          x: followerX,
          y: followerY,
          translateX: "-50%",
          translateY: "-50%",
          width: hovering ? 40 : 28,
          height: hovering ? 40 : 28,
          border: hovering
            ? "1.5px solid rgba(6,182,212,0.55)"
            : "1.5px solid rgba(139,92,246,0.45)",
          background: hovering
            ? "rgba(6,182,212,0.07)"
            : "transparent",
          opacity: visible ? 0.85 : 0,
          transition: "width 0.25s cubic-bezier(0.34,1.56,0.64,1), height 0.25s cubic-bezier(0.34,1.56,0.64,1), border-color 0.2s, background 0.2s",
        }}
      />
    </>
  );
}
