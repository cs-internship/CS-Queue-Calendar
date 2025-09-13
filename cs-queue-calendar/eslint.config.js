const path = require("path");
const { FlatCompat } = require("@eslint/eslintrc");
const js = require("@eslint/js");
const reactPlugin = require("eslint-plugin-react");
const reactHooksPlugin = require("eslint-plugin-react-hooks");
const reactRefresh = require("eslint-plugin-react-refresh");
const globals = require("globals");

const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all,
});

const reactRefreshViteConfig =
    reactRefresh && reactRefresh.configs && reactRefresh.configs.vite
        ? reactRefresh.configs.vite
        : null;

const pluginsObj = {
    react: reactPlugin,
    "react-hooks": reactHooksPlugin,
};
if (!reactRefreshViteConfig) {
    pluginsObj["react-refresh"] = reactRefresh;
}

module.exports = [
    ...compat.extends(
        "eslint:recommended",
        "plugin:react/recommended",
        "plugin:react-hooks/recommended"
    ),

    ...(reactRefreshViteConfig ? [reactRefreshViteConfig] : []),

    {
        files: ["src/**/*.{js,jsx}"],
        plugins: pluginsObj,

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
            "no-undef": ["error", { typeof: true }],
            "no-unused-vars": ["warn", { varsIgnorePattern: "^[A-Z_]" }],
            // "no-console": ["warn", { allow: ["warn", "error"] }],
            eqeqeq: ["error", "always"],
            curly: "error",
            semi: ["error", "always"],
            quotes: ["error", "double", { avoidEscape: true }],
            "no-var": "error",
            "prefer-const": "error",

            "react/jsx-uses-react": "off",
            "react/react-in-jsx-scope": "off",
            "react/jsx-uses-vars": "error",
            "react/prop-types": "off",
            "react/no-children-prop": "error",

            "react-hooks/rules-of-hooks": "error",
            "react-hooks/exhaustive-deps": "warn",

            "no-unused-expressions": "off",
            "no-sequences": "off",
            "no-mixed-operators": "off",
        },

        settings: {
            react: { version: "detect" },
        },
    },
];
