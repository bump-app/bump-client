import Route from 'ember-route';
import get from 'ember-metal/get';
import set from 'ember-metal/set';

export default Route.extend({
  model({ name }) {
    const dashboardController = this.controllerFor('dashboard');
    set(dashboardController, 'channelName', name);
    return get(this, 'store').query('channel', {
      filter: { slug: name }
    }).then(records => get(records, 'firstObject'));
  },
});
