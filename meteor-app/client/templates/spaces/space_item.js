Template.spaceItem.helpers({
  ownSpace: function() {
    return this.userId == Meteor.userId();
  },
  domain: function() {
    var a = document.createElement('a');
    a.href = this.url;
    return a.hostname;
  },
  dist: function(){
    var lat1 = Number(this.latitude);
    var lat2 = Session.get('lat');
    var lon1 = Number(this.longitude);
    var lon2 = Session.get('lon');
    console.log(lat1.type);
    var phi1 = lat1.toRad(),
        phi2 = lat2.toRad(),
        dLambda = (lon2-lon1).toRad(),
        R = 6371000; // gives d in metres
    var d = Math.acos( Math.sin(phi1)*Math.sin(phi2) + Math.cos(phi1)*Math.cos(phi2) * Math.cos(dLambda) ) * R;

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