"use strict";

var AdminController = {
  index: function(req, res) {
    res
      .status(200)
      .json({ message: "Welcome to the admin are " + req.user.username + "!" });
  }
};

module.exports = AdminController;
