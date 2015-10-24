Template.spaceItem.helpers({
  ownSpace: function() {
    return this.userId == Meteor.userId();
  },
  domain: function() {
    var a = document.createElement('a');
    a.href = this.url;
    return a.hostname;
  },
  upvotedClass: function() {
    var userId = Meteor.userId();
    if (userId && !_.include(this.upvoters, userId)) {
      return 'btn-primary upvotable';
    } else {
      return 'disabled';
    }
  },
  height: function() {
    return 360;
  },
  width: function() {
    return 480;
  },

  dist: function(){
    var lat1 = this.latitude;
    var lat2 = Session.get(['lat']);
    var lon1 = this.longitude;
    var lon2 = Session.get(['lon']);
    var φ1 = lat1.toRadians(), φ2 = lat2.toRadians(), Δλ = (lon2-lon1).toRadians(), R = 6371000; // gives d in metres
    var d = Math.acos( Math.sin(φ1)*Math.sin(φ2) + Math.cos(φ1)*Math.cos(φ2) * Math.cos(Δλ) ) * R;

    console.log(d);
    return d.toFixed(2);

  }
});

Template.spaceItem.events({
  'click .upvotable': function(e) {
    e.preventDefault();
    Meteor.call('upvote', this._id);
  }
});