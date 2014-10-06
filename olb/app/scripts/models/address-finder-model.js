define(['jquery', 'backbone', 'register'], function($, Backbone, register) {
  var serviceDetails = Backbone.Model.extend({
    url: '//www.toyota.co.uk/tgb_qas/address_lookup.jsonp',
    relations: [],
    parse: function(response) {
      var data = response[0];

      var address = {
        address1: data.address1,
        address2: data.address2,
        county: data.county,
        postcode: data.postcode,
        town: data.town
      };
      return address;
    },    
    sync: function(method, model, options) {
      var _this = this;
      if(method === 'read'){
        var params = _.extend({
          type: 'GET',
          cache: false,
          dataType: "jsonp",      
          url: _this.url,
          jsonpCallback: 'address_lookup',
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
