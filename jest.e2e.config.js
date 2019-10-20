module.exports = {
  rootDir: 'e2e',
  testEnvironment: 'node',
  setupFilesAfterEnv: [
    '../jest.setup.js'
  ],
  testRegex: './e2e/e2e.js'
}
