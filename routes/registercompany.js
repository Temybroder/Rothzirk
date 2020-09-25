const express = require('express');
const router = express.Router();
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');


// Register company
router.get('/registercompany', ensureAuthenticated, (req, res) =>
  res.render('registercompany', {
    user: req.user
  })
);
 

//Register Private Limited Liability company 

router.get('/privatelimited', ensureAuthenticated, (req, res) =>
  res.render('privatelimited', {
    user: req.user
  })
);

//Register Limited by guarantee company 

router.get('/limitedbyguarantee', ensureAuthenticated, (req, res) =>
  res.render('limitedbyguarantee', {
    user: req.user
  })
);


//Register Business Name

router.get('/bizname', ensureAuthenticated, (req, res) =>
  res.render('bizname', {
    user: req.user
  })
);

//Register Cooperative

router.get('/cooperative', ensureAuthenticated, (req, res) =>
  res.render('cooperative', {
    user: req.user
  })
);
 




module.exports = router;