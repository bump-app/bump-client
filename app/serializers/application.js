import DS from 'ember-data';
import { camelize } from 'ember-string';

export default DS.JSONAPISerializer.extend({
  keyForAttribute(key) {
    return camelize(key);
  },

  keyForRelationship(key) {
    return camelize(key);
  }
});
