"use client";
import { motion, useReducedMotion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import { FiGithub, FiLinkedin, FiMail } from "react-icons/fi";
import { HiArrowDown } from "react-icons/hi";

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
  // Manifesto & brand trust signals (Ideas 1, 14, 27)
  const manifesto = "Ship useful products that solve real problems.";
  const trustPhrase = "No fluff, practical delivery only.";
  const proofMetrics = [
    { label: "Projects Shipped", value: "5+" },
    { label: "Automations Built", value: "20+" },
    { label: "Avg Reply Time", value: "4h" },
  ];

  return (
    <section id="hero" className="relative min-h-[90vh] flex items-center overflow-hidden px-6 pt-24 pb-10">
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgb(var(--color-border)) 1px, transparent 1px), linear-gradient(to bottom, rgb(var(--color-border)) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
            maskImage: "radial-gradient(circle at center, black 22%, transparent 78%)",
          }}
        />

        {[0, 1, 2].map((line) => (
          <motion.div
            key={line}
            className="absolute h-px w-[120%]"
            style={{
              top: `${42 + line * 8}%`,
              left: "-10%",
              background:
                "linear-gradient(90deg, transparent 0%, rgb(var(--color-muted)) 40%, rgb(var(--color-accent)) 50%, rgb(var(--color-muted)) 60%, transparent 100%)",
              opacity: 0.36 - line * 0.08,
            }}
            animate={{ x: ["-8%", "8%", "-8%"] }}
            transition={{ duration: 10 + line * 2, repeat: Infinity, ease: "easeInOut" }}
          />
        ))}

        <motion.div
          className="absolute -top-24 right-[8%] h-64 w-64 rounded-full blur-3xl"
          style={{ background: "radial-gradient(circle, rgb(var(--color-accent)) 0%, transparent 72%)", opacity: 0.12 }}
          animate={{ y: [0, 16, 0], x: [0, -10, 0] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="relative z-10 mx-auto grid w-full max-w-6xl items-center gap-8 lg:grid-cols-[1.15fr_0.85fr]">
        <div>
          {/* Manifesto & positioning (Ideas 1, 2, 12, 13, 14) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/70 px-4 py-2 text-xs font-mono text-muted"
          >
            <span className="h-2 w-2 rounded-full bg-accent animate-pulse" />
            Available for freelance work
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.1 }}
            className="mt-4 inline-block font-mono text-xs uppercase tracking-widest text-accent"
          >
            💡 {manifesto}
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

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.72 }}
            className="mt-3 max-w-2xl text-lg leading-relaxed text-muted md:text-xl"
          >
            I build AI-powered products through vibe coding, prompt engineering, and agentic
            workflows that turn ideas into production-ready digital experiences.
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
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
              className="rounded-full bg-accent px-7 py-3.5 font-body text-sm font-semibold text-bg"
            >
              View My Work
            </motion.button>
            <motion.button
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
              className="rounded-full border border-border bg-surface/80 px-7 py-3.5 font-body text-sm font-semibold text-light"
            >
              Get In Touch
            </motion.button>
          </motion.div>
        </div>

        <motion.aside
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="glass rounded-3xl border border-border p-5"
        >
          {/* Animated 3D-style avatar replacing the blank placeholder */}
          <div className="mx-auto mb-4 relative flex h-36 w-36 items-center justify-center">
            {/* Pulsing outer ring */}
            <motion.div
              className="absolute inset-0 rounded-full border border-accent/30"
              animate={prefersReducedMotion ? {} : { scale: [1, 1.12, 1], opacity: [0.5, 0.15, 0.5] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            />
            {/* Orbiting ring 1 */}
            <div
              className="absolute inset-1 rounded-full border border-cyan/25"
              style={prefersReducedMotion ? undefined : { animation: "orbit-ring 8s linear infinite" }}
            >
              <div className="absolute -top-1 left-1/2 -translate-x-1/2 h-2 w-2 rounded-full bg-cyan/70" />
            </div>
            {/* Orbiting ring 2 — reverse */}
            <div
              className="absolute inset-4 rounded-full border border-pink/20"
              style={prefersReducedMotion ? undefined : { animation: "orbit-ring-rev 12s linear infinite" }}
            >
              <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 h-1.5 w-1.5 rounded-full bg-pink/60" />
            </div>
            {/* Core avatar disc */}
            <div className="relative z-10 flex h-24 w-24 items-center justify-center rounded-full border-2 border-accent/50 bg-gradient-to-br from-accent/20 via-card to-cyan/10">
              <span className="font-display font-bold text-4xl gradient-text glitch-anim">HK</span>
            </div>
          </div>

          {/* Hero Proof Row (Idea 27) */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="mb-6 grid grid-cols-3 gap-2"
          >
            {proofMetrics.map((metric) => (
              <div key={metric.label} className="rounded-lg bg-surface/60 border border-border/50 p-2 text-center">
                <div className="font-bold text-accent text-base">{metric.value}</div>
                <div className="text-xs text-muted font-mono mt-1">{metric.label}</div>
              </div>
            ))}
          </motion.div>

          <p className="font-mono text-xs uppercase tracking-[0.24em] text-muted">Current Focus</p>
          <div className="mt-4 space-y-3">
            <div className="rounded-xl border border-border bg-surface/70 p-4">
              <p className="text-sm text-muted">Stack</p>
              <p className="mt-1 text-base font-medium text-light">Next.js, TypeScript, AI APIs</p>
            </div>
            <div className="rounded-xl border border-border bg-surface/70 p-4">
              <p className="text-sm text-muted">Direction</p>
              <p className="mt-1 text-base font-medium text-light">Workflow intelligence and automation UX</p>
            </div>
            <div className="rounded-xl border border-border bg-surface/70 p-4">
              <p className="text-sm text-muted">Availability</p>
              <p className="mt-1 text-base font-medium text-light">Open to support idea-to-MVP builds, internships, placement roles, full-time work, and freelance projects.</p>
              <p className="mt-2 text-xs text-accent font-mono">⏱ Typical reply: 4 hours</p>
            </div>
          </div>
        </motion.aside>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1 }}
          className="lg:col-span-2 flex items-center gap-5"
        >
          {[
            { icon: FiGithub, href: "https://github.com/krishnaa-0506", label: "GitHub" },
            { icon: FiLinkedin, href: "https://linkedin.com/in/hari-krishnaa-n-", label: "LinkedIn" },
            { icon: FiMail, href: "mailto:krishnaahari05@gmail.com", label: "Email" },
          ].map(({ icon: Icon, href, label }) => (
            <motion.a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -2 }}
              className="rounded-full border border-border bg-surface/80 p-3 text-muted transition-colors duration-300 hover:text-accent"
              aria-label={label}
            >
              <Icon size={22} />
            </motion.a>
          ))}
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted"
      >
        <span className="text-xs font-mono">scroll</span>
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
          <HiArrowDown size={18} />
        </motion.div>
      </motion.div>
    </section>
  );
}
