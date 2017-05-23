import Ember from 'ember';
import get, { getProperties } from 'ember-metal/get';

export default Ember.Component.extend({
    classNames: ['channel-entry'],
    attributeBindings: ['channel'],
    actions: {
        subscribe(channel) {
            console.log("hi");
            /*channel = get(this, 'channel');*/
            console.log(channel.get('name'));
        }
    }

});
