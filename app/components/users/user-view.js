import Component from 'ember-component';
import get from 'ember-metal/get';
import service from 'ember-service/inject';

export default Component.extend({
    store: service(),

    actions: {
        befriend(friend) {
            const user = get(this, 'session.account');
            const store = get(this, 'store');
            const friendship = store.createRecord('friendship', { user, friend, false });
            friendship.save();

            /*get(this, 'router').transitionToRoute('dashboard.all',
             * channel);*/
        }
    }
});
