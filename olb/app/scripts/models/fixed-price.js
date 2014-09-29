define(['jquery', 'backbone', 'register'], function($, Backbone, register) {
  var serviceDetails = Backbone.Model.extend({
    url: '../rest/fixedpricerepairs.json',
    parse: function(response) {
      var repairs = [];
      
      _.each(response, function(ele, idx){
        var fixedRepair = {
          title: ele.Repair,
          price: ele.RepairCost
        };
        return repairs.push(fixedRepair);
      });

      register.vehicle.set('fixedPrices', repairs);
      return register.vehicle;
    },    
    sync: function(method, model, options) {
      var _this = this;
      if(method === 'read'){
        var params = _.extend({
          type: 'GET',
          cache: false,
          dataType: "json",      
          url: _this.url,
          jsonpCallback: 'fixed_prices',
          data: _this.query,
          error: function(a,b,c){
            window.console && console.error(a,b,c);
          }
        }, options);

        return $.ajax(params);
      }
    }
  });
  return serviceDetails;
});
