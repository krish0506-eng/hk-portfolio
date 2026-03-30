"use client";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { FiBriefcase } from "react-icons/fi";

const experiences = [
  {
    role: "Founder & Lead Developer",
    company: "HYNEX",
    type: "MSME Registered Technology Firm",
    period: "2024 - Present",
    color: "#6c63ff",
    learning: "Built systems thinking and client communication skills through end-to-end project ownership.",
    points: [
      "Delivered 5+ client projects across AI automation and modern web development",
      "Built complete end-to-end systems: frontend, backend, and AI integration",
      "Managed client relationships from requirement analysis to final deployment",
      "Developed agentic AI workflows and LLM-based automation tools",
    ],
  },
  {
    role: "Manufacturing Intern",
    company: "Sree Ram Industries",
    type: "Production & Manufacturing Department",
    period: "25 Days | 2025",
    color: "#00ff88",
    learning: "Understood real-world manufacturing constraints, quality control, and process optimization at scale.",
    points: [
      "Observed and supported end-to-end production line and manufacturing workflows",
      "Assisted in quality inspection, process monitoring, and production planning",
      "Applied core mechanical engineering principles in a live industrial environment",
      "Gained exposure to equipment handling, safety standards, and factory operations",
    ],
  },
  {
    role: "Web Development Intern",
    company: "NullClass",
    type: "Software Development",
    period: "1 Month",
    color: "#00f5ff",
    learning: "Learned professional development practices, code reviews, and API integration workflows.",
    points: [
      "Built web applications using React.js, Node.js, and MongoDB",
      "Integrated third-party APIs and designed backend systems",
      "Participated in real-world development workflows and code reviews",
    ],
  },
  {
    role: "Generative AI Training",
    company: "Internshala",
    type: "AI & Machine Learning",
    period: "6 Weeks",
    color: "#ff2d78",
    learning: "Mastered prompt engineering, RAG systems, and practical LLM application patterns.",
    points: [
      "Completed structured training in prompt engineering and LLM application development",
      "Built RAG-based AI systems using real datasets",
      "Developed hands-on understanding of generative AI tools and workflows",
    ],
  },
  {
    role: "Electronics Intern",
    company: "Salzer Industrial Controls",
    type: "Industrial Electronics",
    period: "Internship",
    color: "#ffd700",
    learning: "Gained practical knowledge of PCB design, circuit testing, and industrial control systems.",
    points: [
      "Worked on circuit wiring, PCB testing, and quality inspection",
      "Gained hands-on exposure to industrial electronics and manufacturing",
    ],
  },
];

export default function Experience() {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <section id="experience" ref={ref} className="py-14 md:py-16 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-10"
        >
          <span className="font-mono text-accent text-sm tracking-widest uppercase">Where I've Worked</span>
          <h2 className="font-display font-bold text-4xl md:text-5xl text-light mt-3">
            <span className="gradient-text">Experience</span>
          </h2>
          <p className="mt-4 text-muted text-base font-body max-w-2xl mx-auto">
            Founder, intern, and contributor across AI, web development, manufacturing, and electronics domains.
          </p>
        </motion.div>

        <div className="relative">
          <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-accent via-cyan to-pink opacity-30" />

          {experiences.map((exp, i) => (
            <motion.div
              key={exp.company}
              initial={{ opacity: 0, x: -40 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: i * 0.15 }}
              className="relative pl-16 pb-9 group"
            >
              <div
                className="absolute left-3.5 top-1 w-5 h-5 rounded-full border-2 border-bg transition-transform group-hover:scale-125"
                style={{ background: exp.color, borderColor: exp.color, boxShadow: `0 0 12px ${exp.color}` }}
              />

              <motion.div
                whileHover={{ x: 6 }}
                className="glass glow-border rounded-2xl p-6"
              >
                <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                  <div>
                    <h3 className="font-display font-bold text-lg text-light">{exp.role}</h3>
                    <p className="font-mono text-base" style={{ color: exp.color }}>{exp.company}</p>
                    <p className="text-muted text-sm font-body mt-0.5">{exp.type}</p>
                  </div>
                  <span className="px-3 py-1 rounded-full text-sm font-mono glass" style={{ color: exp.color, border: `1px solid ${exp.color}40` }}>
                    {exp.period}
                  </span>
                </div>
                <ul className="space-y-1.5 mb-4">
                  {exp.points.map((pt) => (
                    <li key={pt} className="text-muted text-base font-body flex gap-2">
                      <span style={{ color: exp.color }} className="mt-1 shrink-0">▸</span>
                      {pt}
                    </li>
                  ))}
                </ul>

                {/* Key Learning (Idea 94) */}
                <div className="pt-4 border-t border-border/30">
                  <p className="text-xs font-mono text-muted mb-1 uppercase tracking-wider opacity-70">Key Learning</p>
                  <p className="text-sm text-light font-body">{exp.learning}</p>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
