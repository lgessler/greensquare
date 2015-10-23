Meteor.publish('spaces', function(options) {
  check(options, {
    sort: Object,
    limit: Number
  });
  return Spaces.find({}, options);
});

Meteor.publish('singleSpace', function(id) {
  check(id, String);
  return Spaces.find(id);
});


Meteor.publish('reviews', function(spaceId) {
  check(spaceId, String);
  return Reviews.find({spaceId: spaceId});
});

Meteor.publish('notifications', function() {
  return Notifications.find({userId: this.userId, read: false});
});
