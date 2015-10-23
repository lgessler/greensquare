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
      url: $(e.target).find('[name=url]').val(),
      title: $(e.target).find('[name=title]').val()
    };
    
    var errors = validateSpace(space);
    if (errors.title || errors.url)
      return Session.set('spaceSubmitErrors', errors);
    
    Meteor.call('spaceInsert', space, function(error, result) {
      // display the error to the user and abort
      if (error)
        return throwError(error.reason);
      
      // show this result but route anyway
      if (result.spaceExists)
        throwError('This link has already been spaceed');
      
      Router.go('spacePage', {_id: result._id});
    });
  }
});