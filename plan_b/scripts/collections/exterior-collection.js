define(['jquery', 'backbone', 'models/image-model','app_config'], function($, Backbone, ext, app_config) {
  var exts = Backbone.Collection.extend({
    model: ext,
    url: 'http://www.toyota.co.uk/services/gallery-exterior.jsonp?rc=',
    parse: function(response) {
      var exts_arr = [];
      $.each(response, function(idx, ele) {
        var ext_img = {
          main_src: ele.main_image,
          thumb_src: ele.thumbnail,
          desc: ele.description,
          title: ele.title
        };
        if(idx === 0) {
          ext_img.active = true;
        }
        exts_arr.push(new ext(ext_img))
      });
      return exts_arr;
    },
    sync: function(method, model, options) {
      var _this = this;
      var params = _.extend({
        type: 'GET',
        dataType: 'jsonp',
        url: _this.url + app_config.range_code,
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
