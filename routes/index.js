const express = require('express');
const router = express.Router();
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');

// Welcome Page
router.get('/', forwardAuthenticated, (req, res) => res.render('welcome'));

// Lawyers Dashboard
router.get('/lawyersdashboard', ensureAuthenticated, (req, res) =>
  res.render('lawyersdashboard')
);

// Dashboard
router.get('/dashboard', ensureAuthenticated, (req, res) =>
  res.render('dashboard', {
    user: req.user
  })

  
);
module.exports = router;