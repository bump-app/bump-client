import BaseValidator from 'ember-cp-validations/validators/base';
import service from 'ember-service/inject';

const ChannelAvailable = BaseValidator.extend({
  store: service(),

  validate(value) {
    return this.get('store').query('channel', {
      filter: `[${JSON.stringify({
        name: 'name',
        op: 'eq',
        val: value
      })}]`
    })
    .then((result) => {
      if (result.get('length') === 0) {
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
