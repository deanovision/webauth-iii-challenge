const bcrypt = require("bcryptjs");

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("users")
    .truncate()
    .then(function() {
      // Inserts seed entries
      return knex("users").insert([
        {
          username: "dean1",
          department: "student",
          password: bcrypt.hashSync("pass", 8)
        },
        {
          username: "dean2",
          department: "student",
          password: bcrypt.hashSync("pass", 8)
        },
        {
          username: "dean3",
          department: "instructor",
          password: bcrypt.hashSync("pass", 8)
        }
      ]);
    });
};
