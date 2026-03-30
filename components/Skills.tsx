"use client";
import { useRef, useCallback, useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const skillGroups = [
  {
    category: "Programming",
    description: "Core languages powering every system I build",
    confidence: 95,
    impact: "Faster development, cleaner architecture",
    color: "#8b5cf6",
    glow: "rgba(139, 92, 246, 0.4)",
    skills: ["Python", "JavaScript", "TypeScript", "C"],
  },
  {
    category: "App Development",
    description: "Full-stack web with modern frameworks",
    confidence: 90,
    impact: "Performant, scalable web products",
    color: "#06b6d4",
    glow: "rgba(6, 182, 212, 0.4)",
    skills: ["React.js", "Next.js", "Node.js", "MERN Stack", "Vite"],
  },
  {
    category: "AI & Automation",
    description: "Agentic systems and intelligent workflows",
    confidence: 88,
    impact: "Automate repetitive work, unlock AI features",
    color: "#d946ef",
    glow: "rgba(217, 70, 239, 0.4)",
    skills: ["LLMs", "LangChain", "RAG Systems", "Agentic AI", "Prompt Engineering", "Generative AI", "Workflow Automation"],
  },
  {
    category: "Backend & Tools",
    description: "Databases, APIs, and deployment pipelines",
    confidence: 85,
    impact: "Reliable infrastructure, smooth data ops",
    color: "#f59e0b",
    glow: "rgba(245, 158, 11, 0.4)",
    skills: ["Firebase", "MongoDB", "REST APIs", "Git", "Postman", "AWS"],
  },
  {
    category: "Engineering",
    description: "Hardware design and systems integration",
    confidence: 92,
    impact: "Bridge hardware & software for real systems",
    color: "#10b981",
    glow: "rgba(16, 185, 129, 0.4)",
    skills: ["Additive Manufacturing", "3D Printing", "Embedded Systems", "IoT", "Product Design", "System Integration"],
  },
];

const CARD_W = 340;
const CARD_GAP = 20;

export default function Skills() {
  const [headerRef, headerInView] = useInView({ threshold: 0.1, triggerOnce: true });
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [canScrollLeft, setCanScrollLeft]   = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  /* track scroll position → update active dot */
  const updateState = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 8);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 8);
    const idx = Math.round(el.scrollLeft / (CARD_W + CARD_GAP));
    setActiveIndex(Math.min(idx, skillGroups.length - 1));
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener("scroll", updateState, { passive: true });
    updateState();
    return () => el.removeEventListener("scroll", updateState);
  }, [updateState]);

  const scrollBy = useCallback((dir: -1 | 1) => {
    scrollRef.current?.scrollBy({ left: dir * (CARD_W + CARD_GAP), behavior: "smooth" });
  }, []);

  const scrollToIndex = useCallback((i: number) => {
    scrollRef.current?.scrollTo({ left: i * (CARD_W + CARD_GAP), behavior: "smooth" });
  }, []);

  return (
    <section id="skills" className="py-14 md:py-20 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-full opacity-10"
          style={{ background: "linear-gradient(to bottom, transparent, #8b5cf6, transparent)" }} />
        <div className="absolute -top-40 left-1/4 w-96 h-96 rounded-full blur-3xl opacity-5"
          style={{ background: "radial-gradient(circle, #8b5cf6, transparent 70%)" }} />
      </div>

      {/* Section header */}
      <div ref={headerRef} className="max-w-6xl mx-auto px-6 mb-12">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="flex items-end justify-between gap-4 flex-wrap"
        >
          <div>
            <span className="font-mono text-accent text-sm tracking-widest uppercase">What I Know</span>
            <h2 className="font-display font-bold text-4xl md:text-5xl text-light mt-3">
              Technical <span className="gradient-text">Skills</span>
            </h2>
            <p className="mt-3 text-muted text-base font-body max-w-lg">
              Scroll through my skill domains — from AI engineering to embedded systems.
            </p>
          </div>

          {/* Navigation arrows */}
          <div className="flex items-center gap-3">
            <motion.button
              whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.92 }}
              onClick={() => scrollBy(-1)}
              disabled={!canScrollLeft}
              className="neu-btn w-11 h-11 rounded-full flex items-center justify-center transition-all disabled:opacity-30"
              aria-label="Previous skill"
            >
              <FiChevronLeft size={20} className="text-light" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.92 }}
              onClick={() => scrollBy(1)}
              disabled={!canScrollRight}
              className="neu-btn w-11 h-11 rounded-full flex items-center justify-center transition-all disabled:opacity-30"
              aria-label="Next skill"
            >
              <FiChevronRight size={20} className="text-light" />
            </motion.button>
          </div>
        </motion.div>
      </div>

      {/* ── Horizontal scroll carousel ────────────────────────── */}
      <div
        ref={scrollRef}
        className="flex gap-5 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-6 pl-6"
        style={{ paddingRight: "1.5rem" }}
      >
        {/* Left fade sentinel */}
        <div className="shrink-0 w-0" />

        {skillGroups.map((group, gi) => (
          <motion.div
            key={group.category}
            initial={{ opacity: 0, y: 40 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: gi * 0.12 }}
            className="snap-start shrink-0 flex flex-col glass rounded-3xl border border-border/60 p-7 relative overflow-hidden group"
            style={{ width: CARD_W, minHeight: 460 }}
            whileHover={{
              y: -10,
              boxShadow: `0 28px 55px ${group.glow}, 0 0 60px ${group.glow.replace("0.4", "0.12")}`,
            }}
          >
            {/* Glow spotlight on hover */}
            <div
              className="absolute -top-16 -right-16 w-48 h-48 rounded-full blur-3xl opacity-0 group-hover:opacity-30 transition-opacity duration-500"
              style={{ background: group.color }}
            />

            {/* Category color bar */}
            <div
              className="w-full h-1 rounded-full mb-6 opacity-80"
              style={{ background: `linear-gradient(90deg, ${group.color}, transparent)` }}
            />

            {/* Header row */}
            <div className="flex items-center gap-3 mb-5">
              <div
                className="w-3.5 h-3.5 rounded-full shrink-0"
                style={{ background: group.color, boxShadow: `0 0 12px ${group.color}` }}
              />
              <span className="font-mono text-base tracking-widest uppercase" style={{ color: group.color }}>
                {group.category}
              </span>
            </div>

            <p className="text-muted text-sm font-body mb-5">{group.description}</p>

            {/* Proficiency bar */}
            <div className="mb-5">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-muted font-mono uppercase tracking-wider">Proficiency</span>
                <span className="text-xs font-bold font-mono" style={{ color: group.color }}>
                  {group.confidence}%
                </span>
              </div>
              <div className="h-2 rounded-full bg-border/40 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={headerInView ? { width: `${group.confidence}%` } : {}}
                  transition={{ delay: gi * 0.12 + 0.4, duration: 1.0, ease: "easeOut" }}
                  className="h-full rounded-full relative overflow-hidden"
                  style={{ background: `linear-gradient(90deg, ${group.color}, ${group.color}bb)` }}
                >
                  {/* Shimmer on the bar */}
                  <div
                    className="absolute inset-0 opacity-50"
                    style={{
                      background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.35), transparent)",
                      backgroundSize: "200% auto",
                      animation: "shimmer 2.5s linear infinite",
                    }}
                  />
                </motion.div>
              </div>
            </div>

            {/* Business impact */}
            <div
              className="mb-5 px-4 py-3 rounded-xl border"
              style={{ background: `${group.color}10`, borderColor: `${group.color}30` }}
            >
              <p className="text-xs font-mono uppercase tracking-wider mb-1" style={{ color: group.color }}>
                Impact
              </p>
              <p className="text-sm text-light font-body leading-snug">{group.impact}</p>
            </div>

            {/* Skill tags */}
            <div className="flex flex-wrap gap-2 mt-auto">
              {group.skills.map((skill, si) => (
                <motion.span
                  key={skill}
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={headerInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: gi * 0.12 + si * 0.05 + 0.3 }}
                  whileHover={{ scale: 1.08, y: -2 }}
                  className="rounded-full px-3 py-1.5 text-sm font-body font-medium cursor-default"
                  style={{
                    border: `1px solid ${group.color}40`,
                    color: group.color,
                    background: `${group.color}12`,
                  }}
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </motion.div>
        ))}

        {/* Right padding sentinel */}
        <div className="shrink-0 w-6" />
      </div>

      {/* Dot indicators */}
      <div className="flex items-center justify-center gap-2 mt-6">
        {skillGroups.map((group, i) => (
          <button
            key={group.category}
            onClick={() => scrollToIndex(i)}
            aria-label={`Go to ${group.category}`}
            className="transition-all duration-300"
            style={{
              width: i === activeIndex ? 28 : 8,
              height: 8,
              borderRadius: 4,
              background: i === activeIndex ? group.color : "rgba(148, 163, 184, 0.3)",
              boxShadow: i === activeIndex ? `0 0 10px ${group.color}` : "none",
            }}
          />
        ))}
      </div>
    </section>
  );
}
