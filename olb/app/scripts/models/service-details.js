define(['jquery', 'backbone', 'register'], function($, Backbone, register) {
  var serviceDetails = Backbone.Model.extend({
    url: '//www.toyota.co.uk/tgb_osb/service_details.jsonp',
    relations: [],
    parse: function(response) {
      var data = response[0];
      
      register.vehicle.get('bookingDetails').set({
        age: data.age,
        katashiki: data.katashiki,
        mileage: data.mileage,
        serviceprice: data.serviceprice,
        servicetype: data.servicetype,
        serviceId: data.menunumber,
        options: this.bookingOptions(data.options)
      });
      return register.vehicle;
    },    
    sync: function(method, model, options) {
      var _this = this;
      if(method === 'read'){
        var params = _.extend({
          type: 'GET',
          cache: false,
          dataType: "jsonp",      
          url: _this.url,
          jsonpCallback: 'service_lookup',
          data: _this.query,
          error: function(a,b,c){
            window.console && console.error(a,b,c);
          }
        }, options);

        return $.ajax(params);
      }
    },
    bookingOptions: function(options){
      var availableOptions = [];
      _.each(options, function(ele, idx){
        var bookingOption = {
          description: ele.description,
          price: ele.price
        };
        return availableOptions.push(bookingOption);
      });
      return availableOptions;
    }
  });
  return serviceDetails;
});
