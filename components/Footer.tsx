"use client";
import { motion } from "framer-motion";
import { useState } from "react";

export default function Footer() {
  const [showTooltip, setShowTooltip] = useState(false);
  const year = new Date().getFullYear();

  return (
    <footer className="py-10 px-6 relative">
      {/* Gradient top border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent" />

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="font-mono text-xs text-muted"
        >
          © {year} <span className="text-accent">Hari Krishnaa N</span> · Built with{' '}
          <a href="https://nextjs.org" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">Next.js</a>
          {' & '}
          <a href="https://motion.dev" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">Framer Motion</a>
        </motion.p>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="font-mono text-xs text-muted relative"
        >
          <span
            className="relative cursor-help"
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
            onFocus={() => setShowTooltip(true)}
            onBlur={() => setShowTooltip(false)}
            tabIndex={0}
            role="button"
            aria-label="HYNEX company info"
          >
            HYNEX
            {showTooltip && (
              <span className="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap px-2 py-1 rounded text-[10px] font-mono bg-accent/20 border border-accent/30 text-accent shadow-lg">
                MSME Registered Technology Firm
              </span>
            )}
          </span>
          {' · '}MSME Registered · Erode, Tamil Nadu
        </motion.p>
      </div>
    </footer>
  );
}
