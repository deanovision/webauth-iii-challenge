const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const token = req.headers.authorization;
  jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
    if (err) {
      res.status(401).json({ message: "invalid creds" });
    } else {
      req.decodedToken = decodedToken;
      next();
    }
  });
};
