define(['jquery', 'backbone', 'register'], function($, Backbone, register) {
  var serviceDetails = Backbone.Model.extend({
    url: '/tgb_osb/service_details.jsonp',
    relations: [],
    parse: function(response) {
      var data = response[0];
      // service_lookup([{"error":"no data found to match the input data supplied"}]);
      if (data.hasOwnProperty('error')) {
        return 'commercial';
      }

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
      var _this = this, params, tgbEnv;
      if (method === 'read') {
        // tgbEnv = window.location.hostname !== 'uat.toyotabeta.co.uk' && window.location.hostname !== 'localhost' ? '//www.toyota.co.uk' : '//uat.toyotabeta.co.uk';

        params = _.extend({
          type: 'GET',
          cache: false,
          dataType: 'jsonp',
          url: register.tgbEnvironment + _this.url,
          jsonpCallback: 'service_lookup',
          data: _this.query,
          error: function(a, b, c) {
            window.console && console.error(a, b, c);
          }
        }, options);

        return $.ajax(params);
      }
    },
    bookingOptions: function(options) {
      var availableOptions = [];
      _.each(options, function(ele, idx) {
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
