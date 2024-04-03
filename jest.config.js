// ./jest.config.ts


// const dotEnv = require("dotenv");
// dotEnv.config({ path: "./.env.test", debug: true, override: true });

module.exports = {
  testRegex: "(/routes/.*(\\.|/)(test|spec))\\.js$",
  testEnvironment: 'node',
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
  allowJs: true
};