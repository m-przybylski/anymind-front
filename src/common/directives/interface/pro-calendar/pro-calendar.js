function proCalendar() {

  function linkFunction(scope, element, attr) {
    scope.today = function() {
      scope.dt = new Date()
    }
    scope.today()

    scope.clear = function() {
      scope.dt = null
    }

    function getDayClass(data) {
      var date = data.date,
        mode = data.mode
      if (mode === 'day') {
        var dayToCheck = new Date(date).setHours(0, 0, 0, 0)

        for (var i = 0; i < scope.events.length; i++) {
          var currentDay = new Date(scope.events[i].date).setHours(0, 0, 0, 0)

          if (dayToCheck === currentDay) {
            return scope.events[i].status
          }
        }
      }
      return ''
    }

    scope.inlineOptions = {
      customClass: getDayClass,
      minDate: new Date(),
      showWeeks: false
    }

    scope.dateOptions = {
      formatYear: 'yy',
      maxDate: new Date(2020, 5, 22),
      startingDay: 1,
      showWeeks: false
    }


    scope.toggleMin = function() {
      scope.inlineOptions.minDate = scope.inlineOptions.minDate ? null : new Date()
      scope.dateOptions.minDate = scope.inlineOptions.minDate
    }

    scope.toggleMin()

    scope.open1 = function() {
      scope.popup1.opened = true
    }

    scope.open2 = function() {
      scope.popup2.opened = true
    }

    scope.setDate = function(year, month, day) {
      scope.dt = new Date(year, month, day)
    }

    scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate']
    scope.format = scope.formats[2]
    scope.altInputFormats = ['M!/d!/yyyy']

    scope.popup1 = {
      opened: false
    }

    scope.popup2 = {
      opened: false
    }

    var tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate() + 1)
    var afterTomorrow = new Date()
    afterTomorrow.setDate(tomorrow.getDate() + 1)
    scope.events = [
      {
        date: tomorrow,
        status: 'full'
      },
      {
        date: afterTomorrow,
        status: 'partially'
      }
    ]

  }



  return {
    templateUrl:  'directives/interface/pro-calendar/pro-calendar.tpl.html',
    restrict:     'E',
    replace:      true,
    link: linkFunction,
    scope: {
      proModel: '=',
      placeholder: '@',
      defaultValue: '@',
      label: '@'
    }

  }

}

angular.module('profitelo.directives.interface.pro-calendar', [])
  .directive('proCalendar', proCalendar)