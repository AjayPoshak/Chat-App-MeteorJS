"use strict";
angular.module("chatApp")
  .controller('contactCtrl', contactCtrl);
/*
*@function: This is controller function for contacts page.
*/
function contactCtrl($scope, $rootScope,$timeout, $location, $window, $state) {
  $scope.blockName = "All";
  $scope.blockLimit = 2;
  $scope.contactLimit = 10;
  var current = [];
  if(!$rootScope.chatContacts){
    current = $rootScope.chatContacts = JSON.parse(localStorage.getItem("userData"));
    console.log("getting from local...");
    $timeout(function() {
      $scope.blockLimit = 100;
      $scope.contactLimit = 500;
    }, 1000);
  }
  else{
      //console.log($rootScope.chatContacts);
      current = $rootScope.chatContacts;
      $timeout(function() {
      $scope.blockLimit = 100;
      $scope.contactLimit = 500;
    }, 1000);
  }

  console.log(current);

  $scope.blocks = [];
  //console.log(current.data.blocks.length);
  if(current !== undefined || current !== null){
    for(var i in current.data.blocks){
      $scope.blocks[i] = current.data.blocks[i];
      console.log($scope.blocks[i].block_name);
    };
  }
  /*To display the block names in drop down*/
  $scope.blockNames = [];
  /**
   * Retrieve block names from block data
   * these block names displayed in drop down
   */
  function getBlockNames(){
    var itr = 0;
    for(itr in $scope.blocks ){
      console.log($scope.blocks[itr].block_name);
      //$scope.blockNames[i] = $scope.blocks[itr].block_name;
    }
  };
  $scope.isLoading = false;
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
  /**
   * Calls the service to return all contact details
   */
  function getallContacts()
    {
      if($scope.individualChatFlag)
      {
        chatService.getallContact($rootScope.userInfo.user_id,$rootScope.userInfo.apartment_id)
            .then(function(response){
              $scope.Getallcontacts = response;
              window.localStorage["userData"] = angular.toJson(response);
            });
      }
    };
    $scope.blockNameSelected = function(){
      console.log("Block selected from drop down..."+$scope.blockName);
    }
    getallContacts();
    //getBlockNames();
};
