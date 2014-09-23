define(['backbone', 'models/vehicle'], function(Backbone, vehicle) {
  var yourCarView = Backbone.View.extend({
    el: $('#gallery-thumbs'),
    // collection: exteriors,
    events: {
      'click #find-car': 'findCar'
    },
    initialize: function() {
      // this.$el.addClass('active_list');

      // return this.collection.on('change:active', this.display_img, this);
    },
    render: function() {
      window.console && console.info(this);
    },
    findCar: function(e){
      // _this.
    }
  });
  return yourCarView;
});