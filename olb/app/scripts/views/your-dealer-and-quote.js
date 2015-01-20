define(['backbone', 'register', 'models/vehicle', 'models/service-details', 'collections/fixed-price-collection', 'views/booking-summary-view', 'views/suggested-services-view', 'views/fixed-price-repairs-view'], function(Backbone, register, vehicle, serviceBooking, fixedPrices, summaryView, suggestedService, fixedPriceView) {
  var bookingOptions = Backbone.View.extend({
    el: $('#dealer-quote'),
    events: {
      'click #find-service': 'serviceLookUp',
      'click .service-plan': 'servicePlanActive',
      'click .option-child': 'addOption',
      'click .selected-child': 'removeOption',
      'click .user-wait': 'setWaiting',
      'click .servicing-child': 'removeServicing'
    },
    template: _.template(
      $('#help-me').html()
    ),
    waitTemplate: _.template(
      $('#selected-waiting-tpl').html()
    ),
    initialize: function() {
      this.serviceBooking = register.serviceBooking = new serviceBooking();
    },
    updateProgressBar: function() {
      $('#olb-wrap').find('.progess-bar .first').removeClass('active').addClass('completed');
      $('.progess-bar .second').addClass('active');
    },
    render: function() {
      var _this = this;
      register.loader.hideLoader();
      this.$el.siblings('section').removeClass('current-step');
      this.$el.addClass('current-step');
      $('#continue').hide();
      $('#summary').addClass('change-choices');

      register.vehicle.get('customer').set('dealerPhone', phone);
      register.vehicle.get('customer').set({
        dealerPhone: window.osbPhone,
        dealerId: window.osbDealerID,
        dealerName: window.dealerName
      });

      $('#need-help').empty().addClass('helping').append(this.template(register.vehicle.get('customer').toJSON()));
      $('.including').addClass('now-include');

      this.updateProgressBar();

      //this object is integral for this to work!
      if (window.osbInitValues) {
        this.data = {
          katashiki: window.osbInitValues.katashiki,
          mileage: window.osbInitValues.mileage,
          years: window.osbInitValues.age,
          age_months: window.osbInitValues.ageM
        };

        register.vehicle.query = window.osbInitValues.ident;

        register.vehicle.fetch({
          success: function() {
            // register.bookingSummaryView = new summaryView({
            //   model: register.vehicle
            // });
            _this.getFixedPrices(true);
          }
        });
        register.bookingSummaryView.checkHeight();
      }else {
        this.selectUserItems();
        register.bookingSummaryView.checkHeight();
      }
      return this.setWaitingAvailability();
    },
    setWaitingAvailability: function() {
      var selected = register.vehicle.get('selected');
      // if (!selected.length || !register.vehicle.get('bookingDetails').get('serviceprice')) {
      //   return;
      // }
      // window.console && console.info(register.vehicle.get('bookingDetails').get('serviceprice'))
      if (selected && selected.length === 1 && !register.vehicle.get('bookingDetails').get('serviceprice') && (selected.pluck('title').indexOf('visual safety report') > -1 || selected.pluck('title').indexOf('Hybrid Health Check') > -1)) {
        $('.choose-wait li[data-wait="collect"], .choose-wait li[data-wait="courtesy"]').hide();
      }else if (selected && selected.length === 2 && !register.vehicle.get('bookingDetails').get('serviceprice') && (selected.pluck('title').indexOf('Hybrid Health Check') > -1 && selected.pluck('title').indexOf('visual safety report') > -1)) {
        $('.choose-wait li[data-wait="collect"], .choose-wait li[data-wait="courtesy"]').hide();
      }else {
        $('.choose-wait li[data-wait="collect"], .choose-wait li[data-wait="courtesy"]').show();
      }
    },
    selectUserItems: function() {
      register.vehicle.get('selected').each(function(ele) {
        this.$('li[data-service="' + ele.get('title') + '"]:visible').removeClass('disabled inactive').addClass('selected-option show-inner').find('.menu-handle').addClass('selected-child');
      });
      this.getFixedPrices();

      this.checkHSD();
      //populate users mileage
      register.vehicle.get('bookingDetails').get('serviceprice') && this.$('#mileage').val(register.vehicle.get('approxMiles'));
      !register.vehicle.get('bookingDetails').get('serviceprice') && this.$('#mileage').attr('placeholder', 'Approximate mileage - this helps us to find you the right service options');

      return this.$('.proceed').removeClass('disabled');
    },
    getFixedPrices: function(getSelected) {
      var _this = this;

      register.vehicle.get('fixedPrices').query = {
        kata: window.osbInitValues ? window.osbInitValues.katashiki : register.vehicle.get('katashiki')
      };

      if (register.vehicle.get('fixedPrices').length) {
        this.fixedPriceView = new fixedPriceView({
          collection: register.vehicle.get('fixedPrices')
        });
        this.fixedPriceView.render('#confirm-choices');
      }else {
        register.vehicle.get('fixedPrices').fetch({
          success: function() {
            _this.fixedPriceView = new fixedPriceView({
              collection: register.vehicle.get('fixedPrices')
            });

            _this.fixedPriceView.render('#confirm-choices');

            getSelected && _this.getSelectedBookings();
          }
        });
      }

    },
    getSelectedBookings: function() {
      var _this = this;
      this.serviceBooking.query = this.data;

      window.osbInitValues.serviceObj.serviceprice && this.serviceBooking.fetch({
        success: function() {
          _this.$('li[data-service="car-servicing"]').addClass('selected-option show-inner');
          _this.suggestedService = new suggestedService({
            model: register.vehicle
          });
          _this.suggestedService.render();

          register.bookingSummaryView.render();
          register.bookingSummaryView.displayTotal();
          //populate users mileage
          //doesnt like bloew selector
          // this.$('#mileage').val(window.osbInitValues.mileage)
          $('.car-servicing').find('#mileage').val(window.osbInitValues.mileage);
          this.$('#mileage').attr('placeholder', 'Approximate mileage - this helps us to find you the right service options');
          register.vehicle.set('approxMiles', this.$('#mileage').val());
        }
      });

      window.osbInitValues.repairs.length && _.each(window.osbInitValues.repairs, function(repairObj, idx) {
        this.$('li[data-service="repairs"]').addClass('selected-option show-inner');

        var preSelectedRepairs = _(register.vehicle.get('fixedPrices').filter(function(repairModel) {
          if (repairObj.Repair === repairModel.get("title")) {
            register.vehicle.get('selected').add(repairModel);
            register.vehicle.get('selectedRepairs').add(repairModel);

            $('#' + repairModel.cid).addClass('repair-selected');

            register.bookingSummaryView.displayTotal();
            return register.bookingSummaryView.renderRepairs();
          }
        }))
      });
      // })).pluck("name");

      window.osbInitValues.generalDiagnosis === 'Y' && this.$('li[data-service="general diagnosis"] .menu-handle').click();

      if (window.osbInitValues.hybridHealthCheck === 'Y') {
        this.$('li[data-service="Hybrid Health Check"]').removeClass('disabled inactive').find('a').click();

        if (window.osbInitValues.serviceObj.serviceprice) {
          var hybridObj;
          this.$('li[data-service="Hybrid Health Check"]').data('price', 'FREE').find('.price').html('FREE');
          hybridObj = {
            price: 'FREE',
            title: 'Hybrid Health Check'
          };
        }else {
          hybridObj = {
            price: '£39',
            title: 'Hybrid Health Check'
          };
        }
        //remove hybrid price form collection
        _this.removeItem(hybridObj);
        //add it back in again with updated price
        _this.addItem(hybridObj);
      }

      window.osbInitValues.mot === 'Y' && this.$('li[data-service="MOT"] .menu-handle').click();

      window.osbInitValues.visualSafetyReport === 'Y' && this.$('li[data-service="visual safety report"] .menu-handle').click();

      this.checkHSD() && this.$('li[data-service="Hybrid Health Check"]').removeClass('disabled inactive');

      register.bookingSummaryView.displayTotal();
      this.$('.proceed').removeClass('disabled');

      return this.setWaitingAvailability();
    },
    serviceLookUp: function(e) {
      if ($(e.currentTarget).hasClass('disabled')) {
        return false;
      }
      if (!this.$('#mileage').val()) {
        return register.validationView.showError('no-mileage', '#mileage');
      }else if (this.$('#mileage').val().length >= 6) {
        return register.validationView.showError('high-mileage', '#mileage');
      }
      register.loader.showLoader(this.$el[0]);

      var _this = this;

      if (!this.data) {
        this.data = {
          katashiki: register.vehicle.get('katashiki'),
          mileage: this.$('#mileage').val(),
          years: register.vehicle.get('age'),
          age_months: register.vehicle.get('ageMonth')
        };
      }

      this.serviceBooking.query = this.data;

      register.vehicle.set('approxMiles', this.$('#mileage').val());

      this.serviceBooking.fetch({
        success: function() {
          _this.suggestedService = new suggestedService({
            model: register.vehicle
          });
          _this.suggestedService.render('#confirm-choices');
          register.bookingSummaryView.renderService();
          this.$('.mileage').addClass('available').html(register.vehicle.get('approxMiles') + ' Miles');

          // register.vehicle.get('selected').add(register.vehicle.get('bookingDetails'));
          register.bookingSummaryView.displayTotal();
          this.$('li[data-service="Hybrid Health Check"]').data('price', 'FREE').find('.price').html('FREE');
          if (this.$('li[data-service="Hybrid Health Check"]').hasClass('selected-option')) {
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

      return modelIsHybrid && this.$el.find('[data-service="Hybrid Health Check"]').removeClass('disabled inactive');
    },
    servicePlanActive: function() {
      this.$el.find('.service-plan').toggleClass('active');

      if (this.$el.find('.service-plan').hasClass('active')) {
        register.vehicle.set('servicePlan', 'Y');
      } else register.vehicle.set('servicePlan', 'N');
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
          // register.vehicle.get('selectedOptions').remove(element);
          return register.vehicle.get('selected').remove(element);
        }
      });

      this.filteredOptions = register.vehicle.get('selectedOptions').filter(function(option) {
        return option.get('title') !== item.title;
      });
      this.selectedOptions = new Backbone.Collection(this.filteredOptions);
      //reset selectOption collection with users new filtered collection
      register.vehicle.set('selectedOptions', this.selectedOptions);

      register.bookingSummaryView.renderOptions();

    },
    addOption: function(e) {
      var $parent = $(e.currentTarget).parent('.service-parent'),
        chosenOption = {
          title: $parent.data('service'),
          price: $parent.data('price')
        };
      if (!$parent.hasClass('disabled') && !$parent.hasClass('inactive') && !$parent.hasClass('parent-object')) {
        this.addItem(chosenOption);

        $parent.addClass('selected-option');
        $(e.currentTarget).removeClass('option-child').addClass('selected-child');
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
      $(e.currentTarget).addClass('option-child').removeClass('selected-child')
    },
    removeServicing: function(e) {
      register.vehicle.get('bookingDetails').clear();
      register.bookingSummaryView.displayTotal();

      this.$('li[data-service="Hybrid Health Check"]').data('price', '£39').find('.price').html('£39');
      if (this.$('li[data-service="Hybrid Health Check"]').hasClass('selected-option')) {
        var hybridObj = {
          price: '£39',
          title: 'Hybrid Health Check'
        };
        //remove hybrid price form collection
        this.removeItem(hybridObj);
        //add it back in again with updated price
        this.addItem(hybridObj);
      }

      if (this.suggestedService) {
        this.suggestedService.clearService();
      }else {
        this.suggestedService = new suggestedService();
        this.suggestedService.clearService();
      }
      register.bookingSummaryView.clearService();
    },
    setWaiting: function(e) {
      var $this = $(e.currentTarget),
        chosenWait = {
          title: $this.data('title'),
          price: $this.data('price')
        };
      register.vehicle.get('customer').set('chosenWait', chosenWait);

      if ($this.hasClass('selected')) {
        $this.removeClass('selected');
        register.vehicle.get('customer').set({
          optionPickDrop: 'Y', //default option for booking
          optionCourtesyCar: 'N',
          optionCollectDeliver: 'N',
          optionWhileYouWait: 'N',
          optionCost: Number(0)
        }),
        mockChosenWait = {
          title: this.$('.choose-wait .selected').data('title'),
          price: this.$('.choose-wait .selected').data('price')
        }
        $('#option-wait').empty().append(this.waitTemplate(mockChosenWait));
        register.vehicle.get('customer').set('chosenAdditionalWait', '');
      }else if (($this.data('wait') === 'courtesy' && this.$('li[data-wait="collect"]').hasClass('selected') || $this.data('wait') === 'collect' && this.$('li[data-wait="courtesy"]').hasClass('selected')) && window.collectCourtesy) {
        this.$('li[data-wait="wait"]').removeClass('selected');
        $this.addClass('selected');
        register.vehicle.get('customer').set({
          optionPickDrop: 'N', //default option for booking
          optionCourtesyCar: 'Y',
          optionCollectDeliver: 'Y',
          optionWhileYouWait: 'N',
          optionCost: $this.data('price') === 'FREE' ? Number(0) : $this.data('price').replace('£', '')
        }),
        mockCourtesy = {
          title: 'I would like a courtesy car',
          price: this.$('li[data-wait="courtesy"]').data('price')
        },
        mockCollect = {
          title: 'Please collect my car, delivering it back to me when ready',
          price: this.$('li[data-wait="collect"]').data('price')
        };

        $('#option-wait').empty().append(this.waitTemplate(mockCourtesy));
        $('#option-wait').append(this.waitTemplate(mockCollect));

        mockCourtesy.title = 'I would like to use a courtesy car'; // to remove line break - DIRTY
        register.vehicle.get('customer').set('chosenWait', mockCourtesy);
        register.vehicle.get('customer').set('chosenAdditionalWait', mockCollect);

      }else if ($this.data('wait') === 'courtesy' && !$this.hasClass('selected')) {
        this.$('.choose-wait li').removeClass('selected');
        $this.addClass('selected');
        register.vehicle.get('customer').set({
          optionPickDrop: 'Y', //default option for booking
          optionCourtesyCar: 'Y',
          optionCollectDeliver: 'N',
          optionWhileYouWait: 'N',
          optionCost: $this.data('price') === 'FREE' ? Number(0) : $this.data('price').replace('£', '')
        });

        $('#option-wait').empty().append(this.waitTemplate(chosenWait));
        register.vehicle.get('customer').set('chosenAdditionalWait', '');
      }else if ($this.data('wait') === 'collect' && !$this.hasClass('selected')) {
        this.$('.choose-wait li').removeClass('selected');
        $this.addClass('selected');
        register.vehicle.get('customer').set({
          optionPickDrop: 'N', //default option for booking
          optionCourtesyCar: 'N',
          optionCollectDeliver: 'Y',
          optionWhileYouWait: 'N',
          optionCost: $this.data('price') === 'FREE' ? Number(0) : $this.data('price').replace('£', '')
        });
        $('#option-wait').empty().append(this.waitTemplate(chosenWait));
        register.vehicle.get('customer').set('chosenAdditionalWait', '');
      }else if ($this.data('wait') === 'wait' && !$this.hasClass('selected')) {
        this.$('.choose-wait li').removeClass('selected');
        $this.addClass('selected');
        register.vehicle.get('customer').set({
          optionPickDrop: 'N', //default option for booking
          optionCourtesyCar: 'N',
          optionCollectDeliver: 'N',
          optionWhileYouWait: 'Y',
          optionCost: $this.data('price') === 'FREE' ? Number(0) : $this.data('price').replace('£', '')
        });

        $('#option-wait').empty().append(this.waitTemplate(chosenWait));
        register.vehicle.get('customer').set('chosenAdditionalWait', '');
      }

      // register.vehicle.get('customer').set({
      //   optionPickDrop: 'N', //default option for booking
      //   optionCourtesyCar: $this.data('wait') === 'courtesy' ? 'Y' : 'N',
      //   optionCollectDeliver: $this.data('wait') === 'collect' ? 'Y' : 'N',
      //   optionWhileYouWait: $this.data('wait') === 'wait' ? 'Y' : 'N',
      //   optionCost: $this.data('price') === 'FREE' ? Number(0) : $this.data('price').replace('£', '')
      // });
      if (!$this.hasClass('selected')) {
        if (!$this.siblings('.user-wait').hasClass('selected')) {
          $('#option-wait').empty();
          register.vehicle.get('customer').set({
            optionPickDrop: 'Y', //default option for booking
            optionCourtesyCar: 'N',
            optionCollectDeliver: 'N',
            optionWhileYouWait: 'N',
            optionCost: Number(0)
          });
          register.vehicle.get('customer').set('chosenWait', undefined);
          register.vehicle.get('customer').set('chosenAdditionalWait', '');
        }
      }

      register.bookingSummaryView.displayTotal();
      register.bookingSummaryView.checkHeight();
    }
  });
  return bookingOptions;
});
