define(['backbone', 'register'], function(Backbone, register) {
  var yourCar = Backbone.View.extend({
    el: $('#select-time'),
    events: {
      'click #find-car': 'selectDate',
      'click #remove-car': 'startAgain'
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
        serviceDate: iniDate,
        dateDay: iniDate.getDate(),
        weekDay: _this.days[iniDate.getDay()],
        month: _this.months[iniDate.getMonth()],
        bookingYear: iniDate.getFullYear(),
        serviceTime: _this.$('#fsda_hour').val() + ':' +_this.$('#fsda_minute').val()
      });

      this.$el.find('.selected-date').html(this.template(register.vehicle.get('customer').toJSON()));
    },
    updateDateDisplay: function(date){
      var fullDate = new Date(date),
        _this = this;

      register.vehicle.get('customer').set({
        serviceDate: fullDate,
        serviceTime: _this.$('#fsda_hour').val() + ':' +_this.$('#fsda_minute').val(),
        dateDay: fullDate.getDate(),
        weekDay: _this.days[fullDate.getDay()],
        month: _this.months[fullDate.getMonth()],
        bookingYear: fullDate.getFullYear()        
      });

      this.$el.find('.selected-date').html(this.template(register.vehicle.get('customer').toJSON()));
    }
  });
  return yourCar;
});