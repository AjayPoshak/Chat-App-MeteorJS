"use strict";
angular.module("chatApp")
  .service("chatService", chatService);

  function chatService($resource, $http) {

    this.getUserByApartment = function(user_id, apartment_id){
      var apartmentId = {
          "user_id": user_id,
          "apartment_id": apartment_id
      };
      console.log(JSON.stringify(apartmentId));
      return $http({
        method: 'POST',
        url: 'http://service.citze.in/api/UserContacts',
        data: JSON.stringify(apartmentId),
        headers: {'Content-Type': 'application/json'}
      });
      //return $http.get("data/userByApartment.json");
    };

    this.postUserInfo = function(user){
      console.log("Posting user details"+JSON.stringify(user));
      return $http({
        method: 'POST',
        url: 'http://service.citze.in/api/userAuth',
        data: JSON.stringify(user),
        headers: {'Content-Type': 'application/json'}
      });
      //return $http.get("data/userInfo.json");
    };

    this.postNewGroup = function(newGroupData){
      console.log("Posting new group info"+JSON.stringify(newGroupData));
      return $http({
        method: 'POST',
        url:'http://service.citze.in/api/AddModifyGroup',
        data: JSON.stringify(newGroupData),
        headers: {'Content-Type':'application/json'}
      });
    };

    this.postUpdateGroup = function(updateGroupData){
      console.log("Posting the update group info"+JSON.stringify(updateGroupData));
      return $http({
        method: 'POST',
        url: 'http://service.citze.in/api/RemoveUsersFromGroup',
        data: JSON.stringify(updateGroupData),
        headers: {'Content-Type':'application/json'}
      });
    };

    this.postUsersGroup = function(addUsersGroup){
      console.log("Adding users to existing group"+JSON.stringify(addUsersGroup));
      return $http({
        method: 'POST',
        url: 'http://service.citze.in/api/AddModifyGroup',
        data: JSON.stringify(addUsersGroup),
        headers: {'Content-Type':'application/json'}
      });
    };

    this.leftGroup = function(blockedGroup){
      console.log("Removing the block...."+JSON.stringify(blockedGroup));
      return $http({
        method: 'POST',
        url: 'http://service.citze.in/api/LeftAGroup',
        data: blockedGroup,
        headers: {'Content-Type':'application/json'}
      });
    };
    this.getGroupData = function(user_id, apartment_id){
      var apartmentId = {
          "user_id": user_id,
          "apartment_id": apartment_id
      };
      console.log(JSON.stringify(apartmentId));
      return $http({
        method: 'POST',
        url: 'http://service.citze.in/api/UserDetails',
        data: JSON.stringify(apartmentId),
        headers: {'Content-Type': 'application/json'}
      });
      //return $http.get("data/userByApartment.json");
    };

    //function to get user profile
    this.getOtherUserInfo = function(user_id, apartment_id){
      var apartmentId = {
          "user_id": user_id,
          "apartment_id": apartment_id
      };
      console.log(JSON.stringify(apartmentId));
      return $http({
        method: 'POST',
        url: 'http://service.citze.in/api/GetUserProfile',
        data: JSON.stringify(apartmentId),
        headers: {'Content-Type': 'application/json'}
      });
    };
  this.onNotification = function(user_id, apartment_id){
      var apartmentId = {
          "user_id": user_id,
          "apartment_id": apartment_id,
          "push_notification" : "true"
      };
      console.log(JSON.stringify(apartmentId));
      return $http({
        method: 'POST',
        url: 'http://service.citze.in/api/UpdatePushNotification',
        data: JSON.stringify(apartmentId),
        headers: {'Content-Type': 'application/json'}
      });
    };
  this.offNotification = function(user_id, apartment_id){
      var apartmentId = {
          "user_id": user_id,
          "apartment_id": apartment_id,
          "push_notification" : "false"
      };
      console.log(JSON.stringify(apartmentId));
      return $http({
        method: 'POST',
        url: 'http://service.citze.in/api/UpdatePushNotification',
        data: JSON.stringify(apartmentId),
        headers: {'Content-Type': 'application/json'}
      });
    };

    this.BlockpersonalUser = function(user_id, apartment_id,blockuser){
      var apartmentId = {
          "user_id": user_id,
          "apartment_id": apartment_id,
          "user_action" : "BlockUsers",
          "users" :[ 
                    {  user_id:blockuser }
                 ]
      };
      console.log(JSON.stringify(apartmentId));
      return $http({
        method: 'POST',
        url: 'http://service.citze.in/api/BlockUsers',
        data: JSON.stringify(apartmentId),
        headers: {'Content-Type': 'application/json'}
      });
    };
      this.UnBlockpersonalUser = function(user_id, apartment_id,unblockuser){
      var apartmentId = {
          "user_id": user_id,
          "apartment_id": apartment_id,
          "user_action" : "UnblockUsers",
            "users" :[ 
                    {  user_id:unblockuser }
                 ]
      };
      console.log(JSON.stringify(apartmentId));
      return $http({
        method: 'POST',
        url: 'http://service.citze.in/api/BlockUsers',
        data: JSON.stringify(apartmentId),
        headers: {'Content-Type': 'application/json'}
      });
    };

    this.getallContact = function(user_id, apartment_id){
      var apartmentId = {
          "user_id": user_id,
          "apartment_id": apartment_id
      };
      console.log(JSON.stringify(apartmentId));
      return $http({
        method: 'POST',
        url: 'http://service.citze.in/api/UserContacts',
        data: JSON.stringify(apartmentId),
        headers: {'Content-Type': 'application/json'}
      });
    };
};