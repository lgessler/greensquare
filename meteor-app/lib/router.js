Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  notFoundTemplate: 'notFound',
  waitOn: function() { 
    return [Meteor.subscribe('notifications')]
  }
});

SpacesBaseController = RouteController.extend({
  template: 'spacesList',
  increment: 100,
  spacesLimit: function() {
    return parseInt(this.params.spacesLimit) || this.increment;
  },
  findOptions: function() {
    return {sort: this.sort, limit: this.spacesLimit()};
  },
  subscriptions: function() {
    this.spacesSub = Meteor.subscribe('spaces', this.findOptions());
  },
  data: function() {
    var self = this;
    return {
      spaces: self.template.hackySpaces,
      ready: self.spacesSub.ready,
      nextPath: function() {
        if (self.spaces().count() === self.spacesLimit())
          return self.nextPath();
      }
    };
  }
});

NearSpacesController = SpacesBaseController.extend({
  sort: {submitted: -1, _id: -1},
  nextPath: function() {
    return Router.routes.nearSpaces.path({spacesLimit: this.spacesLimit() + this.increment})
  },
  spaces: function() {
    return Spaces.find({}, this.findOptions());
  }
});

TopSpacesController = SpacesBaseController.extend({
  sort: {submitted: -1, reviews: -1, _id: -1},
  nextPath: function() {
    return Router.routes.topSpaces.path({spacesLimit: this.spacesLimit() + this.increment})
  },
  spaces: function() {
    return Spaces.find({}, this.findOptions());
  },
});

Router.route('/near/:spacesLimit?', {name: 'nearSpaces'});

Router.route('/top/:spacesLimit?', {name: 'topSpaces'});

Router.route('/', {
  name: 'splash',
  layoutTemplate: 'emptyLayout',
  layout: 'splash',
  onAfterAction: function() {
    setTimeout( function() {
      Router.go('nearSpaces');
    }, 5000);
  }
});

Router.route('/spaces/:_id', {
  name: 'spacePage',
  waitOn: function() {
    return [
      Meteor.subscribe('singleSpace', this.params._id),
      Meteor.subscribe('reviews', this.params._id)
    ];
  },
  data: function() { return Spaces.findOne(this.params._id); }
});

Router.route('/spaces/:_id/edit', {
  name: 'spaceEdit',
  waitOn: function() { 
    return Meteor.subscribe('singleSpace', this.params._id);
  },
  data: function() { return Spaces.findOne(this.params._id); }
});

Router.route('/submit', {name: 'spaceSubmit'});

var requireLogin = function() {
  if (! Meteor.user()) {
    if (Meteor.loggingIn()) {
      this.render(this.loadingTemplate);
    } else {
      this.render('accessDenied');
    }
  } else {
    this.next();
  }
};

Router.onBeforeAction('dataNotFound', {only: 'spacePage'});
Router.onBeforeAction(requireLogin, {only: 'spaceSubmit'});
