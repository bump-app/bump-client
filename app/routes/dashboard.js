import Route from 'ember-route';
import get from 'ember-metal/get';

export default Route.extend({
  model() {
    if (get(this, 'session.hasUser')) {
      const user = get(this, 'session.account');
      return get(this, 'store').query('subscription', {
        filter: `[${JSON.stringify({
          name: 'user',
          op: 'has',
          val: {
            name: 'id',
            op: 'eq',
            val: user.id
          }
        })}]`,
        include: 'channel'
      });
    }
    else this.transitionTo('about');
  },
});
