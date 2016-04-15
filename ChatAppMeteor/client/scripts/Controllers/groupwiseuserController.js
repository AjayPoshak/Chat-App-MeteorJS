"use strict";
angular.module("chatApp")
  .controller('groupwiseuserCtrl', groupwiseuserCtrl);
function groupwiseuserCtrl($scope, $rootScope, $location, $state, $stateParams,chatService) {

  $scope.isUserOwner = false;
  $scope.blockData = JSON.parse($stateParams.blockDataParam);
  getAdminName($scope.blockData.block_owner);
  $scope.currentUser = JSON.parse(localStorage.getItem("userDetails"));
  /*
  * Check whether we got the data from url parameter, if we got the data then set it in rootScope
  * also, so that it can be used when we come back from next page(editgroup).
  * This check is used to make the back functionality work smoothly.
   */
  if($scope.blockData == null || $scope.blockData == ''){
    $scope.blockData = $rootScope.blockData;
    if($scope.blockData.type = 'personal')
    {

      chatService.getGroupData($scope.blockData.block_owner, $rootScope.userInfo.apartment_id)
        .then(function(response){
          getAdminName($scope.blockData.block_owner);
         if($scope.currentUser.user_id == $scope.blockData.block_owner)
          {
            $scope.isUserOwner = true;
          }
        });

    }
  }
  else{
    $rootScope.blockData = $scope.blockData;
    if($scope.blockData.type = 'personal')
    {
      chatService.getGroupData($scope.blockData.block_owner, $rootScope.userInfo.apartment_id)
        .then(function(response){
        getAdminName($scope.blockData.block_owner);  
      if($scope.currentUser.user_id == $scope.blockData.block_owner)
      {
        $scope.isUserOwner = true;
      }
        });
    }
  }


  console.log($scope.blockData);

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

  //function to get admin name of group
  function getAdminName(adminId)
  {
        chatService.getOtherUserInfo(adminId,$rootScope.userInfo.apartment_id)
            .then(function(response){
              $rootScope.AdminInfo = response.data;
              console.log($rootScope.AdminInfo);
            });
  }
};
