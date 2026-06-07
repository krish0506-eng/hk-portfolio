"use client";
import { useRef, useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const skillGroups = [
  {
    category: "Embedded & Hardware",
    description: "Microcontrollers, PCB design, and electronics assembly",
    confidence: 92,
    color: "#10b981",
    skills: ["Arduino", "ESP8266/ESP32", "PCB Design", "Sensors", "Circuit Wiring", "Electronics Assembly"],
  },
  {
    category: "Firmware & IoT",
    description: "Embedded scripting and wireless connectivity",
    confidence: 90,
    color: "#06b6d4",
    skills: ["Python", "C", "MQTT", "ThingSpeak", "Firebase", "REST APIs", "Embedded Scripting"],
  },
  {
    category: "PLC & Industrial",
    description: "Industrial control systems fundamentals",
    confidence: 40,
    color: "#f59e0b",
    skills: ["Siemens S7 Basics", "Ladder Logic", "Industrial Control Systems"],
  },
  {
    category: "3D & Manufacturing",
    description: "Additive and subtractive manufacturing processes",
    confidence: 92,
    color: "#a855f7",
    skills: ["FDM", "SLA", "SLS", "Additive Manufacturing", "Product Design", "Process Optimisation"],
  },
  {
    category: "AI & Automation",
    description: "Agentic systems and intelligent workflows",
    confidence: 88,
    color: "#d946ef",
    skills: ["LLMs", "LangChain", "RAG Systems", "Agentic AI", "Prompt Engineering", "Generative AI"],
  },
  {
    category: "Programming",
    description: "Core languages powering every system",
    confidence: 95,
    color: "#8b5cf6",
    skills: ["Python", "JavaScript", "TypeScript", "C", "Dart"],
  },
  {
    category: "App Development",
    description: "Full-stack web with modern frameworks",
    confidence: 90,
    color: "#06b6d4",
    skills: ["React.js", "Next.js", "Node.js", "MERN Stack", "Flutter"],
  },
  {
    category: "Backend & Tools",
    description: "Databases, APIs, and deployment",
    confidence: 85,
    color: "#f59e0b",
    skills: ["Firebase", "MongoDB", "REST APIs", "Git", "Postman", "AWS"],
  },
];

const CARD_W = 260;
const CARD_GAP = 16;

export default function Skills() {
  const [headerRef, headerInView] = useInView({ threshold: 0.1, triggerOnce: true });
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [canLeft, setCanLeft] = useState(false);
  const [canRight, setCanRight] = useState(true);

  const updateState = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setCanLeft(el.scrollLeft > 8);
    setCanRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 8);
    setActiveIndex(Math.min(Math.round(el.scrollLeft / (CARD_W + CARD_GAP)), skillGroups.length - 1));
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

  return (
    <section id="skills" className="py-12 md:py-16 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-20 left-1/4 w-72 h-72 rounded-full blur-3xl opacity-[0.04]"
          style={{ background: "radial-gradient(circle, #8b5cf6, transparent 70%)" }} />
      </div>

      {/* Header */}
      <div ref={headerRef} className="max-w-6xl mx-auto px-6 mb-8">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }} className="flex items-end justify-between gap-4 flex-wrap">
          <div>
            <span className="font-mono text-accent text-sm tracking-widest uppercase section-label">What I Know</span>
            <h2 className="font-display font-bold text-4xl md:text-5xl text-light mt-2">
              Technical <span className="gradient-text">Skills</span>
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.92 }}
              onClick={() => scrollBy(-1)} disabled={!canLeft}
              className="neu-btn w-10 h-10 rounded-full flex items-center justify-center disabled:opacity-30" aria-label="Previous">
              <FiChevronLeft size={18} className="text-light" />
            </motion.button>
            <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.92 }}
              onClick={() => scrollBy(1)} disabled={!canRight}
              className="neu-btn w-10 h-10 rounded-full flex items-center justify-center disabled:opacity-30" aria-label="Next">
              <FiChevronRight size={18} className="text-light" />
            </motion.button>
          </div>
        </motion.div>
      </div>

      {/* Carousel */}
      <div ref={scrollRef}
        className="flex overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-4 pl-6"
        style={{ gap: CARD_GAP, paddingRight: "1.5rem" }}>
        <div className="shrink-0 w-0" />
        {skillGroups.map((group, gi) => (
          <motion.div key={group.category}
            initial={{ opacity: 0, y: 30 }} animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: gi * 0.1 }}
            whileHover={{ y: -6, boxShadow: `0 20px 40px ${group.color}30` }}
            className="snap-start shrink-0 glass rounded-2xl border border-border/60 p-5 relative overflow-hidden group flex flex-col"
            style={{ width: CARD_W, minHeight: 320 }}>

            {/* Hover glow */}
            <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full blur-3xl opacity-0 group-hover:opacity-25 transition-opacity duration-500"
              style={{ background: group.color }} />

            {/* Top bar */}
            <div className="w-full h-0.5 rounded-full mb-4"
              style={{ background: `linear-gradient(90deg, ${group.color}, transparent)` }} />

            {/* Category */}
            <div className="flex items-center gap-2 mb-1">
              <div className="w-2.5 h-2.5 rounded-full shrink-0"
                style={{ background: group.color, boxShadow: `0 0 8px ${group.color}` }} />
              <span className="font-mono text-sm font-semibold uppercase tracking-wider" style={{ color: group.color }}>
                {group.category}
              </span>
            </div>
            <p className="text-muted text-xs font-body mb-4">{group.description}</p>

            {/* Proficiency bar */}
            <div className="mb-4">
              <div className="flex justify-between mb-1.5">
                <span className="text-xs text-muted font-mono">Proficiency</span>
                <span className="text-xs font-bold font-mono inline-flex items-center gap-1.5" style={{ color: group.color }}>
                  {group.confidence === 40 ? (
                    <><span className="inline-block animate-spin" style={{ fontSize: 10 }}>⟳</span> Learning</>
                  ) : `${group.confidence}%`}
                </span>
              </div>
              <div className="h-1.5 rounded-full bg-border/40 overflow-hidden relative">
                <motion.div initial={{ width: 0 }}
                  animate={headerInView ? { width: `${group.confidence}%` } : {}}
                  transition={{ delay: gi * 0.1 + 0.4, duration: 1.2, ease: "easeOut" }}
                  className="h-full rounded-full relative"
                  style={{ background: `linear-gradient(90deg, ${group.color}, ${group.color}99)` }}>
                  {group.confidence > 0 && (
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full"
                      style={{ background: group.color, boxShadow: `0 0 6px ${group.color}, 0 0 12px ${group.color}` }} />
                  )}
                </motion.div>
              </div>
            </div>

            {/* Vertical accent line */}
            <div className="absolute left-0 top-4 bottom-4 w-0.5 rounded-full opacity-60"
              style={{ background: `linear-gradient(180deg, ${group.color}, transparent)`, boxShadow: `0 0 8px ${group.color}40` }} />

            {/* Skill tags */}
            <div className="flex flex-wrap gap-1.5 mt-auto scrollbar-hide" style={{ overflowX: 'auto' }}>
              {group.skills.map((skill, si) => (
                <motion.span key={skill}
                  initial={{ opacity: 0, scale: 0.85 }} animate={headerInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: gi * 0.1 + si * 0.04 + 0.3 }}
                  className="rounded-full px-2.5 py-1 text-xs font-mono cursor-default transition-all duration-200 hover:scale-105"
                  style={{ border: `1px solid ${group.color}35`, color: group.color, background: `${group.color}10`, transition: 'transform 0.2s ease, border-color 0.2s ease' }}>
                  {skill}
                </motion.span>
              ))}
            </div>
          </motion.div>
        ))}
        <div className="shrink-0 w-6" />
      </div>
    </section>
  );
}
