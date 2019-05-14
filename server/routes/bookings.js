const express = require('express');
const router = express.Router();
const Bookings = require('../models/booking');
const User = require('../models/user');

/* Get bookings. */
router.get('/byUser/:userId', function (req, res, next) {

  const userId = req.params.userId;

  Bookings.find({ 'user._id' : userId})
    .exec(function (err, bookings) {
      if (err) {
        return res.status(500).json({
          title : 'An error occurred',
          error : err
        });
      }
      res.status(200).json({
        message : 'Success',
        obj : bookings
      });
    });
});

router.get('/byId/:id', function (req, res, next) {

  const _id = req.params.id;

  Bookings.findOne({ 'booking._id' : _id})
    .exec(function (err, bookings) {
      if (err) {
        return res.status(500).json({
          title : 'An error occurred',
          error : err
        });
      }
      res.status(200).json({
        message : 'Success',
        obj : bookings
      });
    });
});

/* Creating bookings */
router.post('/', function (req, res, next) {

  let booking = new Bookings({
    event : req.body.event,
    user : req.body.user,
    numberOfTickets : req.body.numberOfTickets,
    bookingDate: req.body.bookingDate,
    amount: req.body.amount
  });

  booking.save(function (err, result) {
    if (err) {
      return res.status(500).json({
        title : 'Error while booking',
        error : err
      });
    }
    res.status(201).json({
      title : 'Booking done',
      obj : result
    });
  });
});

module.exports = router;