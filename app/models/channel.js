import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { hasMany } from 'ember-data/relationships';
import { buildValidations, validator } from 'ember-cp-validations';

const Validations = buildValidations({
    name: [
        validator('presence', true),
        validator('channel-available', { 
            /*lazy: false,*/
            debounce: 500 })
    ]//,
    /*description: [*/
    /*validator('presence', true)*/
    /*]*/
});

export default Model.extend(Validations, {
  name: attr('string'),
  description: attr('string'),
  posts: hasMany('post'),
});
