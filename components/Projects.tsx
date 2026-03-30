"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { FiExternalLink, FiGithub, FiChevronDown } from "react-icons/fi";

const projects = [
  {
    title: "FlowMind AI",
    subtitle: "Autonomous Workflow System",
    desc: "Converts meeting inputs into structured tasks using multi-agent AI. Automates task assignment, tracking, delay detection, reminders, and escalation workflows end-to-end.",
    problem: "Teams struggle to convert meeting insights into actionable tasks manually.",
    solution: "Multi-agent AI system that auto-parses, prioritizes, and assigns work with trackin.",
    impact: "Reduced manual task entry by 90%, saved 5+ hours per team per week.",
    learnings: "Multi-agent orchestration requires careful state management and error recovery.",
    tags: ["Python", "Multi-Agent AI", "LLM", "Automation"],
    status: "live",
    color: "#6c63ff",
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
    color: "#00f5ff",
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
    color: "#ff2d78",
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
    color: "#ffd700",
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
    color: "#00ff88",
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
    color: "#ff8c00",
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
    featured: false,
  },
  {
    title: "Sustainability Projects",
    subtitle: "Waste-to-Value Engineering",
    desc: "Plastic-to-fuel via pyrolysis, plastic-to-3D-filament recycling system, and waste-to-energy concept prototyping for circular economy solutions.",
    problem: "Waste streams lack practical conversion pathways to valuable resources.",
    solution: "Multi-path waste conversion: fuel synthesis, filament recycling, energy recovery.",
    impact: "Processed 500kg+ waste into usable materials through developed Systems.",
    learnings: "Circular economy requires thoughtful thermodynamic and logistics design.",
    tags: ["Additive Manufacturing", "Sustainability", "Engineering"],
    status: "prototype",
    color: "#22c55e",
    featured: false,
  },
];

export default function Projects() {
  const [showAll, setShowAll] = useState(false);
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });
  const displayed = showAll ? projects : projects.filter((p) => p.featured);

  return (
    <section id="projects" ref={ref} className="py-14 md:py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-10"
        >
          <span className="font-mono text-accent text-sm tracking-widest uppercase">What I Built</span>
          <h2 className="font-display font-bold text-4xl md:text-5xl text-light mt-3">
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <p className="mt-4 text-muted text-base font-body max-w-2xl mx-auto">
            Shipped products and systems spanning AI automation, mobile apps, IoT, and sustainable engineering.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {displayed.map((proj, i) => (
              <motion.div
                key={proj.title}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -12, rotateX: 6, rotateY: -6, boxShadow: `0 34px 70px ${proj.color}25` }}
                style={{ transformStyle: "preserve-3d", transformPerspective: 1000 }}
                className="glass glow-border rounded-3xl p-7 group relative overflow-hidden flex flex-col"
              >
                <div
                  className="absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl opacity-10 group-hover:opacity-20 transition-opacity"
                  style={{ background: proj.color }}
                />
                
                {/* Status Badge (Idea 72) */}
                <div className="mb-4 flex items-center justify-between">
                  <div className="w-12 h-1 rounded-full" style={{ background: proj.color }} />
                  <span className="text-xs font-mono px-2 py-1 rounded-full" style={{ background: `${proj.color}20`, color: proj.color }}>
                    {proj.status}
                  </span>
                </div>

                <h3 className="font-display font-bold text-xl text-light mb-1" style={{ transform: "translateZ(24px)" }}>{proj.title}</h3>
                <p className="font-mono text-sm mb-4" style={{ color: proj.color, transform: "translateZ(18px)" }}>{proj.subtitle}</p>
                <p className="text-muted text-base font-body leading-relaxed mb-5">{proj.desc}</p>

                {/* Case-Study Format: Problem, Solution, Impact (Ideas 61-62) */}
                <div className="mb-5 space-y-3 text-sm">
                  <div>
                    <p className="font-mono text-xs text-muted mb-1 opacity-70">Problem</p>
                    <p className="text-muted leading-snug">{proj.problem}</p>
                  </div>
                  <div>
                    <p className="font-mono text-xs text-muted mb-1 opacity-70">Solution</p>
                    <p className="text-muted leading-snug">{proj.solution}</p>
                  </div>
                  <div style={{ borderLeft: `2px solid ${proj.color}60`, paddingLeft: "12px" }}>
                    <p className="font-mono text-xs font-semibold mb-1" style={{ color: proj.color }}>Impact</p>
                    <p className="text-light font-body leading-snug font-medium">{proj.impact}</p>
                  </div>
                </div>

                {/* Key Learnings (Idea 75) */}
                <div className="mb-5 p-3 rounded-lg bg-border/20 border border-border/40">
                  <p className="font-mono text-xs text-muted mb-1">Learnings</p>
                  <p className="text-xs text-muted leading-relaxed">{proj.learnings}</p>
                </div>

                <div className="flex flex-wrap gap-2 mt-auto">
                  {proj.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 rounded-full text-xs font-mono"
                      style={{ background: `${proj.color}15`, color: proj.color, border: `1px solid ${proj.color}30` }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
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
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowAll(!showAll)}
            className="flex items-center gap-2 px-8 py-3 rounded-full glow-border text-accent font-body text-base hover:bg-accent/10 transition-all"
          >
            {showAll ? "Show Less" : "View All Projects"}
            <motion.span animate={{ rotate: showAll ? 180 : 0 }}>
              <FiChevronDown />
            </motion.span>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
