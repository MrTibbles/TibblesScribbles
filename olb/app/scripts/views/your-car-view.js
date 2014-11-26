define(['backbone', 'register', 'olb-app', 'models/vehicle', 'models/service-details', 'views/booking-summary-view', 'views/booking-options-view'], function(Backbone, register, olb, vehicle, serviceBooking, summaryView, optionsView) {
  var yourCar = Backbone.View.extend({
    el: $('#your-car'),
    events: {
      'click #find-car': 'vehicleLookUp',
      'click #remove-car': 'startAgain',
      'submit #olb-find-car': 'vehicleLookUp'
      // 'keyup #reg-vin': 'vehicleLookUp'
    },
    initialize: function() {
      // this.olb = new olb();
      this.serviceBooking = new serviceBooking();
      this.bookingOptions = new optionsView();

      this.vehicle = register.vehicle;
    },
    render: function() {
      this.$el.parent('.step-one').addClass('current-step');
      // $('#continue').show().addClass('proceed move-step');
      $('#continue').show().attr({
        'data-step': 'two',
        'class': 'proceed move-step'
      }).html('continue booking');

      register.bookingSummaryView.checkBooking();
    },
    vehicleLookUp: function(e) {
      e.preventDefault();
      if (this.$('#find-car').hasClass('searching')) return false;

      if (!$('#reg-vin').val()) {
        return register.validationView.showError('empty-reg', '#reg-vin');
      }
      //If a seearch has already taken place, reset model to default
      if (register.vehicle.get('model')) {
        this.resetBooking();
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
                register.vehicle.get('bookingDetails').clear(); //reset model for service booking

                return _this.bookingOptions.getFixedPrices();
              }
            }
          })

          //query fixed price service based upon the katashiki code
          // _this.bookingOptions.getFixedPrices();
        }
      });
    },
    resetBooking: function() {
      register.vehicle.clear().set(register.vehicle.defaults);
      //set() is a shallow set, doesnt reset sub models attributes.... LONG!
      register.vehicle.get('selected').reset();
      register.vehicle.get('selectedOptions').reset();
      register.vehicle.get('selectedRepairs').reset();

      register.bookingSummaryView.removeServicing();

      register.vehicle.set('totalBookingPrice', 0);
      register.bookingSummaryView.displayTotal();

      register.bookingSummaryView.renderOptions();
      this.$('.service-parent').removeClass('selected-option');

      register.bookingSummaryView.renderRepairs();
      register.vehicle.get('selectedRepairs').length && this.fixedPriceView.render('#booking-choices');

      $('.option-item').removeClass('selected-option');
      this.preSelectVSR();
    },
    preSelectVSR: function() {
      $('li[data-service="visual safety report"]').addClass('selected-option show-inner').find('a').removeClass('option-child').addClass('selected-child');
      register.vehicle.get('selected').add({
        price: 'free',
        title: 'visual safety report'
      });
      register.vehicle.get('selectedOptions').add({
        price: 'free',
        title: 'visual safety report'
      });
    },
    startAgain: function(e) {
      // this.model.clear();
    }
  });
  return yourCar;
});
