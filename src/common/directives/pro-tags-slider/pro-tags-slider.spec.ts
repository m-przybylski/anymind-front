describe('Unit testing: profitelo.directives.pro-tags-slider', () => {
  return describe('for pro-tags-slider directive >', () => {

    let scope = null
    let rootScope
    let compile = null
    let _timeout = null
    let validHTML = '<pro-tags-slider data-tags="[{name: \'sdsd\', id:999}, {name: \'sdsd\', id:999}, {name: \'sdsd\', ' +
      'id:999}, {name: elo, id:999}, {name: elo, id:999}]" data-on-tag-click-action="tagsAction"></pro-tags-slider>'

    beforeEach(() => {
    angular.mock.module('templates-module')
    angular.mock.module('profitelo.directives.pro-tags-slider')

      inject(($rootScope, $compile, $timeout) => {
        rootScope = $rootScope.$new()
        compile = $compile
        _timeout = $timeout
        
      })
    })

    function create(html) {
      scope = rootScope.$new()
      let elem = angular.element(html)
      let compiledElement = compile(elem)(scope)
      scope.$digest()
      _timeout.flush()
      return compiledElement
    }

    it('should have a dummy test', inject(() => {
      expect(true).toBeTruthy()
    }))

    it('should compile the directive', () => {
      let el = create(validHTML)
      expect(el.html()).toBeDefined(true)
    })

    it('should call next slide', () => {
      let el = create(validHTML)
      let isoScope = el.isolateScope()
      const tag = '{name: \'sdsd\', id:999}'
      isoScope.tagAction(tag)
    })
  })
})