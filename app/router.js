import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('channels', { path: '/' }, function() {
    this.route('show', { path: '/:name' });
  });
  this.route('signin');
  this.route('users', { path: '/users/:name' });
});

export default Router;
