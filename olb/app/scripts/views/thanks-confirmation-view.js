define(['backbone', 'register'], function(Backbone, register) {
  var thanks = Backbone.View.extend({
    el: $('#thanks-page'),
    initialize: function() {      
      this.vehicle = register.vehicle;
    },
    template: _.template(
      $('#thanking-you').html()
    ),
    updateProgressBar: function(){
      $('#olb-wrap').find('.progess-bar .fifth').addClass('completed');
    },
    render: function(){
      var _this = this;
      this.$el.siblings('section').removeClass('current-step');
      this.$el.addClass('current-step');
      this.updateProgressBar();    

      window.console && console.info(register.vehicle.get('customer'))
      this.$el.html(this.template(register.vehicle.get('customer').toJSON()));
    }
  });
  return thanks;
});