namespace app.dashboard.settings.general {
  describe('Unit tests: DashboardSettingsGeneralController >', () => {
    describe('Testing Controller: DashboardSettingsGeneralController', () => {

      let dashboardSettingsGeneralController: DashboardSettingsGeneralController

      beforeEach(() => {
        angular.mock.module('profitelo.controller.dashboard.settings.general')

        inject(($rootScope: ng.IScope, $controller: ng.IControllerService, _$state_: ng.ui.IStateService) => {
          dashboardSettingsGeneralController =
            $controller<DashboardSettingsGeneralController>('dashboardSettingsGeneralController', {
              $state: _$state_,
              $scope: $rootScope.$new(),
              UserData: {
                settings: {
                  avatar: ''
                }
              }
            })
        })
      })

      it('should exists', () => {
        expect(!!dashboardSettingsGeneralController).toBe(true)
      })

    })
  })
}