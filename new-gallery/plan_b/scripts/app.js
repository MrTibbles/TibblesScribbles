define(['jquery', 'underscore', 'backbone', 'models/vehicle-model', 'views/vehicle-view', 'collections/exterior-collection', 'views/exteriors-view', 'collections/interior-collection', 'views/interiors-view', 'collections/video-collection', 'views/videos-view', 'loader'], function($, _, Backbone, vehicles, vehicles_view, exterior_imgs, exteriors_view, interior_imgs, interiors_view, videos, videos_view, loader) {
  var app_view = Backbone.View.extend({
    el: $('#gallery-wrap'),
    events: {
      'click .top_nav #exteriors': 'display_exteriors',
      'click .top_nav #interiors': 'display_interiors',
      'click .top_nav #videos': 'display_videos',
      'click .top_nav #three-six': 'display_spins',
      'mouseover .thumb_slider_nav': 'slide_thumbs',
      'mouseleave .thumb_slider_nav': 'stop_thumbs',
      'mouseover #main_viewport': 'show_title_box',
      'mouseleave #main_viewport': 'hide_title_box'
    },
    initialize: function() {
      this.thumb_offset = this.orig_offset = this.$('#thumb_slider').position().left;
      this.anim_timer = null;
    },
    viewport: $('#main_viewport'),
    set_loader: function(){
      var options = {
        lines: 12,
        length: 12,
        width: 4,
        radius: 10,
        corners: 1,
        rotate: 35,
        direction: 1,
        color: '#000',
        speed: 1,
        trail: 53,
        shadow: true,
        hwaccel: false,
        zIndex: 2e9,
        className: 'loading_spinner',
        top: 'auto',
        left: 'auto'
      };
      return this.loader = new loader(options).spin(this.$('#main_viewport')[0]);
    },
    render: function(type) {
      this.set_loader();
      this.$('.loading_spinner').stop().fadeIn();

      switch(type) {
        case 'spinner':
          this.vehicles = new vehicles;
          this.$('.top_nav li').removeClass('active_pane');
          this.$('.top_nav li').eq(0).addClass('active_pane');

          var _this = this;
          this.vehicles.fetch({
            success: function(vehicle) {
              _this.VehicleView = new vehicles_view({
                model: _this.vehicles
              });
              _this.VehicleView.render();
              _this.listenToOnce(_this.VehicleView, 'render', _this.load_collections());
            }
          });
          break;

        case 'exterior':
          this.exteriors = new exterior_imgs;
          this.$('.top_nav li').removeClass('active_pane');
          this.$('.top_nav li').eq(1).addClass('active_pane');

          var _this = this;
          this.exteriors.fetch({
            success: function(ext_img) {
              _this.ExteriorView = new exteriors_view({
                collection: _this.exteriors
              });
              _this.ExteriorView.render();
              _this.listenToOnce(_this.ExteriorView, 'render', _this.load_collections());
            }
          });          
          break;

        case 'interior':
          this.interiors = new interior_imgs;
          this.$('.top_nav li').removeClass('active_pane');
          this.$('.top_nav li').eq(2).addClass('active_pane');

          var _this = this;
          this.interiors.fetch({
            success: function(int_img) {
              _this.InteriorView = new interiors_view({
                collection: _this.interiors
              });
              _this.InteriorView.render();
              _this.listenToOnce(_this.InteriorView, 'render', _this.load_collections());
            }
          });
          break;

        case 'video':
          this.videos = new videos;
          this.$('.top_nav li').removeClass('active_pane');
          this.$('.top_nav li').eq(3).addClass('active_pane');

          var _this = this;
          this.videos.fetch({
            success: function(ext_img) {
              _this.VideoView = new videos_view({
                collection: _this.videos
              });
              _this.VideoView.render();
              _this.listenToOnce(_this.VideoView, 'render', _this.load_collections());
            }
          });
          break;

        default:
          this.vehicles = new vehicles;
          this.$('.top_nav li').removeClass('active_pane');
          this.$('.top_nav li').eq(0).addClass('active_pane');

          var _this = this;
          this.vehicles.fetch({
            success: function(vehicle) {
              _this.VehicleView = new vehicles_view({
                model: _this.vehicles
              });
              _this.VehicleView.render();
              _this.listenToOnce(_this.VehicleView, 'render', _this.load_collections());
            }
          });
          break;
      }      
    },
    load_collections: function(type) {
      if(!this.vehicles) {
        this.vehicles = new vehicles;
        this.vehicles.fetch();
      }
      this.exteriors = new exterior_imgs;
      this.interiors = new interior_imgs;
      this.videos = new videos;
      
      this.exteriors.fetch();
      this.interiors.fetch();
      this.videos.fetch();      

      window.console && console.log('Loaded collections ', this);
      this.desc_height = this.$('#descr_box').outerHeight(true);
      this.$('#descr_box').css('bottom',-this.desc_height+'px');
    },
    display_exteriors: function(view_type) {
      var $nav = $(view_type.currentTarget);
      if($nav.hasClass('active_pane')) {
        return;
      }
      this.reset_slider();
      this.viewport.empty();
      this.$('#thumb_slider').empty();
      this.$('.top_nav li').removeClass('active_pane');
      
      $nav.addClass('active_pane');
      this.set_loader();
      this.$('.loading_spinner').stop().fadeIn();

      this.ExteriorView = new exteriors_view({
        collection: this.exteriors
      }); 
      this.ExteriorView.render();      
    },
    display_interiors: function(view_type) {
      var $nav = $(view_type.currentTarget);      
      if($nav.hasClass('active_pane')) {
        return;
      }
      this.reset_slider();
      this.viewport.empty();
      this.$('#thumb_slider').empty();
      this.$('.top_nav li').removeClass('active_pane');
      
      $nav.addClass('active_pane');
      this.set_loader();
      this.$('.loading_spinner').stop().fadeIn();

      this.InteriorView = new interiors_view({
        collection: this.interiors
      });
      this.InteriorView.render();
    },
    display_videos: function(view_type) {
      var $nav = $(view_type.currentTarget);
      this.reset_slider();
      if($nav.hasClass('active_pane')) {
        return;
      }
      this.reset_slider();
      this.viewport.empty();
      this.$('#thumb_slider').empty();
      this.$('.top_nav li').removeClass('active_pane');
      
      $nav.addClass('active_pane');
      this.set_loader();
      this.$('.loading_spinner').stop().fadeIn();

      this.VideoView = new videos_view({
        collection: this.videos
      });
      this.VideoView.render();
    },
    display_spins: function(view_type) {
      var $nav = $(view_type.currentTarget);     
      if($nav.hasClass('active_pane')) {
        return;
      }
      this.reset_slider();
      this.viewport.empty();
      this.$('#thumb_slider').empty();
      this.$('.top_nav li').removeClass('active_pane');
      
      $nav.addClass('active_pane');
      this.set_loader();
      this.$('.loading_spinner').stop().fadeIn();

      this.VehicleView = new vehicles_view({
        model: this.vehicles
      });
      this.VehicleView.render();
    },
    reset_slider: function(){
      this.$('#thumb_slider').css('left',0);
    },
    slide_thumbs: function(e){
      if(this.$('#thumb_slider li').length > 1){
        var $nav = $(e.currentTarget),        
          _this = this,                        
          interval = 20,
          thumb_width = 111;
                    
        clearInterval(this.anim_timer);
        if($nav.attr('id') === 'right'){ 

          this.anim_timer = setInterval(function(){
            var strip_width = this.$('#thumb_slider').width(),
              wrapper_width = this.$('#thumbs').width();        

            var buffer = Math.round(strip_width - (wrapper_width - (_this.orig_offset + (thumb_width / 5))));
            if((Math.abs(_this.thumb_offset)) < buffer || !_this.thumb_offset){
              _this.$('#thumb_slider').stop(true, true).animate({
                'left': '-='+interval
              }, {
                step: function(){
                  _this.thumb_offset = _this.$('#thumb_slider').position().left;
                }
              }, interval)
            }else{
              _this.thumb_offset = _this.$('#thumb_slider').position().left;
              return false;
            }
          }, 30)

        }else{
          this.anim_timer = setInterval(function(){
            var buffer_left = _this.orig_offset + (thumb_width / 5);
            if(_this.thumb_offset < buffer_left || !_this.thumb_offset){
              _this.$('#thumb_slider').stop(true, true).animate({
                'left': '+='+interval
              }, {
                step: function(){
                  _this.thumb_offset = _this.$('#thumb_slider').position().left;
                }
              }, interval)
            }else{
              _this.thumb_offset = _this.$('#thumb_slider').position().left;
              return;
            }
          }, 30);
        }
      }else return false;
    },
    stop_thumbs: function(){      
      clearInterval(this.anim_timer);
      this.thumb_offset = this.$('#thumb_slider').position().left;
      var frames_per = (Math.round((this.thumb_offset - this.orig_offset) / this.thumb_width) * this.thumb_width) + this.orig_offset;
      this.$('#thumb_slider').animate({
        'left': frames_per
      }, (20 * 5))
    },
    show_title_box: function(){
      this.$('#descr_box').addClass('title_visible').animate({
        'bottom': 0
      }, 500);
    },
    hide_title_box: function(){
      this.desc_height = this.$('#descr_box').outerHeight(true);
      this.$('#descr_box').addClass('title_visible').animate({
        'bottom': -this.desc_height
      }, 250);
    }
  });
  return app_view;
});
