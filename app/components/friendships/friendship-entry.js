import Ember from 'ember';

export default Ember.Component.extend({
    actions: {
        accept(friendship) {
            friendship.set("confirmed", true);
            friendship.save();
        },

        decline(friendship) {
            friendship.destroyRecord();
        }
    }
});
