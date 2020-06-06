const express = require('express');
const passport = require('../config/passport');
const router = express.Router();

// @route   POST api/auth
// @desc - Login
router.post('/login', passport.authenticate('local'), function(req, res) {
    // console.log(req.user);
    res.json({
        email: req.user.email,
        id: req.user._id
    });
});

// @route   POST api/auth
// @desc - Logout
router.post('/logout', function(req, res) {
    req.logout();
    res.json({}).redirect('/login');
});

module.exports = router;
