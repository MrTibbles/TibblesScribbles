define(['underscore', 'backbone', 'views/loading_animation'], function(_, Backbone, loader) {
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
    initialize: function(){
      this.loader = new loader;      
    },
    render_img: function() {      
      if(this.model.get('active') === false){
        return false;
      }else{
        this.$el.html(this.img_template(this.model.toJSON()));      
        this.slide_content();

        return this;
      }
    },
    render_vid: function() {
      if(this.model.get('active') === false){
        return false;
      }else{
        this.$el.html(this.vid_template(this.model.toJSON()));
        window.console && console.info(this)

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
          _this.loader.show_loader($('#active_viewport'));

          // $('.main-image').load(function(){
          //   $('.main-image').fadeIn();
          // });
        }
      });
    },
    close_overlay: function(){      
      var _this = this;
      this.$el.animate({
        'top': -550
      },{
        duration: 500,
        easing: 'easeInOutQuart',
        complete: function(){
          _this.viewport.removeClass('active_overlay');
          _this.loader.hide_loader()
        }
      });
    },
    resize_overlay: function(e) {
      //this has lost its scope, think its linked to jQ event handler rather thn backbone?
      var _this = this;
      this.avail_width = $('html').outerWidth();
      this.avail_height = $('html').outerHeight();

      //Throttle the resize of the overlay, to avoid killin the DOM
      setInterval(function() {
        _this.viewport.css({
          'width': this.avail_width + 'px',
          'height': this.avail_height + 'px'
        });
      }, 50);
    }
  });
  return exterior_view;
});
