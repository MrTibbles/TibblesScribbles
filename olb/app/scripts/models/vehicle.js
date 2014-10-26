define(['jquery', 'backbone', 'register', 'models/booking-model', 'collections/fixed-price-collection', 'models/customer-model'], function($, Backbone, register, bookingModel, fixedPrices, customerModel) {
  var vehicle = Backbone.Model.extend({
    url: '//rsc.toyota.co.uk/recall_lookup_fps.php',
    defaults:{
      bookingDetails: new bookingModel(),
      fixedPrices: new fixedPrices(), 
      selected: new Backbone.Collection(),
      selectedOptions: new Backbone.Collection(),
      selectedRepairs: new Backbone.Collection(),
      customer: new customerModel()
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
          servicePlan: 'N'
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
    },
    getTotalPrice: function(){
      window.console && console.info(register.vehicle);      
      var total = Number(0);

      register.vehicle.get('selected').each(function(ele){
        var selectedPrice = ele.get('price').toUpperCase() === 'FREE' ? Number(0) : Number(ele.get('price').replace('£',''));
        register.vehicle.set('totalBookingPrice', total += selectedPrice);
      });
      var optionCost = register.vehicle.get('customer').get('optionCost') === 'FREE' ? Number(0) : Number(register.vehicle.get('customer').get('optionCost'));
      optionCost = typeof optionCost == 'number' ? optionCost : optionCost.replace('£','');
      
      total += optionCost

      if(register.vehicle.get('bookingDetails').get('serviceprice')){
        total += Number(register.vehicle.get('bookingDetails').get('serviceprice'));
      }

      register.vehicle.set('totalBookingPrice', total);
      return window.console && console.info(register.vehicle.get('totalBookingPrice'))
    }
  });
  return vehicle;
});