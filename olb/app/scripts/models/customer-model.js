define(['jquery', 'backbone', 'register', 'views/thanks-confirmation-view'], function($, Backbone, register, thanksConfirm) {
  var customer = Backbone.Model.extend({
    url: '/sites/all/themes/toyota/_shared/php/forms-proxy.php?requestType=book-service',
    defaults: {
      optionPickDrop: 'Y'
    },
    confirmBooking: function(method, model, options) {
      var _this = this;
      var params = _.extend({
        type: 'POST',
        cache: false,
        dataType: "json",      
        url: _this.url,
        // jsonpCallback: 'service_booking',
        data: _this.query,
        success: function(response){
          _this.parse(response);
        },
        error: function(a,b,c){
          window.console && console.error(a,b,c)
        }        
      }, options);

      return $.ajax(params);
    },
    parse: function(response){
      window.console && console.info(response);
      if(response.length){
        this.thanksConfirm = new thanksConfirm();
        this.thanksConfirm.render();
      }
    }
  });
  return customer;
});