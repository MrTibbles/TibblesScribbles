define(['jquery', 'backbone', 'models/booking-summary', 'models/vehicle', 'views/booking-summary-view', 'views/your-car-view', 'views/booking-options-view'], function($, Backbone, bookingSummary, vehicle, summaryView, yourCarView, bookingOptionsView) {
	'use strict';
  var olbApp = Backbone.View.extend({
    el: $('#olb-wrap'),
    initialize: function() {},
    render: function(){
    	var _this = this;
      //set up initial car search
      this.yourCarView = new yourCarView();
      this.bookingOptionsView = new bookingOptionsView();
    }
  })
  return olbApp;
});