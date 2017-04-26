import OAuth2PasswordGrant from 'ember-simple-auth/authenticators/oauth2-password-grant';
import config from '../config/environment';

export default OAuth2PasswordGrant.extend({
  serverTokenEndpoint: '/api/oauth/token',
  /*serverTokenRevocationEndpoint: '/api/oauth/revoke',*/
  makeRequest: function(url, data) {
      data.client_id = config.client_id;
      /*data.client_secret = 'notverysecret';*/
      return this._super(url, data)
  }
});
