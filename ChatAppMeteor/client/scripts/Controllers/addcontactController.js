"use strict";
angular.module("chatApp")
  .controller('addcontactCtrl', addcontactCtrl);
function addcontactCtrl($scope, $rootScope, $location, $stateParams, chatService) {
  $scope.users = [];
  var current = [];
  $scope.block_id = $stateParams.block_id;
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
  /*Printing the userInfo*/
  /*for(var itr in $scope.userInfo){
    console.log(itr+" "+$scope.userInfo[itr]);
  }*/

  $scope.BacktoEditGroup = function ()
  {
      $location.path('/editgroup');
  };
  $scope.SelectUser = function(event, user_id){
    console.log("selecting user...");
    if(event.target.classList.contains("button-select-user")){
      event.target.classList.remove("button-select-user");
      event.target.classList.add("button-select-user-activated");
      $scope.users.push({
        user_id: user_id
      });
      console.log($scope.users);
    }
    else{
      event.target.classList.remove("button-select-user-activated");
      event.target.classList.add("button-select-user");
      var i = 0, loc = 0;
      for(i=0; i<$scope.users.length; i++){
        if($scope.users[i].user_id == user_id){
          loc = i;
        }
      }
      for(i=loc; i<$scope.users.length; i++){
        $scope.users[i] = $scope.users[i+1];
      }
      $scope.users.length--;
    }
  };
  $scope.SetGroup = function(){
    var addUsersGroup = {
      block_id: $scope.block_id,
      users: $scope.users
    };
    chatService.postUsersGroup(addUsersGroup)
      .success(function(response){
        console.log(response);
      })
      .error(function(err){
        console.log(err);
      })
  }
};
