// Filename: router.js
define([
  'jquery',
  'underscore',
  'backbone',
  'app'
], function($, _, Backbone, Base) {
  var AppRouter = Backbone.Router.extend({
    routes: {     
      '': 'base_route',
      'exterior': 'exterior_route',
      'interior': 'interior_route',
      'video': 'video_route'      
    }
  });

  var app_router = new AppRouter;

  app_router.on('route:base_route', function(actions) {    
    var base_view = new Base();
    base_view.render();
  });

  app_router.on('route:exterior_route', function(actions){
    var exteriors_view = new Base();
    exteriors_view.render('exterior');
  });

  app_router.on('route:interior_route', function(actions){
    var interiors_view = new Base();
    interiors_view.render('interior');
  });

  app_router.on('route:video_route', function(actions){
    var videos_view = new Base();
    videos_view.render('video');
  });
  //will need to tweak start point for custom root config
  Backbone.history.start();
});
