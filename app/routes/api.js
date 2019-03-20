"use strict";

var router = require("express").Router();

var config = require("../config");
var AuthController = require("../controllers/authController");
var allowOnly = require("../services/routesHelper").allowOnly;
var UserController = require("../controllers/userController");

var APIRoutes = function(passport) {
  // TODO: Create api routes

  // Signup
  router.post("/signup", AuthController.signUp);

  // Authenticate
  router.post("/authenticate", AuthController.authenticateUser);

  router.get(
    "/profile",
    passport.authenticate("jwt", { session: false }),
    allowOnly(config.accessLevels.user, UserController.index)
  );

  router.get(
    "/admin",
    passport.authenticate("jwt", { session: false }),
    allowOnly(config.accessLevels.admin, AdminController.index)
  );
  return router;
};

module.exports = APIRoutes;
