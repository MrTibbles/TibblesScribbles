define(['backbone', 'register'], function(Backbone, register) {var bookingSummary = Backbone.View.extend({
    el: $('#map-wrapper'),
    template: _.template(
      $('#dealer-tpl').html()
    ),
    initialize: function() {
      this.renderMapMarker();
    },
    render: function() {
      this.$('#local-dealers').append(this.template(this.model.toJSON()));
    },
    renderMapMarker: function() {
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
    triggerMarker: function(marker) {
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
        _this.$('li#' + _this.marker.centerID).addClass('selected');

        _this.setDealerDestination();
        // $('.proceed').removeClass('disabled');
        register.bookingSummaryView.checkBooking();
        // if(Drupal.analyticsCookies() && typeof _gaq == 'function') {
        //   _gaq.push(['_trackEvent', 'Find a dealer', 'More details and directions', dealer_name]);
        // }
      });
    },
    queryOptionsCollection: function(key, parameter) {
      var result;
      if (key) {
        register.vehicle.get('selectedOptions').find(function(model) {
          if (model.get(key).toLowerCase() === parameter) {
            result = 'Y';
          }
        });
      } else {
        register.vehicle.get('selectedOptions').find(function(model) {
          if (model.get('title').toLowerCase() === parameter) {
            result = model.get('price');
          }
        });
      }
      return result;
    },
    getSelectedRepairs: function() {
      var repairs = [];
      register.vehicle.get('selectedRepairs').each(function(ele) {
        var repair = {
          Repair: ele.get('title'),
          RepairCost: ele.get('price')
        };
        return repairs.push(repair);
      });
      return repairs;
    },
    setDealerDestination: function(dealerUrl) {
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
        serviceObj: register.vehicle.get('bookingDetails').attributes,
        servicePlan: register.vehicle.get('servicePlan'),
        hybridHealthCheck: this.queryOptionsCollection('title', 'hybrid health check'),
        hybridHealthCheckCost: this.queryOptionsCollection('', 'hybrid health check'),
        generalDiagnosis: this.queryOptionsCollection('title', 'general diagnosis'),
        generalDiagnosisCost: this.queryOptionsCollection('', 'general diagnosis'),
        visualSafetyReport: this.queryOptionsCollection('title', 'visual safety report'),
        visualSafetyReportCost: this.queryOptionsCollection('', 'visual safety report'),
        mot: this.queryOptionsCollection('title', 'mot'),
        selectedRepairs: this.getSelectedRepairs(),
        dealerId: this.marker.centerID,
        dealerName: this.marker.title
      });

      formData.get('hybridHealthCheck') || formData.set('hybridHealthCheck', 'N');

      formData.get('generalDiagnosis') || formData.set('generalDiagnosis', 'N');

      formData.get('visualSafetyReport') || formData.set('visualSafetyReport', 'N');

      formData.get('visualSafetyReport') || formData.set('visualSafetyReport', 'N');

      formData.get('mot') || formData.set('mot', 'N');

      // formData.get('serviceplan') || formData.set('MOT', 'N');

      register.vehicle.get('customer').set('dealerId', this.marker.centerID);

      var destination = dealerUrl ? dealerUrl : this.marker.centerUrl;

      $('.proceed, #step-dealer').removeClass('disabled').addClass('submit-booking');

      if(window.location.hostname === 'localhost'){
        //local dev
        $('#olb-form').attr('action', 'http://pinkstones.toyota.co.uk/owners/service-booking/view/#/your-dealer');
      }else{
        //TCW destination
        $('#olb-form').attr('action', destination + '/owners/service-booking/view/#/your-dealer');
      }

      return register.formData;
    }
  });
  return bookingSummary;
});
