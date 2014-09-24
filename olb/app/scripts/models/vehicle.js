define(['jquery', 'backbone'], function($, Backbone) {
  var vehicle = Backbone.Model.extend({
    url: 'https://rsc.toyota.co.uk/recall_lookup_fps.php',
    parse: function(response) {
      if(response.found){
        var vehicleModel = {
          requested: this.query,
          model: response.model,
          transmission: response.transmission,
          engine: response.engine,
          katashiki: response.katashiki,
          katashikiFull: response.katashikiFull,
          colour: response.colour,
          prodDate: response.date,
          age: response.age,
          ageMonth: response.ageM
        };
        return vehicleModel;
      }
    },
    sync: function(method, model, options) {
      var _this = this;
      if(method === 'read'){
        var params = _.extend({
          type: 'GET',
          cache: false,
          dataType: "jsonp",      
          url: _this.url,
          data: {
            'ident': _this.query
          },
          error: function(a,b,c){
            window.console && console.error(a,b,c)
          }        
        }, options);

        return $.ajax(params);
      }
    }
  });
  return vehicle;
});
