import { Inter, JetBrains_Mono, Source_Serif_4 } from "next/font/google";

export const headingFont = Source_Serif_4({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-heading",
});

export const bodyFont = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-body",
});

export const monoFont = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-mono",
});

export const fontVariables = [headingFont.variable, bodyFont.variable, monoFont.variable].join(" ");
