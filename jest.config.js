/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '^.+\\.(css|less|scss)$': 'babel-jest'
  },
  coverageReporters: [
    'text',
    'cobertura',
    'lcov'
  ]
};
