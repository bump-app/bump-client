import Route from 'ember-route';
import ApplicationRouteMixin from 'ember-simple-auth/mixins/application-route-mixin';
import get from 'ember-metal/get';

export default Route.extend(ApplicationRouteMixin, {
  routeAfterAuthentication: 'dashboard.all',
  authModalOpened: false,

  beforeModel() {
    const session = get(this, 'session');
    if (get(session, 'isAuthenticated')) {
      return this._getCurrentUser();
    }
  },

  sessionAuthenticated() {
    this._getCurrentUser();
  },

  _getCurrentUser() {
    return get(this, 'session').getCurrentUser().catch(() => {
      get(this, 'session').invalidate();
    });
  },

  actions: {
    logout() {
      get(this, 'session').invalidate();
    }
  }
});
