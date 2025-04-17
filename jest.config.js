module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/tests/**/*.test.ts'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest'
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  // Mocker automatiquement les modules problématiques
  moduleNameMapper: {
    '^mysql2/promise$': '<rootDir>/src/configs/__mocks__/mysql2.js'
  },
  // Configurer l'environnement pour tes tests
  setupFiles: ['<rootDir>/tests/setup.js']
};