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
  'click .btn-info': function(e) {
    e.preventDefault();
    $(e.target).attr("class", "btn btn-warning");
    $(e.target).text("Loading...");

    navigator.geolocation.getCurrentPosition(function(position) {
      $(e.target.parentNode).find('[name=latitude]').val(position.coords.latitude);
      $(e.target.parentNode).find('[name=longitude]').val(position.coords.longitude);

      $(e.target).attr("class", "btn btn-info");
      $(e.target).text("Get GPS Coordinates");
    });
  },
  
  'submit form': function(e, template) {
    e.preventDefault();
    //var fileObj = template.find('input:file');
    //Images.insert(fileObj.files[0], function(err, fileObj) {

    var space = {
      latitude: $(e.target).find('[name=latitude]').val(),
      longitude: $(e.target).find('[name=longitude]').val(),
      title: $(e.target).find('[name=title]').val(),
      address: $(e.target).find('[name=address]').val(),
      filename: $(e.target).find('[name=fn]').val()
    };

    tempArray = space.filename.split('\\');
    space.filename = tempArray[tempArray.length-1];
    console.log(space.filename);
    var user = Meteor.user();
    space = _.extend(space, {
      userId: user._id,
      submitter: user.username,
      date: new Date(),
      reviewsCount: 0
    });

/*    var file = template.find('input type=["file"]').files[0];
    var reader = new FileReader();
    reader.onload = function(e) {
      // Add it to your model
      model.update(id, { $set: { src: e.target.result }});

      // Update an image on the page with the data
      $(template.find('img')).attr('src', e.target.result);
    }
    reader.readAsDataURL(file);
*/
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