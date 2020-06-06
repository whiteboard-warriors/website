var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var db = require('../models');

// Setting up username/password strat with Passport
passport.use(
    new LocalStrategy(
        // Changing username login to email login
        {
            usernameField: 'email'
        },
        function(email, password, done) {
            db.User.findOne({ email }).then(function(dbUser) {
                // If there's no user with the given email
                if (!dbUser) {
                    return done(null, false, {
                        message:
                            'The email you provided is not currently registered.'
                    });
                }
                // If there is a user with the given email, but the password the user gives us is incorrect
                else if (!dbUser.validPassword(password)) {
                    return done(null, false, {
                        message: 'Incorrect password.'
                    });
                }
                // If none of the above, return the user
                return done(null, dbUser);
            });
        }
    )
);

// Within a login session, passport will serialize and deserialize the userid which
// is then stored to req.user
passport.serializeUser(function(user, cb) {
    cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
    cb(null, obj);
});

// Exporting our configured passport
module.exports = passport;
