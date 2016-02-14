"use strict";
angular.module("chatApp")
  .controller('loginCtrl', loginCtrl);
  function loginCtrl($scope, $window, chatService, $rootScope, $location) {

    if(localStorage.getItem("userDetails") === null)
    {
      $rootScope.Isloggedin=false;
      console.log("Inside login controller...");
      $scope.username = null;
      $scope.password = null;
      $scope.signIn = function (user)
      {
        console.log(user.username);
        chatService.postUserInfo(user)
          .success(function(response){
            console.log(response);
            $rootScope.userDetails = response;
            window.localStorage["userDetails"] = angular.toJson(response);
            $rootScope.Isloggedin=true;
            $location.path('/chat');
          })
          .error(function(err){
            console.error(err);
          });
      }
    }
    else {
            $rootScope.Isloggedin=true;
            $location.path('/chat');
}
  };
