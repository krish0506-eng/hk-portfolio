import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "sonner";
import { ThemeProvider } from "@/components/ThemeProvider";

export const metadata: Metadata = {
  title: "Hari Krishnaa | AI Developer Portfolio",
  description:
    "Hari Krishnaa N — Agentic AI Engineer, Vibe Coder & Founder of HYNEX. I build AI-powered products, workflow automations, and modern web apps that ship.",
  keywords: ["Agentic AI Engineer", "Vibe Coder", "Prompt Engineering", "Next.js", "LLM", "HYNEX", "AI Developer Portfolio"],
  openGraph: {
    title: "Hari Krishnaa | AI Developer Portfolio",
    description:
      "Agentic AI Engineer & Vibe Designer. Building AI-powered products, automations, and modern web experiences.",
    url: "https://harikrishnaa.dev",
    siteName: "Hari Krishnaa Portfolio",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hari Krishnaa | AI Developer Portfolio",
    description: "Agentic AI Engineer & Vibe Designer building AI-powered products and automations.",
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth dark">
      <body className="noise">
        <ThemeProvider>
          {children}
          <Toaster position="bottom-right" theme="dark" />
        </ThemeProvider>
      </body>
    </html>
  );
}
