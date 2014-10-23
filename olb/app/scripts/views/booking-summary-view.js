define(['backbone', 'register', 'models/vehicle'], function(Backbone, register, vehicle) {
  var bookingSummary = Backbone.View.extend({
    el: $('#summary'),
    events: {
      'click .remove-item': 'removeItem'
    },
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
      window.console && console.info('Summary update: ', this.model);      

      this.checkBooking();

      if(this.model.get('model')){
        $('.service-parent').removeClass('inactive');
        $('#find-service').removeClass('disabled');        

        this.$el.removeClass('empty');    

        this.$el.find('#your-car').html(this.yourCarTpl(this.model.toJSON()));

        this.model.get('bookingDetails').get('mileage') && this.renderService();
      }

      this.checkHeight();
    },
    renderService: function(){
      // this.$('#continue').removeClass('disabled');

      this.$('.mileage').addClass('available');
      this.$('#selected-service').addClass('selected').html(this.yourServicingTpl(this.model.toJSON()));
    },
    clearService: function(){
      this.$('#selected-service').removeClass('selected').empty();
    },
    renderOptions: function(){          
      var _this = this;
      window.console && console.info('Selected: ', register.vehicle.get('selected'));
      window.console && console.info('Selected Options: ', register.vehicle.get('selectedOptions'));

      // this.$('#continue').removeClass('disabled');
      this.$('#selected-options').empty();
      
      register.vehicle.get('selectedOptions').each(function(ele){
        _this.$('#selected-options').append(_this.yourOptionsTpl(ele.toJSON()));  
      });

      this.checkBooking();
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
      this.checkBooking();
    },
    removeItem: function(e){
      var $this = $(e.currentTarget);
      switch($this.data('type')){
        case 'service':
          register.vehicle.get('bookingDetails').clear();
          this.$('#selected-service').removeClass('selected').empty();
          $('li[data-service="car-servicing"]').removeClass('selected');
          break;
        case 'option':
          register.vehicle.get('selected').each(function(ele){
            if(ele.get('title') === $this.data('title')){              
              return register.vehicle.get('selected').remove(ele);
            }
          });
          register.vehicle.get('selectedOptions').each(function(ele){
            if(ele.get('title') === $this.data('title')){
              return register.vehicle.get('selectedOptions').remove(ele);
            }
          });
          this.$('#selected-options li[data-title="'+$this.data('title')+'"]').remove();
          window.console && console.info($this.data('title'), $('li[data-service="'+$this.data('title')+'"]'))
          $('li[data-service="'+$this.data('title')+'"]').removeClass('selected-option selected');
          break;
      }
      window.console && console.info(register.vehicle);
    },
    checkBooking: function(){
      if(this.model.get('model') && register.vehicle.get('selected').length){
        this.$('#continue').removeClass('disabled');
      }else !this.$('#continue').hasClass('disabled') && this.$('#continue').addClass('disabled');
    },
    checkHeight: function(){
      // window.console && console.info('Summary height: ',this.$el.height())
    }
  });
  return bookingSummary;
});