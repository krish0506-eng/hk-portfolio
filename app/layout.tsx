import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "sonner";
import { ThemeProvider } from "@/components/ThemeProvider";
import { cormorant, jost, spaceMono } from "@/lib/fonts";

const SITE_URL = "https://hk-portfolio-1-pi.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Hari Krishnaa N | Embedded Systems Builder & AI Engineer",
    template: "%s | Hari Krishnaa N",
  },
  description:
    "Hari Krishnaa N — Embedded systems builder, IoT maker, firmware developer, and AI engineer. Arduino, ESP32, PCB design, sensors, generative AI, and full-stack development. Founder of HYNEX. Based in Coimbatore.",
  keywords: [
    "Hari Krishnaa",
    "Embedded Systems Engineer",
    "Arduino Developer",
    "ESP32 Projects",
    "PCB Design",
    "IoT Builder",
    "Hardware Maker",
    "Firmware Developer",
    "CircuitDigest",
    "Semicon Media",
    "Electronics Intern",
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
    "Siemens PLC",
    "Ladder Logic",
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
    title: "Hari Krishnaa N | Embedded Systems Builder & AI Engineer",
    description:
      "Hardware maker and AI engineer building real-world systems — from ESP32 firmware and PCB design to generative AI and full-stack products. Founder of HYNEX.",
    url: SITE_URL,
    siteName: "Hari Krishnaa Portfolio",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Hari Krishnaa N — Embedded Systems Builder & AI Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Hari Krishnaa N | Embedded Systems Builder & AI Engineer",
    description: "Hardware maker and AI engineer. Arduino, ESP32, PCB, IoT, Generative AI, full-stack. Founder of HYNEX.",
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
      <body className={`${cormorant.variable} ${jost.variable} ${spaceMono.variable} noise`}>
        <a href="#main-content" className="skip-link">Skip to main content</a>
        <ThemeProvider>
          {children}
          <Toaster position="bottom-right" theme="dark" />
        </ThemeProvider>
      </body>
    </html>
  );
}
