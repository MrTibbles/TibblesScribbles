define(['backbone', 'register'], function(Backbone, register) {
  var fixedRepair = Backbone.View.extend({
    el: $('#olb-content'),
    events: {
    	'click .repair-item': 'addRepair',
    	'click .repair-selected': 'removeRepair'
    },
    template: _.template(
    	$('#fixed-repair-list').html()
  	),
    initialize: function() {},
    render: function(parent){
    	var _this = this;
      
      this.$(parent).find('.repair-choices').empty();

      this.$(parent).find('.repair-choices').prepend(this.template(register.vehicle.toJSON()));

      this.$(parent).find('.repair-choices').append('<br class="clear"/>')

      !register.vehicle.get('selectedRepairs').length && this.$('li[data-service="repairs"]').removeClass('selected-option show-inner');
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
          return register.vehicle.get('selected').remove(element);
          // return register.vehicle.get('selectedRepairs').remove(element);
        }
      });

      this.filteredRepairs = register.vehicle.get('selectedRepairs').filter(function(repair){
        return repair.get('title') !== item;
      });
      this.selectedRepairs = new Backbone.Collection(this.filteredRepairs);
      //reset selectRepair collection with users new filtered collection
      register.vehicle.set('selectedRepairs', this.selectedRepairs);

      register.bookingSummaryView.renderRepairs();
    },
    addRepair: function(e){
			var $this = $(e.currentTarget),
    		selectedRepairs, 
    		_this = this;

  		_.each(this.collection, function(ele){
  			if($this.data('repair') === ele.get('title')){
  				return _this.addItem(ele);
  			}
  		});

      $(e.currentTarget).removeClass('repair-item').addClass('repair-selected');
      !this.$('li[data-service="repairs"]').hasClass('selected-option') && this.$('li[data-service="repairs"]').addClass('selected-option');
    },
    removeRepair: function(e){
    	var $this = $(e.currentTarget);
      
      this.removeItem($this.data('repair'));
    	
    	$(e.currentTarget).removeClass('repair-selected').addClass('repair-item');
      !$(e.currentTarget).siblings('li').hasClass('repair-selected') && this.$('li[data-service="repairs"]').removeClass('selected-option');
    } 
  });
  return fixedRepair;
});