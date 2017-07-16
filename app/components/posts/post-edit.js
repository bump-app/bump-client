import Component from 'ember-component';
import set from 'ember-metal/set';

export default Component.extend({
  classNames: ['post-edit'],

  actions: {
    save(post) {
      post.save().then(() => set(this, 'editing', false));
    },

    cancel(post) {
      // I don't think ember-change-set is needed here
      post.rollbackAttributes();
      set(this, 'editing', false);
    }
  }

});
