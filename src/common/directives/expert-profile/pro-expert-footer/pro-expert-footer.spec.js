describe('Unit testing: profitelo.directives.expert-profile.pro-expert-footer', () => {
  return describe('for expert-profile.pro-expert-footer directive >', () => {

    let scope = null
    let rootScope
    let compile = null
    let validHTML = '<pro-expert-footer></pro-expert-footer>'

    beforeEach(() => {
      module('templates-module')
      module('profitelo.directives.expert-profile.pro-expert-footer')

      inject(($rootScope, $compile) => {
        rootScope = $rootScope.$new()
        compile = $compile
      })
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
    it('should compile the directive', () => {
      let el = create(validHTML)
      expect(el.html()).toBeDefined(true)
    })
  })
})