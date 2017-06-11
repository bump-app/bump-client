import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('friendships/friendship-entry', 'Integration | Component | friendships/friendship entry', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{friendships/friendship-entry}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#friendships/friendship-entry}}
      template block text
    {{/friendships/friendship-entry}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
