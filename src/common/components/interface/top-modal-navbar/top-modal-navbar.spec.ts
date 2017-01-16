describe('Unit testing: profitelo.components.interface.top-modal-navbar', () => {
  return describe('for topModalNavbar component >', () => {

    let scope
    let rootScope
    let compile
    let componentController
    let state
    let component
    const validHTML = '<top-modal-navbar data-title="test" data-on-close="asd"></top-modal-navbar>'

    function create(html) {
      scope = rootScope.$new()
      let elem = angular.element(html)
      let compiledElement = compile(elem)(scope)
      scope.$digest()
      return compiledElement
    }

    beforeEach(() => {
    angular.mock.module('templates-module')
    angular.mock.module('ui.router')
    angular.mock.module('profitelo.components.interface.top-modal-navbar')

      inject(($rootScope, $compile, _$componentController_, _$state_, $window) => {
        componentController = _$componentController_
        rootScope = $rootScope
        compile = $compile
        state = _$state_

        const injectors = {
          $element: create(validHTML),
          $scope: rootScope,
          $state: state,
          $window: $window
        }

        const bindings = {
          title: 'test',
          onClose: 'asd'
        }

        component = componentController('topModalNavbar', injectors, bindings)
      })
    })

    it('should have a dummy test', () => {
      expect(true).toBeTruthy()
    })

    it('should compile the component', () => {
      const el = create(validHTML)
      expect(el.html()).toBeDefined(true)
    })

    it('should onCloseClick', () => {
      spyOn(state, 'go')
      component.onCloseClick()
      expect(state.go).toHaveBeenCalledWith('app.dashboard.client.favourites')
    })

    it('should onLogoClick', () => {
      spyOn(state, 'go')
      component.onLogoClick()
      expect(state.go).toHaveBeenCalledWith('app.home')
    })

    it('should onLogoClick', () => {
      component.onClose = () => {}
      spyOn(state, 'go')
      component.onLogoClick()
      expect(state.go).toHaveBeenCalledWith('app.home')
    })
  })
})

