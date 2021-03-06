import EmberRouter from 'ember-router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('about');
  this.route('sign-up');
  this.route('sign-in');

  this.route('dashboard', { path: '/' }, function() {
    this.route('all');
    this.route('show', { path: '/:name' });
  });

  this.route('channels', function() {
    this.route('new');
  });

  this.route('users', { path: '/users/:name' });

  this.route('404', { path: '*' });
});

export default Router;
