Template.spaceEdit.onCreated(function() {
  Session.set('spaceEditErrors', {});
});

Template.spaceEdit.helpers({
  errorMessage: function(field) {
    return Session.get('spaceEditErrors')[field];
  },
  errorClass: function (field) {
    return !!Session.get('spaceEditErrors')[field] ? 'has-error' : '';
  }
});

Template.spaceEdit.events({
  'submit form': function(e) {
    e.preventDefault();
    
    var currentSpaceId = this._id;
    
    var spaceProperties = {
      url: $(e.target).find('[name=url]').val(),
      title: $(e.target).find('[name=title]').val()
    }
    
    var errors = validateSpace(spaceProperties);
    if (errors.title || errors.url)
      return Session.set('spaceEditErrors', errors);
    
    Spaces.update(currentSpaceId, {$set: spaceProperties}, function(error) {
      if (error) {
        // display the error to the user
        throwError(error.reason);
      } else {
        Router.go('spacePage', {_id: currentSpaceId});
      }
    });
  },
  
  'click .delete': function(e) {
    e.preventDefault();
    
    if (confirm("Delete this space?")) {
      var currentSpaceId = this._id;
      Spaces.remove(currentSpaceId);
      Router.go('home');
    }
  }
});
