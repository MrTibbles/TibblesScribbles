define(['underscore', 'backbone', 'models/video-model', 'collections/video-collection'], function(_, Backbone, vid, vids) {
  var video_view = Backbone.View.extend({
    tagName: 'li',
    className: 'vid_thumb_out',
    template: _.template(
      $('#thumb_temp').html()
    ),
    render: function() {
      this.model.set('model_ID',this.model.cid)
      this.$el.html(this.template(this.model.toJSON()));
      return this;
    }
  });
  return video_view;
});
