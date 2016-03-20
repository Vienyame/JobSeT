/**
 * Main application routes
 */

'use strict';

var path = require('path');

module.exports = function(app) {

  // Insert routes below
  app.use('/api/things', require('./api/thing'));
  app.use('/api/users', require('./api/user'));
  app.use('/api/contacts', require('./api/contact'));
  app.use('/api/enterprises', require('./api/enterprise'));
  app.use('/api/interviews', require('./api/interview'));

  app.use('/auth', require('./auth'));
  

};
