import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('subscription/subscription-view', 'Integration | Component | subscription/subscription view', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{subscription/subscription-view}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#subscription/subscription-view}}
      template block text
    {{/subscription/subscription-view}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
