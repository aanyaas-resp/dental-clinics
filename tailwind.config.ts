import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#102422",
        forest: {
          DEFAULT: "#0E3B39",
          light: "#175E56",
          dark: "#092523",
        },
        sand: "#F3EFE4",
        cream: "#FBFAF5",
        gold: {
          DEFAULT: "#B8922F",
          light: "#D9B65B",
        },
        line: "#E3DECE",
      },
      fontFamily: {
        display: ["var(--font-fraunces)", "serif"],
        sans: ["var(--font-jakarta)", "sans-serif"],
      },
      maxWidth: {
        content: "1240px",
      },
      boxShadow: {
        card: "0 12px 40px -16px rgba(16,36,34,0.18)",
        soft: "0 4px 24px -8px rgba(16,36,34,0.10)",
      },
      borderRadius: {
        xl2: "1.25rem",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        marquee: "marquee 28s linear infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
