/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';
// Insert seed models below
var Thing = require('../api/thing/thing.model');
var User = require('../api/user/user.model');
var Contact = require('../api/contact/contact.model');

// Insert seed data below
var thingSeed = require('../api/thing/thing.seed.json');

// Insert seed inserts below
Thing.find({}).remove(function () {
    Thing.create(thingSeed);
});


/*User.find({}).remove(function () {
    User.create({
            provider: "local",
            name: "Test User",
            email: "test@test.com",
            password: "test"
        },
        {
            provider: "local",
            role: "admin",
            name: "Admin",
            email: "admin@admin.com",
            password: "admin"
        }, function () {
            console.log('finished populating users');
        }
    );
});*/
