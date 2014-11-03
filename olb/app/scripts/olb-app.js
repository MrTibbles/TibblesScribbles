define(['jquery', 'backbone', 'register', 'views/loading-animation',  'models/service-details', 'models/vehicle', 'views/booking-summary-view', 'views/your-car-view', 'views/booking-options-view', 'views/find-dealer-view', 'views/your-dealer-and-quote', 'views/select-time-view', 'views/customer-details-view', 'views/summary-confirmation-view', 'views/thanks-confirmation-view', 'views/validation-view'], function($, Backbone, register, loader, serviceDetails, vehicle, summaryView, yourCarView, bookingOptionsView, dealerView, dealerQuote, selectTime, customerDetails, confirmSummary, thanksView, validationView) {
  var olbApp = Backbone.View.extend({
    el: $('#olb-wrap'),
    events: {
      'click .move-step': 'moveToStep',
      'click .draw-handle': 'toggleInner',
      'click .submit-booking': 'submitToDealer'
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
      switch(step){
        case 'your-car':
          this.yourCarView.render();
          this.preSelectVSR();
          this.preSelectDefaults();
          this.$('#summary').addClass('change-choices');          
          break;
        case 'your-dealer':
          this.dealerQuote.render();
          break;
        case 'servicing':
          this.yourCarView.render();
          this.preSelectServicing();
          break;
        case 'hsd':
          this.yourCarView.render();
          this.preSelectHybrid();
          break;
        case 'repairs':
          this.yourCarView.render();
          this.preSelectRepairs();
          break;
        case 'mot':
          this.yourCarView.render();
          this.preSelectMot();
          break;
        default:
          this.yourCarView.render();
          break;
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
            this.yourCarView.render();

            this.$('#summary').addClass('change-choices');
            break;
          case 'two':
            if(!window.tcw){
              this.dealerView.render();
              this.$('#summary').removeClass('change-choices');
            }else{
              this.dealerQuote.render();
            }
            break;
          case 'three':
            break;
          case 'four':
            this.selectTime.render();
            break;
          case 'five':
            this.customerDetails.render();
            break;
          case 'six':
            // this.confirmSummary.render();
            break;
          case 'seven':
            this.thanksView.render();
            break;
          default:
            break;
        }
        
        var scrollTarget = this.$el.offset();
        $("html,body").animate({
          scrollTop: scrollTarget.top
        }, 750);
      }
    },
    toggleInner: function(e){
      $(e.currentTarget).parent('.service-parent').toggleClass('show-inner');
    },
    keyBoard: function(e){
      // $('#edit-dealer').on('keydown', function(e) {
      if(e.keyCode == 13) {
        e.preventDefault();
        $('#postcode_search').click();
      }
    },
    preSelectDefaults: function(route){
      switch(window.location.pathname){
        case '/service-and-maintenance/car-servicing':
          this.preSelectServicing();
          break;
        case '/service-and-maintenance/hybrid-health-check':
          this.preSelectHybrid(true);
          break;
        case '/service-and-maintenance/repairs-and-parts':
          this.preSelectRepairs();
          break;
        case '/service-and-maintenance/mot-and-car-checks':
          this.preSelectMot();
          break;
        default:
          // this.preSelectServicing();
          break;
      };
      // return register.bookingSummaryView.renderOptions();
    },
    submitToDealer: function(){
      this.formStrung = register.formData.toJSON();
      this.formStrung = JSON.stringify(this.formStrung);

      // $('#olb-form input').val(this.formStrung);
      $('#olb-form input').attr('value', this.formStrung);
      
      $('#olb-form').submit()
    },
    preSelectVSR: function(){
      this.$('li[data-service="visual safety report"]').addClass('selected-option show-inner').find('a').removeClass('option-child').addClass('selected-child');
      register.vehicle.get('selected').add({
        price: "free",
        title: "visual safety report"
      });
      register.vehicle.get('selectedOptions').add({
        price: "free",
        title: "visual safety report"
      });
      return register.bookingSummaryView.renderOptions();
    },
    preSelectServicing: function(){
      this.$('li[data-service="car-servicing"]').addClass('show-inner');      
    },
    preSelectHybrid: function(displayPrice){
      if(displayPrice){
        var hybridCost = displayPrice ? '£39' : 'FREE';
        this.$('li[data-service="Hybrid Health Check"]').data('price','£39').find('.price').html('£39');
      }

      this.$('li[data-service="Hybrid Health Check"]').addClass('show-inner');//.find('a').removeClass('option-child').addClass('selected-child');
      register.vehicle.get('selected').add({
        price: hybridCost,
        title: "Hybrid Health Check"
      });
      register.vehicle.get('selectedOptions').add({
        price: hybridCost,
        title: "Hybrid Health Check"
      });
      this.$('li[data-service="visual safety report"]').addClass('selected-option show-inner').find('a').removeClass('option-child').addClass('selected-child');
      register.vehicle.get('selected').add({
        price: "free",
        title: "visual safety report"
      });
      register.vehicle.get('selectedOptions').add({
        price: "free",
        title: "visual safety report"
      });
    },
    preSelectRepairs: function(){
      this.$('li[data-service="repairs"]').addClass('show-inner').find('a').removeClass('option-child').addClass('selected-child');  
    },
    preSelectMot: function(){
      this.$('li[data-service="MOT"]').addClass('selected-option show-inner').find('a').removeClass('option-child').addClass('selected-child');
          
      register.vehicle.get('selected').add({
        title: "MOT",
        price: ''
      });
      register.vehicle.get('selectedOptions').add({
        title: "MOT",
        price: ''
      });
      return register.bookingSummaryView.renderOptions();
    }
  })
  return olbApp;
});