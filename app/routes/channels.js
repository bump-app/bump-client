import Route from 'ember-route';
import get from 'ember-metal/get';

export default Route.extend({
  model() {
    if (get(this, 'session.hasUser')) {
      return get(this, 'store').findAll('channel').then((channels) => {
        channels.forEach((channel) => {
          get(this, 'store').query('subscription', {
            filter: { userId: get(this, 'session.account.id'),
                      channelId: get(channel, 'id') }
          }).then((subscriptions) => {
            const subscribed = !(get(subscriptions, 'length') === 0);
            channel.set('sub', subscribed);
          });
        });
        return channels;
      });
    }
  }
});
