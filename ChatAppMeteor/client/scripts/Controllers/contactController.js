
"use strict";
angular.module("chatApp")
  .controller('contactCtrl', contactCtrl);
/*
*@function: This is controller function for contacts page.
*/
function contactCtrl($scope, $rootScope, $location, $window,$state) {
  var current = [];
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

  $rootScope.isConatct ='1'
  $scope.BacktoChat = function ()
  {
      $location.path('/chat');
  };
  $scope.changePath = function (user)
  {
      var userParam=JSON.stringify(user);
      $state.go("chatuser",{userDetailParam:userParam})
  };
};
