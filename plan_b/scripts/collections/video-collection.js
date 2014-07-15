define(['jquery', 'backbone', 'models/video-model', 'app_config'], function($, Backbone, vid, app_config) {
  var vids = Backbone.Collection.extend({
    model: vid,
    url: 'http://www.toyota.co.uk/services/gallery-video.jsonp?rc=',
    sync: function(method, model, options) {
      var _this = this;
      var params = _.extend({
        type: 'GET',
        dataType: 'jsonp',
        url: _this.url + app_config.range_code,
        jsonpCallback: 'videos',
        processData: true
      }, options);

      return $.ajax(params);
    },
    parse: function(response) {
      var vid_arr = [];
      $.each(response, function(idx, ele) {
        var vid_item = {
          video_ID: ele.youtube.video_id,
          thumb_src: ele.thumbnail,
          title: ele.title,
          desc: ele.description
        };
        vid_arr.push(new vid(vid_item));
      });      
      return vid_arr;
    },
    set_active_vid: function(vid) {
      this.active = {
        video_ID: vid.get('video_ID'),
        thumb_src: vid.get('thumb_src'),
        title: vid.get('title'),
        desc: vid.get('desc')
      };
      vid.set('active', true);
    },
    reset_active: function() {
      this.active = null;
    }
  });
  return vids;
})
