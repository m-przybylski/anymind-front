import * as angular from 'angular'
import {IRootScopeService} from '../../../services/root-scope/root-scope.service';

describe('Unit testing: profitelo.directives.interface.pro-range-slider', () => {
  return describe('for interface.pro-range-slider directive >', () => {

    let scope: any = null
    let rootScope: ng.IRootScopeService
    let compile: any = null
    const validHTML = '<pro-range-slider max-value="max" min-value="min"></pro-range-slider>'

    beforeEach(() => {

      angular.mock.module('profitelo.directives.interface.pro-range-slider')

      inject(($rootScope: IRootScopeService, $compile: ng.ICompileService, $httpBackend: ng.IHttpBackendService) => {
        rootScope = $rootScope.$new()
        compile = $compile

        $httpBackend.when('GET', '/assets/html/range-slider/range-slider.html').respond(200, '')
      })
    })

    function create(html: string, min: number, max: number): JQuery {
      scope = rootScope.$new()
      scope.min = min
      scope.max = max
      const elem = angular.element(html)
      const compiledElement = compile(elem)(scope)
      scope.$digest()
      return compiledElement
    }

    it('should have a dummy test', inject(() => {
      expect(true).toBeTruthy()
    }))

    it('should compile the directive', () => {
      const el = create(validHTML, 0, 100)
      expect(el.html()).toBeDefined(true)
    })

  })
})