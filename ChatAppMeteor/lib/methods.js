Meteor.methods({
  'insertMessage': function(rec_id, sender_id, msg, image_id){
    Chats.insert({
      to: rec_id,
      from: sender_id,
      message: msg,
      imageId: image_id,
      createdAt: new Date()
    });
  },
  'insertGroupMessage': function(block_id, user_id, username, msg, image_id){
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
     receiver_info, sender_info){
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
        Messages.insert({
          groupMessage: groupMessage,
          to: rec_id,
          from: sender_id,
          message: msg,
          sender: JSON.parse(sender_info),
          receiver: JSON.parse(receiver_info),
          createdAt: new Date()
        });
      }

    }
    else{
      console.log("need to update existing messages");
      Messages.update({
        _id: result._id
      },
    {
      $set:{
        message: msg,
        createdAt: new Date()
      }
    });
    }
  }
});
