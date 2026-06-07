"use client";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { FiStar, FiZap, FiFileText, FiBox } from "react-icons/fi";

const achievements = [
  {
    icon: FiStar,
    title: "1st Place - Ideathon",
    desc: "Won first place at KPR College Ideathon 2025, competing against teams across disciplines.",
    color: "#ffd700",
  },
  {
    icon: FiZap,
    title: "Hackathon Innovator",
    desc: "Hackathon participant and shortlisted innovator across multiple competitive events.",
    color: "#6c63ff",
  },
  {
    icon: FiFileText,
    title: "Technical Paper Presentations",
    desc: "Presented technical research papers at college-level academic events.",
    color: "#00f5ff",
  },
  {
    icon: FiBox,
    title: "MSME-Registered Founder",
    desc: "Founded and operates HYNEX, an officially registered technology firm, while in undergraduate studies.",
    color: "#ff2d78",
  },
  {
    icon: FiZap,
    title: "Smart India Hackathon Finalist",
    desc: "Selected as a finalist in the prestigious Smart India Hackathon, competing with a hardware-integrated solution.",
    color: "#f97316",
  },
];

export default function Achievements() {
  const [ref, inView] = useInView({ threshold: 0.2, triggerOnce: true });

  return (
    <section id="achievements" ref={ref} className="py-16 md:py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-14"
        >
          <span className="font-mono text-accent text-sm tracking-widest uppercase section-label">Milestones</span>
          <h2 className="font-display font-bold text-3xl md:text-4xl text-light mt-3">
            <span className="gradient-text">Achievements</span>
          </h2>          <p className="mt-4 text-muted text-base font-body max-w-2xl mx-auto">
            Milestones, competitions, and recognitions from innovative product thinking and engineering excellence.
          </p>        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {achievements.map((ach, i) => (
            <motion.div
              key={ach.title}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: i * 0.12, duration: 0.5, ease: "backOut" }}
              whileHover={{ y: -10, boxShadow: `0 20px 50px ${ach.color}25` }}
              className={`glass glow-border rounded-3xl p-6 text-center group relative overflow-hidden ${ach.title.includes("1st Place") ? "pop-in" : ""}`}
            >
              {/* Gold shimmer for 1st Place */}
              {ach.title.includes("1st Place") && (
                <div className="absolute inset-0 pointer-events-none gold-shimmer rounded-3xl" />
              )}
              <motion.div
                whileHover={{ rotate: 15, scale: 1.2 }}
                className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-5 relative z-10"
                style={{ background: `${ach.color}15` }}
              >
                <ach.icon size={32} style={{ color: ach.color }} />
              </motion.div>
              <h3 className="font-display font-bold text-light text-base mb-3 relative z-10">{ach.title}</h3>
              <p className="text-muted text-base font-body leading-relaxed relative z-10">{ach.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
