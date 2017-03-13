import * as angular from "angular"
  import IRootScopeService = profitelo.services.rootScope.IRootScopeService
import {ProfileApi} from "../../../../common/api/api/ProfileApi"
import "./consultation-range"

  describe('Unit tests: ConsultationRangeController >', () => {
    describe('Testing Controller: ConsultationRangeController', () => {

      var ConsultationRangeController: any
      let _scope: any
      let url = 'awesomeUrl/'

      beforeEach(angular.mock.module(function ($provide: ng.auto.IProvideService) {
        $provide.value('apiUrl', url)
      }))

      beforeEach(() => {
        angular.mock.module('profitelo.controller.dashboard.service-provider.consultation-range')
        inject(($rootScope: IRootScopeService, $controller: ng.IControllerService, _ProfileApi_: ProfileApi) => {

          _scope = $rootScope.$new()

          ConsultationRangeController = $controller('ConsultationRangeController', {
            $scope: _scope,
            ProfileApi: _ProfileApi_,
            savedProfile: {}
          })

        })
      })

      it('should exists', () => {
        return expect(!!ConsultationRangeController).toBe(true)
      })

    })
  })
