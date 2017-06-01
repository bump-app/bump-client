import Component from 'ember-component';
import get, { getProperties } from 'ember-metal/get';
import set, { setProperties } from 'ember-metal/set';
import computed from 'ember-computed';
import service from 'ember-service/inject';
import { next } from 'ember-runloop';
import { isEmpty } from 'ember-utils';
import $ from 'jquery';

export default Component.extend({
  classNames: ['post-compose'],
  expanded: false,
  store: service(),

  editing: computed('link', 'text', function() {
    return (!isEmpty(get(this, 'link'))) || (!isEmpty(get(this, 'text')));
  }).readOnly(),

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
      if (!get(this, 'editing')) {
        set(this, 'expanded', false);
      }
    },

    create() {
      const store = get(this, 'store');
      const { link, text } = getProperties(this, 'link', 'text');
      const post = store.createRecord('post', { link, text });
      const user = get(this, 'session.account');
      const channel = get(this, 'channel');
      setProperties(post, { user, channel });
      post.save().then(() => {
        get(this, 'model.content').insertAt(0, post._internalModel);
        this.reset();
      });
    }
  }
})
