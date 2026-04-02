import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "sonner";
import { ThemeProvider } from "@/components/ThemeProvider";

const SITE_URL = "https://harikrishnaa.dev";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Hari Krishnaa N | Agentic AI Engineer & Vibe Coder",
    template: "%s | Hari Krishnaa N",
  },
  description:
    "Hari Krishnaa N — Agentic AI Engineer, Vibe Coder, Prompt Engineer & Founder of HYNEX. I build AI-powered products, workflow automations, and modern web apps that ship fast.",
  keywords: [
    "Hari Krishnaa",
    "Agentic AI Engineer",
    "Vibe Coder",
    "Prompt Engineering",
    "Next.js Developer",
    "LLM Developer",
    "HYNEX",
    "AI Developer Portfolio",
    "Mechatronics Engineer",
    "Additive Manufacturing",
    "Mechanical Engineering",
    "Flutter Developer",
    "AI Automation",
    "Freelance AI Developer",
    "SNS College",
    "Coimbatore",
  ],
  authors: [{ name: "Hari Krishnaa N", url: SITE_URL }],
  creator: "Hari Krishnaa N",
  publisher: "HYNEX",
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    title: "Hari Krishnaa N | Agentic AI Engineer & Vibe Coder",
    description:
      "Agentic AI Engineer & Vibe Designer. Building AI-powered products, automations, and modern web experiences that ship.",
    url: SITE_URL,
    siteName: "Hari Krishnaa Portfolio",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Hari Krishnaa N — Agentic AI Engineer & Vibe Coder",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Hari Krishnaa N | Agentic AI Engineer & Vibe Coder",
    description: "Agentic AI Engineer & Vibe Designer building AI-powered products and automations.",
    creator: "@harikrishnaa",
    images: ["/opengraph-image"],
  },
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
  category: "technology",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth dark">
      <body className="noise">
        <a href="#main-content" className="skip-link">Skip to main content</a>
        <ThemeProvider>
          {children}
          <Toaster position="bottom-right" theme="dark" />
        </ThemeProvider>
      </body>
    </html>
  );
}
