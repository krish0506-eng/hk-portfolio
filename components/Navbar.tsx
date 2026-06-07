"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { HiMenuAlt3, HiX, HiSun, HiMoon } from "react-icons/hi";
import { useTheme } from "@/components/ThemeProvider";

const links = ["About", "Skills", "Projects", "Experience", "Certifications", "Contact"];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const { theme, toggle } = useTheme();
  const { scrollY } = useScroll();

  const navY = useTransform(scrollY, [0, 80], [0, -4]);
  const logoScale = useTransform(scrollY, [0, 100], [1, 0.9]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    links.forEach((link) => {
      const el = document.getElementById(link.toLowerCase());
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(link); },
        { threshold: 0.35 }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: "smooth" });
    setOpen(false);
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      style={{ y: navY }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      role="navigation"
      aria-label="Primary"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-bg/70 backdrop-blur-xl border-b border-border/60 shadow-lg shadow-accent/5 py-2"
          : "py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <motion.div
          whileHover={{ scale: 1.05 }}
          style={{ scale: logoScale }}
          className="flex items-center gap-3 cursor-pointer"
          role="button"
          tabIndex={0}
          aria-label="Back to top"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }
          }}
        >
          <span
            className="h-9 w-9 rounded-xl flex items-center justify-center font-display text-sm font-bold"
            style={{
              color: "rgb(var(--color-accent))",
              background: "linear-gradient(135deg, rgba(139,92,246,0.22), rgba(6,182,212,0.16))",
              border: "1px solid rgba(139,92,246,0.45)",
              boxShadow: "0 10px 24px rgba(139,92,246,0.18)",
            }}
          >
            HK
          </span>
          <motion.span className="font-display font-bold text-3xl gradient-text glitch-anim">Hari Krishnaa</motion.span>
        </motion.div>

        <div className="hidden md:flex items-center gap-7">
          {links.map((link, i) => {
            const isActive = activeSection === link;
            return (
              <motion.button
                key={link}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 + 0.3 }}
                whileHover={{ y: -2 }}
                onClick={() => scrollTo(link)}
                className="text-base font-body transition-colors duration-300 relative group"
                style={{ color: isActive ? "rgb(var(--color-accent))" : "rgb(var(--color-muted))" }}
              >
                {link}
                {isActive && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 rounded-full"
                    style={{
                      background: "rgb(var(--color-accent))",
                      boxShadow: "0 0 8px rgb(var(--color-accent)), 0 0 16px rgba(139,92,246,0.3)",
                    }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                {!isActive && (
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 rounded-full bg-accent group-hover:w-full transition-all duration-300" />
                )}
              </motion.button>
            );
          })}

          <motion.button
            whileTap={{ scale: 0.90 }}
            onClick={toggle}
            className="neu-btn theme-toggle w-10 h-10 flex items-center justify-center text-muted hover:text-accent"
            aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
          >
            <AnimatePresence mode="wait" initial={false}>
              {theme === "dark" ? (
                <motion.span
                  key="sun"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                >
                  <HiSun size={18} />
                </motion.span>
              ) : (
                <motion.span
                  key="moon"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                >
                  <HiMoon size={18} />
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => scrollTo("Contact")}
            className="neu-btn px-6 py-2.5 rounded-full text-base font-body font-medium text-accent hover:text-white hover:bg-accent transition-all duration-300 relative"
            style={{ animation: "hire-pulse 4s ease-in-out infinite" }}
          >
            Hire Me
          </motion.button>
        </div>

        <div className="flex md:hidden items-center gap-3">
          <motion.button
            whileTap={{ scale: 0.90 }}
            onClick={toggle}
            className="neu-btn theme-toggle w-9 h-9 flex items-center justify-center text-muted"
            aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
          >
            <AnimatePresence mode="wait" initial={false}>
              {theme === "dark" ? (
                <motion.span
                  key="sun-m"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                >
                  <HiSun size={16} />
                </motion.span>
              ) : (
                <motion.span
                  key="moon-m"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                >
                  <HiMoon size={16} />
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>

          <button className="text-light" onClick={() => setOpen(!open)} aria-label={open ? "Close menu" : "Open menu"}>
            {open ? <HiX size={24} /> : <HiMenuAlt3 size={24} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 60 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="md:hidden glass border-t border-border/60 px-6 py-6 flex flex-col gap-3"
          >
            {links.map((link, i) => (
              <motion.button
                key={link}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.08, duration: 0.25 }}
                onClick={() => scrollTo(link)}
                className={`text-left font-body py-2 transition-colors ${activeSection === link ? "text-accent font-semibold" : "text-muted"}`}
              >
                {link}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
