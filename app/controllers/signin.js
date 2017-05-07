import Controller from 'ember-controller';
import service from 'ember-service/inject';
import get, { getProperties } from 'ember-metal/get';
import set from 'ember-metal/set';
import { buildValidations, validator } from 'ember-cp-validations';

const Validations = buildValidations({
    email: [
        validator('presence', true),
        validator('format', { type: 'email' })
    ],
    password: [
        validator('presence', true)
    ]
});

export default Controller.extend(Validations, {
  session: service(),

  actions: {
    authenticate() {
      const { email, password } = getProperties(this, 'email', 'password');
      get(this, 'session')
        .authenticate('authenticator:oauth2', email, password)
        .catch(reason => set(this, 'errorMessage', 'Wrong email or password'));
    }
  }
});
