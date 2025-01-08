const { defineBddConfig } = require('playwright-bdd');

module.exports = defineBddConfig({
  stepDefinitionsDir: 'step-definitions', // Directory for your step definition files
  steps: "step-definitions/**/*.js", // Glob pattern for step definition files
  features: "features/**/*.feature",
  featuresRoot: 'features', // Root directory for your feature files
  format: 'gherkin', // Format for feature files
});