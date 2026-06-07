"use client";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { FiCode, FiCpu, FiZap, FiGlobe } from "react-icons/fi";
import { useCounter } from "@/lib/useCounter";

const stats = [
  { label: "CGPA", value: "8" },
  { label: "Certifications", value: "12+" },
  { label: "Systems Built", value: "20+" },
  { label: "Tech Domains", value: "4" },
];

const traits = [
  { icon: FiCpu, title: "Hardware + Software", desc: "Embedded systems, IoT, and additive manufacturing" },
  { icon: FiZap, title: "AI-First Thinker", desc: "Building agentic systems and LLM-powered apps" },
  { icon: FiCode, title: "Product Builder", desc: "React, Next.js, Node.js, Python end-to-end" },
  { icon: FiGlobe, title: "MSME Founder", desc: "Running HYNEX - a registered tech firm since 2024" },
];

function StatBox({ label, value: raw, inView: iv }: { label: string; value: string; inView: boolean }) {
  const num = parseInt(raw);
  const suffix = raw.includes("+") ? "+" : "";
  const count = useCounter(num, 1500, iv);
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={iv ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.05, borderColor: "#6c63ff" }}
      className="glass glow-border rounded-2xl p-5 text-center relative overflow-hidden"
    >
      <div className="absolute top-0 left-4 right-4 h-0.5 rounded-full bg-accent/60" style={{ boxShadow: "0 0 8px rgba(139,92,246,0.3)" }} />
      <div className="font-display font-bold text-3xl gradient-text mb-2">{count}{suffix}</div>
      <div className="text-muted text-base font-body">{label}</div>
    </motion.div>
  );
}

export default function About() {
  const [ref, inView] = useInView({ threshold: 0.2, triggerOnce: true });

  return (
    <section id="about" ref={ref} className="py-14 md:py-16 px-6 max-w-6xl mx-auto dot-grid">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="text-center mb-10"
      >
        <span className="font-mono text-accent text-sm tracking-widest uppercase section-label">Who I Am</span>
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
            🎯 Built 20+ systems — from ESP32 firmware to full-stack AI products — while maintaining 8/10 CGPA and running HYNEX.
          </p>

          <p className="text-muted text-lg leading-relaxed font-body mb-5">
            I'm an <span className="text-light font-medium">embedded systems builder and IoT engineer</span> currently
            pursuing B.E. Mechanical & Mechatronics (Additive Manufacturing) at SNS College of
            Engineering, Coimbatore — with a CGPA of{" "}
            <span className="text-accent font-medium">8/10</span>.
          </p>
          <p className="text-muted text-lg leading-relaxed font-body mb-5">
            I founded <span className="text-cyan font-medium">HYNEX</span>, an MSME-registered
            technology firm, where I deliver end-to-end embedded systems, IoT infrastructure, AI
            automation, and full-stack applications to real clients.
          </p>
          <p className="text-muted text-lg leading-relaxed font-body">
            My edge: I build <span className="text-pink font-medium">hardware that connects to the cloud</span> and
            software that controls physical things — from PCB layout and firmware to cloud backends and mobile dashboards.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 60 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.4 }}
          className="grid grid-cols-2 gap-4"
        >
          {stats.map((stat, i) => (
            <StatBox key={stat.label} label={stat.label} value={stat.value} inView={inView} />
          ))}
        </motion.div>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {traits.map((trait, i) => (
          <motion.div
            key={trait.title}
            initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.6 + i * 0.12, duration: 0.6 }}
            whileHover={{ y: -8, boxShadow: "0 20px 40px rgba(108,99,255,0.15)" }}
            className="glass glow-border rounded-2xl p-5 group"
          >
            <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-all duration-300 group-hover:scale-110 group-hover:rotate-6">
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
