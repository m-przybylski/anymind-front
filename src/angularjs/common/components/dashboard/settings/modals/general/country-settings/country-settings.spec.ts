import * as angular from 'angular'

import {GeneralCountrySettingsController, IGeneralCountrySettingsControllerScope} from './country-settings'
import userModule from '../../../../../../services/user/user'
import {AccountApi, AccountApiMock} from 'profitelo-api-ng/api/api'

describe('Testing Controller: generalCountrySettingsController', () => {

  let controller: GeneralCountrySettingsController
  let scope: IGeneralCountrySettingsControllerScope
  let httpBackend: ng.IHttpBackendService

  const $uibModalInstance: ng.ui.bootstrap.IModalServiceInstance =
    jasmine.createSpyObj('$uibModalInstance', ['close', 'dismiss'])

  const userService = {
    getUser: (): void => {
    }
  }

  beforeEach(() => {
    angular.mock.module(userModule)
  })

  beforeEach(angular.mock.module(($provide: ng.auto.IProvideService) => {
    $provide.value('apiUrl', 'awesomeUrl')
    $provide.value('userService', userService)
  }))

  beforeEach(() => {
    angular.mock.module('ui.bootstrap')

    angular.mock.module('profitelo.components.dashboard.settings.modals.general.country-settings')
    inject(($rootScope: any, $controller: ng.IControllerService, AccountApi: AccountApi,
            _AccountApiMock_: AccountApiMock, $httpBackend: ng.IHttpBackendService) => {

      scope = <IGeneralCountrySettingsControllerScope>$rootScope.$new()
      httpBackend = $httpBackend
      const injectors = {
        $scope: scope,
        $uibModalInstance: $uibModalInstance,
        userService: userService,
        AccountApi: AccountApi
      }

      _AccountApiMock_.getSupportedCountriesRoute(500)

      controller = $controller<GeneralCountrySettingsController>('generalCountrySettingsController', injectors)
    })
  })

  it('should exists', () => {
    return expect(!!controller).toBe(true)
  })
})