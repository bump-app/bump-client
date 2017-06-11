import Route from 'ember-route';
import get from 'ember-metal/get';

export default Route.extend({
    model() {
        if(get(this, 'session.hasUser')) {
            const user = get(this, 'session.account');
            return get(this, 'store').query('user', {
                filter: `[${JSON.stringify({
                    name: 'id',
                    op: 'ne',
                    val: user.id
                })}]`
            });
        }
        else this.transitionTo('about');
    }
});
