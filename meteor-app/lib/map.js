if (Meteor.isClient) {
    Meteor.startup(function() {
        //GoogleMaps.load();

    if (Session.get('lat') == undefined
        || Session.get('lon') == undefined) {
        navigator.geolocation.getCurrentPosition(function(position) {
            Session.set('lat', position.coords.latitude);
            Session.set('lon', position.coords.longitude);
        });
    }
    }); 
}
