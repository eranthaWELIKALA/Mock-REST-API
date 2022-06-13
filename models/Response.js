'use strict';
let mongoose = require('mongoose');
let Schema = mongoose.Schema;


let ResponseSchema = new Schema({
  name: {
    type: String,
    unique: true,
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