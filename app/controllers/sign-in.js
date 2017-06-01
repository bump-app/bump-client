import Controller from 'ember-controller';
import get, { getProperties } from 'ember-metal/get';
// import set from 'ember-metal/set';
import { buildValidations, validator } from 'ember-cp-validations';
import service from 'ember-service/inject';

const Validations = buildValidations({
  email: [
    validator('presence', true),
    validator('format', { type: 'email' })
  ],
  password: [ validator('presence', true) ]
});

export default Controller.extend(Validations, {
  router: service('-routing'),

  actions: {
    authenticate() {
      const { email, password } = getProperties(this, 'email', 'password');
      get(this, 'session').authenticateWithOAuth2(email, password)
        .then(() => { get(this, 'router').transitionTo('dashboard.all') })
        // .catch(() => { set(this, 'errorMessage', 'Wrong email or password') });
    }
  }
});
