const { createDefaultPreset } = require("ts-jest");

const tsJestTransformCfg = createDefaultPreset().transform;

/** @type {import("jest").Config} **/
module.exports = {
  testEnvironment: "node",
  roots: ["<rootDir>/api"],
  testMatch: ["**/*.spec.ts"],
  transform: {
    ...tsJestTransformCfg,
  },
};