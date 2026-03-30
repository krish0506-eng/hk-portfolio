"use client";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { FiClock, FiDollarSign, FiCheckCircle } from "react-icons/fi";

// Idea 5: Why Work With Me - 3 practical business outcomes
const outcomes = [
  {
    icon: FiClock,
    title: "Ship Faster",
    metric: "50% faster from concept to MVP",
    desc: "Prompt-driven development with disciplined execution means your product launches sooner.",
  },
  {
    icon: FiDollarSign,
    title: "Save Money",
    metric: "Reduce manual work by 60%",
    desc: "Automation systems I build handle repetitive tasks, freeing your team for high-value work.",
  },
  {
    icon: FiCheckCircle,
    title: "Measurable Results",
    metric: "Every project tracked by metrics",
    desc: "Success is defined by real outcomes: time saved, revenue generated, or quality improved.",
  },
];

export default function WhyWorkWithMe() {
  const [ref, inView] = useInView({ threshold: 0.2, triggerOnce: true });

  return (
    <section ref={ref} className="py-14 md:py-16 px-6 max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="mb-10"
      >
        <span className="font-mono text-accent text-sm tracking-widest uppercase">Why Collaborate</span>
        <h2 className="font-display font-bold text-4xl md:text-5xl text-light mt-3">
          Practical <span className="gradient-text">Business Outcomes</span>
        </h2>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-8">
        {outcomes.map((outcome, i) => {
          const Icon = outcome.icon;
          return (
            <motion.div
              key={outcome.title}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.15, duration: 0.7 }}
              whileHover={{ scale: 1.02, y: -4 }}
              className="glass glow-border rounded-2xl p-7 border border-border group"
            >
              <div className="w-14 h-14 rounded-xl bg-accent/15 flex items-center justify-center mb-5 group-hover:bg-accent/25 transition-colors">
                <Icon size={26} className="text-accent" />
              </div>
              <h3 className="font-display font-bold text-xl text-light mb-2">{outcome.title}</h3>
              <p className="text-accent font-body font-semibold text-sm mb-3">{outcome.metric}</p>
              <p className="text-muted text-base leading-relaxed font-body">{outcome.desc}</p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
