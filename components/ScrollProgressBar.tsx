"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

// Idea 135: Scroll progress indicator
export default function ScrollProgressBar() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setProgress(scrolled);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.div
      className="fixed top-0 left-0 h-1 bg-gradient-to-r from-accent via-cyan to-pink z-50"
      style={{ width: `${progress}%` }}
      transition={{ duration: 0.3 }}
    />
  );
}
