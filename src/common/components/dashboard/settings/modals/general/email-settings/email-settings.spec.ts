namespace profitelo.components.dashboard.settings.modals.general.emailSettings {

  import GeneralEmailSettingsController = profitelo.components.dashboard.settings.modals.general.emailSettings.GeneralEmailSettingsController
  import IRootScopeService = profitelo.services.rootScope.IRootScopeService
  import IAccountApi = profitelo.api.IAccountApi

  describe('Testing Controller: generalEmailSettingsController', () => {

    let controller: GeneralEmailSettingsController
    let scope: IGeneralEmailSettingsControllerScope
    const $uibModalInstance: ng.ui.bootstrap.IModalServiceInstance =
      jasmine.createSpyObj('$uibModalInstance', ['close', 'dismiss'])

    const userService = {
      getUser: () => {}
    }

    beforeEach(() => {
      angular.mock.module('profitelo.services.user')
    })

    beforeEach(angular.mock.module(($provide: ng.auto.IProvideService) => {
      $provide.value('apiUrl', 'awesomeUrl')
      $provide.value('userService', userService)
    }))


    beforeEach(() => {
      angular.mock.module('ui.bootstrap')
      angular.mock.module('profitelo.components.dashboard.settings.modals.general.email-settings')

      inject(($rootScope: IRootScopeService, $controller: ng.IControllerService, AccountApi: IAccountApi,
              $log: ng.ILogService) => {

        scope = <IGeneralEmailSettingsControllerScope>$rootScope.$new()

        const injectors = {
          $uibModalInstance: $uibModalInstance,
          $scope: scope,
          AccountApi: AccountApi,
          userService: userService,
          $log: $log
        }

        controller = $controller<GeneralEmailSettingsController>('generalEmailSettingsController', injectors)
      })
    })

    it('should exists', () => {
      return expect(!!controller).toBe(true)
    })

  })
}
