const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://graphqlzero.almansi.me/api',
    fixturesFolder: 'cypress/fixtures',
    supportFile: 'cypress/support/e2e.js',
   
  },
});
