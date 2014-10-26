define(['backbone', 'register', 'models/vehicle'], function(Backbone, register, vehicle) {
  var suggestedService = Backbone.View.extend({
    el: $('#service-type'),
    template: _.template(
    	$('#suggested-service').html()
  	),
    initialize: function() {},
    render: function(){
    	register.loader.hideLoader();
    	// $('.service-parent').removeClass('inactive');        
      this.$el.empty().addClass('available').append(this.template(this.model.toJSON()));

      $('li[data-service="car-servicing"]').removeClass('service-not-present');
      $('#continue').removeClass('inactive disabled');
      
      !$('li[data-service="car-servicing"]').hasClass('selected-option') && $('li[data-service="car-servicing"]').addClass('selected-option');
      !$('li[data-service="car-servicing"] .menu-handle').hasClass('servicing-child') && $('li[data-service="car-servicing"] .menu-handle').addClass('servicing-child');      
    },
    clearService: function(){
      this.$el.empty().removeClass('available');
      $('li[data-service="car-servicing"]').addClass('service-not-present').removeClass('selected-option');
      $('#mileage').val('');
    }
  });
  return suggestedService;
});