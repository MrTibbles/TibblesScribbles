define(['underscore', 'backbone', 'collections/interior-collection', 'views/interior-view','views/main-view'], function(_, Backbone, ints, int_view, main_view) {
  var interiors_view = Backbone.View.extend({
    el: $('#thumb_slider'),
    events: {
      'click .int_thumb_out': 'change_int'
    },
    template: _.template(
      $('#img_main_temp').html()
    ),
    viewport: $('#main_viewport'),
    initialize: function() {
      this.active_int = null;
      return this.collection.on('change:active', this.display_img, this);
    },
    render: function() {
      var _this = this,
        ints_leng = this.collection.length,
        thumb_width = 111; // Width of thumbnails 

      this.collection.each(function(int_img, idx) {
        _this.parse_img(int_img,idx);
      });

      this.$el.css('width', ints_leng * thumb_width)
      return this;
    },
    parse_img: function(img,idx) {
      if(img.get('thumb_src')) {
        var int_thumb = new int_view({
          model: img
        });
        if(idx === 0){
          this.collection.set_active_img(img);
          this.view_port = new main_view({
            model: img
          });
          this.viewport.append(this.view_port.render_img().el);
        }
        return this.$el.append(int_thumb.render().el);
      } else {
        window.console && console.error('missing thumb src');
      }
    },
    display_img: function() {
      if(this.active_int === null || this.active_int === undefined){
        return;
      }
      this.view_port = new main_view({
        model: this.active_int
      });
      this.viewport.append(this.view_port.render_img().el)
    },
    change_int: function(img) {
      var $img = $(img.currentTarget).find('.thumb_inner');      
      this.active_int = this.collection.get($img.attr('id'));      

      if($img.hasClass('active_thumb')) {
        return;
      }
      this.viewport.empty()
      this.$('.thumb_inner').parent('li').removeClass('active_thumb');

      this.view_port.model.set('active', false);
      this.collection.set_active_img(this.active_int);
      $img.parent('li').addClass('active_thumb');
    }
  });
  return interiors_view;
});