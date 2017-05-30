import Ember from 'ember';
import service from 'ember-service/inject';
import get from 'ember-metal/get';

// FIXME better to use a custom endpoint to get user using auth
export default Ember.Service.extend({
    session: service(),
    store: service(),
    load(email) {
        // This check shouldn't be needed but load might be called from
        // somwhere else other than sign-in
        if(get(this, 'session.isAuthenticated')) {
            const store = get(this, 'store');
            return store.query('user', {
                filter: `[${JSON.stringify({
                    name: 'email',
                    op: 'eq',
                    val: email
                })}]`,
                // don't know how .channel works on subscriptions which is a
                // list of subscription
                include: 'subscriptions.channel'
            })
            .then(users => {
                let user = get(users, 'firstObject');
                this.set('user', user);
                localStorage.setItem('userid', JSON.stringify(user.id));
                return user;
            });
            /*.then(user => localStorage.setItem('userid', JSON.stringify(user.id)));*/
        }
    },

    async getuser() {

        var user = get(this, 'user');
        if(user) {
            return user;
        } else {
            const store = get(this, 'store');
            var foundUserId = JSON.parse(localStorage.userid);
            return store.query('user', {
                filter: `[${JSON.stringify({
                    name: 'id',
                    op: 'eq',
                    val: foundUserId
                })}]`,
                include:'subscriptions.channel'})
                .then(users => {
                    let user = get(users, 'firstObject');
                    this.set('user', user);
                    return user;
                });
        }
    }
});
