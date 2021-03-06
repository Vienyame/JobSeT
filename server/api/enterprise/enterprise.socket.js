/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var enterprise = require('./enterprise.model');

exports.register = function(socket) {
    enterprise.schema.post('save', function (doc) {
        onSave(socket, doc);
    });
    enterprise.schema.post('remove', function (doc) {
        onRemove(socket, doc);
    });
}

function onSave(socket, doc, cb) {
    socket.emit('contact:save', doc);
}

function onRemove(socket, doc, cb) {
    socket.emit('contact:remove', doc);
}