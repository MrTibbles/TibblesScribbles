// Filename: router.js
define([
  'jquery',
  'underscore',
  'backbone',
  'views/base',
  // 'views/spin',
  'views/exterior-view',
  // 'views/interior',
  // 'views/video'
], function($, _, Backbone, _base, exterior) {
  console.info('router srt')
  var gall_route = Backbone.Router.extend({
    routes: {
      // Define some URL routes
      // 'spin': 'load_spin',
      'exterior': 'load_exterior',
      // 'interior': 'load_interior',      
      // 'video': 'load_video',
      '*actions': 'base_root'
    }
  });  
  var initialize = function(rc){
    console.info('router',rc)
    var app_router = new gall_route;
    
    app_router.on('route:load_spin', function(){  
        console.info('spin');
        // Call render on the module we loaded in via the dependency array
        var spin_view = new spin();
        spin_view.render();
    });

    app_router.on('route:load_exterior', function () {  
        console.info('exterior route');
        var exterior_view = new exterior();
        exterior_view.render();
    });

    app_router.on('route:load_interior', function () {  
        console.info('interior route');
        var interior_view = new interior();
        interior_view.render();
    });

    app_router.on('route:load_video', function () {  
        console.info('video route');
        var video_view = new video();
        video_view.render();
    });

    app_router.on('route:base_root', function (actions) {     
       // We have no matching route, lets display the home page 
        console.info('base route');
        var base_view = new _base();
        base_view.render();
    });
    Backbone.history.start();
  };
  return { 
    initialize: initialize
  };
});