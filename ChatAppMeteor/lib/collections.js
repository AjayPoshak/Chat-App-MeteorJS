Chats = new Mongo.Collection('chats');
Messages = new Mongo.Collection('messages');
Chats.allow({
  insert: function(){
    return true;
  }
});
