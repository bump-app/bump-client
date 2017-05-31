import Route from 'ember-route';
import get from 'ember-metal/get';
import service from 'ember-service/inject';

export default Route.extend({
  session: service(),
  currentUser: service(),

  model() {
    const store = get(this, 'store');
    return get(this, 'currentUser').getuser().then(user => {
      const subscribed = get(user, 'subscriptions').map(sub => sub.get('channel.name'));
      return store.query('channel', {
        filter: `[${JSON.stringify({
          name: 'name',
          op: 'notin',
          val: subscribed
        })}]`
      });
    });
  },
});
