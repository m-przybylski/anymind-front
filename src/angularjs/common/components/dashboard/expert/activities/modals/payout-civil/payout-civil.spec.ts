import * as angular from 'angular'

import {IExpertPayoutCivilModalScope, ExpertPayoutCivilModalConttroller} from './payout-civil.controller'
import expertPayoutCivilModalModule from './payout-civil'
describe('Testing Controller: expertPayoutCivilController', () => {

  let expertPayoutCivilController: any
  let scope: IExpertPayoutCivilModalScope
  const uibModalInstance = {
    dismiss: (): void => {

    },
    close: (): void => {

    }
  }

  beforeEach(() => {
    angular.mock.module(expertPayoutCivilModalModule)
  })

  beforeEach(angular.mock.module(($provide: ng.auto.IProvideService) => {
    $provide.value('apiUrl', 'awesomeURL')
  }))

  beforeEach(() => {
    inject(($rootScope: any, $controller: ng.IControllerService) => {

      scope = <IExpertPayoutCivilModalScope>$rootScope.$new()

      expertPayoutCivilController = $controller(ExpertPayoutCivilModalConttroller, {
        '$scope': scope,
        '$uibModalInstance': uibModalInstance
      })
    })
  })

  it('should exists', () => {
    return expect(!!expertPayoutCivilController).toBe(true)
  })

  it('should uibModalInstance', () => {
    spyOn(uibModalInstance, 'dismiss')
    expertPayoutCivilController.onModalClose()
    expect(uibModalInstance.dismiss).toHaveBeenCalledWith('cancel')
  })

})