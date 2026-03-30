"use client";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { FiZap, FiEye, FiTarget, FiTrendingUp } from "react-icons/fi";

// Ideas: 3 (micro story), 4 (value framework)
const storySteps = [
  {
    step: "01",
    title: "Curiosity",
    desc: "Started tinkering with hardware, embedded systems, and problem-solving at age 14.",
  },
  {
    step: "02",
    title: "Found the Problem",
    desc: "Realized that scaling automation and AI is difficult without clean workflows.",
  },
  {
    step: "03",
    title: "Built Solutions",
    desc: "Started building tools, learning AI, prompt engineering, and full-stack development.",
  },
  {
    step: "04",
    title: "Shipping Now",
    desc: "Founded HYNEX and delivering real client projects that move the needle.",
  },
];

const values = [
  { icon: FiZap, title: "Speed", desc: "Move fast from idea to MVP without sacrificing quality." },
  { icon: FiEye, title: "Clarity", desc: "Build interfaces and systems that are intuitive and clear." },
  { icon: FiTarget, title: "Utility", desc: "Every line of code serves a real business outcome." },
  { icon: FiTrendingUp, title: "Impact", desc: "Measure success by real-world user and business metrics." },
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
        <span className="font-mono text-accent text-sm tracking-widest uppercase">My Journey</span>
        <h2 className="font-display font-bold text-4xl md:text-5xl text-light mt-3 mb-10">
          From Curiosity to <span className="gradient-text">Shipping</span>
        </h2>

        <div className="grid md:grid-cols-4 gap-6">
          {storySteps.map((item, i) => (
            <motion.div
              key={item.step}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.12, duration: 0.7 }}
              className="glass glow-border rounded-2xl p-6 border border-border relative"
            >
              <div className="absolute -top-4 left-6 bg-bg px-2 font-display font-bold text-2xl text-accent">
                {item.step}
              </div>
              <h3 className="text-light font-display font-bold text-lg mt-4 mb-3">{item.title}</h3>
              <p className="text-muted text-sm leading-relaxed text-body">{item.desc}</p>
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
        <span className="font-mono text-accent text-sm tracking-widest uppercase">Core Values</span>
        <h2 className="font-display font-bold text-4xl md:text-5xl text-light mt-3 mb-10">
          How I <span className="gradient-text">Build</span>
        </h2>

        <div className="grid md:grid-cols-4 gap-6">
          {values.map((value, i) => {
            const Icon = value.icon;
            return (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.5 + i * 0.1, duration: 0.6 }}
                whileHover={{ y: -8 }}
                className="glass glow-border rounded-2xl p-6 border border-border text-center group"
              >
                <div className="w-16 h-16 rounded-xl bg-accent/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-accent/20 transition-colors">
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
