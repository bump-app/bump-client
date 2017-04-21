import Route from 'ember-route';
import get from 'ember-metal/get';
import set from 'ember-metal/set';

export default Route.extend({
  model(params) {
    const { name } = params;
    const channelController = this.controllerFor('channels');
    set(channelController, 'currentChannel', name);
    const store = get(this, 'store');
    return store.query('channel', {
      filter: `[${JSON.stringify({
        name: 'name',
        op: 'eq',
        val: name
      })}]`
    })
    .then(records => get(records, 'firstObject'))
    .then((channel) => {
      return store.query('post', {
        filter: `[${JSON.stringify({
          name: 'channel',
          op: 'has',
          val: {
            name: 'id',
            op: 'eq',
            val: get(channel, 'id')
          }
        })}]`,
        sort: '-created_at'
      });
    });
  },
});
