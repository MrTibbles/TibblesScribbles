define(['jquery', 'backbone'], function($, Backbone) {
  var services = Backbone.Model.extend({
    url: 'http://www.toyota.co.uk/tgb_osb/service_details.json',
    parse: function(response) {
      window.console && console.info(response)
    },
    sync: function(method, model, options) {
      var _this = this;
      if(method === 'read'){
        var params = _.extend({
          type: 'GET',
          cache: false,
          dataType: "jsonp",      
          url: _this.url,
          data: options.data,
          error: function(a,b,c){
            window.console && console.error(a,b,c)
          }        
        }, options);

        return $.ajax(params);
      }
    }
  });
  return services;
});
