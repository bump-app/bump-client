import JSONAPISerializer from 'ember-data/serializers/json-api';
import { decamelize } from 'ember-string';

export default JSONAPISerializer.extend({
  keyForAttribute(key) {
    return decamelize(key);
  },

  keyForRelationship(key) {
    return decamelize(key);
  }
});
