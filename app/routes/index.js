import Ember from 'ember';
import service from 'ember-service/inject';
import get, { getProperties } from 'ember-metal/get';

export default Ember.Route.extend({
    session: service(),
    beforeModel() {
        // These are the same. 
        /*if (get(this, 'session').get('isAuthenticated')) {*/
        if (get(this, 'session.isAuthenticated')) {
            this.transitionTo('channels.all');
        }
        /*console.log(get(this, 'session').isAuthenticated);*/
    }


});
