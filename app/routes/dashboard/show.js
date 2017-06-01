import Route from 'ember-route';
import get from 'ember-metal/get';
import set from 'ember-metal/set';

export default Route.extend({
  model({ name }) {
    const dashboardController = this.controllerFor('dashboard');
    set(dashboardController, 'channelName', name);
    return get(this, 'store').query('channel', {
      filter: `[${JSON.stringify({
        name: 'name',
        op: 'eq',
        val: name
      })}]`
    }).then(records => get(records, 'firstObject'));
  },
});
