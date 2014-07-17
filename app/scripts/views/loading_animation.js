define(['underscore', 'backbone', 'loader'], function(_, Backbone, loader) {
  var loading_animation = Backbone.View.extend({
  	el: $('#gallery-wrap'),
  	options: {
      lines: 12,
      length: 12,
      width: 4,
      radius: 10,
      corners: 1,
      rotate: 35,
      direction: 1,
      color: '#FD532E',
      speed: 1,
      trail: 53,
      shadow: true,
      hwaccel: false,
      zIndex: 2e9,
      className: 'loading_spinner',
      top: 'auto',
      left: 'auto'
  	},
  	show_loader: function(target){
  		return this.loader = new loader(this.options).spin(target);
  	},
  	hide_loader: function(){
  		this.loader.stop();
  	}
  });
  return loading_animation;
})