/** @type {import('ts-jest').JestConfigWithTsJest} **/
export default {
  testEnvironment: "node",
  transform: {
    "^.+.tsx?$": ["ts-jest", {}],
  },
  coverageProvider: "v8",
  collectCoverage: true,
  collectCoverageFrom: ["./app/**/*.ts"],
  coveragePathIgnorePatterns: [
    "node_modules",
    "types",
    "mocks.ts",
    "schemas",
    "config",
    "index.ts",
  ],
};
