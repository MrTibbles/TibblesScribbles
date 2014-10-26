define(['backbone', 'register', 'infoBox', 'collections/find-dealer-collection', 'views/select-dealer-view'], function(Backbone, register, infoBox, dealerCollection, dealerView) {
  var yourCar = Backbone.View.extend({
    el: $('#find-dealer-step'),
    events: {
      'click #find-postcode': 'dealerLookUp',
      'click .dealer-item': 'selectDealer'
      // 'click .submit': 'submitToDealer'
    },
    initialize: function() {},
    render: function(){
      this.$el.siblings('section').removeClass('current-step');
      this.$el.addClass('current-step');

      this.updateProgressBar();

      //render the google map for dealer lookup
      this.googleMapsIni();

      this.dealerCollection = new dealerCollection;

      //<button id="step-dealer" class="proceed disabled" data-step="three">choose dealer</button>
      $('#continue').attr({
        'data-step': 'three',
        'class': 'proceed disabled'
      }).html('choose dealer');
    },
    updateProgressBar: function(){
      $('#progess-bar .first').addClass('completed');
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
      if(!this.$('#postcode-input').val()){
        return register.validationView.showError('empty-postcode', '#postcode-input');
      }
      var _this = this;
      var postCode = this.$('#postcode-input').val().toUpperCase();
      //Not sure why this gets undefined, is in current OSB scripts, finddealer.js - line 162 
      center_type = '';

      // if(this.validePostCode(postCode)){
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
              _this.dealerItem = new dealerView({
                model: ele
              });
              _this.dealerItem.render();
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
      // }
    },
    selectDealer: function(e){
      this.$('.dealer-item').removeClass('selected');
      $(e.currentTarget).addClass('selected');

      this.dealerItem.setDealerDestination($(e.currentTarget).data('center'));

      $('.proceed, #step-dealer').removeClass('disabled').addClass('submit-booking');

      // if(window.location.hostname === 'localhost'){
      //   //local dev
      //   $('#olb-form').attr('action', 'http://pinkstones.toyota.co.uk/owners/service-booking/view/#/your-dealer');
      // }else{
      //   //TCW destination
      //   $('#olb-form').attr('action', $(e.currentTarget).data('center') + '/owners/service-booking/view/#/your-dealer');
      // }
    }
  });
  return yourCar;
});