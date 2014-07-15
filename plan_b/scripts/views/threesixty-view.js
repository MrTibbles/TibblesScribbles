define(['jquery', 'backbone', 'app_config'], function($, Backbone, app_config) {
  var exterior_view = Backbone.View.extend({
    tagName: 'div',
    className: 'active_spin_viewport',
    events: {
      'mousedown .interact': 'start_spin',
      'touchstart .interact': 'start_spin'
    },
    template: _.template(
      $('#360_temp').html()
    ),
    viewport: $('#main_viewport'),
    initialize: function() {
      this.spin_location = '//s3-eu-west-1.amazonaws.com/shareduat.toyotaretail.co.uk/widgets/configure/images/spins/' + app_config.name + '/';
      this.do_animation = true;
      this.active = false;
      this.prepare_spin;       // this.model.on('change', this.prepare_spin, this);
      this.step = 595 / 18;
      this.original = 0;// app_config.original;
      this.current = this.original;
      this.prev = null;
      this.default_loaded = false;

      $('body').on('mousemove', $.proxy(this.spin, this));
      $('body').on('touchmove', $.proxy(this.spin, this));
      $('body').on('mouseup', $.proxy(this.stop_spin, this));
      this.model.on('change', this.prepare_spin, this);
      var ua_str = navigator.userAgent;
      this.webp = ua_str.indexOf('Chrome') != -1 && window.chrome || window.opera ? true : false;

      if(this.webp){
        $('body').addClass('webp');
      }
      return $('body').on('touchend', $.proxy(this.stop_spin, this));
    },
    prepare_spin: function(grade) {    
      window.console && console.info(this.model)
      this.$el.html(this.template(this.model.get('active_grade')));
      var img_prefix = this.spin_location + app_config.img_map(this);
      window.console && console.info(app_config.img_map(this))
      if(this.last_img_prefix === img_prefix) {
        return;
      }
      this.img_count = 0;
      this.last_img_prefix = img_prefix;
      // $('#spins .loader').stop().fadeIn();
      if(this.webp) {
        img = img_prefix + '.webp';
      } else {
        this.load_spin_img(img_prefix + '-2.png', 1, this.last_img_prefix);
        this.load_spin_img(img_prefix + '-3.png', 2, this.last_img_prefix);
        this.load_spin_img(img_prefix + '-4.png', 3, this.last_img_prefix);
        this.load_spin_img(img_prefix + '-5.png', 4, this.last_img_prefix);
        this.load_spin_img(img_prefix + '-6.png', 5, this.last_img_prefix);
        img = img_prefix + '-1.png';
      }
      this.load_spin_img(img, 0, this.last_img_prefix);
      this.default_loaded = true;
      this.$('#body_switcher li[data-body-id='+this.model.get('active_grade').active_body+']').addClass('active_body')
      return this;
    },
    get_bodystyle: function(body_id){
      var body_type;
      switch(body_id){
        case 206:
        case 194:
          body_type = '3door';
          break;
        case 196:
        case 207:
          body_type = '5door';
          break;
        case 183:
          body_type = 'tourer';
          break;
        case 208:
          body_type = 'saloon'
          break;
        case 186:
          body_type = 'dc';
          break;
        case 185:
          body_type = 'ec';
          break;
        case 184:
          body_type = 'sc';
          break;        
      };
      return body_type;
    },
    load_spin_img: function(img, idx, last_img) {
      var _this = this;
      return $('<img class="hidden_sprite" src="' + img + '">').load((function(e) {
        if(_this.last_img_prefix === last_img) {
          _this.$('.buffer:not(.current) .pane:eq(' + idx + ')').css('background-image', 'url(' + img + ')');
          $(e.currentTarget).remove();
          _this.img_count++;
          if(_this.img_count === 6 || _this.webp) {
            _this.$('.buffer.current').removeClass('current').siblings('.buffer').addClass('current');
            if($.browser.msie) {
              _this.$('.buffer:not(.current) .pane').addClass('pane-hide');
            }
            $('.loading_spinner').stop().fadeOut();
            _this.render();
            if(_this.do_animation && _.isUndefined(_this.ti)) {
              _this.ti = 'animation-started';
              setTimeout(function() {
                return _this.ti = setInterval($.proxy(_this.animate, _this), 125);
              }, 1000);
            }
          }
        }        
      })(this)).appendTo(this.$el);      
    },
    animate: function() {
      this.next_frame();
      if(this.current === this.original) {
        this.do_animation = false;
        return clearInterval(this.ti);
      }
    },
    start_spin: function(e) {
      var x;
      e.preventDefault();
      clearInterval(this.ti);
      this.do_animation = false;
      this.active = true;
      x = e.originalEvent.touches ? e.originalEvent.touches[0].pageX : e.pageX;
      return this.prev = Math.floor((x - this.$el.find('.interact').offset().left) / this.step);
    },
    stop_spin: function(e) {
      return this.prev = null;
    },
    spin: function(e) {
      if(this.prev === null) {
        return;
      }
      var x = e.originalEvent.touches ? e.originalEvent.touches[0].pageX : e.pageX;
      var current = Math.floor((x - this.$el.find('.interact').offset().left) / this.step);
      this.current += this.prev - current;
      if(this.current < 0) {
        this.current = 35 + this.current;
      }
      if(this.current > 35) {
        this.current = this.current - 35;
      }
      this.prev = current;
      return this.render();
    },
    next_frame: function() {
      this.current++;
      if(this.current === 36) {
        this.current = 0;
      }
      return this.render();
    },
    prev_frame: function() {
      this.current--;
      if(this.current === -1) {
        this.current = 35;
      }
      return this.render();
    },
    render: function() {
      this.$el.attr('class', 'active_spin_viewport three_sixty_wrap spin' + this.current);
      if(this.webp === false) {
        var eq = Math.floor(this.current / 6);
        if($.browser.msie) {
          return this.$('.current .pane:eq(' + eq + ')').removeClass('pane-hide').siblings().addClass('pane-hide');
        } else {
          return this.$('.buffer:eq(0) .pane:eq(' + eq + '), .buffer:eq(1) .pane:eq(' + eq + ')').removeClass('pane-hide').siblings().addClass('pane-hide');
        }
      }
    }
  });
  return exterior_view;
});
