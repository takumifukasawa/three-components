module.exports = {
  // preset: "ts-jest",
  // roots: [
  //   "./"
  // ],
  // testRegex: ".test.ts",
  // moduleDirectories: [
  //   "node_modules",
  //   "src"
  // ],
  moduleNameMapper: {
    // "^@/(.+)": "<rootDir>/$1"
    "^@/(.*)$": "<rootDir>/$1",
  },
  moduleFileExtensions: ["ts", "js"],
  transform: {
    "^.+\\.ts$": "ts-jest",
  },
  globals: {
    "ts-jest": {
      tsConfig: "tsconfig.json",
    },
  },
  testMatch: ["**/__test__/*.test.+(ts|js)"],
  verbose: true,
  notify: true,
};
