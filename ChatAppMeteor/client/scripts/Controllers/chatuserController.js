"use strict";
angular.module("chatApp")
  .controller('chatuserCtrl', chatuserCtrl);

  function chatuserCtrl($scope, $state, Upload, $rootScope, $anchorScroll,chatService,$ionicPopup, $location, $ionicScrollDelegate, $stateParams, $timeout) {
    /*Retrieving the information of user who has logged in.*/

     $scope.UserisBlocked = false;
    if(!$rootScope.userInfo){
      $rootScope.userInfo = JSON.parse(localStorage.getItem("userDetails"));
      console.log("getting from local...");
      console.log("userInfo"+$rootScope.userInfo);
    }
    $scope.chatLimit = 10;
    //get today's date and append to chat

    var currentTime = new Date()
    var month = currentTime.getMonth() + 1
    var day = currentTime.getDate()
    var year = currentTime.getFullYear()

    if(day<10)
    {
        day = '0' + day;
    }
    if(month<10)
    {
      month = '0' + month;
    }
    $scope.checkTodayDate = (month + "/" + day + "/" + year);
    //$scope.isReceiverBlocked = false;
    /* Checking the internet connection in every 1 minute, and calling
    *	the function to update the delivery of message.
    */
    var connectionStatus = null;
    setInterval(function(){
      connectionStatus = checkConnectionStatus();
      if(connectionStatus === "online"){
        //console.log("Now ONLINE.....updating deliveries");
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

    console.log("Read the messages");
    /*Double Tick functionlity for individual chat*/
    if($scope.paramDetails){
        Meteor.call("updateDeliveryMessage", $rootScope.userInfo.user_id, $scope.paramDetails.user_id);
          setTimeout(function() {
                $ionicScrollDelegate.scrollBottom(true);
        }, 1);
    }
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
    $scope.dateNow = function(date){
      console.log(date);
      return true;
    }
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

   var span = $('<span>').css('display','inline-block')
.css('word-break','break-all').appendTo('body').css('visibility','hidden');
function initSpan(textarea){
  span.text(textarea.text())
      .width(textarea.width())
      .css('font',textarea.css('font'));
}

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
          $scope.isReceiverBlocked = checkReceiverBlocked();
          console.log($scope.isReceiverBlocked);
          if(isSenderBlocked || $scope.isReceiverBlocked){
            console.log("receiver has already blocked the sender...");
            console.log("Or sender has blocked the receiver.....");
            Meteor.call('insertMessage', "-1", $rootScope.userInfo.user_id, $scope.enterMessage,imageId, $scope.blockedId, connectionStatus);
            setTimeout(function() {
                $ionicScrollDelegate.scrollBottom(true);
        }, 1);
          }
          else{
            Meteor.call('insertMessage', $scope.paramDetails.user_id, $rootScope.userInfo.user_id, $scope.enterMessage, imageId, $scope.blockedId, connectionStatus);
            Meteor.call('updateRecentMessage', groupMessage, $scope.paramDetails.user_id, $rootScope.userInfo.user_id, $scope.enterMessage, imageId,
             angular.toJson($scope.paramDetails), angular.toJson($scope.userInfo), connectionStatus);
              setTimeout(function() {
                $ionicScrollDelegate.scrollBottom(true);
        }, 1);
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
            setTimeout(function() {
                $ionicScrollDelegate.scrollBottom(true);
        }, 1);
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
           setTimeout(function() {
                $ionicScrollDelegate.scrollBottom(true);
        }, 1);
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
            Meteor.call('updateRecentMessage', groupMessage, $scope.paramDetails.block_id,$rootScope.userInfo.user_id, "Image", imageId,
             $scope.paramDetails.profile_image, $scope.paramDetails.username, connectionStatus);
           setTimeout(function() {
                $ionicScrollDelegate.scrollBottom(true);
        }, 1);
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
     if($scope.paramDetails){
        Meteor.subscribe('instantMessages', $rootScope.userInfo.user_id, "infinite");
     }
     if($scope.groupDetails){
       Meteor.subscribe('instantMessages', $rootScope.userInfo.user_id, $scope.groupDetails.block_id);
     }
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
    /*Checking whther the user is blocked or not*/
    setTimeout(function(){
      $scope.isReceiverBlocked = checkReceiverBlocked();
      console.log($scope.isReceiverBlocked);
    }, 600);


    //filter message on date bases
    $scope.chatToFilter = function(){
  $scope.indexedGenres = [];
  return $scope.chatMessages;
};

//filter basis on index if new
$scope.filterGenres = function(msg) {
        var genreIsNew = $scope.indexedGenres.indexOf(msg.todaysdate) == -1;
        if (genreIsNew) {
            $scope.indexedGenres.push(msg.todaysdate);
        }
        return genreIsNew;
    };

    //console.log($scope.chatMessages);

    /*
    * scroll on input focus
    */
    let isIOS = ionic.Platform.isWebView() && ionic.Platform.isIOS();
    $scope.inputUp = function(){
      console.log("Received focus");
      if (isIOS) {
      this.keyboardHeight = 216;
      }
      $timeout(function() {
        $ionicScrollDelegate.$getByHandle('chatScroll').scrollBottom();
      }, 30);
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
      if($scope.individualChatFlag){
          $ionicPopup.confirm({
             title: 'Confirm Block',
             template: 'Are you sure you want Block ?'
           }).then(function(res) {
             if(res) {
                Meteor.call('insertBlockUser', $scope.paramDetails.user_id, $rootScope.userInfo.user_id);
                  chatService.BlockpersonalUser($rootScope.userInfo.user_id,$rootScope.userInfo.apartment_id,$scope.paramDetails.user_id)
                .then(function(response){
                  console.log(response);
                 $scope.UserisBlocked = true;
                });
             } else {

             }
           });
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
                    $location.path('/chat');
          });
        };

    };

    $scope.unBlockUser = function(){
     if($scope.individualChatFlag){
      Meteor.call('unblockUser', $rootScope.userInfo.user_id, $scope.paramDetails.user_id);
      $scope.isReceiverBlocked = false;
       chatService.UnBlockpersonalUser($rootScope.userInfo.user_id,$rootScope.userInfo.apartment_id,$scope.paramDetails.user_id)
            .then(function(response){
              console.log(response);
             $scope.UserisBlocked = false;
            });
    }
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
    /**
     * * function forlogout reset local storage and move to login page
     * @Author- Himanshu Gupta
     */
     $scope.logOut = function()
     {
        localStorage.removeItem('userDetails');
        localStorage.removeItem('userData');
        localStorage.removeItem('groupData');
        $location.path('/login');
     }

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
    //function to get groupdata detail like blocked user and push notoification state
    function geUserPersonalDetail()
    {
      if($scope.individualChatFlag)
      {
        chatService.getGroupData($rootScope.userInfo.user_id,$rootScope.userInfo.apartment_id)
            .then(function(response){
              console.log(response);
          var itr = 0;
          console.log(response.data.blocked_users);
          for(itr in response.data.blocked_users){
          if($scope.paramDetails.user_id == response.data.blocked_users[itr].user_id)
          {
              $scope.UserisBlocked = true;
          }
        }
            });
      }
    }
    function getOtherUserDetail()
    {
      if($scope.individualChatFlag)
      {
        chatService.getOtherUserInfo($scope.paramDetails.user_id,$rootScope.userInfo.apartment_id)
            .then(function(response){
              console.log(response);
              $rootScope.OtherUserInfo = response;
            });
      }
    }
    setTimeout(function() {
                $scope.chatLimit = 500;
        }, 500);
        setTimeout(function() {
                $ionicScrollDelegate.scrollBottom(true);
        }, 700);
    //function to show user info in one to one chat

    $scope.showUserInfo = function()
    {
          if($scope.individualChatFlag)
          {
              $ionicPopup.alert({
             templateUrl: 'client/templates/Userinfo.html'
           })
          .then(function(res) {

           });
        }
    }

    //function to get user call number
    $scope.GetotherPhonenumber = function()
    {
        if($scope.individualChatFlag)
          {

              $ionicPopup.alert({
                  title: $rootScope.OtherUserInfo.data.PhoneNo,
                  content: ''
                }).then(function(res) {
                });
        }
    }

    //
    getOtherUserDetail();
    geUserPersonalDetail();
  }
