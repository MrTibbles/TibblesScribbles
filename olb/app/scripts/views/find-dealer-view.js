define(['backbone', 'register', 'infoBox', 'collections/find-dealer-collection', 'views/select-dealer-view'], function(Backbone, register, infoBox, dealerCollection, dealerView) {
  var yourCar = Backbone.View.extend({
    el: $('#find-dealer-step'),
    events: {
      'click #find-postcode': 'dealerLookUp',
      'click .dealer-item': 'selectDealer',
      'click #step-dealer': 'submitBooking'
    },
    initialize: function() {},
    render: function(){
      this.$el.siblings('section').removeClass('current-step');
      this.$el.addClass('current-step');

      this.updateProgressBar();

      //render the google map for dealer lookup
      this.googleMapsIni();

      this.dealerCollection = new dealerCollection;

      this.$('#tgb-find-dealer-form').validate({
        errorClass: 'error',
        focusCleanup: true,
        onkeyup: false,
        rules: {
          dealer: {
            required: true
          }
        }
      });
      $('#continue').hide();

      window.console && console.info(register.vehicle.toJSON())
    },
    updateProgressBar: function(){
      $('#progess-bar .first').addClass('completed');
    },
    validePostCode: function(val){
      // generic validation function for find - dealer typr forms
      var postcodeRegEx = /[A-Z]{1,2}[0-9]{1,2}[A-Z]{0,1} ?[0-9][A-Z]{2}/i;
      return postcodeRegEx.test(val);
    },
    googleMapsIni: function(){
      var mapOpts = {
        zoom: 5,
        center: new google.maps.LatLng(54.5, -3), //uk centre
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        mapTypeControl: false,
        streetViewControl: false,
        zoomControl: false,
        panControl: false
      };

      register.map = new google.maps.Map(document.getElementById('gmap_canvas'), mapOpts);      

      register.map.markerimage = new google.maps.MarkerImage('../images/map-marker.png',
        new google.maps.Size(46, 49),
        new google.maps.Point(0, 0),
        new google.maps.Point(23, 49)
      );

      register.map.markershadow = new google.maps.MarkerImage("../images/map-shadow.png",
        new google.maps.Size(60, 49),
        new google.maps.Point(0, 0),
        new google.maps.Point(20, 49)
      );

      register.map.markers = [];    

      register.infobox = new InfoBox({
        content: " ",
        maxWidth: 265,
        closeBoxURL: " ",
        pixelOffset: new google.maps.Size(-120, -180),
        infoBoxClearance: new google.maps.Size(30, 30),
        boxClass: "mapinfobox",
        enableEventPropagation: true
      });

      var updateLatlng = new google.maps.LatLng(54.5, -3);
      register.map.setCenter(updateLatlng);

      // register.map.bounds = new google.maps.LatLngBounds();
    },
    dealerLookUp: function(e){
      register.loader.showLoader(this.$el[0]);
      var _this = this;

      if($('#tgb-find-dealer-form').valid()) {
        var postCode = this.$('#postcode-input').val().toUpperCase();

        //Not sure why this gets undefined, is in current OSB scripts, finddealer.js - line 162 
        center_type = '';

        if(this.validePostCode(postCode)){
          this.dealerCollection.query = {
            geoPost: postCode,
            center_type: center_type,
            geoValue: 25
          };

          this.dealerCollection.fetch({
            success: function(){
              register.map.bounds = new google.maps.LatLngBounds();

              register.loader.hideLoader();          

              _.each(register.dealerList, function(ele){
                var dealerItem = new dealerView({
                  model: ele
                });
                dealerItem.render();
              });
            }
          });

          register.map.fitBounds(register.map.bounds);
          // var listener = google.maps.event.addListener(register.map, "idle", function() {
          //   window.console && console.info('idle');
          //   if(register.map.getZoom() > 16){
          //     register.map.setZoom(10);
          //   }
          //   google.maps.event.removeListener(listener);
          // });

        }else{
          register.loader.hideLoader();
          window.console && console.error('postcode incorrect')          
        }
      }
    },
    selectDealer: function(e){
      window.console && console.info($(e.currentTarget))
    },
    submitBooking: function(){
      this.formStrung = register.formData.toJSON();
      this.formStrung = JSON.stringify(this.formStrung);
      window.console && console.info('form: ',this.formStrung);

      // $('#olb-form input').val(this.formStrung);
      window.console && console.info($('#olb-form input')[0].value)      
      $('#olb-form input').attr('value', this.formStrung);
      
      $('#olb-form').submit()
    }
  });
  return yourCar;
});