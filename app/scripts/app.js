define(['jquery', 'underscore', 'backbone', 'loader', 'collections/exterior-collection', 'views/exteriors-view', 'collections/interior-collection', 'views/interiors-view'], function($, _, Backbone, loader, exteriors, exteriors_view, interiors, interiors_view) {
  var slanted_gallery = Backbone.View.extend({
    el: $('#gallery-wrap'),
    events: {
      'click button#exterior': 'display_exteriors',
      'click button#interior': 'display_interiors'
    },
    initialize: function() {
      // window.console && console.info('Starting')
    },
    set_loader: function() {
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
      this.$('.loading_spinner').stop().fadeOut();

      if (!this.exterior_imgs) {
        this.exterior_imgs = new exteriors;
        this.exterior_imgs.fetch();
      };
      if (!this.interior_imgs) {
        this.interior_imgs = new interiors;

        this.interior_imgs.fetch();
      }
    },
    display_exteriors: function(e) {
      if ($(e.currentTarget).hasClass('active_menu')) {
        return false;
      }
      $('buttton').removeClass('active_menu');
      $(e.currentTarget).addClass('active_menu');

      //Hide all other img lists
      var img_type = e.currentTarget.getAttribute('id'),
        _this = this;

      this.$el.find('ul.img-lists').removeClass('active_list');
      this.$el.find('ul.' + img_type).addClass('active_list');

      this.ExteriorView = new exteriors_view({
        collection: _this.exterior_imgs
      });
      this.ExteriorView.render();
    },
    //Havin to repeast myself due to collections and views having different names
    display_interiors: function(e) {
      if ($(e.currentTarget).hasClass('active_menu')) {
        return false;
      }
      $('buttton').removeClass('active_menu');
      $(e.currentTarget).addClass('active_menu');
      //Hide all other img lists
      var img_type = e.currentTarget.getAttribute('id'),
        _this = this;

      this.$el.find('ul.img-lists').removeClass('active_list');
      this.$el.find('ul.' + img_type).addClass('active_list');

      this.InteriorView = new interiors_view({
        collection: _this.interior_imgs
      });
      this.InteriorView.render();
    }
  });
  return slanted_gallery;
});
