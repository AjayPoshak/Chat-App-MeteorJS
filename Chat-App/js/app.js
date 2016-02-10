var app=angular.module('chatApp',['ionic','ui.router'])


app.config(function($stateProvider,$urlRouterProvider){
    $stateProvider
            .state('login',{url:'/login',cache: false,templateUrl:'templates/login.html',controller:'loginCtrl'})
            .state('chat',{url:'/chat',cache: false,templateUrl:'templates/chat.html',controller:'chatCtrl'})
            .state('chatuser',{url:'/chatuser',cache: false,templateUrl:'templates/chatuser.html',controller:'chatuserCtrl'})
            .state('group',{url:'/group',cache: false,templateUrl:'templates/group.html',controller:'groupCtrl'})
            .state('contact',{url:'/contact',cache: false,templateUrl:'templates/contact.html',controller:'contactCtrl'})
            .state('addgroup',{url:'/addgroup',cache: false,templateUrl:'templates/addgroup.html',controller:'addgroupCtrl'})
            .state('groupwiseuser',{url:'/groupwiseuser',cache: false,templateUrl:'templates/groupwiseuser.html',controller:'groupwiseuserCtrl'})
            .state('editgroup',{url:'/editgroup',cache: false,templateUrl:'templates/editgroup.html',controller:'editgroupCtrl'})
            .state('addcontact',{url:'/addcontact',cache: false,templateUrl:'templates/addcontact.html',controller:'addcontactCtrl'})
            //.state('booking',{url:'/booking',templateUrl:'templates/bookingDetail.html',controller:'bookingDetailCtrl'})
            //.state('thanks',{url:'/thanks',templateUrl:'templates/thanks.html',controller:'thankCtrl'});

    $urlRouterProvider.otherwise('/login');});
