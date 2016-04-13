/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /things              ->  index
 * POST    /things              ->  create
 * GET     /things/:id          ->  show
 * PUT     /things/:id          ->  update
 * DELETE  /things/:id          ->  destroy
 */

'use strict';

var _ = require('lodash');
var Opportunity = require('./opportunity.model.js');

// Get list of things
exports.index = function(req, res) {
  Opportunity.find(function (err, opportunities) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(opportunities);
  });
};

// Get a single thing
exports.show = function(req, res) {
  Opportunity.findById(req.params.id, function (err, opportunitie) {
    if(err) { return handleError(res, err); }
    if(!opportunitie) { return res.status(404).send('Not Found'); }
    return res.json(opportunitie);
  });
};

// Creates a new thing in the DB.
exports.create = function(req, res) {
  Opportunity.create(req.body, function(err, opportunitie) {
    if(err) { return handleError(res, err); }
    return res.status(201).json(opportunitie);
  });
};

// Updates an existing thing in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Opportunity.findById(req.params.id, function (err, opportunitie) {
    if (err) { return handleError(res, err); }
    if(!opportunitie) { return res.status(404).send('Not Found'); }
    var updated = _.merge(opportunitie, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(opportunitie);
    });
  });
};

// Deletes a thing from the DB.
exports.destroy = function(req, res) {
  Opportunity.findById(req.params.id, function (err, opportunitie) {
    if(err) { return handleError(res, err); }
    if(!opportunitie) { return res.status(404).send('Not Found'); }
    opportunitie.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}