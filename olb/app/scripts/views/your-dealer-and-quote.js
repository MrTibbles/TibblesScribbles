define(['backbone', 'register', 'models/vehicle', 'models/service-details', 'collections/fixed-price-collection', 'views/booking-summary-view', 'views/suggested-services-view', 'views/fixed-price-repairs-view'], function(Backbone, register, vehicle, serviceBooking, fixedPrices, summaryView, suggestedService, fixedPriceView) {
  var bookingOptions = Backbone.View.extend({
    el: $('#dealer-quote'),
    events: {
      'click #find-service': 'serviceLookUp',
      'click .service-plan': 'servicePlanActive',
      'click .option-item': 'addOption',
      'click .selected-option': 'removeOption',
      'click .user-wait': 'setWaiting'
    },
    initialize: function() {
      this.serviceBooking = register.serviceBooking = new serviceBooking();        
    },
    updateProgressBar: function(){
      $('#olb-wrap').find('.progess-bar .first').addClass('completed');
      $('.progess-bar .second').addClass('active');
    },
    render: function() {
      var _this = this;
      register.loader.hideLoader();
      this.$el.siblings('section').removeClass('current-step');
      this.$el.addClass('current-step');
      $('#continue').hide();

      this.updateProgressBar();

      //this object is integral for this to work!
      if(window.osbInitValues){
        this.data = {
          katashiki: window.osbInitValues.katashiki,
          mileage: window.osbInitValues.mileage,
          years: window.osbInitValues.age,
          age_months: window.osbInitValues.ageM
        };  

        register.vehicle.query = window.osbInitValues.ident;

        register.vehicle.fetch({
          success: function(){
            register.bookingSummaryView = new summaryView({
              model: register.vehicle
            });            
            _this.getFixedPrices();
          }
        });
        // this.checkHSD();
      }else{
        window.console && console.error('NOT FOUND TCW OBJECT');
      }
    },
    getFixedPrices: function() {
      var _this = this;

      register.vehicle.get('fixedPrices').query = {
        kata: window.osbInitValues.katashiki
      };

      register.vehicle.get('fixedPrices').fetch({
        success: function() {
          _this.fixedPriceView = new fixedPriceView({
            collection: register.vehicle.get('fixedPrices')
          });

          _this.fixedPriceView.render('#confirm-choices');

          _this.getSelectedBookings();
        }
      });
    },
    getSelectedBookings: function(){     
      window.osbInitValues.repairs.length && _.each(window.osbInitValues.repairs, function(repairObj, idx){
        this.$('li[data-service="repairs"]').addClass('selected');

        var preSelectedRepairs = _(register.vehicle.get('fixedPrices').filter(function(repairModel) {          
          if(repairObj.Repair === repairModel.get("title")){
            register.vehicle.get('selected').add(repairModel);
            register.vehicle.get('selectedRepairs').add(repairModel);

            $('#'+repairModel.cid).addClass('repair-selected');

            return register.bookingSummaryView.renderRepairs();
          }
        }))
      });

        
      // })).pluck("name");

      if(window.osbInitValues.GeneralDiagnosis === 'Y'){
        this.$('li[data-service="general diagnosis"]').click();
      }
      if(window.osbInitValues.HybridHealthCheck === 'Y'){
        this.$('li[data-service="Hybrid Health Check"]').click();
      }
      if(window.osbInitValues.MOT === 'Y'){
        this.$('li[data-service="MOT"]').click();
      }
      if(window.osbInitValues.VisualSafetyReport === 'Y'){
        this.$('li[data-service="visual safety report"]').click();
      }      
    },
    serviceLookUp: function() {
      register.loader.showLoader(this.$el[0]);

      var _this = this;

      if(!this.data){
        this.data = {
          katashiki: register.vehicle.get('katashiki'),
          mileage: this.$('#mileage').val(),
          years: register.vehicle.get('age'),
          age_months: register.vehicle.get('ageMonth')
        };
      }

      this.serviceBooking.query = this.data;

      this.serviceBooking.fetch({
        success: function() {
          // //need to get selected here
          // register.vehicle.set('selected', _this.selected);
          // register.vehicle.set('approxMiles', this.$('#mileage').val());

          _this.suggestedService = new suggestedService({
            model: register.vehicle
          });          
          // _this.suggestedService.render();
          // register.vehicle.get('selected').add(register.vehicle.get('bookingDetails'));
        }
      });
    },
    checkHSD: function() {
      var hsd = new RegExp('hybrid'),
        modelIsHybrid = hsd.test(register.vehicle.get('engine').toLowerCase());

      return modelIsHybrid && this.$el.find('[data-service="Hybrid Health Check"]').removeClass('disabled');
    },
    servicePlanActive: function() {
      this.$el.find('.service-plan').toggleClass('active');

      if (this.$el.find('.service-plan').hasClass('active')) {
        register.vehicle.set('servicePlan', true);
      } else register.vehicle.set('servicePlan', false);
    },
    addItem: function(item) {
      register.vehicle.get('selected').add(item);
      register.vehicle.get('selectedOptions').add(item);

      register.bookingSummaryView.renderOptions();
    },
    removeItem: function(item) {
      var _this = this;

      register.vehicle.get('selected').each(function(element) {
        if (element.get('title') === item.title) {
          // register.vehicle.get('selectedOptions').remove(element);          
          return register.vehicle.get('selected').remove(element);
        }
      });
     
      this.filteredOptions = register.vehicle.get('selectedOptions').filter(function(option){
        return option.get('title') !== item.title;
      });
      this.selectedOptions = new Backbone.Collection(this.filteredOptions);
      //reset selectOption collection with users new filtered collection
      register.vehicle.set('selectedOptions', this.selectedOptions);

      register.bookingSummaryView.renderOptions();
    },
    addOption: function(e) {
      if (!$(e.currentTarget).hasClass('disabled') && !$(e.currentTarget).hasClass('inactive')) {
        var chosenOption = {
          title: $(e.currentTarget).data('service'),
          price: 'free'
        };

        this.addItem(chosenOption);

        $(e.currentTarget).removeClass('option-item').addClass('selected-option');
      }
    },
    removeOption: function(e) {
      var chosenOption = {
        title: $(e.currentTarget).data('service'),
        state: true
      };
      this.removeItem(chosenOption);

      $(e.currentTarget).removeClass('selected-option').addClass('option-item');
    },
    setWaiting: function(e){
      var $this = $(e.currentTarget);
      this.$('.choose-wait li').removeClass('selected');
      $this.addClass('selected');
      this.$('.proceed').removeClass('disabled');
      
      return register.vehicle.get('customer').set('customer-waiting',$this.data('wait'));
    }
  });
  return bookingOptions;
});
