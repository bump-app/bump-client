import JSONAPISerializer from 'ember-data/serializers/json-api';
import { camelize } from 'ember-string';

export default JSONAPISerializer.extend({
  keyForAttribute(key) {
    return camelize(key);
  },

  keyForRelationship(key) {
    return camelize(key);
  }
});
