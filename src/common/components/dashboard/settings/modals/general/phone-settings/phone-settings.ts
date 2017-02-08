namespace profitelo.components.dashboard.settings.modals.general.phoneSettings {

  interface IgeneralPhoneSettingsControllerScope extends ng.IScope {
    isNavbar: boolean
    isFullscreen: boolean
    isAvatarVisableToExpert: boolean
    onModalClose: Function
    addPhoto: Function
    imageSource: string
  }

  class generalPhoneSettingsController implements ng.IController {

    /* @ngInject */
    constructor($scope: IgeneralPhoneSettingsControllerScope,
                $uibModalInstance: ng.ui.bootstrap.IModalServiceInstance) {

      $scope.isNavbar = true
      $scope.isFullscreen = true

      $scope.onModalClose = () =>
        $uibModalInstance.dismiss('cancel')
    }

  }

  angular.module('profitelo.components.dashboard.settings.modals.general.phone-settings', [
    'ui.bootstrap',
    'profitelo.directives.interface.pro-input',
    'profitelo.directives.interface.scrollable'
  ])
  .controller('generalPhoneSettingsController', generalPhoneSettingsController)

}
