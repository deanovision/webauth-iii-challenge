const db = require("../config/dbConfig");

module.exports = {
  getUsers,
  login,
  register
};

function getUsers() {
  return db("users");
}
function login(creds) {
  return db("users")
    .where({ username: creds.username })
    .first();
}
function register(creds) {
  return db("users")
    .insert(creds)
    .then(id => id[0]);
}
