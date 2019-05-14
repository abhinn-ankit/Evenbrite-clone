const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

/** User sign in */
router.post('/signin', function (req, res, next) {

  User.findOne({ email : req.body.email }, function (err, user) {
    if (err) {
      return res.status(500).json({
        title : 'Error while signin',
        error : err
      });
    }
    if (!user) {
      return res.status(401).json({
        title : 'login failed',
        error : { message : 'User not found' }
      });
    }
    if (!bcrypt.compareSync(req.body.password, user.password)) {
      return res.status(401).json({
        title : 'login failed',
        error : { message : 'Invalid login credentials' }
      });
    }
    const token = jwt.sign({ user : user }, 'secret', { expiresIn : 3600 });
    res.status(201).json({
      message : 'Login Successful',
      token : token,
      user : user,
      userId : user._id
    });
  });
});

router.get('/:id', function (req, res, next) {
  jwt.verify(req.query.token, 'secret', function (err, decoded) {
    if (err) {
      return res.status(401).json({
        title: 'Not Authenicated',
        error: err
      });
    }
    User.findById(decoded.user._id, function (err, user) {
      if (err) {
        return res.status(500).json({
          title: 'An error occurred',
          error: err
        });
      }
      res.status(201).json({
        message: 'Current User',
        obj: user,
        userId: user._id
      });
    });
  });
});


/** Creating users. */
router.post('/', function (req, res, next) {

  const user = new User({
    firstName : req.body.firstName,
    lastName : req.body.lastName,
    password : bcrypt.hashSync(req.body.password, 10),
    email : req.body.email,
    bookings: req.body.bookings
  });

  user.save(function (err, result) {
    if (err) {
      return res.status(500).json({
        title : 'Error while saving user',
        error : err
      });
    }
    res.status(201).json({
      title : 'User created',
      obj : result
    });
  });
});

/** get list of users */
router.get('/', function (req, res, next) {

  User.find()
    .exec(function (err, users) {
      if (err) {
        return res.status(500).json({
          title : 'An error occurred',
          error : err
        });
      }
      res.status(200).json({
        message : 'Success',
        obj : users
      });
    });
});


module.exports = router;
