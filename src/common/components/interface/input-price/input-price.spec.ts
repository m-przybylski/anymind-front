import * as angular from 'angular'
import IRootScopeService = profitelo.services.rootScope.IRootScopeService
import inputPriceModule from './input-price'
import {InputPriceComponentController} from './input-price.controller'
import {IInputPriceComponentBindings} from './input-price'
import {CommonSettingsService} from '../../../services/common-settings/common-settings.service'

describe('Unit testing: profitelo.components.interface.input-price', () => {
  return describe('for inputPrice component >', () => {

    let scope: ng.IScope
    let rootScope: ng.IRootScopeService
    let compile: ng.ICompileService
    let componentController: ng.IComponentControllerService
    let component: InputPriceComponentController
    let bindings: IInputPriceComponentBindings
    let document: ng.IDocumentService
    let validHTML = '<input-price>'
    let CommonSettingsService: CommonSettingsService

    function create(html: string): JQuery {
      scope = rootScope.$new()
      const elem = angular.element(html)
      const compiledElement = compile(elem)(scope)
      scope.$digest()
      return compiledElement
    }

    beforeEach(() => {
      angular.mock.module(inputPriceModule)
    })

    beforeEach(() => {
      angular.mock.module('pascalprecht.translate')
      inject(($rootScope: IRootScopeService, $compile: ng.ICompileService,
              _$componentController_: ng.IComponentControllerService, _CommonSettingsService_: CommonSettingsService) => {
        componentController = _$componentController_
        rootScope = $rootScope.$new()
        compile = $compile
        CommonSettingsService = _CommonSettingsService_
      })

      bindings = {
        id: 'name',
        name: 'name',
        placeholder: 'placeholder',
        validationText: 's',
        isValid: true,
        ngModel: 0,
        currency: 'PLN'
      }

      const injectors = {
        $element: create(validHTML),
        $scope: rootScope,
        $document: document
      }

      component = componentController<InputPriceComponentController, {}>('inputPrice', injectors, bindings)
    })

    it('should have a dummy test', inject(() => {
      expect(true).toBeTruthy()
    }))
  })
})
