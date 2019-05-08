const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const server = express();
const Authrouter = require("../users/auth-router");
const usersRouter = require("../users/users-router");
const restricted = require("../auth/restricted");
const checkRole = require("../auth/checkRole");

server.use(express.json());
server.use(helmet());
server.use(cors());

server.use("/api/users", restricted, checkRole("student"), usersRouter);
server.use("/api/auth", Authrouter);

module.exports = server;
