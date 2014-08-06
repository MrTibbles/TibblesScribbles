define(['models/colour-model'], function(Colour) {
  var Collection = Backbone.Collection.extend({
    model: Colour,
    idAttribute: 'code',
    setSelected: function(selected) {
      this.selected = selected;
      return this.trigger('change:selected', selected);
    },
    getSelected: function() {
      return this.selected;
    }
  });
  return Collection;
});
