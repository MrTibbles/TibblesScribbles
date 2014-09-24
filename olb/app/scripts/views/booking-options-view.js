define(['backbone', 'models/service-booking', 'views/booking-summary-view', 'views/loading-animation'], function(Backbone, serviceBooking, summaryView, loader) {
  var bookingOptions = Backbone.View.extend({
    el: $('#booking-choices'),
    events: {
      'click #find-car': 'vehicleLookUp'
    },
    initialize: function() {
    	this.serviceBooking = new serviceBooking();
    	this.loader = new loader();
    },
    render: function(){
    	window.console && console.info(this.model)

      this.serviceBooking.fetch({
        success: function() {        	
        	window.console && console.info('√');
        }
      });
    }
  });
  return bookingOptions;
});