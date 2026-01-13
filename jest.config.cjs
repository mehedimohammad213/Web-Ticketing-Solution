const { createDefaultPreset } = require("ts-jest");

const tsJestTransformCfg = createDefaultPreset().transform;

/** @type {import("jest").Config} **/
module.exports = {
  testEnvironment: "node",
  roots: ["<rootDir>/tests/api"],
  testMatch: ["**/*.spec.ts"],
  reporters: [
    "default",
    ["jest-html-reporter", {
      "pageTitle": "API Test Report",
      "outputPath": "./reports/api-test-report.html",
      "includeFailureMsg": true
    }]
  ],
  transform: {
    ...tsJestTransformCfg,
  },
};