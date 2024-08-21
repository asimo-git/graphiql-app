module.exports = {
  preset: 'ts-jest',
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
  collectCoverageFrom: ['<rootDir>/app/**/*.{ts,tsx}'],
  coverageReporters: ['text-summary', 'html'],
  testEnvironment: 'jsdom',
  testMatch: ['<rootDir>/tests/**/*.(spec|test).[jt]s?(x)'],
  transform: {
    '^.+\\.(ts|tsx)$': [
      'ts-jest',
      {
        tsconfig: {
          jsx: 'react-jsx',
        },
        isolatedModules: true,
        diagnostics: false,
      },
    ],
  },
  setupFilesAfterEnv: ['<rootDir>/setupTests.ts'],
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
  },
};
