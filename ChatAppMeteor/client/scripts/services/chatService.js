"use strict";
angular.module("chatApp")
  .service("chatService", chatService);

  function chatService($resource, $http) {
    this.getChatMessages = function(){
      return $http.get("data/chatData.json");
    };

    this.getUserByApartment = function(apartment_id){
      var apartmentId = {
          "apartment_id": apartment_id
      };
      console.log(JSON.stringify(apartmentId));
      return $http({
        method: 'POST',
        url: 'http://service.citze.in/api/UserDetails',
        data: JSON.stringify(apartmentId),
        //headers: {'Content-Type': 'application/json'}
        headers: {'Content-Type': 'application/json; charset=UTF-8'}
      });
      //return $http.get("data/userByApartment.json");
    };

    this.postUserInfo = function(user){
      console.log("Posting user details"+JSON.stringify(user));
      return $http({
        method: 'POST',
        url: 'http://service.citze.in/api/userAuth',
        data: JSON.stringify(user),
        //headers: {'Content-Type': 'application/json'}
        headers: {'Content-Type': 'application/json; charset=UTF-8'}
      });
      //return $http.get("data/userInfo.json");
    };


  }
