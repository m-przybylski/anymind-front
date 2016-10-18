describe('Unit testing: profitelo.components.communicator.communicator-minimize', () => {
  return describe('for communicatorMinimize component >', () => {

    const url = 'awesomUrl/'

    let scope
    let rootScope
    let compile
    let bindings
    let componentController
    let component
    let validHTML = '<communicator-minimize data-fullscreen-actions="ctrl.minimizeChatComponent"></communicator-minimize>'

    beforeEach(module(function($provide) {
      $provide.value('apiUrl', url)
    }))

    bindings = {}

    beforeEach(() => {
      module('templates-module')
      module('profitelo.components.communicator.communicator-minimize')

      inject(($rootScope, $compile, _$componentController_) => {
        componentController = _$componentController_
        rootScope = $rootScope.$new()
        compile = $compile
      })

      component = componentController('communicatorMinimize', null, bindings)
    })

    function create(html) {
      scope = rootScope.$new()
      let elem = angular.element(html)
      let compiledElement = compile(elem)(scope)
      scope.$digest()
      return compiledElement
    }

    it('should have a dummy test', inject(() => {
      expect(true).toBeTruthy()
    }))

    it('should compile the component', () => {
      let el = create(validHTML)
      expect(el.html()).toBeDefined(true)
    })

    it('should call isFullscreen on click', () => {
      let el = create(validHTML)
      scope.ctrl = {
        minimizeChatComponent: jasmine.createSpy('minimizeChatComponent')
      }
      scope.$digest()
      el.find('.communicator-minimize').triggerHandler('click')
      expect(scope.ctrl.minimizeChatComponent).toHaveBeenCalled()
    })

  })
})
