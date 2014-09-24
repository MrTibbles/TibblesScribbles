define(['backbone', 'models/vehicle'], function(Backbone, vehicle) {
  var bookingSummary = Backbone.View.extend({
    el: $('#summary'),
    yourCarTpl: _.template(
    	$('#your-car-tpl').html()
  	),
    initialize: function() {
    	this.model.on('change', this.render, this)    	
    },
    render: function(){
    	this.$el.removeClass('empty');
    	window.console && console.info('Summary update:', this.model)

    	this.$el.find('#your-car').html(this.yourCarTpl(this.model.toJSON()));
    }
  });
  return bookingSummary;
});