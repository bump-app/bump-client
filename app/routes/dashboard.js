import Route from 'ember-route';
import get from 'ember-metal/get';

export default Route.extend({
  model() {
    if (get(this, 'session.hasUser')) {
      return get(this, 'store').query('subscription', {
        filter: { userId: get(this, 'session.account.id') },
        include: 'channel'
      });
    }
    else this.transitionTo('about');
  },
});
