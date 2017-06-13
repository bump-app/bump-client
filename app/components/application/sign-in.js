import Component from 'ember-component';
import get, { getProperties } from 'ember-metal/get';
import { buildValidations, validator } from 'ember-cp-validations';
import service from 'ember-service/inject';
import { invokeAction } from 'ember-invoke-action';

const Validations = buildValidations({
  email: [
    validator('presence', true),
    validator('format', { type: 'email' })
  ],
  password: [ validator('presence', true) ]
});

export default Component.extend(Validations, {
  classNames: ['sign-in'],
  router: service('-routing'),
  notify: service('notify'),

  actions: {
    authenticate() {
      const { email, password } = getProperties(this, 'email', 'password');
      get(this, 'session').authenticateWithOAuth2(email, password).then(() => {
        invokeAction(this, 'onClose');
        get(this, 'router').transitionTo('dashboard.all');
      }).catch((error) => {
        get(this, 'notify').warning(error.error_description);
      });
    }
  }
});
