const common = [
  'features/**/*.feature', // Path to feature files
  '--require step-definitions/**/*.js', // Path to step definitions
  '--format progress-bar', // Use a progress-bar format
].join(' ');

module.exports = {
  default: common,
};
// const common = [
//   'features/**/*.feature', // Path to feature files
//   '--require step-definitions/**/*.js', // Path to step definitions
//   '--format progress-bar', // Use a progress-bar format
// ].join(' ');

// module.exports = {
//   default: common,
// };
