(function() {
  function ServiceProviderStepController($scope, $timeout, $rootScope, smoothScrolling) {

    let shadowModel = null

    $scope.saveShadowModel = () => {
      shadowModel = angular.copy($scope.model)
    }

    $scope.restoreShadowModel = () => {
      /* Przy polach z ui-selectem wurzuca błąd bo funkcja restore odpala się na select */
      if (shadowModel !== null) {
        $scope.model = angular.copy(shadowModel)
      }

    }

    $scope.proceed = () => {
      if ($scope.queue.completedSteps < $scope.order) {
        $scope.queue.completedSteps = $scope.order
      }
      $scope.queue.currentStep = $scope.order + 1

      if ($scope.queue.currentStep <= $scope.queue.amountOfSteps) {
        $timeout(()=>{
          smoothScrolling.scrollTo($scope.queue.currentStep)
        })
      }
    }


    $scope.skip = () => {

      $scope.queue.skippedSteps[$scope.order] = true
      if (shadowModel !== null) {
        $scope.restoreShadowModel()
      }
      $scope.proceed()

      for (let property in $scope.clearError) {
        if ($scope.clearError.hasOwnProperty(property)) {
          $scope.clearError[property] = false
        }
      }
    }

    $scope.outClick = () => {
      $scope.queue.skippedSteps[$scope.order] = false
      $scope.restoreShadowModel()
    }

    $scope.saveStep = () => {
      $scope.queue.skippedSteps[$scope.order] = false
      $scope.saveSection()
    }

    $scope.onClick = (order) => {
      if (angular.isDefined(order)) {
        $rootScope.$broadcast('manualOrderChangeRequest', order)
      }
    }

    $scope.$on('manualOrderChangeRequestGrant', (event, targetStep) => {
      if ($scope.order === targetStep) {
        $scope.saveShadowModel()
        $scope.queue.currentStep = $scope.order
      }
    })

    $scope.$on('manualOrderChangeRequest', (event, targetStep) => {
      if ($scope.order === $scope.queue.currentStep && targetStep !== $scope.order) {
        $scope.outClick()
        $rootScope.$broadcast('manualOrderChangeRequestGrant', targetStep)
      }
    })
    return this
  }


  angular.module('profitelo.common.controller.service-provider.service-provider-step-controller', [
    'profitelo.directives.services.smooth-scrolling'
  ])
  .controller('ServiceProviderStepController', ServiceProviderStepController)

}())
