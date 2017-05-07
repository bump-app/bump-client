import Ember from 'ember';
import get from 'ember-metal/get';

export default Ember.Route.extend({
    model() {
        return get(this,'store').createRecord('user');
    }
});
