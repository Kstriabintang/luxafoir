import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Brand surfaces
        obsidian: "var(--color-obsidian)",
        void: "var(--color-void)",
        charcoal: "var(--color-charcoal)",
        ash: "var(--color-ash)",
        // Text scale
        smoke: "var(--color-smoke)",
        mist: "var(--color-mist)",
        ivory: "var(--color-ivory)",
        // Accent
        gold: {
          DEFAULT: "var(--color-gold)",
          dim: "var(--color-gold-dim)",
          bright: "var(--color-gold-bright)",
        },
        // Semantic
        error: "var(--color-error)",
        success: "var(--color-success)",
        "sold-out": "var(--color-sold-out)",
        // shadcn bridge tokens
        background: "var(--color-bg-primary)",
        foreground: "var(--color-ivory)",
        border: "var(--color-ash)",
        input: "var(--color-ash)",
        ring: "var(--color-gold)",
        primary: {
          DEFAULT: "var(--color-gold)",
          foreground: "var(--color-obsidian)",
        },
        secondary: {
          DEFAULT: "var(--color-charcoal)",
          foreground: "var(--color-ivory)",
        },
        muted: {
          DEFAULT: "var(--color-void)",
          foreground: "var(--color-smoke)",
        },
        accent: {
          DEFAULT: "var(--color-gold)",
          foreground: "var(--color-obsidian)",
        },
        destructive: {
          DEFAULT: "var(--color-error)",
          foreground: "var(--color-ivory)",
        },
        card: {
          DEFAULT: "var(--color-void)",
          foreground: "var(--color-ivory)",
        },
        popover: {
          DEFAULT: "var(--color-charcoal)",
          foreground: "var(--color-ivory)",
        },
      },
      fontFamily: {
        // Obra Letra everywhere (display, body, mono, sans) — serif fallback.
        display: ['"Obra Letra"', "Georgia", '"Times New Roman"', "serif"],
        body: ['"Obra Letra"', "Georgia", '"Times New Roman"', "serif"],
        mono: ['"Obra Letra"', "Georgia", '"Times New Roman"', "serif"],
        sans: ['"Obra Letra"', "Georgia", '"Times New Roman"', "serif"],
      },
      fontSize: {
        hero: ["clamp(64px, 10vw, 120px)", { lineHeight: "0.95", fontWeight: "300" }],
        h1: ["clamp(40px, 6vw, 72px)", { lineHeight: "1.02", fontWeight: "300" }],
        h2: ["clamp(28px, 4vw, 48px)", { lineHeight: "1.1", fontWeight: "400" }],
        h3: ["clamp(20px, 3vw, 32px)", { lineHeight: "1.2", fontWeight: "400" }],
        label: ["11px", { lineHeight: "1.4", letterSpacing: "0.15em", fontWeight: "500" }],
        body: ["15px", { lineHeight: "1.7", fontWeight: "400" }],
        caption: ["12px", { lineHeight: "1.5", fontWeight: "400" }],
      },
      letterSpacing: {
        label: "0.15em",
        wide: "0.08em",
        widest: "0.25em",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      transitionTimingFunction: {
        "out-expo": "cubic-bezier(0.16, 1, 0.3, 1)",
        "in-out-expo": "cubic-bezier(0.87, 0, 0.13, 1)",
      },
      transitionDuration: {
        fast: "150ms",
        normal: "300ms",
        slow: "300ms",
        cinematic: "600ms",
      },
      maxWidth: {
        site: "1600px",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        marquee: "marquee 28s linear infinite",
        shimmer: "shimmer 1.8s ease-in-out infinite",
        "accordion-down": "accordion-down 0.3s ease-out",
        "accordion-up": "accordion-up 0.3s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
