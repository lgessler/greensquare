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

    var R = 6371000; // metres
    var phi1 = lat1 * Math.PI / 180;
    var phi2 = lat2 * Math.PI / 180;
    var dphi = (lat2-lat1) * Math.PI / 180;
    var dlam = (lon2-lon1) * Math.PI / 180;

    var a = Math.sin(dphi/2) * Math.sin(dphi/2) +
        Math.cos(phi1) * Math.cos(phi2) *
        Math.sin(dlam/2) * Math.sin(dlam/2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

    var d = R * c;

    var miles = d * 0.000621371;

    return miles.toFixed(2);
  },
  getImg: function() {
    var strBase = '/open-space-';
    var randInt = Math.floor((Math.random() * 5) + 1);
    //var strAdd = toString(randInt);
    var strReturn = strBase.concat(randInt);
    strReturn = strReturn.concat(".jpg");
    console.log(strReturn);
    return strReturn;
  }
});

Template.spaceItem.events({
  'click .upvotable': function(e) {
    e.preventDefault();
    Meteor.call('upvote', this._id);
  }
});
Template.registerHelper('equals', function (a, b) {
  return a === b;
});