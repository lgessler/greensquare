Template.spacePage.helpers({
  reviews: function() {
    return Reviews.find({spaceId: this._id});
  },

  lat: function() {
    return this.latitude;
  },

  lon: function() {
    return this.longitude;
  },

  mapOptions: function() {
    if (GoogleMaps.loaded()) {
      return {
        center: new google.maps.LatLng(this.latitude, this.longitude),
        zoom: 15,
      };
    }
  }
});

Template.body.onCreated(function() {
  // We can use the `ready` callback to interact with the map API once the map is ready.
  GoogleMaps.ready('map', function(map) {
    // Add a marker to the map once it's ready
    var marker = new google.maps.Marker({
      position: map.options.center,
      map: map.instance,
      icon: "/siteAssets/gsm40.png",
      title: this.title
    });
  });
});