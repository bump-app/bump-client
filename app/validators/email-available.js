import service from 'ember-service/inject';
import get from 'ember-metal/get';
import BaseValidator from 'ember-cp-validations/validators/base';

const EmailAvailable = BaseValidator.extend({
  store: service(),

  validate(email) {
    return this.get('store').query('user', {
      filter: { email }
    }).then((result) => {
      if (get(result, 'length') === 0) {
        return true;
      } else {
        return 'The email is already in use';
      }
    });
  }
});

EmailAvailable.reopenClass({
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

export default EmailAvailable;
