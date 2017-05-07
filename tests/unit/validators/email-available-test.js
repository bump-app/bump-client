import { moduleFor, test } from 'ember-qunit';

moduleFor('validator:email-available', 'Unit | Validator | email-available', {
  needs: ['validator:messages']
});

test('it works', function(assert) {
  var validator = this.subject();
  assert.ok(validator);
});
