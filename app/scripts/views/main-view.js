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
      this.resize_overlay();

      this.viewport.empty();
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
        this.slide_content();

        return this;
      }
    },
    slide_content: function(){
      var _this = this;      
      
      //Height of overlay is not available until it is present/visible, 250 is half of the height
      window.position = $(window).scrollTop() + 250;

      this.$el.animate({
        'top': window.position
      },{
        duration: 500,
        easing: 'easeInOutQuart',
        complete: function(){
          _this.loader.show_loader(_this.$el.find('.active_viewport')[0]);
          
          var img = _this.$el.find("img")[0];
          //Wait for image to load, then hide loader and show image
          if(img && $(img).outerWidth() >= 1){            
            $(img).fadeIn(500);
            _this.loader.hide_loader();
          }else _this.loader.hide_loader();
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
          _this.$el.empty();
          _this.viewport.removeClass('active_overlay');
        }
      });
    },
    resize_overlay: function(e) {
      //this has lost its scope, think its linked to jQ event handler rather thn backbone?
      var _this = this;
      _this.avail_width = $('html').outerWidth();
      _this.avail_height = $('html').outerHeight();

      //Throttle the resize of the overlay, to avoid killin the DOM
      setTimeout(function() {
        _this.viewport.css({
          'width': _this.avail_width + 'px',
          'height': _this.avail_height + 'px'
        });
      }, 50);
    }
  });
  return exterior_view;
});
