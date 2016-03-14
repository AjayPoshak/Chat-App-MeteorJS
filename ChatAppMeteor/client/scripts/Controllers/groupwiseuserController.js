"use strict";
angular.module("chatApp")
  .controller('groupwiseuserCtrl', groupwiseuserCtrl);
function groupwiseuserCtrl($scope, $rootScope, $location, $state, $stateParams) {
  $scope.blockData = JSON.parse($stateParams.blockDataParam);
  /*
  * Check whether we got the data from url parameter, if we got the data then set it in rootScope
  * also, so that it can be used when we come back from next page(editgroup).
  * This check is used to make the back functionality work smoothly.
   */
  if($scope.blockData == null || $scope.blockData == ''){
    console.log("No data in scope");
    $scope.blockData = $rootScope.blockData;
  }
  else{
    $rootScope.blockData = $scope.blockData;
  }
  //console.log($scope.blockData);

  $rootScope.isConatct='2';
  $scope.BacktoGroup = function ()
  {
      $location.path('/group');
  }
  $scope.editGroup = function ()
  {
      var blockDataJson = JSON.stringify($scope.blockData);
      //console.log(blockDataJson);
      $state.go('editgroup', {blockDataParam: blockDataJson });
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
