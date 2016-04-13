'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var OpportunitySchema = new Schema({
  name: String,
  info: String,
  active: Boolean
});

module.exports = mongoose.model('Opportunity', OpportunitySchema);