describe('Unit testing: profitelo.components.communicator.messenger.messenger-maximized', () => {
  return describe('for messengerMaximized component >', () => {

    let scope
    let rootScope
    let compile
    let element
    let component
    let validHTML = '<messenger-maximized data-call-length="0" data-call-cost="0"></messenger-maximized>'

    const bindings = {
      callCost: 0,
      callLength: 0,
      minimizeMessenger: _ => _
    }

    const uploaderService = {
      collectionTypes: { avatar: 'avatar' },
      getInstance: _ => _
    }

    function create(html) {
      scope = rootScope.$new()
      let elem = angular.element(html)
      let compiledElement = compile(elem)(scope)
      scope.$digest()
      return compiledElement
    }

    beforeEach(angular.mock.module(($provide) => {
      $provide.value('apiUrl', 'awesomeURL')
    }))

    beforeEach(() => {
    angular.mock.module('profitelo.services.sounds')
    angular.mock.module('profitelo.services.navigator')
    angular.mock.module('profitelo.services.uploader')
    })

    beforeEach(angular.mock.module(($provide) => {
      $provide.value('soundsService', {})
      $provide.value('uploaderService', uploaderService)
      $provide.value('navigatorService', {})
    }))

    beforeEach(() => {
    angular.mock.module('templates-module')
    angular.mock.module('profitelo.services.helper')
    angular.mock.module('profitelo.filters.seconds-to-datetime')
    angular.mock.module('profitelo.filters.money')
    angular.mock.module('lodash')
    angular.mock.module('profitelo.services.messenger')
    angular.mock.module('profitelo.components.communicator.messenger.messenger-maximized')

      inject(($rootScope, $compile, $timeout, _$componentController_, _$window_, _HelperService_, _messengerService_, ___) => {
        rootScope = $rootScope.$new()
        compile = $compile
        const injectors = {
          messengerService: _messengerService_,
          _: ___,
          $element: create(validHTML),
          HelperService: _HelperService_
        }

        component = _$componentController_('messengerMaximized', injectors, bindings)
      })
    })

    it('should have a dummy test', inject(() => {
      expect(true).toBeTruthy()
    }))

    it('should compile the component', () => {
      let el = create(validHTML)
      expect(el.html()).toBeDefined(true)
    })
  })
})
