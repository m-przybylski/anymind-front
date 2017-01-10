describe('Unit testing: profitelo.components.interface.radio', () => {
  return describe('for dropDown component >', () => {

    let rootScope
    let compile
    let componentController
    let component
    let bindings
    let scope
    let validHTML = '<radio-btn data-label="label" data-name="name" data-id="id" data-value="value"></radio-btn>'

    function create(html) {
      scope = rootScope.$new()
      let elem = angular.element(html)
      let compiledElement = compile(elem)(scope)
      scope.$digest()
      return compiledElement
    }

    beforeEach(() => {
      angular.mock.module('templates-module')
      angular.mock.module('profitelo.components.interface.radio')

      inject(($rootScope, $compile, _$componentController_) => {
        componentController = _$componentController_
        rootScope = $rootScope.$new()
        compile = $compile
      })

      bindings = {
        label: 'label',
        name: 'name',
        id: 'id',
        ngModel: {},
        value: 'val'
      }

      const injectors = {
        $element: create(validHTML),
        $scope: rootScope
      }

      component = componentController('radioBtn', injectors, bindings)
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

