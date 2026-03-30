import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ["'Cormorant Garamond'", "serif"],
        body: ["'Jost'", "sans-serif"],
        mono: ["'Space Mono'", "monospace"],
      },
      colors: {
        bg:      "rgb(var(--color-bg) / <alpha-value>)",
        surface: "rgb(var(--color-surface) / <alpha-value>)",
        card:    "rgb(var(--color-card) / <alpha-value>)",
        border:  "rgb(var(--color-border) / <alpha-value>)",
        accent:  "rgb(var(--color-accent) / <alpha-value>)",
        cyan:    "rgb(var(--color-cyan) / <alpha-value>)",
        pink:    "rgb(var(--color-pink) / <alpha-value>)",
        gold:    "rgb(var(--color-gold) / <alpha-value>)",
        muted:   "rgb(var(--color-muted) / <alpha-value>)",
        light:   "rgb(var(--color-light) / <alpha-value>)",
      },
      animation: {
        "spin-slow":   "spin 20s linear infinite",
        float:         "float 6s ease-in-out infinite",
        "float-sm":    "float-sm 4s ease-in-out infinite",
        glow:          "glow 2s ease-in-out infinite alternate",
        "gradient-x":  "gradient-x 5s ease infinite",
        shimmer:       "shimmer 2.5s linear infinite",
        "glow-pulse":  "glow-pulse 2.4s ease-in-out infinite",
        "spin-ring":   "spin-slow 18s linear infinite",
        "orbit-ring":  "orbit-ring 8s linear infinite",
        "orbit-ring-rev": "orbit-ring-rev 12s linear infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%":       { transform: "translateY(-20px)" },
        },
        "float-sm": {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%":       { transform: "translateY(-8px)" },
        },
        glow: {
          from: { textShadow: "0 0 10px #8b5cf6, 0 0 20px #8b5cf6" },
          to:   { textShadow: "0 0 20px #06b6d4, 0 0 40px #06b6d4" },
        },
        "gradient-x": {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%":       { backgroundPosition: "100% 50%" },
        },
        shimmer: {
          from: { backgroundPosition: "-200% center" },
          to:   { backgroundPosition:  "200% center" },
        },
        "glow-pulse": {
          "0%, 100%": { boxShadow: "0 0 6px rgba(139, 92, 246, 0.3), 0 0 18px rgba(139, 92, 246, 0.10)" },
          "50%":       { boxShadow: "0 0 14px rgba(139, 92, 246, 0.6), 0 0 36px rgba(139, 92, 246, 0.22)" },
        },
        "spin-slow": {
          from: { transform: "rotate(0deg)" },
          to:   { transform: "rotate(360deg)" },
        },
        "orbit-ring": {
          from: { transform: "rotate(0deg)" },
          to:   { transform: "rotate(360deg)" },
        },
        "orbit-ring-rev": {
          from: { transform: "rotate(0deg)" },
          to:   { transform: "rotate(-360deg)" },
        },
      },
    }
  },
  plugins: []
};

export default config;
