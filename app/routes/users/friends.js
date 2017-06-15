import Ember from 'ember';
import get from 'ember-metal/get';

export default Ember.Route.extend({
    model(){
        if (get(this, 'session.hasUser')) {
            const id = get(this, 'session.account.id');
            return get(this, 'store')
                .query('user', {
                    filter: `[${JSON.stringify({
                        name: 'id',
                        op: 'eq',
                        val: id
                    })}]`,
                    include: 'subscriptions.channel,posts.user,friendships_sent.user,friendships_recieved.user,friendships_sent.friend,friendships_recieved.friend' 
                })
            .then(records => get(records, 'firstObject')).then(user=>{

            var requests_received = get(this, 'store').query('friendship', {
                filter: `[${JSON.stringify({
                    "and": [
                        {
                            name: 'confirmed',
                            op: 'eq',
                            val: false
                        },
                        {
                            name: 'friend',
                            op: 'has',
                            val: {
                                name: 'id',
                                op: 'eq',
                                val: id
                            }
                        }
                    ]
                })}]`,
                include: 'user,friend'
            });

            var requests_sent = get(this, 'store').query('friendship', {
                filter: `[${JSON.stringify({
                    "and": [
                        {
                            name: 'confirmed',
                            op: 'eq',
                            val: false
                        },
                        {
                            name: 'user',
                            op: 'has',
                            val: {
                                name: 'id',
                                op: 'eq',
                                val: id
                            }
                        }
                    ]
                })}]`,
                include: 'user,friend'
            });

            var friends = get(this, 'store').query('friendship', {
                filter: `[${JSON.stringify({
                    "and": [
                        {
                            name: 'confirmed',
                            op: 'eq',
                            val: true
                        },
                        {
                            "or": [
                                {
                                    name: 'user',
                                    op: 'has',
                                    val: {
                                        name: 'id',
                                        op: 'eq',
                                        val: id
                                    }
                                },
                                {
                                    name: 'friend',
                                    op: 'has',
                                    val: {
                                        name: 'id',
                                        op: 'eq',
                                        val: id
                                    }
                                }
                            ]
                        }
                    ]
                })}]`,
                include: 'user,friend'
            });

            return Ember.RSVP.hash({
                requests_sent: requests_sent,
                requests_received: requests_received,
                friends: friends
            });
            });
        }
        else this.transitionTo('about');
    },

    setupController(controller, models) {
        controller.setProperties(models);
    }
});
