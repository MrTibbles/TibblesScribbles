define(['jquery', 'backbone', 'register', 'models/fixed-price-model'], function($, Backbone, register, fixedPrice) {
  var fixedPrices = Backbone.Model.extend({
    url: '../rest/fixedpricerepairs.json',
    model: fixedPrice,
    parse: function(response) {
      var repairs = [];

      _.each(response, function(ele, idx){
        var fixedRepair = {
          title: ele.Repair,
          cleanRepair: ele.Repair.replace(/ /g, '-').toLowerCase(),
          price: ele.RepairCost          
        };
        return repairs.push(new fixedPrice(fixedRepair));
      });
      // return repairs;
      return register.vehicle.set('fixedPrices',repairs)
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
  return fixedPrices;
});
