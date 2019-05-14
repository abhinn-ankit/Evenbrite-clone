'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongooseUniqueValidator = require('mongoose-unique-validator');
const User = require('./user');
const Events = require('./events');

const bookingSchema = new Schema({
  event: { 
      type: Schema.Types.Object,
      ref: 'Events' 
    },
  user: {
    type: Schema.Types.Object,
    ref: 'User'
  },
  numberOfTickets: {
    type: Number
  },
  amount: {
    type: String,
    required: true
  },
  bookingDate: {
    type: Date,
    required: true
  }
}, {
  usePushEach: true
});

bookingSchema.plugin(mongooseUniqueValidator);

module.exports = mongoose.model('Booking', bookingSchema);