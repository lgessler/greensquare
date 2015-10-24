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
      latitude: $(e.target).find('[name=latitude]').val(),
      longitude: $(e.target).find('[name=longitude]').val(),
      title: $(e.target).find('[name=title]').val(),
      address: $(e.target).find('[name=address]').val(),
      filename: $(e.target).find('[name=fn]').val()
    };
    console.log('ADKFJHLJFKDSJFLKSJDFLKJSDLKFJLSK');
    //console.log(space.filename);
    tempArray = space.filename.split('\\');
    space.filename = tempArray[tempArray.length-1];
    console.log(space.filename);
    var user = Meteor.user();
    space = _.extend(space, {
      userId: user._id,
      submitter: user.username,
      date: new Date(),
      reviews: 0
    });

    FS.Utility.eachFile(event, function(file) {
      Images.insert(file, function (err, fileObj) {
        // Insert new doc with ID fileObj._id,
        // and kick off the data upload using HTTP.
      });
    });

    // No validation or security for now
    var spaceId = Spaces.insert(space);
    Router.go('spacePage', {_id: spaceId});

  }

/* 'click .myFileInput': function(event) {
    FS.Utility.eachFile(event, function(file) {
      Images.insert(file, function (err, fileObj) {
        // Insert new doc with ID fileObj._id,
        // and kick off the data upload using HTTP.
      });
    });
  }*/
});