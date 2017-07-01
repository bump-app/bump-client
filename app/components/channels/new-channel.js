import Component from 'ember-component';
import service from 'ember-service/inject';
import get from 'ember-metal/get';
import { buildValidations, validator } from 'ember-cp-validations';

const Validations = buildValidations({
  name: [
    validator('presence', true),
    validator('channel-available', {
      debounce: 500 })
  ]
});

export default Component.extend(Validations, {
  classNames: ['new-channel'],
  store: service(),

  actions: {
    create() {
      const name = get(this, 'name');
      const channel = get(this, 'store').createRecord('channel');
      channel.set('name', name);

      channel.validate()
        .then(({ validations }) => {
          if (validations.get('isValid')) {
            // FIXME
            const description = "temp";
            channel.set('description', description);
            channel.save();
          }
        });
    }
  }
});
