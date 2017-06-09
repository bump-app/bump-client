import Ember from 'ember';
import Component from 'ember-component';
import { alias, and, not, notEmpty, or, readOnly } from 'ember-computed';

export default Component.extend({
  classNames: ['validated-input'],
  classNameBindings: ['showErrorClass:has-error', 'isValid:has-success'],
  model: null,
  value: null,
  type: 'text',
  valuePath: '',
  placeholder: '',
  validation: null,
  showValidations: false,
  didValidate: false,

  notValidating: not('validation.isValidating').readOnly(),
  hasContent: notEmpty('value').readOnly(),
  hasWarnings: notEmpty('validation.warnings').readOnly(),
  isValid: and('hasContent', 'validation.isTruelyValid').readOnly(),
  shouldDisplayValidations: or('showValidations', 'didValidate', 'hasContent').readOnly(),

  showErrorClass: and('notValidating', 'showErrorMessage', 'hasContent', 'validation').readOnly(),
  showErrorMessage: and('shouldDisplayValidations', 'validation.isInvalid').readOnly(),
  showWarningMessage: and('shouldDisplayValidations', 'hasWarnings', 'isValid').readOnly(),

  init() {
    this._super(...arguments);
    let valuePath = this.get('valuePath');

    Ember.defineProperty(this, 'validation', readOnly(`model.validations.attrs.${valuePath}`));
    Ember.defineProperty(this, 'value', alias(`model.${valuePath}`));
  },

  focusOut() {
    this._super(...arguments);
    this.set('showValidations', true);
  }
});