define(['backbone', 'register'], function(Backbone, register) {
  var confirmation = Backbone.View.extend({
    el: $('#customer-summary'),
    events: {
      'click #step-thanks': 'submitData'
    },
    initialize: function() {      
      this.vehicle = register.vehicle;
    },
    template: _.template(
      $('#booking-summarisation').html()
    ),
    updateProgressBar: function(){
      $('#olb-wrap').find('.progess-bar .fourth').addClass('completed');
      $('.progess-bar .fifth').addClass('active');
    },
    render: function(){
      var _this = this;
      this.$el.siblings('section').removeClass('current-step');
      this.$el.addClass('current-step');
      this.updateProgressBar();    

      window.console && console.info(register.vehicle)
      this.$el.html(this.template(register.vehicle.toJSON()));
    },
    submitData: function(){
      register.vehicle.get('customer').query = register.vehicle.get('customer').toJSON();

      register.vehicle.get('customer').confirmBooking({
        success: function(){
          window.console && console.info('Booking confirmed')

        },
        error: function(){
          window.console && console.error('Failed to submit booking')
        }
      });
    }
  });
  return confirmation;
});