"use client";
import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  FiExternalLink, FiGithub, FiChevronDown, FiX, FiDownload,
  FiZap, FiTarget, FiTrendingUp, FiBookOpen, FiCode,
} from "react-icons/fi";

type Project = {
  title: string;
  subtitle: string;
  desc: string;
  problem: string;
  solution: string;
  impact: string;
  learnings: string;
  designProcess: string[];
  userInsight: string;
  tags: string[];
  status: "completed" | "ongoing" | "";
  color: string;
  glow: string;
  featured: boolean;
  github?: string;
  demo?: string;
  apk?: string;
};

function extractProofMetrics(impact: string): string[] {
  const matches = [
    ...impact.matchAll(/Rs\.?\s?\d+K-\d+K\/month/gi),
    ...impact.matchAll(/\d+(?:\.\d+)?\s?(?:%|x|ms|M\+|K\+|hours?|weeks?)/gi),
  ].map((m) => m[0].trim());

  return Array.from(new Set(matches)).slice(0, 4);
}

function tightenLine(text: string, max = 130): string {
  const normalized = text.replace(/\s+/g, " ").trim();
  if (normalized.length <= max) return normalized;
  const trimmed = normalized.slice(0, max);
  const lastSpace = trimmed.lastIndexOf(" ");
  return `${trimmed.slice(0, lastSpace > 70 ? lastSpace : max)}...`;
}

const projects: Project[] = [
  {
    title: "FlowMind AI",
    subtitle: "Autonomous Multi-Agent Workflow System",
    desc: "Converts meeting inputs into structured, auto-assigned tasks using a multi-agent AI pipeline. Handles task tracking, delay detection, smart reminders, and escalation workflows end-to-end.",
    problem: "Teams lose hours converting meeting notes into actionable tasks manually, leading to missed follow-ups and accountability gaps.",
    solution: "A multi-agent AI system that parses meeting context, extracts action items, assigns owners, sets deadlines, and escalates blockers automatically.",
    impact: "Reduced manual task entry by 90% and saved 5+ hours per team per week across pilot deployments.",
    learnings: "Multi-agent orchestration demands robust state management — failure recovery and agent handoff logic are as critical as the core AI logic.",
    userInsight: "Users don't want to manage tasks — they want outcomes. The insight was that the real pain isn't task creation, it's the cognitive load of remembering what needs to happen next. FlowMind removes that entirely.",
    designProcess: [
      "Empathise — Interviewed 6 team leads about post-meeting chaos; discovered 73% of action items were forgotten within 48 hours",
      "Define — Core problem: the gap between 'we discussed it' and 'it actually got done' is a system failure, not a people failure",
      "Ideate — Explored rule-based automation, calendar integrations, and AI parsing; chose multi-agent for contextual flexibility",
      "Prototype — Built a single-agent MVP first, validated parsing accuracy on 50 real meeting transcripts",
      "Test — Ran 3-week pilot with 2 teams; measured task completion rate before/after (41% → 94%)",
      "Iterate — Added delay detection and escalation after discovering blockers were the #1 reason tasks stalled",
    ],
    tags: ["Python", "Multi-Agent AI", "LLM", "LangChain", "Automation"],
    status: "completed",
    color: "#8b5cf6",
    glow: "rgba(139, 92, 246, 0.35)",
    featured: true,
    github: "https://github.com/krishnaa-0506/python-project-advanced",
  },
  {
    title: "Zero Barrier",
    subtitle: "Inclusive AI Job Platform for Blue-Collar Workers",
    desc: "An AI-powered multilingual job platform enabling low-literacy and blue-collar workers to discover and apply for verified jobs without resumes or digital skills. Features voice navigation, Aadhaar verification, and location-based job discovery within 10 km.",
    problem: "300M+ informal workers in India are excluded from digital job platforms due to language barriers, low literacy, and lack of digital skills.",
    solution: "A zero-friction platform with voice-guided navigation, multilingual UI, one-click apply, Aadhaar-based employer verification, OCR identity checks, and toll-free feature phone support.",
    impact: "Targets 300M+ informal workers. Eliminates middlemen, saving workers Rs.5K-10K/month. Promotes employment equality and financial inclusion at scale.",
    learnings: "Designing for zero digital literacy requires rethinking every UX assumption — icons, flows, and language must work for someone who has never used a smartphone.",
    userInsight: "The real barrier isn't technology — it's trust and language. Workers don't apply online because they fear fraud and can't read English. The design had to feel like talking to a trusted person, not using an app.",
    designProcess: [
      "Empathise — Field research with daily-wage workers in Coimbatore; discovered most had smartphones but couldn't navigate apps",
      "Define — Core insight: the job search process assumes literacy, internet fluency, and a resume — none of which this user has",
      "Ideate — Mapped every touchpoint to voice-first alternatives; designed icon-only navigation with audio labels",
      "Prototype — Paper prototypes tested with 12 workers who had never used a job app; iterated on icon comprehension",
      "Test — Validated Aadhaar-based trust signal as the #1 factor in employer credibility for workers",
      "Ongoing — Building toll-free IVR integration for feature phone users who can't access smartphones at all",
    ],
    tags: ["React Native", "Node.js", "MongoDB", "AI/ML", "OCR", "Speech-to-Text", "Multilingual UI"],
    status: "ongoing",
    color: "#10b981",
    glow: "rgba(16, 185, 129, 0.35)",
    featured: true,
  },
  {
    title: "Hira v2",
    subtitle: "AI Gym Companion for Serious Athletes",
    desc: "An advanced evolution of Hira built specifically for gym-goers and serious athletes. Features AI-driven progressive overload planning, form tracking, nutrition logging, and performance analytics with a premium UI.",
    problem: "Serious gym-goers need structured progressive overload, not generic plans — existing apps lack the depth for performance-focused training.",
    solution: "AI-powered periodisation engine with progressive overload logic, rep/set tracking, nutrition macros, and performance trend visualisation.",
    impact: "Designed for measurable strength gains — early testers reported consistent PRs within 6-week training blocks.",
    learnings: "Athlete UX demands precision and speed — every extra tap in a gym session is friction that kills retention.",
    userInsight: "Gym users log between sets — they have 60–90 seconds. Every interaction must be completable in under 5 taps. The design principle was: if it takes longer than a rest period, it won't be used.",
    designProcess: [
      "Empathise — Surveyed 20 gym-goers; 85% said they stopped using apps because logging felt like a second workout",
      "Define — The core tension: athletes need detailed data but hate data entry. Solution must feel effortless.",
      "Ideate — Explored voice logging, barcode scanning, and AI prediction of next set based on previous performance",
      "Prototype — Built a 3-screen MVP: today's workout, log set, progress chart. Nothing else.",
      "Test — 6-week beta with 8 athletes; measured PR frequency and app retention (92% weekly active)",
      "Iterate — Added AI progressive overload suggestions after testers asked 'what should I do next week?'",
    ],
    tags: ["Flutter", "Firebase", "AI", "Sports Tech", "Progressive Overload"],
    status: "completed",
    color: "#f97316",
    glow: "rgba(249, 115, 22, 0.35)",
    featured: true,
    github: "https://github.com/krishnaa-0506/hira-gym",
  },
  {
    title: "Mind Mate",
    subtitle: "AI Mental Wellness Companion",
    desc: "A mood-based mental wellness app that helps users break free from stress through AI-curated music therapy, mindfulness games, and a compassionate mind companion that adapts to emotional state in real time.",
    problem: "People under stress lack accessible, personalised tools that respond to their emotional state without clinical friction or stigma.",
    solution: "AI mood detection drives a dynamic companion that recommends calming games, music playlists, and guided breathing tailored to the user's current emotional state.",
    impact: "Users reported significant stress reduction after 10-minute sessions; companion engagement 3x higher than static wellness apps.",
    learnings: "Emotional UX demands restraint — every interaction must feel safe, non-judgmental, and supportive. Less is more.",
    userInsight: "People in distress don't want to be told what to do — they want to feel heard. The companion's first response is always acknowledgment, never advice. This single design decision drove the highest satisfaction scores.",
    designProcess: [
      "Empathise — Spoke with 15 college students about stress; discovered most felt existing apps were 'too clinical' or 'too cheerful'",
      "Define — The emotional design challenge: create a companion that feels present without being intrusive or prescriptive",
      "Ideate — Explored chatbot, journaling, and game-based approaches; chose a hybrid companion model",
      "Prototype — Designed 3 companion personalities (calm, playful, grounding); tested emotional resonance with users",
      "Test — A/B tested acknowledgment-first vs advice-first responses; acknowledgment drove 3x longer sessions",
      "Iterate — Added music therapy after discovering users naturally opened Spotify during sessions",
    ],
    tags: ["Flutter", "Firebase", "AI", "NLP", "Music Therapy", "Mental Health"],
    status: "completed",
    color: "#a78bfa",
    glow: "rgba(167, 139, 250, 0.35)",
    featured: false,
    github: "https://github.com/krishnaa-0506/Mind-Mate",
    apk: "/mind-mate.apk",
  },
  {
    title: "Hira v1",
    subtitle: "AI Fitness Companion App",
    desc: "AI-powered personal fitness app with real-time activity tracking, personalised workout recommendations, and Firebase-backed data sync. Analyses user patterns to adapt training plans dynamically.",
    problem: "Generic fitness apps apply one-size-fits-all plans that don't adapt to individual progress, leading to low adherence and plateau.",
    solution: "An AI engine analyses activity history, recovery patterns, and goals to generate personalised, adaptive workout recommendations in real time.",
    impact: "Users reported 3x higher workout consistency compared to static fitness apps, with measurable improvement in adherence over 30-day periods.",
    learnings: "Offline-first architecture is non-negotiable for fitness apps — users train in gyms with poor connectivity.",
    userInsight: "The biggest drop-off in fitness apps happens at week 3 — when the initial plan stops feeling relevant. Hira v1 was built to detect this plateau and adapt before the user even notices.",
    designProcess: [
      "Empathise — Analysed 30-day retention data from popular fitness apps; identified week 3 as the critical drop-off point",
      "Define — Core problem: static plans don't account for real-life variability (missed days, soreness, schedule changes)",
      "Ideate — Designed an adaptive engine that recalibrates weekly based on completion rate and user feedback",
      "Prototype — Built Firebase-backed activity tracker with basic recommendation logic",
      "Test — 30-day trial with 10 users; measured workout completion rate vs a static plan control group",
      "Ongoing — Evolving into Hira v2 with deeper AI and gym-specific features",
    ],
    tags: ["Flutter", "Firebase", "AI", "Health Tech"],
    status: "ongoing",
    color: "#d946ef",
    glow: "rgba(217, 70, 239, 0.35)",
    featured: false,
    github: "https://github.com/krishnaa-0506",
  },
  {
    title: "As Always",
    subtitle: "Emotion-Aware Conversational App",
    desc: "An emotion-aware chatbot that delivers empathetic, context-sensitive responses by analysing user sentiment in real time. Adapts tone, language, and response depth based on detected emotional state.",
    problem: "Chatbots feel robotic and tone-deaf — they respond the same way whether a user is frustrated, sad, or excited.",
    solution: "NLP-powered sentiment analysis engine classifies emotional state and adjusts response tone, empathy level, and pacing accordingly.",
    impact: "80% user satisfaction on emotional response quality vs standard chatbots in comparative testing.",
    learnings: "Emotional tone is fragile — a single misclassified sentiment can break user trust. Confidence thresholds and fallback logic are critical.",
    userInsight: "Users forgive wrong answers but not wrong tone. A factually incorrect response delivered with empathy scores higher than a correct response delivered coldly. Tone is the product.",
    designProcess: [
      "Empathise — Collected 200+ chat transcripts from users interacting with standard chatbots; coded emotional mismatch moments",
      "Define — The core failure: chatbots optimise for accuracy, not emotional resonance",
      "Ideate — Designed a sentiment classification layer that sits between user input and response generation",
      "Prototype — Built 5 response tone profiles (empathetic, neutral, celebratory, grounding, curious)",
      "Test — Blind comparison test: users rated emotion-aware responses 80% higher on 'felt understood'",
      "Iterate — Added confidence thresholds to prevent misclassification from triggering wrong tone",
    ],
    tags: ["Flutter", "Firebase", "AI", "NLP", "Sentiment Analysis"],
    status: "completed",
    color: "#f59e0b",
    glow: "rgba(245, 158, 11, 0.35)",
    featured: false,
    github: "https://github.com/krishnaa-0506/As-Always",
    demo: "https://asalwayspitchdeck.netlify.app",
  },
  {
    title: "Lunar Hazard AI",
    subtitle: "AI-Powered Lunar Surface Hazard Detection",
    desc: "An AI system for detecting and classifying hazards on the lunar surface — craters, boulders, and terrain anomalies — to support safe lunar rover navigation and landing zone selection.",
    problem: "Lunar surface navigation requires real-time hazard detection; manual analysis of terrain data is too slow for autonomous rover operations.",
    solution: "Computer vision model trained on lunar imagery to detect, classify, and map surface hazards with spatial accuracy for autonomous navigation systems.",
    impact: "Demonstrates viable AI-assisted hazard mapping for lunar exploration missions with high detection accuracy on test datasets.",
    learnings: "Domain-specific training data is scarce for space applications — data augmentation and transfer learning from terrestrial datasets are essential.",
    userInsight: "The 'user' here is an autonomous rover. Designing for non-human agents requires thinking about failure modes differently — a missed crater isn't a bad UX, it's a mission failure.",
    designProcess: [
      "Empathise — Studied NASA rover navigation challenges; identified terrain classification as the critical bottleneck",
      "Define — Problem: existing models trained on Earth terrain fail on lunar surface characteristics",
      "Ideate — Explored transfer learning from Mars datasets, synthetic data generation, and domain adaptation",
      "Prototype — Fine-tuned YOLOv8 on lunar imagery dataset with crater, boulder, and flat terrain classes",
      "Test — Evaluated on held-out lunar imagery; measured precision/recall for each hazard class",
      "Iterate — Applied data augmentation (brightness, contrast, rotation) to improve low-light performance",
    ],
    tags: ["Python", "Computer Vision", "Deep Learning", "OpenCV", "Space Tech"],
    status: "completed",
    color: "#64748b",
    glow: "rgba(100, 116, 139, 0.35)",
    featured: false,
    github: "https://github.com/krishnaa-0506/lunar-hazard-ai",
  },
  {
    title: "Smart Wearable System",
    subtitle: "IoT Multi-Sensor Health Monitor",
    desc: "A custom-built real-time health monitoring wearable integrating multiple biosensors for simultaneous tracking of vitals. Features wireless data transmission, cloud sync, and a live dashboard for health analytics.",
    problem: "Consumer wearables track limited metrics with poor real-time analytics and closed ecosystems that prevent custom health monitoring workflows.",
    solution: "Custom multi-sensor hardware stack with embedded firmware, real-time data processing, wireless communication, and a cloud-connected analytics dashboard.",
    impact: "10+ health metrics tracked simultaneously with sub-100ms latency — validated in controlled testing environments.",
    learnings: "Sensor fusion and per-sensor calibration are critical for data accuracy — raw sensor data without calibration is unreliable for health applications.",
    userInsight: "Healthcare professionals need data they can trust, not just data. The design principle was: every metric displayed must have a validated calibration baseline, or it shouldn't be shown at all.",
    designProcess: [
      "Empathise — Interviewed physiotherapy students about wearable limitations; discovered data trust was the #1 concern",
      "Define — Core challenge: building a wearable that produces clinically meaningful data, not just numbers",
      "Ideate — Selected sensor suite based on clinical relevance: SpO2, ECG, temperature, GSR, accelerometer",
      "Prototype — Built on ESP32 with custom PCB; iterated through 3 hardware revisions for signal quality",
      "Test — Validated against clinical-grade devices; achieved <5% deviation on key metrics",
      "Iterate — Added real-time anomaly detection to flag readings outside normal ranges",
    ],
    tags: ["IoT", "Embedded C", "Sensors", "Wireless", "Health Tech"],
    status: "completed",
    color: "#22c55e",
    glow: "rgba(34, 197, 94, 0.35)",
    featured: false,
  },
  {
    title: "GoKart Telemetry",
    subtitle: "Real-Time Performance Analytics Dashboard",
    desc: "A live telemetry system for go-kart performance optimisation. Captures speed, torque, RPM, and thermal data from embedded sensors and streams it to a React dashboard for real-time tuning and post-session analysis.",
    problem: "Go-kart performance tuning relies on subjective driver feedback — without real data, optimisation is guesswork.",
    solution: "Embedded telemetry unit with multi-sensor data acquisition, wireless streaming, and a React-based live dashboard with historical session comparison.",
    impact: "Enabled data-driven tuning that delivered a measurable 20% performance improvement across tracked sessions.",
    learnings: "Real-time dashboards require efficient data streaming protocols — WebSocket with delta compression outperforms REST polling for live telemetry.",
    userInsight: "Drivers and engineers speak different languages. The dashboard was designed with two views: a driver view (simple, large numbers, colour-coded) and an engineer view (detailed graphs, raw data). Same data, different mental models.",
    designProcess: [
      "Empathise — Observed a kart tuning session; engineers were guessing based on driver descriptions like 'it felt slow in turn 3'",
      "Define — The translation problem: subjective driver experience needs to become objective engineering data",
      "Ideate — Mapped driver sensations to measurable parameters: 'slow' = RPM drop, 'vibration' = accelerometer spike",
      "Prototype — Built minimal sensor array (speed, RPM, temperature) with basic WebSocket streaming",
      "Test — Live session with 2 engineers; identified a carburetor issue in 10 minutes that had taken 3 sessions to diagnose before",
      "Iterate — Added session comparison overlay after engineers asked 'how does this compare to last week?'",
    ],
    tags: ["React", "Embedded Systems", "WebSocket", "Data Viz", "Motorsport"],
    status: "completed",
    color: "#f97316",
    glow: "rgba(249, 115, 22, 0.35)",
    featured: false,
  },
  {
    title: "Dynamo EV Prototype",
    subtitle: "Regenerative Energy Electric Vehicle",
    desc: "A small-scale electric vehicle prototype incorporating a dynamo-based regenerative energy recovery system. Captures kinetic energy during braking and deceleration to extend battery range.",
    problem: "Conventional small-scale EVs waste kinetic energy during braking, limiting range and efficiency.",
    solution: "Hybrid dynamo + battery architecture with regenerative braking circuitry that recovers and stores kinetic energy, feeding it back into the drive system.",
    impact: "Achieved 50% extended range in prototype testing through regenerative energy capture — validated on a controlled test track.",
    learnings: "Mechanical-electrical integration requires careful impedance matching and thermal management — energy recovery efficiency drops sharply without proper load balancing.",
    userInsight: "Range anxiety is the #1 barrier to EV adoption at small scale. The design question wasn't 'how do we add more battery?' but 'how do we waste less energy?' — a fundamentally different framing that led to the regenerative approach.",
    designProcess: [
      "Empathise — Analysed small-scale EV failure modes; range limitation was the primary reason for abandonment",
      "Define — Reframed the problem: instead of bigger battery, recover energy that's already being wasted",
      "Ideate — Explored flywheel storage, supercapacitors, and dynamo-based recovery; chose dynamo for simplicity",
      "Prototype — Built regenerative braking circuit with charge controller; tested energy recovery on incline",
      "Test — Measured range on controlled 500m track with and without regenerative system",
      "Iterate — Optimised load balancing circuit to prevent battery overcharge during high-frequency braking",
    ],
    tags: ["Embedded Systems", "Power Electronics", "Prototyping", "Green Energy"],
    status: "completed",
    color: "#a855f7",
    glow: "rgba(168, 85, 247, 0.35)",
    featured: false,
  },
  {
    title: "AI Agentic Email System",
    subtitle: "Intelligent Email Automation Agent (Concept)",
    desc: "A concept agentic AI system that reads, prioritises, and responds to emails autonomously. Converts messages into tracked tasks with scheduling, follow-up automation, and smart escalation based on urgency and context.",
    problem: "Email overload causes missed follow-ups, delayed responses, and lost business opportunities for busy professionals.",
    solution: "AI agents parse email intent, classify urgency, draft contextual replies, schedule follow-ups, and convert action items into a task pipeline.",
    impact: "Concept demonstrates 60% faster email processing potential with zero missed follow-ups through full automation.",
    learnings: "Domain-specific prompt engineering is essential for accurate intent extraction; generic prompts fail on nuanced business email context.",
    userInsight: "Email is not a communication tool — it's a task management system that people are using wrong. The design insight was to treat every email as a potential action item and build the system around that mental model.",
    designProcess: [
      "Empathise — Tracked personal email patterns for 2 weeks; 68% of emails required a follow-up action",
      "Define — Core problem: email clients are designed for reading, not for acting",
      "Ideate — Designed an agent pipeline: classify → extract → draft → schedule → track",
      "Prototype — Built intent classification on 500 sample emails; achieved 84% accuracy on urgency detection",
      "Test — Concept validation with 3 professionals; all reported the automation would save 1+ hour daily",
      "Note — This is a concept/demo project; production deployment requires enterprise email API access",
    ],
    tags: ["Agentic AI", "Python", "LLM", "Backend", "Automation"],
    status: "completed",
    color: "#06b6d4",
    glow: "rgba(6, 182, 212, 0.35)",
    featured: false,
    github: "https://github.com/krishnaa-0506",
  },
];

/* ── Status badge ────────────────────────────────────────────── */
function StatusBadge({ status }: { status: Project["status"] }) {
  if (!status) return null;
  const label = status === "completed" ? "Completed" : "Ongoing";
  const bg = status === "completed" ? "#10b981" : "#f59e0b";
  return (
    <span className="text-xs font-mono px-2.5 py-1 rounded-full"
      style={{ background: `${bg}18`, color: bg, border: `1px solid ${bg}35` }}>
      ● {label}
    </span>
  );
}

/* ── Project Detail Modal ────────────────────────────────────── */
function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const p = project;
  const proofMetrics = extractProofMetrics(p.impact);
  const statusColor = p.status === "completed" ? "#10b981" : p.status === "ongoing" ? "#f59e0b" : "";
  const statusLabel = p.status === "completed" ? "Completed" : p.status === "ongoing" ? "Ongoing" : "";

  const modal = (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      style={{
        position: "fixed", inset: 0, zIndex: 99999,
        background: "rgba(3,7,18,0.92)", backdropFilter: "blur(20px)",
        overflowY: "auto", WebkitOverflowScrolling: "touch",
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-modal-title"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div style={{ minHeight: "100%", display: "flex", alignItems: "center", justifyContent: "center", padding: "16px 12px" }}>
        <motion.div
          initial={{ opacity: 0, y: 48, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 48, scale: 0.95 }}
          transition={{ type: "spring", damping: 30, stiffness: 300 }}
          style={{
            width: "100%", maxWidth: 720,
            background: "rgba(13,20,40,0.98)",
            border: `1px solid ${p.color}45`,
            borderRadius: 28,
            boxShadow: `0 48px 96px ${p.glow}, 0 0 0 1px ${p.color}18`,
            overflow: "hidden",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div style={{
            position: "relative", height: 160, overflow: "hidden",
            background: `linear-gradient(135deg, ${p.color}22 0%, ${p.color}08 55%, transparent 100%)`,
          }}>
            <div style={{ position: "absolute", top: -40, right: -40, width: 200, height: 200, borderRadius: "50%", background: p.color, filter: "blur(60px)", opacity: 0.18 }} />
            <button onClick={onClose} aria-label="Close case study" style={{
              position: "absolute", top: 16, right: 16, width: 38, height: 38, borderRadius: "50%",
              background: "rgba(13,20,40,0.85)", border: `1px solid ${p.color}40`,
              display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", zIndex: 10,
            }}>
              <FiX size={17} color="#f8fafc" />
            </button>
            <div style={{ position: "absolute", bottom: 20, left: 28 }}>
              {statusLabel && (
                <span style={{
                  display: "inline-block", padding: "3px 12px", borderRadius: 999, fontSize: 11,
                  fontFamily: "monospace", marginBottom: 8,
                  background: `${statusColor}20`, color: statusColor, border: `1px solid ${statusColor}40`,
                }}>● {statusLabel}</span>
              )}
              <div id="project-modal-title" style={{ fontFamily: "serif", fontWeight: 800, fontSize: 26, color: "#f8fafc", lineHeight: 1.2 }}>{p.title}</div>
              <div style={{ fontFamily: "monospace", fontSize: 12, color: p.color, marginTop: 4 }}>{p.subtitle}</div>
            </div>
          </div>

          {/* Body */}
          <div className="px-5 py-6 sm:px-8 sm:py-7" style={{ display: "flex", flexDirection: "column", gap: 22 }}>
            <p style={{ color: "#94a3b8", fontSize: 14, lineHeight: 1.7 }}>{p.desc}</p>

            {proofMetrics.length > 0 && (
              <div style={{ borderRadius: 16, padding: "14px 16px", background: `${p.color}10`, border: `1px solid ${p.color}2d` }}>
                <div style={{ fontFamily: "monospace", fontSize: 10, letterSpacing: 1.4, textTransform: "uppercase", color: p.color, marginBottom: 10 }}>
                  Proof Metrics
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {proofMetrics.map((metric) => (
                    <span key={metric} style={{ padding: "6px 12px", borderRadius: 999, fontSize: 12, fontFamily: "monospace", background: `${p.color}16`, color: "#e2e8f0", border: `1px solid ${p.color}35` }}>
                      {metric}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Links */}
            {(p.github || p.demo || p.apk) && (
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                {p.github && <a href={p.github} target="_blank" rel="noopener noreferrer" style={{ display: "flex", alignItems: "center", gap: 6, padding: "7px 16px", borderRadius: 12, fontSize: 12, fontFamily: "monospace", background: `${p.color}15`, color: p.color, border: `1px solid ${p.color}35`, textDecoration: "none" }}><FiGithub size={13} /> GitHub</a>}
                {p.demo && <a href={p.demo} target="_blank" rel="noopener noreferrer" style={{ display: "flex", alignItems: "center", gap: 6, padding: "7px 16px", borderRadius: 12, fontSize: 12, fontFamily: "monospace", background: `${p.color}15`, color: p.color, border: `1px solid ${p.color}35`, textDecoration: "none" }}><FiExternalLink size={13} /> Live Demo</a>}
                {p.apk && <a href={p.apk} download style={{ display: "flex", alignItems: "center", gap: 6, padding: "7px 16px", borderRadius: 12, fontSize: 12, fontFamily: "monospace", background: `${p.color}15`, color: p.color, border: `1px solid ${p.color}35`, textDecoration: "none" }}><FiDownload size={13} /> Download APK</a>}
              </div>
            )}

            {/* Tech stack */}
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
                <FiCode size={14} color={p.color} />
                <span style={{ fontFamily: "monospace", fontSize: 10, textTransform: "uppercase", letterSpacing: 2, color: p.color }}>Tech Stack</span>
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {p.tags.map((tag) => (
                  <span key={tag} style={{ padding: "5px 12px", borderRadius: 999, fontSize: 12, fontFamily: "monospace", background: `${p.color}14`, color: p.color, border: `1px solid ${p.color}32` }}>{tag}</span>
                ))}
              </div>
            </div>

            {/* Problem / Solution / Impact */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))", gap: 12 }}>
              {[
                { icon: FiZap, label: "Problem", text: p.problem, ic: "#64748b" },
                { icon: FiTarget, label: "Solution", text: p.solution, ic: p.color },
                { icon: FiTrendingUp, label: "Impact", text: p.impact, ic: "#10b981" },
              ].map(({ icon: Icon, label, text, ic }) => (
                <div key={label} style={{ borderRadius: 16, padding: "16px", background: `${p.color}08`, border: `1px solid ${p.color}1e` }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 8 }}>
                    <Icon size={13} color={ic} />
                    <span style={{ fontFamily: "monospace", fontSize: 9, textTransform: "uppercase", letterSpacing: 1.5, color: ic }}>{label}</span>
                  </div>
                  <p style={{ fontSize: 12, color: label === "Impact" ? "#e2e8f0" : "#94a3b8", lineHeight: 1.6 }}>{tightenLine(text, 170)}</p>
                </div>
              ))}
            </div>

            {/* User Insight */}
            <div style={{ borderRadius: 16, padding: "18px 20px", background: `${p.color}0a`, border: `1px solid ${p.color}25` }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
                <FiTarget size={13} color={p.color} />
                <span style={{ fontFamily: "monospace", fontSize: 9, textTransform: "uppercase", letterSpacing: 1.5, color: p.color }}>Core User Insight</span>
              </div>
              <p style={{ fontSize: 13.5, color: "#e2e8f0", lineHeight: 1.75, fontStyle: "italic" }}>&ldquo;{p.userInsight}&rdquo;</p>
            </div>

            {/* Design Process */}
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
                <FiBookOpen size={14} color={p.color} />
                <span style={{ fontFamily: "monospace", fontSize: 10, textTransform: "uppercase", letterSpacing: 2, color: p.color }}>Design Process</span>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
                {p.designProcess.map((step, i) => {
                  const phase = step.split(" — ")[0];
                  const detail = step.split(" — ")[1] || step;
                  return (
                    <div key={i} style={{ display: "flex", gap: 0, position: "relative" }}>
                      {/* Timeline line */}
                      {i < p.designProcess.length - 1 && (
                        <div style={{ position: "absolute", left: 11, top: 24, bottom: -8, width: 1, background: `${p.color}25` }} />
                      )}
                      <div style={{ display: "flex", gap: 14, alignItems: "flex-start", paddingBottom: 16 }}>
                        <div style={{ width: 22, height: 22, borderRadius: "50%", background: `${p.color}20`, border: `1.5px solid ${p.color}60`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 1, zIndex: 1 }}>
                          <span style={{ fontSize: 9, fontFamily: "monospace", color: p.color, fontWeight: 700 }}>{i + 1}</span>
                        </div>
                        <div>
                          <span style={{ fontSize: 11, fontFamily: "monospace", fontWeight: 700, color: p.color, textTransform: "uppercase", letterSpacing: 0.5 }}>{phase}</span>
                          {detail !== step && <p style={{ fontSize: 12.5, color: "#94a3b8", lineHeight: 1.65, marginTop: 3 }}>{detail}</p>}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Key Learnings */}
            <div style={{ borderRadius: 16, padding: "16px 20px", background: "rgba(13,20,40,0.6)", borderLeft: `3px solid ${p.color}`, border: `1px solid ${p.color}22` }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                <FiBookOpen size={13} color={p.color} />
                <span style={{ fontFamily: "monospace", fontSize: 9, textTransform: "uppercase", letterSpacing: 1.5, color: p.color }}>Key Learnings</span>
              </div>
              <p style={{ fontSize: 13, color: "#94a3b8", lineHeight: 1.7, fontStyle: "italic" }}>&ldquo;{p.learnings}&rdquo;</p>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );

  return createPortal(modal, document.body);
}

/* ── Main Projects Section ───────────────────────────────────── */
export default function Projects() {
  const [showAll, setShowAll] = useState(false);
  const [selected, setSelected] = useState<Project | null>(null);
  const [ref, inView] = useInView({ threshold: 0.05, triggerOnce: true });
  const displayed = showAll ? projects : projects.filter((p) => p.featured);

  return (
    <section id="projects" ref={ref} className="py-12 md:py-16 px-4 sm:px-6 relative">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 right-0 w-96 h-96 -translate-y-1/2 rounded-full blur-3xl opacity-5"
          style={{ background: "radial-gradient(circle, #d946ef, transparent 70%)" }} />
      </div>

      <div className="max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }} className="text-center mb-12">
          <span className="font-mono text-accent text-sm tracking-widest uppercase">What I Built</span>
          <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl text-light mt-3">
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <p className="mt-4 text-muted text-base font-body max-w-2xl mx-auto">
            Shipped products spanning AI automation, mobile apps, IoT, space tech, and social impact.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          <AnimatePresence>
            {displayed.map((proj, i) => (
              <motion.article key={proj.title}
                initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }} transition={{ delay: i * 0.09, duration: 0.55 }}
                whileHover={{ boxShadow: `0 36px 72px ${proj.glow}` }}
                className="project-card glass rounded-3xl border border-border/50 p-5 sm:p-7 group relative overflow-hidden flex flex-col cursor-pointer text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/70"
                role="button"
                tabIndex={0}
                aria-label={`Open case study for ${proj.title}`}
                onClick={() => setSelected(proj)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setSelected(proj);
                  }
                }}>
                <div className="absolute top-0 right-0 w-36 h-36 rounded-full blur-3xl opacity-0 group-hover:opacity-25 transition-opacity duration-500" style={{ background: proj.color }} />
                <div className="absolute top-0 left-0 right-0 h-px opacity-60" style={{ background: `linear-gradient(90deg, transparent, ${proj.color}, transparent)` }} />

                <div className="mb-5 flex items-center justify-between">
                  <div className="w-10 h-1 rounded-full" style={{ background: proj.color }} />
                  <StatusBadge status={proj.status} />
                </div>

                <h3 className="font-display font-bold text-xl text-light mb-1">{proj.title}</h3>
                <p className="font-mono text-sm mb-4" style={{ color: proj.color }}>{proj.subtitle}</p>
                <p className="text-muted text-sm font-body leading-relaxed mb-5 line-clamp-3">{proj.desc}</p>

                <div className="mb-5 px-4 py-3 rounded-xl"
                  style={{ borderLeft: `2px solid ${proj.color}70`, background: `${proj.color}08` }}>
                  <p className="font-mono text-xs mb-1 opacity-60" style={{ color: proj.color }}>Impact</p>
                  <p className="text-light text-sm font-body font-medium leading-snug">{tightenLine(proj.impact, 120)}</p>
                  {extractProofMetrics(proj.impact).length > 0 && (
                    <div className="mt-2.5 flex flex-wrap gap-1.5">
                      {extractProofMetrics(proj.impact).slice(0, 2).map((metric) => (
                        <span key={metric} className="px-2 py-0.5 rounded-full text-[10px] font-mono"
                          style={{ background: `${proj.color}1a`, color: "#e2e8f0", border: `1px solid ${proj.color}3a` }}>
                          {metric}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <div className="flex flex-wrap gap-1.5 mt-auto mb-5">
                  {proj.tags.slice(0, 4).map((tag) => (
                    <span key={tag} className="px-2.5 py-1 rounded-full text-xs font-mono"
                      style={{ background: `${proj.color}12`, color: proj.color, border: `1px solid ${proj.color}28` }}>
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between mt-auto">
                  <motion.div className="flex items-center gap-2 text-sm font-mono font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ color: proj.color }}>
                    <span>View Case Study</span>
                    <motion.span animate={{ x: [0, 4, 0] }} transition={{ duration: 1.2, repeat: Infinity }}>→</motion.span>
                  </motion.div>
                  <div className="card-links flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                    {proj.github && (
                      <a href={proj.github} target="_blank" rel="noopener noreferrer"
                        aria-label={`${proj.title} GitHub repository`}
                        className="w-8 h-8 rounded-full flex items-center justify-center border transition-all hover:scale-110"
                        style={{ borderColor: `${proj.color}40`, background: `${proj.color}10`, color: proj.color }}>
                        <FiGithub size={14} />
                      </a>
                    )}
                    {proj.demo && (
                      <a href={proj.demo} target="_blank" rel="noopener noreferrer"
                        aria-label={`${proj.title} live demo`}
                        className="w-8 h-8 rounded-full flex items-center justify-center border transition-all hover:scale-110"
                        style={{ borderColor: `${proj.color}40`, background: `${proj.color}10`, color: proj.color }}>
                        <FiExternalLink size={14} />
                      </a>
                    )}
                  </div>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </div>

        <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.8 }}
          className="flex justify-center mt-12">
          <motion.button whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.96 }}
            onClick={() => setShowAll(!showAll)}
            className="glass-btn flex items-center gap-2 px-8 py-3.5 rounded-full font-body text-sm font-medium">
            {showAll ? "Show Less" : `View All ${projects.length} Projects`}
            <motion.span animate={{ rotate: showAll ? 180 : 0 }} transition={{ duration: 0.3 }}>
              <FiChevronDown />
            </motion.span>
          </motion.button>
        </motion.div>
      </div>

      <AnimatePresence>
        {selected && <ProjectModal project={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </section>
  );
}
