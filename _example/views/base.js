define([
  'jquery', 
  'backbone',
  'views/base'
  ], function($, Backbone, base){
    console.info('base view')
  var base_view = Backbone.View.extend({
    // Instead of generating a new element, bind to the existing skeleton of
    // the App already present in the HTML.
    el: $("#gallery_inner"),

    // Our template for the line of statistics at the bottom of the app.
    // base_template: _.template($("#img_temp")),

    // Delegated events for creating new items, and clearing completed ones.
    events: {
      "click h1": "bozz_bozz"
    },

    // At initialization we bind to the relevant events on the `Todos`
    // collection, when items are added or changed. Kick things off by
    // loading any preexisting todos that might be saved in *localStorage*.
    initialize: function() {
      console.info('base-view 1');
      _.bindAll(this, 'render','bozz_bozz');      
    },
    // Re-rendering the App just means refreshing the statistics -- the rest
    // of the app doesn't change.
    render: function() {
      var done = Todos.done().length;
      console.info('base-view 2');
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
  // return base_view.render;
});