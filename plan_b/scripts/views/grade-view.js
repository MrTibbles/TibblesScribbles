define(['underscore', 'backbone', 'models/vehicle-model'], function(_, Backbone, vehicle) {
  var grade_view = Backbone.View.extend({
    tagName: 'li',
    className: 'grade_handle',
    template: _.template(
      $('#grade_temp').html()
    ),
    render: function() {
      this.model.price = this.tidy_price(this.model.price);
      this.$el.html(this.template(this.model));
      if(this.model.active === true) {
        this.$el.addClass('active_grade')
      }
      return this;
    },
    tidy_price: function(p) {
      String.prototype.splice = function (idx, rem, s) {
        return(this.slice(0, idx) + s + this.slice(idx + Math.abs(rem)));
      };

      var p_str = Math.abs(p).toString(), tidy_price;
      switch(true) {
        case p_str.length === 4:
          tidy_price = p_str.splice(1, 0, ',');
          break;
        case p_str.length === 5:
          tidy_price = p_str.splice(2, 0, ',');
          break;
        case p_str.length === 6:
          tidy_price = p_str.splice(3, 0, ',');
          break;
      };
      return tidy_price;
    }
  });
  return grade_view;
});
