namespace profitelo.components.dashboard.invitation.proInvitationAcceptanceBox {
describe('Unit testing: profitelo.components.dashboard.invitation.pro-invitation-acceptance-box', () => {
  return describe('for proInvitationAcceptanceBox component >', () => {

    const url = 'awesomUrl'

    let scope: any
    let rootScope: ng.IRootScopeService
    let compile: ng.ICompileService
    let componentController: any
    let component: any
    let element: any
    let timeout: ng.ITimeoutService
    let bindings: any
    let resourcesExpectations: any
    let httpBackend: ng.IHttpBackendService
    let EmploymentApiDef: any
    let EmploymentApi
    let validHTML = '<pro-invitation-acceptance-box data-employment="::employment" data-invitation="::invitation")></pro-invitation-acceptance-box>'

    function create(html: string) {
      scope = rootScope.$new()
      let elem = angular.element(html)
      let compiledElement = compile(elem)(scope)
      scope.$digest()
      return compiledElement
    }

    beforeEach(angular.mock.module(function($provide: ng.auto.IProvideService) {
      $provide.value('apiUrl', url)
    }))

    beforeEach(() => {
    angular.mock.module('templates-module')
    angular.mock.module('profitelo.swaggerResources.definitions')
    angular.mock.module('profitelo.components.dashboard.invitation.pro-invitation-acceptance-box')

      inject(($rootScope: IRootScopeService, $compile: ng.ICompileService, $timeout: ng.ITimeoutService,
              $httpBackend: ng.IHttpBackendService, _$componentController_: ng.IComponentControllerService,
              _EmploymentApi_: any, _EmploymentApiDef_: any) => {
        componentController = _$componentController_
        rootScope = $rootScope.$new()
        compile = $compile
        EmploymentApi = _EmploymentApi_
        timeout = $timeout
        httpBackend = $httpBackend
        EmploymentApiDef = _EmploymentApiDef_
      })

      element = create(validHTML)
      bindings = {}
      component = componentController('proInvitationAcceptanceBox', {$element: element, $scope: scope}, bindings)

      resourcesExpectations = {
        EmploymentApi: {
          postEmploymentsAccept: httpBackend.when(EmploymentApiDef.postEmploymentsAccept.method, EmploymentApiDef.postEmploymentsAccept.url),
          postEmploymentsReject: httpBackend.when(EmploymentApiDef.postEmploymentsReject.method, EmploymentApiDef.postEmploymentsReject.url)
        }
      }

    })

    it('should have a dummy test', inject(() => {
      expect(true).toBeTruthy()
    }))

    it('should compile the component', () => {
      expect(element.html()).toBeDefined(true)
    })

    it('should get response on accept employee', () => {
      resourcesExpectations.EmploymentApi.postEmploymentsAccept.respond(200)
      component.accept(':employmentId')
      httpBackend.flush()
      expect(component.employment).toBeDefined(true)
      expect(component.employment.employmentId).toMatch(':employmentId')
    })

    it('should get error on accept employee', () => {
      resourcesExpectations.EmploymentApi.postEmploymentsAccept.respond(400)
      component.accept(':employmentId')
      httpBackend.flush()
      expect(component.employment).not.toBeDefined(true)
    })

    it('should get response on reject employee ', () => {
      resourcesExpectations.EmploymentApi.postEmploymentsReject.respond(200)
      component.reject(':employmentId')
      timeout.flush()
      httpBackend.flush()
      expect(component.employment).toBeDefined(true)
      expect(component.rejectTimeoutSet).toBeDefined(false)
      expect(component.employment.employmentId).toMatch(':employmentId')
    })

    it('should get error on reject employee ', () => {
      resourcesExpectations.EmploymentApi.postEmploymentsReject.respond(400)
      component.reject(':employmentId')
      timeout.flush()
      httpBackend.flush()
      expect(component.employment).not.toBeDefined(true)
      expect(component.rejectTimeoutSet).toBeDefined(false)
    })

    it('should set this.idRejected and this.isAccepted on call abort abortRejection ', () => {
      component.abortRejection()
      expect(component.isRejected).toBe(false)
      expect(component.isAccepted).toBe(false)
    })

  })
})
}
