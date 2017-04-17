import Controller from 'ember-controller';
import service from 'ember-service/inject';

export default Controller.extend({
  session: service(),

  actions: {
    signout() {
      this.get('session').invalidate();
    }
  }
});
