
define(['jquery', 'registry', 'models/vehicle-model', 'collections/colour-collection', 'views/colours-view', 'collections/model-collection', 'views/models-view', 'collections/engine-collection', 'views/engines-view', 'collections/option-collection', 'views/options-view', 'models/summary-model', 'views/summary-view', 'views/spins-view', 'collections/accessory-collection', 'views/accessories-view', 'views/bodystyle-switch-view', 'views/quote-view', 'router', 'config'], function($, registry, Vehicle, Colours, ColoursView, Models, ModelsView, Engines, EnginesView, Options, OptionsView, Summary, SummaryView, SpinsView, Accessories, AccessoriesView, BodyStyleSwitchView, QuoteView, router, config) {
  var App;
  App = Backbone.View.extend({
    el: $('#configure')[0],
    events: {
      'click #configure-tab .models, #configure-tab .engines, #configure-tab .options, #configure-tab .accessories': 'showTab',
      'click #pdf .download-pdf': 'downloadPdf',
      'click #spin-colours .disabled a': 'showWarning',
      'click .item.disabled .short ': 'showWarning',
      'click .calc': 'showQuote'
    },
    initialize: function() {
      var _ref,
        _this = this;
      $('body, #configure').addClass(config.name);
      this.titleTemplate = Handlebars.compile((_ref = config.titleTemplate) != null ? _ref : '{{range}} {{grade}}');
      this.router = router;
      Backbone.history.start();
      this.bodyStyleSwitch = (new BodyStyleSwitchView).model;
      this.vehicle = registry.vehicle = new Vehicle;
      this.colours = registry.colours = new Colours;
      this.models = registry.models = new Models;
      this.engines = registry.engines = new Engines;
      this.options = registry.options = new Options;
      this.accessories = new Accessories;
      this.summary = new Summary;
      this.bodyStyleSwitch.on('change:down', function() {
        if ($.browser.msie && Number($.browser.version) < 9) {
          return _.delay(function() {
            return _this.bodyStyleSwitched();
          }, 400);
        } else {
          return _this.bodyStyleSwitched();
        }
      });
      this.summary.set('accessories', this.accessories.getSelected());
      this.summary.set('options', this.options.getSelected());
      this.summary.set('vehicle', this.vehicle);
      this.summary.on('change', this.updateRoute, this);

      this.coloursView = new ColoursView({
        collection: this.colours
      });
      
      this.modelsView = new ModelsView({
        collection: this.models
      });
      this.enginesView = new EnginesView({
        collection: this.engines
      });
      this.optionsView = new OptionsView({
        collection: this.options
      });
      this.summaryView = new SummaryView({
        model: this.summary
      });
      this.spinsView = new SpinsView;
      this.accessoriesView = new AccessoriesView({
        collection: this.accessories
      });
      this.quoteView = new QuoteView({
        model: new Backbone.Model({
          summary: this.summary
        })
      });
      this.models.on('change:selected', this.modelChanged, this);
      this.engines.on('change:selected', this.engineChanged, this);
      this.colours.on('change:selected', this.colourChanged, this);
      this.options.on('change:selected', this.optionsChanged, this);
      this.vehicle.on('change', this.vehicleChanged, this);
      this.forbidFullConfigure(true);
      this.vehicle.fetch({
        rangeCode: config.rangeCodes[0]
      });
      this.accessories.fetch({
        rangeCode: config.rangeCodes[0]
      });
      if ($('body').hasClass('msie') && $('body').hasClass('v8')) {
        $('.bodystyle-switch-btn').on('dragstart', false);
      }
      $('#warning').on('click', this.hideWarning);
      return this.initCTA();
    },
    initCTA: function() {
      var _ref, _ref1, _ref2, _ref3;
      this.$('.cta-test-drive a').attr('href', (_ref = (_ref1 = config.cta) != null ? _ref1['book-a-test-drive'] : void 0) != null ? _ref : '/test-drive-' + config.name);
      this.$('.cta-brochure a').attr('href', (_ref2 = (_ref3 = config.cta) != null ? _ref3['order-a-brochure'] : void 0) != null ? _ref2 : '/brochure-' + config.name);
      return this.$('.cta-dealer a').attr('href', '/find-a-dealer');
    },
    render: function() {
      return this.summaryView.render();
    },
    renderTabs: function() {
      var $el;
      $el = $('#configure-tab').find('css3-container').remove().end();
      return $el.html($el.html());
    },
    vehicleChanged: function(vehicle) {
      var bodyStyle, bodyStyleId, colour, engineId, gradeCode, toggle;
      this.colours.reset(vehicle.colours());
      this.models.reset(vehicle.models());
      this.engines.reset(vehicle.engines());
      if (this.options.length === 1 || config.name === 'aygo') {
        this.hideOptions();
      }
      if (_.isString(this.router.getParam('colour'))) {
        colour = this.colours.get(this.router.getParam('colour'));
      } else if (_.isString(config.colour)) {
        colour = this.colours.get(config.colour);
      } else {
        colour = this.colours.where({
          price: 0
        })[0];
      }
      this.colours.setSelected(colour);
      bodyStyleId = this.router.getParam('bodyStyle');
      bodyStyle = this.vehicle.getBodyStyle(_.isString(bodyStyleId) ? Number(bodyStyleId) : config.spin.bodyStyleId);
      gradeCode = this.router.getParam('grade');
      if (_.isString(gradeCode)) {
        this.models.setSelected(this.models.get(gradeCode + bodyStyle.numberOfDoors));
      }
      engineId = this.router.getParam('engine');
      if (_.isString(engineId)) {
        this.engines.setSelected(this.engines.get(this.router.getParam('engine')));
      }
      this.summary.set('bodyStyle', bodyStyle);
      if (this.models.where({
        visible: true
      }).length === 1) {
        this.models.setSelected(this.models.where({
          visible: true
        })[0]);
      }
      if (config.bodyStyleSwitch) {
        toggle = vehicle.getBodyStyleToggle();
        if (config.bodyStyles) {
          this.bodyStyleSwitch.set({
            off: config.bodyStyles.up,
            on: config.bodyStyles.down
          });
        } else {
          this.bodyStyleSwitch.set({
            off: toggle.options[0] + ' ' + toggle.name,
            on: toggle.options[1] + ' ' + toggle.name
          });
        }
        if (this.vehicle.getBodyStyle(config.spin.bodyStyleId).numberOfDoors === toggle.options[1]) {
          this.bodyStyleSwitch.set('down', true);
        } else {
          this.bodyStyleSwitched();
        }
      }
      return this.updateTitle();
    },
    modelChanged: function(model) {
      var _ref;
      this.$('#configure-tab .engines').parent().removeClass('disabled');
      this.spinsView.model.set('model', model);
      if (_.isObject(model)) {
        this.enginesView.updateDetails(this.vehicle.engineDetails((_ref = this.models.getSelected()) != null ? _ref.get('grade').hash : void 0));
      }
      if (config.name === 'yaris') {
        this.toggleYarisCaveat();
      }
      this.forbidFullConfigure();
      this.options.resetSelected();
      this.engines.resetSelected();
      this.updateAvailable('grade');
      this.summary.set('model', model);
      this.allowFullConfigure();
      this.updateTitle();
      return this.summaryView.render();
    },
    updateTitle: function() {
      return $('#spin-title h2').text(this.title());
    },
    title: function() {
      var grade, range, _ref, _ref1, _ref2;
      range = (_ref = this.vehicle.rangeName()) != null ? _ref : '';
      grade = (_ref1 = (_ref2 = this.summary.get('model')) != null ? _ref2.get('grade').name : void 0) != null ? _ref1 : '';
      if (grade.indexOf(range) === 0) {
        range = '';
      }
      if (range.substr(range.length - grade.length) === grade) {
        grade = '';
      }
      return this.titleTemplate({
        range: range,
        grade: grade
      });
    },
    engineChanged: function(engine) {
      this.spinsView.model.set('engine', engine);
      this.updateAvailable('engine');
      this.summary.set('engine', engine);
      this.allowFullConfigure();
      this.summaryView.render();
      return this.options.reset(this.vehicle.options(this.models.getSelected(), engine));
    },
    colourChanged: function(colour) {
      if (config.name === 'hilux') {
        this.toggleHiluxCaveat();
      }
      this.spinsView.model.set('colour', colour);
      this.updateAvailable('colour');
      this.summary.set('colour', colour);
      return this.summaryView.render();
    },
    hideOptions: function() {
      $('#configure-tab .accessories .label').text('3.Accessories');
      return $('#configure-tab .options').closest('.tab-btn').hide();
    },
    optionsChanged: function(options) {
      return this.summaryView.render();
    },
    formatDerivative: function(derivative) {
      var sorted;
      if (derivative.length === 0) {
        return void 0;
      }
      sorted = _.sortBy(derivative, function(code) {
        return code;
      });
      return sorted.join('').replace(/##/g, '#');
    },
    updateAvailable: function(lock) {
      var model, options, result, trend_colours, _ref, _ref1, _ref2;
      options = {
        grade: (_ref = this.models.getSelected()) != null ? _ref.get('grade').hash : void 0,
        engine: (_ref1 = this.engines.getSelected()) != null ? _ref1.get('id') : void 0,
        derivative: this.options.getSelected().pluck('name')
      };
      if (_.isUndefined(options.grade)) {
        model = this.models.filter(function(model) {
          return model.get('grade').name === config.spin.gradeName && model.get('grade').bodyStyle.id === config.spin.bodyStyleId;
        });
        options.grade = model[0].get('grade').hash;
      }
      result = this.vehicle.available(options);
      if (lock !== 'engine') {
        this.enginesView.setAvailable(result.engines);
      }
      if (lock !== 'colour') {
        this.coloursView.setAvailable(result.colours);
      }
      (this.optionsView.setAvailable(result.derivatives) === lock && lock !== 'option');
      if (config.name === 'yaris' && ((_ref2 = this.models.getSelected()) != null ? _ref2.get('grade').name : void 0) === 'Trend') {
        trend_colours = ['040', '1F7', '1G3', '3N8'];
        return this.coloursView.setAvailable(trend_colours);
      }
    },
    showTab: function(e) {
      var btn, tab;
      e.preventDefault();
      e.stopPropagation();
      btn = $(e.currentTarget);
      tab = btn.closest('li');
      if (tab.hasClass('active') || tab.hasClass('disabled') || tab.hasClass('switch')) {
        return;
      }
      tab.addClass('active').siblings('.active').removeClass('active');
      $(btn.data('pane')).addClass('active').siblings('.active').removeClass('active');
      if (btn.hasClass('accessories')) {
        this.accessoriesView.render();
      } else if (btn.hasClass('engines')) {
        this.enginesView.fixHeight();
        this.enginesView.updatePositions();
      } else if (btn.hasClass('options')) {
        this.optionsView.fixHeight();
        this.optionsView.updatePositions();
        this.updateAvailable('derivative');
      }
      if ($.browser.msie && Number($.browser.version) < 9) {
        return this.renderTabs();
      }
    },
    allowFullConfigure: function() {
      if (_.isObject(this.summary.get('model')) && _.isObject(this.summary.get('engine'))) {
        this.$('#configure-tab .disabled, .download-pdf').removeClass('disabled');
        if ($.browser.msie && Number($.browser.version) < 9) {
          return this.renderTabs();
        }
      }
    },
    forbidFullConfigure: function(includeEngine) {
      var eq,
        _this = this;
      eq = 1;
      if (includeEngine) {
        eq = 0;
      }
      $('#configure-tab li:gt(' + eq + '), .download-pdf').addClass('disabled');
      _.each($('#configure-tab .disabled .icon'), function(li) {
        var $li;
        $li = $(li);
        return $li.find('.icon').remove();
      });
      if ($.browser.msie && Number($.browser.version) < 9) {
        return this.renderTabs();
      }
    },
    downloadPdf: function(e) {
      if ($(e.target).hasClass('disabled')) {
        return e.preventDefault();
      }
    },
    showWarning: function(e) {
      var $item;
      e.preventDefault();
      $item = $(e.currentTarget).closest('.item, .colour');
      if ($item.length === 0) {
        $item = $(e.currentTarget);
      }
      if ($item.hasClass('disabled')) {
        return $('#warning').show();
      }
    },
    hideWarning: function(e) {
      return $(e.currentTarget).hide();
    },
    updateRoute: function() {
      var params, _ref, _ref1, _ref2, _ref3;
      params = {
        bodyStyle: (_ref = this.summary.get('model')) != null ? _ref.get('bodyStyle').id : void 0,
        grade: (_ref1 = this.summary.get('model')) != null ? _ref1.get('grade').code : void 0,
        engine: (_ref2 = this.summary.get('engine')) != null ? _ref2.id : void 0,
        colour: (_ref3 = this.summary.get('colour')) != null ? _ref3.get('code') : void 0
      };
      return this.router.navigate('index/' + $.param(params), {
        trigger: true
      });
    },
    bodyStyleSwitched: function() {
      var found, rangeCode, toggle, value, _ref, _ref1;
      rangeCode = (_ref = this.summary.get('model')) != null ? (_ref1 = _ref.get('grade')) != null ? _ref1.code : void 0 : void 0;
      $('#configure-tab .models').click();
      this.$('.item.configure-expanded').removeClass('configure-expanded');
      toggle = this.vehicle.getBodyStyleToggle();
      value = toggle.options[this.bodyStyleSwitch.get('down') ? 1 : 0];
      this.models.filterByBodyStyle({
        toggle: toggle.toggle,
        value: value
      });
      this.spinsView.model.set('bodyStyle', this.models.where({
        visible: true
      })[0].get('grade').bodyStyle);
      this.models.resetSelected();
      this.forbidFullConfigure(true);
      if (_.isString(rangeCode)) {
        found = this.models.filter(function(model) {
          return model.get('grade').code === rangeCode && model.get('visible');
        });
        if (found.length) {
          return this.models.setSelected(found[0]);
        }
      }
    },
    showQuote: function(e) {
      e.preventDefault();
      if ($(e.currentTarget).hasClass('disabled')) {
        return;
      }
      $('#bottom-flipper-container').addClass('flipped').removeClass('not-flipped');
      $('html, body').animate({
        scrollTop: $('#quote').offset().top - 60
      }, 500);
      $('#configure-left .nav, #spin-colours').fadeOut();
      return this.quoteView.open();
    },
    toggleYarisCaveat: function() {
      var _ref;
      return this.$('.caveat').toggle(((_ref = this.models.getSelected()) != null ? _ref.get('grade').name : void 0) === 'Edition').addClass('center').html('* Spoiler shown is an accessory');
    },
    toggleHiluxCaveat: function() {
      var _ref, _ref1;
      console.info((_ref = this.colours.getSelected()) != null ? _ref.get('code') : void 0);
      return this.$('.caveat').toggle(((_ref1 = this.colours.getSelected()) != null ? _ref1.get('code') : void 0) === '6S3').addClass('center').html('* Subject to limited availablilty');
    }
  });
  return new App;
});
