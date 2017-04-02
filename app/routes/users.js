import Ember from 'ember';
import get from 'ember-metal/get';

export default Ember.Route.extend({
  model(params) {
    let { name } = params;
    return this.get('store')
      .query('user', { filter: { name } })
      .then(records => get(records, 'firstObject'));
  }
});
