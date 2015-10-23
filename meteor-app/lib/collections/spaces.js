Spaces = new Mongo.Collection('spaces');

Spaces.allow({
  update: function(userId, space) { return ownsDocument(userId, space); },
  remove: function(userId, space) { return ownsDocument(userId, space); },
});

Spaces.deny({
  update: function(userId, space, fieldNames) {
    // may only edit the following two fields:
    return (_.without(fieldNames, 'url', 'title').length > 0);
  }
});

Spaces.deny({
  update: function(userId, space, fieldNames, modifier) {
    var errors = validateSpace(modifier.$set);
    return errors.title || errors.url;
  }
});

validateSpace = function (space) {
  var errors = {};

  if (!space.title)
    errors.title = "Please fill in a headline";
  
  if (!space.url)
    errors.url =  "Please fill in a URL";

  return errors;
}

Meteor.methods({
  spaceInsert: function(spaceAttributes) {
    check(this.userId, String);
    check(spaceAttributes, {
      title: String,
      url: String
    });
    
    var errors = validateSpace(spaceAttributes);
    if (errors.title || errors.url)
      throw new Meteor.Error('invalid-space', "You must set a title and URL for your space");
    
    var spaceWithSameLink = Spaces.findOne({url: spaceAttributes.url});
    if (spaceWithSameLink) {
      return {
        spaceExists: true,
        _id: spaceWithSameLink._id
      }
    }
    
    var user = Meteor.user();
    var space = _.extend(spaceAttributes, {
      userId: user._id, 
      author: user.username, 
      submitted: new Date(),
      reviewsCount: 0,
      upvoters: [], 
      votes: 0
    });
    
    var spaceId = Spaces.insert(space);
    
    return {
      _id: spaceId
    };
  },
  
  upvote: function(spaceId) {
    check(this.userId, String);
    check(spaceId, String);
    
    var affected = Spaces.update({
      _id: spaceId,
      upvoters: {$ne: this.userId}
    }, {
      $addToSet: {upvoters: this.userId},
      $inc: {votes: 1}
    });
    
    if (! affected)
      throw new Meteor.Error('invalid', "You weren't able to upvote that space");
  }
});
