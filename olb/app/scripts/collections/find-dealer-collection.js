define(['jquery', 'backbone', 'register', 'models/dealer-model'], function($, Backbone, register, dealerModel) {
  var dealerList = Backbone.Model.extend({
    url: '//www.toyota.co.uk/services/dealer-lookup-service.jsonp',
    model: dealerModel,
    parse: function(response) {
      if(response.length === 0){
        return window.console && console.info('NONE')
      }
      var localDealers = [],
        _this = this;

      _.each(response, function(ele, idx){
        var dealer = {
          title: ele.node_title,
          nid: ele.nid,
          centerId: ele.centerID.value,
          proximity: _this.getDistance(ele.views_php_23),
          centerType: ele.centerType,
          address1: ele.centerAddressLine1,
          address2: ele.centerAddressLine2,
          address3: ele.centerAddressLine3,
          centerFax: ele.centerFax,
          centerPostcode: ele.centerPostcode,
          centerTel: ele.centerTel,
          centerTown: ele.centerTown,
          centerCounty: ele.centerCounty,
          centerUrl: ele.centerUrl,
          centerOpen1: ele.centerOpen1,
          centerOpen2: ele.centerOpen2,
          centerOpen3: ele.centerOpen3,
          centerMX: ele.centerMX,
          centerMY: ele.centerMY,
          ordinates: ele.Value
        };
        localDealers.push(new dealerModel(dealer));
      });
      // return localDealers;
      return register.dealerList = localDealers;
    },    
    sync: function(method, model, options) {
      var _this = this;
      if(method === 'read'){
        var params = _.extend({
          type: 'GET',
          cache: false,
          dataType: "jsonp",      
          url: _this.url + '?geo_data[location]=' + _this.query.geoPost + '&center_type='+ _this.query.center_type + '&geo_data[value]=' +_this.query.geoValue,
          jsonpCallback: 'dealer_lookup',
          // data: _this.query,
          error: function(a,b,c){
            window.console && console.error(a,b,c);
          }
        }, options);

        return $.ajax(params);
      }
    },
    getCenterId: function(centerId){
      return centerId.value;
    },  
    getDistance: function(miles){
      return Math.floor(miles * 100) / 100;
    }
  });
  return dealerList;
});
