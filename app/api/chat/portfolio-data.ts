type KnowledgeEntry = {
  title: string;
  aliases: string[];
  answer: string;
  priority?: number;
};

const profile = {
  name: "Hari Krishnaa N",
  role: ["Agentic AI Engineer", "Vibe Coder", "Prompt Engineer", "UI/UX Designer"],
  education:
    "B.E. Mechanical Engineering & Mechatronics with specialization in Additive Manufacturing at SNS College of Engineering, Coimbatore.",
  summary:
    "Hari builds AI-powered products, modern web experiences, and engineering systems that connect software, automation, and hardware.",
  founderNote: "Founder and Lead Developer at HYNEX, an MSME-registered tech firm started in 2024.",
};

const availability =
  "Hari is open to freelance projects, internships, placement roles, full-time work, and idea-to-MVP builds.";

const contact =
  "Reach Hari at krishnaahari05@gmail.com, LinkedIn at linkedin.com/in/hari-krishnaa-n-, GitHub at github.com/krishnaa-0506, or WhatsApp at +91 6379726858.";

const skillsByGroup = [
  {
    group: "Software and AI",
    keywords: ["Next.js", "React", "TypeScript", "Python", "Node.js", "Flutter", "MongoDB", "Firebase"],
  },
  {
    group: "AI Workflow",
    keywords: ["LLMs", "LangChain", "RAG Systems", "Agentic AI", "Prompt Engineering", "Generative AI"],
  },
  {
    group: "Engineering",
    keywords: ["Additive Manufacturing", "3D Printing", "Embedded Systems", "IoT", "Mechatronics"],
  },
];

const projects = [
  {
    title: "FlowMind AI",
    aliases: ["flowmind", "flowmind ai", "meeting notes", "task automation"],
    answer:
      "FlowMind AI is a multi-agent workflow system that turns meeting notes into structured tasks, handles assignment, delay detection, reminders, and escalation. It cut manual task entry by 90% and saved 5+ hours per team each week.",
  },
  {
    title: "Zero Barrier",
    aliases: ["zero barrier", "job platform", "blue collar", "informal workers"],
    answer:
      "Zero Barrier is an AI-powered multilingual job platform for low-literacy and blue-collar workers, with voice navigation, Aadhaar verification, and location-based discovery. It is designed to remove digital friction for a 300M+ worker audience in India.",
  },
  {
    title: "Hira v2",
    aliases: ["hira v2", "gym companion", "athletes", "progressive overload"],
    answer:
      "Hira v2 is an advanced AI gym companion with progressive overload planning, form tracking, nutrition logging, and performance analytics. Early testers reported consistent PR improvements within 6-week training blocks.",
  },
  {
    title: "Mind Mate",
    aliases: ["mind mate", "mental wellness", "mood based", "mind companion"],
    answer:
      "Mind Mate is a mood-based wellness app that combines AI-curated music therapy, mindfulness games, and an adaptive companion that responds to emotional state. Companion engagement was 3x higher than static wellness apps.",
  },
  {
    title: "As Always",
    aliases: ["as always", "emotion aware chatbot", "sentiment analysis"],
    answer:
      "As Always is an emotion-aware chatbot that adjusts tone, depth, and empathy in real time using sentiment analysis. It reached 80% user satisfaction on emotional response quality.",
  },
  {
    title: "Lunar Hazard AI",
    aliases: ["lunar hazard ai", "lunar rover", "hazard detection"],
    answer:
      "Lunar Hazard AI is a computer vision system for detecting lunar surface hazards like craters, boulders, and terrain anomalies. It demonstrates viable AI-assisted hazard mapping for rover navigation and landing zone selection.",
  },
  {
    title: "Smart Wearable System",
    aliases: ["smart wearable", "health monitor", "wearable system"],
    answer:
      "Smart Wearable System is an IoT multi-sensor health monitor that tracks 10+ health metrics in real time. It delivers under 100ms latency for live health monitoring.",
  },
  {
    title: "GoKart Telemetry",
    aliases: ["gokart", "telemetry", "performance dashboard"],
    answer:
      "GoKart Telemetry is a React and embedded telemetry dashboard for live kart performance analysis and tuning. It enabled a 20% performance gain through live data-driven tuning.",
  },
  {
    title: "Dynamo EV Prototype",
    aliases: ["dynamo ev", "ev prototype", "hybrid vehicle"],
    answer:
      "Dynamo EV Prototype is a hybrid dynamo plus battery electric vehicle prototype with regenerative energy recovery. It extended range by 50%.",
  },
];

const research = [
  {
    title: "Waste to Watt",
    aliases: ["waste to watt", "gasification", "pyrolysis", "waste to power"],
    answer:
      "Waste to Watt explores power generation from municipal solid waste via gasification and pyrolysis. The research shows pilot-scale waste-to-power conversion is technically viable with a projected payback period of 4-6 years.",
  },
  {
    title: "Waste to Value (Fuel)",
    aliases: ["waste to value", "fuel generation", "plastic pyrolysis", "synthetic fuel"],
    answer:
      "Waste to Value (Fuel) studies plastic waste pyrolysis for synthetic fuel production and emission analysis. The derived pyrolysis oil meets key quality benchmarks for diesel blending and supports a circular economy path for non-recyclable plastic.",
  },
  {
    title: "Waste to Value (3D Filament)",
    aliases: ["3d filament", "filament generation", "recycled filament", "additive material"],
    answer:
      "Waste to Value (3D Filament) focuses on closed-loop plastic recycling into FDM 3D printing filament. The process reduces filament cost dramatically while preserving acceptable print quality for prototyping and educational use.",
  },
  {
    title: "Additive Manufacturing Research",
    aliases: ["additive manufacturing", "fdm", "sla", "sls", "topology optimisation"],
    answer:
      "Additive Manufacturing Research covers FDM, SLA, and SLS process optimisation and bio-based material studies. It has established parameter guidelines for educational and small-scale industrial settings.",
  },
];

const experience = [
  {
    title: "HYNEX",
    aliases: ["hynex", "founder", "lead developer", "company"],
    answer:
      "Hari is the Founder and Lead Developer at HYNEX, an MSME-registered technology firm started in 2024. He has delivered 5+ client projects across AI automation and modern web development.",
  },
  {
    title: "Manufacturing Intern",
    aliases: ["manufacturing intern", "sree ram industries", "production", "factory"],
    answer:
      "As a Manufacturing Intern at Sree Ram Industries, Hari worked in production and manufacturing workflows, quality inspection, process monitoring, and factory operations.",
  },
  {
    title: "Web Development Intern",
    aliases: ["web development intern", "nullclass", "react", "node", "mongodb"],
    answer:
      "At NullClass, he built web applications using React.js, Node.js, and MongoDB, and worked with APIs and development workflows.",
  },
  {
    title: "Generative AI Training",
    aliases: ["internshala", "generative ai training", "rag", "prompt engineering"],
    answer:
      "His Generative AI training covered prompt engineering, RAG systems, and practical LLM application patterns.",
  },
  {
    title: "Electronics Intern",
    aliases: ["electronics intern", "salzer", "pcb", "industrial electronics"],
    answer:
      "At Salzer Industrial Controls, he gained hands-on exposure to PCB testing, circuit wiring, quality inspection, and industrial electronics.",
  },
];

const knowledgeEntries: KnowledgeEntry[] = [
  {
    title: "About Hari",
    aliases: ["about him", "who is he", "who is hari", "tell me about him", "tell me something about him", "who's he", "profile", "background", "journey"],
    answer: `${profile.name} is a ${profile.role.slice(0, 3).join(", ")} and ${profile.role[3]} building AI-powered products, modern web experiences, and engineering systems. ${profile.founderNote} ${profile.education}`,
    priority: 6,
  },
  {
    title: "Availability",
    aliases: ["available", "availability", "freelance", "internship", "placement", "full time", "full-time", "mvp", "job"],
    answer: availability,
    priority: 8,
  },
  {
    title: "Contact",
    aliases: ["contact", "email", "reach", "whatsapp", "linkedin", "github", "how to contact"],
    answer: contact,
    priority: 8,
  },
  {
    title: "Skills",
    aliases: ["skill", "skills", "stack", "tech stack", "technology", "tools", "framework", "language", "what can he build"],
    answer: `Hari works across ${skillsByGroup.map((group) => `${group.group}: ${group.keywords.join(", ")}`).join(". ")}. His stack blends frontend, AI workflows, and hardware systems for real product builds.`,
    priority: 7,
  },
  {
    title: "Projects Overview",
    aliases: ["project", "projects", "built", "builds", "portfolio", "what projects has he built", "what has he built"],
    answer:
      "Hari's strongest builds include FlowMind AI, Zero Barrier, Hira v2, Mind Mate, As Always, Lunar Hazard AI, Smart Wearable System, GoKart Telemetry, and Dynamo EV Prototype. Ask for any project name and I’ll give you the short summary.",
    priority: 6,
  },
  {
    title: "Research Overview",
    aliases: ["research", "paper", "papers", "study", "studies", "thesis", "waste to watt", "waste to value", "additive manufacturing"],
    answer:
      "Hari's research spans Waste to Watt, Waste to Value (Fuel), Waste to Value (3D Filament), and Additive Manufacturing Research. It covers waste-to-energy, plastic pyrolysis, recycled 3D filament, and additive manufacturing optimisation.",
    priority: 7,
  },
  {
    title: "Experience Overview",
    aliases: ["experience", "work experience", "internships", "hynex", "company", "lead developer"],
    answer:
      "Hari has experience founding HYNEX and working across manufacturing, web development, generative AI training, and electronics internships. He combines AI, web, and hardware skills with real project ownership.",
    priority: 6,
  },
  ...projects.map((project) => ({
    title: project.title,
    aliases: project.aliases,
    answer: project.answer,
    priority: 5,
  })),
  ...research.map((item) => ({
    title: item.title,
    aliases: item.aliases,
    answer: item.answer,
    priority: 5,
  })),
  ...experience.map((item) => ({
    title: item.title,
    aliases: item.aliases,
    answer: item.answer,
    priority: 4,
  })),
];

const stopWords = new Set([
  "a",
  "an",
  "and",
  "are",
  "ask",
  "about",
  "for",
  "from",
  "has",
  "have",
  "he",
  "his",
  "how",
  "is",
  "it",
  "me",
  "my",
  "of",
  "on",
  "please",
  "tell",
  "the",
  "their",
  "them",
  "this",
  "to",
  "what",
  "when",
  "where",
  "who",
  "why",
  "with",
  "you",
  "your",
]);

function normalise(text: string): string {
  return text.toLowerCase().replace(/[^a-z0-9+.#\s-]/g, " ").replace(/\s+/g, " ").trim();
}

function tokenize(text: string): string[] {
  return normalise(text)
    .split(" ")
    .map((word) => word.trim())
    .filter((word) => word.length > 1 && !stopWords.has(word));
}

function formatList(items: string[], joiner = ", ", finalJoiner = " and "): string {
  if (items.length === 0) return "";
  if (items.length === 1) return items[0];
  if (items.length === 2) return `${items[0]}${finalJoiner}${items[1]}`;
  return `${items.slice(0, -1).join(joiner)}${finalJoiner}${items[items.length - 1]}`;
}

function joinSentences(sentences: string[]): string {
  return sentences.filter(Boolean).join(" ").replace(/\s+/g, " ").trim();
}

function scoreEntry(message: string, entry: KnowledgeEntry): { score: number; hits: number } {
  const messageNormalised = normalise(message);
  const messageTokens = new Set(tokenize(message));
  let score = entry.priority ?? 0;
  let hits = 0;

  for (const alias of entry.aliases) {
    const aliasNormalised = normalise(alias);
    if (!aliasNormalised) continue;
    if (messageNormalised.includes(aliasNormalised)) {
      score += 6;
      hits += 1;
    }

    for (const token of tokenize(aliasNormalised)) {
      if (messageTokens.has(token)) {
        score += 1;
        hits += 1;
      }
    }
  }

  if (messageNormalised.includes(normalise(entry.title))) {
    score += 4;
    hits += 1;
  }

  return { score, hits };
}

function topAnswer(message: string): KnowledgeEntry | null {
  const ranked = [...knowledgeEntries]
    .map((entry) => ({ entry, ...scoreEntry(message, entry) }))
    .sort((left, right) => right.score - left.score);

  const best = ranked[0];
  if (!best || best.score < 3 || best.hits === 0) return null;
  return best.entry;
}

function buildOverviewReply(): string {
  return joinSentences([
    `${profile.name} builds AI products, web apps, and engineering systems across ${formatList(profile.role.slice(0, 3))}.`,
    `Ask about FlowMind AI, Zero Barrier, Mind Mate, Hira v2, research, skills, experience, availability, or contact, and I will answer from the portfolio data.`,
  ]);
}

export function generatePortfolioReply(message: string): string {
  const cleaned = normalise(message);
  if (!cleaned) {
    return `Ask me about ${profile.name}, his projects, research, skills, experience, availability, or contact details.`;
  }

  if (/college|graduat|graduate|pass out|when.*end|course end/.test(cleaned)) {
    return "Hari is currently pursuing B.E. Mechanical Engineering & Mechatronics with specialization in Additive Manufacturing at SNS College of Engineering, Coimbatore. The portfolio does not list an exact graduation date, so the safest answer is that he is still in undergraduate studies and building projects alongside college.";
  }

  if (/ready to work|when.*ready to work|hire him|join work|start work|work readiness/.test(cleaned)) {
    return `${profile.name} is ready to work now. ${availability}`;
  }

  const exact = topAnswer(message);
  if (exact) {
    return exact.answer;
  }

  if (/project|projects|build|built|portfolio/.test(cleaned)) {
    return knowledgeEntries.find((entry) => entry.title === "Projects Overview")?.answer ?? buildOverviewReply();
  }

  if (/research|paper|study|waste to watt|waste to value|additive manufacturing/.test(cleaned)) {
    return knowledgeEntries.find((entry) => entry.title === "Research Overview")?.answer ?? buildOverviewReply();
  }

  if (/skill|stack|tech|framework|language/.test(cleaned)) {
    return knowledgeEntries.find((entry) => entry.title === "Skills")?.answer ?? buildOverviewReply();
  }

  if (/experience|work experience|internship|company|hynex/.test(cleaned)) {
    return knowledgeEntries.find((entry) => entry.title === "Experience Overview")?.answer ?? buildOverviewReply();
  }

  return buildOverviewReply();
}
