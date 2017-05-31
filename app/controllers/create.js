import Ember from 'ember';
import service from 'ember-service/inject';
import get, { getProperties } from 'ember-metal/get';
import set from 'ember-metal/set';
import { buildValidations, validator } from 'ember-cp-validations';


export default Ember.Controller.extend({
    store: service(),
    actions: {
        create() {
            var channel = get(this, 'model');
            channel.validate()
                .then(({ validations }) => {
                    if (validations.get('isValid')) {
                    const description = "temp";
                    channel.set('description', description);
                    channel.save();
                    }
                });
        }
    }


});
