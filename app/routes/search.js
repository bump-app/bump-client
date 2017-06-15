import Route from 'ember-route';
import get from 'ember-metal/get';

export default Route.extend({
    model() {
        if(get(this, 'session.hasUser')) {
            const id = get(this, 'session.account.id');
            const user = get(this, 'session.account');
            // find all users that have any relationships with account
            return get(this, 'store').query('user', {
                    filter: `[${JSON.stringify({
                        name: 'id',
                        op: 'eq',
                        val: id
                    })}]`,
                    include: 'subscriptions.channel,posts.user,friendships_sent.user,friendships_recieved.user,friendships_sent.friend,friendships_recieved.friend' 
                })
            .then(records => get(records, 'firstObject')).then(user=>{
                console.log(user.get('first_name'));
                let relationships = user.get('friendships_sent').map(f=>f.get('friend.id'));
                let relationships_r = user.get('friendships_recieved').map(f=>f.get('user.id'));
                console.log(relationships_r);
                relationships = relationships.concat(relationships_r);
                console.log(relationships);
                return relationships;
                        
            }).then(relationships => {
                return get(this, 'store').query('user', {
                    filter: `[${JSON.stringify({
                        name: 'id',
                        op: 'notin',
                        val: relationships
                    })}]`
                });
            });
        }
        else this.transitionTo('about');
    }
});
