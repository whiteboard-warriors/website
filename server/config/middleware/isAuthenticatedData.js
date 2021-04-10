// Middleware for restricting routes if not logged in

module.exports = function(req, res, next) {
  if (req.user) {
    return next();
  }
  return res.sendStatus(403);
};
