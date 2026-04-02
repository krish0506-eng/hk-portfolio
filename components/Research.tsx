"use client";
import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { FiZap, FiDroplet, FiBox, FiCpu, FiChevronDown, FiX, FiTarget, FiTrendingUp, FiBookOpen, FiLayers, FiActivity } from "react-icons/fi";

type Research = {
  icon: React.ElementType;
  area: string;
  title: string;
  desc: string;
  tags: string[];
  color: string;
  glow: string;
  status: string;
  background: string;
  objective: string;
  methodology: string[];
  findings: string[];
  outcomes: string;
  futureScope: string;
};

const researches: Research[] = [
  {
    icon: FiZap,
    area: "Waste to Watt",
    title: "Waste-to-Watt: Power Generation",
    desc: "Gasification and pyrolysis-based power generation from municipal solid waste and biomass — validated energy yield from previously non-recoverable waste streams.",
    tags: ["Thermochemical Conversion", "Gasification", "Pyrolysis", "Biomass Energy"],
    color: "#f59e0b",
    glow: "rgba(245, 158, 11, 0.35)",
    status: "Completed",
    background: "India generates 62 million tonnes of municipal solid waste annually, with less than 20% processed scientifically. Landfills are reaching capacity while energy demand grows. This research explored thermochemical conversion as a dual solution — waste reduction and energy generation.",
    objective: "To investigate and validate the feasibility of converting municipal solid waste and agricultural biomass into electrical energy through gasification and pyrolysis pathways, with a focus on real-world scalability and energy yield optimisation.",
    methodology: [
      "Literature review of thermochemical conversion technologies (gasification, pyrolysis, combustion)",
      "Feedstock characterisation — proximate and ultimate analysis of MSW and biomass samples",
      "Gasification process modelling using stoichiometric and equilibrium approaches",
      "Pyrolysis temperature optimisation experiments (300°C–700°C range) for maximum syngas yield",
      "Energy yield calculation and comparison against conventional fossil fuel baselines",
      "Scalability analysis for 1 tonne/day pilot plant design",
    ],
    findings: [
      "Pyrolysis at 500°C yielded optimal syngas composition (H₂: 28%, CO: 42%, CH₄: 18%)",
      "Gasification of MSW produced 3.2–4.1 MJ/Nm³ calorific value syngas",
      "Biomass co-gasification improved energy yield by 23% compared to MSW-only feedstock",
      "Estimated power output: 180–220 kWh per tonne of processed waste",
      "Carbon emission reduction of 65% compared to direct landfill disposal",
    ],
    outcomes: "Research demonstrated that MSW-to-power conversion is technically viable at pilot scale with a projected payback period of 4–6 years for a 1 tonne/day plant. The findings provide a foundation for circular economy implementation in Tier-2 Indian cities.",
    futureScope: "Integration with AI-based feedstock sorting systems, real-time process monitoring using IoT sensors, and hybrid gasification-pyrolysis reactor design for improved efficiency.",
  },
  {
    icon: FiDroplet,
    area: "Waste to Value",
    title: "Waste-to-Value: Fuel Generation",
    desc: "Systematic investigation of plastic waste pyrolysis for synthetic fuel production — reactor design, process optimisation, fuel quality characterisation, and emission analysis.",
    tags: ["Plastic Pyrolysis", "Synthetic Fuel", "Circular Economy", "Emission Analysis"],
    color: "#06b6d4",
    glow: "rgba(6, 182, 212, 0.35)",
    status: "Completed",
    background: "India produces 3.5 million tonnes of plastic waste annually, with only 30% recycled. Non-recyclable mixed plastics end up in landfills or are openly burned, causing severe environmental damage. Pyrolysis offers a chemical recycling pathway that converts plastic waste into usable fuel.",
    objective: "To develop and optimise a plastic waste pyrolysis process for synthetic fuel production, characterise the derived fuel quality against petroleum standards, and conduct comparative emission analysis to assess environmental viability.",
    methodology: [
      "Feedstock preparation — sorting, cleaning, and shredding of HDPE, LDPE, PP, and PS waste",
      "Batch pyrolysis experiments across temperature range 350°C–550°C in nitrogen atmosphere",
      "Product yield analysis — liquid oil, syngas, and char fractions at each temperature",
      "Fuel quality characterisation: calorific value (bomb calorimeter), viscosity, flash point, density, pour point",
      "GC-MS analysis of pyrolysis oil composition",
      "Comparative emission testing: CO, NOx, SOx, particulate matter vs diesel baseline",
    ],
    findings: [
      "Optimal pyrolysis temperature: 450°C — maximum liquid oil yield of 68% from HDPE feedstock",
      "Pyrolysis oil calorific value: 42–44 MJ/kg (comparable to diesel at 45.5 MJ/kg)",
      "Flash point: 38°C — suitable for use as fuel blending component",
      "GC-MS identified C₁₀–C₂₀ hydrocarbon range — aliphatic and aromatic fractions",
      "CO emissions 18% lower than diesel; NOx 12% lower at equivalent energy output",
      "1 kg of mixed plastic waste yielded approximately 650–700 ml of usable fuel oil",
    ],
    outcomes: "The derived pyrolysis oil meets key quality benchmarks for use as a diesel blending component (up to 20% blend ratio). The process demonstrates a viable circular economy pathway for non-recyclable plastic waste with positive environmental metrics.",
    futureScope: "Continuous reactor design for industrial scale, catalytic pyrolysis for improved fuel quality, integration with plastic waste collection systems, and blending ratio optimisation for direct engine use.",
  },
  {
    icon: FiBox,
    area: "Waste to Value",
    title: "Waste-to-Value: 3D Filament Generation",
    desc: "Closed-loop recycling system converting post-consumer plastic waste into high-quality FDM 3D printing filament — material property retention, extrusion optimisation, and print quality benchmarking.",
    tags: ["Plastic Recycling", "FDM Filament", "Material Science", "Additive Manufacturing"],
    color: "#10b981",
    glow: "rgba(16, 185, 129, 0.35)",
    status: "Completed",
    background: "Commercial 3D printing filament costs Rs.800–2500/kg, creating a barrier for educational institutions and small-scale makers. Simultaneously, PET bottles and HDPE containers are widely available as post-consumer waste. This research bridges the gap by creating a low-cost filament production pathway from waste plastics.",
    objective: "To design and validate a closed-loop system that converts post-consumer PET and HDPE plastic waste into FDM-compatible 3D printing filament, maintaining mechanical properties comparable to virgin filament while reducing material cost by 70–80%.",
    methodology: [
      "Plastic waste collection, sorting, and contamination removal protocol development",
      "Washing, drying, and granulation of PET bottles and HDPE containers",
      "Single-screw extruder parameter optimisation: temperature profile (180°C–240°C), screw speed, die diameter",
      "Filament diameter consistency testing using digital micrometer (target: 1.75mm ±0.05mm)",
      "Mechanical property testing: tensile strength, elongation at break, impact resistance (ASTM D638)",
      "Print quality benchmarking: dimensional accuracy, layer adhesion, surface finish vs virgin PLA/PETG",
      "Multi-cycle recycling study — property retention across 3 recycling cycles",
    ],
    findings: [
      "Optimal extrusion temperature for recycled PET: 230°C with 15 rpm screw speed",
      "Diameter consistency achieved: 1.75mm ±0.04mm — within commercial tolerance",
      "Tensile strength of recycled PET filament: 48 MPa (virgin PET: 55 MPa — 87% retention)",
      "Print dimensional accuracy: ±0.2mm on 50mm test cubes — acceptable for functional parts",
      "Cost per kg of recycled filament: Rs.180–220 vs Rs.1200+ for commercial filament",
      "After 3 recycling cycles, tensile strength dropped to 78% of virgin — still printable",
    ],
    outcomes: "Successfully demonstrated a viable closed-loop filament production system. The recycled filament is suitable for non-structural prototyping and educational use. Cost reduction of 82% makes 3D printing accessible to schools and small workshops.",
    futureScope: "Automated diameter control using feedback sensors, colour additive integration, multi-material blending for property enhancement, and development of a compact desktop filament maker for institutional use.",
  },
  {
    icon: FiCpu,
    area: "Additive Manufacturing",
    title: "Additive Manufacturing: Multi-Machine Research",
    desc: "Ongoing research across FDM, SLA, and SLS platforms — process parameter optimisation, topology-optimised part design, and bio-based filament studies for sustainable manufacturing.",
    tags: ["FDM", "SLA", "SLS", "Topology Optimisation", "Sustainable Materials"],
    color: "#8b5cf6",
    glow: "rgba(139, 92, 246, 0.35)",
    status: "Ongoing",
    background: "Additive manufacturing is transforming product development across aerospace, medical, and consumer industries. However, process parameter selection remains largely empirical, leading to suboptimal part quality and material waste. This research systematically investigates parameter-property relationships across three major AM technologies.",
    objective: "To establish comprehensive process parameter maps for FDM, SLA, and SLS technologies, develop topology-optimised designs for lightweight structural components, and evaluate bio-based and recycled filament materials as sustainable alternatives to conventional polymers.",
    methodology: [
      "Design of Experiments (DoE) — Taguchi L9 orthogonal array for FDM parameter study",
      "SLA exposure parameter optimisation for dimensional accuracy and surface finish",
      "SLS laser power and scan speed variation study for PA12 and recycled PA powder",
      "Topology optimisation using Altair Inspire for bracket and structural component redesign",
      "Bio-based PLA (corn starch) and hemp-reinforced filament mechanical characterisation",
      "Comparative lifecycle assessment — conventional vs AM manufacturing for selected components",
    ],
    findings: [
      "FDM: 0.2mm layer height + 45° raster angle + 215°C nozzle temperature yielded optimal tensile strength",
      "SLA parts showed 94% dimensional accuracy at 50μm layer height with 2.8s exposure time",
      "Topology-optimised bracket achieved 42% weight reduction with only 8% strength loss",
      "Bio-based PLA showed comparable tensile strength (58 MPa) to petroleum PLA (62 MPa)",
      "Hemp-reinforced filament increased stiffness by 35% — suitable for rigid fixture applications",
    ],
    outcomes: "Established parameter guidelines for all three AM technologies applicable to educational and small-scale industrial settings. Topology optimisation results validated for lightweight component design. Bio-based material study ongoing with promising preliminary results.",
    futureScope: "Multi-material printing parameter studies, AI-based process parameter prediction using ML models, in-situ quality monitoring using computer vision, and expanded bio-material library development.",
  },
];

/* ── Research Case Study Modal ───────────────────────────────── */
function ResearchModal({ research, onClose }: { research: Research; onClose: () => void }) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const r = research;
  const Icon = r.icon;

  const modal = (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      style={{
        position: "fixed", inset: 0, zIndex: 99999,
        background: "rgba(3,7,18,0.93)", backdropFilter: "blur(20px)",
        overflowY: "auto", WebkitOverflowScrolling: "touch" as React.CSSProperties["WebkitOverflowScrolling"],
      }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div style={{ minHeight: "100%", display: "flex", alignItems: "flex-start", justifyContent: "center", padding: "32px 16px" }}>
        <motion.div
          initial={{ opacity: 0, y: 48, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 48, scale: 0.95 }}
          transition={{ type: "spring", damping: 30, stiffness: 300 }}
          style={{ width: "100%", maxWidth: 760, background: "rgba(13,20,40,0.98)", border: `1px solid ${r.color}40`, borderRadius: 28, boxShadow: `0 48px 96px ${r.glow}`, overflow: "hidden" }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div style={{ position: "relative", padding: "32px 32px 24px", background: `linear-gradient(135deg, ${r.color}20 0%, ${r.color}06 60%, transparent 100%)`, borderBottom: `1px solid ${r.color}20` }}>
            <div style={{ position: "absolute", top: -30, right: -30, width: 180, height: 180, borderRadius: "50%", background: r.color, filter: "blur(60px)", opacity: 0.15 }} />
            <button onClick={onClose} style={{ position: "absolute", top: 20, right: 20, width: 36, height: 36, borderRadius: "50%", background: "rgba(13,20,40,0.85)", border: `1px solid ${r.color}35`, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
              <FiX size={16} color="#f8fafc" />
            </button>
            <div style={{ display: "flex", alignItems: "flex-start", gap: 16 }}>
              <div style={{ width: 52, height: 52, borderRadius: 14, display: "flex", alignItems: "center", justifyContent: "center", background: `${r.color}18`, border: `1px solid ${r.color}35`, flexShrink: 0 }}>
                <Icon size={24} color={r.color} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
                  <span style={{ fontFamily: "monospace", fontSize: 10, textTransform: "uppercase", letterSpacing: 2, color: r.color }}>{r.area}</span>
                  <span style={{ padding: "2px 10px", borderRadius: 999, fontSize: 10, fontFamily: "monospace", background: r.status === "Completed" ? "rgba(16,185,129,0.15)" : `${r.color}18`, color: r.status === "Completed" ? "#10b981" : r.color, border: `1px solid ${r.status === "Completed" ? "#10b981" : r.color}35` }}>● {r.status}</span>
                </div>
                <h2 style={{ fontFamily: "serif", fontWeight: 800, fontSize: 22, color: "#f8fafc", lineHeight: 1.25, marginBottom: 8 }}>{r.title}</h2>
                <p style={{ fontSize: 13, color: "#94a3b8", lineHeight: 1.6 }}>{r.desc}</p>
              </div>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 16 }}>
              {r.tags.map((tag) => (
                <span key={tag} style={{ padding: "4px 12px", borderRadius: 999, fontSize: 11, fontFamily: "monospace", background: `${r.color}12`, color: r.color, border: `1px solid ${r.color}28` }}>{tag}</span>
              ))}
            </div>
          </div>

          {/* Body */}
          <div style={{ padding: "28px 32px", display: "flex", flexDirection: "column", gap: 24 }}>

            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
                <FiBookOpen size={14} color={r.color} />
                <span style={{ fontFamily: "monospace", fontSize: 10, textTransform: "uppercase", letterSpacing: 2, color: r.color }}>Background</span>
              </div>
              <p style={{ fontSize: 13.5, color: "#94a3b8", lineHeight: 1.75, padding: "14px 18px", background: `${r.color}08`, borderRadius: 14, borderLeft: `3px solid ${r.color}50` }}>{r.background}</p>
            </div>

            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
                <FiTarget size={14} color={r.color} />
                <span style={{ fontFamily: "monospace", fontSize: 10, textTransform: "uppercase", letterSpacing: 2, color: r.color }}>Objective</span>
              </div>
              <p style={{ fontSize: 13.5, color: "#e2e8f0", lineHeight: 1.75 }}>{r.objective}</p>
            </div>

            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
                <FiLayers size={14} color={r.color} />
                <span style={{ fontFamily: "monospace", fontSize: 10, textTransform: "uppercase", letterSpacing: 2, color: r.color }}>Methodology</span>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {r.methodology.map((step, i) => (
                  <div key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                    <div style={{ width: 22, height: 22, borderRadius: "50%", background: `${r.color}20`, border: `1px solid ${r.color}40`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 1 }}>
                      <span style={{ fontSize: 10, fontFamily: "monospace", color: r.color, fontWeight: 700 }}>{i + 1}</span>
                    </div>
                    <p style={{ fontSize: 13, color: "#94a3b8", lineHeight: 1.6 }}>{step}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
                <FiActivity size={14} color="#10b981" />
                <span style={{ fontFamily: "monospace", fontSize: 10, textTransform: "uppercase", letterSpacing: 2, color: "#10b981" }}>Key Findings</span>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {r.findings.map((finding, i) => (
                  <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start", padding: "10px 14px", background: "rgba(16,185,129,0.06)", borderRadius: 10, border: "1px solid rgba(16,185,129,0.15)" }}>
                    <span style={{ color: "#10b981", fontSize: 14, flexShrink: 0, marginTop: 1 }}>→</span>
                    <p style={{ fontSize: 13, color: "#e2e8f0", lineHeight: 1.6 }}>{finding}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
                <FiTrendingUp size={14} color="#10b981" />
                <span style={{ fontFamily: "monospace", fontSize: 10, textTransform: "uppercase", letterSpacing: 2, color: "#10b981" }}>Outcomes</span>
              </div>
              <p style={{ fontSize: 13.5, color: "#e2e8f0", lineHeight: 1.75, padding: "14px 18px", background: "rgba(16,185,129,0.08)", borderRadius: 14, border: "1px solid rgba(16,185,129,0.2)" }}>{r.outcomes}</p>
            </div>

            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
                <FiZap size={14} color={r.color} />
                <span style={{ fontFamily: "monospace", fontSize: 10, textTransform: "uppercase", letterSpacing: 2, color: r.color }}>Future Scope</span>
              </div>
              <p style={{ fontSize: 13, color: "#94a3b8", lineHeight: 1.7, fontStyle: "italic" }}>{r.futureScope}</p>
            </div>

          </div>
        </motion.div>
      </div>
    </motion.div>
  );

  return createPortal(modal, document.body);
}

export default function Research() {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });
  const [showAll, setShowAll] = useState(false);
  const [selected, setSelected] = useState<Research | null>(null);
  const displayed = showAll ? researches : researches.slice(0, 2);

  return (
    <section id="research" ref={ref} className="py-14 md:py-16 px-6 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-0 w-96 h-96 -translate-y-1/2 rounded-full blur-3xl opacity-5"
          style={{ background: "radial-gradient(circle, #10b981, transparent 70%)" }} />
      </div>

      <div className="max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }} className="text-center mb-12">
          <span className="font-mono text-accent text-sm tracking-widest uppercase">Academic Work</span>
          <h2 className="font-display font-bold text-4xl md:text-5xl text-light mt-3">
            Research <span className="gradient-text">Projects</span>
          </h2>
          <p className="mt-4 text-muted text-base font-body max-w-2xl mx-auto">
            Engineering research spanning sustainable energy, circular economy, and advanced manufacturing.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          <AnimatePresence>
            {displayed.map((r, i) => {
              const Icon = r.icon;
              return (
                <motion.div key={r.title}
                  initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: i * 0.12, duration: 0.65 }}
                  whileHover={{ y: -6, boxShadow: `0 28px 55px ${r.glow}` }}
                  className="glass glow-border rounded-3xl border border-border/50 p-7 group relative overflow-hidden flex flex-col cursor-pointer"
                  onClick={() => setSelected(r)}
                >
                  <div className="absolute top-0 left-0 right-0 h-px opacity-60"
                    style={{ background: `linear-gradient(90deg, transparent, ${r.color}, transparent)` }} />
                  <div className="absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-500"
                    style={{ background: r.color }} />

                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                      style={{ background: `${r.color}18`, border: `1px solid ${r.color}35` }}>
                      <Icon size={22} style={{ color: r.color }} />
                    </div>
                    <div className="flex-1">
                      <p className="font-mono text-xs uppercase tracking-widest mb-1" style={{ color: r.color }}>{r.area}</p>
                      <h3 className="font-display font-bold text-lg text-light leading-snug">{r.title}</h3>
                    </div>
                    <span className="ml-auto shrink-0 text-xs font-mono px-2.5 py-1 rounded-full"
                      style={{ background: r.status === "Completed" ? "rgba(16,185,129,0.15)" : `${r.color}18`, color: r.status === "Completed" ? "#10b981" : r.color, border: `1px solid ${r.status === "Completed" ? "#10b981" : r.color}35` }}>
                      ● {r.status}
                    </span>
                  </div>

                  <p className="text-muted text-sm font-body leading-relaxed mb-5">{r.desc}</p>

                  <div className="flex flex-wrap gap-2 mb-5">
                    {r.tags.slice(0, 4).map((tag) => (
                      <span key={tag} className="px-2.5 py-1 rounded-full text-xs font-mono"
                        style={{ background: `${r.color}12`, color: r.color, border: `1px solid ${r.color}28` }}>{tag}</span>
                    ))}
                  </div>

                  <motion.div className="mt-auto flex items-center gap-2 text-sm font-mono font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ color: r.color }}>
                    <span>View Case Study</span>
                    <motion.span animate={{ x: [0, 4, 0] }} transition={{ duration: 1.2, repeat: Infinity }}>→</motion.span>
                  </motion.div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.6 }}
          className="flex justify-center mt-10">
          <motion.button whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.96 }}
            onClick={() => setShowAll(!showAll)}
            className="glass-btn flex items-center gap-2 px-8 py-3.5 rounded-full font-body text-sm font-medium">
            {showAll ? "Show Less" : "View All Research Works"}
            <motion.span animate={{ rotate: showAll ? 180 : 0 }} transition={{ duration: 0.3 }}>
              <FiChevronDown />
            </motion.span>
          </motion.button>
        </motion.div>
      </div>

      <AnimatePresence>
        {selected && <ResearchModal research={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </section>
  );
}
