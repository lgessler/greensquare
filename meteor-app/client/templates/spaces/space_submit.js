Template.spaceSubmit.onCreated(function() {
  Session.set('spaceSubmitErrors', {});
});

Template.spaceSubmit.helpers({
  errorMessage: function(field) {
    return Session.get('spaceSubmitErrors')[field];
  },
  errorClass: function (field) {
    return !!Session.get('spaceSubmitErrors')[field] ? 'has-error' : '';
  }
});

Template.spaceSubmit.events({
  'submit form': function(e) {
    e.preventDefault();
    
    var space = {
      loc: $(e.target).find('[name=loc]').val(),
      picUrl: $(e.target).find('[name=picUrl]').val(),
      title: $(e.target).find('[name=title]').val(),
      address: $(e.target).find('[name=address]').val()
    };

    var user = Meteor.user();
    space = _.extend(space, {
      userId: user._id,
      submitter: user.username,
      date: new Date(),
    });

    // No validation or security for now
    var spaceId = Spaces.insert(space);
    Router.go('spacePage', {_id: spaceId});
  }
});