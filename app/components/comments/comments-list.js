import Component from 'ember-component';
import service from 'ember-service/inject';
import get from 'ember-metal/get';
import set from 'ember-metal/set';
import { task } from 'ember-concurrency';

export default Component.extend({
  classNames: ['comment-list'],
  expanded: false,
  store: service(),

  init() {
    this._super(...arguments);
    get(this, 'getComments').perform();
  },

  actions: {
    expand() {
      set(this, 'expanded', true);
    },

    collapse() {
      set(this, 'expanded', false);
    },
    insertComment(comment) {
      get(this, 'comments').pushObject(comment._internalModel);
    }
  },

  getComments: task(function* () {
    const comments = yield get(this, 'store').query('comment', {
      filter: { postId: get(this, 'post.id') },
      include: 'user',
      sort: 'createdAt'
    });
    set(this, 'comments', comments);
  })
});
