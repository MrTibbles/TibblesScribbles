define(['underscore', 'backbone', 'collections/exterior-collection', 'views/exterior-view', 'views/main-view'], function(_, Backbone, exteriors, ext_view, main_overlay) {
  var exteriors_view = Backbone.View.extend({
    el: $('#main_viewport .exterior'),
    collection: exteriors,
    events: {
      // 'click .ext_thumb_out': 'change_ext'
    },
    viewport: $('#overlay_bg'),
    initialize: function() {
      this.active_ext = null;
      this.$el.addClass('active_list');
      return this.collection.on('change:active', this.display_img, this);
    },
    render: function() {
      var _this = this,
        exts_leng = this.collection.length;

      this.collection.each(function(ext_img, idx) {
        _this.parse_img(ext_img, idx);
      });      
      // this.$el.css('width', exts_leng * this.thumb_width);
      return this;
    },
    parse_img: function(img, idx) {
      var ext_thumb = new ext_view({
        model: img
      });
      // if(idx === 0) {
      //   this.collection.set_active_img(img);
      //   this.view_port = new main_view({
      //     model: img
      //   });
      //   this.viewport.append(this.view_port.render_img().el)
      //   this.$el.find('li').eq(0).addClass('active_thumb');
      // }
      return this.$el.append(ext_thumb.render().el);
    },
    display_img: function() {
      if(this.active_ext === null || this.active_ext === undefined){
        return;
      }
      this.viewport.empty();

      this.overlay = new main_overlay({
        model: this.active_ext
      });
      this.viewport.prepend(this.overlay.render_img().el);
    },
    change_ext: function(img) {
      var $img = $(img.currentTarget).find('.thumb_inner');      
      this.active_ext = this.collection.get($img.attr('id'));      

      if($img.hasClass('active_thumb')) {
        return;
      }

      // this.main_overlay.model.set('active', false);
      this.collection.set_active_img(this.active_ext);
      $img.parent('li').addClass('active_thumb');
    }
  });
  return exteriors_view;
});
