import Route from 'ember-route';
import get from 'ember-metal/get';
import service from 'ember-service/inject';

export default Route.extend({
  currentUser: service(),

  model() {
    const store = get(this, 'store');
    return get(this, 'currentUser').getuser().then((user) => {
      const subscribed = get(user, 'subscriptions')
        .map(sub => get(sub, 'channel.name'));
      return store.query('channel', {
        filter: `[${JSON.stringify({
          name: 'name',
          op: 'in',
          val: subscribed
        })}]`
      });
    });
  },
});
