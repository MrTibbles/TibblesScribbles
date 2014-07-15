define(['jquery', 'backbone','app_config'], function($, Backbone, app_config) {
  var cars = Backbone.Model.extend({
    url: 'rest/',
    parse: function(response) {
      // window.console && console.log('RAW car data ',response)
      var car = {
        range: response.rangecode,
        model_name: response.name,
        // bodystyles: {},
        grades: [],
        avail_grades: [],
        colours: [],
        grade_leng: 0,
        model_ID: response.id
      };
    
      $.each(response.colours, function(idx, ele){
        var swatch = {};
        swatch.name = ele.name;
        swatch.code = ele.code;
        car.colours.push(swatch);
      });  
      var _this = this;

      $.each(response.bodyStyles, function(bod_idx, body_ele){
        $.each(body_ele.grades, function(idx, grade_ele) {
          if(!_.contains(car.avail_grades, grade_ele.name) ) {
            car.avail_grades.push(grade_ele.name);
            car.grade_leng++;     

            var grade = {};
            grade.colours = [];
            grade.colour_codes = [];
            grade.avail_bodies = [body_ele.id];

            grade.code = grade_ele.code;
            grade.name = grade_ele.name;
            grade.mach_name = grade_ele.name.split(' ').join('').toLowerCase();
            // grade.body_id = body_ele.id;          
            grade.order = grade_ele.order;
            grade.active = false;
            grade.price = Number(grade_ele.price);
            grade.mdata = _this.mdata_to_data(grade_ele.mdata[0].expanded);        
            
            $.each(grade_ele.enginesTransmissions[0].colours, function(idx, ele) {
              var colour = {};
              colour.code = ele;
              grade.colours.push(colour);
              return grade.colour_codes.push(colour.code)
            });          
            return car.grades.push(grade);
          }else{
            var parent_grade_idx = _.indexOf(car.avail_grades, grade_ele.name);
            car.grades[parent_grade_idx].avail_bodies.push(body_ele.id)
          }
        })        
      });
      return car;
    },
    sync: function(method, model, options) {
      var _this = this;
      var params = _.extend({
        type: 'GET',
        // dataType: "jsonp",
        // jsonpCallback: "request_vehicle",
        url: _this.url + app_config.range_code + '.json'
      }, options);

      return $.ajax(params);
    },
    mdata_to_data: function(mdata) {
      var result;
      result = _.map(_.without(_.unescape(mdata).replace(/\n/g, ': ').replace(/<sub>/, 'SUB1').replace(/<\/sub>/, 'SUB2').replace(/<.*?>/g, "|").replace(/SUB1/, '<sub>').replace(/SUB2/, '</sub>').split("|"), ''), function(value) {
        return value.replace(/^\s+|\s+$/g, '').replace(/\:$/, '');
      });
      result = _.filter(result, function(val) {
        return val.length > 2;
      });
      return result;
    },
    get_default_grade: function(vehicle){
      var default_spin = [app_config.grade.replace(' ','').toLowerCase()];
      //app_config.body.replace(' ','').toLowerCase(),app_config.colour.code.toLowerCase()];
      var body = app_config.body ? app_config.body.replace(' ','').toLowerCase() : null;
      body && default_spin.push(body);
      default_spin.push(app_config.colour.code.toLowerCase());
      return default_spin;
    },
    get_grades: function(vehicle){
      window.console && console.log('getting grades ',vehicle)
    },
    set_active_draw: function(grade){            
      return grade.active = true;
      // window.console && console.log('active ',grade)
    },
    set_active_grade: function(grade){
      window.console && console.log('active model',this, grade)
    }
  });
  return cars;
});
