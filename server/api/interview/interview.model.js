'use strict';

var restful = require('node-restful');
var mongoose = restful.mongoose;
var Schema = mongoose.Schema;

var InterviewSchema = new Schema({
    interviewDateTime : Date,
    state: {
        type: String,
        default: 'en cours'
    },
    level : {
        interviewLevel :String
    }
});

module.exports = mongoose.model('Interview', InterviewSchema);

