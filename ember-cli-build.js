/* eslint-env node */
const EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function(defaults) {
  var app = new EmberApp(defaults, {
    'ember-cli-babel': {
      includePolyfill: true
    },
    'ember-cli-bootstrap-sassy': {
      glyphicons: false,
      js: [ 'modal', 'transition' ],
      quiet: true
    },
    sourcemaps: {
      enabled: true,
      extensions: ['js']
    },
  });

  return app.toTree();
};
