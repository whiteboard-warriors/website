// Middleware for restricting access if user isn't logged in
// and redirecting to login page
module.exports = function(req, res, next) {
  if (req.user) {
    return next();
  }
  return res.redirect('/login');
};
