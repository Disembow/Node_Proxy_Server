/** @type {import('ts-jest').JestConfigWithTsJest} **/
export default {
  testEnvironment: "node",
  transform: {
    "^.+.tsx?$": ["ts-jest", {}],
  },
  coverageProvider: "v8",
  collectCoverage: true,
  collectCoverageFrom: ["./app/**"],
  coveragePathIgnorePatterns: ["node_modules", "types", "mocks.ts", "schemas"],
};
