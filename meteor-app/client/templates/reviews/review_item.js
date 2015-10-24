Template.reviewItem.helpers({
  submittedText: function() {
    return this.submitted.toString();
  },
});
Template.registerHelper('equals', function (a, b) {
  return a === b;
});