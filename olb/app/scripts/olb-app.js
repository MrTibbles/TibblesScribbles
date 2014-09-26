define(['jquery', 'backbone', 'register', 'models/service-details', 'models/vehicle', 'views/booking-summary-view', 'views/your-car-view', 'views/booking-options-view', 'views/loading-animation'], function($, Backbone, register, serviceDetails, vehicle, summaryView, yourCarView, bookingOptionsView, loader) {
	'use strict';
  var olbApp = Backbone.View.extend({
    el: $('#olb-wrap'),
    initialize: function() {
      //set up relational models
      // this.serviceDetails = register.serviceDetails = new serviceDetails();
      this.loader = register.loader = new loader();
    },
    render: function(){      
      //set up initial car search
      this.yourCarView = new yourCarView();
      // this.bookingOptionsView = new bookingOptionsView();
    }
  })
  return olbApp;
});