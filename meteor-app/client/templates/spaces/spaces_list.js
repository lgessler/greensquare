var dist = function(space) {
  var lat1 = Number(space.latitude);
  var lat2 = Session.get('lat');
  var lon1 = Number(space.longitude);
  var lon2 = Session.get('lon');
  console.log(lat1.type);
  var ?1 = lat1.toRad(),
      ?2 = lat2.toRad(),
      ?? = (lon2-lon1).toRad(),
      R = 6371000; // gives d in metres
  var d = Math.acos( Math.sin(?1)*Math.sin(?2) + Math.cos(?1)*Math.cos(?2) * Math.cos(??) ) * R;

  console.log(d);
  return d.toFixed(2);
}


Template.spacesList.helpers({
  hackySpaces: function() {
    // change these later
    // can't set the sorting functions in the router because the
    // dist() function (for now) can't be run on the server
    if (Router.current().route.getName() === "nearSpaces") {
      return Spaces.find({}, {sort: {submitted: 1, _id: -1}})
          .fetch()
          .sort(function(s1, s2){
            return dist(s1)-dist(s2);
          });
    } else if(Router.current().route.getName() === "topSpaces") {
      return Spaces.find({}, {sort: {submitted: -1, _id: -1}})
          .fetch()
          .sort(function(s1, s2){
            return dist(s1)-dist(s2);
          });;
    }
  }
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