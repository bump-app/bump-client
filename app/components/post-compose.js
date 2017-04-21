import Component from 'ember-component';
import get, { getProperties } from 'ember-metal/get';
import set, { setProperties } from 'ember-metal/set';
import service from 'ember-service/inject';
import { next } from 'ember-runloop';
import { isEmpty } from 'ember-utils';
import $ from 'jquery';

export default Component.extend({
  store: service(),

  classNames: ['post-compose'],

  expanded: false,

  reset() {
    set(this, 'link', null);
    set(this, 'text', null);
    set(this, 'expanded', false);
  },

  actions: {
    expand() {
      set(this, 'expanded', true);
      next(() => {
        $('.post-compose-link').focus();
      });
    },

    collapse() {
      if (isEmpty(get(this, 'link')) && isEmpty(get(this, 'text'))) {
        set(this, 'expanded', false);
      }
    },

    async create() {
      const store = get(this, 'store');
      const { link, text } = getProperties(this, 'link', 'text');
      const post = store.createRecord('post', { link, text });
      const user = await store.findRecord('user', 1);
      const channelId = get(this, 'channelId');
      const channel = await store.findRecord('channel', channelId);
      setProperties(post, { user, channel });
      await post.save();
      get(this, 'model.content').insertAt(0, post._internalModel);
      this.reset();
    }
  }
})
