define(['backbone', 'register'], function(Backbone, register) {
  var popUpDialog = Backbone.View.extend({
  	el: $('body'),
    events: {
      'click .find-more': 'findOutMore',
      'click .service-tab': 'showContent',
      'click .close-overlay': 'closeOverlay'
    },
    template: _.template(
      $('#find-more').html()
    ),
    findOutMore: function(service){
      var topPos = $(window).scrollTop();
      window.console && console.info(topPos);

      this.$el.prepend(this.template()).find('.pop-wrap, .overlay-bg').addClass('popping');
      this.$('.pop-wrap').css('top', topPos + 40 + 'px');
    },
    showContent: function(e){
      var content = $(e.currentTarget).data('content');

      this.$('.finding-out li').removeClass('active');
      this.$('.finding-out li[data-content="'+content+'"]').addClass('active');
    },
    closeOverlay: function(){
      this.$('.popping').remove();
    }
  });
  return popUpDialog;
})