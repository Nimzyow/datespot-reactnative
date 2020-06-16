module.exports = {
  // Load setup-tests.js before test execution
  preset: 'react-native',
  setupFilesAfterEnv: ['@testing-library/jest-native/extend-expect'],
  transformIgnorePatterns: [
    'node_modules/(?!react-native|native-base|react-clone-referenced-element)',
  ],
  transform: {
    '^.+\\.jsx?$': 'babel-jest',
  },
  // ...
};
