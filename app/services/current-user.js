import Ember from 'ember';
import service from 'ember-service/inject';
import get from 'ember-metal/get';

export default Ember.Service.extend({
    session: service(),
    store: service(),
    load(email) {
        if(get(this, 'session.isAuthenticated')) {
            const store = get(this, 'store');
            return store.query('user', {
                filter: `[${JSON.stringify({
                    name: 'email',
                    op: 'eq',
                    val: email
                })}]`
            })
            .then(users => this.set('user', get(users, 'firstObject')));
        }
    }
});
