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
});
/* 
 *  Author-Himanshu
 * Date-July24, 2015
 * Purpose- this file is resposible for getting user number and and send them a verification code
 */
//function to validate email address

app.controller('chatuserCtrl', function ($scope, $state, $rootScope, $location,$ionicPopup, $window, $ionicHistory, $ionicModal, $ionicSideMenuDelegate) {

$scope.displaySideBar = false;
  
//functionlity on back button
    $scope.myGoBack = function () {
        $location.path('/chat');
    };
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
        else
        {
            $location.path('/chat');
        }
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
    //expand group function

    $scope.expandGroup = function ()
    {
        $location.path('/groupwiseuser')
    }

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
    $scope.setGroup = function ()
    {
        $scope.isBlockDisabled = true;
    }
    
    //function tp create group
    $scope.createGroup = function ()
    {
        $location.path('/chat');
    };
    $scope.BacktoGroup = function ()
    {
        $location.path('/group');
    };
});

app.controller('contactCtrl', function ($scope, $rootScope, $location, $window) {
    //check whether user selected servieces or not
    //fuction for back button to go back to chat screen
    $rootScope.isConatct ='1'
    $scope.BacktoChat = function ()
    {
        $location.path('/chat');
    };
    $scope.changePath = function ()
    {
        $location.path('/chatuser');
    };
});

app.controller('groupwiseuserCtrl', function ($scope, $rootScope, $location, $window) {
    //check whether user selected servieces or not
    //fuction for back button to go back to chat screen
    //back to group functionality
    $rootScope.isConatct='2';
    $scope.BacktoGroup = function ()
    {
        $location.path('/group');
    }

    //edit group functionality
    $scope.editGroup = function ()
    {
        $location.path('/editgroup')
    }
    //open chat of respective user
    $scope.changePath = function()
    {
        $location.path('/chatuser');
    }
});

app.controller('editgroupCtrl', function ($scope, $rootScope, $location, $window) {
    //check whether user selected servieces or not
    //fuction for back button to go back to chat screen
    //back to group functionality
    $scope.BacktoEditGroup = function ()
    {
        $location.path('/groupwiseuser')
    }

    //function for edit group page
    $scope.addContact = function ()
    {
        $location.path('/addcontact');
    }
    $scope.SetGroup = function()
    {
        $location.path('/chat');
    }
});

app.controller('addcontactCtrl', function ($scope, $rootScope, $location, $window) {
    //check whether user selected servieces or not
    //fuction for back button to go back to chat screen
    //back to group functionality
    $scope.BacktoEditGroup = function ()
    {
        $location.path('/editgroup');
    };
});



