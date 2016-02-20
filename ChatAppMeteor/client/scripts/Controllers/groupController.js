"use strict";
angular.module("chatApp")
  .controller('groupCtrl', groupCtrl);
  function groupCtrl($scope, $rootScope, $location, $window) {
    $rootScope.isConatct ='3'
    $scope.BacktoChat = function ()
    {
        $location.path('/chat');
    };
    $scope.CreateGroup = function ()
    {
        $location.path('/addgroup');
    };
    $scope.changePath = function ()
    {
        $location.path('/chatuser');
    };
    $scope.expandGroup = function ()
    {
        $location.path('/groupwiseuser')
    }

};
