define(['backbone', 'register', 'models/vehicle', 'models/service-details', 'views/booking-summary-view', 'views/booking-options-view'], function(Backbone, register, vehicle, serviceBooking, summaryView, optionsView) {
  var yourCar = Backbone.View.extend({
    el: $('#your-car'),
    events: {
      'click #find-car': 'vehicleLookUp',
      'click #remove-car': 'startAgain',
      'submit #olb-find-car': 'vehicleLookUp'
      // 'keyup #reg-vin': 'vehicleLookUp'
    },
    initialize: function() {      
      this.serviceBooking = new serviceBooking();
      this.bookingOptions = new optionsView();

      this.vehicle = register.vehicle;
    },
    render: function(){
      this.$el.parent('.step-one').addClass('current-step');
      $('#continue').show().addClass('proceed move-step');
    },
    vehicleLookUp: function(e){
      e.preventDefault();

      if(!$('#reg-vin').val()) {
        return register.validationView.showError('empty-reg', '#reg-vin');
      }
      if(this.$('#find-car').hasClass('searching')){
        return false;
      }
      register.loader.showLoader(this.$el[0]);
      this.$('#find-car').addClass('searching');
      $('#your-car .lite').removeClass('prompt');

      var _this = this;
      this.vehicle.query = this.$('#reg-vin').val().toUpperCase().replace(/ /g,'');

      this.vehicle.fetch({
        success: function() {
          _this.bookingSummaryView = register.bookingSummaryView = new summaryView({
            model: _this.vehicle
          });

          if(_this.vehicle.get('requested')){
            _this.bookingSummaryView.render();            
          }else{
            this.$('#find-car').removeClass('searching')
            return register.validationView.showError('invalid-reg', '#reg-vin');
          }

          register.validationView.clearError('#reg-vin');
          _this.bookingOptions.render();
          $(e.currentTarget).removeClass('searching');

          //query service lookup to see whether or not vechile is commercial
          _this.serviceBooking.query = {
            katashiki: register.vehicle.get('katashiki'),
            mileage: 20000,
            years: register.vehicle.get('age'),
            age_months: register.vehicle.get('ageMonth')
          };
          _this.serviceBooking.fetch({
            success: function(response) {
              if (response.get('commercial')) {
                $('#continue').addClass('disabled');
                this.$('#find-car').removeClass('searching');
                _this.serviceBooking.clear();
                return register.validationView.showError('commercial', '#reg-vin');
              }else {
                this.$('#find-car').removeClass('searching');
                register.vehicle.get('bookingDetails').clear();
                _this.bookingOptions.getFixedPrices();
              }
            }
          })

          //query fixed price service based upon the katashiki code
          // _this.bookingOptions.getFixedPrices();
        }
      });
    },
    startAgain: function(e) {
      // this.model.clear();
    }
  });
  return yourCar;
});
