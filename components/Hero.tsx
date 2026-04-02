"use client";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { TypeAnimation } from "react-type-animation";
import { ArrowDown, Download, ArrowRight } from "lucide-react";
const headlineLines = [
  "Designing AI-native products with intention.",
  "Building agentic systems with real impact.",
  "Turning prompts into production workflows.",
  "Crafting elegant AI experiences at speed.",
  "Vibe coding ideas into reliable software.",
  "Designing automations that save real time.",
  "Engineering smart tools for daily execution.",
  "Creating clean interfaces for complex AI.",
  "Blending design taste with AI engineering.",
  "Shipping useful products, not just demos.",
  "From concept to deployed AI experiences.",
  "Building products that think and act.",
  "Prompt engineering with product thinking.",
  "Turning business pain points into systems.",
  "Crafting high-leverage automation engines.",
  "Designing modern web apps with AI core.",
  "Fast prototyping, stable delivery, clean UX.",
  "Agentic AI flows built for outcomes.",
  "Converting complexity into usable products.",
  "Building digital systems with calm precision.",
  "Vibe design meets execution-grade coding.",
  "Developing intelligence into every workflow.",
  "Creating scalable AI-first product layers.",
  "Designing interfaces that guide decision-making.",
  "Building systems users trust daily.",
  "Engineering automation for measurable value.",
  "Ideas to architecture to shipped experience.",
  "Applying AI where it actually matters.",
  "Design-forward, logic-strong, delivery-focused.",
  "Creating useful software with agentic logic.",
  "Human-centered AI products, built responsibly.",
  "Designing workflows that move faster.",
  "Prompt-led execution with production quality.",
  "Making AI practical, visual, and usable.",
  "Building products that remove manual chaos.",
  "Reliable engineering for rapid AI iteration.",
  "From vibe concept to deployable reality.",
  "Creating premium digital product journeys.",
  "AI strategy translated into clean interfaces.",
  "Building no-friction tools for teams.",
  "Shipping creator-speed software with structure.",
  "Designing products that learn from data.",
  "Automation systems tuned for real operations.",
  "Combining aesthetics, logic, and execution.",
  "Developing adaptive systems for modern work.",
  "Building software that feels alive and useful.",
  "Prompt-driven builds with product discipline.",
  "Designing high-clarity AI user flows.",
  "Engineering momentum into every release.",
  "Founder mindset with agentic AI execution.",
];

export default function Hero() {
  const prefersReducedMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);

  // Scroll-fade: hero content fades + slides up as you scroll away
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const heroOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 0.6], [0, -40]);

  // Manifesto & brand trust signals
  const trustPhrase = "No fluff, practical delivery only.";

  return (
    <section id="hero" ref={sectionRef} className="relative min-h-[90vh] flex items-center overflow-hidden px-6 pt-24 pb-10">
      <div className="absolute inset-0 pointer-events-none">
        {/* Ambient glow orbs only — no grid */}
        <motion.div
          className="absolute -top-24 right-[8%] h-64 w-64 rounded-full blur-3xl"
          style={{ background: "radial-gradient(circle, rgb(var(--color-accent)) 0%, transparent 72%)", opacity: 0.14 }}
          animate={{ y: [0, 16, 0], x: [0, -10, 0] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-0 left-[5%] h-48 w-48 rounded-full blur-3xl"
          style={{ background: "radial-gradient(circle, rgb(var(--color-cyan)) 0%, transparent 70%)", opacity: 0.09 }}
          animate={{ y: [0, -12, 0], x: [0, 8, 0] }}
          transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-96 w-96 rounded-full blur-3xl"
          style={{ background: "radial-gradient(circle, rgb(var(--color-pink)) 0%, transparent 70%)", opacity: 0.05 }}
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <motion.div
        style={{ opacity: prefersReducedMotion ? 1 : heroOpacity, y: prefersReducedMotion ? 0 : heroY }}
        className="relative z-10 mx-auto grid w-full max-w-6xl items-center gap-8 lg:grid-cols-[1.15fr_0.85fr]"
      >
        <div>
          {/* Manifesto & positioning (Ideas 1, 2, 12, 13, 14) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-wrap gap-2"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/70 px-4 py-2 text-xs font-mono text-muted">
              <span className="h-2 w-2 rounded-full bg-accent animate-pulse" />
              Available for freelance work
            </div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.1 }}
            className="mt-4 inline-block font-mono text-xs uppercase tracking-widest text-accent"
          >
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 36 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.15 }}
            className="mt-4 min-h-[148px] font-display text-5xl font-bold leading-[1.05] text-light md:min-h-[188px] md:text-7xl"
          >
            <TypeAnimation
              sequence={headlineLines.flatMap((line) => [line, 1500])}
              wrapper="span"
              speed={58}
              repeat={Infinity}
            />
          </motion.h1>

          {/* Descriptor badge + Role stack + anti-positioning (Ideas 2, 12, 13) */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.45 }}
            className="mt-4 flex flex-wrap items-center gap-3 font-mono text-xs"
          >
            <span className="inline-block rounded-full border border-accent/50 bg-accent/10 px-3 py-1.5 text-accent font-semibold">
              Agentic AI Engineer & Vibe Designer
            </span>
            <span className="text-muted">·</span>
            <span className="text-muted italic">{trustPhrase}</span>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-3 font-mono text-lg text-cyan md:text-xl"
          >
            Vibe Coding · Vibe Design · Prompt Engineering · Agentic AI Engineering
          </motion.p>

          {/* Clear VALUE STATEMENT */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.62 }}
            className="mt-4 max-w-2xl text-base md:text-lg font-body leading-relaxed"
            style={{ color: "rgb(var(--color-light))" }}
          >
            I design and build{" "}
            <span className="gradient-text font-semibold">AI-powered, high-performance UI products</span>{" "}
            that feel premium — from concept to deployed experience.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.72 }}
            className="mt-3 max-w-2xl text-base leading-relaxed text-muted"
          >
            Through vibe coding, prompt engineering, and agentic workflows I turn ideas into
            production-ready digital experiences at speed.
          </motion.p>

          {/* Anti-positioning statement (Idea 13) */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.85 }}
            className="mt-4 text-sm text-muted/70 font-body italic"
          >
            ✗ I don't build generic dashboards or lift-and-shift migrations.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.88 }}
            className="mt-6 flex flex-wrap items-center gap-3"
          >
            <motion.button
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
              className="glass-btn rounded-full px-7 py-3.5 font-body text-sm font-semibold relative z-10 inline-flex items-center gap-2"
            >
              View My Work <ArrowRight size={14} />
            </motion.button>
            <motion.button
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
              className="neu-btn rounded-full px-7 py-3.5 font-body text-sm font-semibold text-light"
            >
              Get In Touch
            </motion.button>
            <motion.a
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.97 }}
              href="/api/resume"
              download="Hari_Krishnaa_Resume.pdf"
              className="neu-btn rounded-full px-7 py-3.5 font-body text-sm font-semibold inline-flex items-center gap-2 text-light"
            >
              <Download size={14} />
              Download CV
            </motion.a>
          </motion.div>
        </div>

        <motion.aside
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="glass rounded-3xl border border-border p-5"
        >
          {/* Name + favicon badge */}
          <div className="flex items-center gap-2 mb-4">
            <img src="/favicon.svg" alt="HK" className="w-7 h-7 rounded-lg" />
            <span className="font-display font-bold text-base text-light">Hari Krishnaa N</span>
          </div>
          {/* Profile photo with orbital rings */}
          <div className="mx-auto mb-5 relative flex h-48 w-48 items-center justify-center">
            <motion.div
              className="absolute inset-0 rounded-full border border-accent/30"
              animate={prefersReducedMotion ? {} : { scale: [1, 1.1, 1], opacity: [0.5, 0.15, 0.5] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            />
            <div
              className="absolute inset-2 rounded-full border border-cyan/25"
              style={prefersReducedMotion ? undefined : { animation: "orbit-ring 8s linear infinite" }}
            >
              <div className="absolute -top-1 left-1/2 -translate-x-1/2 h-2.5 w-2.5 rounded-full bg-cyan/70" />
            </div>
            <div
              className="absolute inset-6 rounded-full border border-pink/20"
              style={prefersReducedMotion ? undefined : { animation: "orbit-ring-rev 12s linear infinite" }}
            >
              <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 h-2 w-2 rounded-full bg-pink/60" />
            </div>
            {/* Profile photo */}
            <div className="relative z-10 h-36 w-36 rounded-full border-2 border-accent/50 overflow-hidden">
              <img
                src="/profile.jpg"
                alt="Hari Krishnaa N"
                className="w-full h-full object-cover object-top"
              />
            </div>
          </div>

          {/* Hero Proof Row — removed */}

          <p className="font-mono text-xs uppercase tracking-[0.24em] text-muted">Current Focus</p>
          <div className="mt-4 space-y-3">
            <div className="rounded-xl border border-border bg-surface/70 p-4">
              <p className="text-sm text-muted">Direction</p>
              <p className="mt-1 text-base font-medium text-light">Workflow intelligence and automation UX</p>
            </div>
            <div className="rounded-xl border border-border bg-surface/70 p-4">
              <p className="text-sm text-muted">Core Domain</p>
              <p className="mt-1 text-base font-medium text-light">Mechanical Engineering · Mechatronics · Additive Manufacturing</p>
            </div>
            <div className="rounded-xl border border-border bg-surface/70 p-4">
              <p className="text-sm text-muted">Availability</p>
              <p className="mt-1 text-base font-medium text-light">Open to support idea-to-MVP builds, internships, placement roles, full-time work, and freelance projects.</p>
            </div>
          </div>
        </motion.aside>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1 }}
          className="lg:col-span-2 flex items-center gap-5"
        >
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted"
      >
        <span className="text-xs font-mono">scroll</span>
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
          <ArrowDown size={18} />
        </motion.div>
      </motion.div>
    </section>
  );
}
