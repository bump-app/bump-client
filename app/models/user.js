import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { hasMany } from 'ember-data/relationships';
import { buildValidations, validator } from 'ember-cp-validations';

const Validations = buildValidations({
    first_name: validator('presence', true),

    last_name: validator('presence', true),

    email: [
        validator('presence', true),
        validator('format', {
            lazy: false,
            type: 'email',
            message: 'Email is not valid'
        }),
        validator('email-available', { debounce: 500 })
    ],

    password: [
        validator('presence', true),
        validator('length', {
            min: 4
        })
    ],

    confirm_password: [
        validator('presence', true),
        validator('confirmation', {
            on: 'password',
            message: 'Passwords do not match'
        })
    ], 
});

export default Model.extend(Validations, {
  first_name: attr('string'),
  last_name: attr('string'),
  email: attr('string'),
  password: attr('string'),
  /*confirm_password: attr('string'),*/
  posts: hasMany('post'),
});
