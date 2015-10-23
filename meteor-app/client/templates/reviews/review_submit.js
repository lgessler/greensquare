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
  'submit form': function(e, template) {
    e.preventDefault();
    
    var $body = $(e.target).find('[name=body]');
    var review = {
      body: $body.val(),
      spaceId: template.data._id
    };
    
    var errors = {};
    if (! review.body) {
      errors.body = "Please write some content";
      return Session.set('reviewSubmitErrors', errors);
    }
    
    Meteor.call('reviewInsert', review, function(error, reviewId) {
      if (error){
        throwError(error.reason);
      } else {
        $body.val('');
      }
    });
  }
});