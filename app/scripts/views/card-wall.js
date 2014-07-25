define(['backbone', 'views/loading_animation'], function(Backbone, loader) {
  var card_wall = Backbone.View.extend({
  	el: $('#main_viewport'),  	
    initialize: function(){
      this.loader = new loader;          
    },
  	render: function(target){
      //Shuffle elements prior to rendering the card wall
      this.shuffle_elements();

      var card_wall = new window.freewall(target),
        _this = this;

      card_wall.reset({
        selector: '.thumb_out',
        // animate: true,
        cellW: 180,
        cellH: 180,
        gutterX: 8,
        gutterY: 8,
        onResize: function() {
          card_wall.fitWidth();
        }
      });

      var images = card_wall.container.find('.thumb_out');
      images.find('img').load(function() {
        card_wall.fitWidth();
      });      
    },
    shuffle_elements: function(e){
      var ul = document.getElementById('gallery-thumbs');
      
      window.console && console.info(ul.children.length)

      for (var i = ul.children.length; i >= 0; i--) {
        ul.appendChild(ul.children[Math.random() * i | 0]);
      }
      this.$el.find('ul').show();
      this.loader.hide_loader();
    },
  });
  return card_wall;
})