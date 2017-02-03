namespace app.dashboard.settings.general {

  import IClientActivitiesService = profitelo.services.clientActivities.IClientActivitiesService
  import IModalsService = profitelo.services.modals.IModalsService

  class DashboardSettingsGeneralController implements ng.IController {

    constructor(private modalsService: IModalsService) {}

    $onInit() {}

    public openBasicAccountSettingsModal = () => {
      this.modalsService.createBasicAccountSettingsModal()
    }

    public openGeneralPhoneSettingsModal = () => {
      this.modalsService.createGeneralPhoneSettingsModal()
    }

    public openGeneralEmailSettingsModal = () => {
      this.modalsService.createGeneralEmailSettingsModal()
    }

    public openGeneralCountrySettingsModal = () => {
      this.modalsService.createGeneralCountrySettingsModal()
    }

  }

  angular.module('profitelo.controller.dashboard.settings.general', [
    'ui.router',
    'c7s.ng.userAuth',
    'ngLodash',
    'profitelo.services.modals'
  ])
  .config(function ($stateProvider, UserRolesProvider) {
    $stateProvider.state('app.dashboard.settings.general', {
      url: '/general',
      templateUrl: 'dashboard/settings/general/general.tpl.html',
      controller: 'DashboardSettingsGeneralController',
      controllerAs: 'vm',
      data: {
        access: UserRolesProvider.getAccessLevel('user')
      }
    })
  })
  .controller('DashboardSettingsGeneralController', DashboardSettingsGeneralController)
}
