/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /interviews              ->  index
 * POST    /interviews              ->  create
 * GET     /interviews/:id          ->  show
 * PUT     /interviews/:id          ->  update
 * DELETE  /interviews/:id          ->  destroy
 */

'use strict';

var _ = require('lodash');
var Interview = require('./interview.model');

//Get Contacts list
exports.index = function(req, res){
    Interview.find(function(err, interviews){
        if(err){return handleError(res, err);}
        return res.status(200).json(interviews);
    });
};

//Get a single contact
exports.show = function(req, res){
    Interview.findById(req.params.id, function(err, interview){
        if(err){return handleError(res, err);}
        if(!interview){return res.status(404).send('Not Found');}
        return res.json(interview);
    })
};

//Create a new contact in DB
exports.create = function(req, res){
    Interview.create(req.body, function(err, interview){
        if(err){return handleError(res, err);}
        return res.status(201).json(interview);
    });
};

//Update an existant contact in DB
exports.update = function(req, res){
    if(req.body._id){delete req.body._id;}
    Interview.findById(req.params.id, function(err, interview){
        if(err){return handleError(res, err);}
        if(!interview){return res.status(404).send('Not Found');}
        var updated = _.merge(interview, req.body);
        updated.save(function(err){
            if(err){return handleError(res, err);}
            return res.status(200).json(interview);
        });
    })
};

//Delete a contact in DB
exports.destroy = function(req, res){
    Interview.findById(req.params.id, function(err, interview){
        if(err){return handleError(res, err);}
        if(!interview){return res.status(404).send('Not Found');}
        interview.remove(function(err){
            if(err){return handleError(res, err);}
            return res.status(204).send('No Content');
        });
    })
};

function handleError(res, err){
    return res.status(500).send(err);
}