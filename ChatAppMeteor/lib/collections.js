/*Images = new FS.Collection("images", {
  stores: [
    new FS.Store.GridFS("original")
  ],
  filter: {
    allow: {
      contentTypes: ['image/*']
    }
  }
});*/
Images = new FS.Collection("images", {
  stores: [new FS.Store.GridFS("images", {path: "~/uploads"})]
});

Chats = new Mongo.Collection('chats');


Messages = new Mongo.Collection('messages');
Chats.allow({
  insert: function(){
    return true;
  }
});
Images.allow({
  insert: function(){
    return true;
  },
  download: function(){
    return true;
  }
});
