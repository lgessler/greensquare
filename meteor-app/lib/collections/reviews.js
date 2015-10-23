Reviews = new Mongo.Collection('reviews');

Meteor.methods({
  reviewInsert: function(reviewAttributes) {
    check(this.userId, String);
    check(reviewAttributes, {
      spaceId: String,
      body: String
    });
    
    var user = Meteor.user();
    var space = Spaces.findOne(reviewAttributes.spaceId);

    if (!space)
      throw new Meteor.Error('invalid-review', 'You must review on a space');
    
    review = _.extend(reviewAttributes, {
      userId: user._id,
      author: user.username,
      submitted: new Date()
    });
    
    // update the space with the number of reviews
    Spaces.update(review.spaceId, {$inc: {reviewsCount: 1}});
    
    // create the review, save the id
    review._id = Reviews.insert(review);
    
    // now create a notification, informing the user that there's been a review
    createReviewNotification(review);
    
    return review._id;
  }
});
