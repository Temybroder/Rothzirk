const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
// Load Lawyers model

const { forwardAuthenticated } = require('../config/auth');

// Login Page
router.get('/lawyerslogin', forwardAuthenticated, (req, res) => res.render('lawyerslogin'));

// Register Page
router.get('/lawyersregister', forwardAuthenticated, (req, res) => res.render('lawyersregister'));

// Register
router.post('/lawyersregister', (req, res) => {
  const { name, email, password, password2 } = req.body;
  let errors = [];

  if (!name || !email || !password || !password2) {
    errors.push({ msg: 'Please enter all fields' });
  }

  if (password != password2) {
    errors.push({ msg: 'Passwords do not match' });
  }

  if (password.length < 6) {
    errors.push({ msg: 'Password must be at least 6 characters' });
  }

  if (errors.length > 0) {
    res.render('register', {
      errors,
      name,
      email,
      password,
      password2
    });
  } else {
    Lawyer.findOne({ email: email }).then(user => {
      if (user) {
        errors.push({ msg: 'Email already exists' });
        res.render('register', {
          errors,
          name,
          email,
          password,
          password2
        });
      } else {
        const newLawyer = new Lawyer({
          name,
          email,
          password
        });

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newLawyer.password, salt, (err, hash) => {
            if (err) throw err;
            newLawyer.password = hash;
            newLawyer
              .save()
              .then(user => {
                req.flash(
                  'success_msg',
                  'You are now registered and can log in'
                );
                res.redirect('/users/login');
              })
              .catch(err => console.log(err));
          });
        });
      }
    });
  }
});

// Login
router.post('/lawyerslogin', (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/lawyersdashboard',
    failureRedirect: '/lawyersusers/lawyerslogin',
    failureFlash: true
  })(req, res, next);
});

// Logout
router.get('/logout', (req, res) => {
  req.logout();
  req.flash('success_msg', 'You are logged out');
  res.redirect('/lawyersusers/lawyerslogin');
});

// module.exports = router;
