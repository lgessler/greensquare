Template.reviewSubmit.onCreated(function() {
  Session.set('reviewSubmitErrors', {});
});

Template.reviewSubmit.helpers({
  errorMessage: function(field) {
    return Session.get('reviewSubmitErrors')[field];
  },
  errorClass: function (field) {
    return !!Session.get('reviewSubmitErrors')[field] ? 'has-error' : '';
  }
});

Template.reviewSubmit.events({
    'click .selectme': function (e)  {
        Session.set("$rating", $('input:radio[name=rating]:checked').val());
        console.log( "$rating");

    },
  'submit form': function(e, template) {
    e.preventDefault();
    var $body = $(e.target).find('[name=body]');
    var review = {
      rating: Session.get("$rating"),
      body: $body.val(),
      spaceId: template.data._id
    };
    console.log(review);
    var user = Meteor.user();
    var space = Spaces.findOne(review.spaceId);

    review = _.extend(review, {
      userId: user._id,
      author: user.username,
      submitted: new Date()
    });

    // update the space with the number of reviews
    Spaces.update(review.spaceId, {$inc: {reviewsCount: 1}});
    Spaces.update(review.spaceId, {$inc: {reviewsAverage: 0}});
    console.log(Spaces.find({votes:0}).fetch()[0]['reviewsAverage']);
    console.log(Spaces.find({votes:0}).fetch()[0]['reviewsCount']);
    var num = (parseInt(review.rating)/(Spaces.find({votes:0}).fetch()[0]['reviewsCount']) - Spaces.find({votes:0}).fetch()[0]['reviewsAverage']/(Spaces.find({votes:0}).fetch()[0]['reviewsCount']));
    num = parseFloat(num.toFixed(2));
    Spaces.update(review.spaceId, {$inc: {reviewsAverage: num}});
    // create the review, save the id
    review._id = Reviews.insert(review);

    // now create a notification, informing the user that there's been a review
    createReviewNotification(review);

    $body.val('');
  }
});
