define(['jquery', 'backbone', 'models/video-model'], function($, Backbone, vid) {
  var vids = Backbone.Collection.extend({
    model: vid,
    url: 'http://127.0.0.1/services/gallery-video-service.jsonp?range_code=',
    parse: function(response) {
      var vid_arr = [];
      $.each(response, function(idx, ele) {
        if (!ele.Youtube.length || !ele.Youtube.video_id.length) {
          return;
        };
        var vid_item = {
          video_ID: ele.Youtube.video_id,
          main_src: ele.Thumbnails,
          thumb_src: ele.Thumbnails,          
          title: ele.node_title,
          desc: ele.Description,
          thumb_size: !ele.Thumb_size_vid.length ? 'default' : ele.Thumb_size_vid.replace(/ /g, '-')         
        };
        vid_arr.push(new vid(vid_item));
      });      
      return vid_arr;
    },
    sync: function(method, model, options) {
      var _this = this;
      var params = _.extend({
        type: 'GET',
        dataType: 'jsonp',
        url: _this.url + window.Drupal.settings.gallery_widget.RC,
        jsonpCallback: 'videos',
        processData: true
      }, options);

      return $.ajax(params);
    },    
    set_active_vid: function(vid) {
      vid.set('active', true);
    },
    reset_active: function() {
      this.active = null;
    }
  });
  return vids;
})
