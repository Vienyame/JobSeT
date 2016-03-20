/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /contacts              ->  index
 * POST    /contacts              ->  create
 * GET     /contacts/:id          ->  show
 * PUT     /contacts/:id          ->  update
 * DELETE  /contacts/:id          ->  destroy
 */

'use strict';

var _ = require('lodash');
var Contact = require('./contact.model');

//Get Contacts list
exports.index = function(req, res){
    Contact.find(function(err, contacts){
        if(err){return handleError(res, err);}
        return res.status(200).json(contacts);
    });
};

//Get a single contact
exports.show = function(req, res){
    Contact.findById(req.params.id, function(err, contact){
        if(err){return handleError(res, err);}
        if(!contact){return res.status(404).send('Not Found');}
        return res.json(contact);
    })
};

//Create a new contact in DB
exports.create = function(req, res){
    Contact.create(req.body, function(err, contact){
        if(err){return handleError(res, err);}
        return res.status(201).json(contact);
    });
};

//Update an existant contact in DB
exports.update = function(req, res){
if(req.body._id){delete req.body._id;}
    Contact.findById(req.params.id, function(err, contact){
        if(err){return handleError(res, err);}
        if(!contact){return res.status(404).send('Not Found');}
        var updated = _.merge(contact, req.body);
        updated.save(function(err){
            if(err){return handleError(res, err);}
            return res.status(200).json(contact);
        });
    })
};

//Delete a contact in DB
exports.destroy = function(req, res){
    Contact.findById(req.params.id, function(err, contact){
        if(err){return handleError(res, err);}
        if(!contact){return res.status(404).send('Not Found');}
        contact.remove(function(err){
            if(err){return handleError(res, err);}
            return res.status(204).send('No Content');
        });
    })
};

function handleError(res, err){
    return res.status(500).send(err);
}