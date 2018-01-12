import * as angular from 'angular'

describe('Unit testing: profitelo.components.interface.slider', () => {
  return describe('for slider component >', () => {

    let scope: any
    let rootScope: ng.IRootScopeService
    let compile: ng.ICompileService
    let componentController: any
    let component: any
    let timeout: ng.ITimeoutService
    const validHTML = '<slider data-ng-transclude data-controlls="controlls" data-move-slides="-2"></slider>'

    function create(html: string): JQuery {
      scope = rootScope.$new()
      const elem = angular.element(html)
      const compiledElement = compile(elem)(scope)
      scope.$digest()
      return compiledElement
    }

    beforeEach(() => {

      angular.mock.module('profitelo.components.interface.slider')

      inject(($rootScope: any, $compile: ng.ICompileService,
              _$componentController_: ng.IComponentControllerService, _$timeout_: ng.ITimeoutService) => {
        componentController = _$componentController_
        rootScope = $rootScope.$new()
        compile = $compile
        timeout = _$timeout_
      })

      component = componentController('slider', {$element: create(validHTML), $scope: scope}, {})
      timeout.flush()
      component.nextSlide()
      component.prevSlide()
    })

    it('should have a dummy test', inject(() => {
      expect(true).toBeTruthy()
    }))

    it('should compile the component', () => {
      const el = create(validHTML)
      expect(el.html()).toBeDefined(true)
    })

  })
})