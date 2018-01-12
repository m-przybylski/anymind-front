import * as angular from 'angular'

import inputPasswordModule from './input-password'
import {InputPasswordComponentController} from './input-password.controller'
import {IInputPasswordComponentBindings} from './input-password'
import {IScope} from 'angular'

describe('Unit testing: profitelo.components.interface.input-password', () => {
  return describe('for inputPassword component >', () => {

    let scope: ng.IScope
    let rootScope: ng.IRootScopeService
    let compile: ng.ICompileService
    let componentController: ng.IComponentControllerService
    let component: InputPasswordComponentController
    let bindings: IInputPasswordComponentBindings
    let document: ng.IDocumentService
    const validHTML = '<input-password type="tel"></input-password>'
    let injectors: { $scope?: IScope, [key: string]: any }

    function create(html: string) {
      scope = rootScope.$new()
      let elem = angular.element(html)
      let compiledElement = compile(elem)(scope)
      scope.$digest()
      return compiledElement
    }

    beforeEach(() => {
      angular.mock.module(inputPasswordModule)
    })

    beforeEach(() => {
      angular.mock.module('pascalprecht.translate')
      inject(($rootScope: any, $compile: ng.ICompileService,
              _$componentController_: ng.IComponentControllerService) => {
        componentController = _$componentController_
        rootScope = $rootScope.$new()
        compile = $compile
      })

      bindings = {
        id: 'name',
        name: 'name',
        type: 'tel',
        inputText: 'tekst',
        placeholder: 'placeholder',
        validationText: 's',
        isValid: true,
        ngRequired: false,
        ngModel: 'string',
        ngPattern: '(/^{1,3}$/)',
        isSubmitted: true,
        onChange: 'name2'
      }

      injectors = {
        $element: create(validHTML),
        $scope: rootScope,
        $document: document
      }

      component = componentController<InputPasswordComponentController, {}>('inputPassword', injectors, bindings)
    })

    it('should have a dummy test', inject(() => {
      expect(true).toBeTruthy()
    }))

    it('should onFocus', () => {
      component.onFocus()
      expect(component.isFocus).toBe(true)
      expect(component.isDirty).toBe(true)
    })

    it('should onBlur', () => {
      component.onBlur()
      expect(component.isFocus).toBe(false)
    })
  })
})