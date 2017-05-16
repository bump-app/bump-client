import Ember from 'ember';
import get, { getProperties } from 'ember-metal/get';

export default Ember.Controller.extend({
    actions: {
        register() {
            const user = get(this, 'model');

            user.validate()
                .then(({ validations }) => {
                    if (validations.get('isValid')) {
                        user.save();
                        this.transitionToRoute('index')
                    }
                });
        }
    }
});
