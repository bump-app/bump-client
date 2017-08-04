import Component from 'ember-component';
import service from 'ember-service/inject';
import set from 'ember-metal/set';

export default Component.extend({
  classNames: ['friendship-entry'],
  store: service(),

  actions: {
    accept(friendship) {
      friendship.set('confirmed', true);
      friendship.save();
    },

    // TODO: save decline status instead of deleting record
    remove(friendship) {
      friendship.destroyRecord();
    }
  }
});
