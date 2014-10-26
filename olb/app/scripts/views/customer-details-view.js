define(['backbone', 'register', 'models/address-finder-model', 'views/summary-confirmation-view'], function(Backbone, register, addressFinder, confirmSummary) {
  var userDetails = Backbone.View.extend({
    el: $('#customer-details'),
    events: {
      'click #find-address': 'findAddress',
      'click .hear-about': 'hearAbout',
      'click .opt-out': 'setOptOuts',
      'click #step-confirm': 'confirmationPage'
    },
    initialize: function() {      
      this.vehicle = register.vehicle;

      this.addressFinder = new addressFinder();

      this.confirmSummary = new confirmSummary();

      register.vehicle.get('customer').set({
        futureContactEmail: 1,
        futureContactSms: 1,
        futureContactMail: 1,
        futureContactPhone: 1
      });
    },
    template: _.template(
      $('#address-details').html()
    ),
    updateProgressBar: function(){
      $('#olb-wrap').find('.progess-bar .third').addClass('completed');
      $('.progess-bar .fourth').addClass('active');
    },    
    render: function(){
      var _this = this;
      this.$el.siblings('section').removeClass('current-step');
      this.$el.addClass('current-step');
      this.updateProgressBar();

      register.vehicle.getTotalPrice();

      $('#customer-details-form').validate({
        debug: true,
        errorClass: 'error_text',
        wrapper: 'div',
        errorElement: 'div',
        errorPlacement: function(obj, element) {
          //lpAddVars('page', 'ErrorCounter', errors);
          obj.addClass('wrapper_error f-right grid_4');
          obj.prepend('<div class="error_pointer"></div>');
          obj.css('left', '30px');

          obj.insertAfter(element);
        },
        // onfocusout: function(element) {
        //   $(element).valid(); 
        // },
        rules: {
          title: {
            required: true
          },
          firstname: {
            required: true,
            letterswithbasicpunc: true
          },
          surname: {
            required: true,
            letterswithbasicpunc: true
          },
          email: {
            required: true,
            email: true
          },
          phone: {
            required: true,
            phonesUK: true
          },
          house: {
            required: true
          },
          town: {
            required: true
          },
          postcode: {
            required: true,
            postcodeUKspecial: true
          }
        },
        messages: {
          title: {
            required: 'Please select your title. So that we can address you properly when we confirm your booking.'
          },
          firstname: {
            required: 'Please enter your first name. So that we can confirm your booking.'
          },
          surname: {
            required: 'Please enter your surname. So that we can confirm your booking.'
          },
          email: {
            required: 'Please enter your email address. In case we need to email you about your booking.'
          },
          phone: {
            required: 'Please enter your telephone number. UK telephone numbers should contain 10-11 digits.',
            phonesUK: 'Please enter your telephone number. UK telephone numbers should contain 10-11 digits.'
          },
          house: {
            required: 'Please enter your house name or number. In case we need to get in touch about your booking.'
          },
          town: {
            required: 'Please enter your town name. In case we need to get in touch about your booking.'
          },
          postcode: {
            required: 'Please enter your postcode. In case we need to get in touch about your booking.'
          }
        }
      });
    },
    buildData: function(){
      //Set up data to be submitted
      register.vehicle.get('customer').set({
        vehicleReg: register.vehicle.get('requested'),
        vin: register.vehicle.get('requested').length === 17 ? register.vehicle.get('requested') : 'XXXXXXXXXXXXXXXXX',
        vehicleModel: register.vehicle.get('model'),
        grade: register.vehicle.get('grade'),
        ident: register.vehicle.get('requested'),
        colour: register.vehicle.get('colour'),
        engine: register.vehicle.get('engine'),
        mileage: register.vehicle.get('bookingDetails').get('mileage'),
        age: register.vehicle.get('age'),
        serviceType: register.vehicle.get('bookingDetails').get('serviceId'),
        servicePrice: register.vehicle.get('bookingDetails').get('serviceprice'),
        servicePlan: register.vehicle.get('servicePlan'),
        HybridHealthCheck: this.queryOptionsCollection('title', 'hybrid health check'),
        HybridHealthCheckCost: this.queryOptionsCollection('', 'hybrid health check'),
        GeneralDiagnosis: this.queryOptionsCollection('title', 'general diagnosis'),
        GeneralDiagnosisCost: this.queryOptionsCollection( '', 'general diagnosis'),
        VisualSafetyReport: this.queryOptionsCollection('title', 'visual safety report'),
        VisualSafetyReportCost: this.queryOptionsCollection('', 'visual safety report'),
        optionCollectDeliver: 'N',
        mot: this.queryOptionsCollection('title', 'mot'),
        motCost: window.motPrice || 0,
        title: this.$('#title').val(),
        firstname: this.$('#edit-firstname').val(),
        surname: this.$('#edit-surname').val(),
        email: this.$('#edit-email').val(),
        housenameornumber: this.$('#edit-house').val(),
        address1: this.$('#address2').val(),
        address2: '',
        town: this.$('#edit-town').val(),
        county: this.$('#edit-county').val(),
        postcode: this.$('#edit-postcode').val(),
        additionalNotes: $('#add-info').val()
      });
      
      //default serviceType, servicePrice and mileage to 0 for submission
      if(!register.vehicle.get('customer').get('serviceType') && !register.vehicle.get('customer').get('servicePrice')){
        register.vehicle.get('customer').set({
          serviceType: '00000000',
          servicePrice: 0,
          mileage: 0
        });
      }
      this.getPhoneType(this.$('#phonetype').val());      
    },
    queryOptionsCollection: function(key, parameter){
      var result;
      if(key){
        register.vehicle.get('selectedOptions').find(function(model){
          if(model.get(key).toLowerCase() === parameter){
            result = 'Y';
          }else result = 'N';
        });
      }else{
        register.vehicle.get('selectedOptions').find(function(model){
          if(model.get('title').toLowerCase() === parameter){
            result = model.get('price');
          }
        });
      }
      return result;
    },
    findAddress: function(){
      window.console && console.info(this.$('#edit-postcode').valid())
      var _this = this;
      this.addressFinder.query = {
        postcode: this.$('#edit-postcode').val(),
        house: this.$('#edit-house').val()
      };

      this.addressFinder.fetch({
        success: function(response){
          _this.$('#detailed-address').html(_this.template(_this.addressFinder.toJSON()));
        }
      })
    },
    hearAbout: function(e){
      var $this = $(e.currentTarget);

      $this.siblings('li').removeClass('selected');
      $this.addClass('selected');

      if($this.data('hear-about') === 'Other'){
        this.vehicle.get('customer').set('marketingGroup', 'Other: '+this.$('#other-source').val());
      }else{
        this.vehicle.get('customer').set('marketingGroup', $this.data('hear-about'));
      }

    },
    getPhoneType: function(phoneType){
      window.console && console.info(phoneType)
      return register.vehicle.get('customer').set({ 
        homeTel: phoneType === 'home' ? this.$('#edit-phone').val() : '',
        workTel: phoneType === 'office' ? this.$('#edit-phone').val() : '',
        mobileTel: phoneType === 'mobile' ? this.$('#edit-phone').val() : ''
      });
    },
    confirmationPage: function(){
      if(!this.$('#hear-about li').hasClass('selected')){
        return register.validationView.showError('hear-about', '#hear-about');
      }
      if(this.$('#customer-details-form').valid()){
        this.buildData();
      }
      // this.buildData();

      this.confirmSummary.render();

      window.console && console.info(register.vehicle.get('customer').toJSON());
    },
    setOptOuts: function(e){
      var $this = $(e.currentTarget);
      if(!$this.hasClass('selected')){
        $this.addClass('selected');
        return this.vehicle.get('customer').set($this.data('opt-out'), 0);
      }else{
        $this.removeClass('selected');
        return this.vehicle.get('customer').set($this.data('opt-out'), 1);
      }
    }
  });
  return userDetails;
});