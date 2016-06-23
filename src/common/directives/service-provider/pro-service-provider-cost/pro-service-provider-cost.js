(function() {
  function proServiceProviderCost($q, $timeout) {

    function linkFunction(scope, element, attrs) {

      scope.required = false
      scope.noCost = false

      scope.model = {
        cost: ''
      }

      scope.costSummary = 'DASHBOARD.CONSULTATION_RANGE.COST_SUMMARY'
      scope.translationUrl = {
        hrefUrl: 'http://miroslawkwiatek.republika.pl/pdf_y/grawitacja_kwantowa.pdf'
      }


      scope.model.cost = parseFloat(scope.proModel.cost / 100) || ''

      let _isValid = () => {
        let _isValidDeferred = $q.defer()
        if (angular.isDefined(scope.model.cost) && scope.model.cost > 0) {
          _isValidDeferred.resolve()
        } else {
          _isValidDeferred.reject()
        }

        return _isValidDeferred.promise
      }



      let _displayErrorMessage = () => {
        scope.noCost = true
      }


      if ('required' in attrs) {
        scope.required = true
      }

      scope.$watch(() => {
        return scope.model.cost
      }, (newValue, oldValue) => {
        if (newValue !== undefined && typeof newValue !== 'number') {
          scope.model.cost = scope.model.cost.replace(',', '.')
        }
      }, true)

      scope.saveSection = () => {
        scope.noCost = false
        _isValid().then(() => {

          scope.proModel.cost = scope.model.cost * 100
          scope.proceed()

        }, () => {
          _displayErrorMessage()
        })
      }


    }


    return {
      replace: true,
      restrict: 'E',
      templateUrl: 'directives/service-provider/pro-service-provider-cost/pro-service-provider-cost.tpl.html',
      scope: {
        queue: '=',
        order: '=?',
        proModel: '=',
        trTitle: '@',
        trDesc: '@',
        placeholder: '@',
        summaryText: '@',
        list: '=',
        errorMessage: '@'
      },
      link: linkFunction,
      controller: 'ServiceProviderStepController',
      controllerAs: 'vm'
    }
  }

  angular.module('profitelo.directives.service-provider.pro-service-provider-cost', [
    'lodash',
    'pascalprecht.translate',
    'profitelo.common.controller.service-provider.service-provider-step-controller'
  ])
  .directive('proServiceProviderCost', proServiceProviderCost)
}())
