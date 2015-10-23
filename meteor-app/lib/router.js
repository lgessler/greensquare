Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  notFoundTemplate: 'notFound',
  waitOn: function() { 
    return [Meteor.subscribe('notifications')]
  }
});

SpacesListController = RouteController.extend({
  template: 'spacesList',
  increment: 5, 
  spacesLimit: function() {
    return parseInt(this.params.spacesLimit) || this.increment;
  },
  findOptions: function() {
    return {sort: this.sort, limit: this.spacesLimit()};
  },
  subscriptions: function() {
    this.spacesSub = Meteor.subscribe('spaces', this.findOptions());
  },
  spaces: function() {
    return Spaces.find({}, this.findOptions());
  },
  data: function() {
    var self = this;
    return {
      spaces: self.spaces(),
      ready: self.spacesSub.ready,
      nextPath: function() {
        if (self.spaces().count() === self.spacesLimit())
          return self.nextPath();
      }
    };
  }
});

NewSpacesController = SpacesListController.extend({
  sort: {submitted: -1, _id: -1},
  nextPath: function() {
    return Router.routes.newSpaces.path({spacesLimit: this.spacesLimit() + this.increment})
  }
});

BestSpacesController = SpacesListController.extend({
  sort: {votes: -1, submitted: -1, _id: -1},
  nextPath: function() {
    return Router.routes.bestSpaces.path({spacesLimit: this.spacesLimit() + this.increment})
  }
});

Router.route('/', {
  name: 'home',
  controller: NewSpacesController
});

Router.route('/new/:spacesLimit?', {name: 'newSpaces'});

Router.route('/best/:spacesLimit?', {name: 'bestSpaces'});


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
}

Router.onBeforeAction('dataNotFound', {only: 'spacePage'});
Router.onBeforeAction(requireLogin, {only: 'spaceSubmit'});
