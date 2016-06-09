describe('Unit testing: profitelo.directives.interface.pro-textarea', () => {
  return describe('for interface.pro-textarea directive >', () => {

    let _placeholder = 'PLACEHOLDER'

    let scope = null
    let rootScope
    let compile = null
    let validHTML = '<pro-textarea data-label="LABEL" data-placeholder="' + _placeholder + '"  required auto-focus only-digits></pro-textarea>'

    beforeEach(() => {
      module('templates-module')
      module('profitelo.directives.interface.pro-textarea')

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
