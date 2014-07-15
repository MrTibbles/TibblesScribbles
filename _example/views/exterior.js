define([
  'jquery',
  'underscore', 
  'backbone',
  'views/base',  
  'collections/exterior-collection'
  ], function($, _, Backbone, base, exterior){
  var exterior_img = Backbone.View.extend({
    // Instead of generating a new element, bind to the existing skeleton of
    // the App already present in the HTML.
    el: $("#img_temp"),

    // Our template for the line of statistics at the bottom of the app.
    // statsTemplate: _.template(statsTemplate),

    // Delegated events for creating new items, and clearing completed ones.
    events: {
      "click h1": "bozz_bozz"
    },

    // At initialization we bind to the relevant events on the `Todos`
    // collection, when items are added or changed. Kick things off by
    // loading any preexisting todos that might be saved in *localStorage*.
    initialize: function() {
      console.info('exterior-view 1');
      _.bindAll(this, 'addOne', 'addAll', 'render');      
    },
    // Re-rendering the App just means refreshing the statistics -- the rest
    // of the app doesn't change.
    render: function() {
      var done = Todos.done().length;
      console.info('exterior-view 2');
      // this.$('#todo-stats').html(this.statsTemplate({
      //   total:      Todos.length,
      //   done:       Todos.done().length,
      //   remaining:  Todos.remaining().length
      // }));
    },
    bozz_bozz: function(){
      console.info('Bozz Bozz')
    }

  });
  return exterior_img;
});