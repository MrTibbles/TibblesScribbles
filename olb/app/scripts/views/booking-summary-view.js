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
    	window.console && console.info('Summary update: ', this.model);

    	this.$el.find('#your-car').html(this.yourCarTpl(this.model.toJSON()));

      this.model.get('bookingDetails').get('mileage') && this.renderService();
    },
    renderService: function(){
      this.$('#continue').removeClass('disabled');

      this.$('.mileage').addClass('available');
      this.$('#selected-service').addClass('selected').html(this.yourServicingTpl(this.model.toJSON()));
    },
    renderOptions: function(){          
      var _this = this;
      window.console && console.info('Selected: ', register.vehicle.get('selected'));
      window.console && console.info('Selected Options: ', register.vehicle.get('selectedOptions'));      

      this.$('#continue').removeClass('disabled');
      this.$('#selected-options').empty();
      
      register.vehicle.get('selectedOptions').each(function(ele){
        _this.$('#selected-options').append(_this.yourOptionsTpl(ele.toJSON()));  
      });
    },
    renderRepairs: function(){
      var _this = this;
      window.console && console.info('Selected: ', register.vehicle.get('selected'));
      window.console && console.info('Selected Repairs: ', register.vehicle.get('selectedRepairs'))

      if(register.vehicle.get('selectedRepairs').length){
        this.$('#selected-repairs').addClass('selected').html(this.yourRepairsTpl(register.vehicle.toJSON()));
      }else{
        this.$('#selected-repairs').removeClass('selected').empty();
      }
      // this.model.get('selectedRepairs').each(function(ele){
      //   window.console && console.info(ele);
      //   _this.$el.find('#selected-repairs').append(_this.yourRepairsTpl(ele.toJSON()));  
      // });
    }
  });
  return bookingSummary;
});