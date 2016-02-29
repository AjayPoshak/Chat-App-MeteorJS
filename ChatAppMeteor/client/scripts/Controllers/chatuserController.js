"use strict";
angular.module("chatApp")
  .controller('chatuserCtrl', chatuserCtrl);

  function chatuserCtrl($scope, $state, Upload, $rootScope, chatService, $location, $window, $stateParams) {
    $scope.enterMessage = null; //Message entered by user.
    $scope.individualChatFlag = false; //Flag for individual chat.
    $scope.paramDetails = null;
    $scope.groupDetails = null;
    $scope.displaySideBar = false;
    $scope.popupClass='button-setting';

    $scope.paramDetails=JSON.parse($stateParams.userDetailParam);
    $scope.groupDetails = JSON.parse($stateParams.groupDetailParam);

    console.log($scope.groupDetails);
    console.log($scope.paramDetails);
    //console.log($scope.paramDetails.username);
    if($scope.paramDetails){
      $scope.individualChatFlag = true; //Flag set for individual chat
    }
    if($scope.groupDetails){
      $scope.individualChatFlag = false; //Flag unset for individual chat, group chat enabled.
    }
    console.log("individualChatFlag::"+$scope.individualChatFlag);
    /*Retrieving the information of user who has logged in.*/
    if(!$rootScope.userInfo){
      $rootScope.userInfo = JSON.parse(localStorage.getItem("userDetails"));
      console.log("getting from local...");
      console.log("userInfo"+$rootScope.userInfo);
    }
    console.log("userInfo"+$rootScope.userInfo.user_id);

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
    /*
    * Upload images to db.
    */
    /*$scope.uploadImage = function(){
      console.log("file upload"+$scope.file);
      console.log("uploading image...");
        Chats.insert({
          to: $scope.paramDetails.user_id,
          from: $rootScope.userInfo.user_id,
          message: $scope.file,
          createdAt: new Date()
        });
    };*/
    $scope.picFile = null;
    $scope.addImages = function(files){
      console.log(files[0]);
      var fsFile = new FS.File(files[0]);
      Images.insert(files[0], function(err, fileObj){
        console.log(fileObj);
      });
      //fsCollection.insert($scope.picFile);
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
    **This will be called to insert the message into db.
    */
    $scope.sendMessage = function(){
      console.log("Message Entered::"+$scope.enterMessage);
      /*This function inserts the individual chat messages to db.*/
      if($scope.paramDetails){
        Chats.insert({
          to: $scope.paramDetails.user_id,
          from: $rootScope.userInfo.user_id,
          message: $scope.enterMessage,
          createdAt: new Date()
        });
      }
      /*This would insert messages of group to db.*/
      if($scope.groupDetails){
        Chats.insert({
          to: $scope.groupDetails.block_id,
          from: $rootScope.userInfo.user_id,
          fromName: $rootScope.userInfo.username,
          message: $scope.enterMessage,
          createdAt: new Date()
        });
        console.log("Group Message inserted");
      }
      $scope.enterMessage = "";
    };

    /*Subscribing the chats collection.*/
     $scope.subscribe('chats');
     $scope.subscribe('images');
     /*Retrieving the data from subscribed collection using helpers of Meteor.*/
     $scope.helpers({
         chatMessages: () => {
           return Chats.find({});
         },
         imageMessages: () => {
           return Images.find({});
         }
       });
};
