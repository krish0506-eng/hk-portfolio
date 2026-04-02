import { promises as fs } from "node:fs";
import path from "node:path";
import { NextResponse } from "next/server";

export async function GET() {
  const publicDir = path.join(process.cwd(), "public");
  const candidates = ["HARI KRISHNAA.pdf", "resume.pdf"];

  try {
    let selected: { name: string; data: Buffer } | null = null;

    for (const fileName of candidates) {
      const filePath = path.join(publicDir, fileName);
      try {
        const data = await fs.readFile(filePath);
        selected = { name: fileName, data };
        break;
      } catch {
        // Try next candidate.
      }
    }

    if (!selected) {
      return NextResponse.json({ error: "Resume file not found" }, { status: 404 });
    }

    return new NextResponse(selected.data, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": 'attachment; filename="Hari_Krishnaa_Resume.pdf"',
        "Cache-Control": "public, max-age=3600",
      },
    });
  } catch {
    return NextResponse.json({ error: "Unable to download resume" }, { status: 500 });
  }
}
