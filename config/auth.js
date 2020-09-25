let User =  require('../models/User');

module.exports = {
  ensureAuthenticated: function(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    req.flash('error_msg', 'Please log in to view that resource');
    res.redirect('/users/login');
  },
  forwardAuthenticated: function(req, res, next) {
    if (User.role === "user"){
    if (!req.isAuthenticated()) {
      return next();
    }
    res.redirect('/dashboard');      }
    else if (User.role === "lawyer") {

      if (!req.isAuthenticated()) {
        return next();
      }
      res.redirect('/lawyersdashboard'); 

    }
  }
};
