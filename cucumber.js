const common = [
  'features/**/*.feature', // Path to feature files
  '--require step-definitions/**/*.js', // Path to step definitions
  '--publish-quiet', // Disable Cucumber analytics
  '--format progress-bar', // Use a progress-bar format
].join(' ');

module.exports = {
  default: common,
};