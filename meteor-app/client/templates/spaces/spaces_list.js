Template.spacesList.helpers({
  spaces: function () {
    all = Spaces.find({}).fetch();
    chunks = [];
    size = 3;
    while (all.length > size) {
      chunks.push({ row: all.slice(0, size)});
      all = all.slice(size);
    }
    chunks.push({row: all});
    return chunks;
  }
});




Template.spacesList.events({
  'click .load-more': function(e) {

  }
});

Template.spacesList.onRendered(function () {
  /*var $container = $('#spacegrid');

  $container.imagesLoaded(function () {
    $container.masonry({
      itemSelector: '.space'
    });
  });
  */
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