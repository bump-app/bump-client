import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
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

  this.route('channels');
  this.route('create');

  this.route('users', { path: '/users/:name' });

  this.route('404', { path: '*' });
});

export default Router;
