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
    $scope.addImages = function(files){
      console.log(files[0]);
      var fsFile = new FS.File(files[0]);
      fsFile.to = "2";
      fsFile.from = "5";
      //Meteor.call("insertImage", fsFile);
      /*Images.insert(files[0], function(err, fileObj){
        console.log(fileObj);
        console.log("Object ID::"+fileObj._id);
      });*/
      Images.insert(fsFile, function (err, fileObj){
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
    $scope.sendMessage = function(files){
      console.log("Message Entered::"+$scope.enterMessage);
      console.log(files);
      var imageId = 0;
      /*This function inserts the individual chat messages to db.*/
      if(files == undefined || files == null || files.length == 0){
        if($scope.paramDetails){
          Meteor.call('insertMessage', $scope.paramDetails.user_id, $rootScope.userInfo.user_id, $scope.enterMessage, imageId);
        }
        if($scope.groupDetails){
          Meteor.call('insertGroupMessage', $scope.groupDetails.block_id, $rootScope.userInfo.user_id, $rootScope.userInfo.username, $scope.enterMessage, imageId);
        }
      }
      else{
        if($scope.paramDetails){
          var fsFile = new FS.File(files[0]);
          fsFile.to = $scope.paramDetails.user_id;
          fsFile.from = $rootScope.userInfo.user_id;
          fsFile.message = $scope.message;
          Images.insert(fsFile, function (err, fileObj){
            console.log(fileObj);
            imageId = fileObj._id;
            console.log(imageId);
            Meteor.call('insertMessage', $scope.paramDetails.user_id, $rootScope.userInfo.user_id, $scope.enterMessage, imageId);
          });
        }
        if($scope.groupDetails){
          var fsFile = new FS.File(files[0]);
          fsFile.to = $scope.groupDetails.user_id;
          fsFile.from = $rootScope.userInfo.user_id;
          fsFile.message = $scope.message;
          Images.insert(fsFile, function (err, fileObj){
            console.log(fileObj);
            imageId = fileObj._id;
            console.log(imageId);
            Meteor.call('insertGroupMessage', $scope.groupDetails.block_id, $rootScope.userInfo.user_id, $rootScope.userInfo.username, $scope.enterMessage, imageId);
          });
        }
      }
      $scope.enterMessage = "";
    };

    /*Subscribing the chats collection.*/
     //$scope.subscribe('chats');
     //$scope.subscribe('images');
     var instant = $scope.subscribe('instantMessages');
     console.log(instant);
     /*Retrieving the data from subscribed collection using helpers of Meteor.*/
     $scope.helpers({
         chatMessages: () => {
           return Chats.find({});
         },
         imageMessages: () => {
           return Images.find({});
         }
    });
    // for(var itr=0; itr<$scope.chatMessages; itr++){
    //   console.log($scope.chatMessages[itr]);
    // }
    // for(var itr=0; itr<$scope.imageMessages.length; itr++){
    //   console.log($scope.imageMessages[itr]);
    // }
}
