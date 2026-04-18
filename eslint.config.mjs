import { defineConfig } from "eslint/config";
import tseslint from "typescript-eslint";

export default defineConfig([
  ...tseslint.configs.recommended,
  {
    files: ["src/**/*.{ts,tsx}"],
    rules: {
      "no-unused-vars": "warn",
      "@typescript-eslint/no-unused-vars": "warn",
      "no-console": "warn",
    },
  },
  {
    ignores: [".next/", "out/", "node_modules/"],
  }
]);
