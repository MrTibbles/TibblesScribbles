define(['backbone', 'models/vehicle', 'views/booking-summary-view', 'views/loading-animation'], function(Backbone, vehicle, summaryView, loader) {
  var yourCar = Backbone.View.extend({
    el: $('#your-car'),
    events: {
      'click #find-car': 'vehicleLookUp',
      'click #remove-car': 'startAgain'
      // 'keyup #reg-vin': 'vehicleLookUp'
    },
    initialize: function() {
      //create a vehicle instance
      this.vehicle = new vehicle();
      this.loader = new loader();

      this.vehicle.on('change:all', this.render, this);
    },
    vehicleLookUp: function(e){
      // this.loader.showLoader(this.$el[0]);

      var _this = this;
      this.vehicle.query = this.$('#reg-vin').val().toUpperCase();

      if(this.vehicle.query === undefined) return;

      this.vehicle.fetch({
        success: function() {
          if(!_this.bookingSummaryView){
             _this.bookingSummaryView = new summaryView({
              model: _this.vehicle
            });
            _this.bookingSummaryView.render();
          };

        }
      });
    },
    startAgain: function(e){
      this.model.clear();
    }
  });
  return yourCar;
});