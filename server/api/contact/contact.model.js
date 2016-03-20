'use strict';

var restful = require('node-restful');
var mongoose = restful.mongoose;
var Schema = mongoose.Schema;

var ContactSchema = new Schema({
    contactName: String,
    contactFirstname: String,
    contactJob:String,
    contactMail:{ type: String, lowercase: true }
});

module.exports = mongoose.model('Contact', ContactSchema);