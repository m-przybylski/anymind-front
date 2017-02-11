namespace profitelo.dashboard {
describe('Unit tests: Dashboard >', () => {
  describe('Testing Controller: DashboardController', () => {

    let _DashboardController: any
    let _scope: any
    beforeEach(() => {
    angular.mock.module('profitelo.controller.dashboard')
      inject(($rootScope: IRootScopeService, $controller: ng.IControllerService) => {

        _DashboardController = $controller('DashboardController', {
          '$rootScope': $rootScope,
          '$scope': _scope,
          'userProfile': {},
          '$state': {
            current: {
              data: {
                showMenu: true
              }
            }
          }
        })
      })
    })

    it('should exists', () => {
      return expect(!!_DashboardController).toBe(true)
    })

  })
})
}
