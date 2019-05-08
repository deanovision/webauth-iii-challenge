const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const db = require("./users-model");
const router = express.Router();

router.post("/login", (req, res) => {
  const creds = req.body;
  if (!creds.username || !creds.password) {
    res.status(400).json({ message: "username and password is required" });
  } else {
    db.login(creds)
      .then(user => {
        if (user && bcrypt.compareSync(creds.password, user.password)) {
          const token = generateToken(user);
          res.status(200).json({ message: "welcome", token });
        } else {
          res.status(401).json({ message: "invalid creds" });
        }
      })
      .catch(err => {
        res.status(500).json({ message: "internal error logging in" });
      });
  }
});

router.post("/register", (req, res) => {
  const creds = req.body;
  if (!creds.username || !creds.password) {
    res
      .status(400)
      .json({ message: "bad request, username and password required" });
  } else {
    creds.password = bcrypt.hashSync(creds.password, 8);
    db.register(creds)
      .then(id => {
        const token = generateToken(creds);
        res.status(201).json({ id: id, token });
      })
      .catch(err => {
        res.status(500).json({ message: "internal error registering user" });
      });
  }
});

function generateToken(user) {
  const payload = {
    subject: user.id,
    department: user.department
  };

  const secret = process.env.JWT_SECRET;

  const options = {
    expiresIn: "2h"
  };
  return jwt.sign(payload, secret, options);
}
module.exports = router;
