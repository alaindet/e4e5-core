/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    verbose: true,
    maxWorkers: '50%',
    modulePathIgnorePatterns: ["__old__"], // Exclude anything containing "__old__"
}
