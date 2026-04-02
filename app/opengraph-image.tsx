import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Hari Krishnaa N — Agentic AI Engineer & Vibe Coder";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          background: "linear-gradient(135deg, #050816 0%, #0a1022 60%, #050816 100%)",
          padding: "72px 80px",
          fontFamily: "serif",
          position: "relative",
        }}
      >
        {/* Accent glow top-right */}
        <div
          style={{
            position: "absolute",
            top: -80,
            right: -80,
            width: 400,
            height: 400,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(139,92,246,0.35) 0%, transparent 70%)",
          }}
        />
        {/* Cyan glow bottom-left */}
        <div
          style={{
            position: "absolute",
            bottom: -60,
            left: -60,
            width: 300,
            height: 300,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(6,182,212,0.25) 0%, transparent 70%)",
          }}
        />

        {/* HK badge */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 80,
            height: 80,
            borderRadius: 20,
            background: "linear-gradient(135deg, rgba(139,92,246,0.3), rgba(6,182,212,0.2))",
            border: "1px solid rgba(139,92,246,0.5)",
            marginBottom: 32,
          }}
        >
          <span style={{ fontSize: 32, fontWeight: 700, color: "#a78bfa" }}>HK</span>
        </div>

        {/* Name */}
        <div
          style={{
            fontSize: 64,
            fontWeight: 700,
            color: "#f8fafc",
            lineHeight: 1.1,
            marginBottom: 16,
          }}
        >
          Hari Krishnaa N
        </div>

        {/* Role */}
        <div
          style={{
            fontSize: 28,
            color: "#8b5cf6",
            fontFamily: "monospace",
            marginBottom: 32,
            letterSpacing: "0.05em",
          }}
        >
          Agentic AI Engineer · Vibe Coder · Founder @ HYNEX
        </div>

        {/* Tags row */}
        <div style={{ display: "flex", gap: 12 }}>
          {["Next.js", "AI Systems", "Mechatronics", "Additive Mfg"].map((tag) => (
            <div
              key={tag}
              style={{
                padding: "8px 18px",
                borderRadius: 999,
                background: "rgba(139,92,246,0.12)",
                border: "1px solid rgba(139,92,246,0.35)",
                color: "#a78bfa",
                fontSize: 18,
                fontFamily: "monospace",
              }}
            >
              {tag}
            </div>
          ))}
        </div>

        {/* URL bottom right */}
        <div
          style={{
            position: "absolute",
            bottom: 48,
            right: 80,
            fontSize: 20,
            color: "rgba(148,163,184,0.6)",
            fontFamily: "monospace",
          }}
        >
          harikrishnaa.dev
        </div>
      </div>
    ),
    { ...size }
  );
}
