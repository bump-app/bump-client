import Ember from 'ember';
import get from 'ember-metal/get';

export default Ember.Route.extend({
  model(params) {
    let { name } = params;
    return get(this, 'store')
      .query('channel', { filter: { name } })
      .then(records => get(records, 'firstObject'));
  }
});
