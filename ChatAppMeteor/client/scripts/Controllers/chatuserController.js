"use strict";
angular.module("chatApp")
  .controller('chatuserCtrl', chatuserCtrl);


  function chatuserCtrl($scope, $state, Upload, $rootScope, chatService, $location, $ionicScrollDelegate, $stateParams, $timeout) {
    var connectionStatus = null;
    setInterval(function(){
      connectionStatus = checkConnectionStatus();
      if(connectionStatus === "online"){
        console.log("Now ONLINE.....updating deliveries");
        Meteor.call('updateMsgReached', $rootScope.userInfo.user_id);
      }
    }, 60 * 1000);
    $scope.enterMessage = null; //Message entered by user.
    $scope.individualChatFlag = false; //Flag for individual chat.
    $scope.paramDetails = null;
    $scope.groupDetails = null;
    $scope.blockedUsers = []; //List of all users who are blocked.
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
    /**
     * Show and hide
      the attachment
     * @method showAttachment
     */
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
    /**
     * Add the image to database
     * @param  {file} files file selected by user at view
     */
    $scope.addImages = function(files){
      console.log(files[0]);
      var fsFile = new FS.File(files[0]);
      fsFile.to = "2";
      fsFile.from = "5";
        Images.insert(fsFile, function (err, fileObj){
        console.log(fileObj);
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
    **This will be called to insert the message into db.
    */
    $scope.sendMessage = function(files){
      console.log("Message Entered::"+$scope.enterMessage);
      console.log(files);
      var imageId = 0;
      var connectionStatus = checkConnectionStatus();
      $scope.reached = false;
      /*
      *This var is to indicate whether a msg is a group message or not.  This is used
      *only for updateRecentMessage method call.
      *groupMessage = true; it is a group message;
       */
      var groupMessage = false;
      /*This is the userId of the blocked person whether it is the sender or a receiver.*/
      $scope.blockedId = 0;
      /*This function inserts the individual chat messages to db.*/
      if(files == undefined || files == null || files.length == 0){
        if($scope.paramDetails){
          /*Checking if sender is blocked by receiver*/
          var isSenderBlocked = checkSenderBlocked($rootScope.userInfo.user_id);
          /*Checking if sender has blocked the receiver*/
          var isReceiverBlocked = checkReceiverBlocked();
          if(isSenderBlocked || isReceiverBlocked){
            console.log("receiver has already blocked the sender...");
            console.log("Or sender has blocked the receiver.....");
            Meteor.call('insertMessage', "-1", $rootScope.userInfo.user_id, $scope.enterMessage, imageId, $scope.blockedId, connectionStatus);
          }
          else{
            Meteor.call('insertMessage', $scope.paramDetails.user_id, $rootScope.userInfo.user_id, $scope.enterMessage, imageId, $scope.blockedId, connectionStatus);
            Meteor.call('updateRecentMessage', groupMessage, $scope.paramDetails.user_id, $rootScope.userInfo.user_id, $scope.enterMessage, imageId,
             angular.toJson($scope.paramDetails), angular.toJson($scope.userInfo), connectionStatus);
          }
          console.log($scope.paramDetails); //Receiver Info
          console.log($rootScope.userInfo); //Sender Info
        }
        if($scope.groupDetails){
          Meteor.call('insertGroupMessage', $scope.groupDetails.block_id,
          $rootScope.userInfo.user_id, $rootScope.userInfo.username, $scope.enterMessage, imageId);
          groupMessage = true;
          Meteor.call('updateRecentMessage', groupMessage, $scope.groupDetails.block_id,
           $rootScope.userInfo.user_id, $scope.enterMessage, imageId,
           angular.toJson($scope.groupDetails), $scope.groupDetails.block_name, connectionStatus);
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
            Meteor.call('insertMessage', $scope.paramDetails.user_id, $rootScope.userInfo.user_id, $scope.enterMessage, imageId, connectionStatus);
            Meteor.call('updateRecentMessage', groupMessage, $scope.paramDetails.user_id, $rootScope.userInfo.user_id, "Image", imageId,
             angular.toJson($scope.paramDetails), angular.toJson($scope.userInfo), connectionStatus);
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
            groupMessage = true;
            Meteor.call('insertGroupMessage', $scope.groupDetails.block_id, $rootScope.userInfo.user_id, $rootScope.userInfo.username, $scope.enterMessage, imageId, connectionStatus
          );
            Meteor.call('updateRecentMessage', groupMessage, $scope.paramDetails.block_id, $rootScope.userInfo.user_id, "Image", imageId,
             $scope.paramDetails.profile_image, $scope.paramDetails.username, connectionStatus);
          });
        }
      }
      $scope.enterMessage = "";
    };

    function checkConnectionStatus(){
      if(navigator.onLine){
        return "online";
      }
      else{
        return "offline";
      }
    };
    /*Subscribing the chats collection.*/
     //$scope.subscribe('chats');
     //$scope.subscribe('images');
     Meteor.subscribe('instantMessages', $rootScope.userInfo.user_id);
     $scope.subscribe('blockedUsers');
     /*Retrieving the data from subscribed collection using helpers of Meteor.*/
     $scope.helpers({
         chatMessages: () => {
           return Chats.find({});
         },
         imageMessages: () => {
           return Images.find({});
         },
         blockedUsers: () => {
           return BlockedUsers.find({});
         }
    });
    console.log($scope.chatMessages);
    /*
    *scroll on input focus
    */
    let isIOS = ionic.Platform.isWebView() && ionic.Platform.isIOS();
    $scope.inputUp = function(){
      console.log("Received focus");
      if (isIOS) {
      this.keyboardHeight = 216;
      }
      $timeout(function() {
        $ionicScrollDelegate.$getByHandle('chatScroll').scrollBottom();
      }, 300);
    };
    /*
    *scroll on input blur
    */
    $scope.inputDown = function(){
      console.log("Blurred");
      if (isIOS) {
      this.keyboardHeight = 0;
      }
      $ionicScrollDelegate.$getByHandle('chatScroll').resize();
    };
    $scope.blockUser = function(){
      alert("blocking this user");
      if($scope.individualChatFlag){
        console.log("Blocking the user::"+$scope.paramDetails.user_id);
        Meteor.call('insertBlockUser', $scope.paramDetails.user_id, $rootScope.userInfo.user_id);
      }
      else{
        console.log("Blocking the group..."+$scope.groupDetails.block_id);
        var blockedGroup = {
          user_id: $rootScope.userInfo.user_id,
          apartment_id: $rootScope.userInfo.apartment_id,
          block_id: $scope.groupDetails.block_id
        };
        chatService.leftGroup(blockedGroup)
          .then(function(response){
            console.log(response);
            window.localStorage["userData"] = angular.toJson(response);
          });
        };
        $location.path('/chat');
    }
    function checkSenderBlocked(user_id){
      console.log($scope.blockedUsers);
      if($scope.blockedUsers === null || $scope.blockedUsers.length <= 0){
        return false;
      }
      else{
        /*Checking if current user is blocked or not*/
        var itr = 0;
        for(itr in $scope.blockedUsers){
          if(user_id == $scope.blockedUsers[itr].blocked){
            console.log("Current user is blocked");
            /* Now the current user is blocked by somebody, so checking if it is blocked
            by the receiver or not. */
            if($scope.paramDetails.user_id == $scope.blockedUsers[itr].blockedBy){
              $scope.blockedId = user_id;
              return true;
            }
          }
        }
      }
      return false;
    };
    function checkReceiverBlocked(){
      console.log($scope.blockedUsers);
      if($scope.blockedUsers === null || $scope.blockedUsers.length <= 0){
        return false;
      }
      else{
        var itr = 0;
        for(itr in $scope.blockedUsers){
          if($rootScope.userInfo.user_id == $scope.blockedUsers[itr].blockedBy){
            console.log("Current user has blocked...");
            /*Current user has blocked someone, now checking if it has blocked the
            receiver or not*/
            if($scope.paramDetails.user_id == $scope.blockedUsers[itr].blocked){
              $scope.blockedId = $scope.paramDetails.user_id;
              return true;
            }
          }
        }
      }
      return false;
    };
  }
