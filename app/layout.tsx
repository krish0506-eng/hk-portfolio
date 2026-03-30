import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "Hari Krishnaa N — Agentic AI Engineer & Vibe Designer",
  description:
    "Portfolio of Hari Krishnaa N — Freelance Agentic AI Engineer, Vibe Coder, Prompt Engineer, and Founder of HYNEX.",
  keywords: ["Agentic AI Engineer", "Vibe Coder", "Prompt Engineering", "Next.js", "LLM", "HYNEX"],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="noise">
        {children}
        <Toaster position="bottom-right" theme="dark" />
      </body>
    </html>
  );
}
