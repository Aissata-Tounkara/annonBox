import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";

const eslintConfig = defineConfig([
  // Config Next.js
  ...nextVitals,

  // AJOUT ICI : désactiver la règle problématique
  {
    rules: {
      "react/no-unescaped-entities": "off",
    },
  },

  // Ignores
  globalIgnores([
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;