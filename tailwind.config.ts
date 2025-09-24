import typography from "@tailwindcss/typography";
import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: ["./src/**/*.{ts,tsx,mdx}", "./components/**/*.{ts,tsx,mdx}", "./content/**/*.{md,mdx}"],
  theme: {
    extend: {
      colors: {
        background: "rgb(var(--color-background) / <alpha-value>)",
        foreground: "rgb(var(--color-foreground) / <alpha-value>)",
        primary: {
          DEFAULT: "rgb(var(--color-primary) / <alpha-value>)",
          foreground: "rgb(var(--color-primary-foreground) / <alpha-value>)",
        },
        secondary: {
          DEFAULT: "rgb(var(--color-secondary) / <alpha-value>)",
          foreground: "rgb(var(--color-secondary-foreground) / <alpha-value>)",
        },
        accent: {
          DEFAULT: "rgb(var(--color-accent) / <alpha-value>)",
          foreground: "rgb(var(--color-accent-foreground) / <alpha-value>)",
        },
        muted: {
          DEFAULT: "rgb(var(--color-muted) / <alpha-value>)",
          foreground: "rgb(var(--color-muted-foreground) / <alpha-value>)",
        },
        border: "rgb(var(--color-border) / <alpha-value>)",
        ring: "rgb(var(--color-ring) / <alpha-value>)",
        info: "rgb(var(--color-info) / <alpha-value>)",
        success: "rgb(var(--color-success) / <alpha-value>)",
        warning: "rgb(var(--color-warning) / <alpha-value>)",
        danger: "rgb(var(--color-danger) / <alpha-value>)",
      },
      fontFamily: {
        heading: "var(--font-heading)",
        body: "var(--font-body)",
        mono: "var(--font-mono)",
      },
      spacing: {
        gutter: "var(--space-gutter)",
        section: "var(--space-section)",
      },
      maxWidth: {
        prose: "var(--max-width-prose)",
        "layout-xs": "480px",
        "layout-sm": "640px",
        "layout-md": "768px",
        "layout-lg": "1024px",
        "layout-xl": "1280px",
        "layout-2xl": "1440px",
      },
      borderRadius: {
        lg: "calc(var(--radius) - 2px)",
        md: "calc(var(--radius) - 4px)",
        sm: "calc(var(--radius) - 6px)",
      },
      boxShadow: {
        "soft-lg": "0 22px 45px -30px rgb(15 35 55 / 0.45)",
        outline: "0 0 0 2px rgb(var(--color-ring) / 0.35)",
      },
      keyframes: {
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-out": {
          "0%": { opacity: "1", transform: "translateY(0)" },
          "100%": { opacity: "0", transform: "translateY(8px)" },
        },
        pulse: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.65" },
        },
        wave: {
          "0%": { backgroundPosition: "0% 50%" },
          "100%": { backgroundPosition: "200% 50%" },
        },
      },
      animation: {
        "fade-in": "fade-in 250ms ease-out forwards",
        "fade-out": "fade-out 200ms ease-out forwards",
        pulse: "pulse 2s ease-in-out infinite",
        wave: "wave 14s linear infinite",
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: "var(--max-width-prose)",
            color: "rgb(var(--color-foreground) / 0.87)",
            a: {
              color: "rgb(var(--color-primary) / 1)",
              fontWeight: "600",
              textDecorationThickness: "0.1em",
            },
            "a:hover": {
              color: "rgb(var(--color-accent) / 1)",
            },
            h1: { fontFamily: "var(--font-heading)" },
            h2: { fontFamily: "var(--font-heading)" },
            h3: { fontFamily: "var(--font-heading)" },
          },
        },
      },
    },
  },
  plugins: [typography],
};

export default config;
