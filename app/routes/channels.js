import Route from 'ember-route';
import get from 'ember-metal/get';

export default Route.extend({
  model() {
    if (get(this, 'session.hasUser')) {
      return get(this, 'store').findAll('channel');
    }
  }
});
