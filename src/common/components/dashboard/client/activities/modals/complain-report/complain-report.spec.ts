namespace profitelo.components.dashboard.client.activities.modals.complainReport {
  import IRootScopeService = profitelo.services.rootScope.IRootScopeService
  describe('Testing Controller: clientComplainReportController', () => {

    var clientComplainReportController: any
    var scope: any
    var uibModalInstance = {
      dismiss: () => {

      },
      close: () => {

      }
    }

    beforeEach(() => {
      angular.mock.module('profitelo.components.dashboard.client.activities.modals.complain-report')
      inject(($rootScope: IRootScopeService, $controller: ng.IControllerService) => {

        scope = $rootScope.$new()
        scope.disconnectCall = () => {
        }

        clientComplainReportController = $controller('clientComplainReportController', {
          '$scope': scope,
          '$uibModalInstance': uibModalInstance
        })
      })
    })

    it('should exists', () => {
      return expect(!!clientComplainReportController).toBe(true)
    })

  })
}
