function checkRole(role) {
  return function(req, res, next) {
    if (req.decodedToken.department === role) {
      next();
    } else {
      res.status(403).json({ message: "restricted" });
    }
  };
}
module.exports = checkRole;
