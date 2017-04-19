import Route from 'ember-route';
import get from 'ember-metal/get';

export default Route.extend({
  model(params) {
    const { name } = params;
    return get(this, 'store')
      .query('user', { filter: { name } })
      .then(records => get(records, 'firstObject'));
  }
});
