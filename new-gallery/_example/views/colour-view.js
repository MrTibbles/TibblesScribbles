define(['jquery'], function($) {
  var Colour;
  Colour = Backbone.View.extend({
    tagName: 'li',
    className: 'colour',
    template: Handlebars.compile($('#colour-template').html()),
    render: function() {
      this.$el.html(this.template(this.toJSON()));
      return this;
    },
    toJSON: function() {
      return {
        name: this.model.get('name'),
        code: this.model.get('code'),
        className: 'colour-' + this.model.getClassName()
      };
    }
  });
  return Colour;
});
