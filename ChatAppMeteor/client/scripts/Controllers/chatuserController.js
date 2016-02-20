"use strict";
angular.module("chatApp")
  .controller('chatuserCtrl', chatuserCtrl);

  function chatuserCtrl($scope, $state, $rootScope, chatService, $location,$ionicPopup, $window, $ionicHistory, $ionicModal, $stateParams) {
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
    chatService.getChatMessages()
      .success(function(response){
        console.log(response);
        $scope.chatMessages = response;
      })
      .error(function(err){
        console.error(err);
      });
      if(!$rootScope.userInfo){
        $rootScope.userInfo = JSON.parse(localStorage.getItem("userDetails"));
        console.log("getting from local...");
      }
      console.log("userInfo"+$rootScope.userInfo[0].user_id);
};
