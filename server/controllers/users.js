
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const jwtSecret = process.env.JWT_KEY;

exports.createUser = (req, res, next) => {
  bcrypt.hash(req.body.password, 10)
    .then(hash => {
      const user = new User({
        email: req.body.email,
        password: hash
      });

      user.save()
        .then(result => {
          res.status(201).json({
            message: 'User Created',
            result: result
          })
        })
        .catch(err => {
          res.status(500).json({
            message: 'Invalid credentials'
          });
        });
  });
};

exports.login = (req, res, next) => {
  let fetchedUser = {};

  User.findOne({'email' : req.body.email})
    .then(user => {
      if(!user) {
        return res.status(401).json({
          message: 'User not found'
        });
      }
      fetchedUser = user;
      return bcrypt.compareSync(req.body.password, fetchedUser.password);
    })
    .then(result => {
      if(!result) {
        return res.status(401).json({
          message: 'Invalid Login Credentials'
        });
      }

      // So far so good... createw JWT
      const token = jwt.sign(
        { email: fetchedUser.email, userId: fetchedUser._id },
        jwtSecret,
        { expiresIn: '1h' }
      );

      return res.status(200).json({
        token: token,
        expiresIn: 3600,
        userId: fetchedUser._id
      });
    })
    .catch(err => {
      console.log(err);
      return res.status(401).json({
        message: 'Login Failed',
        error: err
      });
  });
};
