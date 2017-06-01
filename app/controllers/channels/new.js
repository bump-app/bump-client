import Ember from 'ember';
import service from 'ember-service/inject';
import get from 'ember-metal/get';

export default Ember.Controller.extend({
  store: service(),

  actions: {
    create() {
      var channel = get(this, 'model');
      channel.validate()
      .then(({ validations }) => {
        if (validations.get('isValid')) {
          const description = "temp";
          channel.set('description', description);
          channel.save();
        }
      });
    }
  }
});
