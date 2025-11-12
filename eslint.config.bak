import js from "@eslint/js";
import globals from "globals";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import { defineConfig, globalIgnores } from "eslint/config";

export default defineConfig([
    globalIgnores(["node_modules", "dist", "build"]),

    {
        files: ["src/**/*.{js,jsx}"],

        extends: [
            js.configs.recommended, 
            react.configs.recommended, 
            reactHooks.configs["recommended"], 
            reactRefresh.configs.vite, 
        ],

        plugins: ["react", "react-hooks"],

        languageOptions: {
            ecmaVersion: 2020,
            globals: {
                ...globals.browser,
                process: "readonly",
                require: "readonly",
            },
            parserOptions: {
                ecmaVersion: "latest",
                ecmaFeatures: { jsx: true },
                sourceType: "module",
            },
        },

        rules: {
            // ====== JS Rules ======
            "no-undef": ["error", { typeof: true }],
            "no-unused-vars": ["warn", { varsIgnorePattern: "^[A-Z_]" }],
            "no-console": ["warn", { allow: ["warn", "error"] }],
            eqeqeq: ["error", "always"],
            curly: "error",
            semi: ["error", "always"],
            quotes: ["error", "double", { avoidEscape: true }],
            "no-var": "error",
            "prefer-const": "error",

            // ====== React Rules ======
            "react/jsx-uses-react": "off", // React 17+ JSX Transform
            "react/react-in-jsx-scope": "off",
            "react/jsx-uses-vars": "error",
            "react/prop-types": "warn",
            "react/no-children-prop": "error",

            // ====== React Hooks ======
            "react-hooks/rules-of-hooks": "error",
            "react-hooks/exhaustive-deps": "warn",

            // ====== JSX & Style Cleanup ======
            "no-unused-expressions": "off", // JSX logical && usage
            "no-sequences": "off", // rarely used in React
            "no-mixed-operators": "off", // JSX conditional rendering
        },

        settings: {
            react: {
                version: "detect",
            },
        },
    },
]);
