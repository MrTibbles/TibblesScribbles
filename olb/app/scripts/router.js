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
      "years": "2011",
      "age": "3",
      "ageM": "37",
      "katashiki": "ZWE150",
      "ident": "FY61XWW",
      "model": "Auris HSD T Spirit",
      "engine": "1,8 VVT-i Hybrid",
      "colour": "Pure/Chamonix White",
      "mileage": "123",
      // "serviceObj": {
      //   "age": "3",
      //   "katashiki": "ZWE150",
      //   "mileage": "30000",
      //   "serviceprice": "149",
      //   "servicetype": "Intermediate",
      //   "serviceId": "43211333",
      //   "options": []
      // },
      "serviceplan": "Y",
      "HybridHealthCheck": "Y",
      "HybridHealthCheckCost": "free",
      "GeneralDiagnosis": "Y",
      "GeneralDiagnosisCost": "free",
      "VisualSafetyReport": "N",
      "mot": "N",
      "repairs": [{
        "Repair": "Front Brake Pads and Disks",
        "RepairCost": "240"
      }, {
        "Repair": "Rear Brake Pads and Disks",
        "RepairCost": "220"
      }],
      "dealerId": "6872"
    };

    BaseView.render('your-dealer');
  });

  //will need to tweak start point for custom root config
  Backbone.history.start();
});
