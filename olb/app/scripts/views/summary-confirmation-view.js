define(['backbone', 'register'], function(Backbone, register) {
  var confirmation = Backbone.View.extend({
    el: $('#customer-summary'),
    events: {
      'click #find-car': 'selectDate'
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
    }
  });
  return confirmation;
});