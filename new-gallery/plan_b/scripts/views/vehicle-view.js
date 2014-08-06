define(['underscore', 'backbone', 'app_config', 'models/vehicle-model', 'views/grade-view', 'views/threesixty-view', 'loader'], function(_, Backbone, app_config, vehicle, grade_view, threesixty_view, loader) {
  var vehicles_view = Backbone.View.extend({
    el: $('#main_viewport'),
    model: vehicle,
    events: {
      'click .grade_draw': 'change_spin',
      'click .swatch': 'change_colour',
      'click .body_choice': 'change_body',
      'mouseover .swatch': 'show_tool_tip',
      'mousemove .swatch': 'move_tool_tip'
    },
    template: _.template(
      $('#grade_temp').html()
    ),
    viewport: $('#main_viewport'),
    initialize: function() {
      this.active_grade = null;
      this.active_colour = app_config.colour;
      this.avail_grades = [];
    },
    render: function() {
      this.$el.append('<ul id="grade-list" class="spin_active" />');
      this.$el.append('<ul id="alt-grade-list" class="spin_active" />');

      var _this = this,
        grades = this.model.get('grades');

      this.default_grade = this.model.get_default_grade(this.model);
      // for(idx in bodystyles) {
      $.each(grades, function(idx, grade) {
        return _this.parse_grade(grade, idx);
      });
      // };
      var draw_height = this.$el.outerHeight() - (this.model.get('grade_leng') * this.$el.find('.grade_draw').outerHeight()),
        padding = this.$el.find('.grade_draw').css('padding-top').substring(2, 0);
      // window.console && console.log(padding)
      this.$el.find('.grade_inner').css('height', draw_height - padding)
      return this;
    },
    parse_grade: function(grade, idx) {
      if(grade.name) {
        var grade_draw = new grade_view({
          model: grade
        });
        var default_grade = _.contains(this.default_grade, grade.mach_name),
          _this = this;
        // if(default_grade) {
        //   this.model.set_active_draw(grade);
        // }

        $.each(grade.colours, function(idx, ele) {
          var swatch = _.findWhere(_this.model.get('colours'), {
            code: ele.code
          }).name
          ele.name = swatch;
          ele.mach_name = swatch.replace(' ', '-').toLowerCase();
        })

        if(default_grade) {
          this.model.set_active_draw(grade);
          grade.active_colour = this.active_colour;
          this.active_grade = grade;

          this.active_grade.active_body = app_config.body_id;
          this.model.set('active_grade', this.active_grade)
          this.load_spin();
        }
        // if(!_.contains(this.avail_grades, grade.name) ) {
          // this.avail_grades.push(grade.name);
        this.$('#grade-list').append(grade_draw.render().el);
        // }
      }
    },
    load_spin: function(grade) {
      this.view_port = new threesixty_view({
        model: this.model
      });
      this.viewport.prepend(this.view_port.prepare_spin().el)
    },
    change_spin: function(grade) {
      var _this = this,
        $grade = $(grade.currentTarget);
      if($grade.parent('.grade_handle').hasClass('active_grade')) {
        return false;
      }
      $grade.parents('#grade-list').find('li').removeClass('active_grade');
      $grade.parent('li.grade_handle').addClass('active_grade');     

      var grade_code = $grade.data('grade-code');   
      this.active_grade = _.findWhere(this.model.get('grades'), {
        code: grade_code
      })
      this.active_grade.active_colour = this.active_colour;
      this.active_grade.active_body = this.active_grade.avail_bodies[0];
      this.$('#body_switcher li').eq(0).addClass('active_swatch');

      this.model.set('active_grade', this.active_grade)
      window.console && console.log('new active_grade', this.model)
    },
    change_body: function(body){
      var $body = $(body.currentTarget),
        _this = this;
      if($body.hasClass('active_body')) {
        return false;
      }
      $body.siblings().removeClass('active_body');
      $body.addClass('active_body');

      var body_code = $body.data('body-id');
      this.active_grade.active_body = body_code;
      this.model.set('active_grade', this.active_grade);

      this.view_port.prepare_spin();
    },
    change_colour: function(swatch) {
      var _this = this,
        $swatch = $(swatch.currentTarget);
      if($swatch.hasClass('active_swatch')) {
        return false;
      }
      $swatch.siblings().removeClass('active_swatch');
      $swatch.addClass('active_swatch');

      var swatch_obj = {
        code: $swatch.data('hex'),
        name: $swatch.data('name'),
        mach_name: $swatch.data('name').replace(/ /g, '-').toLowerCase()
      };
      this.active_grade.active_colour = swatch_obj;
      this.model.set('active_grade', this.active_grade);

      this.view_port.prepare_spin();
    },
    show_tool_tip: function(swatch) {
      var _this = this,
        $swatch = $(swatch.currentTarget),
        $tool_tip = $swatch.parents('.grade_handle').find('#tool_tip'),
        tool_tip_text = $swatch.data('name');

      $tool_tip.html('<p>'+tool_tip_text+'</p>');
      $tool_tip.removeClass('hide_tool');
    },
    move_tool_tip: function(e){
      var $tool_tip = $(e.currentTarget).parents('.grade_handle').find('#tool_tip'),
        box_offset = $tool_tip.parent('div').offset(),
        tool_width = $tool_tip.outerWidth(true);

      $tool_tip.css({
        'top': ((e.pageY - box_offset.top) + 18),
        'left': ((e.pageX - box_offset.left) - (tool_width / 2))
      });
      $(e.currentTarget).on('mouseleave', function(){
        $tool_tip.addClass('hide_tool')
      })
    }
  });
  return vehicles_view;
});
