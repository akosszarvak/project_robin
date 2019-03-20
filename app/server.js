"use strict";

// NPM dependencies.

var express = require("express");
var bodyParser = require("body-parser");
var morgan = require("morgan");
var sequelize = require("sequelize");
var passport = require("passport");
var jwt = require("jsonwebtoken");

// App related modules.
var hookJWTStrategy = require("./services/passportStategy");

// Initializations.
var app = express();

// Parse as urlencoded and json.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Hook up HHTTP logger.
app.use(morgan("dev"));

// Hook up Passport.
app.use(passport.initialize());

// Hook up JWT strategy
hookJWTStrategy(passport);

// Set the static files location.
app.use(express.static(__dirname + "../../public"));

// Bundle API routes.
app.use("/api", require("./routes/api")(passport));

// Catch all route
app.get("*", function(req, res) {
  res.sendFile(path.join(__dirname + "../../public/app/views/index.html"));
});
// Start the server.
app.listen("3000", function() {
  console.log("Magic happens at Hogwarts. also at localhost:3000");
});
