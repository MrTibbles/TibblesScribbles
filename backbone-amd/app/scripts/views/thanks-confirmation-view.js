define(['backbone', 'register'], function(Backbone, register) {
  var thanks = Backbone.View.extend({
    el: $('#thanks-page'),
    initialize: function() {
      this.vehicle = register.vehicle;
    },
    template: _.template(
      $('#thanking-you').html()
    ),
    errorTPL: _.template(
      $('#submit-error').html()
    ),
    updateProgressBar: function() {
      $('#olb-wrap').find('.progess-bar .fifth').removeClass('active').addClass('completed');
    },
    render: function() {
      var _this = this, scrollTarget;

      this.$el.siblings('section').removeClass('current-step');
      this.$el.addClass('current-step');
      this.updateProgressBar();

      $('.progess-bar').removeClass('step1 step2 step3 step4 step5 step6 step7').addClass('step6');
      scrollTarget = this.$el.offset();
      $('html,body').animate({scrollTop: scrollTarget.top
      }, 750);

      this.$el.html(this.template(register.vehicle.get('customer').toJSON()));
    },
    renderError: function() {
      this.$el.siblings('section').removeClass('current-step');
      this.$el.addClass('current-step');

      this.$el.html(this.errorTPL());
    }
  });
  return thanks;
});
