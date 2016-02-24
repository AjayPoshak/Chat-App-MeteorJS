"use strict";
angular.module("chatApp")
  .controller('chatuserCtrl', chatuserCtrl);

  function chatuserCtrl($scope, $state, $rootScope, chatService, $location, $window, $stateParams) {
    $scope.enterMessage = null; //Message entered by user.
    $scope.paramDetails=JSON.parse($stateParams.userDetailParam);
    console.log($scope.paramDetails);
    console.log($scope.paramDetails.username);

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
      /*This function inserts the messages to db.*/
      Chats.insert({
        to: $scope.paramDetails.user_id,
        from: $rootScope.userInfo.user_id,
        message: $scope.enterMessage,
        createdAt: new Date()

      });
      $scope.enterMessage = "";
    }
    /*Subscribing the chats collection.*/
     $scope.subscribe('chats');
     /*Retrieving the data from subscribed collection using helpers of Meteor.*/
     $scope.helpers({
         chatMessages: () => {
           return Chats.find({});
         }
       });
      if(!$rootScope.userInfo){
        $rootScope.userInfo = JSON.parse(localStorage.getItem("userDetails"));
        console.log("getting from local...");
        console.log("userInfo"+$rootScope.userInfo);
      }
      console.log("userInfo"+$rootScope.userInfo.user_id);
};
