import { IBM_Plex_Mono, Inter, Playfair_Display } from "next/font/google";

export const sansFont = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const serifFont = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
  weight: ["400", "700", "900"],
});

export const monoFont = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
  weight: ["400", "500"],
});

export const fontVariables = [sansFont.variable, serifFont.variable, monoFont.variable].join(" ");
