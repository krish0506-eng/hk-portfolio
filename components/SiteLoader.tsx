"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

function CircuitTraces() {
  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 400 300" preserveAspectRatio="none">
      <motion.path
        d="M0 50 L80 50 L80 30 L160 30 L160 50 L240 50 L240 20 L320 20 L320 50 L400 50"
        fill="none" stroke="rgba(139,92,246,0.12)" strokeWidth="1"
        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
        transition={{ duration: 1.2, ease: "easeInOut", delay: 0.2 }}
      />
      <motion.path
        d="M0 150 L60 150 L60 120 L140 120 L140 150 L220 150 L220 170 L300 170 L300 150 L400 150"
        fill="none" stroke="rgba(6,182,212,0.10)" strokeWidth="1"
        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
        transition={{ duration: 1.4, ease: "easeInOut", delay: 0.4 }}
      />
      <motion.path
        d="M0 250 L100 250 L100 230 L180 230 L180 250 L260 250 L260 270 L340 270 L340 250 L400 250"
        fill="none" stroke="rgba(217,70,239,0.08)" strokeWidth="1"
        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
        transition={{ duration: 1.6, ease: "easeInOut", delay: 0.6 }}
      />
      <motion.circle cx="80" cy="50" r="2" fill="#8b5cf6" initial={{ opacity: 0 }} animate={{ opacity: [0, 1, 0] }} transition={{ duration: 0.6, repeat: Infinity, delay: 0.6 }} />
      <motion.circle cx="240" cy="20" r="2" fill="#06b6d4" initial={{ opacity: 0 }} animate={{ opacity: [0, 1, 0] }} transition={{ duration: 0.5, repeat: Infinity, delay: 0.9 }} />
      <motion.circle cx="140" cy="120" r="2" fill="#d946ef" initial={{ opacity: 0 }} animate={{ opacity: [0, 1, 0] }} transition={{ duration: 0.7, repeat: Infinity, delay: 1.2 }} />
    </svg>
  );
}

export default function SiteLoader() {
  const [visible, setVisible] = useState(true);
  const [typingText, setTypingText] = useState("");
  const fullText = "Initialising systems...";

  useEffect(() => {
    let idx = 0;
    const interval = setInterval(() => {
      setTypingText(fullText.slice(0, idx + 1));
      idx++;
      if (idx >= fullText.length) clearInterval(interval);
    }, 60);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const id = setTimeout(() => setVisible(false), 1500);
    return () => clearTimeout(id);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.55, ease: "easeInOut" } }}
          className="fixed inset-0 z-[99999] flex flex-col items-center justify-center overflow-hidden"
          style={{ background: "rgb(var(--color-bg, 8 10 24))" }}
        >
          <CircuitTraces />

          <motion.div
            className="relative flex items-center justify-center"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <motion.div
              className="absolute w-28 h-28 rounded-full"
              style={{ background: "radial-gradient(circle, rgba(139,92,246,0.3) 0%, transparent 70%)" }}
              animate={{ scale: [1, 1.4, 1], opacity: [0.6, 0.1, 0.6] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute w-20 h-20 rounded-full border"
              style={{ borderColor: "rgba(139,92,246,0.3)" }}
              animate={{ scale: [1, 1.5, 1], opacity: [0.4, 0, 0.4] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
            />
            <div
              className="relative z-10 w-14 h-14 rounded-2xl flex items-center justify-center font-display font-bold text-2xl"
              style={{
                background: "linear-gradient(135deg, rgba(139,92,246,0.35) 0%, rgba(6,182,212,0.3) 100%)",
                border: "1px solid rgba(139,92,246,0.6)",
                boxShadow: "0 0 30px rgba(139,92,246,0.4), 0 0 60px rgba(139,92,246,0.15)",
                color: "#8b5cf6",
              }}
            >
              HK
            </div>
          </motion.div>

          <div className="mt-8 w-44 h-1 rounded-full overflow-hidden" style={{ background: "rgba(139,92,246,0.12)" }}>
            <motion.div
              className="h-full rounded-full relative"
              style={{
                background: "linear-gradient(90deg, #8b5cf6, #06b6d4, #8b5cf6)",
                backgroundSize: "200% 100%",
              }}
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 1.6, ease: "easeInOut" }}
            >
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-accent shadow-lg shadow-accent/60" style={{ boxShadow: "0 0 8px rgba(139,92,246,0.8)" }} />
            </motion.div>
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-4 font-mono text-xs tracking-widest"
            style={{ color: "rgba(139,92,246,0.7)" }}
          >
            {typingText}<span className="animate-pulse">|</span>
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
