define(['underscore', 'backbone', 'collections/exterior-collection', 'views/exterior-view', 'views/main-view'], function(_, Backbone, exteriors, exterior_item, main_overlay) {
  var exteriors_view = Backbone.View.extend({
    el: $('#main_viewport .exterior'),
    collection: exteriors,
    events: {
      'click .ext_thumb_out': 'change_ext'
    },
    viewport: $('#overlay_bg'),
    initialize: function() {
      this.$el.addClass('active_list');

      // return this.collection.on('change:active', this.display_img, this);
    },
    render: function() {
      var _this = this,
        exts_leng = this.collection.length;
      
      this.$el.empty();
      
      this.collection.each(function(ext_img, idx) {
        _this.parse_img(ext_img, idx);
      });      
      // this.$el.css('width', exts_leng * this.thumb_width);
      return this;
    },
    parse_img: function(img, idx) {
      var ext_thumb = new exterior_item({
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
      this.viewport.empty();

      this.overlay = new main_overlay({
        model: this.active_ext
      });
      this.viewport.addClass('active_overlay').append(this.overlay.render_img().el);
    },
    change_ext: function(img) {      
      var $img = $(img.currentTarget).find('.thumb_inner');
      this.collection.reset_active();
      
      this.active_ext = this.collection.get($img.attr('id'));     
      
      this.collection.set_active_img(this.active_ext);

      this.viewport.empty();

      this.overlay = new main_overlay({
        model: this.active_ext
      });
      this.viewport.addClass('active_overlay').append(this.overlay.render_img().el);
    }
  });
  return exteriors_view;
});
