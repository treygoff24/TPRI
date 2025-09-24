import { dirname } from "node:path";
import { fileURLToPath } from "node:url";

import { FlatCompat } from "@eslint/eslintrc";
import eslintPluginImport from "eslint-plugin-import";
import jsxA11y from "eslint-plugin-jsx-a11y";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  {
    plugins: {
      import: eslintPluginImport,
      "jsx-a11y": jsxA11y,
    },
    settings: {
      "import/resolver": {
        typescript: {
          project: "./tsconfig.json",
        },
      },
    },
  },
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    files: ["**/*.{ts,tsx,js,jsx}"],
    rules: {
      "import/no-default-export": ["error"],
      "import/no-named-default": "error",
      "import/no-duplicates": ["error", { considerQueryString: true }],
      "import/newline-after-import": ["error", { count: 1 }],
      "import/order": [
        "error",
        {
          groups: [["builtin"], ["external"], ["internal"], ["parent", "sibling", "index"]],
          pathGroups: [
            {
              pattern: "@/**",
              group: "internal",
              position: "before",
            },
          ],
          pathGroupsExcludedImportTypes: ["builtin", "type"],
          "newlines-between": "always",
        },
      ],
    },
  },
  {
    files: [
      "**/app/**/layout.@(js|jsx|ts|tsx)",
      "**/app/**/page.@(js|jsx|ts|tsx)",
      "**/app/**/template.@(js|jsx|ts|tsx)",
      "**/app/**/default.@(js|jsx|ts|tsx)",
      "**/app/**/route.@(js|jsx|ts|tsx)",
    ],
    rules: {
      "import/no-default-export": "off",
    },
  },
  {
    files: [
      "**/*.config.@(js|ts|mjs)",
      "**/*.d.ts",
      "next.config.ts",
      "tailwind.config.ts",
      "postcss.config.mjs",
    ],
    rules: {
      "import/no-default-export": "off",
    },
  },
  {
    ignores: ["node_modules/**", ".next/**", "out/**", "build/**", "next-env.d.ts"],
  },
];

export default eslintConfig;
