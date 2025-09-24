import path from "node:path";

import { defineConfig } from "vitest/config";

export default defineConfig({
  esbuild: {
    jsx: "automatic",
    jsxDev: true,
  },
  resolve: {
    alias: [
      { find: /^@\/app/, replacement: path.resolve(__dirname, "./src/app") },
      { find: /^@\/components/, replacement: path.resolve(__dirname, "./components") },
      { find: /^@\/content/, replacement: path.resolve(__dirname, "./content") },
      { find: /^@\/data/, replacement: path.resolve(__dirname, "./data") },
      { find: /^@\/lib/, replacement: path.resolve(__dirname, "./lib") },
      { find: /^@\/styles/, replacement: path.resolve(__dirname, "./styles") },
      { find: /^@\//, replacement: path.resolve(__dirname, "./src/") },
    ],
  },
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./vitest.setup.ts"],
    coverage: {
      provider: "v8",
      reporter: ["text", "lcov"],
      include: ["components/**/*.{ts,tsx}", "lib/**/*.{ts,tsx}"],
      exclude: ["lib/og.tsx"],
    },
  },
});
