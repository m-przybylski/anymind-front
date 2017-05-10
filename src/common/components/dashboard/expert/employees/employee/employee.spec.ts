import * as angular from 'angular'
import IRootScopeService = profitelo.services.rootScope.IRootScopeService
import expertEmployeeModule from './employee';
import IScope = angular.IScope;
import {ExpertEmployeeComponentController} from './employee.controller';

describe('Unit testing: profitelo.components.dashboard.expert.employees.employee', () => {
  return describe('for expertEmployee >', () => {

    let scope: IScope
    let rootScope: ng.IRootScopeService
    let compile: ng.ICompileService
    let componentController: ng.IComponentControllerService
    let component: ExpertEmployeeComponentController
    let validHTML = '<expert-employee></expert-employee>'

    function create(html: string) {
      scope = rootScope.$new()
      let elem = angular.element(html)
      let compiledElement = compile(elem)(scope)
      scope.$digest()
      return compiledElement
    }

    beforeEach(() => {

      angular.mock.module(expertEmployeeModule)

      inject(($rootScope: IRootScopeService, $compile: ng.ICompileService,
              _$componentController_: ng.IComponentControllerService) => {
        componentController = _$componentController_
        rootScope = $rootScope.$new()
        compile = $compile
      })

      component = componentController<ExpertEmployeeComponentController, {}>('expertEmployee', {}, {})

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