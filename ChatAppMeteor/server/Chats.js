/*Meteor.publish("chats", function(){
  return  Chats.find();
});

Meteor.publish("images", function(){
  return Images.find();
});
*/
Meteor.publish("messages", function(){
  return Messages.find();
});

Meteor.publishComposite("instantMessages", {
  find: function(){
    return Chats.find();
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
});
