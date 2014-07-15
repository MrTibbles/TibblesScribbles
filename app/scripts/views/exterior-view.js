define(['underscore', 'backbone', 'models/image-model', 'collections/exterior-collection'], function(_, Backbone, ext, exts) {
  var exterior_view = Backbone.View.extend({
    tagName: 'li',
    className: 'ext_thumb_out',
    template: _.template(
      $('#thumb_temp').html()
    ),
    render: function() {
      this.model.set('model_ID',this.model.cid)
      this.$el.html(this.template(this.model.toJSON()));
      return this;
    }
  });
  return exterior_view;
});
