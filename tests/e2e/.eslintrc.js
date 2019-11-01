module.exports = {
  plugins: [
    'cypress'
  ],
  env: {
    mocha: true,
    'cypress/globals': true
  },
  rules: {
    strict: 'off',
    "no-debugger": 'off',
    "no-console": 'off'
  }
}
