/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    verbose: true,
    maxWorkers: '50%',
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/src/$1',
    },
}
