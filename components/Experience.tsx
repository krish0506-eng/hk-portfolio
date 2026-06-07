"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { FiBriefcase } from "react-icons/fi";

const experiences = [
  {
    role: "Electronics Intern",
    company: "Salzer Industrial Controls",
    type: "Industrial Electronics & Control Systems",
    period: "Internship",
    color: "#ffd700",
    learning: "Learned industrial-grade PCB testing, circuit debugging, and the gap between academic circuits and production electronics.",
    points: [
      "Performed PCB assembly, soldering, and functional testing of industrial control boards",
      "Troubleshot circuit failures using multimeters, oscilloscopes, and systematic debug protocols",
      "Assisted in quality inspection of electronic components and assembled PCBs",
      "Worked on relay logic panels and understood industrial control system architecture",
      "Gained hands-on experience with wiring looms, terminal blocks, and panel integration",
    ],
  },
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
      "Studied lean manufacturing practices and waste reduction techniques on the shop floor",
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
];

export default function Experience() {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });
  const timelineRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start 60px", "end 60px"],
  });
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="experience" ref={ref} className="py-14 md:py-16 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-10"
        >
          <span className="font-mono text-accent text-sm tracking-widest uppercase section-label">Where I've Worked</span>
          <h2 className="font-display font-bold text-4xl md:text-5xl text-light mt-3">
            <span className="gradient-text">Experience</span>
          </h2>
          <p className="mt-4 text-muted text-base font-body max-w-2xl mx-auto">
            Founder, intern, and contributor across AI, web development, manufacturing, and electronics domains.
          </p>
        </motion.div>

        <div ref={timelineRef} className="relative">
          {/* Animated timeline line */}
          <motion.div
            className="absolute left-6 top-0 w-px bg-gradient-to-b from-accent via-cyan to-pink"
            style={{ height: lineHeight, opacity: 0.5 }}
          />

          {experiences.map((exp, i) => (
            <motion.div
              key={exp.company}
              initial={{ opacity: 0, x: 40 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: i * 0.15, duration: 0.6 }}
              className="relative pl-16 pb-9 group"
            >
              {/* Connector dot */}
              <motion.div
                initial={{ scale: 0 }}
                animate={inView ? { scale: 1 } : {}}
                transition={{ delay: i * 0.15 + 0.2, type: "spring", stiffness: 300 }}
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
                    <motion.p
                      whileHover={{ color: exp.color }}
                      className="font-mono text-base transition-colors duration-300"
                      style={{ color: exp.color }}
                    >{exp.company}</motion.p>
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

                {/* Key Learning */}
                <div className="pt-4 border-t border-border/30 pl-4 ml-1"
                  style={{ borderLeft: `2px solid ${exp.color}40`, background: `${exp.color}04` }}>
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
