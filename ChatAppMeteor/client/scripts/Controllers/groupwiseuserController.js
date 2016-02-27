"use strict";
angular.module("chatApp")
  .controller('groupwiseuserCtrl', groupwiseuserCtrl);
function groupwiseuserCtrl($scope, $rootScope, $location, $state, $stateParams) {
  $scope.blockData = JSON.parse($stateParams.blockDataParam);
  //console.log($scope.blockData);

  $rootScope.isConatct='2';
  $scope.BacktoGroup = function ()
  {
      $location.path('/group');
  }
  $scope.editGroup = function ()
  {
      $location.path('/editgroup')
  }
  /*
  * Redirects to individual chat for that user.
  *@param user {json} - Data related to user.
  */
  $scope.changePath = function(user)
  {
    var userJson = JSON.stringify(user);
    $state.go('chatuser', {userDetailParam: userJson});
  }
};
