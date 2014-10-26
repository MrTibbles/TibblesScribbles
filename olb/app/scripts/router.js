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
    if (window.location.hostname === 'localhost') window.osbInitValues = {
      ident: 'MM06ZPC',
      model: 'Yaris NG T2',
      engine: '1.0 VVT-i',
      mileage: '123',
      years: '2006',
      age: '8',
      colour: 'Crystal Silver',
      serviceplan: '',
      katashiki: 'KSP90',
      ageM: '100',
      // serviceObj: {},
      serviceObj: {
        "age": "8",
        "katashiki": "KSP90",
        "mileage": "80000",
        "serviceprice": "255",
        "servicetype": "Full+",
        "serviceId": "77991388",
        "options": [{
          "description": "Brake Fluid - (change every 2 years)",
          "price": "39"
        }]
      },
      HybridHealthCheck: 'N',
      HybridHealthCheckCost: '',
      GeneralDiagnosis: 'N',
      GeneralDiagnosisCost: '',
      VisualSafetyReport: 'Y',
      VisualSafetyReportCost: 'free',
      mot: 'Y',
      // repairs: [],
      repairs: [{
        "Repair": "Front Brake Pads and Disks",
        "RepairCost": "210"
      }, {
        "Repair": "Rear Brake Pads and Disks",
        "RepairCost": "210"
      }, {
        "Repair": "Battery for Petrol Models",
        "RepairCost": "75"
      }, {
        "Repair": "Front Wiper",
        "RepairCost": "21"
      }]
    };

    BaseView.render('your-dealer');
  });

  olbRouter.on('route:hsd_route', function(){
    BaseView.render('your-dealer');
  });

  //will need to tweak start point for custom root config
  Backbone.history.start();
});
