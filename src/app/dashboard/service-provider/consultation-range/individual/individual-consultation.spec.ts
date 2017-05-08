import * as angular from 'angular'
import IRootScopeService = profitelo.services.rootScope.IRootScopeService
import {ServiceApi, ServiceApiMock} from 'profitelo-api-ng/api/api'
import {GetService} from 'profitelo-api-ng/model/models'
import {TopAlertService} from '../../../../../common/services/top-alert/top-alert.service'
import {Profile} from '../../../../../common/models/Profile'
import './individual-consultation'

describe('Unit tests: profitelo.controller.dashboard.service-provider.consultation-range.individual >', () => {
  describe('Testing Controller: IndividualConsultationController', () => {

    let IndividualConsultationController: any
    let _scope: any
    let _state: ng.ui.IStateService
    let _ServiceApiMock: ServiceApiMock
    let _httpBackend: ng.IHttpBackendService
    let _topAlertService: TopAlertService
    let _ServiceApi: ServiceApi
    let _controller: any

    const url = 'awesomeUrl'
    const mockServiceId = 1
    function createController(controller: any, savedProfile: Profile | null, profileImage: string) {
      IndividualConsultationController = controller('IndividualConsultationController', {
        $scope: _scope,
        ServiceApi: _ServiceApi,
        savedProfile: savedProfile,
        profileImage: profileImage,
        $state: _state,
        topAlertService: _topAlertService
      })
    }

    beforeEach(angular.mock.module(function ($provide: ng.auto.IProvideService) {
      $provide.value('apiUrl', url)
    }))

    beforeEach(() => {

      angular.mock.module('profitelo.controller.dashboard.service-provider.consultation-range.individual')
      inject(($rootScope: IRootScopeService, $controller: ng.IControllerService, $httpBackend: ng.IHttpBackendService,
              $injector: ng.auto.IInjectorService, _$state_: ng.ui.IStateService, _ServiceApi_: ServiceApi,
              _topAlertService_: TopAlertService) => {

        _scope = $rootScope.$new()
        _state = _$state_
        _httpBackend = $httpBackend
        _topAlertService = _topAlertService_
        _ServiceApi = _ServiceApi_
        _controller = $controller

        createController(_controller, <any>{
          expertDetails: {
            id: 1
          },
          organizationDetails: undefined
        }, '')

        _ServiceApiMock = $injector.get<ServiceApiMock>('ServiceApiMock')
      })
    })

    it('should exists', () => {
      return expect(!!IndividualConsultationController).toBe(true)
    })

    it('should be able to save conslultation', () => {

      //FIXME type mapping
      _ServiceApiMock.postServiceRoute(200, <GetService>{})

      spyOn(_state, 'reload')

      IndividualConsultationController.addAnotherConsultation()
      _httpBackend.flush()

      expect(_state.reload).toHaveBeenCalled()

    })

    it('should alert on save conslultation fail', () => {

      _ServiceApiMock.postServiceRoute(500)

      spyOn(_topAlertService, 'error')

      IndividualConsultationController.addAnotherConsultation()
      _httpBackend.flush()

      expect(_topAlertService.error).toHaveBeenCalledWith({message: 'error', timeout: 4})

    })

    it('should transfer to first individual step based on creator type', () => {

      spyOn(_state, 'go')

      IndividualConsultationController.backToFirstStep()

      expect(_state.go).toHaveBeenCalledWith('app.dashboard.service-provider.individual-path')

    })

    it('should transfer to first company step based on creator type', () => {

      spyOn(_state, 'go')

      createController(_controller, <Profile>{
        expertDetails: undefined,
        organizationDetails: undefined
      }, '')

      IndividualConsultationController.backToFirstStep()

      expect(_state.go).toHaveBeenCalledWith('app.dashboard.service-provider.company-path')

    })

    it('should delete requested consultation', () => {

      _ServiceApiMock.deleteServiceRoute(200, mockServiceId)

      IndividualConsultationController.consultations = []

      IndividualConsultationController.deleteConsultation(':serviceId', mockServiceId)

    })

    it('should fail on delete requested consultation error', () => {

      _ServiceApiMock.deleteServiceRoute(500, mockServiceId)

      spyOn(_topAlertService, 'error')

      IndividualConsultationController.consultations = []

      IndividualConsultationController.deleteConsultation(':serviceId', mockServiceId)

    })

    it('should transfer to first individual step based on creator type', () => {

      spyOn(_state, 'go')

      IndividualConsultationController.backToFirstStep()

      expect(_state.go).toHaveBeenCalledWith('app.dashboard.service-provider.individual-path')

    })

  })
})
