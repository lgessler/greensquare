Notifications = new Mongo.Collection('notifications');

Notifications.allow({
  update: function(userId, doc, fieldNames) {
    return ownsDocument(userId, doc) && 
      fieldNames.length === 1 && fieldNames[0] === 'read';
  }
});

createReviewNotification = function(review) {
  var space = Spaces.findOne(review.spaceId);
  if (review.userId !== space.userId) {
    Notifications.insert({
      userId: space.userId,
      spaceId: space._id,
      reviewId: review._id,
      reviewerName: review.author,
      read: false
    });
  }
};