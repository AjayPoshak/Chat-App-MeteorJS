/*
 * Author-Himanshu
 * Date-July24, 2015
 * Purpose- this file is resposible for getting services and choose according to that
 */
app.controller('loginCtrl', function ($scope, $window, $rootScope, $location) {

    $scope.signIn = function ()
    {
        $location.path('/chat');
    }

});

app.controller('chatCtrl', function ($scope, $rootScope, $window, $state, $location, $timeout, $ionicModal, $ionicSideMenuDelegate) {


    $scope.isSerachtrue = false;

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

    $scope.toggleSideBar = function () {
        console.log("Inside function...");
        $ionicSideMenuDelegate.toggleRight();
    };
    $scope.addNewUser = function ()
    {
        $location.path('addgroup');
    }
    $scope.changePath = function ()
    {
        setTimeout(function () {
            console.log('change path');
            $location.path('/chatuser');
            $scope.$apply();
        }, 80);

    };
});
/* 
 *  Author-Himanshu
 * Date-July24, 2015
 * Purpose- this file is resposible for getting user number and and send them a verification code
 */
//function to validate email address

app.controller('chatuserCtrl', function ($scope, $state, $rootScope, $location, $window, $ionicHistory, $ionicModal, $ionicSideMenuDelegate) {


//functionlity on back button
    $scope.myGoBack = function () {
        $location.path('/chat');
    };

    $scope.toggleSideBar = function () {
        $ionicSideMenuDelegate.toggleRight();
    };
});

/* 
 Author-Himanshu
 Purpose- this conroller is used for terms and conditions 
 */


/* 
 Controller used to book a particular user detail and for booking
 */


app.controller('groupCtrl', function ($scope, $rootScope, $location, $window) {
    //check whether user selected servieces or not

});
/* 
 *  Author-Himanshu
 * Date-July24, 2015
 * Purpose- this file is resposible for otp messafe forwarding
 */


app.controller('addgroupCtrl', function ($scope, $rootScope, $location, $window) {
    $scope.isBlockDisabled = true;
    $scope.changePath = function () {
        if ($scope.isBlockDisabled) {
            $scope.isBlockDisabled = false;
        }
        else {
            $scope.isBlockDisabled = true;
        }
    }
    $scope.backFunction = function ()
    {
        $location.path('/chat');
    }
    $scope.setGroup = function ()
    {
        $scope.isBlockDisabled = true;
    }
    $scope.createGroup = function ()
    {
        $location.path('/chat');
    }
});

