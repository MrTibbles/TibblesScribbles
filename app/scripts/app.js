define(['jquery', 'underscore', 'backbone', 'loader', 'collections/exterior-collection', 'views/exteriors-view', 'collections/interior-collection', 'views/interiors-view'], function($, _, Backbone, loader, exteriors, exteriors_view, interiors, interiors_view) {
  var slanted_gallery = Backbone.View.extend({
    el: $('#gallery-wrap'),
    viewport: $('#overlay_bg'),
    events: {
      'click nav button': 'change_img_type'
    },
    initialize: function() {
      this.resize_overlay();
      $(window).on('resize', this.resize_overlay);
    },
    render: function(type) {
      // this.set_loader();
      this.show_loader(this.$('#main_viewport')[0]);

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
              _this.InteriorView.render();
              _this.listenToOnce(_this.InteriorView, 'render', _this.load_collections());
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
              _this.ExteriorView.render();
              _this.listenToOnce(_this.ExteriorView, 'render', _this.load_collections());
            }
          });
      }
    },
    load_collections: function() {
      //Hide loading spinner as view has been rendered
      this.hide_loader();

      if (!this.exterior_imgs) {
        this.exterior_imgs = new exteriors;
        this.exterior_imgs.fetch();
      };
      if (!this.interior_imgs) {
        this.interior_imgs = new interiors;

        this.interior_imgs.fetch();

        this.InteriorView = new interiors_view({
          collection: this.interior_imgs
        });
      }
    },
    change_img_type: function(e) {
      if ($(e.currentTarget).hasClass('active_menu')) {
        return false;
      }
      this.hide_loader();

      $('nav button').removeClass('active_menu');
      $(e.currentTarget).addClass('active_menu');

      //Hide all other img lists
      var img_type = e.currentTarget.getAttribute('id'),
        _this = this;

      this.$el.find('ul.img-lists').removeClass('active_list');
      this.$el.find('ul.' + img_type).addClass('active_list');

      if ($(e.currentTarget).hasClass('exterior')) {
        this.ExteriorView.render();
        this.listenTo(this.ExteriorView, 'render', this.$('.loading_spinner').stop().fadeOut());
      } else if ($(e.currentTarget).hasClass('interior')) {
        this.InteriorView.render();
        this.listenTo(this.InteriorView, 'render', this.$('.loading_spinner').stop().fadeOut());
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
    },
    show_loader: function(target) {
      var options = {
        lines: 12,
        length: 12,
        width: 4,
        radius: 10,
        corners: 1,
        rotate: 35,
        direction: 1,
        color: '#FD532E',
        speed: 1,
        trail: 53,
        shadow: true,
        hwaccel: false,
        zIndex: 2e9,
        className: 'loading_spinner',
        top: 'auto',
        left: 'auto'
      };
      return this.loader = new loader(options).spin(target);
    },
    hide_loader: function(){
      //this.$('#main_viewport')[0]
      this.loader.stop();
    }
  });
  return slanted_gallery;
});
