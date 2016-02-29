Meteor.publish("chats", function(){
  return  Chats.find();
});

Meteor.publish("images", function(){
  return Images.find();
})
