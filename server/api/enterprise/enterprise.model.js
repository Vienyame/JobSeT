'use strict';

var restful = require('node-restful');
var mongoose = restful.mongoose;
var Schema = mongoose.Schema;

var EnterpriseSchema = new Schema({
    _id: {type: Schema.Types.ObjectId, required: true},
    enterpriseName: String,
    enterpriseAddress: String,
    enterpriseSite: String,
    userID: {type: Schema.Types.ObjectId, ref: 'User', required: true},
    sectors: {
        _id: Number,
        activitySector: String
    },
    contacts: [{
        _id: {type: Schema.Types.ObjectId},
        contactName: String,
        contactFirstname: String,
        contactJob: String,
        contactMail: String
    }],
    interviews: [{
        _id: Number,
        interviewDateTime: Date,
        level: {
            _id: Number,
            interviewLevel: String
        }
    }]
});

module.exports = mongoose.model('Enterprise', EnterpriseSchema);