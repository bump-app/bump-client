import Ember from 'ember';
import service from 'ember-service/inject';
import get from 'ember-metal/get';

export default Ember.Route.extend({
  session: service(),

  beforeModel() {
    if (get(this, 'session.isAuthenticated')) {
      this.transitionTo('channels.all');
    }
  }
});
