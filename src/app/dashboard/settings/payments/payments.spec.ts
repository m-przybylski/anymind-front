namespace profitelo.dashboard.settings.payments {
  describe('Unit tests: dashboardSettingsPaymentsController >', () => {
    describe('Testing Controller: dashboardSettingsPaymentsController', () => {

      let dashboardSettingsPaymentsController: DashboardSettingsPaymentsController

      beforeEach(() => {
        angular.mock.module('profitelo.controller.dashboard.settings.payments')
        angular.mock.module('ui.router')
        inject(($rootScope: ng.IRootScopeService, $controller: ng.IControllerService, _$state_: ng.ui.IStateService) => {
          dashboardSettingsPaymentsController = $controller<DashboardSettingsPaymentsController>('dashboardSettingsPaymentsController', {
            $state: _$state_,
            $scope: $rootScope.$new()
          })
        })
      })

      it('should exists', () => {
        expect(!!dashboardSettingsPaymentsController).toBe(true)
      })
    })
  })
}