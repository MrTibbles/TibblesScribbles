define(['backbone', 'register', 'models/vehicle'], function(Backbone, register, vehicle) {
  var bookingSummary = Backbone.View.extend({
    el: $('#service-type'),
    template: _.template(
    	$('#suggested-service').html()
  	),
    initialize: function() {},
    render: function(){
    	// register.loader.hideLoader();
    	$('.service-parent').removeClass('inactive');

    	this.$el.addClass('available').append(this.template(this.model.toJSON()));
    }
  });
  return bookingSummary;
});