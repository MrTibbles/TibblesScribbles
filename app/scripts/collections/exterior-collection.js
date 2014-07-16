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
          title: ele.title
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
        url: _this.url + 'AY5',
        jsonpCallback: 'exterior_imgs',
        processData: true
      }, options);
      return $.ajax(params);
    },
    set_active_img: function(img) {
      this.active = {
        main_src: img.get('main_src'),
        title: img.get('title'),
        desc: img.get('desc'),
        model_ID: img.cid,
        active: true
      };
      img.set('active', true);
    },
    reset_active: function() {
      this.active = null;
    }
  });
  return exts;
})
