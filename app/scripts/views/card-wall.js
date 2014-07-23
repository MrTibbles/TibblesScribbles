define(['backbone'], function(Backbone) {
  var card_wall = Backbone.View.extend({
  	el: $('#main_viewport'),  	
  	render: function(target){
      var card_wall = new window.freewall(target),
        _this = this;

      card_wall.reset({
        selector: '.thumb_out',
        // animate: true,
        // cellW: 150,
        // cellH: 'auto',
        onResize: function() {
          card_wall.fitWidth();
        }
      });

      var images = card_wall.container.find('.thumb_out');
      images.find('img').load(function() {
        card_wall.fitWidth();
      });
    }
  });
  return card_wall;
})