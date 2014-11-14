define(['backbone', 'register'], function(Backbone, register) {
  var selectedOptions = Backbone.Collection.extend({
    defaults: {
      price: 'free',
      title: 'visual safety report'
    }
  });
  return selectedOptions;
});
