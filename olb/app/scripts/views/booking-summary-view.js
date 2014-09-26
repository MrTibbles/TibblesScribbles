define(['backbone', 'models/vehicle'], function(Backbone, vehicle) {
  var bookingSummary = Backbone.View.extend({
    el: $('#summary'),
    template: _.template(
    	$('#your-car-tpl').html()
  	),
    initialize: function() {
    	this.model.on('change', this.render, this);  	
    },
    render: function(){
    	this.$el.removeClass('empty');
    	window.console && console.info('Summary update:', this.model)

    	this.$el.find('#your-car').html(this.template(this.model.toJSON()));

      this.model.get('bookingDetails').get('mileage') && this.$el.find('.mileage').addClass('available');
    }
  });
  return bookingSummary;
});