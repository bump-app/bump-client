import Route from 'ember-route';
import get from 'ember-metal/get';

export default Route.extend({
  model(params) {
    const { id } = params;
    const user = get(this, 'store')
      .query('user', {
        filter: { id }
      })
      .then(records => get(records, 'firstObject'));

    const all_friends = get(this, 'store')
      .query('user', {
        filter: {
          all_friends: true
        }
      });
    
    return Ember.RSVP.hash({
      user: user,
      all_friends: all_friends
    });
  }
});
