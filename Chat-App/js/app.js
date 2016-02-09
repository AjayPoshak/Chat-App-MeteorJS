var app=angular.module('chatApp',['ionic','ui.router'])


app.config(function($stateProvider,$urlRouterProvider){
    $stateProvider
            .state('login',{url:'/login',cache: false,templateUrl:'templates/login.html',controller:'loginCtrl'})
            .state('chat',{url:'/chat',cache: false,templateUrl:'templates/chat.html',controller:'chatCtrl'})
            .state('chatuser',{url:'/chatuser',cache: false,templateUrl:'templates/chatuser.html',controller:'chatuserCtrl'})
            //.state('group',{url:'/group',cache: false,templateUrl:'templates/group.html',controller:'groupCtrl'})
            .state('addgroup',{url:'/addgroup',cache: false,templateUrl:'templates/addgroup.html',controller:'addgroupCtrl'})
            //.state('booking',{url:'/booking',templateUrl:'templates/bookingDetail.html',controller:'bookingDetailCtrl'})
            //.state('thanks',{url:'/thanks',templateUrl:'templates/thanks.html',controller:'thankCtrl'});

    $urlRouterProvider.otherwise('/login');});
