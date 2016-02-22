"use strict";
angular.module("chatApp")
  .controller('chatuserCtrl', chatuserCtrl);

  function chatuserCtrl($scope, $state, $rootScope, chatService, $location, $window, $stateParams) {
    $scope.enterMessage = null; //Message entered by user.
    $scope.paramDetails=JSON.parse($stateParams.userDetailParam);
    console.log($scope.paramDetails);
    console.log($scope.paramDetails.user_name);

    $scope.displaySideBar = false;
    $scope.popupClass='button-setting';

    $scope.toggleSideBar = function () {
        //$ionicSideMenuDelegate.toggleRight();
        if($scope.displaySideBar){
          $scope.displaySideBar = false;
          $scope.popupClass = 'button-setting';
        }
        else {
        $scope.displaySideBar = true;
        $scope.popupClass = 'close-button-setting';
        }
    };
    $scope.showAttachment = function() {
      if($scope.displayAttachment) {
        $scope.displayAttachment = false;
      }
      else {
        $scope.displayAttachment = true;
      }
    };

    //This is the Ionic Popup
    $scope.showSideBar = function(){
        var myPopup = $ionicPopup.show({
          template: ''
        });
    };
//functionlity on back button

    $scope.myGoBack = function () {
        if ($rootScope.isConatct == '1')
        {
            $location.path('/contact');
        }
        else if($rootScope.isConatct == '2')
        {
            $location.path('/groupwiseuser');
        }
        else if($rootScope.isConatct == '3')
        {
            $location.path('/group');
        }
        else
        {
            $location.path('/chat');
        }
    };
    /*
    **@function sendMessage: This will be called to insert the message into db.
    */
    $scope.sendMessage = function(){
      console.log("Message Entered::"+$scope.enterMessage);
      /*Chats._collection.insert({
        from: $rootScope.userInfo.user_id,
        to: $scope.paramDetails.user_id,
        message: $scope.enterMessage
      });*/
      /*Meteor.call('newMessage', {
        text: $scope.enterMessage,
        type: "text",
        to: $scope.paramDetails.user_id,
        from: $rootScope.userInfo.user_id
      });*/
      Chats.insert({
        to: $scope.paramDetails.user_id,
        from: $rootScope.userInfo.user_id,
        message: $scope.enterMessage
      });
      $scope.enterMessage = "";
    }
     //Meteor.subscribe("chats");
     $scope.subscribe('chats');
     $scope.helpers({
         chatMessages: () => {
           return Chats.find({});
         }
       });


    /*chatService.getChatMessages()
      .success(function(response){
        console.log(response);
        $scope.chatMessages = response;
      })
      .error(function(err){
        console.error(err);
      });*/
      if(!$rootScope.userInfo){
        $rootScope.userInfo = JSON.parse(localStorage.getItem("userDetails"));
        console.log("getting from local...");
        console.log("userInfo"+$rootScope.userInfo);
      }
      console.log("userInfo"+$rootScope.userInfo.user_id);
};
