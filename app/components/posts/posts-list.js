import Component from 'ember-component';
import service from 'ember-service/inject';
import get from 'ember-metal/get';
import { task } from 'ember-concurrency';

export default Component.extend({
  classNames: ['post-list'],
  store: service(),

  init() {
    this._super(...arguments);
    const channelId = get(this, 'channel.id');
    get(this, 'getPosts').perform(channelId);
  },

  getPosts: task(function* (channelId) {
    return yield get(this, 'store').query('post', {
      filter: `[${JSON.stringify({
        name: 'channel',
        op: 'has',
        val: {
          name: 'id',
          op: 'eq',
          val: channelId
        }
      })}]`,
      include: 'user',
      sort: '-created_at'
    });
  })
});
