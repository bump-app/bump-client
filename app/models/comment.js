import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { belongsTo } from 'ember-data/relationships';

export default Model.extend({
  text: attr('string'),
  rating: attr('integer'),
  createdAt: attr('utc'),
  updatedAt: attr('utc'),
  user: belongsTo('user'),
  post: belongsTo('post')
});
