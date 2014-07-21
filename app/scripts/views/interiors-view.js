define(['underscore', 'backbone', 'collections/interior-collection', 'views/interior-view', 'views/main-view'], function(_, Backbone, interiors, interior_item, main_overlay) {
  var interiors_view = Backbone.View.extend({
    el: $('#main_viewport .interior'),
    collection: interiors,
    events: {
      'click .int_thumb_out': 'change_int'
    },
    viewport: $('#overlay_bg'),
    initialize: function() {
      this.active_int = null;    
      
      // return this.collection.on('change:active', this.display_img, this);      
    },
    render: function() {
      var _this = this,
        ints_leng = this.collection.length;

      this.$el.empty();
      this.$el.addClass('active_list');

      this.collection.each(function(int_img, idx) {                
        _this.parse_img(int_img,idx);
      });
      return this;
    },
    parse_img: function(img,idx) {
      var interior_img = new interior_item({
        model: img
      });
      // if(idx === 0){
      //   this.collection.set_active_img(img);
      //   this.view_port = new main_view({
      //     model: img
      //   });
      //   this.viewport.append(this.view_port.render_img().el);
      // }
      return this.$el.append(interior_img.render().el);
    },
    display_img: function() {
      this.viewport.empty();

      this.overlay = new main_overlay({
        model: this.active_int
      });
      this.viewport.addClass('active_overlay').append(this.overlay.render_img().el);
    },
    change_int: function(img) {
      var $img = $(img.currentTarget).find('.thumb_inner');              

      this.active_int = this.collection.get($img.attr('id'));    

      this.$('.thumb_inner').parent('li').removeClass('active_thumb');

      this.collection.set_active_img(this.active_int);

      this.viewport.empty();

      this.overlay = new main_overlay({
        model: this.active_int
      });
      this.viewport.addClass('active_overlay').append(this.overlay.render_img().el);
    }
  });
  return interiors_view;
});