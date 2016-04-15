"use strict";
angular.module("chatApp")
  .controller('chatCtrl', chatCtrl);

  function chatCtrl($scope, $rootScope, chatService, $ionicLoading,$timeout,$ionicPopup, $http, $meteor,  $state, $location, $ionicModal, $ionicSideMenuDelegate) {
    $scope.NoRecentConversation = '';
    $scope.isNotificationOn = true;
    $scope.displaySideBar = false;
    $scope.isLoading = false;
    $scope.popupClass='button-setting';
    $scope.current = {};
    $scope.recentMessages = [];
    $scope.groupsUserMemberOf = []; //List of all groups in which the current user is a member
    $scope.current = JSON.parse(localStorage.getItem("userDetails"));
    console.log("apartment_id::"+$scope.current.apartment_id);
    /*Make sure that this API is called only in one case, just after the login.
    * Otherwise, this API shouldn't be called as this introduces the latency between

    * page transition.
    */

    //get today's date
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
    $scope.todayDate = (day + "/" + month + "/" + year);
    if($rootScope.apiCallFlag === false){
      chatService.getUserByApartment($scope.current.user_id, $scope.current.apartment_id)
        .then(function(response){
          $scope.isLoading = true;
          $rootScope.chatContacts = response;
          window.localStorage["userData"] = angular.toJson(response);
          console.log(response);
          $rootScope.apiCallFlag = true;
          $scope.isLoading = false;
        });
    }
    /*Fetching group data and storing it in localStorage*/
    if(!$rootScope.groupContacts){
      chatService.getGroupData($scope.current.user_id, $scope.current.apartment_id)
        .then(function(response){
          $scope.isLoading = true;
          current = $rootScope.groupContacts = response;
          window.localStorage["groupData"] = angular.toJson(response);
          console.log(response);
          $scope.isLoading = false;
        });
      }
      function getGroupsUserMemberOf(){
        if(!$rootScope.groupContacts){
          $rootScope.groupContacts = JSON.parse(localStorage.getItem("groupData"));
          console.log("getting from local...");
        }
        if($rootScope.groupContacts.data != null && $rootScope.groupContacts.data != undefined){
          for(var i in $rootScope.groupContacts.data.blocks){
            $scope.groupsUserMemberOf[i] = $rootScope.groupContacts.data.blocks[i].block_id;
            console.log($scope.groupsUserMemberOf[i]);
          };
        }
      };

    $scope.toggleSideBar = function () {
        if($scope.displaySideBar){
          $scope.displaySideBar = false;
          $scope.popupClass = 'button-setting';
        }
        else {
        $scope.displaySideBar = true;
        $scope.popupClass = 'close-button-setting';
        }
    };
    $scope.isSearchtrue = false;

    $scope.addNewUser = function ()
    {
        $location.path('addgroup');
    };

    $scope.isSearchtrue = false;
    $rootScope.isConatct = false;
    /**
     * Shows the searchBar in view
     */
    $scope.showsearchBar = function ()
    {
        $scope.isSearchtrue = true;
    };
    /**
     * Hides the searchbar in view
     */
    $scope.hideSearchbar = function ()
    {
      $scope.isSearchtrue = false;
      $state.go($state.current, {}, {reload: true});
    };

    $scope.emptySearch = function()
    {
       $timeout(function() {
          $scope.search = null;
          $scope.search = '';
          $scope.$apply();
        }, 10);
    }
    //for left toggle navigation
    $scope.goToGroup = function ()
    {
        $location.path('/group');
    }
    /*
    *Redirects the user to chat screen
    *@method changePath
    *@param {object} User/Group Information
    */
    $scope.changePath = function (recent)
    {
        $scope.isLoading = true;
        console.log(recent);
        if(recent.groupMessage === false && recent.sender.user_id != $scope.current.user_id){
          var userParam = JSON.stringify(recent.sender);
          $state.go('chatuser',{userDetailParam:userParam});
        };
        if(recent.groupMessage === false && recent.receiver.user_id != $scope.current.user_id){
          var userParam = JSON.stringify(recent.receiver);
          $state.go('chatuser',{userDetailParam:userParam});
        };
        if(recent.groupMessage){
          var groupParam = JSON.stringify(recent.receiver);
          $state.go('chatuser',{groupDetailParam:groupParam});
        };
        $scope.isLoading = false;
    };
    //$scope.isLoading = false;
    //function to go to contact page
    $scope.goToContact = function ()
    {
        $scope.isLoading = true;
        $location.path('/contact');
    }
    /**
     * * function for logout reset local storage and move to login page
     * @Author- Himanshu Gupta
     */
     $scope.logOut = function()
     {
        localStorage.removeItem('userDetails');
        localStorage.removeItem('userData');
        localStorage.removeItem('groupData');
        $location.path('/login');
     }
     var current = {};
    if(!$rootScope.chatContacts){
      current = $rootScope.chatContacts = JSON.parse(localStorage.getItem("userData"));
      console.log("getting from local...");
    }
    else{
      current = $rootScope.chatContacts;
    }
  //console.log(current.data.blocks[0]);

  $scope.blocks = [];
  //console.log(current.data.blocks.length);

  if(current !== undefined && current !== null){
      for(var i in current.data.blocks){
        $scope.blocks[i] = current.data.blocks[i].block_id;
        //console.log($scope.blocks[i]);
    }
  }
  //console.log($scope.blocks);
  getGroupsUserMemberOf();
    //Subscribe the messages collection which stores the recent chats
    $scope.subscribe("messages");
    //Retrieving the entries from messages collection using helpers methods
    $scope.helpers({
      recentMessages: () => {
        // return Messages.find({
        //     $or: [
        //       {"to": $scope.current.user_id},
        //       {"from": $scope.current.user_id},
        //       {"groupMessage": true}
        //     ]
        //    }
           return Messages.find(  { $or : [   { $and : [   { $or : [  { "to" : $scope.current.user_id },
             { "from" : $scope.current.user_id } ] } , { "groupMessage" : false } ] } ,
               { $and : [  { "groupMessage" : true },  { "to" : { $in : $scope.groupsUserMemberOf } } ] }  ] }
           ,{
            sort: {createdAt: -1}
          });
        }
      });

    console.log($scope.groupsUserMemberOf);
    $scope.messages = [];
    function groupRecentMessages(){
      console.log($scope.messages);
      for(var itr in $scope.messages){
        console.log($scope.messages[itr]);
      };
    };
    //groupRecentMessages();
    console.log($scope.recentMessages);
    if($scope.recentMessages.length === 0)
    {
      console.log('log testing');
      $scope.NoRecentConversation = 'No Recent Conversation'
      console.log($scope.recentMessages.length);
    };


    function getOtherUserDetail()
    {

           chatService.getOtherUserInfo($scope.current.user_id, $scope.current.apartment_id)
            .then(function(response){
              console.log(response);
              $rootScope.OtherUserInfo = response;
            });
    }
    //function to show user info in one to one chat

    $scope.showUserInfo = function()
    {
              $ionicPopup.alert({
             templateUrl: 'client/templates/Userinfo.html'
           })
          .then(function(res) {

           });
    };
    $scope.offNotification = function()
    {
            chatService.offNotification($scope.current.user_id, $scope.current.apartment_id)
            .then(function(response){
              console.log(response);
              $scope.isNotificationOn = false;
            });
    }
    $scope.onNotification = function()
    {
            chatService.onNotification($scope.current.user_id, $scope.current.apartment_id)
            .then(function(response){
              console.log(response);
              $scope.isNotificationOn = true;
            });
    }
    getOtherUserDetail();
};
