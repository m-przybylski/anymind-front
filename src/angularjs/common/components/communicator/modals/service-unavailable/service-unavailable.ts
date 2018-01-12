import * as angular from 'angular'

export interface IUnavailableServiceControllerParentScope extends ng.IScope {
  accept: () => void
  reject: () => void
}

export interface IUnavailableServiceControllerScope extends ng.IScope {
  reject: () => void
  accept: () => void
  $parent: IUnavailableServiceControllerParentScope
}

export class UnavailableServiceController implements ng.IController {

    constructor($scope: IUnavailableServiceControllerScope,
              $uibModalInstance: ng.ui.bootstrap.IModalServiceInstance) {

    $scope.reject = (): void => {
      $uibModalInstance.dismiss('cancel')
      $scope.$parent.reject()
    }

    $scope.accept = (): void => {
      $uibModalInstance.dismiss('cancel')
      $scope.$parent.accept()
    }
  }
}

angular.module('profitelo.components.communicator.modals.service-unavailable', [
  'ui.bootstrap',
  'profitelo.directives.interface.scrollable'
])
  .controller('unavailableServiceController', UnavailableServiceController)