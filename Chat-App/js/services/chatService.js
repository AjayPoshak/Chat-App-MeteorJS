"use strict";
angular.module("chatApp")
  .service("chatService", chatService);

  function chatService($resource, $http) {
    this.getUserByApartment = function(){
      return $http.get("data/userByApartment.json");
    };
    this.postUserInfo = function(user){
      console.log("Posting user details");
      return $http.get("data/userInfo.json");
    };
    
  }
