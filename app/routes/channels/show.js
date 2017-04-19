import Route from 'ember-route';
import get from 'ember-metal/get';
import set from 'ember-metal/set';

export default Route.extend({
  model(params) {
    const { name } = params;
    const channelController = this.controllerFor('channels');
    set(channelController, 'currentChannel', name);
    return get(this, 'store')
      .query('channel', {
        filter: `[${JSON.stringify({
          name: 'name',
          op: 'eq',
          val: name
        })}]`,
        include: 'posts'
      })
      .then(records => get(records, 'firstObject'))
      .then(channel => get(channel, 'posts'));
  },
});
