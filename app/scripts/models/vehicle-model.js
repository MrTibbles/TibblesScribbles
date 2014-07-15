define(['jquery', 'backbone',], function($, Backbone) {
  var cars = Backbone.Model.extend({
    url: '/vehicle-data/',
    parse: function(response) {
      window.console && console.info(response);
    },
    sync: function(method, model, options) {
      window.console && console.info(Drupal);
      var _this = this;
      var params = _.extend({
        type: 'GET',
        dataType: "json",
        error: function(a,b,c){
          window.console && console.error(a,b,c)
        },
        // jsonpCallback: "request_vehicle",
        url: _this.url + 'AY5' + '.json'
      }, options);

      return $.ajax(params);
    }
  });
  return cars;
});
