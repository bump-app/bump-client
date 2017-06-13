import Ember from 'ember';
import Component from 'ember-component';
import { alias, and, notEmpty, readOnly } from 'ember-computed';
import get from 'ember-metal/get';
import set from 'ember-metal/set';

export default Component.extend({
  classNames: ['validated-input'],
  model: null,
  value: null,
  type: 'text',
  valuePath: '',
  placeholder: '',
  validation: null,
  showValidations: false,

  error: alias('validation.error.message').readOnly(),
  warning: alias('validation.warningMessage').readOnly(),
  hasContent: notEmpty('value').readOnly(),
  isValid: and('hasContent', 'validation.isTruelyValid').readOnly(),

  init() {
    this._super(...arguments);
    let valuePath = get(this, 'valuePath');

    Ember.defineProperty(this, 'validation', readOnly(`model.validations.attrs.${valuePath}`));
    Ember.defineProperty(this, 'value', alias(`model.${valuePath}`));
  },

  focusOut() {
    this._super(...arguments);
    set(this, 'showValidations', true);
  }
});
