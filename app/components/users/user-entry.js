import Component from 'ember-component';
import get from 'ember-metal/get';
import service from 'ember-service/inject';

export default Component.extend({
  classNames: ['user-entry'],
  store: service(),

  actions: {
    befriend(friend) {
      const user = get(this, 'session.account');
      const store = get(this, 'store');
      const friendship = store.createRecord('friendship', {
        user: user,
        friend: friend//,
        /*confirmed: false*/
      });
      friendship.save();
    }
  }
});
