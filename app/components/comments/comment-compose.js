import Component from 'ember-component';
import get, { getProperties } from 'ember-metal/get';
import set from 'ember-metal/set';
import computed from 'ember-computed';
import service from 'ember-service/inject';
import { invokeAction } from 'ember-invoke-action';
import { next } from 'ember-runloop';
import { isEmpty } from 'ember-utils';
import $ from 'jquery';

export default Component.extend({
  classNames: ['comment-compose'],
  expanded: false,
  store: service(),

  editing: computed('text', function() {
    return !isEmpty(get(this, 'text'));
  }).readOnly(),

  reset() {
    set(this, 'text', null);
    set(this, 'expanded', false);
  },

  actions: {
    expand() {
      set(this, 'expanded', true);
      next(() => {
        $('.comment-compose-link').focus();
      });
    },

    collapse() {
      if (!get(this, 'editing')) {
        set(this, 'expanded', false);
      }
    },

    create() {
      const store = get(this, 'store');
      const { text, post } = getProperties(this, 'text', 'post');
      const user = get(this, 'session.account');
      const comment = store.createRecord('comment', { text, user, post });
      comment.save().then((createdComment) => {
        invokeAction(this, 'insertComment', createdComment);
        this.reset();
      });
    }
  }
});
