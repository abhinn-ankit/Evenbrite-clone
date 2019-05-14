'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongooseUniqueValidator = require('mongoose-unique-validator');

const userSchema = new Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
  },
  bookings: {
    type: Schema.Types.Object,
  }
}, {
  usePushEach: true
});

userSchema.plugin(mongooseUniqueValidator);

module.exports = mongoose.model('User', userSchema);