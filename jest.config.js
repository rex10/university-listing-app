module.exports = {
    setupFilesAfterEnv: ["src/jest.setup.js"],
    transform: {
        '^.+\\.jsx?$': 'babel-jest',
    },
    testEnvironment: 'jsdom',
    transformIgnorePatterns: ["/node_modules/(?!(axios)/)",],
    moduleFileExtensions: ['js', 'jsx', 'json', 'node'],
    moduleNameMapper: {
        "\\.(css|less)$": "identity-obj-proxy"
    },
    setupFilesAfterEnv: ["@testing-library/jest-dom/"],
    moduleDirectories: ['node_modules', 'src']
}
