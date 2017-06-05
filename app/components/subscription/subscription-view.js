import Ember from 'ember';

export default Ember.Component.extend({
    actions: {
        unsubscribe(subscription) {
            subscription.destroyRecord();
        }
    }
});
