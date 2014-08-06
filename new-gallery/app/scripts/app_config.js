define(['jquery'], function($) {
  var name;
  var spin_config = {
    auris: {
      range_code: 'AU6',
      body: '5 Door',
      body_id: 207,
      grade: 'Excel',
      colour: {
        code: '040',
        name: 'pure white'
      },
      img_map: function(spin_view) {
        var img_src = [],
          grade_name = spin_view.model.get('active_grade').name.replace(/\s/g, '').toLowerCase(),
          fuel = 'petrol';

        var colour = _.contains(spin_view.model.get('active_grade').colour_codes, spin_view.model.get('active_grade').active_colour.code) ? spin_view.model.get('active_grade').active_colour.code : spin_view.model.get('active_grade').colours[0].code;
        colour = colour.toLowerCase();

        if(grade_name === 'active' || grade_name === 'icon'){
          img_src.push(grade_name,colour);
        }else{
          img_src.push(grade_name,fuel,colour);
        }
        return img_src.join('-');
      }
    },
    avensis: {
      range_code: 'AV9',
      body: '5 Door',
      body_id: 183,
      grade: 'Excel',
      colour: {
        code: '040',
        name: 'pure white'
      },
      img_map: function(spin_view) {
        var img_src = [],
          grade_name = spin_view.model.get('active_grade').name.replace(/\s/g, '').toLowerCase();
        var colour = _.contains(spin_view.model.get('active_grade').colour_codes, spin_view.model.get('active_grade').active_colour.code) ? spin_view.model.get('active_grade').active_colour.code : spin_view.model.get('active_grade').colours[0].code;
        var body = spin_view.get_bodystyle(spin_view.model.get('active_grade').active_body);
        colour = colour.toLowerCase();

        switch(grade_name){
          case 'active':
          case 'edition':
            grade_name = 't2'
            break;
          case 'icon':
          case 'select':
            grade_name = 'tr'
            break;
          case 'iconplus':
            grade_name = 't4'
            break;
          case 'excel':
            grade_name = 'tspirit'
            break;
          default:
            grade_name = grade_name;
        }
        img_src.push(body,grade_name,colour);        
        return img_src.join('-');
      }
    },
    aygo: {
      range_code: 'AY4',
      body: '5 Door',
      body_id: 207,
      grade: 'Mode',
      colour: {
        code: '2LU',
        name: 'two tone nero blanco'
      },
      img_map: function(spin_view) {
        var img_src = [],
          grade_name = spin_view.model.get('active_grade').name.replace(/\s/g, '').toLowerCase(),
          body = spin_view.get_bodystyle(spin_view.model.get('active_grade').active_body);

        var colour = _.contains(spin_view.model.get('active_grade').colour_codes, spin_view.model.get('active_grade').active_colour.code) ? spin_view.model.get('active_grade').active_colour.code : spin_view.model.get('active_grade').colours[0].code;
        
        colour = colour.toLowerCase();
        body = body.replace('door','dr');
        if(grade_name === 'movewithstyle'){
          grade_name = 'move-with-style';
        }else if(grade_name === 'activeplus'){
          grade_name = 'active-plus';
        }

        img_src.push(grade_name,body,colour);
        return img_src.join('-');
      }
    },
    gt86:{
      range_code: 'GT2',
      body: 'coupe',
      body_id: 201,
      grade: 'gt86',
      colour: {
        code: '37j',
        name: 'Pearl White'
      },
      img_map: function(spin_view) {
        var img_src = [],
          grade_name = spin_view.model.get('active_grade').name.replace(/\s/g, '').toLowerCase();

        var colour = _.contains(spin_view.model.get('active_grade').colour_codes, spin_view.model.get('active_grade').active_colour.code) ? spin_view.model.get('active_grade').active_colour.code : spin_view.model.get('active_grade').colours[0].code;
        colour = colour.toLowerCase();
        img_src.push(colour);
        return img_src;
      }
    },
    hilux: {
      range_code: 'HL9',
      body: 'double cab',
      body_id: 186,
      grade: 'Invincible',
      colour: {
        code: '1h2',
        name: 'deep titanium'
      },
      img_map: function(spin_view) {
        var img_src = [],
          grade_name = spin_view.model.get('active_grade').code.replace(/\s/g, '').toLowerCase(),
          body = spin_view.get_bodystyle(spin_view.model.get('active_grade').active_body);

        switch(grade_name){
          case 'act':
            grade_name = 'hl2';
            break;
          case 'ico':
            grade_name = 'hl3';
            break;
          case 'inv':
            grade_name = 'inv';
          default:
            grade_name = grade_name;
            break;
        }

        var colour = _.contains(spin_view.model.get('active_grade').colour_codes, spin_view.model.get('active_grade').active_colour.code) ? spin_view.model.get('active_grade').active_colour.code : spin_view.model.get('active_grade').colours[0].code;
        colour = colour.toLowerCase();

        img_src.push(grade_name, body, colour);
        return img_src.join('-');
      }
    },
    iq: {
      range_code: 'IQ4',
      body: '3 door',
      body_id: 206,
      grade: 'iQ3',
      colour: {
        code: '1f7',
        name: 'Tyrol Silver'
      },
      img_map: function(spin_view) {
        var img_src = [],
          grade_name = spin_view.model.get('active_grade').code.replace(/\s/g, '').toLowerCase();
        var colour = _.contains(spin_view.model.get('active_grade').colour_codes, spin_view.model.get('active_grade').active_colour.code) ? spin_view.model.get('active_grade').active_colour.code : spin_view.model.get('active_grade').colours[0].code;
        colour = colour.toLowerCase();

        if(grade_name === 'iq1'){
          grade_name = 'iq';
        }

        img_src.push(grade_name,colour);
        return img_src.join('-');
      }
    },
    'land-cruiser':{
      range_code: 'LD2',
      body: 'double cab',
      body_id: 194,
      grade: 'Active',
      colour: {
        code: '040',
        name: 'pure white'
      },
      img_map: function(spin_view) {
        var img_src = [],
          grade_name = spin_view.model.get('active_grade').code.replace(/\s/g, '').toLowerCase(),
          body = spin_view.get_bodystyle(spin_view.model.get('active_grade').active_body);

        var colour = _.contains(spin_view.model.get('active_grade').colour_codes, spin_view.model.get('active_grade').active_colour.code) ? spin_view.model.get('active_grade').active_colour.code : spin_view.model.get('active_grade').colours[0].code;
        colour = colour.toLowerCase();
        
        switch(grade_name){
          case 'act':
            grade_name = 'active';
            break;
          case 'ico':
            grade_name = 'icon';
            break;
          case 'inv':
            grade_name = 'invincible';
            break;
          default:
            grade_name = grade_name;
            break;
        }; 
        body = body.replace('door','dr');
        img_src.push(grade_name,body,colour);
        return img_src.join('-');
      }
    },
    'land-cruiser-v8': {
     range_code: 'LV5',
      body: 'SUV',
      body_id: 196,
      grade: 'V8',
      colour: {
        code: '3Q3',
        name: 'Regency Red'
      },
      img_map: function(spin_view) {
        var colour = _.contains(spin_view.model.get('active_grade').colour_codes, spin_view.model.get('active_grade').active_colour.code) ? spin_view.model.get('active_grade').active_colour.code : spin_view.model.get('active_grade').colours[0].code;
        colour = colour.toLowerCase();

        return colour;
      }
    },
    'prius': {
      range_code: 'PS4',
      body: '5 Door',
      body_id: 207,
      grade: 'T Spirit',
      colour: {
        code: '070',
        name: 'pearl white'
      },
      img_map: function(spin_view) {
        var img_src = [],
          grade_name = spin_view.model.get('active_grade').name.replace(/\s/g, '').toLowerCase();

        var colour = _.contains(spin_view.model.get('active_grade').colour_codes, spin_view.model.get('active_grade').active_colour.code) ? spin_view.model.get('active_grade').active_colour.code : spin_view.model.get('active_grade').colours[0].code;
        colour = colour.toLowerCase();
        
        img_src.push(grade_name, colour);
        return img_src.join('-');
      }
    },
    'priusplus': {
      range_code: 'PM2',
      body: '5 Door',
      body_id: 198,
      grade: 'Excel',
      colour: {
        code: '070',
        name: 'pearl white'
      },
      img_map: function(spin_view) {
        var img_src = [],
          grade_name = spin_view.model.get('active_grade').name.replace(/\s/g, '').toLowerCase();

        var colour = _.contains(spin_view.model.get('active_grade').colour_codes, spin_view.model.get('active_grade').active_colour.code) ? spin_view.model.get('active_grade').active_colour.code : spin_view.model.get('active_grade').colours[0].code;
        colour = colour.toLowerCase();

        img_src.push(grade_name,colour);
        return img_src.join('-');
      }
    },
    'priusplugin': {
      range_code: 'PH1',
      body: '5 Door',
      body_id: 207,
      grade: 'Plug-in',
      colour: {
        code: '070',
        name: 'pearl white'
      },
      img_map: function(spin_view) {
        var colour = _.contains(spin_view.model.get('active_grade').colour_codes, spin_view.model.get('active_grade').active_colour.code) ? spin_view.model.get('active_grade').active_colour.code : spin_view.model.get('active_grade').colours[0].code;
        colour = colour.toLowerCase();
        return colour;
      }
    },    
    rav4: {
      range_code: 'R1V',
      body: '2wd',
      body_id: 196,
      grade: 'icon2wd',
      colour: {
        code: '8V5',
        name: 'Titan blue'
      },
      img_map: function(spin_view) {
        var img_src = [],
          grade_name = spin_view.model.get('active_grade').name.toLowerCase();

        if(grade_name === 'icon 2wd' || grade_name === 'icon awd' || grade_name === 'invincible 2wd' || grade_name === 'invincible awd') {
          grade_name = grade_name.split(' ');
          img_src = img_src.concat(grade_name);
        } else {
          img_src.push(grade_name);
        }
        var colour = _.contains(spin_view.model.get('active_grade').colour_codes, spin_view.model.get('active_grade').active_colour.code) ? spin_view.model.get('active_grade').active_colour.code : spin_view.model.get('active_grade').colours[0].code;
        colour = colour.toLowerCase();

        img_src.push(colour)
        return img_src.join('-');
      }
    },
    verso: {
      range_code: 'CV8',
      body_id: 198,
      grade: 'Active',
      colour: {
        code: '040',
        name: 'Pure White'
      },
      img_map: function(spin_view){
        var img_src = [],
          grade_name = spin_view.model.get('active_grade').name.toLowerCase(),
          colour = _.contains(spin_view.model.get('active_grade').colour_codes, spin_view.model.get('active_grade').active_colour.code) ? spin_view.model.get('active_grade').active_colour.code : spin_view.model.get('active_grade').colours[0].code;
        
        colour = colour.toLowerCase();
        img_src.push(grade_name);
        img_src.push(colour);
        return img_src.join('-');
      }
    },
    yaris: {
      range_code: 'YA7',
      body: '5 Door',
      body_id: 207,
      grade: 'Icon plus',
      colour: {
        code: '1G3',
        name: 'decuma grey'
      },
      img_map: function(spin_view) {
        var img_src = [],
          grade_name = spin_view.model.get('active_grade').name.replace(/\s/g, '').toLowerCase();
        switch(grade_name) {
          case 'active':
            grade_name = 't2';
            break;
          case 'icon':
            grade_name = 'tr';
            break;
          default:
            grade_name = grade_name
            break;
        };
        img_src.push(grade_name);
        var body = spin_view.get_bodystyle(spin_view.model.get('active_grade').active_body);
        img_src.push(body);
        var colour = _.contains(spin_view.model.get('active_grade').colour_codes, spin_view.model.get('active_grade').active_colour.code) ? spin_view.model.get('active_grade').active_colour.code : spin_view.model.get('active_grade').colours[0].code;
        colour = colour.toLowerCase();
        img_src.push(colour);
        return img_src.join('-');
      }
    },
    'yaris-hybrid': {
      range_code: 'YH2',
      body: '5 Door',
      body_id: 63,
      grade: 'Icon',
      colour: {
        code: '070',
        name: 'Pearl White'
      },
      img_map: function(spin_view) {
        var img_src = [],
          grade_name = spin_view.model.get('active_grade').name.replace(/\s/g, '').toLowerCase();
        switch(grade_name) {
          case 'activehybrid':
            grade_name = 't3';
            break;
          case 'iconplushybrid':
            grade_name = 't4';
            break;
          case 'trendhybrid':
            grade_name = 'trend';
            break;
          default:
            grade_name = grade_name
            break;
        }
        img_src.push(grade_name);
        var body;
      }
    }

  };
  name = 'yaris';
  _.each(_.keys(spin_config), function(range) {
    if((new RegExp(range, 'i')).test(document.location.href)) {
      return name = range;
    }
  }, this);
  var result = spin_config[name];
  result.name = name;  
  this.$('body').addClass(name)
  return result;
});
