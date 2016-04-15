Meteor.publish("messages", function(){
  return Messages.find();
});

Meteor.publish("blockedUsers", function(){
  return BlockedUsers.find();
})

Meteor.publishComposite("instantMessages", function(user_id, blockId){
  return {
    find: function(){
      return Chats.find({
        $or: [
          {"to": user_id},
          {"to": blockId},
          {"from": user_id}
        ]
      });
    },
    children: [
      {
        find: function(chats){
          return Images.find({_id: chats.imageId},
            {
              sort: {uploadedAt: -1}
            });
          }
        }
      ]
    };
});
