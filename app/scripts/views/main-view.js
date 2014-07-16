define(['underscore', 'backbone'], function(_, Backbone) {
  var exterior_view = Backbone.View.extend({
    tagName: 'div',
    className: 'viewport_openening',
    events: {
      'click .close-overlay, #overlay_bg': 'close_overlay'
    },
    viewport: $('#overlay_bg'),
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
        // $('.loading_spinner').stop().fadeOut();

        this.slide_content();

        return this;
      }
    },
    render_vid: function() {
      if(this.model.get('active') === false){
        return false;
      }else{
        this.$el.html(this.vid_template(this.model.toJSON()));
        // $('.loading_spinner').stop().fadeOut();

        this.slide_content();

        return this;
      }
    },
    slide_content: function(){
      var _this = this;

      this.$el.animate({
        'top': 250
      },{
        duration: 500,
        easing: 'easeInOutQuart',
        complete: function(){
          window.console && console.info(this)
        }
      });
    },
    close_overlay: function(){
      this.viewport.removeClass('active_overlay');
    }
  });
  return exterior_view;
});
