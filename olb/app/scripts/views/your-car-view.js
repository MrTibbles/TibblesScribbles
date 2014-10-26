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
      if(!$('#reg-vin').val()) {
        return register.validationView.showError('empty-reg', '#reg-vin');
      }
      if($(e.currentTarget).hasClass('searching')){
        return false;
      }
      register.loader.showLoader(this.$el[0]);
      $(e.currentTarget).addClass('searching');
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
            $(e.currentTarget).removeClass('searching')
            return register.validationView.showError('invalid-reg', '#reg-vin');
          }

          register.validationView.clearError('#reg-vin');
          _this.bookingOptions.render();
          $(e.currentTarget).removeClass('searching');

          //query fixed price service based upon the katashiki code
          _this.bookingOptions.getFixedPrices();
        }
      });
    },
    startAgain: function(e){
      // this.model.clear();
    }
  });
  return yourCar;
});