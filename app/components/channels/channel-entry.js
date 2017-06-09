import Component from 'ember-component';
import get from 'ember-metal/get';
import service from 'ember-service/inject';

export default Component.extend({
  classNames: ['channel-entry'],
  attributeBindings: ['channel'],
  store: service(),
  router: service('-routing'),

  actions: {
    subscribe(channel) {
      const user = get(this, 'session.account')
      const store = get(this, 'store');
      const subscription = store.createRecord('subscription', { user, channel });
      subscription.save();
      get(this, 'router').transitionToRoute('dashboard.all', channel);
    }
  }
});
