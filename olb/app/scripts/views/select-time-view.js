define(['backbone', 'register'], function(Backbone, register) {
  var yourCar = Backbone.View.extend({
    el: $('#select-time'),
    events: {
      'click #find-car': 'selectDate',
      'click #remove-car': 'startAgain',
      'change .time-choice': 'getBookingTime'
    },
    initialize: function() {      
      this.vehicle = register.vehicle;
    },
    template: _.template(
      $('#date-time').html()
    ),
    updateProgressBar: function(){
      $('#olb-wrap').find('.progess-bar .second').removeClass('active').addClass('completed');
      $('.progess-bar .third').addClass('active');
    },
    days: ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'],
    months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    bankHolidays: [
      new Date(2015, 11, 28),
      new Date(2015, 11, 25),
      new Date(2015, 7, 31),
      new Date(2015, 4, 25),
      new Date(2015, 4, 04),
      new Date(2015, 3, 06),
      new Date(2015, 3, 03),
      new Date(2015, 0, 01),
      new Date(2014, 11, 26),
      new Date(2014, 11, 25)
    ],
    render: function() {
      var _this = this;
      this.$el.siblings('section').removeClass('current-step');
      this.$el.addClass('current-step');
      this.updateProgressBar();
      register.bookingSummaryView.checkHeight();

      this.$("#service-date").datepicker({
        beforeShowDay: function(date) {
          var day = date.getDay();

          for(var i = 0; i < _this.bankHolidays.length; i++){
            if (date.valueOf() == _this.bankHolidays[i].valueOf()){
              return [false];
            }
          }

          return filterDayOffs(date);
        },
        // onSelect: filterHours,
        onSelect: function(date){
          _this.updateDateDisplay(date);
        },
        firstDay: 1,
        minDate: 1,
        maxDate: 400,
        showButtonPanel: false
      });

      //js function within service_booking.inc that has php within
      // calculateAvailableDays($("#checkbox_MOT").attr("checked"), $("#checkbox_WYW").attr("checked"), $("#checkbox_CD").attr("checked"), $("#checkbox_CC").attr("checked"));
      calculateAvailableDays(
        this.queryOptionsCollection('title', 'mot'),
        register.vehicle.get('customer').get('optionWhileYouWait') === 'Y' ? true : false,
        register.vehicle.get('customer').get('optionCollectDeliver') === 'Y' ? true : false,
        register.vehicle.get('customer').get('optionCourtesyCar') === 'Y' ? true : false
      );

      this.leadTime = getEarliestDay(
        this.queryOptionsCollection('title', 'mot'),
        register.vehicle.get('customer').get('optionWhileYouWait') === 'Y' ? true : false,
        register.vehicle.get('customer').get('optionPickDrop') === 'Y' ? true : false,
        register.vehicle.get('customer').get('optionCourtesyCar') === 'Y' ? true : false
      );


      var now = new Date();
      var d = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      var minDay = 0;
      var bankHolidayDays = 0;

      for(var i = 0; i <= this.leadTime; i++)
      {
        for(var j = 0; j < this.bankHolidays.length; j++)
        {
          var bankHoliday = this.bankHolidays[j];
          if (d.valueOf() == bankHoliday.valueOf()){
            bankHolidayDays++;
          }
        }

        d.setDate(d.getDate()+1);
        if (d.getDay() == 0) d.setDate(d.getDate()+1);
      }

      this.leadTime += bankHolidayDays;

      d = new Date();

      // find the earliest available day assuming the lead time and SLA working days
      for (j=0; j<31; j++) {   // limit the iteration to 31 - just to prevent infinite loop in case there is no working days at all
        if (this.leadTime == 0) break;

        var day = d.getDay();
        //temp fix to make calc load 
        if(window.location.port !== '9000'){
          if (availableDays.indexOf(day) >= 0) this.leadTime--;
        }

        minDay++;
        d.setDate(d.getDate()+1);
      }

      this.$('#service-date').datepicker('option', 'minDate', minDay);
      this.$('#service-date').datepicker('option', 'maxDate', 400);        

      // this.$('#service-date').datepicker({
      //   dateFormat: 'yy/mm/dd',
      //   minDate: '2',
      //   maxDate: '30',
      //   firstDay: '1',
      //   dayNamesMin: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
      //   beforeShow: function(input, inst) {
      //     // $('#ui-datepicker-div').removeClass();
      //     // $('#ui-datepicker-div').addClass('niceform-datepicker');
      //   },
      //   onSelect: function(date){
      //     _this.updateDateDisplay(date);
      //   }
      // });

      var iniDate = this.$('#service-date').datepicker('getDate');
      this.updateDateDisplay(iniDate);

      register.vehicle.get('customer').set({
        dateDay: iniDate.getDate(),
        weekDay: _this.days[iniDate.getDay()],
        month: _this.months[iniDate.getMonth()],
        bookingYear: iniDate.getFullYear(),
        serviceDate: iniDate.getDate() + '/' + (this.months.indexOf(_this.months[iniDate.getMonth()]) + 1) + '/' + iniDate.getFullYear(),
        serviceTime: _this.$('#fsda_hour').val() + ':' + _this.$('#fsda_minute').val()
      });

      this.$el.find('.selected-date').html(this.template(register.vehicle.get('customer').toJSON()));

      this.$('#fsda_hour').change(filterMinutes);

      $('#step-details').removeClass('disabled');
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
    getBookingTime: function(e) {
      var _this = this;

      register.vehicle.get('customer').set({
        serviceTime: _this.$('#fsda_hour').val() + ':' +_this.$('#fsda_minute').val()
      });
    },
    updateDateDisplay: function(date){
      var fullDate = new Date(date),
        _this = this;

      filterHours();
      filterMinutes();

      register.vehicle.get('customer').set({
        serviceDate: fullDate.getDate() + '/' + (this.months.indexOf(_this.months[fullDate.getMonth()]) + 1) + '/' + fullDate.getFullYear(),
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