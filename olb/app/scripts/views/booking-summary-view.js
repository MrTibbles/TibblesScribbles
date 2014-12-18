define(['backbone', 'register', 'models/vehicle', 'views/suggested-services-view'], function(Backbone, register, vehicle, suggestedService) {
  var bookingSummary = Backbone.View.extend({
    el: $('#summary'),
    events: {
      'click .remove-item': 'removeItem',
      'click .downloadable': 'downloadQuote',
      'click .remove-service': 'removeServicing'
    },
    yourCarTpl: _.template($('#your-car-tpl').html()),
    yourServicingTpl: _.template($('#selected-servicing-tpl').html()),
    yourRepairsTpl: _.template($('#selected-repairs-tpl').html()),
    yourOptionsTpl: _.template(
      $('#selected-options-tpl').html()),
    initialize: function() {
      this.model.on('change', this.render, this);
      this.model.on('change:selectedOptions', this.displayTotal, this);
      // this.model.on('change:selectedRepairs', this.displayTotal, this);
    },
    render: function() {
      register.loader.hideLoader();
      // window.console && console.info('Summary update: ', this.model);

      this.checkBooking();

      if (this.model.get('model')) {
        $('.service-parent').removeClass('inactive');
        $('#find-service').removeClass('disabled');

        this.$el.removeClass('empty');

        this.$el.find('#your-car').html(this.yourCarTpl(this.model.toJSON()));

        this.model.get('bookingDetails').get('mileage') && this.renderService();
      }
      // this.displayTotal();
      this.checkHeight();
      this.checkBooking();
      this.suggestedService = new suggestedService();
    },
    renderService: function() {
      // this.$('#continue').removeClass('disabled');
      this.$('.mileage').addClass('available').html(register.vehicle.get('approxMiles') + ' Miles');
      this.$('#selected-service').addClass('selected').html(this.yourServicingTpl(this.model.toJSON()));
      this.checkBooking();
    },
    clearService: function() {
      this.$('#selected-service').removeClass('selected').empty();
      this.checkBooking();
      return _.once(this.displayTotal());
    },
    renderOptions: function() {
      var _this = this;

      // this.$('#continue').removeClass('disabled');
      this.$('#selected-options').empty();
      register.vehicle.get('selectedOptions').each(function(ele) {
        _this.$('#selected-options').append(_this.yourOptionsTpl(ele.toJSON()));
      });

      this.checkBooking();
    },
    renderRepairs: function() {
      var _this = this;

      this.displayTotal();
      if (register.vehicle.get('selectedRepairs').length) {
        this.$('#selected-repairs').addClass('selected').html(this.yourRepairsTpl(register.vehicle.toJSON()));
      }else {
        this.$('#selected-repairs').removeClass('selected').empty();
      }

      this.checkBooking();
    },
    removeItem: function(e) {
      var $this = $(e.currentTarget), item, title;
      switch ($this.data('type')){
        case 'service':
          register.vehicle.get('bookingDetails').clear();
          this.$('#selected-service').removeClass('selected').empty();
          $('li[data-service="car-servicing"]').removeClass('selected');

          break;
        case 'option':
          register.vehicle.get('selected').each(function(ele) {
            if (ele.get('title') === $this.data('title')) {
              return register.vehicle.get('selected').remove(ele);
            }
          });
          register.vehicle.get('selectedOptions').each(function(ele) {
            if (ele.get('title') === $this.data('title')) {
              return register.vehicle.get('selectedOptions').remove(ele);
            }
          });
          $('li[data-service="' + $this.data('title') + '"]').removeClass('selected-option selected').find('.menu-handle').removeClass('selected-child').addClass('option-child');
          this.renderOptions();

          break;
        case 'repair':
          item = register.vehicle.get('selected').findWhere({title: $this.data('title')}),
            repairItem = register.vehicle.get('selectedRepairs').findWhere({title: $this.data('title')});

          register.vehicle.get('selected').remove(item);
          register.vehicle.get('selectedRepairs').remove(repairItem);
          $('.repair-choices li[data-repair="' + $this.data('title') + '"]').removeClass('repair-selected').addClass('repair-item');
          !$('.repair-choices li').siblings('li').hasClass('repair-selected') && $('li[data-service="repairs"]').removeClass('selected-option');

          this.renderRepairs();

          break;
        case 'waiting':
          title = $this.data('title');

          this.$('#option-wait').find('li[data-title="' + title + '"]').remove();
          $('.choose-wait li[data-title="' + title + '"]').removeClass('selected');
          register.vehicle.get('customer').set({
            optionPickDrop: 'N', //default option for booking
            optionCourtesyCar: title.indexOf('courtesy') > -1 ? 'Y' : 'N',
            optionCollectDeliver: title.indexOf('collect') > -1 ? 'Y' : 'N',
            optionWhileYouWait: title.indexOf('wait') > -1 ? 'Y' : 'N',
            optionCost: $this.data('price') === 'FREE' ? Number(0) : $this.data('price').replace('£', '')
          });
          break;
      }
    },
    removeServicing: function(e) {
      register.vehicle.get('bookingDetails').clear();

      this.suggestedService.clearService();
      this.clearService();
      register.vehicle.getTotalPrice();
    },
    checkBooking: function() {
      if (register.vehicle.get('model') && register.vehicle.get('selected').length || register.vehicle.get('model') && register.vehicle.get('bookingDetails').get('servicetype')) {
        this.$el.removeClass('empty-selection')
        $('.proceed').removeClass('disabled'); // doubled up for multiple secltions
        this.$('.proceed').removeClass('disabled inactive');
        this.$('.download-quote').addClass('downloadable');
      }else {
        $('.proceed').addClass('disabled');  // doubled up for multiple secltions - rather thn each loop
        !this.$('.proceed').hasClass('disabled') && this.$('.proceed').addClass('disabled');
        this.$el.addClass('empty-selection')
        this.$('.download-quote').removeClass('downloadable');
      }
    },
    checkHeight: function() {
      if ($('#olb-content').outerHeight(true) <= this.$el.outerHeight(true)) {
        $('#olb-content').css('min-height', this.$el.outerHeight(true) + 50 + 'px');
      }
    },
    queryOptionsCollection: function(key, parameter) {
      var result;
      if (key) {
        result = register.vehicle.get('selectedOptions').findWhere({title: parameter}) ? 'Y' : 'N';
      }else {
        register.vehicle.get('selectedOptions').find(function(model) {
          if (model.get('title').toLowerCase() === parameter) {
            result = model.get('price').replace('£', '');
          }
        });
      }
      return result;
    },
    getSelectedRepairs: function() {
      var userRepairs = [];
      register.vehicle.get('selectedRepairs').each(function(ele) {
        var repairItem = {
          Repair: ele.get('title'),
          RepairCost: ele.get('price')
        };
        return userRepairs.push(repairItem);
      });
      return userRepairs;
    },
    displayTotal: function() {
      var total = {
        title: 'TOTAL',
        price: register.vehicle.getTotalPrice()
      };
      // total.price && this.$('#summary-total').addClass('priced').html(this.yourOptionsTpl(total));
      // !total.price && this.$('#summary-total').removeClass('priced');
      if (total.price) {
        total.price = '£' + total.price;
        this.$('#summary-total').addClass('priced').html(this.yourOptionsTpl(total));
      }else this.$('#summary-total').removeClass('priced');
    },
    downloadQuote: function(e) {
      var $this = $(e.currentTarget),
      downloadForm = $('<form/>').attr({
        id:'tmpSavePDFForm',
        method: 'POST',
        action: window.retail ? 'http://global.toyota.co.uk/owners/service-booking/pdf' : '/owners/service-booking/pdf',
        target: '_blank'
      }),
      pdfSubmitData = {
        mileageEntered: register.vehicle.get('approxMiles'),
        serviceDesc: escape(register.vehicle.get('bookingDetails').get('servicetype')),
        mot: this.queryOptionsCollection('title', 'MOT'),
        motCost: window.motPrice || 0,
        HybridHealthCheck: this.queryOptionsCollection('title', 'Hybrid Health Check'),
        dealerName: register.vehicle.get('customer').get('dealerName'),
        vehicleReg: register.vehicle.get('requested'),
        vehicleModel: register.vehicle.get('model'),
        HybridHealthCheckCost: this.queryOptionsCollection('', 'hybrid health check'),
        GeneralDiagnosis: this.queryOptionsCollection('title', 'general diagnosis'),
        GeneralDiagnosisCost: this.queryOptionsCollection('', 'general diagnosis'),
        VisualSafetyReport: this.queryOptionsCollection('title', 'visual safety report'),
        VisualSafetyReportCost: this.queryOptionsCollection('', 'visual safety report'),
        MyToyotaView: this.queryOptionsCollection('title', 'MyToyotaView'),
        Repairs: this.getSelectedRepairs(),
        totalPrice: register.vehicle.getTotalPrice()
      };

      window.console && console.info(JSON.stringify(pdfSubmitData))
      $('<input/>').attr({type: 'hidden', name: 'pdf_submit_data'}).val(JSON.stringify(pdfSubmitData)).appendTo(downloadForm);

      downloadForm.appendTo('body').submit();
    }
  });
  return bookingSummary;
});
