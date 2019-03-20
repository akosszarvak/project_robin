// The user model.
"use strict";

var Sequelize = require("sequelize");
var bcrypt = require("bcrypt");

var config = require("../config");
var db = require("../services/database");

// The model schema
var modelDefinition = {
  username: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false
  },
  role: {
    type: Sequelize.INTEGER,
    defaultValue: config.userRoles.user
  }
};

// The model options
var modelOptions = {
  instanceMethods: {
    comparePasswords: comparePasswords
  },
  hooks: {
    beforeValidate: hashPasswords
  }
};

// Define the User model.
var UserModel = db.define("user", modelDefinition, modelOptions);

// Compares two passwords.
function comparePasswords(password, callback) {
  bcrypt.compare(password, this.password, function(error, isMatch) {
    if (error) {
      return callback(error);
    }

    return callback(null, isMatch);
  });
}
{
}
// Hash the password for the user object.
function hashPasswords(user) {
  if (user.changed("password")) {
    return bcrypt.hash(user.password, 10).then(function(password) {
      user.password = password;
    });
  }
}

module.exports = UserModel;
