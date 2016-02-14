"use strict";
angular.module("chatApp")
  .controller('chatCtrl', chatCtrl);

  function chatCtrl($scope, $rootScope, chatService, $window, $state, $location, $timeout, $ionicModal, $ionicSideMenuDelegate) {
    $scope.displaySideBar = false;
    $scope.popupClass='button-setting';
    chatService.getUserByApartment()
      .success(function(response){
        $rootScope.chatContacts = response;
        window.localStorage["userData"] = angular.toJson(response);
        console.log(response);
      })
      .error(function(err){
        console.log(err);
      });
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
    $scope.isSerachtrue = false;

    $scope.addNewUser = function ()
    {
        $location.path('addgroup');
    };

    $scope.isSerachtrue = false;
    $rootScope.isConatct = false;
//to show search bar
    $scope.showsearchBar = function ()
    {
        $scope.isSerachtrue = true;

    };

//hide search bar

    $scope.hideSerarchbar = function ()
    {
        $scope.isSerachtrue = false;
    };
    //for left toggle navigation
    $scope.goToGroup = function ()
    {
        $location.path('/group');
    }
    $scope.changePath = function ()
    {
        setTimeout(function () {
            $location.path('/chatuser');
            $scope.$apply();
        }, 80);

    };
    //function to go to contact page

    $scope.goToContact = function ()
    {
        $location.path('/contact');
    }
};
