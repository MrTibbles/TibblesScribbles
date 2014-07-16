define(['underscore', 'backbone'], function(_, Backbone) {
  var interior_view = Backbone.View.extend({
    tagName: 'li',
    className: 'int_thumb_out',
    template: _.template(
      $('#thumb_temp').html()
    ),
    render: function() {
      this.model.set('model_ID',this.model.cid)
      this.$el.html(this.template(this.model.toJSON()));
      return this;
    }
  });
  return interior_view;
});
