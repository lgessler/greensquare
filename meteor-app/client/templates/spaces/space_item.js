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
  dist: function(){
    console.log(this);
    var lat1 = Number(this.latitude);
    var lat2 = Session.get('lat');
    var lon1 = Number(this.longitude);
    var lon2 = Session.get('lon');
    console.log(lat1.type);
    var φ1 = lat1.toRad(),
        φ2 = lat2.toRad(),
        Δλ = (lon2-lon1).toRad(),
        R = 6371000; // gives d in metres
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