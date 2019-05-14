'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongooseUniqueValidator = require('mongoose-unique-validator');

const eventsSchema = new Schema({
  description: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  imageLink: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  streetAddress: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  cost: {
    type: Number,
    required: true
  }
});

eventsSchema.plugin(mongooseUniqueValidator);

module.exports = mongoose.model('Events', eventsSchema);