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
  'updateRecentMessage': function(rec_id, sender_id, msg, image_id, profile_image, user_name){
    var result = Messages.findOne({to: rec_id, from: sender_id});
    console.log(result);
    if(result == undefined || result == null){
      Messages.insert({
        to: rec_id,
        from: sender_id,
        profile_image: profile_image,
        username: user_name,
        message: msg,
        createdAt: new Date()
      });
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
