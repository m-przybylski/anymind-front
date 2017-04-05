import * as angular from 'angular'
import IRootScopeService = profitelo.services.rootScope.IRootScopeService
import noContentMessageModule from "./no-content-message";
import IScope = angular.IScope;

  describe('Unit testing: profitelo.components.dashboard.expert.no-content-message', () => {
    return describe('for noContentMessage >', () => {

      let scope: IScope
      let rootScope: ng.IRootScopeService
      let compile: ng.ICompileService
      let componentController: ng.IComponentControllerService
      let component: any
      let validHTML = '<no-content-message></no-content-message>'

      function create(html: string) {
        scope = rootScope.$new()
        let elem = angular.element(html)
        let compiledElement = compile(elem)(scope)
        scope.$digest()
        return compiledElement
      }

      beforeEach(() => {

        angular.mock.module(noContentMessageModule)

        inject(($rootScope: IRootScopeService, $compile: ng.ICompileService,
                _$componentController_: ng.IComponentControllerService) => {
          componentController = _$componentController_
          rootScope = $rootScope.$new()
          compile = $compile
        })

        component = componentController('noContentMessage', {})
      })

      it('should have a dummy test', inject(() => {
        expect(true).toBeTruthy()
      }))
      it('should compile the directive', () => {
        let el = create(validHTML)
        expect(el.html()).toBeDefined(true)
      })
    })
  })