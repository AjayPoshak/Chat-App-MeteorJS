"use strict";
angular.module("chatApp")
  .controller('loginCtrl', loginCtrl);
  function loginCtrl($scope, $window, chatService, $rootScope, $location,$ionicPopup) {
    if(localStorage.getItem("userDetails") === null)
    {
      $rootScope.Isloggedin=false;
      $scope.username = null;
      $scope.password = null;
      $scope.signIn = function (user)
      {
        $scope.isLoading = true;
        console.log(user.username);
        chatService.postUserInfo(user)
          .success(function(response){
            console.log(response);
            $rootScope.userDetails = response;
            //check for user authentication
            console.log(response.login_result);
            if(response.login_result == 'fail')
            {
              //ION POPUP FOR INVALID DETAIL
                  $ionicPopup.alert({
                  title: '',
                  content: 'Invalid user name or password'
                }).then(function(res) {
                  //redirect to login
                    $location.path('/login');
                });
            }
            else
            {
              window.localStorage["userDetails"] = angular.toJson(response);
              $rootScope.Isloggedin=true;
              /*This flag will ensure that userData API in chatController is called
              only once.
              */
              $rootScope.apiCallFlag = false;
              $location.path('/chat');
            }
          })
          .error(function(err){
            console.error(err);
          });
      };
    }
    else {
            $rootScope.Isloggedin=true;
            $location.path('/chat');
}
  };
