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
      channel.set('sub', true);
      get(this, 'router').transitionTo('dashboard.all', channel);
    },

    unsubscribe(channel) {
      get(this, 'store').query('subscription', {
        filter: { userId: get(this, 'session.account.id'),
                  channelId: get(channel, 'id') }
      }).then((subscriptions) => {
        subscriptions.forEach((subscription) => subscription.destroyRecord())
        channel.set('sub', false);
      });
    }
  }
});
