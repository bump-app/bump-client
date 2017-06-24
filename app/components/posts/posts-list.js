import Component from 'ember-component';
import service from 'ember-service/inject';
import get from 'ember-metal/get';
import set from 'ember-metal/set';
import { task } from 'ember-concurrency';

export default Component.extend({
  classNames: ['post-list'],
  store: service(),

  init() {
    this._super(...arguments);
    get(this, 'getPosts').perform();
  },

  actions: {
    insertPost(post) {
      get(this, 'feed').insertAt(0, post._internalModel);
    }
  },

  getPosts: task(function* () {
    const posts = yield get(this, 'store').query('post', {
      filter: { channelId: get(this, 'channel.id') },
      include: 'user',
      sort: '-createdAt'
    });
    set(this, 'feed', posts);
  })
});
