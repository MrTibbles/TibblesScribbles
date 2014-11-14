define(['backbone', 'register', 'models/service-details', 'collections/fixed-price-collection', 'views/booking-summary-view', 'views/suggested-services-view', 'views/fixed-price-repairs-view'], function(Backbone, register, serviceBooking, fixedPrices, summaryView, suggestedService, fixedPriceView) {
  var bookingOptions = Backbone.View.extend({
    el: $('#booking-choices'),
    events: {
      'click #find-service': 'serviceLookUp',
      'submit #olb-mileage-lookup': 'serviceLookUp',
      'click .service-plan': 'servicePlanActive',
      // 'click .car-servicing': addService
      'click .option-child': 'addOption',
      'click .selected-child': 'removeOption',
      'mouseenter .service-plan-active': 'showToolTip',
      'onmouseover .service-plan-active': 'showToolTip',
      'mouseleave .service-plan-active': 'hideToolTip',
      'mouseleave .service-plan': 'hideToolTip',
      'click .servicing-child': 'removeServicing'
    },
    initialize: function() {
      this.serviceBooking = register.serviceBooking = new serviceBooking();

      this.selected = new Backbone.Collection();

      // this.selected.on('change', register.bookingSummaryView.render, this);
    },
    render: function() {
      register.loader.hideLoader();
      register.vehicle.get('model') && this.checkHSD();
    },
    serviceLookUp: function(e) {
      e.preventDefault();
      if ($(e.currentTarget).hasClass('disabled')) {
        return false;
      }
      if (!$('#mileage').val()) {
        register.validationView.clearError('#mileage');
        return register.validationView.showError('no-mileage', '#mileage');
      }else if ($('#mileage').val().length >= 6) {
        register.validationView.clearError('#mileage');
        return register.validationView.showError('high-mileage', '#mileage');
      }
      register.loader.showLoader(this.$el[0]);

      var _this = this,
        data = {
          katashiki: register.vehicle.get('katashiki'),
          mileage: this.$('#mileage').val(),
          years: register.vehicle.get('age'),
          age_months: register.vehicle.get('ageMonth')
        };

      this.serviceBooking.query = data;

      this.serviceBooking.fetch({
        success: function() {
          register.validationView.clearError('#mileage');
          register.vehicle.set('approxMiles', this.$('#mileage').val());

          _this.suggestedService = new suggestedService({
            model: register.vehicle
          });
          register.validationView.clearError('#mileage');
          _this.suggestedService.render('#booking-choices');

          register.bookingSummaryView.renderService();
          register.bookingSummaryView.displayTotal();

          this.$('li[data-service="Hybrid Health Check"]').data('price','FREE').find('.price').html('FREE');
          if (register.vehicle.get('selected').where({title: 'Hybrid Health Check'}).length) {
            var hybridObj = {
              price: 'FREE',
              title: 'Hybrid Health Check'
            };
            //remove hybrid price form collection
            _this.removeItem(hybridObj);
            //add it back in again with updated price
            _this.addItem(hybridObj);
          }
        }
      });
    },
    checkHSD: function() {
      var hsd = new RegExp('hybrid'),
        modelIsHybrid = hsd.test(register.vehicle.get('engine').toLowerCase());

      if (modelIsHybrid) {
        this.$el.find('[data-service="Hybrid Health Check"]').removeClass('disabled inactive').addClass('selected-option').find('a').removeClass('option-child').addClass('selected-child');
        register.vehicle.get('selected').add({
          price: '£39',
          title: 'Hybrid Health Check'
        });
        register.vehicle.get('selectedOptions').add({
          price: '£39',
          title: 'Hybrid Health Check'
        });
        this.$('li[data-service="Hybrid Health Check"]').data('price','£39').find('.price').html('£39');

        return register.bookingSummaryView.renderOptions();
      }
    },
    getFixedPrices: function() {
      register.loader.showLoader(this.$('li[data-service="repairs"] .repair-choices')[0]);
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
          register.loader.hideLoader();
        }
      });
    },
    addItem: function(item) {
      register.vehicle.get('selected').add(item);
      register.vehicle.get('selectedOptions').add(item);

      register.bookingSummaryView.renderOptions();
      register.bookingSummaryView.displayTotal();
    },
    removeItem: function(item) {
      var _this = this;

      register.vehicle.get('selected').each(function(element) {
        if (element.get('title') === item.title) {
          return register.vehicle.get('selected').remove(element);
        }
      });

      this.filteredOptions = register.vehicle.get('selectedOptions').filter(function(option) {
        return option.get('title') !== item.title;
      });
      this.selectedOptions = new Backbone.Collection(this.filteredOptions);
      //reset selectedOption collection with users new filtered collection
      register.vehicle.set('selectedOptions', this.selectedOptions);

      register.bookingSummaryView.renderOptions();

      register.bookingSummaryView.displayTotal();
    },
    addOption: function(e) {
      var $parent = $(e.currentTarget).parent('.service-parent');
      if (!$parent.hasClass('disabled') && !$parent.hasClass('inactive') && !$parent.hasClass('parent-object') && !$parent.hasClass('selected-option')) {
        var chosenOption = {
          title: $parent.data('service'),
          price: $parent.data('price')
        };

        this.addItem(chosenOption);

        $parent.addClass('selected-option');
        $(e.currentTarget).removeClass('option-child').addClass('selected-child');
      }else if ($parent.hasClass('inactive')) {
        var scrollTarget = $('#your-car').offset();
        $('html,body').animate({
          scrollTop: scrollTarget.top
        }, 500);
        $('#your-car .lite').addClass('prompt');
      }
    },
    removeOption: function(e) {
      var $parent = $(e.currentTarget).parent('.service-parent'),
        chosenOption = {
          title: $parent.data('service'),
          state: true
        };
      this.removeItem(chosenOption);

      $parent.removeClass('selected-option');
      $(e.currentTarget).addClass('option-child').removeClass('selected-child');
    },
    removeServicing: function(e) {
      register.vehicle.get('bookingDetails').clear();
      this.$('li[data-service="Hybrid Health Check"]').data('price','£39').find('.price').html('£39');

      register.bookingSummaryView.displayTotal();

      if (register.vehicle.get('selected').where({title: 'Hybrid Health Check'}).length) {
        var hybridObj = {
          price: '£39',
          title: 'Hybrid Health Check'
        };
        //remove hybrid price form collection
        this.removeItem(hybridObj);
        //add it back in again with updated price
        this.addItem(hybridObj);
      }

      this.suggestedService.clearService();
      register.bookingSummaryView.clearService();
    },
    servicePlanActive: function(e) {
      this.$('.service-plan').toggleClass('service-plan-active');

      if (this.$('.service-plan').hasClass('service-plan-active')) {
        return this.setServicePlan(true);
      } else {
        return this.setServicePlan(false);
      }
    },
    setServicePlan: function(active) {
      if (active) {
        register.vehicle.set('servicePlan', 'Y');
        this.suggestedService.render();

        $('.data-price').hide();
        $('.plan-price').show();
        // this.showToolTip();
        this.$('.tool-tip').addClass('tipping');

        // register.vehicle.get('bookingDetails').set('serviceprice','-');
        // _.each(register.vehicle.get('bookingDetails').get('options'), function(ele){
        //   ele.price = '-';
        // });
      }else {
        register.vehicle.set('servicePlan', 'N');
        this.suggestedService.render();

        $('.data-price').show();
        $('.plan-price').hide();
      }
    },
    showToolTip:function(e) {
      var boxOffset = $(e.currentTarget).position();// || $('.service-plan').offset();

      this.$('.tool-tip').addClass('tipping').css({
        top: (boxOffset.top - 135),
        left: (boxOffset.left + 75)
      });
    },
    hideToolTip: function(e) {
      this.$('.tool-tip').removeClass('tipping');
    }
  });
  return bookingOptions;
});
