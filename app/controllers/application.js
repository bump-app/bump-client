import Controller from 'ember-controller';
import service from 'ember-service/inject';
import get from 'ember-metal/get';

export default Controller.extend({
  session: service(),

  actions: {
    logout() {
      get(this, 'session').invalidate();
    }
  }
});
