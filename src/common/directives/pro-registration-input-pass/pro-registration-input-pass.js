function proProgressBox() {
  var vm = this
  return vm

}

angular.module('profitelo.directives.pro-registration-input-pass', [])
.directive('proRegistrationInputPass', () =>{
  function linkFn(scope, element) {
    var _input = element.find('input')
    _input.bind('focus', () => {
      element.addClass('selected')
    })
    _input.bind('blur', () => {
      element.removeClass('selected')
    })

  }
  return {
    templateUrl:  'directives/pro-registration-input-pass/pro-registration-input-pass.tpl.html',
    restrict:     'A',
    scope:        { name:       '@',
                    labelIcon:  '@',
                    form:       '=',
                    inputValue: '=',
                    maxLength:  '=',
                    minLength:  '=',
                    pattern:    '='
                  },
    link:         linkFn
  }
})

