import Controller from 'ember-controller';
import get, { getProperties } from 'ember-metal/get';

export default Controller.extend({
  actions: {
    register() {
      const user = get(this, 'model');

      user.validate().then(({ validations }) => {
        if (get(validations, 'isValid')) {
          user.save().then(() => {
            const { email, password } = getProperties(user, 'email', 'password');
            get(this, 'session').authenticateWithOAuth2(email, password).then(() => {
              this.transitionToRoute('dashboard.all');
            });
          });
        }
      });
    }
  }
});
