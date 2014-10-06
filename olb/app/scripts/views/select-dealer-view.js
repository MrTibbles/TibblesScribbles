define(['backbone', 'register'], function(Backbone, register) {
  var bookingSummary = Backbone.View.extend({
    el: $('#map-wrapper'),
    template: _.template(
      $('#dealer-tpl').html()
    ),
    initialize: function() {
      this.renderMapMarker();
    },
    render: function(){
    	this.$('#local-dealers').append(this.template(this.model.toJSON()));
    },
    renderMapMarker: function(){
      this.marker = new google.maps.Marker({
        position: new google.maps.LatLng(this.model.get('centerMX'), this.model.get('centerMY')),
        map: register.map,
        title: this.model.get('node_title'),
        centerID: this.model.get('centerId'),
        icon: register.map.markerimage,
        shadow: register.map.markershadow,
        centerUrl: this.model.get('centerUrl')
      });
      register.map.markers.push(this.marker);
      
      // register.map.bounds = new google.maps.LatLngBounds();

      register.map.bounds.extend(this.marker.position);

      this.triggerMarker(this.marker);
    },
    triggerMarker: function(marker){
      var _this = this;
      google.maps.event.addListener(this.marker, 'click', function() {

        markerLatLng = _this.marker.getPosition();
        obj = $('#' + _this.marker.centerID).clone();
        // obj.find('.grid_6').removeClass('grid_6');
        // obj.find('.grid_4').removeClass('grid_4');
        register.infobox.setContent(obj.html());
        register.infobox.open(register.map, this);
        dealer_name = _this.marker.title; //$(obj).find('p.title').html();

        _this.$('#local-dealers li').removeClass('selected');
        _this.$('li#'+_this.marker.centerID).addClass('selected');

        _this.buildBookingForm();
        $('.proceed').removeClass('disabled');

        // if(Drupal.analyticsCookies() && typeof _gaq == 'function') {
        //   _gaq.push(['_trackEvent', 'Find a dealer', 'More details and directions', dealer_name]);
        // }
      });
    },
    queryOptionsCollection: function(key, parameter){
      var result;
      if(key){
        register.vehicle.get('selectedOptions').find(function(model){
          if(model.get(key).toLowerCase() === parameter){
            result = 'Y';
          }
        });
      }else{
        register.vehicle.get('selectedOptions').find(function(model){
          if(model.get('title').toLowerCase() === parameter){
            result = model.get('price');
          }
        });
      }
      return result;
    },
    getSelectedRepairs: function(){
      var repairs = [];
      register.vehicle.get('selectedRepairs').each(function(ele){
        var repair = {
          Repair: ele.get('title'),
          RepairCost: ele.get('price') 
        };
        return repairs.push(repair);
      });
      return repairs;
    },
    buildBookingForm: function(){
      var formData = register.formData = new Backbone.Model({
        years: register.vehicle.get('prodDate'),
        age: register.vehicle.get('age'),
        ageM: register.vehicle.get('ageMonth'),
        katashiki: register.vehicle.get('katashiki'),
        ident: register.vehicle.get('requested'),
        model: register.vehicle.get('model'),
        engine: register.vehicle.get('engine'),
        colour: register.vehicle.get('colour'),
        mileage: register.vehicle.get('approxMiles'),
        serviceplan: register.vehicle.get('servicePlan'),
        HybridHealthCheck: this.queryOptionsCollection('title', 'hybrid health check'),
        HybridHealthCheckCost: this.queryOptionsCollection('', 'hybrid health check'),
        GeneralDiagnosis: this.queryOptionsCollection('title', 'general diagnosis'),
        GeneralDiagnosisCost: this.queryOptionsCollection( '', 'general diagnosis'),
        VisualSafetyReport: this.queryOptionsCollection('title', 'visual safety report'),
        VisualSafetyReportCost: this.queryOptionsCollection('', 'visual safety report'),
        MOT: this.queryOptionsCollection('title', 'mot'),
        selectedRepairs: this.getSelectedRepairs(),
        dealerId: this.marker.centerID,
        dealerName: this.marker.title
      });
      
      if(!formData.get('HybridHealthCheck')){
        formData.set('HybridHealthCheck','N');
      }
      if(!formData.get('GeneralDiagnosis')){
        formData.set('GeneralDiagnosis','N');
      }
      if(!formData.get('VisualSafetyReport')){
        formData.set('VisualSafetyReport','N');
      }
      if(!formData.get('VisualSafetyReport')){
        formData.set('VisualSafetyReport','N');
      }
      if(!formData.get('MOT')){
        formData.set('MOT','N');
      }
      if(!formData.get('serviceplan')){
        formData.set('MOT','N');
      }

      //TCW destination
      $('#olb-form').attr('action', this.marker.centerUrl + '/owners/service-booking/view/#/your-dealer');

      return register.formData;
    }
  });
  return bookingSummary;
});