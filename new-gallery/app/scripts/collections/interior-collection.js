define(['jquery', 'backbone', 'models/image-model'], function($, Backbone, img) {
  var exts = Backbone.Collection.extend({
    model: img,
    url: 'http://uat.toyotabeta.co.uk/services/gallery-interior-service.jsonp?range_code=',
    parse: function(response) {
      var ints_arr = [];
      $.each(response, function(idx, ele) {
        // if (!ele.main_image.length) {
        //   return;
        // };
        var int_img = {
          main_src: ele.Main_Image,
          thumb_src: ele.Thumbnail,
          desc: ele.Description,
          title: ele.Name,
          thumb_size: !ele.Thumb_size_Int.length ? 'default' : ele.Thumb_size_Int.replace(/ /g, '-')
        };
        ints_arr.push(new img(int_img))
      });
      return ints_arr;
    },
    sync: function(method, model, options) {
      var _this = this;
      var params = _.extend({
        type: 'GET',
        dataType: 'jsonp',
        url: _this.url + window.Drupal.settings.gallery_widget.RC,
        jsonpCallback: 'interior_imgs',
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
