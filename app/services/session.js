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
    return this.authenticate('authenticator:oauth2', identification, password, 'public');
  },

  isCurrentUser(user) {
    const hasUser = get(this, 'hasUser');
    if (!hasUser || !user) { return false; }
    const sessionId = get(this, 'account.id');
    const userId = get(user, 'id') || user;
    return sessionId === userId;
  },

  getCurrentUser() {
    const requestUrl = '/users?filter[self]=true&include=userRoles.role';
    return get(this, 'ajax').request(requestUrl).then((response) => {
      const [data] = response.data;
      const normalizedData = get(this, 'store').normalize('user', data);
      const user = get(this, 'store').push(normalizedData);
      const included = response.included || [];
      included.forEach((record) => {
        let type = get(record, 'type');
        type = type === 'userRoles' ? 'user-role' : 'role';
        get(this, 'store').push(get(this, 'store').normalize(type, record));
      });
      set(this, 'account', user);
      return user;
    }).catch(() => {
      this.invalidate();
    });
  }
});
