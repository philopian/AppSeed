const path = require("path");

module.exports = {
  testEnvironment: "node",
  testMatch: [
    "<rootDir>/www/**/__tests__/**/*.js?(x)",
    "<rootDir>/www/**/?(*.)(spec|test).js?(x)",
    "<rootDir>/server/**/__tests__/**/*.js?(x)",
    "<rootDir>/server/**/?(*.)(spec|test).js?(x)"
  ],
  moduleNameMapper: { "^react-native$": "react-native-web" },
  moduleFileExtensions: ["web.js", "js", "json", "web.jsx", "jsx", "node"],
  transform: {
    "^.+\\.(js|jsx)$": path.join(__dirname, "/preprocessor.js")
  },
  collectCoverageFrom: ["www/**/*.{js,jsx}", "!www/**/*storybook.js"],
  coverageDirectory: "test-results/coverage",
  reporters: [
    // https://github.com/Hargne/jest-html-reporter/wiki/configuration
    "default",
    ["./node_modules/jest-html-reporter", {
        outputPath:"./test-results/test-report/index.html",
        "pageTitle": "Test Report",
        "includeFailureMsg": true,
        "theme": "lightTheme",
        "styleOverridePath":  path.join(__dirname, "coverage-styles.css"),
        // customScriptPath: ""
    }]
  ]
};