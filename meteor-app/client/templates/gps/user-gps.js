Template.userLocation.helpers({
    latLocation: function () {
        return Session.get("lat");
    }
});

Template.userLocation.helpers({
    lonLocation: function () {
        return Session.get("lon");
    }
});