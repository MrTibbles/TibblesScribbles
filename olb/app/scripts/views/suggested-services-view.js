define(['backbone', 'register', 'models/vehicle'], function(Backbone, register, vehicle) {
  var suggestedService = Backbone.View.extend({
    el: $('#service-type'),
    template: _.template(
    	$('#suggested-service').html()
  	),
    initialize: function() {},
    render: function(){
    	register.loader.hideLoader();
    	$('.service-parent').removeClass('inactive');

      this.$el.empty().addClass('available').append(this.template(this.model.toJSON()));
      this.$el.prepend('<h3 class="service-plan icon-checkmark">I have a Toyota service plan</h3><p class="lite info">Please note that service plans are specific to individual Toyota Dealer and may include some maintenance items.</p>');
    }
  });
  return suggestedService;
});