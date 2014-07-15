define(['jquery', 'backbone','app_config'], function($, Backbone, app_config) {
  var cars = Backbone.Model.extend({
    url: '/vehicle-data/',
    parse: function(response) {
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
        swatch.name = swatch.name.replace('GT86 ','')
        swatch.code = ele.code;
        car.colours.push(swatch);
      });  
      var _this = this;         
      $.each(response.bodyStyles, function(bod_idx, body_ele){
        $.each(body_ele.grades, function(idx, grade_ele) {
          if(!_.contains(car.avail_grades, grade_ele.name) ) {            
            car.avail_grades.push(grade_ele.name);
            car.grade_leng++;     

            var grade = {},
              matched_price;
            grade.colours = [];
            grade.colour_codes = [];
            grade.avail_bodies = [body_ele.id];

            grade.code = grade_ele.code;
            grade.name = grade_ele.name;
            grade.mach_name = grade_ele.name.split(' ').join('').toLowerCase();
            // grade.body_id = body_ele.id;          
            grade.order = grade_ele.order;
            grade.active = false;            
            grade.mdata = _this.mdata_to_data(grade_ele.mdata[0].expanded);       
            
            $.each(window.prices_arr, function(idx, ele){
              var tcw_body_code = parseInt(ele.bodyCode),
                new_body_code;
              switch(tcw_body_code){
                case 58:
                  new_body_code = 208;
                  break;
                case 60:
                case 61:
                  new_body_code = 206;
                  break;
                case 62:
                case 63:
                  new_body_code = 207;
                  break;
                case 72:
                  new_body_code = 201;
                  break;
                case 85:
                  new_body_code = 198;
                  break;                                              
                case 87:
                  new_body_code = 198;
                  break;
                case 90:
                  new_body_code = 194;
                  break;
                case 93:
                case 95:
                  new_body_code = 196;
                  break;
                case 147:
                  new_body_code = 184;
                  break;
                case 145:
                  new_body_code = 186;
                  break;
                case 146:
                  new_body_code = 185;
                  break;
                case 151:
                  new_body_code = 183;
                  break;  
                default:
                  new_body_code = tcw_body_code;
                  break;
              };
              if(ele.gradeDesc === grade.name && new_body_code === body_ele.id || ele.gradeCode === grade.code && new_body_code === body_ele.id){
                matched_price = ele.listPrice;
              }
            });
            grade.price = _this.tidy_price(Number(matched_price));

            $.each(grade_ele.enginesTransmissions[0].colours, function(idx, ele) {
              var colour = {};
              colour.code = ele;
              grade.colours.push(colour);
              return grade.colour_codes.push(colour.code)
            });          
            return car.grades.push(grade);
          }else{
            var parent_grade_idx = _.indexOf(car.avail_grades, grade_ele.name);
            return car.grades[parent_grade_idx].avail_bodies.push(body_ele.id)            
          }
        })        
      });
      return car;
    },
    sync: function(method, model, options) {
      var _this = this;
      var params = _.extend({
        type: 'GET',
        dataType: "json",
        error: function(a,b,c){
          window.console && console.error(a,b,c)
        },
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
  return cars;
});
