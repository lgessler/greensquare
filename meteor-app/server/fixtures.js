// Fixture data 
if (Spaces.find().count() === 0) {
  var now = new Date().getTime();

  // create two users
  var maxID = Meteor.users.insert({
    profile: {name: 'Max Miroff'}
  });
  var max = Meteor.users.findOne(maxID);
  var kevinID = Meteor.users.insert({
    profile: {name: 'Kevin Ko'}
  });
  var kevin = Meteor.users.findOne(kevinID);


  var telescopeId = Spaces.insert({
    title: 'Sandy Bottom Nature Park',
    userId: max._id,
    author: max.profile.name,
    url: 'http://maxmiroff.com',
    submitted: new Date(now - 7 * 3600 * 1000),
    reviewsCount: 2,
    latitude: 37.129458,
    longitude: -76.433424,
    upvoters: [], votes: 0,
    rating: 5,
    reviewsAverage: 0
  });

  Reviews.insert({
    spaceId: telescopeId,
    userId: max._id,
    author: max.profile.name,
    submitted: new Date(now - 5 * 3600 * 1000),
    body: 'What a beautiful space! Great for kids',
    rating: 4
  });

  Reviews.insert({
    spaceId: telescopeId,
    userId: kevin._id,
    author: kevin.profile.name,
    submitted: new Date(now - 3 * 3600 * 1000),
    body: 'I agree!',
    rating: 5
  });

  Spaces.insert({
    title: 'Lafayette Park',
    userId: max._id,
    author: max.profile.name,
    url: 'http://meteor.com',
    submitted: new Date(now - 10 * 3600 * 1000),
    reviewsCount: 0,
    latitude: 36.878801,
    longitude: -76.281166,
    upvoters: [], votes: 0,
    rating: 4,
    reviewsAverage: 0
  });

  Spaces.insert({
    title: 'Pond by Clark Street',
    userId: kevin._id,
    author: kevin.profile.name,
    url: 'http://themeteorbook.com',
    submitted: new Date(now - 12 * 3600 * 1000),
    reviewsCount: 0,
    latitude: 30,
    longitude: -70,
    upvoters: [], votes: 0,
    rating: 4,
    reviewsAverage: 0
  });

  Spaces.insert({
    title: 'Berry Park',
    userId: kevin._id,
    author: kevin.profile.name,
    url: 'http://themeteorbook.com',
    submitted: new Date(now - 12 * 3600 * 1000),
    reviewsCount: 0,
    latitude: 34,
    longitude: -78,
    upvoters: [], votes: 0,
    rating: 4,
    reviewsAverage: 0
  });

  Spaces.insert({
    title: 'Little Garden by Dominion Enterprises Building',
    userId: kevin._id,
    author: kevin.profile.name,
    url: 'http://themeteorbook.com',
    submitted: new Date(now - 12 * 3600 * 1000),
    reviewsCount: 0,
    latitude: 35,
    longitude: -73,
    upvoters: [], votes: 0,
    rating: 4,
    reviewsAverage: 0
  });

  Spaces.insert({
    title: 'Town Point Park',
    userId: kevin._id,
    author: kevin.profile.name,
    url: 'http://themeteorbook.com',
    submitted: new Date(now - 12 * 3600 * 1000),
    reviewsCount: 0,
    latitude: 36.850986,
    longitude: -76.294340,
    upvoters: [], votes: 0,
    rating: 4,
    reviewsAverage: 0
  });

  Spaces.insert({
    title: 'Bee Arthur Dog Park',
    userId: kevin._id,
    author: kevin.profile.name,
    url: 'http://themeteorbook.com',
    submitted: new Date(now - 12 * 3600 * 1000),
    reviewsCount: 0,
    latitude: 36.853688,
    longitude: -76.298987,
    upvoters: [], votes: 0,
    rating: 1,
    reviewsAverage: 0
  });

  Spaces.insert({
    title: 'Nature Trail in Sunrise Valley',
    userId: kevin._id,
    author: kevin.profile.name,
    url: 'http://themeteorbook.com',
    submitted: new Date(now - 12 * 3600 * 1000),
    reviewsCount: 0,
    latitude: 33,
    longitude: -21,
    upvoters: [], votes: 0,
    rating: 2,
    reviewsAverage: 0
  });

  Spaces.insert({
    title: 'Open Lot #540',
    userId: kevin._id,
    author: kevin.profile.name,
    url: 'http://themeteorbook.com',
    submitted: new Date(now - 12 * 3600 * 1000),
    reviewsCount: 0,
    latitude: 41,
    longitude: 60,
    upvoters: [], votes: 0,
    rating: 4,
    reviewsAverage: 0
  })

  Spaces.insert({
    title: 'Open Lot #106',
    userId: kevin._id,
    author: kevin.profile.name,
    url: 'http://themeteorbook.com',
    submitted: new Date(now - 12 * 3600 * 1000),
    reviewsCount: 0,
    latitude: 44,
    longitude: 79,
    upvoters: [], votes: 0,
    rating: 4,
    reviewsAverage: 0
  });

}

  /*
  for (var i = 0; i < 10; i++) {
    Spaces.insert({
      title: 'Green Space 1' + i,
      author: max.profile.name,
      userId: max._id,
      url: 'http://google.com/?q=test-' + i,
      submitted: new Date(now - i * 3600 * 1000 + 1),
      reviewsCount: 0,
      latitude: 1,
      longitude: 1,
      upvoters: [], votes: 0
    });
  }
}*/