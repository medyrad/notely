// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
import storybook from "eslint-plugin-storybook";

import js from "@eslint/js";
import tseslint from "typescript-eslint";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import prettier from "eslint-plugin-prettier";

export default [js.configs.recommended, ...tseslint.configs.recommended, {
  files: ["**/*.{ts,tsx}"],
  plugins: {
    react,
    "react-hooks": reactHooks,
    "react-refresh": reactRefresh,
    prettier,
  },
  rules: {
    "prettier/prettier": "error",

    "react/react-in-jsx-scope": "off", // React 17+
    "react-refresh/only-export-components": "warn",

    "@typescript-eslint/no-unused-vars": ["warn"],
    "@typescript-eslint/no-explicit-any": "warn",

    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn",
  },
  settings: {
    react: {
      version: "detect",
    },
  },
}, ...storybook.configs["flat/recommended"]];
