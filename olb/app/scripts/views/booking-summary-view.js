define(['backbone', 'register', 'models/vehicle'], function(Backbone, register, vehicle) {
  var bookingSummary = Backbone.View.extend({
    el: $('#summary'),
    events: {},
    yourCarTpl: _.template(
    	$('#your-car-tpl').html()
  	),
    yourServicingTpl: _.template(
      $('#selected-servicing-tpl').html()
    ),
    yourRepairsTpl: _.template(
      $('#selected-repairs-tpl').html()
    ),
    yourOptionsTpl: _.template(
      $('#selected-options-tpl').html()
    ),
    initialize: function() {
      // this.model.on('change', this.render, this);
    	// this.model.on('change:selected', this.renderOptions, this);
      this.model.on('change', this.render, this);
    },
    render: function(){
      register.loader.hideLoader();

      $('.service-parent').removeClass('inactive');

    	this.$el.removeClass('empty');
    	window.console && console.info('Summary update: ', this.model.changed);

    	this.$el.find('#your-car').html(this.yourCarTpl(this.model.toJSON()));

      this.model.get('bookingDetails').get('mileage') && this.renderService();
    },
    renderService: function(){
      this.$el.find('.mileage').addClass('available');
      this.$el.find('#selected-service').addClass('selected').html(this.yourServicingTpl(this.model.toJSON()));
    },
    renderOptions: function(){
      var _this = this;
      window.console && console.info('selected: ', this.model.get('selected'));
      this.$el.find('#selected-options').empty();
      this.model.get('selectedOptions').each(function(ele){
        window.console && console.info(ele);
        _this.$el.find('#selected-options').append(_this.yourOptionsTpl(ele.toJSON()));  
      });
    },
    renderRepairs: function(){
      var _this = this;
      window.console && console.info(this.model.get('selectedRepairs'))
      this.$el.find('#selected-repairs').addClass('selected').html(this.yourRepairsTpl(this.model.toJSON()));
      // this.model.get('selectedRepairs').each(function(ele){
      //   window.console && console.info(ele);
      //   _this.$el.find('#selected-repairs').append(_this.yourRepairsTpl(ele.toJSON()));  
      // });
    }
  });
  return bookingSummary;
});