import OAuth2PasswordGrantAuthenticator from 'ember-simple-auth/authenticators/oauth2-password-grant';
import config from '../config/environment';

export default OAuth2PasswordGrantAuthenticator.extend({
  serverTokenEndpoint: '/api/oauth/token',

  makeRequest(url, data) {
    data.client_id = config.client_id;
    return this._super(url, data)
  }
});
