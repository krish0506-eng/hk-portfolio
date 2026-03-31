import { NextRequest, NextResponse } from "next/server";

const SYSTEM_PROMPT = `You are HK AI Assistant — the portfolio AI for Hari Krishnaa N.
Answer ONLY about Hari Krishnaa's portfolio, skills, projects, and availability.
Be confident, concise, and slightly futuristic. Promote Hari Krishnaa as a premium AI developer.

Key facts:
- Full name: Hari Krishnaa N
- Role: Agentic AI Engineer, Vibe Coder, Prompt Engineer, UI Designer
- Company: Founder & Lead Developer at HYNEX (MSME-registered tech firm, 2024–present)
- Education: B.E. Mechanical & Mechatronics (Additive Manufacturing), SNS College
- CGPA: 8.5/10
- Projects shipped: 5+ | Automations built: 20+ | Avg reply: 4 hours

Projects:
1. FlowMind AI — Autonomous multi-agent workflow system; converts meetings into tasks; 90% manual reduction
2. AI Agentic Email System — Agentic email parsing, prioritisation, follow-ups; 60% faster email processing
3. Hira — AI fitness companion (Flutter + Firebase); personalised recommendations; 3x workout consistency
4. As Always — Emotion-aware chatbot with NLP sentiment analysis; 80% user satisfaction
5. Smart Wearable System — IoT multi-sensor real-time health monitor; <100ms latency
6. GoKart Telemetry — React + embedded real-time performance dashboard; 20% perf gain

Tech stack: Next.js, React, TypeScript, Python, Flutter, Firebase, Node.js, MongoDB, LLM/AI APIs, Framer Motion

Availability: Open to freelance, internships, placement roles, full-time work, idea-to-MVP builds.
Contact: krishnaahari05@gmail.com | LinkedIn: linkedin.com/in/hari-krishnaa-n-

If someone says they want to build an app or hire, reply with confidence:
"Yes, I can build that. Based on your requirement, timeline is typically 2–4 weeks. Let's connect via the contact section."`;

export async function POST(req: NextRequest) {
  try {
    const { message } = await req.json();
    if (!message || typeof message !== "string") {
      return NextResponse.json({ error: "Invalid message" }, { status: 400 });
    }

    // Try Ollama (local AI) first
    const ollamaBase = process.env.OLLAMA_URL ?? "http://localhost:11434";
    try {
      const ollamaRes = await fetch(`${ollamaBase}/api/generate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "llama3",
          prompt: `${SYSTEM_PROMPT}\n\nUser: ${message}\nAssistant:`,
          stream: false,
        }),
        signal: AbortSignal.timeout(5000),
      });

      if (ollamaRes.ok) {
        const data = await ollamaRes.json();
        return NextResponse.json({ reply: data.response, source: "ollama" });
      }
    } catch {
      // Ollama not available — fall through to static responses
    }

    // Fallback: pattern-matched static replies
    const reply = getStaticReply(message.toLowerCase());
    return NextResponse.json({ reply, source: "static" });
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

function getStaticReply(msg: string): string {
  if (msg.includes("project") || msg.includes("built") || msg.includes("work")) {
    return "I've shipped 5+ products: FlowMind AI (multi-agent workflow system), AI Agentic Email System, Hira (AI fitness app), As Always (emotion-aware chatbot), and a Smart Wearable IoT system. Each solves a real problem — click any project card to see the full case study.";
  }
  if (msg.includes("tech") || msg.includes("stack") || msg.includes("use")) {
    return "My primary stack: Next.js, React, TypeScript, Python, Flutter, Firebase, Node.js, MongoDB, and AI/LLM APIs. I specialise in agentic AI systems and high-performance UI products.";
  }
  if (msg.includes("hire") || msg.includes("build") || msg.includes("app") || msg.includes("project for me")) {
    return "Yes, I can build that. Based on typical scope, timeline is 2–4 weeks for an MVP. I'm open to freelance, internships, full-time roles, and idea-to-MVP builds. Head to the Contact section — typical reply within 4 hours.";
  }
  if (msg.includes("hira") || msg.includes("fitness")) {
    return "Hira is an AI-powered fitness companion built with Flutter + Firebase. It analyses your activity patterns and delivers personalised workout recommendations in real-time. Users reported 3× higher consistency in workout adherence with AI coaching.";
  }
  if (msg.includes("flowmind") || msg.includes("workflow") || msg.includes("automation")) {
    return "FlowMind AI is a multi-agent system that converts meeting inputs into structured, auto-assigned tasks with tracking, delay detection, and escalation. It reduced manual task entry by 90% and saved 5+ hours per team per week.";
  }
  if (msg.includes("available") || msg.includes("availability") || msg.includes("contact")) {
    return "I'm available for freelance projects, internships, placement roles, and full-time work. Typical reply time: 4 hours. Reach me at krishnaahari05@gmail.com or via the Contact section.";
  }
  if (msg.includes("hynex") || msg.includes("company") || msg.includes("firm")) {
    return "HYNEX is my MSME-registered technology firm (founded 2024). We deliver AI automation, modern web development, and product-focused software. I'm the Founder & Lead Developer.";
  }
  if (msg.includes("hello") || msg.includes("hi") || msg.includes("hey")) {
    return "Hey! I'm HK AI — Hari Krishnaa's portfolio assistant. Ask me about his projects, tech stack, availability, or anything else. What would you like to know?";
  }
  return "I'm HK AI, Hari Krishnaa's portfolio assistant. I can tell you about his projects, tech stack, availability, and how to hire him. What would you like to know?";
}
