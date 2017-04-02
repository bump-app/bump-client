import Ember from 'ember';
import get from 'ember-metal/get';

export default Ember.Route.extend({
  // model(params) {
  //   let { name } = params;
  //   return this.get('store')
  //     .query('channel', { filter: { name } })
  //     .then(records => get(records, 'firstObject'));
  // }
  model() {
    return [{
      id: 0,
      name: 'all'
    }, {
      id: 1,
      name: 'overwatch'
    }, {
      id: 2,
      name: 'pad'
    }];
  }
});
