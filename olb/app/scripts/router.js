define(['jquery', 'backbone', 'olb-app'], function($, Backbone, Olb) {
  var AppRouter = Backbone.Router.extend({
    // root: '/service-and-maintenance/car-servicing/',
    routes: {
      '': 'base_route',
      'your-dealer': 'service_booking_route'
    }
  });

  var olbRouter = new AppRouter();

  olbRouter.on('route:base_route', function() {
    var BaseView = new Olb();
    BaseView.render('your-car');
  });

  olbRouter.on('route:service_booking_route', function() {
    var BaseView = new Olb();

    //create window.osbInitValues for testing purposes
    //real one gets created via php function in /tcw/module/service_booking.inc    
    if(window.location.hostname === 'localhost'){
      window.osbInitValues = {
        ident: 'MM06ZPC',
        model: 'Yaris NG T2',
        engine: '1.0 VVT-i',
        mileage: '123',
        years: '2006',
        age: '8',
        colour: 'Crystal Silver',
        serviceplan: '1',
        katashiki: 'KSP90',
        ageM: '99',
        HybridHealthCheck: 'N',
        HybridHealthCheckCost: '',
        GeneralDiagnosis: 'Y',
        GeneralDiagnosisCost: 'free',
        VisualSafetyReport: 'Y',
        VisualSafetyReportCost: 'free',
        MOT: 'N',
        repairs: [{
          "Repair": "Front Brake Pads",
          "RepairCost": "95"
        }, {
          "Repair": "Battery for Petrol Models",
          "RepairCost": "75"
        }, {
          "Repair": "Rear Brake Pads and Disks",
          "RepairCost": "210"
        }]
      };
    }

    BaseView.render('your-dealer');
  });

  //will need to tweak start point for custom root config
  Backbone.history.start();
});
