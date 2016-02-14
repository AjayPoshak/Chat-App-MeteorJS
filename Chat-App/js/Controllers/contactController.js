
"use strict";
angular.module("chatApp")
  .controller('contactCtrl', contactCtrl);
/*
*@function: This is controller function for contacts page.
*/
function contactCtrl($scope, $rootScope, $location, $window) {
  var current = [];
  if(!$rootScope.chatContacts){
    current = $rootScope.chatContacts = JSON.parse(localStorage.getItem("userData"));
    console.log("getting from local...");
  }
  else{
      //console.log($rootScope.chatContacts);
      current = $rootScope.chatContacts;
  }
  console.log(current[0]);
  var blocks = [];
  var users = [];
  $scope.userInfo = [];
  //console.log(current.length);
  for(var i in current){
    blocks[i] = current[i].blocks;
    //console.log(current.blocks);
  }
  //console.log(blocks[0]);
  for(var j in blocks){
    for(var k=0; k<blocks[j].length; k++){
      //console.log(blocks[j][k]);
      users[k] = blocks[j][k].users;
    }
  }
  var itr = 0;
  for(var k in users){
    //console.log("Users Length::"+users[k].length);
    for(var l=0; l<users[k].length; l++){
      $scope.userInfo[itr] = users[k][l];
      itr++;
    }
  }
  /*for(var i in $scope.userInfo){
    console.log($scope.userInfo[i]);
  }*/
  //console.log("user info::"+$scope.userInfo[4]);
  $rootScope.isConatct ='1'
  $scope.BacktoChat = function ()
  {
      $location.path('/chat');
  };
  $scope.changePath = function ()
  {
      $location.path('/chatuser');
  };
  
};
