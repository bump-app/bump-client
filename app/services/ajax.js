import computed from 'ember-computed';
import get from 'ember-metal/get';
import service from 'ember-service/inject';
import AjaxService from 'ember-ajax/services/ajax';

export default AjaxService.extend({
  contentType: 'application/vnd.api+json',
  namespace: '/api',
  session: service(),

  init() {
    this._super(...arguments);
  },

  headers: computed('session.isAuthenticated', function() {
    const headers = {
      accept: 'application/vnd.api+json'
    };
    const isAuthenticated = get(this, 'session.isAuthenticated');
    if (isAuthenticated) {
      get(this, 'session').authorize('authorizer:oauth2', (headerName, headerValue) => {
        headers[headerName] = headerValue;
      });
    }
    return headers;
  }).readOnly()
});
