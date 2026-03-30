"use client";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const skillGroups = [
  {
    category: "Programming",
    description: "Core languages for building systems",
    confidence: 95,
    impact: "Reduce development time, improve code maintainability",
    color: "#6c63ff",
    skills: ["Python", "JavaScript", "TypeScript", "C"],
  },
  {
    category: "App Development",
    description: "Full-stack web and modern frameworks",
    confidence: 90,
    impact: "Deliver performant, scalable web products",
    color: "#00f5ff",
    skills: ["React.js", "Next.js", "Node.js", "MERN Stack", "Vite"],
  },
  {
    category: "AI & Automation",
    description: "Agentic systems and LLM workflows",
    confidence: 88,
    impact: "Automate repetitive work, unlock AI-powered features",
    color: "#ff2d78",
    skills: ["LLMs", "LangChain", "RAG Systems", "Agentic AI", "Prompt Engineering", "Generative AI", "Workflow Automation"],
  },
  {
    category: "Backend & Tools",
    description: "Databases, APIs, and deployment",
    confidence: 85,
    impact: "Build reliable infrastructure, smooth data operations",
    color: "#ffd700",
    skills: ["Firebase", "MongoDB", "REST APIs", "Git", "Postman", "AWS"],
  },
  {
    category: "Engineering",
    description: "Hardware design and systems integration",
    confidence: 92,
    impact: "Bridge hardware and software, create cohesive systems",
    color: "#00ff88",
    skills: ["Additive Manufacturing", "3D Printing", "Embedded Systems", "IoT", "Product Design", "System Integration"],
  },
];

export default function Skills() {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <section id="skills" ref={ref} className="py-14 md:py-16 px-6 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-full opacity-10"
          style={{ background: "linear-gradient(to bottom, transparent, #6c63ff, transparent)" }} />
      </div>

      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-10"
        >
          <span className="font-mono text-accent text-sm tracking-widest uppercase">What I Know</span>
          <h2 className="font-display font-bold text-4xl md:text-5xl text-light mt-3">
            Technical <span className="gradient-text">Skills</span>
          </h2>
          <p className="mt-4 text-muted text-base font-body max-w-2xl mx-auto">
            Proficiency across engineering, AI, app development, and system integration.
          </p>
        </motion.div>

        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {skillGroups.map((group, gi) => (
            <motion.div
              key={group.category}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: gi * 0.15 }}
              whileHover={{ y: -4 }}
              className="glass rounded-2xl border border-border p-6"
            >
              <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-3 w-3 rounded-full" style={{ background: group.color, boxShadow: `0 0 12px ${group.color}` }} />
                  <span className="font-mono text-lg tracking-wide" style={{ color: group.color }}>
                    {group.category.toUpperCase()}
                  </span>
                </div>
              </div>

              {/* Confidence Level Bar (Idea 42) */}
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-muted font-mono">Proficiency</span>
                  <span className="text-xs font-semibold" style={{ color: group.color }}>{group.confidence}%</span>
                </div>
                <div className="h-2 rounded-full bg-border/60 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={inView ? { width: `${group.confidence}%` } : {}}
                    transition={{ delay: gi * 0.15 + 0.3, duration: 0.8, ease: "easeOut" }}
                    className="h-full rounded-full"
                    style={{ background: group.color, boxShadow: `0 0 12px ${group.color}` }}
                  />
                </div>
              </div>

              {/* Section Description (Idea 143) */}
              <p className="text-xs text-muted font-body mb-4">{group.description}</p>

              {/* Business Impact Tag (Idea 58) */}
              <div className="mb-4 p-3 rounded-lg bg-border/20 border border-border/40">
                <p className="text-xs font-mono text-muted mb-1">Business Impact</p>
                <p className="text-xs text-light font-medium" style={{ color: group.color }}>{group.impact}</p>
              </div>

              <div className="flex flex-wrap gap-2.5">
                {group.skills.map((skill, si) => (
                  <motion.span
                    key={skill}
                    initial={{ opacity: 0, scale: 0.92 }}
                    animate={inView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: gi * 0.15 + si * 0.05 }}
                    whileHover={{ scale: 1.04 }}
                    className="rounded-full px-4 py-2 text-lg font-body font-medium transition-all duration-200"
                    style={{
                      border: `1px solid ${group.color}45`,
                      color: group.color,
                      background: `${group.color}14`,
                    }}
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
