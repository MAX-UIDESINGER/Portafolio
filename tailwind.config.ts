import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      keyframes: {
        typing: {
          "0%": { width: "0ch", borderRightColor: "#90A1B9" },
          "99%": { borderRightColor: "#90A1B9" },
          "100%": { borderRightColor: "transparent" },
        },
        blink: {
          "0%, 100%": { borderColor: "transparent" },
          "50%": { borderColor: "#90A1B9" },
        },
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        typing: "typing 3s steps(60, end) forwards",
        blink: "blink 1s infinite",
        fadeInUp: "fadeInUp 0.8s ease-out forwards",
      },
    },
  },
  plugins: [],
} satisfies Config;
