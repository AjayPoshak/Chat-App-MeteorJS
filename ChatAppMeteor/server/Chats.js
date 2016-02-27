Meteor.publish("chats", function(){
  return  Chats.find();

  Chats.before.insert(function(userId){
    createdAt: new Date();
    console.log("created a date");
  });
});
