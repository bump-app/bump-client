import service from 'ember-service/inject';
import OAuth2PasswordGrantAuthenticator from 'ember-simple-auth/authenticators/oauth2-password-grant';
import config from '../config/environment';

export default OAuth2PasswordGrantAuthenticator.extend({
  serverTokenEndpoint: '/api/oauth/token',
  serverTokenRevocationEndpoint: '/api/oauth/revoke',
  refreshAccessTokens: true,
  session: service(),

  makeRequest(url, data, headers = {}) {
    headers.client_id = config.client_id;
    return this._super(url, data, headers)
  }
});
