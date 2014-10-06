define(['jquery', 'backbone', 'register', 'models/booking-model', 'collections/fixed-price-collection'], function($, Backbone, register, bookingModel, fixedPrices) {
  var vehicle = Backbone.Model.extend({
    url: '//rsc.toyota.co.uk/recall_lookup_fps.php',
    defaults:{
      bookingDetails: new bookingModel(),
      fixedPrices: new fixedPrices(), 
      selected: new Backbone.Collection(),
      selectedOptions: new Backbone.Collection(),
      selectedRepairs: new Backbone.Collection(),
      customer: new Backbone.Model(),
    },
    parse: function(response) {
      if(response.found > 0){
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
          ageMonth: response.ageM,
          bookingDetails: new bookingModel(),
          fixedPrices: new fixedPrices(), 
          selected: new Backbone.Collection(),
          selectedOptions: new Backbone.Collection(),
          selectedRepairs: new Backbone.Collection(),
          servicePlan: false
        };
        return vehicleModel;
      }else vehicleModel;
    },
    sync: function(method, model, options) {
      var _this = this;
      if(method === 'read'){
        var params = _.extend({
          type: 'GET',
          cache: false,
          dataType: "jsonp",      
          url: _this.url,
          jsonpCallback: 'vehicle_lookup',
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