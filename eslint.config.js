import eslint from "@eslint/js";
import prettierRecommended from "eslint-plugin-prettier/recommended";
import globals from "globals";
import tseslint from "typescript-eslint";

export default tseslint.config(
  {
    files: ["app/**/*.{js,mjs,cjs,ts}"],
    languageOptions: {
      globals: { ...globals.browser, ...globals.node },
      ecmaVersion: "latest",
    },
    rules: {
      "@typescript-eslint/no-unused-vars": [
        "error",
        { argsIgnorePattern: "^next$" },
      ],
      "prettier/prettier": ["error", { endOfLine: "auto" }],
    },
  },
  eslint.configs.recommended,
  tseslint.configs.recommended,
  prettierRecommended,
);
