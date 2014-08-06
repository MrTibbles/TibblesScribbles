define(['backbone'], function(Backbone) {
  var exterior_view = Backbone.View.extend({
    tagName: 'li',
    className: 'thumb_out',
    template: _.template(
      $('#thumb_temp').html()
    ),
    render: function() {
      this.model.set('model_ID',this.model.cid)
      this.$el.html(this.template(this.model.toJSON()));

      this.$el.attr({
        'id': this.model.cid,
        'class': this.model.get('thumb_size') +' '+'ext_thumb thumb_out'
      });

      return this;
    }
  });
  return exterior_view;
});
