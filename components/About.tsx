"use client";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { FiCode, FiCpu, FiZap, FiGlobe } from "react-icons/fi";

const stats = [
  { label: "CGPA", value: "8.5" },
  { label: "Certifications", value: "12+" },
  { label: "Automations Built", value: "20+" },
  { label: "Tech Domains", value: "4" },
];

const traits = [
  { icon: FiZap, title: "AI-First Thinker", desc: "Building agentic systems and LLM-powered apps" },
  { icon: FiCode, title: "Product Builder", desc: "React, Next.js, Node.js, Python end-to-end" },
  { icon: FiCpu, title: "Hardware + Software", desc: "Embedded systems, IoT, and additive manufacturing" },
  { icon: FiGlobe, title: "MSME Founder", desc: "Running HYNEX - a registered tech firm since 2024" },
];

export default function About() {
  const [ref, inView] = useInView({ threshold: 0.2, triggerOnce: true });

  return (
    <section id="about" ref={ref} className="py-14 md:py-16 px-6 max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="text-center mb-10"
      >
        <span className="font-mono text-accent text-sm tracking-widest uppercase">Who I Am</span>
        <h2 className="font-display font-bold text-4xl md:text-5xl text-light mt-3">
          About <span className="gradient-text">Me</span>
        </h2>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-8 items-center mb-10">
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.2 }}
        >
          {/* Metric-driven opening (Idea 6) */}
          <p className="text-accent font-body font-bold text-base mb-4">
            🎯 Built 20+ automations and achieved 8.5/10 CGPA while running HYNEX — my registered tech firm.
          </p>

          <p className="text-muted text-lg leading-relaxed font-body mb-5">
            I'm a <span className="text-light font-medium">freelance vibe coder and AI systems engineer</span> currently
            pursuing B.E. Mechanical & Mechatronics (Additive Manufacturing) at SNS College of
            Engineering, Coimbatore - with a CGPA of{" "}
            <span className="text-accent font-medium">8.5/10</span>.
          </p>
          <p className="text-muted text-lg leading-relaxed font-body mb-5">
            I founded <span className="text-cyan font-medium">HYNEX</span>, an MSME-registered
            technology firm, where I deliver end-to-end AI automation systems, modern web
            applications, and intelligent workflow tools to real clients.
          </p>
          <p className="text-muted text-lg leading-relaxed font-body">
            My unique edge: I combine <span className="text-pink font-medium">engineering hardware knowledge</span> with
            cutting-edge AI and software skills - building systems that actually work in the real world.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 60 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.4 }}
          className="grid grid-cols-2 gap-4"
        >
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.5 + i * 0.1 }}
              whileHover={{ scale: 1.05, borderColor: "#6c63ff" }}
              className="glass glow-border rounded-2xl p-5 text-center"
            >
                <div className="font-display font-bold text-3xl gradient-text mb-2">{stat.value}</div>
              <div className="text-muted text-base font-body">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {traits.map((trait, i) => (
          <motion.div
            key={trait.title}
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.6 + i * 0.15 }}
            whileHover={{ y: -8, boxShadow: "0 20px 40px rgba(108,99,255,0.15)" }}
            className="glass glow-border rounded-2xl p-5 group"
          >
            <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
              <trait.icon size={22} className="text-accent" />
            </div>
            <h3 className="font-display font-bold text-light text-base mb-2">{trait.title}</h3>
            <p className="text-muted text-base font-body leading-relaxed">{trait.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
