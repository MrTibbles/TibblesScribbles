define(['underscore', 'backbone', 'models/vehicle-model'], function(_, Backbone, vehicle) {
  var grade_view = Backbone.View.extend({
    tagName: 'li',
    className: 'grade_handle',
    template: _.template(
      $('#grade_temp').html()
    ),
    render: function() {
      this.$el.html(this.template(this.model));
      if(this.model.active === true) {
        this.$el.addClass('active_grade')
      }
      return this;
    }
  });
  return grade_view;
});
