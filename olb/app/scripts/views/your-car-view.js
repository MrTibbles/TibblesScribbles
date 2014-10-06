define(['backbone', 'register', 'models/vehicle', 'views/booking-summary-view', 'views/booking-options-view'], function(Backbone, register, vehicle, summaryView, optionsView) {
  var yourCar = Backbone.View.extend({
    el: $('#your-car'),
    events: {
      'click #find-car': 'vehicleLookUp',
      'click #remove-car': 'startAgain'
      // 'keyup #reg-vin': 'vehicleLookUp'
    },
    initialize: function() {      
      this.bookingOptions = new optionsView();

      this.vehicle = register.vehicle;
    },
    render: function(){
      this.$el.parent('.step-one').addClass('current-step');

      $('#continue').show();
    },
    vehicleLookUp: function(e){
      register.loader.showLoader(this.$el[0]);

      var _this = this;
      this.vehicle.query = this.$('#reg-vin').val().toUpperCase();

      if(this.vehicle.query === undefined) return;

      this.vehicle.fetch({
        success: function() {
          _this.bookingSummaryView = register.bookingSummaryView = new summaryView({
            model: _this.vehicle
          });

          if(_this.vehicle.get('requested')){
            _this.bookingSummaryView.render();
          }else return _this.modelNotFound();

          _this.bookingOptions.render();
        }
      });
    },
    modelNotFound: function(){
      window.console && console.info('NOT FOUND');
      register.loader.hideLoader();
    },
    startAgain: function(e){
      this.model.clear();
    }
  });
  return yourCar;
});