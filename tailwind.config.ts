import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#0B0B0D",
        charcoal: "#151518",
        graphite: "#232328",
        cream: "#151518",
        soft: "#232328",
        silver: "#C8C8CE",
        ivory: "#E8E8EC",
        // neutral platinum accent system (no gold)
        electric: "#C9CDD6",
        violet: "#9AA0AE",
        gold: "#D6D8DE",
        champagne: "#E8E8EC",
        rosegold: "#B8BCC6",
        bronze: "#9AA0AE",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "accent-gradient":
          "linear-gradient(120deg, #FFFFFF 0%, #C8C8CE 50%, #8E8E96 100%)",
        "accent-soft":
          "linear-gradient(120deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.035) 100%)",
      },
      keyframes: {
        "gradient-pan": {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-14px)" },
        },
        "spin-slow": {
          to: { transform: "rotate(360deg)" },
        },
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
      },
      animation: {
        "gradient-pan": "gradient-pan 6s ease infinite",
        float: "float 6s ease-in-out infinite",
        "spin-slow": "spin-slow 18s linear infinite",
        marquee: "marquee 30s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
