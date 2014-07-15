define(['jquery', 'underscore', 'backbone', 'models/vehicle-model'], function($, _, Backbone, vehicles) {
  var slanted_gallery = Backbone.View.extend({
    el: $('#gallery-wrap'),
    events: {
      'click nav #exteriors': 'display_exteriors',
      'click nav #interiors': 'display_interiors'
    },
    initialize: function() {
      window.console && console.info('Starting')
    },
    render: function(type){
      switch(type) {
        case 'exterior':
          window.console && console.info('Exterior');
          break;
        case 'interior':
          window.console && console.info('Interior');
          break;
        default: 
          window.console && console.info('No route');
      }
    },
    display_exteriors: function(e){
      window.console && console.info(e.currentTarget)
    },
    display_interiors: function(e){
      window.console && console.info(e.currentTarget)
      var _this = this;
      this.vehicles.fetch({
        success: function(vehicle) {
          _this.VehicleView = new vehicles_view({
            model: _this.vehicles
          });
          _this.VehicleView.render();
          _this.listenToOnce(_this.VehicleView, 'render', _this.load_collections());
        }
      });
    }
  });
  return slanted_gallery;
});
