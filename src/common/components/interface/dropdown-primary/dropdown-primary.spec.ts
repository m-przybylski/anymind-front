import * as angular from 'angular'
import IRootScopeService = profitelo.services.rootScope.IRootScopeService
import {IWindowService} from '../../../services/window/window.service'
import {IDropdownPrimaryComponentBindings} from './dropdown-primary'
import {DropdownPrimaryComponentController} from './dropdown-primary.controller'
describe('Unit testing: profitelo.components.interface.dropdown-primary', () => {
  return describe('for dropdownPrimary component >', () => {

    let scope: ng.IScope
    let rootScope: ng.IRootScopeService
    let compile: ng.ICompileService
    let componentController: ng.IComponentControllerService
    let component: DropdownPrimaryComponentController
    let window: IWindowService
    let bindings: IDropdownPrimaryComponentBindings
    let timeout: ng.ITimeoutService
    let document: ng.IDocumentService
    const validHTML = '<dropdown-primary data-label="asd" data-icon="icon"></dropdown-primary>'

    function create(html: string): JQuery {
      scope = rootScope.$new()
      const elem = angular.element(html)
      const compiledElement = compile(elem)(scope)
      scope.$digest()
      return compiledElement
    }

    beforeEach(() => {

      angular.mock.module('profitelo.components.interface.dropdown-primary')

      inject(($rootScope: IRootScopeService, $compile: ng.ICompileService,
              _$componentController_: ng.IComponentControllerService, _$window_: IWindowService,
              _$timeout_: ng.ITimeoutService, _$document_: ng.IDocumentService) => {
        componentController = _$componentController_
        rootScope = $rootScope.$new()
        compile = $compile
        timeout = _$timeout_
        window = _$window_
        document = _$document_
      })

      bindings = {
        label: '@',
        inputPlaceholder: '@',
        name: '@',
        placeholder: '@',
        mainList: [],
        onSelectMain: () => {},
        selectedItem: {
          name: 'name',
          value:'value'
        },
        callback: () => {}
      }

      const injectors = {
        $element: create(validHTML),
        $scope: rootScope,
        $window: window,
        $document: document
      }
      component = componentController<DropdownPrimaryComponentController, {}>('dropdownPrimary', injectors, bindings)
    })

    it('should have a dummy test', inject(() => {
      expect(true).toBeTruthy()
    }))

    it('should compile the component', () => {
      const el = create(validHTML)
      expect(el.html()).toBeDefined(true)
    })

    it('should click on document and close dropdown', () => {
      component.filterBy = {
        name: 'asd'
      }
      document.trigger('click')
      document.bind(event)
      scope.$digest()
      expect(component.isOpen).toBeFalsy()
    })

    it('should open dropdown and call clearDropdown method', () => {
      component.toggleDropdown()
      expect(component.isOpen).toBe(true)
    })

    it('should open and close dropdown', () => {
      component.toggleDropdown()
      component.toggleDropdown()
      expect(component.isOpen).toBe(false)
      expect(component.isClosed).toBe(true)
    })

    it('should add selected item to list and change current item', () => {
      const item = {
        name: 'name',
        value: 0
      }
      spyOn(component, 'onSelectMain')
      component.onMainItemSelect(item)
      expect(component.activeItem).toEqual(item)
      expect(component.onSelectMain).toHaveBeenCalledWith(item)
    })

    it('should check if onSelectMain is a function', () => {
      const item = {
        name: 'name',
        value: 0
      }
      spyOn(component, 'onSelectMain')
      component.onMainItemSelect(item)
      expect(typeof component.onSelectMain === 'function').toBe(true)
      expect(component.onSelectMain).toHaveBeenCalled()
    })
  })
})
