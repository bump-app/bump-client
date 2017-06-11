import Route from 'ember-route';
import get from 'ember-metal/get';

export default Route.extend({
  model(params) {
    const { id } = params;
    return get(this, 'store')
      .query('user', {
        filter: `[${JSON.stringify({
          name: 'id',
          op: 'eq',
          val: id
        })}]`,
        include: 'subscriptions.channel,posts.user' 
      })
      .then(records => get(records, 'firstObject'));
  }
});
