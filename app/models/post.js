import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { belongsTo } from 'ember-data/relationships';

export default Model.extend({
  link: attr('string'),
  linkFormatted: attr('string'),
  text: attr('string'),
  createdAt: attr('utc'),
  updatedAt: attr('utc'),
  user: belongsTo('user'),
  channel: belongsTo('channel'),
});
