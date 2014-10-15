define(['jquery', 'backbone', 'register', 'views/loading-animation',  'models/service-details', 'models/vehicle', 'views/booking-summary-view', 'views/your-car-view', 'views/booking-options-view', 'views/find-dealer-view', 'views/your-dealer-and-quote', 'views/select-time-view', 'views/customer-details-view', 'views/summary-confirmation-view', 'views/thanks-confirmation-view', 'views/validation-view'], function($, Backbone, register, loader, serviceDetails, vehicle, summaryView, yourCarView, bookingOptionsView, dealerView, dealerQuote, selectTime, customerDetails, confirmSummary, thanksView, validationView) {
  var olbApp = Backbone.View.extend({
    el: $('#olb-wrap'),
    events: {
      'click .menu-handle': 'showServiceDetails',
      'click .move-step': 'moveToStep'
    },
    initialize: function() {
      //set up global instances
      //create loading spinner 
      this.loader = register.loader = new loader();
      //create a vehicle instance
      this.vehicle = register.vehicle = new vehicle();
      //create summary view
      this.bookingSummaryView = register.bookingSummaryView = new summaryView({
        model: register.vehicle
      });

      //set up initial car search view
      this.yourCarView = new yourCarView();
      //set up find dealer view
      this.dealerView = new dealerView();
      //set up dealer & quote view
      this.dealerQuote = new dealerQuote();
      //set up select date & time view
      this.selectTime = new selectTime();
      //set up customer detials view
      this.customerDetails = new customerDetails();
      //set up confirmation view
      // this.confirmSummary = new confirmSummary();
      //set up thanks view
      this.thanksView = new thanksView();

      //set up validation view
      this.validationView = register.validationView = new validationView();
    },
    render: function(step){      
      window.console && console.info(step)
      switch(step){
        case 'your-car':
          this.yourCarView.render();
          break;
        case 'your-dealer':
          this.dealerQuote.render();
          break;
        default:
          this.yourCarView.render();
          break;
      }
    },
    showServiceDetails: function(e){
      var $parent = $(e.currentTarget).parent('.service-parent');
      if(!$parent.hasClass('disabled') && !$parent.hasClass('inactive')){
        $parent.toggleClass('selected');
      }
    },
    moveToStep: function(e){
      if($(e.currentTarget).hasClass('disabled')){
        return false;
      }else{
        var destination = $(e.currentTarget).data('step');

        this.$('.olb-steps').removeClass('current-step');

        this.$('.step-'+destination).addClass('current-step');

        switch(destination){
          case 'one':
            window.console && console.info('first step')
            break;
          case 'two':
            this.dealerView.render();
            break;
          case 'three':
            window.console && console.info('third step');
            break;
          case 'four':
            window.console && console.info('fourth step');
            this.selectTime.render();
            break;
          case 'five':
            window.console && console.info('fifth step');
            this.customerDetails.render();
            break;
          case 'six':
            window.console && console.info('Sixth step');
            // this.confirmSummary.render();
            break;
          case 'seven':
            window.console && console.info('Final step, Thanks!')
            this.thanksView.render();
            break;
          default:
            window.console && console.info('first');
            break;
        }
        // var scrollType = 
        var scrollTarget = this.$el.offset();
        $("html,body").animate({
          scrollTop: scrollTarget.top
        }, 500);
      }
    },
    keyBoard: function(e){
      // $('#edit-dealer').on('keydown', function(e) {
      if(e.keyCode == 13) {
        e.preventDefault();
        $('#postcode_search').click();
      }
    }
  })
  return olbApp;
});