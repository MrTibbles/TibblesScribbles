define(['jquery', 'backbone', 'models/image-model'], function($, Backbone, img) {
  var exts = Backbone.Collection.extend({
    model: img,
    url: 'http://toyota.prod/services/gallery-exterior-service.jsonp?range_code=',
    parse: function(response) {
      var exts_arr = [];
      $.each(response, function(idx, ele) {
        if (!ele.Main_Image.length) {
          return;
        };
        var ext_img = {
          main_src: ele.Main_Image,
          thumb_src: ele.Thumbnail,
          desc: ele.Description,
          title: ele.Name,
          thumb_size: !ele.Thumb_size_ext.length ? 'default' : ele.Thumb_size_ext.replace(/ /g, '-')
        };
        exts_arr.push(new img(ext_img))
      });
      return exts_arr;
    },
    sync: function(method, model, options) {
      var _this = this;
      var params = _.extend({
        type: 'GET',
        dataType: 'jsonp',
        url: _this.url + window.Drupal.settings.gallery_widget.RC,
        jsonpCallback: 'exterior_imgs',
        processData: true
      }, options);
      return $.ajax(params);
    },
    set_active_img: function(img) {
      img.set('active', true);
    },
    reset_active: function() {
      this.active = null;
    }
  });
  return exts;
})
