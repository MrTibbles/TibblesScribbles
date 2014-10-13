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

      window.console && console.info(register.vehicle)     

      this.$('#customer-details-form').validate({
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
        vehicleModel: register.vehicle.get('model'),
        grade: register.vehicle.get('grade'),
        ident: register.vehicle.get('requested'),
        colour: register.vehicle.get('colour'),
        engine: register.vehicle.get('engine'),
        mileage: register.vehicle.get('bookingDetails').get('mileage'),
        age: register.vehicle.get('age'),
        serviceType: register.vehicle.get('bookingDetails').get('servicetype'), //need to get numerical figure
        servicePrice: register.vehicle.get('bookingDetails').get('serviceprice'),
        servicePlan: register.vehicle.get('servicePlan'),
        HybridHealthCheck: this.queryOptionsCollection('title', 'hybrid health check'),
        HybridHealthCheckCost: this.queryOptionsCollection('', 'hybrid health check'),
        GeneralDiagnosis: this.queryOptionsCollection('title', 'general diagnosis'),
        GeneralDiagnosisCost: this.queryOptionsCollection( '', 'general diagnosis'),
        VisualSafetyReport: this.queryOptionsCollection('title', 'visual safety report'),
        VisualSafetyReportCost: this.queryOptionsCollection('', 'visual safety report'),
        mot: this.queryOptionsCollection('title', 'mot'),
        motCost: window.motPrice || 0,
        title: this.$('#title').val(),
        firstname: this.$('#firstname').val(),
        surname: this.$('#surname').val(),
        email: this.$('#email').val(),
        housenameornumber: this.$('#house').val(),
        address1: this.$('#address2').val(),
        address2: '',
        town: this.$('#town').val(),
        county: this.$('#county').val(),
        postcode: this.$('#postcode').val(),
        additionalNotes: $('#add-info').val()
      });
      this.getPhoneType(this.$('#phonetype').val());
    },
    queryOptionsCollection: function(key, parameter){
      var result;
      if(key){
        register.vehicle.get('selectedOptions').find(function(model){
          if(model.get(key).toLowerCase() === parameter){
            result = 'Y';
          }
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
      var _this = this;
      this.addressFinder.query = {
        postcode: this.$('#postcode').val(),
        house: this.$('#house').val()
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
        homeTel: phoneType === 'home' ? this.$('#phone').val() : '',
        workTel: phoneType === 'office' ? this.$('#phone').val() : '',
        mobileTel: phoneType === 'mobile' ? this.$('#phone').val() : ''
      });
    },
    confirmationPage: function(){
      // if(this.$('#customer-details-form').valid()){
      //   this.buildData();
      // }
      this.buildData();

      this.confirmSummary.render();

      // $('.step-six').addClass('current-step');

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