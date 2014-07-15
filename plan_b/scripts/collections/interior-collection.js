define(['jquery', 'backbone', 'models/image-model','app_config'], function($, Backbone, img, app_config) {
  var exts = Backbone.Collection.extend({
    model: img,
    url: 'http://www.toyota.co.uk/services/gallery-interior.jsonp?rc=',
    parse: function(response) {
      var ints_arr = [];
      $.each(response, function(idx, ele) {
        var int_img = {
          main_src: ele.main_image,
          thumb_src: ele.thumbnail,
          desc: ele.description,
          title: ele.title
        };
        if(idx === 0) {
          int_img.active = true;
        }
        ints_arr.push(new img(int_img))
      });
      return ints_arr;
    },
    sync: function(method, model, options) {
      var _this = this;
      var params = _.extend({
        type: 'GET',
        dataType: 'jsonp',
        url: _this.url + app_config.range_code,
        jsonpCallback: 'interior_imgs',
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
