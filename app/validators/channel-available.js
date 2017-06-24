import service from 'ember-service/inject';
import get from 'ember-metal/get';
import BaseValidator from 'ember-cp-validations/validators/base';

const ChannelAvailable = BaseValidator.extend({
  store: service(),

  validate(slug) {
    return this.get('store').query('channel', {
      filter: { slug }
    })
    .then((result) => {
      if (get(result, 'length') === 0) {
        return true;
      } else {
        return 'This channel already exists';
      }
    });
  }
});

ChannelAvailable.reopenClass({
  /**
  * Define attribute specific dependent keys for your validator
  *
  * [
  * 	`model.array.@each.${attribute}` --> Dependent is created on the model's context
  * 	`${attribute}.isValid` --> Dependent is created on the `model.validations.attrs` context
  * ]
  *
  * @param {String}  attribute   The attribute being evaluated
  * @param {Unknown} options     Options passed into your validator
  * @return {Array}
  */
  getDependentsFor(/* attribute, options */) {
    return [];
  }
});

export default ChannelAvailable;
