define(['underscore', 'backbone'], function(_, Backbone) {
  var exterior_view = Backbone.View.extend({
    tagName: 'div',
    className: 'active_viewport',
    img_template: _.template(
      $('#img_main_temp').html()
    ),
    vid_template: _.template(
      $('#video_template').html()
    ),
    render_img: function() {      
      if(this.model.get('active') === false){
        return false;
      }else{
        this.$el.html(this.img_template(this.model.toJSON()));
        $('.loading_spinner').stop().fadeOut();
        return this;
      }
    },
    render_vid: function() {
      if(this.model.get('active') === false){
        return false;
      }else{
        this.$el.html(this.vid_template(this.model.toJSON()));
        $('.loading_spinner').stop().fadeOut();
        return this;
      }
    }
  });
  return exterior_view;
});
