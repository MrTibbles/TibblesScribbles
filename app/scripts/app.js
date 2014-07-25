define(['jquery', 'backbone', 'views/loading_animation', 'views/card-wall', 'collections/exterior-collection', 'views/exteriors-view', 'collections/video-collection', 'views/videos-view', 'collections/interior-collection', 'views/interiors-view'], function($, Backbone, loader, free_wall, exteriors, exteriors_view, videos, videos_view, interiors, interiors_view) {
  var slanted_gallery = Backbone.View.extend({
    el: $('#main_viewport'),
    viewport: $('#overlay_bg'),
    events: {
      'click nav button': 'change_img_type'
    },
    initialize: function() {
      this.resize_overlay();
      $(window).on('resize', this.resize_overlay);          

      //Construct dummy Drupal settigns object, Grunt task to replace isnt playing ball!
      if(window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'){
        window.Drupal={setting:{gallery_widget:{RC:"AY5"}}};
      }
    },
    render: function(type) {
      this.loader = new loader;
      this.loader.show_loader(this.$el[0]);      

      switch (type) {
        case 'exterior':
          //Add active state to menu item
          this.$el.find('#exterior').addClass('active_menu');

          var _this = this;
          this.exterior_imgs = new exteriors;

          this.exterior_imgs.fetch({
            success: function() {
              _this.ExteriorView = new exteriors_view({
                collection: _this.exterior_imgs
              });
              //Place Exterior list above exterior for deep linking
              _this.$el.find('#main_viewport').prepend(_this.ExteriorView.$el);

              _this.ExteriorView.render();
              _this.listenToOnce(_this.ExteriorView, 'render', _this.load_collections());
            }
          });
          break;
        case 'interior':
          //Add active state to menu item
          this.$el.find('#interior').addClass('active_menu');

          var _this = this;
          this.interior_imgs = new interiors;

          this.interior_imgs.fetch({
            success: function() {
              _this.InteriorView = new interiors_view({
                collection: _this.interior_imgs
              });
              //Place Interior list above others for deep linking
              _this.$el.find('#main_viewport').prepend(_this.InteriorView.$el);
              
              _this.InteriorView.render();
              _this.listenToOnce(_this.InteriorView, 'render', _this.load_collections());
            }
          });
          break;
        case 'video':
          //Add active state to menu item
          this.$el.find('#video').addClass('active_menu');

          var _this = this;
          this.video_items = new videos;

          this.video_items.fetch({
            success: function() {
              _this.VideoView = new interiors_view({
                collection: _this.videos
              });
              //Place Video list above others for deep linking
              _this.$el.find('#main_viewport').prepend(_this.VideoView.$el);
              
              _this.VideoView.render();
              _this.listenToOnce(_this.VideoView, 'render', _this.load_collections());
            }
          });
          break;
        default:
          //Add active state to menu item
          this.$el.find('#exterior').addClass('active_menu');

          var _this = this;
          this.exterior_imgs = new exteriors;

          this.exterior_imgs.fetch({
            success: function() {
              _this.ExteriorView = new exteriors_view({
                collection: _this.exterior_imgs
              });
              //Place Exterior list above others for deep linking
              _this.$el.find('#main_viewport').prepend(_this.ExteriorView.$el);
              
              _this.ExteriorView.render();
              _this.listenToOnce(_this.ExteriorView, 'render', _this.load_collections());
            }
          });
      }
    },
    load_collections: function() {
      //Hide loading spinner as view has been rendered
      // this.loader.hide_loader();
      var _this = this;

      if (!this.exterior_imgs) {
        this.exterior_imgs = new exteriors;

        this.exterior_imgs.fetch({
          success: function() {
            _this.ExteriorView = new exteriors_view({
              collection: _this.exterior_imgs
            });
            _this.ExteriorView.render();            
          }
        });
      }
      if (!this.interior_imgs) {
        this.interior_imgs = new interiors;
  
        this.interior_imgs.fetch({
          success: function() {
            _this.InteriorView = new interiors_view({
              collection: _this.interior_imgs
            });            
            _this.InteriorView.render();   
          }
        });
      }
      if(!this.video_items){
        this.video_items = new videos;

        this.video_items.fetch({
          success: function() {
            _this.VideoView = new videos_view({
              collection: _this.video_items
            });            
            _this.VideoView.render();

            //Shuffle elements to get a varied list content types
            // _this.shuffle_elements(); 

            //Render the card wall style background - CURRENTLY INTERIOR SERVICE IS SLOWEST SO MOVED CARD WALL TO INTERIOR SUCCESS CALLBACK
            _this.card_wall();
          }
        });        
      }
      // this.listenToOnce(this.InteriorView, 'render', this.card_wall());
    },
    card_wall: function(){
      var card_wall = new free_wall;

      this.loader.hide_loader();
      return card_wall.render(this.$el.find('#gallery-thumbs'));
    },
    when_all: function(objects, event, callback, context){
      var callbackWrapper =  _.after(objects.length, callback);
      context = context || this;
      _.each(objects, function(obj){
        obj.once(event, callbackWrapper, context);
      })
    },
    shuffle_elements: function(e){
      var ul = document.getElementById('gallery-thumbs');
      
      window.console && console.info(ul.children.length)

      for (var i = ul.children.length; i >= 0; i--) {
        ul.appendChild(ul.children[Math.random() * i | 0]);
      }
    },
    change_img_type: function(e) {
      if ($(e.currentTarget).hasClass('active_menu')) {
        return false;
      }
      this.loader.hide_loader();

      $('nav button').removeClass('active_menu');
      $(e.currentTarget).addClass('active_menu');

      //Hide all other img lists
      var img_type = e.currentTarget.getAttribute('id'),
        _this = this;

      this.$el.find('ul.img-lists').removeClass('active_list');
      this.$el.find('ul.' + img_type).addClass('active_list');

      if ($(e.currentTarget).hasClass('exterior')) {
        this.ExteriorView.render();
        this.listenTo(this.ExteriorView, 'render', this.loader.hide_loader());
      } else if ($(e.currentTarget).hasClass('interior')) {
        this.InteriorView.render();
        this.listenTo(this.InteriorView, 'render', this.loader.hide_loader());
      }
    },
    resize_overlay: function(e) {
      //this has lost its scope, think its linked to jQ event handler rather thn backbone?
      var _this = this;
      this.avail_width = $('html').outerWidth();
      this.avail_height = $('html').outerHeight();

      //Throttle the resize of the overlay, to avoid killin the DOM
      setInterval(function() {
        $('#overlay_bg').css({
          'width': this.avail_width + 'px',
          'height': this.avail_height + 'px'
        });
      }, 50);
    }
  });
  return slanted_gallery;
});
