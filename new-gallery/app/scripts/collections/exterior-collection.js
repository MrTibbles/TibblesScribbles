define(['jquery', 'backbone', 'models/image-model'], function($, Backbone, img) {
  var exts = Backbone.Collection.extend({
    model: img,
    url: 'http://127.0.0.1/services/gallery-exterior.jsonp?rc=',
    parse: function(response) {
      var exts_arr = [];
      $.each(response, function(idx, ele) {
        if (!ele.main_image.length) {
          return;
        };
        var ext_img = {
          main_src: ele.main_image,
          thumb_src: ele.thumbnail,
          desc: ele.description,
          title: ele.title,
          thumb_size: !ele.thumb_size.length ? 'default' : ele.thumb_size.replace(/ /g, '-')
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
