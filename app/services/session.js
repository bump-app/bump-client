import Session from 'ember-simple-auth/services/session';
import get from 'ember-metal/get';
import set from 'ember-metal/set';
import service from 'ember-service/inject';
import computed from 'ember-computed';

export default Session.extend({
  ajax: service(),
  store: service(),

  hasUser: computed('isAuthenticated', 'account', function() {
    return get(this, 'isAuthenticated') && get(this, 'account');
  }).readOnly(),

  authenticateWithOAuth2(identification, password) {
    // FIXME scope for the request is hardcoded in
    return this.authenticate('authenticator:oauth2', identification, password, 'email');
  },

  isCurrentUser(user) {
    const hasUser = get(this, 'hasUser');
    if (!hasUser || !user) { return false; }
    const sessionId = get(this, 'account.id');
    const userId = get(user, 'id') || user;
    return sessionId === userId;
  },

  getCurrentUser() {
    return get(this, 'ajax').request('/me').then((response) => {
      const normalizedData = get(this, 'store').normalize('user', response.data);
      const user = get(this, 'store').push(normalizedData);
      set(this, 'account', user);
      return user
    }).catch(() => { this.invalidate() });
  }
});
