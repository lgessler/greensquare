Template.spacePage.helpers({
  reviews: function() {
    return Reviews.find({spaceId: this._id});
  }
});