import * as angular from 'angular'
import IRootScopeService = profitelo.services.rootScope.IRootScopeService
import loaderModule, {ILoaderComponentBindings} from './loader'
import {LoaderComponentController} from './loader.controller'

describe('Unit testing: profitelo.components.interface.loader', () => {
  return describe('for loader component >', () => {

    let scope: any
    let rootScope: ng.IRootScopeService
    let compile: ng.ICompileService
    let componentController: any
    let component: LoaderComponentController
    let bindings: ILoaderComponentBindings
    let validHTML = '<loader></loader>'

    function create(html: string) {
      scope = rootScope.$new()
      scope.selectedItemsValue = []
      let elem = angular.element(html)
      let compiledElement = compile(elem)(scope)
      scope.$digest()
      return compiledElement
    }

    beforeEach(() => {
      angular.mock.module(loaderModule)
    })

    beforeEach(() => {
      inject(($rootScope: IRootScopeService, $compile: ng.ICompileService,
              _$componentController_: ng.IComponentControllerService) => {
        componentController = _$componentController_
        rootScope = $rootScope.$new()
        compile = $compile
      })

      bindings = {
        fileUploadInfo: [],
        fileUploadError: true
      }

      const injectors = {
        $element: create(validHTML),
        $scope: rootScope
      }

      component = componentController('loader', injectors, bindings)

    })

    it('should have a dummy test', inject(() => {
      expect(true).toBeTruthy()
    }))
  })
})
