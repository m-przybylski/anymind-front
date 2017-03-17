describe('Unit tests: ProServiceProviderSummaryController >', () => {
  describe('Testing Controller: ProServiceProviderSummaryController', () => {

    let ProServiceProviderSummaryController: any

    beforeEach(() => {
      angular.mock.module('profitelo.common.controller.service-provider.pro-service-provider-summary-controller')
      inject(($controller: ng.IControllerService) => {

        ProServiceProviderSummaryController = $controller('ProServiceProviderSummaryController', {})
      })
    })

    it('should exists', () => {
      return expect(!!ProServiceProviderSummaryController).toBe(true)
    })

    it('should call deleteAction when deleteConsultation triggered', () => {

      ProServiceProviderSummaryController.deleteAction = () => {
      }

      spyOn(ProServiceProviderSummaryController, 'deleteAction')

      ProServiceProviderSummaryController.deleteConsultation()

      expect(ProServiceProviderSummaryController.deleteAction).toHaveBeenCalled()
    })

    it('should call editAction when editConsultation triggered', () => {

      ProServiceProviderSummaryController.editAction = () => {
      }

      spyOn(ProServiceProviderSummaryController, 'editAction')

      ProServiceProviderSummaryController.editConsultation()

      expect(ProServiceProviderSummaryController.editAction).toHaveBeenCalled()
    })
  })
})
