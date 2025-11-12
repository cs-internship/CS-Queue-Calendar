module.exports = {
    testEnvironment: "jsdom",
    collectCoverage: true,
    collectCoverageFrom: [
        "src/**/*.{js,jsx,ts,tsx}",
        "!src/**/*.d.ts",
        "!src/**/__tests__/**",
    ],
    coverageDirectory: "coverage",
    setupFilesAfterEnv: ["<rootDir>/src/jest.setup.js"],
    testPathIgnorePatterns: ["/node_modules/", "/coverage/", "/dist/"],
    moduleFileExtensions: ["js", "jsx", "ts", "tsx"],
    transform: {
        "^.+\\.(js|jsx|ts|tsx)$": "babel-jest",
    },
};
