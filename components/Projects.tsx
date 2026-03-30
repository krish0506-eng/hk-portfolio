"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  FiExternalLink, FiGithub, FiChevronDown, FiX,
  FiZap, FiTarget, FiTrendingUp, FiBookOpen, FiCode,
} from "react-icons/fi";

type Project = {
  title: string;
  subtitle: string;
  desc: string;
  problem: string;
  solution: string;
  impact: string;
  learnings: string;
  tags: string[];
  status: string;
  color: string;
  glow: string;
  featured: boolean;
};

const projects: Project[] = [
  {
    title: "FlowMind AI",
    subtitle: "Autonomous Workflow System",
    desc: "Converts meeting inputs into structured tasks using multi-agent AI. Automates task assignment, tracking, delay detection, reminders, and escalation workflows end-to-end.",
    problem: "Teams struggle to convert meeting insights into actionable tasks manually.",
    solution: "Multi-agent AI system that auto-parses, prioritizes, and assigns work with tracking.",
    impact: "Reduced manual task entry by 90%, saved 5+ hours per team per week.",
    learnings: "Multi-agent orchestration requires careful state management and error recovery.",
    tags: ["Python", "Multi-Agent AI", "LLM", "Automation"],
    status: "live",
    color: "#8b5cf6",
    glow: "rgba(139, 92, 246, 0.35)",
    featured: true,
  },
  {
    title: "AI Agentic Email System",
    subtitle: "Email Automation Agent",
    desc: "Automates email workflows using AI agents that parse, prioritize, and respond. Converts messages to tasks with scheduling, follow-ups, and smart escalation.",
    problem: "Email overload makes it hard to prioritize and track follow-ups consistently.",
    solution: "Agentic AI system understands intent, prioritizes by urgency, and schedules responses.",
    impact: "60% faster email processing, zero missed follow-ups through automation.",
    learnings: "Email context extraction needs domain-specific prompting for accuracy.",
    tags: ["Agentic AI", "Python", "Backend", "Automation"],
    status: "live",
    color: "#06b6d4",
    glow: "rgba(6, 182, 212, 0.35)",
    featured: true,
  },
  {
    title: "Hira",
    subtitle: "AI Fitness Companion App",
    desc: "AI-powered health tracking app with personalized fitness recommendations, real-time data sync via Firebase, and activity pattern analysis.",
    problem: "Generic fitness apps don't adapt to individual progress patterns and preferences.",
    solution: "Personalized AI engine analyzes activity data and tailors recommendations in real-time.",
    impact: "Users reported 3x higher consistency in workout adherence with AI coaching.",
    learnings: "Mobile + backend sync requires careful optimization for offline-first UX.",
    tags: ["Flutter", "Firebase", "React", "AI"],
    status: "live",
    color: "#d946ef",
    glow: "rgba(217, 70, 239, 0.35)",
    featured: true,
  },
  {
    title: "As Always",
    subtitle: "Emotional Intelligence App",
    desc: "Emotion-aware chatbot with empathetic, context-sensitive responses. Sentiment analysis adapts tone based on user emotional state.",
    problem: "Chatbots feel robotic and don't adjust tone based on user's emotional context.",
    solution: "NLP-powered sentiment engine tailors responses with appropriate empathy and tone.",
    impact: "80% user satisfaction on emotional response quality vs standard chatbots.",
    learnings: "Emotional tone requires careful prompt design and user feedback loops.",
    tags: ["Flutter", "Firebase", "AI", "NLP"],
    status: "prototype",
    color: "#f59e0b",
    glow: "rgba(245, 158, 11, 0.35)",
    featured: false,
  },
  {
    title: "Smart Wearable System",
    subtitle: "IoT Health Monitor",
    desc: "Real-time health monitoring wearable using multi-sensor integration with data tracking, processing, and wireless communication.",
    problem: "Existing wearables have limited real-time analytics and poor data integration.",
    solution: "Custom multi-sensor stack with real-time processing and cloud sync.",
    impact: "10+ health metrics tracked simultaneously with <100ms latency.",
    learnings: "Sensor fusion and calibration is critical for data accuracy.",
    tags: ["IoT", "Sensors", "Embedded Systems"],
    status: "prototype",
    color: "#10b981",
    glow: "rgba(16, 185, 129, 0.35)",
    featured: false,
  },
  {
    title: "GoKart Telemetry",
    subtitle: "Real-time Performance Dashboard",
    desc: "Telemetry dashboard tracking speed, torque, and performance metrics with live sensor data visualization for tuning and diagnostics.",
    problem: "Speed calculation requires real-time data collection and live feedback for optimization.",
    solution: "Embedded telemetry system with React dashboard for live performance analysis.",
    impact: "Enabled 20% performance optimization through real-time data-driven tuning.",
    learnings: "Real-time dashboards need efficient data streaming and memory management.",
    tags: ["React", "Embedded Systems", "Data Viz"],
    status: "live",
    color: "#f97316",
    glow: "rgba(249, 115, 22, 0.35)",
    featured: false,
  },
  {
    title: "Dynamo EV Prototype",
    subtitle: "Sustainable Electric Vehicle",
    desc: "Prototype vehicle based on dynamo-powered alternative energy with regenerative energy principles applied to small-scale electric mobility.",
    problem: "Electric vehicle efficiency is limited by conventional battery-only architectures.",
    solution: "Hybrid dynamo + battery system with energy recovery from motion.",
    impact: "50% extended range through regenerative energy capture mechanisms.",
    learnings: "Mechanical-electrical integration requires careful system balancing.",
    tags: ["Embedded Systems", "Prototyping", "Green Energy"],
    status: "paused",
    color: "#a855f7",
    glow: "rgba(168, 85, 247, 0.35)",
    featured: false,
  },
  {
    title: "Sustainability Projects",
    subtitle: "Waste-to-Value Engineering",
    desc: "Plastic-to-fuel via pyrolysis, plastic-to-3D-filament recycling system, and waste-to-energy concept prototyping for circular economy solutions.",
    problem: "Waste streams lack practical conversion pathways to valuable resources.",
    solution: "Multi-path waste conversion: fuel synthesis, filament recycling, energy recovery.",
    impact: "Processed 500kg+ waste into usable materials through developed systems.",
    learnings: "Circular economy requires thoughtful thermodynamic and logistics design.",
    tags: ["Additive Manufacturing", "Sustainability", "Engineering"],
    status: "prototype",
    color: "#22c55e",
    glow: "rgba(34, 197, 94, 0.35)",
    featured: false,
  },
];

const statusColors: Record<string, string> = {
  live:      "#10b981",
  prototype: "#f59e0b",
  paused:    "#94a3b8",
};

/* ── Project Detail Modal ────────────────────────────────────── */
function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  /* close on Escape */
  useEffect(() => {
    const handler = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  /* prevent body scroll */
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  const p = project;

  return (
    <motion.div
      key="modal-backdrop"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-[9998] flex items-end md:items-center justify-center p-4 md:p-6"
      style={{ background: "rgba(3, 7, 18, 0.88)", backdropFilter: "blur(18px)" }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <motion.div
        initial={{ opacity: 0, y: 80, scale: 0.94 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 80, scale: 0.94 }}
        transition={{ type: "spring", damping: 28, stiffness: 280 }}
        className="relative w-full max-w-3xl max-h-[92vh] overflow-y-auto rounded-3xl scrollbar-hide"
        style={{
          background: "rgba(15, 23, 42, 0.96)",
          border: `1px solid ${p.color}40`,
          boxShadow: `0 40px 80px ${p.glow}, 0 0 0 1px ${p.color}20`,
        }}
      >
        {/* ── Header gradient strip ──────────────────────── */}
        <div
          className="relative h-44 rounded-t-3xl overflow-hidden"
          style={{
            background: `linear-gradient(135deg, ${p.color}25 0%, ${p.color}10 50%, transparent 100%)`,
          }}
        >
          {/* Decorative glow */}
          <div
            className="absolute -top-10 -right-10 w-56 h-56 rounded-full blur-3xl opacity-25"
            style={{ background: p.color }}
          />
          <div
            className="absolute -bottom-8 -left-8 w-40 h-40 rounded-full blur-3xl opacity-15"
            style={{ background: p.color }}
          />

          {/* Close button */}
          <motion.button
            whileHover={{ scale: 1.1, rotate: 90 }}
            whileTap={{ scale: 0.9 }}
            onClick={onClose}
            className="absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center z-10"
            style={{ background: "rgba(15, 23, 42, 0.7)", border: `1px solid ${p.color}40` }}
          >
            <FiX size={18} className="text-light" />
          </motion.button>

          {/* Status + title */}
          <div className="absolute bottom-5 left-7">
            <span
              className="inline-block px-3 py-1 rounded-full text-xs font-mono mb-3"
              style={{
                background: `${statusColors[p.status] ?? "#94a3b8"}20`,
                color: statusColors[p.status] ?? "#94a3b8",
                border: `1px solid ${statusColors[p.status] ?? "#94a3b8"}40`,
              }}
            >
              ● {p.status}
            </span>
            <h2 className="font-display font-bold text-3xl md:text-4xl text-light leading-tight">{p.title}</h2>
            <p className="font-mono text-base mt-1" style={{ color: p.color }}>{p.subtitle}</p>
          </div>
        </div>

        {/* ── Body ─────────────────────────────────────────── */}
        <div className="p-7 md:p-9 space-y-8">
          {/* Description */}
          <p className="text-muted text-base leading-relaxed font-body">{p.desc}</p>

          {/* Tech stack */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <FiCode size={16} style={{ color: p.color }} />
              <h3 className="font-mono text-sm uppercase tracking-widest" style={{ color: p.color }}>
                Technology Stack
              </h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {p.tags.map((tag, i) => (
                <motion.span
                  key={tag}
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.05 }}
                  className="px-3 py-1.5 rounded-full text-sm font-mono"
                  style={{
                    background: `${p.color}15`,
                    color: p.color,
                    border: `1px solid ${p.color}35`,
                  }}
                >
                  {tag}
                </motion.span>
              ))}
            </div>
          </div>

          {/* Problem / Solution / Impact */}
          <div className="grid md:grid-cols-3 gap-5">
            {[
              { icon: FiZap,       label: "Problem",  text: p.problem,  iconColor: "#94a3b8" },
              { icon: FiTarget,    label: "Solution", text: p.solution, iconColor: p.color },
              { icon: FiTrendingUp,label: "Impact",   text: p.impact,   iconColor: "#10b981" },
            ].map(({ icon: Icon, label, text, iconColor }) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
                className="rounded-2xl p-5"
                style={{
                  background: `${p.color}08`,
                  border: `1px solid ${p.color}20`,
                }}
              >
                <div className="flex items-center gap-2 mb-3">
                  <Icon size={15} style={{ color: iconColor }} />
                  <span className="text-xs font-mono uppercase tracking-wider" style={{ color: iconColor }}>
                    {label}
                  </span>
                </div>
                <p
                  className="text-sm font-body leading-relaxed"
                  style={{ color: label === "Impact" ? "#f1f5f9" : "#94a3b8" }}
                >
                  {text}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Key Learnings */}
          <div
            className="rounded-2xl p-6"
            style={{
              background: "rgba(15, 23, 42, 0.5)",
              borderLeft: `3px solid ${p.color}`,
              border: `1px solid ${p.color}25`,
            }}
          >
            <div className="flex items-center gap-2 mb-3">
              <FiBookOpen size={15} style={{ color: p.color }} />
              <span className="text-xs font-mono uppercase tracking-wider" style={{ color: p.color }}>
                Key Learnings
              </span>
            </div>
            <p className="text-muted text-base font-body leading-relaxed italic">
              &ldquo;{p.learnings}&rdquo;
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ── Main Projects Section ───────────────────────────────────── */
export default function Projects() {
  const [showAll, setShowAll] = useState(false);
  const [selected, setSelected] = useState<Project | null>(null);
  const [ref, inView] = useInView({ threshold: 0.05, triggerOnce: true });
  const displayed = showAll ? projects : projects.filter((p) => p.featured);

  return (
    <section id="projects" ref={ref} className="py-14 md:py-16 px-6 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 right-0 w-96 h-96 -translate-y-1/2 rounded-full blur-3xl opacity-5"
          style={{ background: "radial-gradient(circle, #d946ef, transparent 70%)" }} />
      </div>

      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <span className="font-mono text-accent text-sm tracking-widest uppercase">What I Built</span>
          <h2 className="font-display font-bold text-4xl md:text-5xl text-light mt-3">
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <p className="mt-4 text-muted text-base font-body max-w-2xl mx-auto">
            Shipped products spanning AI automation, mobile apps, IoT, and sustainable engineering.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {displayed.map((proj, i) => (
              <motion.div
                key={proj.title}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: i * 0.09, duration: 0.55 }}
                whileHover={{
                  y: -14,
                  rotateX: 4,
                  rotateY: -4,
                  boxShadow: `0 36px 72px ${proj.glow}, 0 0 60px ${proj.glow.replace("0.35","0.12")}`,
                }}
                style={{ transformStyle: "preserve-3d", perspective: 1000 }}
                className="glass rounded-3xl border border-border/50 p-7 group relative overflow-hidden flex flex-col cursor-pointer"
                onClick={() => setSelected(proj)}
              >
                {/* Top glow */}
                <div
                  className="absolute top-0 right-0 w-36 h-36 rounded-full blur-3xl opacity-0 group-hover:opacity-25 transition-opacity duration-500"
                  style={{ background: proj.color }}
                />
                {/* Gradient top bar */}
                <div
                  className="absolute top-0 left-0 right-0 h-px opacity-60"
                  style={{ background: `linear-gradient(90deg, transparent, ${proj.color}, transparent)` }}
                />

                {/* Status */}
                <div className="mb-5 flex items-center justify-between">
                  <div className="w-10 h-1 rounded-full" style={{ background: proj.color }} />
                  <span
                    className="text-xs font-mono px-2.5 py-1 rounded-full"
                    style={{ background: `${proj.color}18`, color: proj.color, border: `1px solid ${proj.color}35` }}
                  >
                    {proj.status}
                  </span>
                </div>

                <h3
                  className="font-display font-bold text-xl text-light mb-1"
                  style={{ transform: "translateZ(24px)" }}
                >
                  {proj.title}
                </h3>
                <p className="font-mono text-sm mb-4" style={{ color: proj.color, transform: "translateZ(18px)" }}>
                  {proj.subtitle}
                </p>
                <p className="text-muted text-sm font-body leading-relaxed mb-5 line-clamp-3">{proj.desc}</p>

                {/* Impact highlight */}
                <div
                  className="mb-5 px-4 py-3 rounded-xl text-sm"
                  style={{ borderLeft: `2px solid ${proj.color}70`, background: `${proj.color}08` }}
                >
                  <p className="font-mono text-xs mb-1 opacity-60" style={{ color: proj.color }}>Impact</p>
                  <p className="text-light font-body font-medium leading-snug">{proj.impact}</p>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mt-auto mb-5">
                  {proj.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 rounded-full text-xs font-mono"
                      style={{ background: `${proj.color}12`, color: proj.color, border: `1px solid ${proj.color}28` }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* View details CTA */}
                <motion.div
                  className="flex items-center gap-2 text-sm font-mono font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ color: proj.color }}
                >
                  <span>View Case Study</span>
                  <motion.span animate={{ x: [0, 4, 0] }} transition={{ duration: 1.2, repeat: Infinity }}>
                    →
                  </motion.span>
                </motion.div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
          className="flex justify-center mt-12"
        >
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(139, 92, 246, 0.25)" }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowAll(!showAll)}
            className="flex items-center gap-2 px-8 py-3.5 rounded-full glow-border text-accent font-body text-base hover:bg-accent/10 transition-all"
          >
            {showAll ? "Show Less" : "View All Projects"}
            <motion.span animate={{ rotate: showAll ? 180 : 0 }} transition={{ duration: 0.3 }}>
              <FiChevronDown />
            </motion.span>
          </motion.button>
        </motion.div>
      </div>

      {/* ── Modal ────────────────────────────────────────────── */}
      <AnimatePresence>
        {selected && (
          <ProjectModal project={selected} onClose={() => setSelected(null)} />
        )}
      </AnimatePresence>
    </section>
  );
}
