import Ember from 'ember';
import Route from 'ember-route';
import get from 'ember-metal/get';

export default Route.extend({
  model() {
    const users = get(this, 'store').query('user', {
      filter: {
        available_users_to_friend: true
      }
    });

    const pending_friends = get(this, 'store').query('friendship', {
      filter: {
        confirmed_friends: false
      }
    });

    const sent = get(this, 'store').query('friendship', {
      filter: {
        sent: true
      }
    });

    const received = get(this, 'store').query('friendship', {
      filter: {
        received: true
      }
    });

    const friends = get(this, 'store').query('friendship', {
      filter: {
        confirmed_friends: true
      }
    });

    return Ember.RSVP.hash({
      users: users,
      sent: sent,
      received: received,
      friends: friends,
      pending_friends: pending_friends
    });
  }
});
