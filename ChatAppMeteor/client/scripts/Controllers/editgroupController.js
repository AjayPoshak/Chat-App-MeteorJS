"use strict";
angular.module("chatApp")
  .controller('editgroupCtrl', editgroupCtrl);
function editgroupCtrl($scope, $rootScope, $location, $window, $stateParams, $state, chatService) {
  $scope.blockData = JSON.parse($stateParams.blockDataParam);
  /*
   * Set data in rootscope when we are getting data through url parameter,
   * so that it can reused when we come back from next page, when there would be no
   * url parameter to provide data.
   */
  if($scope.blockData == null || $scope.blockData == ''){
    console.log("No data in scope");
    $scope.blockData = $rootScope.blockData;
  }
  else{
    $rootScope.blockData = $scope.blockData;
  }
  $scope.users = [];

  $scope.BacktoEditGroup = function ()
  {
      $location.path('/groupwiseuser')
  }
  $scope.addContact = function ()
  {
      console.log($scope.blockData.block_id);
      var blockId = $scope.blockData.block_id;
      $state.go('addcontact',{blockIdParam:blockId});
  }
  $scope.SetGroup = function()
  {
      if($scope.users.length>0){
        /*Getting info of current user*/
        var currentUser = JSON.parse(localStorage.getItem("userDetails"));
        var users = [];
        var itr = 0;
        console.log($scope.users);
        for(itr in $scope.users){
          users.push({
            user_id: $scope.users[itr]
          });
        };
        var updateGroupData = {
          user_id: currentUser.user_id,
          block_id: $scope.blockData.block_id,
          users: users
        };
        chatService.postUpdateGroup(updateGroupData)
          .success(function(response){
              console.log(response);
              window.localStorage[$scope.blockData.block_name] = angular.toJson(response);
          })
          .error(function(err){
            console.log(err);
          })
        }
      else{
        alert("Please select the members to be removed");
      }
      $location.path('/chat');
  }

  $scope.SelectUser = function(event, user_id){
    console.log("Selected..."+event.target);
    if(event.target.classList.contains("button-select-user-activated")){
      event.target.classList.remove("button-select-user-activated");
      event.target.classList.add("button-select-user");
      $scope.users.push(user_id);
      console.log("unchecked");
    }
    else{
      console.log("checked");
      event.target.classList.remove("button-select-user");
      event.target.classList.add("button-select-user-activated");
      var i = 0, loc = 0;
      for(i=0; i<$scope.users.length; i++){
        if($scope.users[i] == user_id){
          loc = i;
        }
      }
      for(i=loc; i<$scope.users.length; i++){
        $scope.users[i] = $scope.users[i+1];
      }
      $scope.users.length--;
    }
    /*Printing users list - for debugging only*/
    for(i in $scope.users){
      console.log($scope.users[i]);
    }
  };
};
