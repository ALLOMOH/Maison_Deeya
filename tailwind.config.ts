import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        cream: "#F7EFE2",
        ivory: "#FFF9F0",
        cocoa: "#3C2118",
        ganache: "#6F3E2D",
        rose: "#EAB8BA",
        blush: "#F8DCDD",
        gold: "#C99B53",
        pistachio: "#9AAE82"
      },
      boxShadow: {
        soft: "0 18px 60px rgba(60, 33, 24, 0.12)",
        glow: "0 22px 80px rgba(201, 155, 83, 0.22)"
      },
      fontFamily: {
        sans: ["var(--font-sans)", "Arial", "sans-serif"],
        serif: ["var(--font-serif)", "Georgia", "serif"]
      }
    }
  },
  plugins: []
};

export default config;
