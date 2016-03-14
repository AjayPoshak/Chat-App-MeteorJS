"use strict";
angular.module("chatApp")
  .controller('chatCtrl', chatCtrl);

  function chatCtrl($scope, $rootScope, chatService, $window, $http, $state, $location, $timeout, $ionicModal, $ionicSideMenuDelegate) {
    $scope.displaySideBar = false;
    $scope.popupClass='button-setting';
    $scope.current = {};
    $scope.current = JSON.parse(localStorage.getItem("userDetails"));
    console.log("apartment_id::"+$scope.current.apartment_id);
    chatService.getUserByApartment($scope.current.apartment_id)
      .then(function(response){
        $rootScope.chatContacts = response;
        window.localStorage["userData"] = angular.toJson(response);
        console.log(response);
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
    };
    //for left toggle navigation
    $scope.goToGroup = function ()
    {
        $location.path('/group');
    }
    /*
    *Redirects the user to chat screen
    *@method changePath
    *@param {object} User Information
    */
    $scope.changePath = function (userInfo)
    {
        console.log(userInfo);
        var userParam = JSON.stringify(userInfo);
        setTimeout(function () {
            $state.go('chatuser',{userDetailParam:userParam});
            $scope.$apply();
        }, 80);

    };
    //function to go to contact page
    $scope.goToContact = function ()
    {
        $location.path('/contact');
    }
    //Subscribe the messages collection which stores the recent chats
    $scope.subscribe("messages");
    //Retrieving the entries from messages collection using helpers methods
    $scope.helpers({
      recentMessages: () => {
        return Messages.find({
           $or:
           [ { "from": $scope.current.user_id },
            { "to": $scope.current.user_id }
           ]
        },
         {
          sort: {createdAt: -1}
        });
      }
    })
};
