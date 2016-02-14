"use strict";
angular.module("chatApp")
  .controller('addgroupCtrl', addgroupCtrl);
  function addgroupCtrl($scope, $rootScope, $location, $window) {
    $scope.isBlockDisabled = true;
    $scope.changePath = function () {
      if ($scope.isBlockDisabled) {
          $scope.isBlockDisabled = false;
      }
      else {
          $scope.isBlockDisabled = true;
      }
    }
    $scope.setGroup = function ()
    {
        $scope.isBlockDisabled = true;
    }
    $scope.createGroup = function ()
    {
        $location.path('/chat');
    };
    $scope.BacktoGroup = function ()
    {
        $location.path('/group');
    };
};
