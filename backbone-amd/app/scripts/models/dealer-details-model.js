define(['jquery', 'backbone'], function($, Backbone) {
  var dealer = Backbone.Model.extend({
    url: '//global.toyota.co.uk/service-details/',
    parse: function(response) {
      if (response.found > 0) {
        var dealerDetails = {
          motCost: response.mot_cost,
          myToyotaView: response.mytoyota_view,
          courtseyCarCost: response.courtesy_car_cost,
          collectDeliverCost: response.collect_deliver_cost,
          collectLimit: response.collect_deliver_mileage_limit
          workshopAvailibility: this.getAvailableWorkshopDays(response)
        };
        return dealerDetails;
      }else dealerDetails;
    },
    sync: function(method, model, options) {
      var _this = this, dealerId = options.data.centerId;

      if (!dealerId.match(/^0/)) {
        dealerId = dealerId.length <= 4 ? '0' + dealerId : dealerId;
      }

      if (method === 'read') {
        var params = _.extend({
          type: 'GET',
          cache: false,
          dataType: "jsonp",
          url: _this.url + dealerId,
          jsonpCallback: 'processData',
          error: function(a, b, c) {
            window.console && console.error(a, b, c)
          }
        }, options);

        return $.ajax(params);
      }
    }
  });
  return dealer;
});
