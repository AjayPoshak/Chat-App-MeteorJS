"use strict";
angular.module("chatApp")
  .controller('groupwiseuserCtrl', groupwiseuserCtrl);
function groupwiseuserCtrl($scope, $rootScope, $location, $window) {
  $rootScope.isConatct='2';
  $scope.BacktoGroup = function ()
  {
      $location.path('/group');
  }
  $scope.editGroup = function ()
  {
      $location.path('/editgroup')
  }
  $scope.changePath = function()
  {
      $location.path('/chatuser');
  }
};
