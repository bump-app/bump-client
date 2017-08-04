import Component from 'ember-component';
import set from 'ember-metal/set';

export default Component.extend({
  classNames: ['comment-edit'],

  actions: {
    save(comment) {
      comment.save().then(() => set(this, 'editing', false));
    },

    cancel(comment) {
      // I don't think ember-change-set is needed here
      comment.rollbackAttributes();
      set(this, 'editing', false);
    }
  }

});
