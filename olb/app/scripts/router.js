define([
  'jquery',
  'backbone',
  'olb-app'
], function($, Backbone, Olb) {  
  'use strict';

  var AppRouter = Backbone.Router.extend({    
    routes: {     
      '': 'base_route'
    }
  });

  var olbRouter = new AppRouter();

  var BaseView = new Olb();
  BaseView.render();

  olbRouter.on('route:base_route', function() {    
    var BaseView = new Olb();
    BaseView.render();
  });

  //will need to tweak start point for custom root config
  Backbone.history.start();
});
