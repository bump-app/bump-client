import Route from 'ember-route';
import get from 'ember-metal/get';

export default Route.extend({
  model(params) {
    const { name } = params;
    return get(this, 'store')
      .query('user', {
        filter: `[${JSON.stringify({
          name: 'name',
          op: 'eq',
          val: name
        })}]`
      })
      .then(records => get(records, 'firstObject'))
  }
});
