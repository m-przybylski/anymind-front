/* istanbul ignore next function */
(function() {

  function controller($scope: any, $uibModalInstance: ng.ui.bootstrap.IModalServiceInstance) {
    $scope.isNavbar = true
    $scope.isFullscreen = true

    $scope.onModalClose = () =>
      $uibModalInstance.dismiss('cancel')

    return this
  }

  angular.module('profitelo.components.dashboard.client.activities.modals.complain-report', [
    'ui.bootstrap',
    'profitelo.directives.interface.scrollable'
  ])
    .controller('clientComplainReportController', controller)

}())
