namespace app.dashboard.settings.general {

  import IModalsService = profitelo.services.modals.IModalsService
  import IUrlService = profitelo.services.helper.IUrlService

  export class DashboardSettingsGeneralController implements ng.IController {

    public avatarImageSource: string
    public nickname: string

    constructor(private modalsService: IModalsService, UserData: any, private $state: ng.ui.IStateService, private urlService: IUrlService) {
      this.nickname = UserData.settings.nickname
      this.avatarImageSource = this.urlService.resolveFileUrl(UserData.settings.avatar)
    }

    $onInit = () => {
    }

    public openBasicAccountSettingsModal = () => {
      this.modalsService.createBasicAccountSettingsModal(this.onModalClose)
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

    private onModalClose = (cb: Function) => {
      this.$state.reload().then(() => {
        cb()
      })
    }

  }

  angular.module('profitelo.controller.dashboard.settings.general', [
    'ui.router',
    'c7s.ng.userAuth',
    'ngLodash',
    'profitelo.services.url',
    'profitelo.services.modals'
  ])
  .config(($stateProvider: ng.ui.IStateProvider, UserRolesProvider: any) => {
    $stateProvider.state('app.dashboard.settings.general', {
      url: '/general',
      templateUrl: 'dashboard/settings/general/general.tpl.html',
      controller: 'dashboardSettingsGeneralController',
      controllerAs: 'vm',
      resolve: {
        UserData: (User: any) => {
          return User.getStatus(true)
        }
      },
      data: {
        access: UserRolesProvider.getAccessLevel('user')
      }
    })
  })
  .controller('dashboardSettingsGeneralController', DashboardSettingsGeneralController)
}
