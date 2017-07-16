import Component from 'ember-component';
import get from 'ember-metal/get';
import computed from 'ember-computed';

export default Component.extend({
  classNames: ['comment-view'],
  editing: false,

  owner: computed('session', 'comment', function() {
    return get(this, 'session.account.id') == get(this, 'comment.user.id');
  }).readOnly(),
  
  actions: {
    delete_comment(comment) {
      // add confirmation popup?
      comment.destroyRecord();
    }
  }

});
