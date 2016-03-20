/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /enterprises              ->  index
 * POST    /enterprises              ->  create
 * GET     /enterprises/:id          ->  show
 * PUT     /enterprises/:id          ->  update
 * DELETE  /enterprises/:id          ->  destroy
 */

'use strict';

var _ = require('lodash');
var Enterprise = require('./enterprise.model');
var User = require('../user/user.model');

//Get Contacts list
exports.index = function (req, res) {
    /*Enterprise.find(function (err, enterprises) {
        if (err) {
            return handleError(res, err);
        }
        return res.status(200).json(enterprises);
    });*/
    var userId = req.user._id;
    console.log(userId);
    Enterprise.find({userID: userId})
        .exec(function (err, enterprises) {
            console.log(enterprises);
            if (err) {
                return handleError(res, err);
            }
            res.status(200).json(enterprises);
           /* if (enterprises.length != 0) {
                res.status(200).json(enterprises);
            }else{
                res.status(200).send('No enterprise found');
            }*/


        });

};

//Get a single contact
exports.show = function (req, res) {
    Enterprise.findById(req.params.id, function (err, enterprise) {
        if (err) {
            return handleError(res, err);
        }
        if (!enterprise) {
            return res.status(404).send('Not Found');
        }
        return res.json(enterprise);
    })
};

//Create a new contact in DB
exports.create = function (req, res) {
    Enterprise.create(req.body, function (err, enterprise) {
        if (err) {
            return handleError(res, err);
        }
        return res.status(201).json(enterprise);
    });
};

//Update an existant contact in DB
exports.update = function (req, res) {
    if (req.body._id) {
        delete req.body._id;
    }
    Enterprise.findById(req.params.id, function (err, enterprise) {
        if (err) {
            return handleError(res, err);
        }
        if (!enterprise) {
            return res.status(404).send('Not Found');
        }
        var updated = _.merge(enterprise, req.body);
        updated.save(function (err) {
            if (err) {
                return handleError(res, err);
            }
            return res.status(200).json(enterprise);
        });
    })
};

//Delete a contact in DB
exports.destroy = function (req, res) {
    Enterprise.findById(req.params.id, function (err, enterprise) {
        if (err) {
            return handleError(res, err);
        }
        if (!enterprise) {
            return res.status(404).send('Not Found');
        }
        enterprise.remove(function (err) {
            if (err) {
                return handleError(res, err);
            }
            return res.status(204).send('No Content');
        });
    })
};

function handleError(res, err) {
    return res.status(500).send(err);
}