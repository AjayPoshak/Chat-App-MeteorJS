angular.module('chatApp',['angular-meteor','ionic','ngResource','angularMoment']);
angular.module("chatApp")
.config(function($stateProvider,$urlRouterProvider){
    $stateProvider
            .state('login',{url:'/login',cache: false,templateUrl:'client/templates/login.html',controller:'loginCtrl'})
            .state('chat',{url:'/chat',cache: false,templateUrl:'client/templates/chat.html',controller:'chatCtrl'})
            .state('chatuser',{url:'/chatuser',params: { userDetailParam: null},cache: false,templateUrl:'client/templates/chatuser.html',controller:'chatuserCtrl'})
            .state('group',{url:'/group',cache: false,templateUrl:'client/templates/group.html',controller:'groupCtrl'})
            .state('contact',{url:'/contact',cache: false,templateUrl:'client/templates/contact.html',controller:'contactCtrl'})
            .state('addgroup',{url:'/addgroup',cache: false,templateUrl:'client/templates/addgroup.html',controller:'addgroupCtrl'})
            .state('groupwiseuser',{url:'/groupwiseuser',cache: false,templateUrl:'client/templates/groupwiseuser.html',controller:'groupwiseuserCtrl'})
            .state('editgroup',{url:'/editgroup',cache: false,templateUrl:'client/templates/editgroup.html',controller:'editgroupCtrl'})
            .state('addcontact',{url:'/addcontact',cache: false,templateUrl:'client/templates/addcontact.html',controller:'addcontactCtrl'})
            //.state('booking',{url:'/booking',templateUrl:'templates/bookingDetail.html',controller:'bookingDetailCtrl'})
            //.state('thanks',{url:'/thanks',templateUrl:'templates/thanks.html',controller:'thankCtrl'});

    $urlRouterProvider.otherwise('/login');});
