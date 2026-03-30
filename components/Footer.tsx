"use client";
import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer className="py-10 px-6 border-t border-border">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="font-mono text-xs text-muted"
        >
          © 2025 <span className="text-accent">Hari Krishnaa N</span> · Built with Next.js & Framer Motion
        </motion.p>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="font-mono text-xs text-muted"
        >
          HYNEX · MSME Registered · Erode, Tamil Nadu
        </motion.p>
      </div>
    </footer>
  );
}
