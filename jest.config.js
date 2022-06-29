/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    verbose: true,
    automock: false,
    // Slow down tests, but avoids concurrent access to shared resources
    maxWorkers: 1,
}
