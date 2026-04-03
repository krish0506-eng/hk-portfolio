import { NextRequest, NextResponse } from "next/server";
import { generatePortfolioReply } from "./portfolio-data";

export const maxDuration = 5;

export async function POST(req: NextRequest) {
  try {
    const { message } = await req.json();
    if (!message || typeof message !== "string") {
      return NextResponse.json({ error: "Invalid message" }, { status: 400 });
    }

    const reply = generatePortfolioReply(message);

    return NextResponse.json({
      reply,
      source: "portfolio-local",
    });
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
