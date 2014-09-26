define(['backbone', 'register', 'models/service-details', 'views/booking-summary-view', 'views/suggested-services-view'], function(Backbone, register, serviceBooking, summaryView, suggestedService) {
  var bookingOptions = Backbone.View.extend({
    el: $('#booking-choices'),
    events: {
      'click #find-service': 'serviceLookUp'
    },
    initialize: function() {
			this.serviceBooking = register.serviceBooking = new serviceBooking();
    },
    render: function(){
    	this.$el.find('li[data-service="car-servicing"]').addClass('selected')
    },
    serviceLookUp: function(){
    	var _this = this;
    	
    	var data = {
    		katashiki: register.vehicle.get('katashiki'),
    		mileage: this.$('#mileage').val(),
    		years: register.vehicle.get('age'),
    		age_months: register.vehicle.get('ageMonth')
    	};

    	this.serviceBooking.query = data;

	    this.serviceBooking.fetch({
  	    success: function(data) {
  	    	window.console && console.info(register.vehicle);
  	    	
  	    	_this.bookingSummaryView = new summaryView({
            model: register.vehicle
          });
          _this.bookingSummaryView.render();

          _this.suggestedService = new suggestedService({
          	model: register.vehicle
          })
          _this.suggestedService.render();
  	    }
  	  });
    }
  });
  return bookingOptions;
});