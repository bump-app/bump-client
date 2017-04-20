import Component from 'ember-component';
import get, { getProperties } from 'ember-metal/get';
import set, { setProperties } from 'ember-metal/set';
import service from 'ember-service/inject';
import { next } from 'ember-runloop';
import $ from 'jquery';

export default Component.extend({
  store: service(),

  classNames: ['post-compose'],

  expanded: false,

  actions: {
    expand() {
      set(this, 'expanded', true);
      next(() => {
        $('.post-compose-link').focus();
      });
    },

    async create() {
      const store = get(this, 'store');
      const { link, text } = getProperties(this, 'link', 'text');
      const post = store.createRecord('post', { link, text });
      const user = await store.findRecord('user', 1);
      const channel = await store.findRecord('channel', 1);
      setProperties(post, { user, channel });
      post.save();
    }
  }
})
