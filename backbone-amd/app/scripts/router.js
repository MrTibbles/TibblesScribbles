define(['jquery', 'backbone', 'olb-app'], function($, Backbone, Olb) {
  var AppRouter = Backbone.Router.extend({
    // root: '/service-and-maintenance/car-servicing/',
    routes: {
      '': 'base_route',
      'your-dealer': 'tcw_booking_route',
      'servicing': 'servicing_booking_route',
      'hsd': 'hybrid_booking_route',
      'repairs': 'repair_booking_route',
      'mot': 'mot_booking_route'
    }
  });

  var olbRouter = new AppRouter();

  olbRouter.on('route:base_route', function() {
    var BaseView = new Olb();
    BaseView.render('your-car');
  });

  olbRouter.on('route:servicing_booking_route', function() {
    var BaseView = new Olb();
    BaseView.render('servicing');
  });

  olbRouter.on('route:hybrid_booking_route', function() {
    var BaseView = new Olb();
    BaseView.render('hsd');
  });

  olbRouter.on('route:repair_booking_route', function() {
    var BaseView = new Olb();
    BaseView.render('repairs');
  });

  olbRouter.on('route:mot_booking_route', function() {
    var BaseView = new Olb();
    BaseView.render('mot');
  });  

  olbRouter.on('route:tcw_booking_route', function() {
    var BaseView = new Olb();

    window.osbInitValues && BaseView.render('your-dealer');
    !window.osbInitValues && BaseView.render('your-car');
  });

  //will need to tweak start point for custom root config
  Backbone.history.start();
});
