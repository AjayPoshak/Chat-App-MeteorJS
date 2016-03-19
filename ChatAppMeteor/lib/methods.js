Meteor.methods({
  'insertMessage': function(rec_id, sender_id, msg, image_id, blockedId, connectionStatus){
    var chatId = Chats.insert({
      to: rec_id,
      from: sender_id,
      message: msg,
      imageId: image_id,
      blockedId: blockedId,
      msgReached: false,
      createdAt: new Date()
    });
    console.log("connectionStatus::"+connectionStatus);
    console.log("chatId:: "+chatId);
    /*When message is successfully inserted into db
    *	we update the msgReached field, which would be used to
    *	show single tick on view. Single tick signifies that message
    *	has been delivered to receiver.
    */
   if(connectionStatus === "offline"){
     console.log("No reached message update");
   }
   if(connectionStatus === "online"){
    Chats.update({
      _id: chatId
    },{
      $set: {msgReached: true}
    });
   }
  },
  'insertGroupMessage': function(block_id, user_id, username, msg, image_id, connectionStatus){
    Chats.insert({
      to: block_id,
      from: user_id,
      fromName: username,
      message: msg,
      imageId: image_id,
      createdAt: new Date()
    });
  },
  'updateRecentMessage': function(groupMessage, rec_id, sender_id, msg, image_id,
     receiver_info, sender_info, connectionStatus){
    // var result = Messages.findOne({to: rec_id, from: sender_id});
    var result = Messages.findOne(
      {
        $or: [
          {
            $and: [
              {"to":rec_id},
              {"from":sender_id}
            ]
          },
          {
            $and: [
              {"to":sender_id},
              {"from":rec_id}
            ]
          }
        ]
      }
    );
    console.log(result);
    if(result == undefined || result == null){
      if(groupMessage){
        Messages.insert({
          groupMessage: groupMessage,
          to: rec_id,
          from: sender_id,
          message: msg,
          sender: sender_info,
          receiver: JSON.parse(receiver_info),
          createdAt: new Date()
        });
      }
      else{
        var chatId = Messages.insert({
          groupMessage: groupMessage,
          to: rec_id,
          from: sender_id,
          message: msg,
          msgReached: false,
          sender: JSON.parse(sender_info),
          receiver: JSON.parse(receiver_info),
          createdAt: new Date()
        });
        if(connectionStatus === "online"){
          Messages.update({
            _id: chatId
          },{
            $set: {msgReached: true}
          });
        }
      }

    }
    else{
      console.log("need to update existing messages");
      var chatId = Messages.update({
        _id: result._id
      },
    {
      $set:{
        message: msg,
        msgReached: false,
        createdAt: new Date()
      }
    });
    Messages.update({
      _id: chatId
    },{
      $set: {msgReached: true}
    });
    }
  },
  'insertBlockUser': function(blocked, blockedBy){
    BlockedUsers.insert({
      blocked: blocked,
      blockedBy: blockedBy
    });
  },
  'updateMsgReached': function(currentUserId){
    Chats.update({
      from: currentUserId
      },{
        $set: {msgReached: true}
      },{
        multi: true
      });
    Messages.update({
      from: currentUserId
    },{
      $set: {msgReached: true}
    },{
      multi: true
    });
    }
});
