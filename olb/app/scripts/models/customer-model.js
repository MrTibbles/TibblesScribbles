define(['jquery', 'backbone', 'register', 'models/booking-model', 'collections/fixed-price-collection', 'models/customer-model'], function($, Backbone, register, bookingModel, fixedPrices, customerModel) {
  var customer = Backbone.Model.extend({
    url: '/sites/all/themes/toyota/_shared/php/forms-proxy.php?requestType=book-service',
    confirmBooking: function(method, model, options) {
      var _this = this;
      // if(method === 'read'){
        var params = _.extend({
          type: 'POST',
          cache: false,
          dataType: "json",      
          url: _this.url,
          // jsonpCallback: 'service_booking',
          data: _this.query,
          error: function(a,b,c){
            window.console && console.error(a,b,c)
          }        
        }, options);

        return $.ajax(params);
      // }
    }
  });
  return customer;
});