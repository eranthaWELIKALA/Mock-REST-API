'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var ResponseSchema = new Schema({
  name: {
    type: String,
    required: 'Response name is required'
  },
  Created_date: {
    type: Date,
    default: Date.now
  },
  response: {
    type: String,
    required: 'Response object is required'
  },
  isSelected: {
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.model('Response', ResponseSchema);