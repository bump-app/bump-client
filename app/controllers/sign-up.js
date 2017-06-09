import Controller from 'ember-controller';
import get from 'ember-metal/get';

export default Controller.extend({
  actions: {
    register() {
      const user = get(this, 'model');

      user.validate()
        .then(({ validations }) => {
          if (validations.get('isValid')) {
            user.save();
            // this.transitionToRoute('index')
          }
        });
    }
  }
});
