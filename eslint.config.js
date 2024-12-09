import pluginJs from "@eslint/js";
import prettierRecommended from "eslint-plugin-prettier/recommended";
import globals from "globals";

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    files: ["app/**/*.{js,mjs,cjs}"],
  },
  {
    languageOptions: {
      globals: { ...globals.browser, ...globals.node },
      ecmaVersion: "latest",
    },
  },
  {
    rules: {
      "no-unused-vars": ["error", { argsIgnorePattern: "^next$" }],
    },
  },
  pluginJs.configs.recommended,
  prettierRecommended,
];
