Meteor.publish("chats", function(){
  return  Chats.find();
});
