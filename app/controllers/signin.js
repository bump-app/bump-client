import Controller from 'ember-controller';
import service from 'ember-service/inject';
import get, { getProperties } from 'ember-metal/get';
import set from 'ember-metal/set';

export default Controller.extend({
  session: service(),

  actions: {
    authenticate() {
      const { username, password } = getProperties(this, 'username', 'password');
      get(this, 'session')
        .authenticate('authenticator:oauth2', username, password)
        .catch(reason => set(this, 'errorMessage', reason.error));
    }
  }
})
