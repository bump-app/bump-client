import Component from 'ember-component';
import get from 'ember-metal/get';
import service from 'ember-service/inject';
import { task } from 'ember-concurrency';

export default Component.extend({
  classNames: ['channel-entry'],
  attributeBindings: ['channel'],
  store: service(),
  router: service('-routing'),
  init() {
    var channel = get(this, 'channel');
    this.set('subscriptions', get(this, 'store').query('subscription', {
      filter: { userId: get(this, 'session.account.id'),
        channelId: get(channel, 'id') }
    }));
    this._super(...arguments);
  },

  subscribe: task(function * (channel) {
    const user = get(this, 'session.account');
    const store = get(this, 'store');
    const subscription = store.createRecord('subscription', { user, channel });

    yield subscription.save();
    this.set('subscriptions', get(this, 'store').query('subscription', {
      filter: { userId: get(this, 'session.account.id'),
        channelId: get(channel, 'id') }
    }));
    get(this, 'router').transitionTo('dashboard.all', channel);
  }).drop(),

  unsubscribe: task(function * (channel) {
    let subscriptions = yield get(this, 'store').query('subscription', {
      filter: { userId: get(this, 'session.account.id'),
        channelId: get(channel, 'id') }
    });
    yield subscriptions.forEach((subscription) => subscription.destroyRecord());
    this.set('subscriptions', get(this, 'store').query('subscription', {
      filter: { userId: get(this, 'session.account.id'),
        channelId: get(channel, 'id') }
    }));
  }).drop()
});
