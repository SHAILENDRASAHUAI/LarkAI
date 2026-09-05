import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        predawn: "var(--predawn-indigo)",
        midnight: "var(--midnight-teal)",
        dusk: "var(--dusk-teal)",
        morning: "var(--morning-sage)",
        cream: "var(--feather-cream)",
        gold: "var(--first-light-gold)",
        ink: "var(--ink)",
        paper: "var(--paper)",
      },
    },
  },
};

export default config;
