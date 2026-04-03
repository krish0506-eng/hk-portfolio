type ProjectCard = {
  title: string;
  aliases: string[];
  summary: string;
  impact: string;
  tags: string[];
};

type ResearchCard = {
  title: string;
  aliases: string[];
  summary: string;
  outcome: string;
};

const profile = {
  name: "Hari Krishnaa N",
  role: ["Agentic AI Engineer", "Vibe Coder", "Prompt Engineer", "UI/UX Designer"],
  education:
    "B.E. Mechanical Engineering & Mechatronics with specialization in Additive Manufacturing at SNS College of Engineering, Coimbatore.",
  summary:
    "Hari builds AI-powered products, modern web experiences, and engineering projects that connect software, automation, and hardware.",
  founderNote: "Founder and Lead Developer at HYNEX, an MSME-registered tech firm started in 2024.",
};

const projects: ProjectCard[] = [
  {
    title: "FlowMind AI",
    aliases: ["flowmind", "flowmind ai", "meeting notes", "task automation"],
    summary:
      "A multi-agent workflow system that turns meeting notes into structured tasks, handles assignment, delay detection, reminders, and escalation.",
    impact: "It cut manual task entry by 90% and saved 5+ hours per team each week.",
    tags: ["Multi-Agent AI", "Automation", "LangChain", "Python"],
  },
  {
    title: "Zero Barrier",
    aliases: ["zero barrier", "job platform", "blue collar", "informal workers"],
    summary:
      "An AI-powered multilingual job platform for low-literacy and blue-collar workers, with voice navigation, Aadhaar verification, and location-based discovery.",
    impact: "It is designed to remove digital friction for a 300M+ worker audience in India.",
    tags: ["React Native", "Voice UI", "OCR", "Multilingual UX"],
  },
  {
    title: "Hira v2",
    aliases: ["hira v2", "gym companion", "athletes", "progressive overload"],
    summary:
      "An advanced AI gym companion with progressive overload planning, form tracking, nutrition logging, and performance analytics.",
    impact: "Early testers reported consistent PR improvements within 6-week training blocks.",
    tags: ["Flutter", "Firebase", "AI", "Fitness"],
  },
  {
    title: "Mind Mate",
    aliases: ["mind mate", "mental wellness", "mood based", "mind companion"],
    summary:
      "A mood-based wellness app that combines AI-curated music therapy, mindfulness games, and an adaptive companion that responds to emotional state.",
    impact: "Companion engagement was 3x higher than static wellness apps.",
    tags: ["Flutter", "Firebase", "AI", "Mental Health"],
  },
  {
    title: "As Always",
    aliases: ["as always", "emotion aware chatbot", "sentiment analysis"],
    summary:
      "An emotion-aware chatbot that adjusts tone, depth, and empathy in real time using sentiment analysis.",
    impact: "It reached 80% user satisfaction on emotional response quality.",
    tags: ["NLP", "Sentiment Analysis", "Flutter", "Firebase"],
  },
  {
    title: "Lunar Hazard AI",
    aliases: ["lunar hazard ai", "lunar rover", "hazard detection"],
    summary:
      "A computer vision system for detecting lunar surface hazards like craters, boulders, and terrain anomalies.",
    impact: "It demonstrates viable AI-assisted hazard mapping for rover navigation and landing zone selection.",
    tags: ["Computer Vision", "Deep Learning", "Python", "OpenCV"],
  },
  {
    title: "Smart Wearable System",
    aliases: ["smart wearable", "health monitor", "wearable system"],
    summary:
      "An IoT multi-sensor health monitor that tracks 10+ health metrics in real time.",
    impact: "It delivers under 100ms latency for live health monitoring.",
    tags: ["IoT", "Embedded Systems", "Sensors", "Real-Time Systems"],
  },
  {
    title: "GoKart Telemetry",
    aliases: ["gokart", "telemetry", "performance dashboard"],
    summary:
      "A React and embedded telemetry dashboard for live kart performance analysis and tuning.",
    impact: "It enabled a 20% performance gain through live data-driven tuning.",
    tags: ["React", "Embedded Systems", "Telemetry", "Dashboard"],
  },
  {
    title: "Dynamo EV Prototype",
    aliases: ["dynamo ev", "ev prototype", "hybrid vehicle"],
    summary:
      "A hybrid dynamo + battery electric vehicle prototype with regenerative energy recovery.",
    impact: "It extended range by 50%.",
    tags: ["EV", "Mechatronics", "Energy Recovery", "Hardware"],
  },
];

const research: ResearchCard[] = [
  {
    title: "Waste to Watt",
    aliases: ["waste to watt", "gasification", "pyrolysis", "waste to power"],
    summary:
      "Power generation from municipal solid waste via gasification and pyrolysis.",
    outcome:
      "The research shows pilot-scale waste-to-power conversion is technically viable with a projected payback period of 4-6 years.",
  },
  {
    title: "Waste to Value (Fuel)",
    aliases: ["waste to value", "fuel generation", "plastic pyrolysis", "synthetic fuel"],
    summary:
      "Plastic waste pyrolysis for synthetic fuel production and emission analysis.",
    outcome:
      "The derived pyrolysis oil meets key quality benchmarks for diesel blending and supports a circular economy path for non-recyclable plastic.",
  },
  {
    title: "Waste to Value (3D Filament)",
    aliases: ["3d filament", "filament generation", "recycled filament", "additive material"],
    summary:
      "Closed-loop plastic recycling into FDM 3D printing filament.",
    outcome:
      "The process reduces filament cost dramatically while preserving acceptable print quality for prototyping and educational use.",
  },
  {
    title: "Additive Manufacturing Research",
    aliases: ["additive manufacturing", "fdm", "sla", "sls", "topology optimisation"],
    summary:
      "Ongoing research across FDM, SLA, and SLS with process optimisation and bio-based material studies.",
    outcome:
      "It has established parameter guidelines for educational and small-scale industrial settings.",
  },
];

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

const availability =
  "Hari is open to freelance projects, internships, placement roles, full-time work, and idea-to-MVP builds.";

const contact =
  "Reach Hari at krishnaahari05@gmail.com, LinkedIn at linkedin.com/in/hari-krishnaa-n-, GitHub at github.com/krishnaa-0506, or WhatsApp at +91 6379726858.";

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

function scoreAliases(message: string, aliases: string[]): number {
  const messageNormalised = normalise(message);
  const tokens = new Set(tokenize(message));
  let score = 0;

  for (const alias of aliases) {
    const aliasNormalised = normalise(alias);
    if (!aliasNormalised) continue;
    if (messageNormalised.includes(aliasNormalised)) score += 5;

    for (const token of tokenize(aliasNormalised)) {
      if (tokens.has(token)) score += 1;
    }
  }

  return score;
}

function joinSentences(sentences: string[]): string {
  return sentences.filter(Boolean).join(" ").replace(/\s+/g, " ").trim();
}

function formatList(items: string[], joiner = ", ", finalJoiner = " and "): string {
  if (items.length === 0) return "";
  if (items.length === 1) return items[0];
  if (items.length === 2) return `${items[0]}${finalJoiner}${items[1]}`;
  return `${items.slice(0, -1).join(joiner)}${finalJoiner}${items[items.length - 1]}`;
}

function getTopProjects(count = 3): ProjectCard[] {
  return projects.slice(0, count);
}

function replyForProjects(message: string): string {
  const exact = projects.find((project) => scoreAliases(message, [project.title, ...project.aliases]) >= 4);
  if (exact) {
    return joinSentences([
      `${exact.title} is ${exact.summary}`,
      exact.impact,
      `Relevant stack: ${formatList(exact.tags.slice(0, 4))}.`,
    ]);
  }

  const featured = getTopProjects(3)
    .map((project) => `${project.title}: ${project.summary}`)
    .join(" ");

  return joinSentences([
    `Hari's strongest builds include ${featured}`,
    `If you want a specific project, ask for FlowMind AI, Zero Barrier, Mind Mate, Hira, As Always, Lunar Hazard AI, Smart Wearable System, GoKart Telemetry, or Dynamo EV Prototype.`,
  ]);
}

function replyForResearch(message: string): string {
  const exact = research.find((item) => scoreAliases(message, [item.title, ...item.aliases]) >= 4);
  if (exact) {
    return joinSentences([`${exact.title} focuses on ${exact.summary}`, exact.outcome]);
  }

  return joinSentences([
    `Hari's research spans ${research.map((item) => item.title).join(", ")}.`,
    `It covers waste-to-energy, plastic pyrolysis, recycled 3D filament, and additive manufacturing optimisation.`,
  ]);
}

function replyForSkills(): string {
  const groups = skillsByGroup.map((group) => `${group.group}: ${group.keywords.join(", ")}`);
  return joinSentences([
    `Hari works across ${groups.join(". ")}.`,
    `His stack blends frontend, AI workflows, and hardware systems for real product builds.`,
  ]);
}

function replyForAbout(): string {
  return joinSentences([
    `${profile.name} is a ${formatList(profile.role)} building AI-powered products, modern web experiences, and engineering systems.`,
    profile.founderNote,
    profile.education,
  ]);
}

function replyForAvailability(): string {
  return availability;
}

function replyForContact(): string {
  return contact;
}

function replyForExperience(): string {
  return joinSentences([
    profile.founderNote,
    "He also builds projects that connect AI, software, automation, and hardware into practical deployments.",
  ]);
}

function replyForGreeting(): string {
  return "I can answer questions about Hari's portfolio, projects, research, skills, availability, and contact details.";
}

export function generatePortfolioReply(message: string): string {
  const normalised = normalise(message);
  const tokens = tokenize(message);
  const combined = `${normalised} ${tokens.join(" ")}`;

  if (!combined.trim()) return replyForGreeting();

  const wantsContact = /contact|email|reach|whatsapp|linkedin|github/.test(combined);
  const wantsAvailability = /available|availability|hire|freelance|internship|placement|full[- ]time|mvp/.test(combined);
  const wantsResearch = /research|paper|papers|study|studies|waste to watt|waste to value|additive manufacturing/.test(combined);
  const wantsSkills = /skill|stack|tech|tools|language|framework|what can he build/.test(combined);
  const wantsProjects = /project|projects|built|build|portfolio|work/.test(combined);
  const wantsAbout = /about|who is|who's|introduce|profile|background|journey|education|studying/.test(combined);
  const wantsExperience = /experience|founder|company|hynex|lead developer/.test(combined);

  if (wantsContact) return replyForContact();
  if (wantsAvailability) return replyForAvailability();
  if (wantsResearch) return replyForResearch(message);
  if (wantsSkills) return replyForSkills();
  if (wantsProjects) return replyForProjects(message);
  if (wantsAbout) return replyForAbout();
  if (wantsExperience) return replyForExperience();

  const rankedProject = projects
    .map((project) => ({
      project,
      score: scoreAliases(message, [project.title, ...project.aliases]),
    }))
    .sort((left, right) => right.score - left.score)[0];

  const rankedResearch = research
    .map((item) => ({
      item,
      score: scoreAliases(message, [item.title, ...item.aliases]),
    }))
    .sort((left, right) => right.score - left.score)[0];

  const rankedSpecialist = [
    {
      score: scoreAliases(message, ["skills", "stack", "framework", "language"]),
      text: replyForSkills(),
    },
    {
      score: scoreAliases(message, ["research", "paper", "study"]),
      text: replyForResearch(message),
    },
    {
      score: rankedProject?.score ?? 0,
      text: rankedProject ? `${rankedProject.project.title} is ${rankedProject.project.summary} ${rankedProject.project.impact}` : "",
    },
    {
      score: rankedResearch?.score ?? 0,
      text: rankedResearch ? `${rankedResearch.item.title} focuses on ${rankedResearch.item.summary} ${rankedResearch.item.outcome}` : "",
    },
  ].sort((left, right) => right.score - left.score)[0];

  if (rankedSpecialist?.score > 0 && rankedSpecialist.text) {
    return rankedSpecialist.text;
  }

  return joinSentences([
    `${profile.name} builds AI products, web apps, and engineering systems across ${formatList(profile.role.slice(0, 3))}.`,
    `Ask about FlowMind AI, Zero Barrier, Mind Mate, Hira, research, skills, or availability and I will answer from the portfolio data.`,
  ]);
}
