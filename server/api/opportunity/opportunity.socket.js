/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var opportunity = require('./opportunity.model.js');

exports.register = function(socket) {
  opportunity.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  opportunity.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('thing:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('thing:remove', doc);
}