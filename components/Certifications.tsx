"use client";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { FiAward } from "react-icons/fi";

const certs = [
  { name: "AWS Academy - AI/ML Intermediate", issuer: "Amazon Web Services", color: "#ff9900" },
  { name: "Microsoft Azure AI Fundamentals (AZ-900)", issuer: "Microsoft", color: "#00a4ef" },
  { name: "Generative AI & Prompt Engineering", issuer: "Internshala", color: "#6c63ff" },
  { name: "Modern Web Development", issuer: "NullClass", color: "#00f5ff" },
  { name: "Python for Everybody", issuer: "Coursera - University of Michigan", color: "#0056d2" },
  { name: "Introduction to Artificial Intelligence", issuer: "Coursera - IBM", color: "#054ada" },
  { name: "Machine Learning Specialization", issuer: "Coursera - DeepLearning.AI", color: "#ff2d78" },
  { name: "Cloud Computing Basics", issuer: "Coursera - LearnQuest", color: "#00bcd4" },
  { name: "Data Structures & Algorithms in Python", issuer: "GeeksforGeeks", color: "#2f8d46" },
  { name: "Complete Interview Preparation", issuer: "GeeksforGeeks", color: "#2f8d46" },
  { name: "Python Programming Fundamentals", issuer: "PrepInsta", color: "#ffd700" },
  { name: "DSA Placement Preparation", issuer: "PrepInsta", color: "#ffd700" },
];

export default function Certifications() {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <section id="certifications" ref={ref} className="py-16 md:py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-14"
        >
          <span className="font-mono text-accent text-sm tracking-widest uppercase">What I've Earned</span>
          <h2 className="font-display font-bold text-3xl md:text-4xl text-light mt-3">
            <span className="gradient-text">Certifications</span>
          </h2>          <p className="mt-4 text-muted text-base font-body max-w-2xl mx-auto">
            Verified credentials spanning AI, cloud infrastructure, development tools, and advanced manufacturing.
          </p>        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {certs.map((cert, i) => (
            <motion.div
              key={cert.name}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.07 }}
              whileHover={{ scale: 1.03, y: -5 }}
              className="glass glow-border rounded-2xl p-5 flex gap-4 items-start group"
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform"
                style={{ background: `${cert.color}20` }}
              >
                <FiAward size={18} style={{ color: cert.color }} />
              </div>
              <div>
                <p className="font-body font-medium text-light text-base leading-snug mb-1">{cert.name}</p>
                <p className="font-mono text-sm" style={{ color: cert.color }}>{cert.issuer}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
