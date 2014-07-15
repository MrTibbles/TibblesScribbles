define(['jquery', 'views/colour-view', 'ga-tracking'], function($, ColourView, ga) {
  var ColoursView;
  ColoursView = Backbone.View.extend({
    el: $('#spin-colours ul')[0],
    events: {
      'click .colour-btn': 'select',
      'touchend .colour-btn': 'select'
    },
    initialize: function() {
      this.collection.on('reset', this.render, this);
      return this.collection.on('change:selected', this.selectedChanged, this);
    },
    render: function() {
      var _this = this;
      this.$el.empty();
      this.collection.each(function(colour) {
        var view;
        view = new ColourView({
          model: colour
        });
        return _this.$el.append(view.render().$el);
      });
      this;

      if ($.browser.msie && Number($.browser.version) < 9) {
        return $('#spin-colours .title').toggle().toggle();
      }
    },



    
    setAvailable: function(codes) {
      var selected,
        _this = this;
      this.collection.each(function(colour) {
        return colour.set('visible', _.contains(codes, colour.get('code')));
      });
      _.each(this.$el.find('.colour'), function(el) {
        var $el, code;
        $el = $(el);
        code = String($el.find('.colour-btn').data('code'));
        $el.toggleClass('available', _.contains(codes, code));
        return $el.toggleClass('disabled', !_.contains(codes, code));
      });
      selected = this.$el.find('.colour.active');
      if (selected.length === 1 && selected.hasClass('available') === false) {
        return this.collection.setSelected(this.collection.get(selected.siblings('.available').find('.colour-btn').data('code')));
      }
    },
    select: function(e) {
      var $el, colourCode, range;
      e.preventDefault();
      $el = $(e.currentTarget);
      if ($el.closest('.colour').hasClass('disabled')) {
        return;
      }
      this.collection.setSelected(this.collection.get($el.data('code')));
      colourCode = $el.attr('class');
      range = $('#configure').attr('class');
      return ga.trackItem(colourCode, range);
    },
    selectedChanged: function(selected) {
      return this.$el.find('[data-code="' + selected.get('code') + '"]').parent().addClass('active').siblings('.active').removeClass('active');
    }
  });
  return ColoursView;
});
