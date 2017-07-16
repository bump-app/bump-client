import Component from 'ember-component';
import get from 'ember-metal/get';
import computed from 'ember-computed';

export default Component.extend({
  classNames: ['post-view'],
  editing: false,

  owner: computed('session', 'post', function() {
    return get(this, 'session.account.id') == get(this, 'post.user.id');
  }).readOnly(),
  
  actions: {
    delete_post(post) {
      // add confirmation popup?
      post.destroyRecord();
    }
  }

});
