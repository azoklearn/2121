import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ivory: "#EDE8D5",
        "ivory-soft": "#F1ECDA",
        ink: "#1A1A1A",
        "ink-soft": "#2A2A2A",
        steel: "#6B6E72",
        leather: "#5C4033",
        dial: "#F4F1E8",
        bone: "#E5DFC7",
        ash: "#8A8780",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        serif: ["'Cormorant Garamond'", "serif"],
      },
      letterSpacing: {
        tightest: "-0.05em",
        tighter: "-0.03em",
        wider: "0.15em",
        widest: "0.25em",
      },
      transitionTimingFunction: {
        "out-expo": "cubic-bezier(0.16, 1, 0.3, 1)",
        "in-out-quart": "cubic-bezier(0.76, 0, 0.24, 1)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        "fade-up": "fade-up 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        marquee: "marquee 50s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
