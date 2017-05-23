import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('channels', function() {
    this.route('all');
    this.route('show', { path: '/:name' });
  });
  this.route('register');
  this.route('signin');
  this.route('users', { path: '/users/:name' });
  this.route('404', { path: '*' });
  this.route('discover');
});

export default Router;
