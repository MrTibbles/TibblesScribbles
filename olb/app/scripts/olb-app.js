define(['jquery', 'backbone', 'register', 'models/service-details', 'models/vehicle', 'views/booking-summary-view', 'views/your-car-view', 'views/booking-options-view', 'views/loading-animation'], function($, Backbone, register, serviceDetails, vehicle, summaryView, yourCarView, bookingOptionsView, loader) {
	'use strict';
  var olbApp = Backbone.View.extend({
    el: $('#olb-wrap'),
    events: {
      'click .menu-handle': 'showServiceDetails'
    },
    initialize: function() {
      //set up global instances
      this.loader = register.loader = new loader();
    },
    render: function(){      
      //set up initial car search
      this.yourCarView = new yourCarView();
      // this.bookingOptionsView = new bookingOptionsView();
    },
    showServiceDetails: function(e){
      var $parent = $(e.currentTarget).parent('.service-parent');
      if($parent.data('service') !== 'car-servicing' && !$parent.hasClass('disabled') && !$parent.hasClass('inactive')){
        $parent.toggleClass('selected');
      }
    },
    addOption: function(e){
      if(!$(e.currentTarget).hasClass('disabled') && !$(e.currentTarget).hasClass('inactive')){
        var chosenOption = {
          title: $(e.currentTarget).data('service'),
          state: true
        };
        
        // register.summaryView.addItem(chosenOption);

        // chosenOption && register.vehicle.get('selectedOption').push({
        //   title: chosenOption,
        //   state: true
        // });

        window.console && console.info(register.vehicle);
      }
    }
  })
  return olbApp;
});