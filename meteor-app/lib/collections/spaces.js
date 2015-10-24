Spaces = new Mongo.Collection('spaces');

if (typeof(Number.prototype.toRad) === "undefined") {
    Number.prototype.toRad = function() {
        return this * Math.PI / 180;
    }
}


if (Meteor.isClient &&
    (Session.get('lat') === undefined
    || Session.get('lon') === undefined)) {
    navigator.geolocation.getCurrentPosition(function(position) {
        Session.set('lat', position.coords.latitude);
        Session.set('lon', position.coords.longitude);
    });
}

