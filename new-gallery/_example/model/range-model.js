define('models/range-model','main',['jquery','underscore','Backbone','router'], function($,_,Backbone,Router){
	var range;
	range = Backbone.Model.extend({
		initialize: function(src_range){
			var _this = this,
					src_range = 'AU6'; // Will be swapped for Drupal.settings.gallery_widget.RC
					console.info('range model',_this);
			
			Router.initialize();
		}
	});
	return range;
});