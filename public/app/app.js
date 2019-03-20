(function() {
  "use strict";

  var robinAuth = angular.module("robinAuth", ["ui.router", "ngCookices"]);

  //static data constant.
  var staticData = {};

  var userRoles = (staticData.userRoles = {
    guest: 1,
    user: 2,
    admin: 4
  });

  staticData.accessLevels = {
    guest: userRoles.guest | userRoles.user | userRoles.admin, // ...111
    user: userRoles.user | userRoles.admin, // ..110
    admin: userRoles.admin // ..100
  };

  robinAuth.constant("staticData", staticData);

  //Config Block.
  robinAuth.config([
    "$stateProvider",
    "$urlRouterProvider",
    "$httpProvider",
    "$locationProvider",
    "$staticData",
    authConfig
  ]);

  function authConfig(
    $stateProvider,
    $urlRouterProvider,
    $httpProvider,
    $locationProvider,
    staticData
  ) {
    //TODO: DEFINE ROUTES HERE
    $stateProvider.state("index", {
      url: "/",
      templateUrl: "app/views/partials/partial-index.html"
    });

    // Login route.
    $stateProvider.state("login", {
      url: "/login",
      templateUrl: "app/views/partials/partial-login.html",
      controller: "LoginController as lc"
    });

    $locationProvider.html5Mode(true);
  }
})();
