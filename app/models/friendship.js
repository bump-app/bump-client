import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { belongsTo } from 'ember-data/relationships';

export default Model.extend({
  createdAt: attr('utc'),
  /*confirmed: attr('boolean'),*/
  user: belongsTo('user', { inverse: 'sent_friendships' }),
  friend: belongsTo('user', { inverse: 'received_friendships' }),
  friendship_setting: belongsTo('friendship_setting')
});
