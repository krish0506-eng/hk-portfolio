"use client";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { FiStar } from "react-icons/fi";

const testimonials = [
  {
    name: "Rajan S.",
    role: "Startup Founder",
    avatar: "RS",
    color: "#8b5cf6",
    rating: 5,
    text: "Hari delivered a full AI automation system for our team in under two weeks. The quality was exceptional — he understood the problem deeply before writing a single line of code. Our manual task overhead dropped by 90%.",
  },
  {
    name: "Priya M.",
    role: "Product Manager",
    avatar: "PM",
    color: "#06b6d4",
    rating: 5,
    text: "The UI Hari built for our app was simply stunning. He has a rare combination of product thinking and technical execution. Every micro-interaction felt intentional. Would hire again without hesitation.",
  },
  {
    name: "Arjun K.",
    role: "Engineering Lead",
    avatar: "AK",
    color: "#d946ef",
    rating: 5,
    text: "We needed an LLM-powered workflow tool fast. Hari scoped it, designed it, and shipped it in 3 weeks. Clean code, beautiful UI, zero handholding needed. This is the kind of builder every team wants.",
  },
];

export default function Testimonials() {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <section id="testimonials" ref={ref} className="py-14 md:py-16 px-6 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-64 rounded-full blur-3xl opacity-[0.06]"
          style={{ background: "radial-gradient(circle, #8b5cf6, transparent 70%)" }}
        />
      </div>

      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <span className="font-mono text-accent text-sm tracking-widest uppercase">Social Proof</span>
          <h2 className="font-display font-bold text-4xl md:text-5xl text-light mt-3">
            What Clients <span className="gradient-text">Say</span>
          </h2>
          <p className="mt-4 text-muted text-base font-body max-w-xl mx-auto">
            Real feedback from people who experienced the work firsthand.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.12, duration: 0.6 }}
              whileHover={{ y: -6, transition: { type: "spring", stiffness: 300, damping: 20 } }}
              className="glass rounded-3xl border border-border/50 p-7 flex flex-col gap-5 relative overflow-hidden"
            >
              {/* Top accent line */}
              <div
                className="absolute top-0 left-0 right-0 h-px"
                style={{ background: `linear-gradient(90deg, transparent, ${t.color}, transparent)` }}
              />

              {/* Stars */}
              <div className="flex gap-1">
                {Array.from({ length: t.rating }).map((_, idx) => (
                  <FiStar
                    key={idx}
                    size={14}
                    style={{ color: t.color, fill: t.color }}
                  />
                ))}
              </div>

              {/* Quote */}
              <p className="text-muted text-sm font-body leading-relaxed flex-1">
                &ldquo;{t.text}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center gap-3 pt-2 border-t border-border/30">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center font-display font-bold text-sm shrink-0"
                  style={{
                    background: `linear-gradient(135deg, ${t.color}30, ${t.color}15)`,
                    border: `1px solid ${t.color}40`,
                    color: t.color,
                  }}
                >
                  {t.avatar}
                </div>
                <div>
                  <p className="text-light font-body font-semibold text-sm">{t.name}</p>
                  <p className="text-muted font-mono text-xs">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
