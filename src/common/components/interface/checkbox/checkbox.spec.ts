import * as angular from 'angular'
import IRootScopeService = profitelo.services.rootScope.IRootScopeService
import CheckboxModule from './checkbox'
import {CheckboxComponentController} from './checkbox.controller'
import {CheckboxComponentBindings} from './checkbox'

describe('Unit testing: profitelo.components.interface.checkbox', () => {
  return describe('for checkbox component >', () => {

    let scope: ng.IScope
    let rootScope: ng.IRootScopeService
    let compile: ng.ICompileService
    let componentController: ng.IComponentControllerService
    let component: CheckboxComponentController
    let bindings: CheckboxComponentBindings
    let document: ng.IDocumentService
    let validHTML = '<checkbox data-input-text="inputtext" data-additional-text="additinal"' +
      'data-is-disabled="false"></checkbox>'

    function create(html: string) {
      scope = rootScope.$new()
      let elem = angular.element(html)
      let compiledElement = compile(elem)(scope)
      scope.$digest()
      return compiledElement
    }

    beforeEach(() => {
      angular.mock.module(CheckboxModule)
    })

    beforeEach(() => {
      inject(($rootScope: IRootScopeService, $compile: ng.ICompileService,
              _$componentController_: ng.IComponentControllerService) => {
        componentController = _$componentController_
        rootScope = $rootScope.$new()
        compile = $compile
      })

      bindings = {
        inputText: 'input text',
        additionalText: 'additional text',
        isDisabled: false,
        isRequired: false,
        ngModel: false,
        onChange: () => {
        }
      }

      const injectors = {
        $element: create(validHTML),
        $scope: rootScope,
        $document: document
      }

      component = componentController<CheckboxComponentController, {}>('checkbox', injectors, bindings)
    })

    it('should have a dummy test', inject(() => {
      expect(true).toBeTruthy()
    }))

    it('should onClick isDisabled', () => {
      component.onClick()
      expect(component.isDisabled).toBe(false)
      expect(component.ngModel).toBe(true)
    })

    it('should onClickCallback not isDisabled', () => {
      component.isDisabled = true
      component.isDisabled = true

      component.onClick()
      expect(component.isDisabled).toBe(true)
      expect(component.ngModel).toBe(false)
    })

    it('should onClickCallback', () => {
      spyOn(component, 'onChange')
      component.onClick()
      expect(component.onChange).toHaveBeenCalled()
    })
  })
})
