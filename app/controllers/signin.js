import Controller from 'ember-controller';
import service from 'ember-service/inject';

export default Controller.extend({
  session: service(),

  actions: {
    authenticate() {
      const { username, password } = this.getProperties('username', 'password');
      this.get('session')
        .authenticate('authenticator:oauth2', username, password)
        .catch(reason => this.set('errorMessage', reason.error));
    }
  }
})
