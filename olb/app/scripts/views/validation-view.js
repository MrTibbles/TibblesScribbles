define(['backbone', 'register'], function(Backbone, register) {
  var validationView = Backbone.View.extend({
  	el: $('#olb-wrap'),
  	options: {
      regEmptyErrorMsg: '<br class="clear error"/><p class="error">Please enter your vehicle registration or VIN</p>',
      regErrorMsg: '<br class="clear error"/><p class="error">Sorry, we couldn\'t find your car details in our database.<br/><span>Try your registration number again, or enter a VIN for a more accurate search.</span></p>',
      noMileage: '<br class="clear" /><p class="error">Please enter no more than 6 characters.</p>',
      highMileage: '<br class="clear" /><p class="error">Unfortunately, we are unable to provide a quote for your vehicle. Please contact your local Dealer who will be able to discuss your requirements.</p>' 
  	},
    showError: function(type, target){
      register.loader.hideLoader();
      $(target).parent().find('.error').remove();

      switch(type){
        case 'empty-reg': 
          return $(target).addClass('invalid').parent().append(this.options.regEmptyErrorMsg);
          break;
        case 'invalid-reg':
          return $(target).addClass('invalid').parent().append(this.options.regErrorMsg);
          break;
        case 'no-mileage':
          return $(target).addClass('invalid').parent().append(this.options.noMileage);
          break;
        case 'high-mileage':
          return $(target).addClass('invalid').parent().append(this.options.highMileage);
          break;

      };
    },
    clearError: function(target){
      $(target).removeClass('invalid').parent().find('.error').remove();
    }
  });
  return validationView;
})