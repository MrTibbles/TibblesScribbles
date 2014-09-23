define(['jquery', 'backbone', 'models/vehicle', 'views/your-car'], function($, Backbone, vehicle, yourCar) {
	'use strict';
  var olbApp = Backbone.View.extend({
    el: $('#olb-wrap'),
    events: {
      // 'click #find-car': 'findCar'
    },
    initialize: function() {
    	window.console && console.info('G');
    },
    render: function(){
    	var _this = this;
    	//create a vehicle instance
    	this.vehicle = new vehicle();

    	this.vehicle.fetch({
    		success: function(response){
    			_this.yourCarView = new yourCar({
    				model: _this.vehicle
    			});
    			_this.yourCarView.render();
    			_this.listenToOnce(_this.yourCarView, 'render', this.hello);
    		}
    	})
    },
    hello: function(){
    	window.console && console.info('hello!');
    }
  })
  return olbApp;
});