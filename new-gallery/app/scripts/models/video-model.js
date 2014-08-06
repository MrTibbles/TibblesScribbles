define(['jquery', 'backbone'], function($, Backbone) {
  var video = Backbone.Model.extend({
    defaults: {
      video_ID: null,
      thumb_src: '/images/toyota_logo.gif',
      desc: 'awesome cars',
      title: 'Toyota UK',
      active: false,
      model_ID: 0
    }
  });
  return video;
});