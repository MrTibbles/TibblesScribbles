define(['backbone', 'register'], function(Backbone, register) {
  var yourCar = Backbone.View.extend({
    el: $('#select-time'),
    events: {
      'click #find-car': 'selectDate',
      'click #remove-car': 'startAgain',
      'change #fsda_hour': 'filterMinutes'
    },
    initialize: function() {      
      this.vehicle = register.vehicle;
    },
    template: _.template(
      $('#date-time').html()
    ),
    updateProgressBar: function(){
      $('#olb-wrap').find('.progess-bar .second').addClass('completed');
      $('.progess-bar .third').addClass('active');
    },
    days: ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'],
    months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    render: function(){
      //js function within service_booking.inc that has php within
      // calculateAvailableDays($("#checkbox_MOT").attr("checked"), $("#checkbox_WYW").attr("checked"), $("#checkbox_CD").attr("checked"), $("#checkbox_CC").attr("checked"));
      calculateAvailableDays(
        this.queryOptionsCollection('title', 'mot'),
        register.vehicle.get('customer').get('optionWhileYouWait') === 'Y' ? true : false,
        register.vehicle.get('customer').get('optionPickDrop') === 'Y' ? true : false,
        register.vehicle.get('customer').get('optionCourtesyCar') === 'Y' ? true : false
      );

      var _this = this;
      this.$el.siblings('section').removeClass('current-step');
      this.$el.addClass('current-step');
      this.updateProgressBar();    

      this.$('#service-date').datepicker({
        dateFormat: 'yy/mm/dd',
        minDate: '2',
        maxDate: '30',
        firstDay: '1',
        dayNamesMin: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
        beforeShow: function(input, inst) {
          // $('#ui-datepicker-div').removeClass();
          // $('#ui-datepicker-div').addClass('niceform-datepicker');
        },
        onSelect: function(date){          
          _this.updateDateDisplay(date);
        }
      });

      var iniDate = this.$('#service-date').datepicker("getDate");

      register.vehicle.get('customer').set({
        dateDay: iniDate.getDate(),
        weekDay: _this.days[iniDate.getDay()],
        month: _this.months[iniDate.getMonth()],
        bookingYear: iniDate.getFullYear(),
        serviceDate: iniDate.getDate() + '/' + this.months.indexOf(_this.months[iniDate.getMonth()]) + '/' + iniDate.getFullYear(),
        serviceTime: _this.$('#fsda_hour').val() + ':' +_this.$('#fsda_minute').val()
      });

      this.$el.find('.selected-date').html(this.template(register.vehicle.get('customer').toJSON()));

      this.$('#fsda_hour')  
    },
    queryOptionsCollection: function(key, parameter) {
      var result;
      if (key) {
        register.vehicle.get('selectedOptions').find(function(model) {
          if (model.get(key).toLowerCase() === parameter) {
           return result = true;
          }else return result = false;
        });
        return result;
      }
    },
    updateDateDisplay: function(date){
      var fullDate = new Date(date),
        _this = this;

      register.vehicle.get('customer').set({
        serviceDate: fullDate.getDate() + '/' + this.months.indexOf(_this.months[fullDate.getMonth()]) + '/' + fullDate.getFullYear(),
        serviceTime: _this.$('#fsda_hour').val() + ':' +_this.$('#fsda_minute').val(),
        dateDay: fullDate.getDate(),
        weekDay: _this.days[fullDate.getDay()],
        month: _this.months[fullDate.getMonth()],
        bookingYear: fullDate.getFullYear()        
      });

      this.$el.find('.selected-date').html(this.template(register.vehicle.get('customer').toJSON()));
    },
    filterMinutes: function(){
      // filter available minutes options according to selected hour.
      var hour_select = this.$('#fsda_hour');
      var range_hours = hour_select.data("range_hours");
      var range_minutes = hour_select.data("range_minutes");
      var selected_hour = parseInt(hour_select.val(),10);
      var minutes_options = [];

      if (selected_hour == range_hours.minH) {
          for (var i = range_minutes.minM, j = 45; i <=j ; i+=15) {
              minutes_options.push(i);
          };
      }else if (selected_hour == range_hours.maxH) {
          for (var i = 0, j = range_minutes.maxM; i <=j ; i+=15) {
              minutes_options.push(i);
          };
      }else{
          minutes_options = [0,15,30,45];
      }
  
      this.$('#fsda_minute').empty();
      for (var i = 0, j = minutes_options.length - 1; i <= j; i++) {
          var display_val = (minutes_options[i] < 10) ? "0" + minutes_options[i] : minutes_options[i];
          $('<option/>')
              .attr('value', display_val)
              .text(display_val)
              .appendTo('#fsda_minute');
      };
    }
  });
  return yourCar;
});