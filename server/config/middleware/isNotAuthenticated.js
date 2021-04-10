// Middleware for restricting routes if not logged in and
// redirecting to homepage if they are logged in

module.exports = function(req, res, next) {
  if (!req.user) {
    return next();
  }
  return res.redirect('/');
};
