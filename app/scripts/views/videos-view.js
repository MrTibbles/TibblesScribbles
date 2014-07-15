define(['underscore', 'backbone', 'collections/video-collection', 'views/video-view','views/main-view','loader'], function(_, Backbone, vids, vid_view, main_view, loader) {
  var exteriors_view = Backbone.View.extend({
    el: $('#thumb_slider'),
    events: {
      'click .vid_thumb_out': 'change_vid'
    },
    template: _.template(
      $('#video_template').html()
    ),
    viewport: $('#main_viewport'),
    initialize: function() {
      return this.collection.on('change:active', this.display_vid, this);
    },
    render: function() {
      var _this = this,
        vids_leng = this.collection.length,
        thumb_width = 111; // Width of thumbnails 

      this.collection.each(function(vid_img, idx) {
        _this.parse_vid(vid_img,idx);
      });

      this.$el.css('width', vids_leng * thumb_width)
      return this;
    },
    parse_vid: function(vid,idx) {
      if(vid.get('video_ID')) {
        var vid_thumb = new vid_view({
          model: vid
        });
        if(idx === 0){
          this.collection.set_active_vid(vid);
          this.view_port = new main_view({
            model: vid
          });
          this.viewport.append(this.view_port.render_vid().el)
        }
        return this.$el.append(vid_thumb.render().el);
      } else {
        this.$('.loading_spinner').stop().fadeOut();
        this.viewport.html('<h1 id="no_content">Sorry, there are no videos available.</h1>')
        window.console && console.error('missing video URL');
      }
    },
    display_vid: function() {
      if(this.active_vid === null || this.active_vid === undefined){
        return;
      }
      this.view_port = new main_view({
        model: this.active_vid
      });
      this.viewport.append(this.view_port.render_vid().el)
    },
    change_vid: function(vid) { 
      var $vid = $(vid.currentTarget).find('.thumb_inner');
      this.active_vid = this.collection.get($vid.attr('id'));

      if($vid.hasClass('active_thumb')) {
        return;
      }
      this.viewport.empty()
      this.$('.thumb_inner').parent('li').removeClass('active_thumb');

      this.view_port.model.set('active', false);
      this.collection.set_active_vid(this.active_vid);
      $vid.parent('li').addClass('active_thumb');
    }
  });
  return exteriors_view;
});
