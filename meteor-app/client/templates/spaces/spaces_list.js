var dist = function(space) {
  var lat1 = Number(space.latitude);
  var lat2 = Session.get('lat');
  var lon1 = Number(space.longitude);
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
};

var hackySpaces = function() {
    // change these later
    // can't set the sorting functions in the router because the
    // dist() function (for now) can't be run on the server
    if (Router.current().route.getName() === "nearSpaces") {
      var coll = Spaces.find({}, {sort: {submitted: 1, _id: -1}})
          .fetch()
          .sort(function(s1, s2){
            return dist(s1)-dist(s2);
          });
      console.log("BAM");
      return coll
    } else if(Router.current().route.getName() === "topSpaces") {
      var coll = Spaces.find({}, {sort: {submitted: -1, _id: -1}})
          .fetch();
      console.log("BAM");
      return coll;
    }
};

Template.spacesList.helpers({
  hackySpaces: hackySpaces
});

Template.spacesList.onRendered(function () {

  this.find('.wrapper')._uihooks = {
    insertElement: function (node, next) {
      $(node)
          .hide()
          .insertBefore(next)
          .fadeIn();
    },
    moveElement: function (node, next) {
      var $node = $(node), $next = $(next);
      var oldTop = $node.offset().top;
      var height = $(node).outerHeight(true);

      // find all the elements between next and node
      var $inBetween = $(next).nextUntil(node);
      if ($inBetween.length === 0)
        $inBetween = $(node).nextUntil(next);

      // now put node in place
      $(node).insertBefore(next);

      // measure new top
      var newTop = $(node).offset().top;

      // move node *back* to where it was before
      $(node)
          .removeClass('animate')
          .css('top', oldTop - newTop);

      // push every other element down (or up) to put them back
      $inBetween
          .removeClass('animate')
          .css('top', oldTop < newTop ? height : -1 * height)


      // force a redraw
      $(node).offset();

      // reset everything to 0, animated
      $(node).addClass('animate').css('top', 0);
      $inBetween.addClass('animate').css('top', 0);
    },
    removeElement: function(node) {
      $(node).fadeOut(function() {
        $(this).remove();
      });
    }
  }
});