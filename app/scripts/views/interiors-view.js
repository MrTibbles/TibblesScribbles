define(['underscore', 'backbone', 'collections/interior-collection', 'views/interior-view'], function(_, Backbone, interiors, interior_item) {
  var interiors_view = Backbone.View.extend({
    el: $('#main_viewport .interior'),
    events: {
      'click .int_thumb_out': 'change_int'
    },
    // template: _.template(
    //   $('#thumb_temp').html()
    // ),
    initialize: function() {
      this.active_int = null;
      this.$el.addClass('active_list');
      return this.collection.on('change:active', this.display_img, this);      
    },
    render: function() {
      var _this = this,
        ints_leng = this.collection.length;

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