define(['underscore', 'backbone', 'loader'], function(_, Backbone, loader) {
  var loading_animation = Backbone.View.extend({
  	el: $('#olb-wrap'),
  	options: {
      lines: 12,
      length: 12,
      width: 4,
      radius: 10,
      corners: 1,
      rotate: 35,
      direction: 1,
      color: '#78b1cc',
      speed: 1,
      trail: 53,
      shadow: true,
      hwaccel: false,
      zIndex: 2e9,
      className: 'loading_spinner',
      top: 5,
      left: 'auto'
  	},
  	showLoader: function(target){
  		return this.loader = new loader(this.options).spin(target);
  	},
  	hideLoader: function(){
  		if(!this.loader){
        this.loader = this.$el.find('.loading_spinner');
      }
      this.loader.stop();
  	}
  });
  return loading_animation;
})