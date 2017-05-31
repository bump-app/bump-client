import { moduleFor, test } from 'ember-qunit';

moduleFor('validator:channel-available', 'Unit | Validator | channel-available', {
  needs: ['validator:messages']
});

test('it works', function(assert) {
  var validator = this.subject();
  assert.ok(validator);
});
