(function() {
  function proTextarea() {

    function linkFunction(scope: any, element: ng.IRootElementService, attr: ng.IAttributes) {

      scope.required = false
      scope.focus = false
      scope.onClick = false
      let placeholder = scope.placeholder
      let _inputGroup = $(element)


      if ('required' in attr.$attr) {
        scope.required = true
      }

      if ('autoFocus' in attr.$attr) {
        _inputGroup.find('input').focus()
      }



      scope.focusInput = () => {
        _inputGroup.find('input').focus()
      }

      $(element).on('click', scope.focusInput)

      scope.onFocus = () => {
        scope.focus = true
        scope.onClick = true
        scope.placeholder = ''
      }
      scope.onFocusOut = () => {
        scope.focus = false
        scope.onClick = false
        scope.placeholder = placeholder
      }

      scope.onMouseover = ()=> {
        scope.focus = true
      }
      scope.onMouseout = ()=> {
        if (!scope.onClick) {
          scope.focus = false
        }
      }
    }

    return {
      template: require('./pro-textarea.jade')(),
      restrict: 'E',
      replace: true,
      link: linkFunction,
      scope: {
        ngModel: '=',
        placeholder: '@',
        defaultValue: '@',
        name: '@',
        maxlength: '@',
        ngPattern: '=?'
      }

    }

  }

  angular.module('profitelo.directives.interface.pro-textarea', [])
  .directive('proTextarea', proTextarea)

}())
