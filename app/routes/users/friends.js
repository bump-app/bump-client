import Ember from 'ember';
import get from 'ember-metal/get';

export default Ember.Route.extend({
    model(){
        if (get(this, 'session.hasUser')) {
            const user = get(this, 'session.account');

            var requests_received = get(this, 'store').query('friendship', {
                filter: `[${JSON.stringify({
                    name: 'friend',
                    op: 'has',
                    val: {
                        name: 'id',
                        op: 'eq',
                        val: user.id
                    }
                })}]`,
                include: 'user,friend'
            });

            var requests_sent = get(this, 'store').query('friendship', {
                filter: `[${JSON.stringify({
                    name: 'user',
                    op: 'has',
                    val: {
                        name: 'id',
                        op: 'eq',
                        val: user.id
                    }
                })}]`,
                include: 'user,friend'
            })

            return Ember.RSVP.hash({
                requests_sent: requests_sent,
                requests_received: requests_received
            });
        }
        else this.transitionTo('about');
    },

    setupController(controller, models) {
        controller.setProperties(models);
    }
});
