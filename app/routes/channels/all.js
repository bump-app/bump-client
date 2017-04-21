import Route from 'ember-route';
import get from 'ember-metal/get';
import set from 'ember-metal/set';

export default Route.extend({
  model() {
    const channelController = this.controllerFor('channels');
    set(channelController, 'channelName', 'all');
    return get(this, 'store').findAll('channel');
  }
});
