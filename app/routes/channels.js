import Ember from 'ember';
import Route from 'ember-route';
import get from 'ember-metal/get';

export default Route.extend({
    model() {
        /*return get(this, 'store').findAll('channel');*/
        
        if (get(this, 'session.hasUser')) {
            const user = get(this, 'session.account');
            var unsubs = get(this, 'store').query('subscription', {
                filter: `[${JSON.stringify({
                    name: 'user',
                    op: 'has',
                    val: {
                        name: 'id',
                        op: 'eq',
                        val: user.id
                    }
                })}]`,
                include: 'channel'
            }).then(subs=> {
                const subscribed_names = subs.map(sub => sub.get('channel.name'));
                return get(this,'store').query('channel', {
                    filter: `[${JSON.stringify({
                        name: 'name',
                        op: 'notin',
                        val: subscribed_names
                    })}]`
                });
            });

            var subs = get(this, 'store').query('subscription', {
                filter: `[${JSON.stringify({
                    name: 'user',
                    op: 'has',
                    val: {
                        name: 'id',
                        op: 'eq',
                        val: user.id
                    }
                })}]`,
                include: 'channel'
            });
            return Ember.RSVP.hash({
                subscriptions: subs,
                unsubscribed: unsubs
            });
        }
        else this.transitionTo('about');
    },

    setupController(controller, models) {
        controller.setProperties(models);
    }
});
