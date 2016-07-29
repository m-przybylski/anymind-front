describe('Testing Controller: proClientAdviceModalController', () => {

  var proClientAdviceModalController
  var scope
  var uibModalInstance = {
    dismiss: () => {

    }
  }

  beforeEach(() => {
    module('profitelo.components.communicator.modals.pro-client-advice-modal-controller')
    inject(($rootScope, $controller) => {

      scope = $rootScope.$new()

      proClientAdviceModalController = $controller('proClientAdviceModalController', {
        '$scope': scope,
        '$uibModalInstance': uibModalInstance
      })

    })
  })

  it('should exists', () => {
    return expect(!!proClientAdviceModalController).toBe(true)
  })

  it('should have dismissWindow function', () => {

    spyOn(uibModalInstance, 'dismiss')

    proClientAdviceModalController.dismissWindow()

    expect(uibModalInstance.dismiss).toHaveBeenCalledWith('cancel')

  })

})