"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function SiteLoader() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // Hide loader after a short window — long enough to see the animation,
    // short enough not to block content on fast connections.
    const id = setTimeout(() => setVisible(false), 1800);
    return () => clearTimeout(id);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.55, ease: "easeInOut" } }}
          className="fixed inset-0 z-[99999] flex flex-col items-center justify-center"
          style={{ background: "rgb(var(--color-bg, 8 10 24))" }}
        >
          {/* Outer glow ring */}
          <motion.div
            className="relative flex items-center justify-center"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            {/* Pulsing ring */}
            <motion.div
              className="absolute w-24 h-24 rounded-full"
              style={{
                background:
                  "radial-gradient(circle, rgba(139,92,246,0.25) 0%, transparent 70%)",
              }}
              animate={{ scale: [1, 1.35, 1], opacity: [0.6, 0.15, 0.6] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            />

            {/* Second ring */}
            <motion.div
              className="absolute w-16 h-16 rounded-full border"
              style={{ borderColor: "rgba(139,92,246,0.35)" }}
              animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
            />

            {/* Logo mark */}
            <div
              className="relative z-10 w-14 h-14 rounded-2xl flex items-center justify-center font-display font-bold text-2xl"
              style={{
                background:
                  "linear-gradient(135deg, rgba(139,92,246,0.3) 0%, rgba(6,182,212,0.25) 100%)",
                border: "1px solid rgba(139,92,246,0.5)",
                boxShadow: "0 0 24px rgba(139,92,246,0.3)",
                color: "#8b5cf6",
              }}
            >
              HK
            </div>
          </motion.div>

          {/* Gradient loading bar */}
          <div
            className="mt-8 w-40 h-0.5 rounded-full overflow-hidden"
            style={{ background: "rgba(139,92,246,0.15)" }}
          >
            <motion.div
              className="h-full rounded-full"
              style={{
                background:
                  "linear-gradient(90deg, #8b5cf6, #06b6d4, #8b5cf6)",
                backgroundSize: "200% 100%",
              }}
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 1.4, ease: "easeInOut" }}
            />
          </div>

          <motion.p
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-4 font-mono text-xs tracking-widest"
            style={{ color: "rgba(139,92,246,0.7)" }}
          >
            LOADING PORTFOLIO
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
