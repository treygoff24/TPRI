import typography from "@tailwindcss/typography";
import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: ["./src/**/*.{ts,tsx,mdx}", "./components/**/*.{ts,tsx,mdx}", "./content/**/*.{md,mdx}"],
  theme: {
    extend: {
      colors: {
        background: "rgb(var(--background) / <alpha-value>)",
        surface: "rgb(var(--surface) / <alpha-value>)",
        border: "rgb(var(--border) / <alpha-value>)",
        primary: {
          DEFAULT: "rgb(var(--primary) / <alpha-value>)",
          dark: "rgb(var(--primary-dark) / <alpha-value>)",
          light: "rgb(var(--primary-light) / <alpha-value>)",
          foreground: "rgb(var(--primary-foreground) / <alpha-value>)",
        },
        accent: {
          DEFAULT: "rgb(var(--accent) / <alpha-value>)",
          dark: "rgb(var(--accent-dark) / <alpha-value>)",
        },
        "text-primary": "rgb(var(--text-primary) / <alpha-value>)",
        "text-secondary": "rgb(var(--text-secondary) / <alpha-value>)",
        "text-muted": "rgb(var(--text-muted) / <alpha-value>)",
        success: "rgb(var(--success) / <alpha-value>)",
        warning: "rgb(var(--warning) / <alpha-value>)",
        error: "rgb(var(--error) / <alpha-value>)",
      },
      fontSize: {
        xs: ["0.75rem", { lineHeight: "1rem" }],
        sm: ["0.875rem", { lineHeight: "1.25rem" }],
        base: ["1rem", { lineHeight: "1.5rem" }],
        lg: ["1.125rem", { lineHeight: "1.75rem" }],
        xl: ["1.25rem", { lineHeight: "1.875rem" }],
        "2xl": ["1.5rem", { lineHeight: "2rem" }],
        "3xl": ["1.875rem", { lineHeight: "2.25rem" }],
        "4xl": ["2.25rem", { lineHeight: "2.75rem" }],
        "5xl": ["3rem", { lineHeight: "3.5rem" }],
        "6xl": ["3.75rem", { lineHeight: "4rem" }],
        "7xl": ["4.5rem", { lineHeight: "4.5rem" }],
      },
      fontFamily: {
        sans: "var(--font-sans)",
        serif: "var(--font-serif)",
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
      typography: {
        DEFAULT: {
          css: {
            maxWidth: "var(--max-width-prose)",
            color: "rgb(var(--text-secondary) / 1)",
            a: {
              color: "rgb(var(--primary) / 1)",
              fontWeight: "600",
              textDecorationThickness: "0.1em",
            },
            "a:hover": {
              color: "rgb(var(--accent) / 1)",
            },
            h1: { fontFamily: "var(--font-serif)", color: "rgb(var(--text-primary) / 1)" },
            h2: { fontFamily: "var(--font-serif)", color: "rgb(var(--text-primary) / 1)" },
            h3: { fontFamily: "var(--font-serif)", color: "rgb(var(--text-primary) / 1)" },
          },
        },
      },
    },
  },
  plugins: [typography],
};

export default config;
