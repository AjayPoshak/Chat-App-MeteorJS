"use strict";
angular.module("chatApp")
  .controller('addgroupCtrl', addgroupCtrl);
  function addgroupCtrl($scope, $rootScope, $location, $window, chatService) {
    $scope.isBlockDisabled = true;
    $scope.newGroupName = null;
    $scope.users = [];
    /**
     * Retrieving the contacts from localStorage
     * then process them and display at view.
     * {Same thing done at contactController.js}
     */
    var current = {};
    if(!$rootScope.chatContacts){
      current = $rootScope.chatContacts = JSON.parse(localStorage.getItem("userData"));
      console.log("getting from local...");
    }
    else{
        //console.log($rootScope.chatContacts);
        current = $rootScope.chatContacts;
    }
    console.log(current.data.blocks[0]);
    var blocks = [];
    var users = [];
    $scope.userInfo = [];
    //console.log(current.data.blocks.length);
    for(var i in current.data.blocks){
      blocks[i] = current.data.blocks[i];
      //console.log(current.blocks);
    }
    console.log(blocks[0]);
    for(var j in blocks){
      //console.log(blocks[j]);
      //console.log(blocks[j].users);
      //console.log(blocks[j].users.length);
      for(var k=0; k<blocks[j].users.length; k++){
        //console.log(blocks[j].users[k]);
        if(blocks[j].type==="default"){
            users[k] = blocks[j].users[k];
            //console.log(k+" "+users[k]);
        }
      }
    }
    var itr = 0;
    $scope.userInfo[0] = users[0];
    for(var k in users){
      //console.log("Users Length::"+users.length);
      $scope.userInfo[itr] = users[k];
      itr++;
      /*for(var l=0; l<users.length; l++){
        $scope.userInfo[itr] = users[k];
        itr++;
      }*/
    }
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
    /**
     * Take the group name and member id, call the new group API
     */
    $scope.createGroup = function ()
    {
        if($scope.newGroupName != null && $scope.newGroupName != ''){
          console.log("New Group Name::"+$scope.newGroupName);
          if($scope.users.length != 0){
            console.log("users selected::"+$scope.users);
            var users = [];
            var itr = 0;
            for(itr in $scope.users){
              users.push({
                user_id: $scope.users[itr]
              });
            };
            /*Getting the info of logged user*/
            var currentUser = JSON.parse(localStorage.getItem("userDetails"));
            var newGroupData = {
              user_id: currentUser.user_id,
              apartment_id: currentUser.apartment_id,
              block_name: $scope.newGroupName,
              users: users
            };
            chatService.postNewGroup(newGroupData)
              .success(function(response){
                console.log(response.data);
                window.localStorage[$scope.newGroupName] = angular.toJson(response);
              })
              .error(function(err){
                console.log(err);
              });
          }
          else{
            alert("Please select group members");
          }
          //$location.path('/chat');
        }
        else{
          alert("Please enter group name...");
        }

    };

    $scope.BacktoGroup = function ()
    {
        $location.path('/group');
    };

    $scope.SelectUser = function(event, user_id){
      console.log("Selecting user..."+event.target);
      if(event.target.classList.contains("button-select-user")){
          console.log(user_id+" added to list");
          event.target.classList.remove("button-select-user");
          event.target.classList.add("button-select-user-activated");
          $scope.users.push(user_id);
      }
      else{
        console.log("Removing user..."+user_id);
        event.target.classList.remove("button-select-user-activated");
        event.target.classList.add("button-select-user");
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
    }
};
