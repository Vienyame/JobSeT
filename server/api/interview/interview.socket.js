/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var interview = require('./interview.model');

exports.register = function(socket) {
    interview.schema.post('save', function (doc) {
        onSave(socket, doc);
    });
    interview.schema.post('remove', function (doc) {
        onRemove(socket, doc);
    });
}

function onSave(socket, doc, cb) {
    socket.emit('contact:save', doc);
}

function onRemove(socket, doc, cb) {
    socket.emit('contact:remove', doc);
}