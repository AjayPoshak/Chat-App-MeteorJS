"use strict";
angular.module("chatApp")
  .controller('editgroupCtrl', editgroupCtrl);
function editgroupCtrl($scope, $rootScope, $location, $window) {
  $scope.BacktoEditGroup = function ()
  {
      $location.path('/groupwiseuser')
  }
  $scope.addContact = function ()
  {
      $location.path('/addcontact');
  }
  $scope.SetGroup = function()
  {
      $location.path('/chat');
  }
};
