define(['backbone', 'register', 'models/vehicle', 'views/suggested-services-view'], function(Backbone, register, vehicle, suggestedService) {
  var bookingSummary = Backbone.View.extend({
    el: $('#summary'),
    events: {
      'click .remove-item': 'removeItem',
      'click .downloadable': 'downloadQuote',
      'click .remove-service': 'removeServicing'
    },
    yourCarTpl: _.template(
    	$('#your-car-tpl').html()
  	),
    yourServicingTpl: _.template(
      $('#selected-servicing-tpl').html()
    ),
    yourRepairsTpl: _.template(
      $('#selected-repairs-tpl').html()
    ),
    yourOptionsTpl: _.template(
      $('#selected-options-tpl').html()
    ),
    initialize: function() {
      // this.model.on('change', this.render, this);
    	// this.model.on('change:selected', this.renderOptions, this);
      this.model.on('change', this.render, this);
    },
    render: function(){
      register.loader.hideLoader();
      window.console && console.info('Summary update: ', this.model);      

      this.checkBooking();

      if(this.model.get('model')){
        $('.service-parent').removeClass('inactive');
        $('#find-service').removeClass('disabled');        

        this.$el.removeClass('empty');    

        this.$el.find('#your-car').html(this.yourCarTpl(this.model.toJSON()));

        this.model.get('bookingDetails').get('mileage') && this.renderService();
      }

      this.checkHeight();
      this.suggestedService = new suggestedService();
    },
    renderService: function(){
      // this.$('#continue').removeClass('disabled');

      this.$('.mileage').addClass('available');
      this.$('#selected-service').addClass('selected').html(this.yourServicingTpl(this.model.toJSON()));
    },
    clearService: function(){
      this.$('#selected-service').removeClass('selected').empty();
      this.checkBooking()
    },
    renderOptions: function(){          
      var _this = this;
      window.console && console.info('Selected: ', register.vehicle.get('selected'));
      window.console && console.info('Selected Options: ', register.vehicle.get('selectedOptions'));

      // this.$('#continue').removeClass('disabled');
      this.$('#selected-options').empty();
      
      register.vehicle.get('selectedOptions').each(function(ele){
        _this.$('#selected-options').append(_this.yourOptionsTpl(ele.toJSON()));  
      });

      this.checkBooking();
    },
    renderRepairs: function(){
      var _this = this;
      window.console && console.info('Selected: ', register.vehicle.get('selected'));
      window.console && console.info('Selected Repairs: ', register.vehicle.get('selectedRepairs'))

      if(register.vehicle.get('selectedRepairs').length){
        this.$('#selected-repairs').addClass('selected').html(this.yourRepairsTpl(register.vehicle.toJSON()));
      }else{
        this.$('#selected-repairs').removeClass('selected').empty();
      }
      // this.model.get('selectedRepairs').each(function(ele){
      //   window.console && console.info(ele);
      //   _this.$el.find('#selected-repairs').append(_this.yourRepairsTpl(ele.toJSON()));  
      // });
      this.checkBooking();
    },
    removeItem: function(e){
      var $this = $(e.currentTarget);
      switch($this.data('type')){
        case 'service':
          register.vehicle.get('bookingDetails').clear();
          this.$('#selected-service').removeClass('selected').empty();
          $('li[data-service="car-servicing"]').removeClass('selected');
          break;
        case 'option':
          register.vehicle.get('selected').each(function(ele){
            if(ele.get('title') === $this.data('title')){              
              return register.vehicle.get('selected').remove(ele);
            }
          });
          register.vehicle.get('selectedOptions').each(function(ele){
            if(ele.get('title') === $this.data('title')){
              return register.vehicle.get('selectedOptions').remove(ele);
            }
          });
          // this.$('#selected-options li[data-title="'+$this.data('title')+'"]').remove();
          window.console && console.info($this.data('title'), $('li[data-service="'+$this.data('title')+'"]'))
          $('li[data-service="'+$this.data('title')+'"]').removeClass('selected-option selected').find('.menu-handle').removeClass('selected-child').addClass('option-child');
          this.renderOptions();
          break;
      }
    },
    removeServicing: function(e){      
      register.vehicle.get('bookingDetails').clear();

      this.suggestedService.clearService();
      register.bookingSummaryView.clearService();
    },
    checkBooking: function(){
      if(this.model.get('model') && register.vehicle.get('selected').length){
        this.$el.removeClass('empty-selection')
        this.$('#continue').removeClass('disabled');
        this.$('.download-quote').addClass('downloadable');
      }else{
        !this.$('#continue').hasClass('disabled') && this.$('#continue').addClass('disabled');
        this.$el.addClass('empty-selection')
        this.$('.download-quote').removeClass('downloadable');
      }
    },
    checkHeight: function(){
      // window.console && console.info('Summary height: ',this.$el.height())
    },
    queryOptionsCollection: function(key, parameter){
      var result;
      if(key){
        result = register.vehicle.get('selectedOptions').findWhere({title: parameter}) ? 'Y' : 'N';
      }else{
        register.vehicle.get('selectedOptions').find(function(model){
          if(model.get('title').toLowerCase() === parameter){
            result = model.get('price');
          }
        });
      }
      return result;
    },
    downloadQuote: function(e){
      var $this = $(e.currentTarget);
      
      var downloadForm = $('<form/>').attr({
        'id':'tmpSavePDFForm',
        'method': 'POST',
        // 'action': window.location.hostname === 'localhost' ? 'http://pinkstones.toyota.co.uk/owners/service-booking/pdf' : '/owners/service-booking/pdf',
        'action': window.retail ? 'http://global.toyota.co.uk/owners/service-booking/pdf' : '/owners/service-booking/pdf',
        'target': '_blank'
      });

      //vehicleReg=MM06ZPC&vin=xxxxxxxxxxxxxxxxx&vehicleModel=Yaris+NG+T2&vehicleColour=&engine=1.0+VVT-i&additionalNotes1=&dealerId=&mileage=12&age=8&serviceDate=&serviceTime=&serviceTimeExact=&serviceType=77991388&servicePrice=255.00&servicePlan=N&optionWhileYouWait=N&optionCollectDeliver=N&optionPickDrop=Y&optionCourtesyCar=N&optionCost=0&courtesyCarCost=0&mot=N&motCost=0.00&serviceAdds=Brake+Fluid+-+%28Change+Every+2+Years%29%2C39%2C39&title=&firstname=&surname=&address1=&address2=&town=&county=&postcode=&homeTel=&workTel=&mobileTel=&email=&ageM=100&colour=Crystal+Silver&vehicleYears=2006&katashiki=KSP90&mileageEntered=12&vehicleYear=&serviceDesc=Full%2B+Service+%288+years+or+80000+miles%29&serviceCostEffective=255.00&motCostDisplay=0.00&totalPrice=255.00&dealerName=Currie+Motors+%28Twickenham%29      

      var pdf_submit_data = {
        dealerName: register.vehicle.get('customer').get('dealerName'),
        vehicleReg: register.vehicle.get('requested'),
        vehicleModel: register.vehicle.get('model'),
        mileageEntered: register.vehicle.get('approxMiles'),
        serviceDesc: escape(register.vehicle.get('bookingDetails').get('servicetype')),
        mot: this.queryOptionsCollection('title', 'MOT'),
        motCost: window.motPrice || 0,
        HybridHealthCheck: this.queryOptionsCollection('title', 'hybrid health check'),
        HybridHealthCheckCost: this.queryOptionsCollection('', 'hybrid health check'),
        GeneralDiagnosis: this.queryOptionsCollection('title', 'general diagnosis'),
        GeneralDiagnosisCost: this.queryOptionsCollection( '', 'general diagnosis'),
        VisualSafetyReport: this.queryOptionsCollection('title', 'visual safety report'),
        VisualSafetyReportCost: this.queryOptionsCollection('', 'visual safety report'),
        MyToyotaView: this.queryOptionsCollection('title', 'MyToyotaView'),
        totalPrice: register.vehicle.getTotalPrice()
      };

      window.console && console.info(JSON.stringify(pdf_submit_data))
      $('<input/>').attr({'type': 'hidden','name': 'pdf_submit_data'}).val(JSON.stringify(pdf_submit_data)).appendTo(downloadForm);

      downloadForm.appendTo('body').submit();
    }
  });
  return bookingSummary;
});