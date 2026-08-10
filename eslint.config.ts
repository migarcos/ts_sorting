import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import { defineConfig } from "eslint/config";

export default defineConfig([
  { 
    files: ["**/*.{js,mjs,cjs,ts,mts,cts}"], 
    plugins: { 
      js,
      "@typescript-eslint": tseslint.plugin 
    }, 
    extends: ["js/recommended"], 
    languageOptions: { 
      parser: tseslint.parser,
      globals: globals.node 
    },
    rules: {
      // add custom rules here
      "no-console": "off", // allow console.log for demos
      "@typescript-eslint/no-unused-vars": ["warn"],
    }, 
  },
  tseslint.configs.recommended,
]);
