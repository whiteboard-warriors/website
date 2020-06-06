const router = require('express').Router();
const db = require('../models');
const path = require('path');

// Requiring our custom middleware for checking if a user is logged in
const isAuthenticated = require('../config/middleware/isAuthenticated');

// Requiring our custom middleware for checking if a user isn't logged in
const isNotAuthenticated = require('../config/middleware/isNotAuthenticated');

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
//                        Middleware section                               //
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
// usually we don't separate the middleware section like this from the
// page routes below this section, but for this example it helps us
// to see the difference between handlebars and react

// These routes should redirect to home page if they are already logged in:
router.route(['/']).get(isNotAuthenticated);

// These routes should redirect to login page if they are not logged in:
router.route(['/']).get(isAuthenticated);
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
//                      END Middleware section                             //
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
//                       HTML Routes section                               //
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
// Send every request to the React app and let frontend routing handle pages
// Define any API routes before this runs
router.route(['/']).get((req, res) => {
  res.sendFile(path.join(__dirname, '../../client/build/index.html'));
});
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
//                     END HTML Routes section                             //
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
// add a status of 404 to any page request that isn't listed above
router.get('*', (req, res) => {
  res
    .status(404)
    .sendFile(path.join(__dirname, '../../client/build/index.html'));
});

module.exports = router;
