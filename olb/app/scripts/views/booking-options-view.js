define(['backbone', 'register', 'models/service-details', 'collections/fixed-price-collection', 'views/booking-summary-view', 'views/suggested-services-view', 'views/fixed-price-repairs-view'], function(Backbone, register, serviceBooking, fixedPrices, summaryView, suggestedService, fixedPriceView) {
  var bookingOptions = Backbone.View.extend({
    el: $('#booking-choices'),
    events: {
      'click #find-service': 'serviceLookUp',
      'click .service-plan': 'servicePlanActive',
      // 'click .car-servicing': addService
      'click .option-item': 'addOption',
      'click .selected-option': 'removeOption'
    },
    initialize: function() {
      this.serviceBooking = register.serviceBooking = new serviceBooking();

      // this.suggestedService.on('render')
      this.selected = new Backbone.Collection();

      // this.selected.on('change', register.bookingSummaryView.render, this);
    },
    render: function() {
      register.loader.hideLoader();
      // this.$el.find('li[data-service="car-servicing"]').addClass('selected')
      this.checkHSD();

      this.getFixedPrices();
    },
    serviceLookUp: function() {
      register.loader.showLoader(this.$el[0]);

      var _this = this;

      var data = {
        katashiki: register.vehicle.get('katashiki'),
        mileage: this.$('#mileage').val(),
        years: register.vehicle.get('age'),
        age_months: register.vehicle.get('ageMonth')
      };

      this.serviceBooking.query = data;

      this.serviceBooking.fetch({
        success: function() {
          register.vehicle.set('selected', _this.selected);
          register.vehicle.set('approxMiles', this.$('#mileage').val());

          _this.suggestedService = new suggestedService({
            model: register.vehicle
          });          
          _this.suggestedService.render();
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
    getFixedPrices: function() {
      var _this = this;

      register.vehicle.get('fixedPrices').query = {
        kata: register.vehicle.get('katashiki')
      };

      register.vehicle.get('fixedPrices').fetch({
        success: function() {
          _this.fixedPriceView = new fixedPriceView({
            collection: register.vehicle.get('fixedPrices')
          });

          _this.fixedPriceView.render('#booking-choices');
        }
      });
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
          price: $(e.currentTarget).data('price'),
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
    }
  });
  return bookingOptions;
});
