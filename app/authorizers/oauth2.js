import OAuth2Bearer from 'ember-simple-auth/authorizers/oauth2-bearer';

export default OAuth2Bearer.extend({
  authorize(data) {
    console.log(data);
  }
});
