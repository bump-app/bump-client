import Route from 'ember-route';
import get from 'ember-metal/get';

export default Route.extend({
  model(params) {
    const { id } = params;
    return get(this, 'store')
      .query('user', {
        filter: { id }
      })
      .then(records => get(records, 'firstObject'));
  }
});
