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
  'insertGroupMessage': function(block_id, user_id, username, msg){
    Chats.insert({
      to: block_id,
      from: user_id,
      fromName: username,
      message: msg,
      createdAt: new Date()
    });
  }
});
