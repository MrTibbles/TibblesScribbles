define(['jquery', 'backbone',], function($, Backbone) {
  var vehicle = Backbone.Model.extend({
    url: 'https://rsc.toyota.co.uk/recall_lookup_fps.php',
    parse: function(response) {
      window.console && console.info(response);
    },
    sync: function(method, model, options) {
      var _this = this;
      var params = _.extend({
        type: 'GET',
        dataType: "json",
        url: _this.url,
        data: {
          'ident': 'MM06ZPC'
        },
        error: function(a,b,c){
          window.console && console.error(a,b,c)
        }
        // jsonpCallback: "request_vehicle",        
      }, options);

      return $.ajax(params);
    }
  });
  return vehicle;
});
