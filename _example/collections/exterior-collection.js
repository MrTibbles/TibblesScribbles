define([
  'jquery',
  'underscore', 
  'backbone', 
  // 'libs/backbone/localstorage', 
  'models/exterior'
  ], function($,_,Backbone,exterior){
	  
	var exterior_collection = Backbone.Collection.extend({
    // Reference to this collection's model.
    model: exterior,
    // Save all of the exterior items under the `"exteriors"` namespace.
    localStorage: new Store("exteriors"),

    // Filter down the list of all exterior items that are finished.
    done: function() {
      return this.filter(function(exterior){ return exterior.get('done'); });
    },

    // // Filter down the list to only exterior items that are still not finished.
    // remaining: function() {
    //   return this.without.apply(this, this.done());
    // },

    // We keep the exteriors in sequential order, despite being saved by unordered
    // GUID in the database. This generates the next order number for new items.
    nextOrder: function() {
      if (!this.length) return 1;
      return this.last().get('order') + 1;
    },

    // // exteriors are sorted by their original insertion order.
    // comparator: function(exterior) {
    //   return exterior.get('order');
    // }

  });
  return new exterior_collection;
});