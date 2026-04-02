"use client";
import { useRef, useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { FiStar, FiChevronLeft, FiChevronRight } from "react-icons/fi";

const testimonials = [
  { name: "Anbarasu R.", role: "Startup Founder", avatar: "AR", color: "#8b5cf6", rating: 5, text: "Hari delivered a full AI automation system for our team in under two weeks. The quality was exceptional — he understood the problem deeply before writing a single line of code. Our manual task overhead dropped by 90%." },
  { name: "Sanjay Kumar", role: "Product Lead", avatar: "SK", color: "#06b6d4", rating: 5, text: "The UI Hari built for our app was simply stunning. He has a rare combination of product thinking and technical execution. Every micro-interaction felt intentional. Would hire again without hesitation." },
  { name: "Preethiviraj S.", role: "Engineering Lead", avatar: "PS", color: "#d946ef", rating: 5, text: "We needed an LLM-powered workflow tool fast. Hari scoped it, designed it, and shipped it in 3 weeks. Clean code, beautiful UI, zero handholding needed. This is the kind of builder every team wants." },
  { name: "Eniyavan M.", role: "Tech Entrepreneur", avatar: "EM", color: "#10b981", rating: 5, text: "Working with Hari was seamless from day one. He translated our vague requirements into a polished product that exceeded expectations. His attention to detail and speed of delivery are unmatched." },
  { name: "Sushilraam K.", role: "Client", avatar: "SR", color: "#f59e0b", rating: 5, text: "Hari built exactly what we envisioned — and then some. The AI integration was smooth, the UX was intuitive, and the whole thing shipped on time. Highly recommend for any serious product build." },
  { name: "Karthikeyan P.", role: "Business Owner", avatar: "KP", color: "#f97316", rating: 5, text: "Exceptional work ethic and technical depth. Hari took our rough idea and turned it into a production-ready system. The automation he built saves us hours every single day." },
  { name: "Muruganantham V.", role: "Operations Manager", avatar: "MV", color: "#a78bfa", rating: 5, text: "Hari's ability to understand business problems and translate them into elegant technical solutions is rare. He delivered beyond scope and on time. Truly a premium builder." },
  { name: "Thirumalai S.", role: "Freelance Client", avatar: "TS", color: "#22c55e", rating: 5, text: "From the first call to final delivery, Hari was professional, fast, and thorough. The product he built for us is clean, scalable, and exactly what we needed. Will work with him again." },
];

const CARD_W = 320;
const CARD_GAP = 20;

export default function Testimonials() {
  const [headerRef, inView] = useInView({ threshold: 0.1, triggerOnce: true });
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [canLeft, setCanLeft] = useState(false);
  const [canRight, setCanRight] = useState(true);

  const updateState = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setCanLeft(el.scrollLeft > 8);
    setCanRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 8);
    setActiveIndex(Math.min(Math.round(el.scrollLeft / (CARD_W + CARD_GAP)), testimonials.length - 1));
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener("scroll", updateState, { passive: true });
    updateState();
    return () => el.removeEventListener("scroll", updateState);
  }, [updateState]);

  const scrollBy = useCallback((dir: -1 | 1) => {
    scrollRef.current?.scrollBy({ left: dir * (CARD_W + CARD_GAP), behavior: "smooth" });
  }, []);

  return (
    <section id="testimonials" ref={headerRef} className="py-14 md:py-16 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-64 rounded-full blur-3xl opacity-[0.06]"
          style={{ background: "radial-gradient(circle, #8b5cf6, transparent 70%)" }} />
      </div>

      <div className="max-w-6xl mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }} className="flex items-end justify-between gap-4 flex-wrap mb-10">
          <div>
            <span className="font-mono text-accent text-sm tracking-widest uppercase">Social Proof</span>
            <h2 className="font-display font-bold text-4xl md:text-5xl text-light mt-3">
              What Clients <span className="gradient-text">Say</span>
            </h2>
            <p className="mt-3 text-muted text-base font-body">Real feedback from people who experienced the work firsthand.</p>
          </div>
          <div className="flex items-center gap-3">
            <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.92 }} onClick={() => scrollBy(-1)}
              disabled={!canLeft} className="neu-btn w-11 h-11 rounded-full flex items-center justify-center disabled:opacity-30" aria-label="Previous">
              <FiChevronLeft size={20} className="text-light" />
            </motion.button>
            <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.92 }} onClick={() => scrollBy(1)}
              disabled={!canRight} className="neu-btn w-11 h-11 rounded-full flex items-center justify-center disabled:opacity-30" aria-label="Next">
              <FiChevronRight size={20} className="text-light" />
            </motion.button>
          </div>
        </motion.div>
      </div>

      {/* Horizontal scroll */}
      <div ref={scrollRef}
        className="flex gap-5 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-4 pl-6"
        style={{ paddingRight: "1.5rem" }}>
        <div className="shrink-0 w-0" />
        {testimonials.map((t, i) => (
          <motion.div key={t.name}
            initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: i * 0.08, duration: 0.5 }}
            whileHover={{ y: -4 }}
            className="snap-start shrink-0 glass rounded-3xl border border-border/50 p-6 flex flex-col gap-4 relative overflow-hidden"
            style={{ width: CARD_W }}>
            <div className="absolute top-0 left-0 right-0 h-px"
              style={{ background: `linear-gradient(90deg, transparent, ${t.color}, transparent)` }} />
            <div className="flex gap-1">
              {Array.from({ length: t.rating }).map((_, idx) => (
                <FiStar key={idx} size={13} style={{ color: t.color, fill: t.color }} />
              ))}
            </div>
            <p className="text-muted text-sm font-body leading-relaxed flex-1">&ldquo;{t.text}&rdquo;</p>
            <div className="flex items-center gap-3 pt-3 border-t border-border/30">
              <div className="w-9 h-9 rounded-full flex items-center justify-center font-display font-bold text-xs shrink-0"
                style={{ background: `${t.color}25`, border: `1px solid ${t.color}40`, color: t.color }}>
                {t.avatar}
              </div>
              <div>
                <p className="text-light font-body font-semibold text-sm">{t.name}</p>
                <p className="text-muted font-mono text-xs">{t.role}</p>
              </div>
            </div>
          </motion.div>
        ))}
        <div className="shrink-0 w-6" />
      </div>

      {/* Dots */}
      <div className="flex items-center justify-center gap-2 mt-5">
        {testimonials.map((t, i) => (
          <button key={t.name} onClick={() => scrollRef.current?.scrollTo({ left: i * (CARD_W + CARD_GAP), behavior: "smooth" })}
            className="transition-all duration-300"
            style={{ width: i === activeIndex ? 24 : 7, height: 7, borderRadius: 4,
              background: i === activeIndex ? t.color : "rgba(148,163,184,0.3)",
              boxShadow: i === activeIndex ? `0 0 8px ${t.color}` : "none" }} />
        ))}
      </div>
    </section>
  );
}
