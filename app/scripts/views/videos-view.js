define(['backbone', 'collections/video-collection', 'views/video-view','views/main-view'], function(Backbone, videos, vid_view, main_overlay) {
  var exteriors_view = Backbone.View.extend({
    el: $('#main_viewport .video'),
    collection: videos,
    events: {
      'click .vid_thumb_out': 'change_vid'
    },
    viewport: $('#overlay_bg'),
    initialize: function() {
      // this.$el.addClass('active_list');
      
      //return this.collection.on('change:active', this.display_vid, this);
    },
    render: function() {
      var _this = this,
        vids_leng = this.collection.length;

      this.$el.empty();

      this.collection.each(function(vid_img, idx) {
        _this.parse_vid(vid_img,idx);
      });

      // this.$el.css('width', vids_leng * thumb_width)
      return this;
    },
    parse_vid: function(vid,idx) {
      var vid_thumb = new vid_view({
        model: vid
      });
      // if(idx === 0){
      //   this.collection.set_active_vid(vid);
      //   this.view_port = new main_overlay({
      //     model: vid
      //   });
      //   this.viewport.append(this.view_port.render_vid().el)
      // }
      return this.$el.append(vid_thumb.render().el);
    },
    display_vid: function() {
      this.viewport.empty();

      this.overlay = new main_overlay({
        model: this.active_vid
      });
      this.viewport.addClass('active_overlay').append(this.overlay.render_vid().el);
    },
    change_vid: function(vid) { 
      var $vid = $(vid.currentTarget).find('.thumb_inner');
      this.collection.reset_active();

      this.active_vid = this.collection.get($vid.attr('id'));

      this.collection.set_active_vid(this.active_vid);

      this.viewport.empty()
      
      this.overlay = new main_overlay({
        model: this.active_vid
      });
      this.viewport.addClass('active_overlay').append(this.overlay.render_vid().el);
    }
  });
  return exteriors_view;
});
