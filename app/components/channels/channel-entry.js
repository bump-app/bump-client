import Ember from 'ember';
import get, { getProperties } from 'ember-metal/get';
import service from 'ember-service/inject';

export default Ember.Component.extend({
    classNames: ['channel-entry'],
    attributeBindings: ['channel'],
    store: service(),
    currentUser: service(),
    actions: {
        subscribe(channel) {
            const user = get(this, 'currentUser.user');
            const store = get(this, 'store');
            const subscription = store.createRecord('subscription', { user, channel });
            subscription.save();
            /*this.transitionToRoute('discover');*/

        }
    }

});
