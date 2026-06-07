"use client";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { TypeAnimation } from "react-type-animation";
import Image from "next/image";
import { ArrowDown, Download, ArrowRight } from "lucide-react";
const headlineLines = [
  "Embedded systems builder with AI depth.",
  "Hardware that talks to the cloud.",
  "From breadboard to production system.",
  "Wiring sensors, shipping real software.",
  "ESP32, firmware, and full-stack engineering.",
  "IoT systems that collect, analyse, and act.",
  "Hardware-first engineering with AI intelligence.",
  "Real-time telemetry from track to dashboard.",
  "Burning ESP32s at midnight, shipping AI by morning.",
  "PCB designs that connect to the internet.",
  "Industrial IoT for predictive maintenance.",
  "Sensors, actuators, and intelligent automation.",
  "Firmware that bridges hardware and intelligence.",
  "3D printing, circuits, and cloud pipelines.",
  "Embedded C meets generative AI workflows.",
  "Real-time data from physical to digital.",
  "Building things that sense, think, and respond.",
  "Circuit design to deployed AI in one workflow.",
  "Wearable tech with real-time health analytics.",
  "Multi-sensor fusion with cloud-based analytics.",
  "Edge devices talking to intelligent backends.",
  "Prototyping hardware at the speed of software.",
  "Smart systems that start with a PCB layout.",
  "Firmware, Flutter, and full-stack integration.",
  "Hardware hacking with production discipline.",
  "Where hardware meets intelligence.",
  "Making the physical world programmable.",
  "Systems thinking from chip to cloud.",
  "Building the bridge between atoms and bits.",
  "Circuit boards, code, and cloud connectivity.",
  "Embedded intelligence for the connected world.",
  "Product design with embedded intelligence.",
  "Maker engineering with professional execution.",
  "Hardware roots, AI future, shipping always.",
  "Building systems that exist in the real world.",
  "Sensor arrays, data pipelines, actionable insights.",
  "Full-stack engineering that touches the physical.",
  "Mechatronics, code, and cloud — unified.",
  "Crafting intelligent hardware experiences.",
  "Real-world systems, real-world impact.",
  "Ideas to architecture to shipped product.",
  "Engineering momentum into every release.",
  "Designing systems users trust daily.",
  "Making hardware practical, intelligent, and reliable.",
  "From ESP32 prototype to deployed solution.",
  "Vibe design meets engineering-grade hardware.",
  "Founder mindset with embedded AI execution.",
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

  return (
    <section id="hero" ref={sectionRef} className="hero-frame crt-curve relative min-h-[90vh] flex items-center overflow-hidden px-6 pt-24 pb-10">
      {/* VHS interference line */}
      <div className="vhs-interference" aria-hidden="true" />

      {/* Floating particles — engineering workshop dust */}
      <div className="hero-particle" style={{ top: '15%', left: '10%', '--p-size': '3px', '--p-color': 'rgba(139,92,246,0.3)', '--p-dx': '50px', '--p-dy': '-40px', '--p-duration': '10s', '--p-delay': '0s', '--p-opacity': '0.12' } as React.CSSProperties} />
      <div className="hero-particle" style={{ top: '25%', left: '60%', '--p-size': '2px', '--p-color': 'rgba(6,182,212,0.25)', '--p-dx': '-30px', '--p-dy': '-60px', '--p-duration': '12s', '--p-delay': '2s', '--p-opacity': '0.1' } as React.CSSProperties} />
      <div className="hero-particle" style={{ top: '50%', left: '30%', '--p-size': '4px', '--p-color': 'rgba(245,158,11,0.2)', '--p-dx': '60px', '--p-dy': '30px', '--p-duration': '14s', '--p-delay': '4s', '--p-opacity': '0.08' } as React.CSSProperties} />
      <div className="hero-particle" style={{ top: '70%', left: '75%', '--p-size': '2px', '--p-color': 'rgba(217,70,239,0.2)', '--p-dx': '-40px', '--p-dy': '-50px', '--p-duration': '9s', '--p-delay': '1s', '--p-opacity': '0.1' } as React.CSSProperties} />
      <div className="hero-particle" style={{ top: '80%', left: '20%', '--p-size': '3px', '--p-color': 'rgba(139,92,246,0.2)', '--p-dx': '30px', '--p-dy': '-30px', '--p-duration': '11s', '--p-delay': '3s', '--p-opacity': '0.1' } as React.CSSProperties} />
      <div className="hero-particle" style={{ top: '35%', left: '85%', '--p-size': '2px', '--p-color': 'rgba(6,182,212,0.2)', '--p-dx': '-20px', '--p-dy': '-40px', '--p-duration': '13s', '--p-delay': '5s', '--p-opacity': '0.08' } as React.CSSProperties} />

      {/* Engineering grid overlay */}
      <div className="hero-grid absolute inset-0 pointer-events-none" />

      {/* Warm ambient glow — workshop feel */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-0 w-full h-1/2"
          style={{ background: "radial-gradient(ellipse at 30% 50%, rgba(245, 158, 11, 0.04), transparent 60%)" }}
        />
      </div>

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

      {/* Solder sparks - floating ember particles */}
      <div className="solder-spark" style={{ top: '20%', left: '15%', '--dx': '30px', '--dy': '-40px', '--dx2': '10px', '--dy2': '-80px' } as React.CSSProperties} />
      <div className="solder-spark" style={{ top: '60%', right: '20%', '--dx': '-20px', '--dy': '-30px', '--dx2': '-40px', '--dy2': '-60px', animationDelay: '0.5s' } as React.CSSProperties} />
      <div className="solder-spark" style={{ top: '35%', left: '45%', '--dx': '15px', '--dy': '-50px', '--dx2': '-20px', '--dy2': '-70px', animationDelay: '1s' } as React.CSSProperties} />
      <div className="solder-spark" style={{ top: '75%', left: '10%', '--dx': '-25px', '--dy': '-20px', '--dx2': '30px', '--dy2': '-50px', animationDelay: '0.3s' } as React.CSSProperties} />

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
              Available to work / internship
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
            className="mt-4 min-h-[148px] font-display text-5xl font-bold leading-[1.05] text-light md:min-h-[188px] md:text-7xl glitch-anim"
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
            <span className="inline-block rounded-full border border-accent/50 bg-accent/10 px-3 py-1.5 text-accent font-semibold glitched">
              Embedded Systems Builder & AI Engineer
            </span>
          </motion.div>



          {/* Clear VALUE STATEMENT */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.62 }}
            className="mt-4 max-w-2xl text-base md:text-lg font-body leading-relaxed glow-phosphor"
            style={{ color: "rgb(var(--color-light))" }}
          >
            I build things that work in the real world{" "}
            <span className="gradient-text font-semibold glitched">— from burning ESP32s at midnight</span>{" "}
            to shipping production AI systems. Hardware first, software always.
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
              className="glass-btn btn-shimmer rounded-full px-7 py-3.5 font-body text-sm font-semibold relative z-10 inline-flex items-center gap-2"
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
          whileHover={{ y: -4, boxShadow: "0 8px 32px rgba(139,92,246,0.15)" }}
          className="distressed-border warning-corner scope-grid glass rounded-3xl border border-border p-5 transition-all duration-300"
        >
          {/* PCB trace line */}
          <div className="pcb-line mb-4" />

          {/* Name + favicon badge */}
          <div className="flex items-center gap-2 mb-4">
            <Image src="/favicon.svg" alt="HK" width={28} height={28} className="rounded-lg chromatic-hover" />
            <span className="font-display font-bold text-base text-light glitch-anim">Hari Krishnaa N</span>
          </div>
          {/* Profile photo with orbital rings */}
          <div className="mx-auto mb-5 relative flex h-48 w-48 items-center justify-center">
            {/* Glowing halo */}
            <motion.div
              className="absolute w-52 h-52 rounded-full"
              style={{ background: "radial-gradient(circle, rgba(139,92,246,0.15) 0%, transparent 70%)" }}
              animate={prefersReducedMotion ? {} : { scale: [1, 1.08, 1], opacity: [0.4, 0.15, 0.4] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute inset-0 rounded-full border border-accent/30"
              animate={prefersReducedMotion ? {} : { scale: [1, 1.1, 1], opacity: [0.5, 0.15, 0.5] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            />
            {/* Rotating dashed orbit ring */}
            <div
              className="absolute inset-3 rounded-full"
              style={{
                border: "1.5px dashed rgba(139,92,246,0.25)",
                animation: prefersReducedMotion ? "none" : "orbit-ring 20s linear infinite",
              }}
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
            <div className="relative z-10 h-36 w-36 rounded-full border-2 border-accent/50 overflow-hidden chromatic-hover">
              <Image
                src="/profile.jpg"
                alt="Hari Krishnaa N - Embedded Systems Builder"
                fill
                className="object-cover object-top"
                sizes="144px"
              />
            </div>
          </div>
          {/* Hero Proof Row — removed */}
          <p className="readout-label mb-2">Current Focus</p>
          <div className="mt-4 space-y-3">
            <div className="rounded-xl border border-border bg-surface/70 p-4 rough-edge">
              <p className="readout-label">Direction</p>
              <p className="mt-1 readout-value glow-phosphor">Hardware-rooted automation — embedded systems that sense, actuate, and connect to intelligent backends.</p>
            </div>
            <div className="rounded-xl border border-border bg-surface/70 p-4 rough-edge">
              <p className="readout-label">Core Domain</p>
              <p className="mt-1 readout-value glow-phosphor">Mechanical Engineering · Mechatronics · Additive Manufacturing</p>
            </div>
            <div className="rounded-xl border border-border bg-surface/70 p-4 rough-edge">
              <p className="readout-label">Availability</p>
              <p className="mt-1 readout-value glow-phosphor" style={{ fontSize: '11px' }}>Open to support idea-to-MVP builds, internships, placement roles, full-time work, and freelance projects.</p>
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
        <span className="text-xs font-mono glitch-anim">[scroll]</span>
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.5, repeat: Infinity }} className="chromatic-hover">
          <ArrowDown size={18} />
        </motion.div>
      </motion.div>
    </section>
  );
}
