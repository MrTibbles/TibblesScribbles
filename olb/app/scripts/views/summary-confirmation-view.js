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
    updateProgressBar: function() {
      $('#olb-wrap').find('.progess-bar .fourth').addClass('completed');
      $('.progess-bar .fifth').addClass('active');
    },
    render: function() {
      var _this = this;
      this.$el.siblings('section').removeClass('current-step');
      this.$el.addClass('current-step');
      this.updateProgressBar();

      $('#your-quote, #service-selections').hide();
      window.console && console.info('summary of booking')
      this.$el.html(this.template(register.vehicle.toJSON()));
    },
    submitData: function() {
      if (this.$('#step-thanks').hasClass('submitting')) {
        return false;
      }
      register.vehicle.get('customer').query = register.vehicle.get('customer').toJSON();

      this.$('#step-thanks').addClass('submitting');

      register.vehicle.get('customer').confirmBooking();
    }
  });
  return confirmation;
});
