module.exports = {
    extends: ["@commitlint/config-conventional"],
    rules: {
        "header-max-length": [2, "always", 200],
    },
    ignores: [
        // chore(release): 🔖 bump version to 1.0.0
        (message) => /^chore\(release\):/.test(message),
    ],
};
