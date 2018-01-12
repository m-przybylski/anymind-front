namespace profitelo.components.interface.radio {
  
  describe('Unit testing: profitelo.components.interface.radio-text', () => {
    return describe('for radio component >', () => {

      let rootScope: ng.IRootScopeService
      let compile: ng.ICompileService
      let componentController: any
      let component: any
      let bindings: any
      let scope: any
      const validHTML = '<radio-btn-text></radio-btn-text>'

      function create(html: string): JQuery {
        scope = rootScope.$new()
        const elem = angular.element(html)
        const compiledElement = compile(elem)(scope)
        scope.$digest()
        return compiledElement
      }

      beforeEach(() => {

        angular.mock.module('profitelo.components.interface.radio-text')

        inject(($rootScope: any, $compile: ng.ICompileService, _$componentController_: ng.IComponentControllerService) => {
          componentController = _$componentController_
          rootScope = $rootScope.$new()
          compile = $compile
        })

        bindings = {
          label: '@',
          name: '@',
          id: '@',
          labelDescription: '@',
          ngModel: true,
          value: '@',
          isDescriptive: false
        }

        const injectors = {
          $element: create(validHTML),
          $scope: rootScope
        }

        component = componentController('radioBtnText', injectors, bindings)
      })

      it('should have a dummy test', inject(() => {
        expect(true).toBeTruthy()
      }))

      it('should compile the component', () => {
        const el = create(validHTML)
        expect(el.html()).toBeDefined(true)
      })

      it('should onClick if ngModel true', () => {
        spyOn(component, 'ngModel')
        component.onClick()
        expect(component.isCollapsed).toBe(true)
      })

    })
  })
}