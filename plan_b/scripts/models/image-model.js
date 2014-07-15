define(['jquery', 'underscore', 'backbone'], function($, _, Backbone) {
  var ext = Backbone.Model.extend({
    defaults: {
      main_src: '/images/toyota_logo.gif',
      thumb_src: '/images/toyota_logo.gif',
      desc: 'awesome cars',
      title: 'Toyota UK',
      active: false,
      model_ID: 0
    }
  });
  return ext;
});