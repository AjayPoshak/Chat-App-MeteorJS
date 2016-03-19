Images = new FS.Collection("images", {
  stores: [new FS.Store.GridFS("images", {path: "~/uploads"})]
});

Chats = new Mongo.Collection('chats');

Messages = new Mongo.Collection('messages');

BlockedUsers = new Mongo.Collection('blockedUsers');

Chats.allow({
  insert: function(){
    return true;
  },
  update: function(){
    return true;
  }
});

Messages.allow({
  insert: function(){
    return true;
  },
  update: function(){
    return true;
  }
});

Images.allow({
  insert: function(){
    return true;
  },
  download: function(){
    return true;
  },
  update: function(){
    return true;
  }
});

BlockedUsers.allow({
  insert: function(){
    return true;
  },
  update: function(){
    return true;
  }
})
