"use strict";
angular.module("chatApp")
  .controller('addcontactCtrl', addcontactCtrl);
function addcontactCtrl($scope, $rootScope, $location, $window) {
  $scope.BacktoEditGroup = function ()
  {
      $location.path('/editgroup');
  };
};
