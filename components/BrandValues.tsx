"use client";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { FiZap, FiEye, FiTarget, FiTrendingUp } from "react-icons/fi";

// Ideas: 3 (micro story), 4 (value framework)
const storySteps = [
  {
    step: "01",
    title: "Tinker",
    desc: "Started with Arduino and ESP32 at 14 — burning bootloaders, blinking LEDs, breaking things on purpose.",
  },
  {
    step: "02",
    title: "Saw the Gap",
    desc: "Realised hardware projects die at the prototype stage because firmware, cloud, and UX are treated as separate worlds.",
  },
  {
    step: "03",
    title: "Bridged It",
    desc: "Learned full-stack development, AI, and cloud to complement the hardware skills — becoming a full-spectrum builder.",
  },
  {
    step: "04",
    title: "Shipping Now",
    desc: "Founded HYNEX, delivering end-to-end products that touch both physical hardware and intelligent software.",
  },
];

const values = [
  { icon: FiZap, title: "Craft", desc: "Every PCB layout, firmware loop, and UI pixel gets the same attention to detail." },
  { icon: FiEye, title: "Grit", desc: "When the sensor drifts or the build fails, I debug until it works — no shortcuts." },
  { icon: FiTarget, title: "Utility", desc: "I build systems that solve real problems, not just tech demos that look good on a portfolio." },
  { icon: FiTrendingUp, title: "Velocity", desc: "From breadboard prototype to deployed product in the shortest possible cycle." },
];

export default function BrandValues() {
  const [ref, inView] = useInView({ threshold: 0.2, triggerOnce: true });

  return (
    <section ref={ref} className="py-14 md:py-16 px-6 max-w-6xl mx-auto">
      {/* Micro Storytelling (Idea 3) */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="mb-14"
      >
          <span className="font-mono text-accent text-sm tracking-widest uppercase section-label">My Journey</span>
        <h2 className="font-display font-bold text-4xl md:text-5xl text-light mt-3 mb-10">
          From Curiosity to <span className="gradient-text">Shipping</span>
        </h2>

        <div className="grid md:grid-cols-4 gap-6 relative">
          {/* Connecting line */}
          <svg className="absolute top-8 left-[calc(12.5%+28px)] right-[calc(12.5%+28px)] h-0.5 hidden md:block pointer-events-none z-0" style={{ width: 'calc(100% - 25% - 56px)' }}>
            <motion.line
              x1="0" y1="0" x2="100%" y2="0"
              stroke="rgba(139,92,246,0.2)" strokeWidth="1.5"
              initial={{ pathLength: 0 }}
              animate={inView ? { pathLength: 1 } : {}}
              transition={{ duration: 1.2, ease: "easeInOut", delay: 0.3 }}
            />
          </svg>
          {storySteps.map((item, i) => (
            <motion.div
              key={item.step}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.15, duration: 0.7 }}
              whileHover={{ y: -6, boxShadow: "0 20px 40px rgba(139,92,246,0.12)" }}
              className="glass glow-border rounded-2xl p-6 border border-border relative overflow-hidden group"
            >
              <div className="absolute -top-4 left-6 bg-bg px-2 font-display font-bold text-2xl text-accent z-10">
                {item.step}
              </div>
              {/* Watermark number */}
              <div className="absolute -bottom-4 -right-4 text-7xl font-display font-bold opacity-[0.04] text-accent pointer-events-none select-none">
                {item.step}
              </div>
              <h3 className="text-light font-display font-bold text-lg mt-4 mb-3 relative z-10">{item.title}</h3>
              <p className="text-muted text-sm leading-relaxed text-body relative z-10">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Personal Value Framework (Idea 4) */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
          <span className="font-mono text-accent text-sm tracking-widest uppercase section-label">Core Values</span>
        <h2 className="font-display font-bold text-4xl md:text-5xl text-light mt-3 mb-10">
          How I <span className="gradient-text">Build</span>
        </h2>

        <div className="grid md:grid-cols-4 gap-6">
          {values.map((value, i) => {
            const Icon = value.icon;
            return (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.5 + i * 0.1, duration: 0.6 }}
                whileHover={{ y: -6 }}
                className="glass glow-border rounded-2xl p-6 border border-border text-center group value-accent-line relative overflow-hidden"
              >
                <div className="w-16 h-16 rounded-xl bg-accent/5 flex items-center justify-center mx-auto mb-4 group-hover:bg-accent/15 transition-all duration-300 group-hover:scale-110">
                  <Icon size={28} className="text-accent" />
                </div>
                <h3 className="text-light font-display font-bold text-lg mb-2">{value.title}</h3>
                <p className="text-muted text-sm leading-relaxed font-body">{value.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
}
