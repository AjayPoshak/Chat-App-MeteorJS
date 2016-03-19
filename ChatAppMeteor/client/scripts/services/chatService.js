"use strict";
angular.module("chatApp")
  .service("chatService", chatService);

  function chatService($resource, $http) {

    this.getUserByApartment = function(apartment_id){
      var apartmentId = {
          "apartment_id": apartment_id
      };
      console.log(JSON.stringify(apartmentId));
      return $http({
        method: 'POST',
        url: 'http://service.citze.in/api/UserDetails',
        data: JSON.stringify(apartmentId),
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
        headers: {'Content-Type': 'application/json; charset=UTF-8'}
      });
      //return $http.get("data/userInfo.json");
    };

    this.postNewGroup = function(newGroupData){
      console.log("Posting new group info"+JSON.stringify(newGroupData));
      return $http({
        method: 'POST',
        url:'http://service.citze.in/api/AddModifyGroup',
        data: JSON.stringify(newGroupData),
        headers: {'Content-Type':'application/json;charset=UTF-8'}
      });
    };

    this.postUpdateGroup = function(updateGroupData){
      console.log("Posting the update group info"+JSON.stringify(updateGroupData));
      return $http({
        method: 'POST',
        url: 'http://service.citze.in/api/RemoveUsersFromGroup',
        data: JSON.stringify(updateGroupData),
        headers: {'Content-Type':'application/json;charset=UTF-8'}
      });
    };

    this.postUsersGroup = function(addUsersGroup){
      console.log("Adding users to existing group"+JSON.stringify(addUsersGroup));
      return $http({
        method: 'POST',
        url: 'http://service.citze.in/api/AddModifyGroup',
        data: JSON.stringify(addUsersGroup),
        headers: {'Content-Type':'application/json;charset=UTF-8'}
      });
    };

    this.leftGroup = function(blockedGroup){
      console.log("Removing the block...."+JSON.stringify(blockedGroup));
      return $http({
        method: 'POST',
        url: 'http://service.citze.in/api/LeftAGroup',
        data: JSON.stringify(blockedGroup),
        headers: {'Content-Type':'application/json;charset=UTF-8'}
      });
    };
  }
