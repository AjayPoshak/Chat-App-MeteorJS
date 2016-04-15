
    var currentTime = new Date()
    var month = currentTime.getMonth() + 1
    var day = currentTime.getDate()
    var year = currentTime.getFullYear()

    if(day<10)
    {
        day = '0' + day;
    }
    if(month<10)
    {
      month = '0' + month;
    }
    var todayDate = (month + "/" + day + "/" + year);
Meteor.methods({
  'insertMessage': function(rec_id, sender_id, msg, image_id, blockedId, connectionStatus){
    var chatId = Chats.insert({
      to: rec_id,
      from: sender_id,
      message: msg,
      imageId: image_id,
      blockedId: blockedId,
      msgReached: false,
      msgRead: false,
      todaysdate:todayDate,
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
      todaysdate:todayDate,
      createdAt: new Date()
    });
  },
  'updateRecentMessage': function(groupMessage, rec_id, sender_id, msg, image_id,
     receiver_info, sender_info, connectionStatus){
    console.log("updating recent messages..............");
    // var result = Messages.findOne({to: rec_id, from: sender_id});
    /*Update recent messages for individual users.*/
    if(!groupMessage){
      var result = Messages.findOne({
        $or: [{
            $and: [{"to":rec_id}, {"from":sender_id}
            ]},
          {
            $and: [{"to":sender_id}, {"from":rec_id}]
          }]
        });
      console.log(result);
      /*There were no previous conversations between these users.*/
      if(result == undefined || result == null){
      var chatId = Messages.insert({
          groupMessage: groupMessage,
          to: rec_id,
          from: sender_id,
          message: msg,
          msgReached: false,
          msgRead: false,
          sender: JSON.parse(sender_info),
          receiver: JSON.parse(receiver_info),
          todaysdate:todayDate,
          createdAt: new Date()
        });
      }
      /*Need to update the existing conversations.*/
      else{
        console.log("need to update existing messages");
        var chatId = Messages.update({
          _id: result._id
        },
        {
          $set:{
            message: msg,
            msgReached: false,
            msgRead: false,
            todaysdate:todayDate,
            createdAt: new Date()
          }
        });
      Messages.update({
        _id: chatId
      },{
        $set: {msgReached: true}
      });
    }}
    /*Update recent messages for group conversation.*/
    else {
      console.log("updating recent group conversation....");
      var anyGroupConversation = Messages.findOne({
      $and: [{
              "to": rec_id,
              "groupMessage": true
          }]
      });
      console.log(anyGroupConversation);
      if(anyGroupConversation === undefined || anyGroupConversation === null){
        Messages.insert({
          groupMessage: groupMessage,
          to: rec_id,
          from: sender_id,
          message: msg,
          sender: sender_info,
          receiver: JSON.parse(receiver_info),
          todaysdate:todayDate,
          createdAt: new Date()
        });
      }
      else{
        var chatId = Messages.update({
          _id: anyGroupConversation._id
        },
        {
          $set:{
            from: sender_id,
            message: msg,
            msgReached: false,
            msgRead: false,
            todaysdate:todayDate,
            createdAt: new Date()
          }
        });
      }

    }
    if(connectionStatus === "online"){
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
  },
  /*from: userId*/
  'updateDeliveryMessage': function(currentUserId, userId){
    console.log("updating delivery of these messages"+currentUserId);
    Chats.update({
      from: userId,
      to: currentUserId
    },{
      $set: {msgRead: true}
    }, {
      multi: true
  });
  },
  /**
  * Current user unblocks the receiver by deleting its entry from blocked collections
  * in mongoDB.
  */
  'unblockUser': function(currentUserId, receiverId){
    console.log(currentUserId+" is unblocking "+receiverId);
    BlockedUsers.remove({
      blocked: receiverId,
      blockedBy: currentUserId
    });
  }
});
