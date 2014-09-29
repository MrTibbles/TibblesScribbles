define(['backbone', 'register'], function(Backbone, register) {
  var fixedRepair = Backbone.View.extend({
    el: $('#repair-choices'),
    events: {
    	'click .repair-item': 'addRepair',
    	'click .repair-selected': 'removeRepair'
    },
    template: _.template(
    	$('#fixed-repair-list').html()
  	),
    initialize: function() {},
    render: function(){
    	var _this = this;

    	this.$el.prepend(this.template(register.vehicle.toJSON()));
    },
    addItem: function(item){
      register.vehicle.get('selected').add(item);
      register.vehicle.get('selectedRepairs').add(item);

      register.bookingSummaryView.renderRepairs();
    },
    removeItem: function(item){
      var _this = this;

      register.vehicle.get('selected').each(function(element){
      	window.console && console.info(element.get('title'))
        if(element.get('title') === item){
          register.vehicle.get('selected').remove(element);
          return register.vehicle.get('selectedRepairs').remove(element);
        }
      });
      register.bookingSummaryView.renderRepairs();
    },
    addRepair: function(e){
			var $this = $(e.currentTarget),
    		selectedRepairs, 
    		_this = this

  		_.each(this.collection, function(ele){
  			if($this.data('repair') === ele.get('title')){
  				return _this.addItem(ele);
  			}
  		});

      $(e.currentTarget).removeClass('repair-item').addClass('repair-selected');
    },
    removeRepair: function(e){
    	var $this = $(e.currentTarget);
      
      this.removeItem($this.data('repair'));
    	
    	$(e.currentTarget).removeClass('repair-selected').addClass('repair-item');
    } 
  });
  return fixedRepair;
});