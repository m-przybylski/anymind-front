describe('Unit testing: profitelo.directives.pro-expert-card', () => {
  return describe('for pro-expert-card directive >', () => {

    let scope: any = null
    let rootScope: ng.IScope
    let compile: any = null
    let validHTML = '<pro-expert-card></pro-expert-card>'

    beforeEach(() => {
    angular.mock.module('templates-module')
    angular.mock.module('profitelo.directives.pro-expert-card')

      inject(($rootScope: IRootScopeService, $compile: ng.ICompileService) => {
        rootScope = $rootScope.$new()
        compile = $compile
      })
    })

    function create(html: string) {
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
