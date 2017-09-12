import Component from 'ember-component';
import service from 'ember-service/inject';

export default Component.extend({
  classNames: ['friendship-entry'],
  store: service(),

  actions: {
    accept(friendship) {
      var setting = friendship.get('friendship_setting');
      setting.set('confirmed', true);
      setting.get('content').save();
      /*friendship.set('friendship_setting.confirmed', true);*/
      setting.save();
    },

    // TODO: save decline status instead of deleting record
    remove(friendship) {
      friendship.destroyRecord();
    }
  }
});
