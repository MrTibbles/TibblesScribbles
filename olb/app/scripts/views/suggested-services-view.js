define(['backbone', 'models/vehicle'], function(Backbone, vehicle) {
  var bookingSummary = Backbone.View.extend({
    el: $('#booking-choices'),
    template: _.template(
    	$('#suggested-service').html()
  	),
    initialize: function() {
    	this.model.on('change', this.render, this);  	
    },
    render: function(){
    	window.console && console.info(this.model)
    	this.$el.find('#service-type').addClass('available').append(this.template(this.model.toJSON()));
    }
  });
  return bookingSummary;
});