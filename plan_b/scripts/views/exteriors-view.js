define(['underscore', 'backbone', 'collections/exterior-collection', 'views/exterior-view', 'views/main-view', 'loader'], function(_, Backbone, exts, ext_view, main_view, loader) {
  var exteriors_view = Backbone.View.extend({
    el: $('#thumb_slider'),
    collection: exts,
    events: {
      'click .ext_thumb_out': 'change_ext',
      // 'mouseover .thumb_slider_nav': 'slide_thumbs'
    },
    template: _.template(
      $('#img_main_temp').html()
    ),
    viewport: $('#main_viewport'),
    initialize: function() {
      this.active_ext = null;
      this.collection.on('change:active', this.display_img, this);
    },
    render: function() {
      var _this = this,
        exts_leng = this.collection.length;
      this.thumb_width = 111; // Width of thumbnails 

      this.collection.each(function(ext_img, idx) {
        _this.parse_img(ext_img, idx);
      });
      // var first_li = this.$el
      // $(first_li).addClass('active_thumb')
      this.$el.css('width', exts_leng * this.thumb_width);
      return this;
    },
    parse_img: function(img, idx) {
      if(img.get('thumb_src')) {
        var ext_thumb = new ext_view({
          model: img
        });
        if(idx === 0) {
          this.collection.set_active_img(img);
          this.view_port = new main_view({
            model: img
          });
          this.viewport.append(this.view_port.render_img().el)
          this.$el.find('li').eq(0).addClass('active_thumb');
        }
        return this.$el.append(ext_thumb.render().el);
      } else {
        window.console && console.error('missing thumb src');
      }
    },
    display_img: function() {
      if(this.active_ext === null || this.active_ext === undefined){
        return;
      }
      this.view_port = new main_view({
        model: this.active_ext
      });
      this.viewport.append(this.view_port.render_img().el)
    },
    change_ext: function(img) {
      var $img = $(img.currentTarget).find('.thumb_inner');      
      this.active_ext = this.collection.get($img.attr('id'));      

      if($img.hasClass('active_thumb')) {
        return;
      }
      this.viewport.empty()
      this.$('.thumb_inner').parent('li').removeClass('active_thumb');

      this.view_port.model.set('active', false);
      this.collection.set_active_img(this.active_ext);
      $img.parent('li').addClass('active_thumb');
    },
    slide_thumbs: function(e){
      window.console && console.log(e)
      var $nav = $(e.currentTarget),        
        _this = this,
        interval = 20,
        orig_offset = _this.$('#thumb_slider').offset().left,
        anim_timer, thumb_offset;

      var off_set = $nav.offset();
      clearInterval(anim_timer);
      if($nav.attr('id') === 'right'){
        anim_timer = setInterval(this.scroll_thumbs_R, interval);
      }else{
        anim_timer = setInterval(this.scroll_thumbs_L, interval);
      }
      $nav.on('mouseleave', function(){
        clearInterval(anim_timer);
        _this.$('#thumb_slider').stop(true, true);
        thumb_offset = _this.$('#thumb_slider').position().left;
        var frames_per = (Math.round((thumb_offset - orig_offset) / this.thumb_width) * this.thumb_width) + orig_offset;
        _this.$('#thumb_slider').animate({
          'left': frames_per
        }, (interval * 5))
      });
    }
  });
  return exteriors_view;
});
