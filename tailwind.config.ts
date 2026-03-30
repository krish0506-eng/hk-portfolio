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
        bg: "rgb(var(--color-bg) / <alpha-value>)",
        surface: "rgb(var(--color-surface) / <alpha-value>)",
        card: "rgb(var(--color-card) / <alpha-value>)",
        border: "rgb(var(--color-border) / <alpha-value>)",
        accent: "rgb(var(--color-accent) / <alpha-value>)",
        cyan: "rgb(var(--color-cyan) / <alpha-value>)",
        pink: "rgb(var(--color-pink) / <alpha-value>)",
        gold: "rgb(var(--color-gold) / <alpha-value>)",
        muted: "rgb(var(--color-muted) / <alpha-value>)",
        light: "rgb(var(--color-light) / <alpha-value>)",
      },
      animation: {
        "spin-slow": "spin 20s linear infinite",
        float: "float 6s ease-in-out infinite",
        glow: "glow 2s ease-in-out infinite alternate",
        "gradient-x": "gradient-x 4s ease infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        glow: {
          from: { textShadow: "0 0 10px #6c63ff, 0 0 20px #6c63ff" },
          to: { textShadow: "0 0 20px #00f5ff, 0 0 40px #00f5ff" },
        },
        "gradient-x": {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
      }
    }
  },
  plugins: []
};

export default config;
